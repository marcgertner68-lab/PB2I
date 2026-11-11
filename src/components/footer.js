/**
 * PB2I — Footer component
 */

import { t } from '../utils/i18n.js'
import { getLinks, getCollectionLinks } from '../utils/navLinks.js'

const BASE_URL = import.meta.env.BASE_URL || '/'
const logoUrl  = `${BASE_URL}assets/logo.webp`

const wave = `<svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,30 C180,60 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1350,15 1440,30 L1440,60 L0,60 Z" fill="var(--color-primary)"/>
  </svg>`

export function createFooter() {
  const links = getLinks(BASE_URL)
  const collectionLinks = getCollectionLinks(BASE_URL)

  const mainLinks = links.filter(l => l.key !== 'musee')
  const museeLink = links.find(l => l.key === 'musee')

  const renderedLinks = [
    `<a href="${BASE_URL}index.html" class="text-xs text-body/80 hover:text-black transition-colors">${t('navbar.home')}</a>`,
    ...mainLinks.map(l => `<a href="${l.href}" class="text-xs text-body/80 hover:text-black transition-colors">${l.label}</a>`)
  ].join('')

  const renderedColLinks = `
    <span class="text-xs font-bold text-body">${t('navbar.technologies', 'Technologies')}</span>
    <div class="flex flex-col gap-1.5 lg:pl-2.5 lg:border-l border-black/15">
      ${collectionLinks.map(l => `<a href="${l.href}" class="text-xs text-body/80 hover:text-black transition-colors">${l.label}</a>`).join('')}
    </div>
    ${museeLink ? `<a href="${museeLink.href}" class="text-xs font-semibold text-body/90 hover:text-black transition-colors mt-1">${museeLink.label}</a>` : ''}
  `

  return `
  <footer class="relative mt-24" role="contentinfo">
    <div class="footer-wave">${wave}</div>
    <div class="bg-primary px-6 md:px-12 lg:px-36 py-12 flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-10 lg:gap-12 justify-between text-body">
      <!-- Branding -->
      <div class="flex flex-col gap-4 items-center lg:items-start">
        <img src="${logoUrl}" alt="Logo PB2I" class="h-12 w-auto object-contain" onerror="this.style.display='none'">
        <p class="font-heading font-extrabold text-body text-sm leading-snug max-w-[220px] lg:max-w-[160px]">
          ${t('footer.title')}
        </p>
      </div>

      <!-- Liens -->
      <div class="flex flex-col gap-4 items-center lg:items-start w-full max-w-xs sm:max-w-sm">
        <h3 id="footer-nav-heading" class="font-heading text-sm font-bold text-body uppercase tracking-wider">${t('footer.navigation')}</h3>
        <nav aria-labelledby="footer-nav-heading" class="grid grid-cols-2 gap-x-8 gap-y-2 text-center lg:text-left w-full">
          <div class="flex flex-col gap-2">
            ${renderedLinks}
          </div>
          <div class="flex flex-col gap-2">
            ${renderedColLinks}
          </div>
        </nav>
      </div>

      <!-- Mentions légales -->
      <div class="flex flex-col gap-4 items-center lg:items-start">
        <h3 id="footer-legal-heading" class="font-heading text-sm font-bold text-body uppercase tracking-wider">${t('footer.legal_heading')}</h3>
        <nav aria-labelledby="footer-legal-heading" class="flex flex-col gap-2">
          <a href="${BASE_URL}mentions-legales.html" class="text-xs text-body/80 hover:text-black transition-colors">${t('footer.legal')}</a>
          <a href="${BASE_URL}mentions-legales.html" class="text-xs text-body/80 hover:text-black transition-colors">${t('footer.privacy')}</a>
        </nav>
      </div>

      <!-- Contact / Social -->
      <div class="flex flex-col gap-4 items-center lg:items-start">
        <h3 class="font-heading text-sm font-bold text-body uppercase tracking-wider">${t('footer.contact_heading') || 'Contact'}</h3>
        <div class="flex gap-4">
          <!-- Facebook -->
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook"
            class="social-icon-btn">
            <!-- Outlined (normal) -->
            <svg class="icon-outlined w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
            <!-- Filled (hover) -->
            <svg class="icon-filled w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>

          <!-- Téléphone -->
          <a href="tel:+33384212698" aria-label="Téléphone : +33 3 84 21 26 98" title="+33 3 84 21 26 98"
            class="social-icon-btn">
            <!-- Outlined (normal) -->
            <svg class="icon-outlined w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <!-- Filled (hover) -->
            <svg class="icon-filled w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>

          <!-- Email -->
          <a href="mailto:pb2i.belfort@gmail.com" aria-label="Email : pb2i.belfort@gmail.com" title="pb2i.belfort@gmail.com"
            class="social-icon-btn">
            <!-- Outlined (normal) -->
            <svg class="icon-outlined w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <!-- Filled (hover) -->
            <svg class="icon-filled w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/>
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="bg-[var(--color-primary-dark)] text-center py-3">
      <p class="text-xs text-body/80 font-medium">© 2026 PB2I</p>
    </div>
  </footer>
  `
}

