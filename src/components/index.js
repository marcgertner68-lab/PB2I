/**
 * PB2I — Components entry point
 *
 * Assembles and mounts all shared components (navbar, footer, video overlay).
 * Re-exports utilities so pages can import from '../components.js' sans changement.
 *
 * Structure:
 *   components/navbar.js      → Navbar HTML + interactions + langue
 *   components/footer.js      → Footer HTML
 *   components/video.js       → Video overlay + openVideo()
 *   components/modal.js       → openModal / closeModal / closeAllModals
 *   components/animations.js  → initFadeIn()
 */

import { createNavbar, initNavbarInteractions } from './navbar.js'
import { createFooter }                          from './footer.js'
import { createVideoOverlay, initVideoOverlayClose } from './video.js'
import { createMachineModal }                    from './machineModal.js'

// Re-exports for pages
export { openModal, closeModal, closeAllModals, bindMachineModal } from './modal.js'
export { openVideo }                             from './video.js'
export { initFadeIn }                            from './animations.js'
export { createArticleCard, formatArticleDate }  from './articleCard.js'
export { initCarousel }                          from './carousel.js'

/**
 * Injects navbar, footer, video overlay and machine details modal into the page,
 * then wires up all interactions.
 *
 * Call this BEFORE awaiting i18n — components render immediately with default labels,
 * then call refreshNavbar() after initI18n() resolves to update translations.
 *
 * @param {string} activePage - key matching a navbar link (e.g. 'histoire', 'missions')
 */
export function mountComponents(activePage = '') {
  // Navbar
  const navbarEl = document.createElement('div')
  navbarEl.id = 'pb2i-navbar-wrapper'
  navbarEl.innerHTML = createNavbar(activePage)
  document.body.prepend(navbarEl)

  // Footer
  const footerEl = document.createElement('div')
  footerEl.id = 'pb2i-footer-wrapper'
  footerEl.innerHTML = createFooter()
  document.body.appendChild(footerEl)

  // Video overlay
  const videoEl = document.createElement('div')
  videoEl.innerHTML = createVideoOverlay()
  document.body.appendChild(videoEl)

  // Machine details overlay
  const machineOverlayEl = document.createElement('div')
  machineOverlayEl.innerHTML = createMachineModal()
  document.body.appendChild(machineOverlayEl)

  // Wire interactions
  initNavbarInteractions()
  initVideoOverlayClose()
}

/**
 * Re-renders just the navbar and footer after translations have loaded.
 * Called after initI18n() resolves so labels are in the correct language.
 * @param {string} activePage
 */
export function refreshNavbar(activePage = '') {
  const wrapper = document.getElementById('pb2i-navbar-wrapper')
  if (wrapper) {
    wrapper.innerHTML = createNavbar(activePage)
    initNavbarInteractions()
  }
  refreshFooter()
}

export function refreshFooter() {
  const wrapper = document.getElementById('pb2i-footer-wrapper')
  if (!wrapper) return
  wrapper.innerHTML = createFooter()
}
