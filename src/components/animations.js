/**
 * PB2I — Animation helpers
 */

/**
 * Fade-in elements matching `selector` when they enter the viewport.
 * @param {string} selector - CSS selector, default '[data-fade]'
 */
export function initFadeIn(selector = '[data-fade]') {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

  const elements = document.querySelectorAll(selector)
  if (!elements.length) return

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up')
        entry.target.style.opacity = '1'
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  elements.forEach((el, i) => {
    const rect = el.getBoundingClientRect()
    // Already in view on load
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => {
        el.classList.add('animate-fade-up')
        el.style.opacity = '1'
      }, i * 40)
    } else {
      el.style.opacity = '0'
      observer.observe(el)
    }
  })
}
