/**
 * PB2I — Actualités JS
 */
import { mountComponents, refreshNavbar, initFadeIn, createArticleCard, renderLoadError } from '../components.js'
import { fetchArticles, prefetch } from '../utils/api.js'
import { initI18n, translateDOM, t } from '../utils/i18n.js'

window.PB2I_PAGE = 'articles'

mountComponents('actualites')
prefetch('articles.json')
const i18nReady = initI18n()
i18nReady.then(() => { refreshNavbar('actualites'); translateDOM() })

async function loadArticles() {
  const grid      = document.getElementById('articles-grid')
  const noArticle = document.getElementById('no-articles')
  if (!grid) return

  try {
    const baseUrl = import.meta.env.BASE_URL || '/'
    // Wait for translations too, so cards render in the right language
    const [articles] = await Promise.all([fetchArticles(), i18nReady])
    const lang = document.documentElement.lang || 'fr'

    if (!articles.length) {
      grid.innerHTML = ''
      noArticle?.classList.remove('hidden')
      return
    }

    grid.innerHTML = articles.map((a, i) => createArticleCard(a, i, baseUrl, lang)).join('')

    initFadeIn('[data-fade]')
  } catch (err) {
    console.error(err)
    renderLoadError(grid, {
      message: t('ui.articles_error', 'Impossible de charger les articles.'),
      onRetry: loadArticles,
    })
  }
}

loadArticles()
