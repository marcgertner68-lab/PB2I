/**
 * PB2I — Homepage JS
 */

import { mountComponents, refreshNavbar, initFadeIn, initCarousel, formatArticleDate } from '../components.js'
import { fetchArticles, prefetch } from '../utils/api.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'home'

// 1) Mount immediately — page is visible right away (navbar labels in FR)
mountComponents('')

// 2) Start data fetches in parallel (no await yet)
prefetch('articles.json')
const i18nReady = initI18n()

// 3) Once i18n resolves, update navbar labels to the correct language
i18nReady.then(() => {
  refreshNavbar('')
  translateDOM()
})

// ── Carousel ────────────────────────────────────────────────
initCarousel({
  trackId: 'carousel-track',
  dotsId: 'carousel-dots',
  itemSelector: '.card-image-wrap',
  carouselId: 'collections-carousel'
})

// ── Load latest articles ─────────────────────────────────────
async function loadNews() {
  const newsList = document.getElementById('news-list')
  if (!newsList) return

  try {
    const lang = document.documentElement.lang || 'fr'
    const baseUrl = import.meta.env.BASE_URL || '/'
    const all = await fetchArticles()
    const articles = all.slice(0, 3)

    newsList.innerHTML = articles.map(a => `
      <a href="${baseUrl}article.html?id=${a.id}"
        class="bg-white border-2 border-[#252525] flex gap-4 items-start overflow-hidden relative w-full min-h-[80px] shrink-0 no-underline hover:scale-[1.01] transition-transform duration-150">
        <img src="${a.thumbnail}" alt="${a.title}"
          class="w-20 sm:w-24 self-stretch object-cover shrink-0"
          loading="lazy"
          onerror="this.onerror=null;this.style.opacity='0'">
        <div class="flex-1 min-w-0 pr-3 py-2 flex flex-col justify-between gap-1">
          <p class="font-heading font-semibold text-sm text-[#252525] leading-snug line-clamp-2">${a.title}</p>
          <p class="text-[11px] text-[#252525]/80 line-clamp-1 leading-normal">${a.excerpt || ''}</p>
          <p class="text-[10px] font-semibold text-[#252525] text-right">${formatArticleDate(a.date, lang)}</p>
        </div>
      </a>
    `).join('')

    if (!articles.length) {
      newsList.innerHTML = '<p class="text-sm text-gray-500 py-4">Aucune actualité disponible.</p>'
    }
  } catch {
    newsList.innerHTML = '<p class="text-sm text-gray-400 py-4 italic">Actualités non disponibles.</p>'
  }
}

loadNews()
initFadeIn('[data-fade]')
