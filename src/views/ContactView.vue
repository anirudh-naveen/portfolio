<template>
  <section id="contact" class="contact" :class="{ modern: !isCyber }">
    <SectionCues up-to="/skills" />
    <div class="contact-container">
      <p class="kicker">{{ isCyber ? 'UPLINK // DIRECT' : 'Get in touch' }}</p>
      <h2 class="contact-title">Contact</h2>
      <p v-if="isCyber" class="contact-subtitle">
        Insert encrypted message here. Attempts to communicate will be acknowledged as soon as
        possible.
      </p>
      <p v-else class="contact-subtitle">
        Have a question or an opportunity in mind? Send me a message and I'll get back to you as
        soon as I can.
      </p>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <input v-model="form.name" type="text" placeholder="Your Name" required />
        <input v-model="form.email" type="email" placeholder="Your Email" required />
        <textarea v-model="form.message" placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" class="send-button">Send</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import emailjs from 'emailjs-com'
import SectionCues from '@/components/SectionCues.vue'
import { useTheme } from '@/composables/useTheme'

const { isCyber } = useTheme()

const form = ref({
  name: '',
  email: '',
  message: '',
})

function handleSubmit() {
  const serviceID = 'my_outlook'
  const templateID = 'personal_template'
  const userID = 'zCAdzklgHrEgoOc4N'

  const templateParams = {
    from_name: form.value.name,
    from_email: form.value.email,
    message: form.value.message,
  }

  emailjs
    .send(serviceID, templateID, templateParams, userID)
    .then(() => {
      alert('Message sent successfully!')
      form.value = { name: '', email: '', message: '' }
    })
    .catch((error) => {
      alert('Failed to send message. Please try again later.')
      console.error('EmailJS error:', error)
    })
}
</script>

<style scoped>
.contact {
  --accent: #e879f9;
  --glow: rgba(232, 121, 249, 0.42);
  input::placeholder,
  textarea::placeholder {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-dim);
    opacity: 1;
  }
  position: relative;
  min-height: 100vh;
  padding: 8.6rem 1rem 5rem;
  overflow: hidden;
  background: radial-gradient(ellipse at center, #2a1638 0%, #0a1220 50%, #070b14 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  box-sizing: border-box;
}

.contact::before {
  content: '';
  position: absolute;
  inset: 4.8rem 1rem 1.2rem;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  clip-path: polygon(
    18px 0,
    100% 0,
    100% calc(100% - 18px),
    calc(100% - 18px) 100%,
    0 100%,
    0 18px
  );
  z-index: 0;
}

.contact-container {
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.kicker {
  margin: 0 0 0.5rem;
  color: var(--accent-2);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
}

.contact-title {
  font-size: 2.6rem;
  color: var(--accent);
  margin-bottom: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-shadow: 0 0 18px var(--glow);
}

.contact-subtitle {
  color: var(--accent-2);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

input,
textarea {
  padding: 0.9rem 1rem;
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 32%, #1d3344);
  background: rgba(10, 18, 32, 0.9);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1.05rem;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 12px var(--glow);
}

.send-button {
  padding: 0.9rem;
  background: var(--accent);
  color: var(--bg-void);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid var(--accent);
  cursor: pointer;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
  transition: all 0.2s ease;
}

.send-button:hover {
  background: var(--accent-2);
  border-color: var(--accent-2);
  box-shadow: 0 0 18px var(--glow);
}

/* Modern theme */

.contact.modern {
  --accent: var(--brand);
  background: var(--bg-void);
}

.contact.modern::before {
  display: none;
}

.contact.modern .kicker {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.contact.modern .contact-title {
  margin-top: 0;
  color: var(--text);
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: none;
  text-shadow: none;
}

.contact.modern .contact-subtitle {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.6;
}

.contact.modern input,
.contact.modern textarea {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-size: 1rem;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.contact.modern input::placeholder,
.contact.modern textarea::placeholder {
  color: var(--text-dim);
  font-size: 1rem;
  letter-spacing: 0;
  text-transform: none;
}

.contact.modern input:focus,
.contact.modern textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent);
}

.contact.modern .send-button {
  margin-top: 0.3rem;
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 12px;
  clip-path: none;
  color: var(--on-brand);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

.contact.modern .send-button:hover {
  background: color-mix(in srgb, var(--accent) 88%, var(--text));
  border-color: color-mix(in srgb, var(--accent) 88%, var(--text));
  box-shadow: none;
}

@media (max-width: 768px) {
  .contact.modern .contact-title {
    font-size: 2.1rem;
  }
}
</style>
