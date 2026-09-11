/**
 * PB2I — Article detail JS
 */
import { mountComponents, refreshNavbar, initFadeIn, createArticleCard, formatArticleDate, initCarousel } from '../components.js'
import { fetchArticles, prefetch } from '../utils/api.js'
import { initI18n, translateDOM, t } from '../utils/i18n.js'

window.PB2I_PAGE = 'articles'
mountComponents('actualites')
prefetch('articles.json')
const i18nReady = initI18n()
i18nReady.then(() => { refreshNavbar('actualites'); translateDOM() })


async function loadArticle() {
  const params    = new URLSearchParams(window.location.search)
  const articleId = params.get('id')

  const header = document.getElementById('article-header')
  const body   = document.getElementById('article-body')

  try {
    const baseUrl = import.meta.env.BASE_URL || '/'
    // Wait for translations too, so the page renders in the right language
    const [all] = await Promise.all([fetchArticles(), i18nReady])
    const lang = document.documentElement.lang || 'fr'

    const article = all.find(a => a.id === articleId) || all[0]
    if (!article) throw new Error('Not found')

    // formatArticleDate is now imported from components.js

    // Update page title
    document.title = `${article.title} — PB2I`
    document.getElementById('article-page-title').textContent = `${article.title} — PB2I`

    // Update social/SEO metas dynamically for the loaded article
    const setMeta = (selector, content) => {
      const el = document.querySelector(selector)
      if (el && content) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', content)
    }
    const pageUrl = new URL(`article.html?id=${encodeURIComponent(article.id)}`, window.location.href).href
    setMeta('meta[property="og:image"]', article.thumbnail.startsWith('http') ? article.thumbnail : baseUrl + article.thumbnail.replace(/^\//, ''))
    setMeta('meta[property="og:title"]', `${article.title} — PB2I`)
    setMeta('meta[property="og:description"]', article.excerpt || '')
    setMeta('meta[name="description"]', article.excerpt || '')
    setMeta('meta[property="og:url"]', pageUrl)
    setMeta('link[rel="canonical"]', pageUrl)

    // Render header
    header.innerHTML = `
      <h1 class="text-body font-heading font-bold text-3xl lg:text-4xl leading-tight mb-6" >
        ${article.title}
      </h1>
    `

    // Render body with a elegant, non-invasive layout (floating/sidebar image)
    body.innerHTML = `
      <div class="flex flex-col lg:flex-row gap-10 items-start">
        <!-- Article Text content -->
        <div class="flex-1">
          ${article.content.map(p => `<p class="text-muted text-base leading-loose mb-6" >${p}</p>`).join('')}
        </div>

        <!-- Sidebar Image container -->
        <div class="w-full lg:w-80 flex-shrink-0">
          <figure class="bg-warm-bg p-3 rounded-2xl border shadow-sm" style="border-color:rgba(0,0,0,0.06)">
            <img src="${baseUrl}${article.thumbnail.replace(/^\//, '')}" alt="${article.title}"
              class="w-full h-auto rounded-xl object-cover max-h-60"
              onerror="this.src='${baseUrl}assets/images/placeholder.svg'">
            <figcaption class="text-center text-xs text-black/50 italic mt-2">${article.title}</figcaption>
          </figure>
        </div>
      </div>

      <!-- Author -->
      <div class="border-primary/10 flex items-center gap-3 mt-12 pt-8 border-t" >
        <div class="bg-primary w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
          >${article.author.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
        <div>
          <p class="text-primary text-sm font-semibold" >${article.author}</p>
          <p class="text-black/50 text-xs" >${formatArticleDate(article.date, lang)}</p>
        </div>
      </div>
    `

    // Related articles
    const related = all.filter(a => a.id !== article.id).slice(0, 8) // up to 8 articles for the carousel
    const relTrack = document.getElementById('articles-track')
    if (relTrack) {
      const baseUrl = import.meta.env.BASE_URL || '/'
      relTrack.innerHTML = related.map((a, i) => `
        <div class="carousel-item flex-[0_0_85%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)] min-w-0">
          ${createArticleCard(a, i, baseUrl, lang)}
        </div>
      `).join('')
      initFadeIn('[data-fade]')
      
      initCarousel({
        trackId: 'articles-track',
        dotsId: 'articles-dots',
        itemSelector: '.carousel-item',
        visibleFn: () => window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1,
        carouselId: 'articles-carousel'
      })
    }

  } catch {
    if (header) header.innerHTML = '<h1 class="text-2xl font-bold text-gray-800">Article non trouvé</h1>'
    if (body)   body.innerHTML   = `<p class="text-gray-500">${t('ui.article_not_found', "Cet article n'existe pas ou a été supprimé.")}</p>`
  }
}

loadArticle()
