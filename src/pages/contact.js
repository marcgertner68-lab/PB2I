/**
 * PB2I — Contact page JS
 */
import { mountComponents, refreshNavbar } from '../components.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'contact'
mountComponents('contact')
initI18n().then(() => { refreshNavbar('contact'); translateDOM() })


const form    = document.getElementById('contact-form')
const success = document.getElementById('form-success')
const errorEl = document.getElementById('form-error')
const submit  = document.getElementById('contact-submit')
const emailInput = document.getElementById('contact-email')
const emailError = document.getElementById('email-error')

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
emailInput?.addEventListener('blur', () => {
  const valid = emailRegex.test(emailInput.value)
  emailError?.classList.toggle('hidden', valid || !emailInput.value)
})

// Form submit (mailto fallback + UI feedback)
form?.addEventListener('submit', (e) => {
  e.preventDefault()

  // 1. Honeypot check for bots
  const hp = document.getElementById('contact-hp')?.value.trim()
  if (hp) {
    console.warn('Bot submission blocked.')
    // Show a fake success state to the bot, clear form and exit
    success?.classList.remove('hidden')
    errorEl?.classList.add('hidden')
    form.reset()
    return
  }

  const email   = emailInput?.value.trim()
  const objet   = document.getElementById('contact-objet')?.value.trim()
  const message = document.getElementById('contact-message')?.value.trim()

  // 2. Format & Length constraints validation
  if (!email || !objet || !message) {
    errorEl?.classList.remove('hidden')
    success?.classList.add('hidden')
    return
  }

  if (!emailRegex.test(email) || email.length > 100 || objet.length > 150 || message.length > 1500) {
    errorEl?.classList.remove('hidden')
    success?.classList.add('hidden')
    return
  }

  // 3. Prevent Subject/Objet header injection by sanitizing newlines
  const cleanObjet = objet.replace(/[\r\n]+/g, ' ')

  // Disable submit button & show loading state to prevent duplicate submissions
  const originalText = submit.innerHTML
  submit.disabled = true
  submit.innerHTML = `
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Ouverture de votre messagerie...
  `

  // Build mailto link
  const mailtoLink = `mailto:pb2i.belfort@gmail.com?subject=${encodeURIComponent(cleanObjet)}&body=${encodeURIComponent(`De: ${email}\n\n${message}`)}`

  // Show success message
  success?.classList.remove('hidden')
  errorEl?.classList.add('hidden')

  // Open mailto redirection
  window.location.href = mailtoLink

  // Reset form and restore button state after a delay
  setTimeout(() => {
    submit.disabled = false
    submit.innerHTML = originalText
    form.reset()
    success?.classList.add('hidden')
  }, 4000)
})
