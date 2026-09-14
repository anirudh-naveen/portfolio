<template>
  <section id="contact" class="contact">
    <div class="contact-container">
      <p class="kicker">UPLINK // DIRECT</p>
      <h2 class="contact-title">Contact Me</h2>
      <p class="contact-subtitle">
        Feel free to shoot me a message! <br />
        I'll respond as soon as I can.
      </p>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <input v-model="form.name" type="text" placeholder="Your Name" required />
        <input v-model="form.email" type="email" placeholder="Your Email" required />
        <textarea v-model="form.message" placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" class="send-button">Send Message</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import emailjs from 'emailjs-com'

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
  --accent-2: #c084fc;
  --glow: rgba(232, 121, 249, 0.42);
  input::placeholder,
  textarea::placeholder {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-dim);
    opacity: 1;
  }
  position: relative;
  min-height: 100vh;
  padding: 6rem 1rem;
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
  clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
  z-index: 0;
}

.contact > * {
  position: relative;
  z-index: 1;
}

.contact-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.kicker {
  margin: 0 0 0.5rem;
  color: var(--accent);
  font-family: 'Share Tech Mono', monospace;
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
  color: var(--text-muted);
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
  font-family: 'Rajdhani', sans-serif;
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
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.82rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid var(--accent);
  cursor: pointer;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  transition: all 0.2s ease;
}

.send-button:hover {
  background: var(--accent-2);
  border-color: var(--accent-2);
  box-shadow: 0 0 18px var(--glow);
}
</style>
