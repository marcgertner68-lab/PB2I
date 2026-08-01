/**
 * PB2I — Shared API/Fetch Utils
 * With in-memory cache and FR fallback for missing translations.
 */
import { getActiveLang } from './lang.js'

// ── In-memory request cache ───────────────────────────────────
const _cache = new Map()

export async function fetchJSON(path, { lang: forceLang } = {}) {
  const lang = forceLang || getActiveLang() || 'fr'
  const baseUrl = import.meta.env.BASE_URL || '/'

  // Normalize path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const url = `${baseUrl}data/${lang}/${cleanPath}`

  // Return cached promise if already in flight or done
  if (_cache.has(url)) return _cache.get(url)

  const promise = fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
      return res.json()
    })
    .catch(async err => {
      // Fallback to French if another language fails
      if (lang !== 'fr') {
        console.warn(`[i18n] Falling back to FR for: ${cleanPath}`)
        return fetchJSON(path, { lang: 'fr' })
      }
      console.error(`[api] Failed to load ${path}:`, err)
      throw err
    })

  _cache.set(url, promise)
  return promise
}

export async function fetchArticles() {
  const data = await fetchJSON('articles.json')
  return data.articles || []
}

export async function fetchCollection(collectionName) {
  return fetchJSON(`collections/${collectionName}.json`)
}

/** Prefetch a list of JSON files in parallel (call early to warm cache) */
export function prefetch(...paths) {
  paths.forEach(p => fetchJSON(p).catch(() => {}))
}
