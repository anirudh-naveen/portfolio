<template>
  <section class="contact">
    <div class="contact-container">
      <h2 class="contact-title">Contact Me</h2>
      <p class="contact-subtitle">
        Feel free to shoot me a message!
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
  message: ''
})

function handleSubmit() {
  const serviceID = 'my_outlook'
  const templateID = 'personal_template'
  const userID = 'zCAdzklgHrEgoOc4N'

  const templateParams = {
    from_name: form.value.name,
    from_email: form.value.email,
    message: form.value.message
  }

  emailjs.send(serviceID, templateID, templateParams, userID)
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
  padding: 6rem 1rem;
  background: radial-gradient(circle at center, #183a17, #0e1b12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.contact-title {
  font-size: 2.5rem;
  color: #d4af37;
  margin-bottom: 1rem;
}

.contact-subtitle {
  color: #b8c5b0;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, textarea {
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #264f27;
  background: #112015;
  color: #f4e4c1;
  font-size: 1rem;
  outline: none;
}

input:focus, textarea:focus {
  border-color: #d4af37;
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
}

.send-button {
  padding: 0.9rem;
  background: #d4af37;
  color: #0d1912;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-button:hover {
  background: #e1c55f;
  transform: translateY(-2px);
}
</style>
