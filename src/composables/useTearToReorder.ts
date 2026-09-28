import { computed, nextTick, onUnmounted, ref, type Ref } from 'vue'

interface Slugged {
  slug: string
}

const DRAG_THRESHOLD = 6
const TOUCH_HOLD_MS = 320
const SWAP_COOLDOWN_MS = 160
const EDGE_SCROLL_ZONE = 90
const EDGE_SCROLL_SPEED = 14

/**
 * Lets cards in a grid be picked up ("torn off") and dropped in a new spot.
 * Cards must carry `data-slug` and live directly inside `feedRef`. The order is saved per viewer.
 */
export function useTearToReorder<T extends Slugged>(
  items: readonly T[],
  enabled: Ref<boolean>,
  feedRef: Ref<HTMLElement | null>,
  storageKey: string,
) {
  const defaultOrder = items.map((item) => item.slug)
  const bySlug = new Map(items.map((item) => [item.slug, item]))

  function loadOrder() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? '[]') as unknown
      if (!Array.isArray(saved)) return defaultOrder
      const known = saved.filter((slug): slug is string => bySlug.has(slug))
      return [...new Set([...known, ...defaultOrder])]
    } catch {
      return defaultOrder
    }
  }

  function saveOrder() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(order.value))
    } catch {
      // Storage blocked; the arrangement just won't survive a reload.
    }
  }

  const order = ref<string[]>(loadOrder())
  const draggingSlug = ref<string | null>(null)

  const displayed = computed(() =>
    enabled.value ? order.value.map((slug) => bySlug.get(slug)!) : [...items],
  )
  const isReordered = computed(() => order.value.some((slug, i) => slug !== defaultOrder[i]))

  // Drag state is plain (non-reactive) and only lives for one gesture.
  let card: HTMLElement | null = null
  let slug = ''
  let startX = 0
  let startY = 0
  let pointerX = 0
  let pointerY = 0
  let grabDX = 0
  let grabDY = 0
  let lastX = 0
  let lifted = false
  let holdTimer = 0
  let scrollFrame = 0
  let lastSwapAt = 0
  let lastSwapTarget: string | null = null

  function cards() {
    return [...(feedRef.value?.querySelectorAll<HTMLElement>('[data-slug]') ?? [])]
  }

  /** Where the card sits in the layout, ignoring any transform or translate applied to it. */
  function slotOrigin(el: HTMLElement) {
    const feed = feedRef.value!.getBoundingClientRect()
    return { x: feed.left + el.offsetLeft, y: feed.top + el.offsetTop }
  }

  // FLIP: animate the other cards from their old spots to their new ones after a reorder.
  async function reorder(next: string[]) {
    const before = new Map(cards().map((el) => [el.dataset.slug!, el.getBoundingClientRect()]))
    order.value = next
    await nextTick()
    for (const el of cards()) {
      if (el === card) continue
      const old = before.get(el.dataset.slug!)
      if (!old) continue
      const now = el.getBoundingClientRect()
      const dx = old.left - now.left
      const dy = old.top - now.top
      if (!dx && !dy) continue
      el.animate([{ translate: `${dx}px ${dy}px` }, { translate: '0px 0px' }], {
        duration: 280,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      })
    }
    if (card) followPointer()
  }

  function followPointer() {
    if (!card) return
    const origin = slotOrigin(card)
    const x = pointerX - grabDX - origin.x
    const y = pointerY - grabDY - origin.y
    const tilt = Math.max(-9, Math.min(9, (pointerX - lastX) * 0.6))
    lastX = pointerX
    card.style.translate = `${x}px ${y}px`
    card.style.rotate = `${tilt}deg`
  }

  function swapUnderPointer() {
    if (!card) return
    const target = document
      .elementsFromPoint(pointerX, pointerY)
      .map((el) => el.closest<HTMLElement>('[data-slug]'))
      .find((el) => el && el !== card && feedRef.value?.contains(el))
    const targetSlug = target?.dataset.slug ?? null
    if (!targetSlug) {
      lastSwapTarget = null
      return
    }
    const now = performance.now()
    if (targetSlug === lastSwapTarget || now - lastSwapAt < SWAP_COOLDOWN_MS) return
    lastSwapTarget = targetSlug
    lastSwapAt = now

    const next = order.value.filter((s) => s !== slug)
    next.splice(order.value.indexOf(targetSlug), 0, slug)
    void reorder(next)
  }

  // Scroll the page while a card is held near the top or bottom edge.
  function edgeScroll() {
    if (!lifted) return
    if (pointerY < EDGE_SCROLL_ZONE) window.scrollBy(0, -EDGE_SCROLL_SPEED)
    else if (pointerY > window.innerHeight - EDGE_SCROLL_ZONE) window.scrollBy(0, EDGE_SCROLL_SPEED)
    followPointer()
    scrollFrame = requestAnimationFrame(edgeScroll)
  }

  function preventTouchScroll(event: TouchEvent) {
    if (lifted) event.preventDefault()
  }

  function lift() {
    if (!card) return
    lifted = true
    draggingSlug.value = slug
    const origin = slotOrigin(card)
    grabDX = startX - origin.x
    grabDY = startY - origin.y
    lastX = startX
    window.getSelection()?.removeAllRanges()
    followPointer()
    scrollFrame = requestAnimationFrame(edgeScroll)
  }

  function onMove(event: PointerEvent) {
    pointerX = event.clientX
    pointerY = event.clientY
    const moved = Math.hypot(pointerX - startX, pointerY - startY)

    if (!lifted) {
      if (event.pointerType === 'touch') {
        // Moving before the hold completes means the visitor is scrolling, not tearing.
        if (moved > DRAG_THRESHOLD * 1.5) end()
        return
      }
      if (moved > DRAG_THRESHOLD) lift()
      else return
    }

    followPointer()
    swapUnderPointer()
  }

  function swallowClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  function end() {
    window.clearTimeout(holdTimer)
    cancelAnimationFrame(scrollFrame)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', end)
    window.removeEventListener('pointercancel', end)
    document.removeEventListener('touchmove', preventTouchScroll)

    if (lifted && card) {
      // Settle the card back onto the page in its new slot.
      const from = { translate: card.style.translate, rotate: card.style.rotate }
      card.style.translate = ''
      card.style.rotate = ''
      card.animate([from, { translate: '0px 0px', rotate: '0deg' }], {
        duration: 260,
        easing: 'cubic-bezier(0.2, 0.9, 0.3, 1.2)',
      })
      saveOrder()
      // A drag that started on a link shouldn't also open it.
      window.addEventListener('click', swallowClick, { capture: true, once: true })
      window.setTimeout(() => window.removeEventListener('click', swallowClick, true), 0)
    }

    lifted = false
    card = null
    lastSwapTarget = null
    draggingSlug.value = null
  }

  function onPointerDown(event: PointerEvent, cardSlug: string) {
    if (!enabled.value || event.button !== 0 || card) return
    // Buttons and the text links keep working normally.
    if ((event.target as HTMLElement).closest('button, .action, input')) return

    card = event.currentTarget as HTMLElement
    slug = cardSlug
    startX = pointerX = event.clientX
    startY = pointerY = event.clientY

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
    document.addEventListener('touchmove', preventTouchScroll, { passive: false })

    if (event.pointerType === 'touch') {
      holdTimer = window.setTimeout(lift, TOUCH_HOLD_MS)
    }
  }

  function resetOrder() {
    void reorder([...defaultOrder]).then(saveOrder)
  }

  onUnmounted(end)

  return { displayed, draggingSlug, isReordered, onPointerDown, resetOrder }
}
