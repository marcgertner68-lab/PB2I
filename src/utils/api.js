/**
 * PB2I — Shared API/Fetch Utils
 * In-memory cache, FR fallback for missing translations, and resilience for
 * slow or unstable connections (timeout + retry with backoff).
 */
import { getActiveLang } from './lang.js'

// A stalled request would otherwise leave skeletons on screen forever.
const TIMEOUT_MS = 8000
// Extra attempts after the first one; only for network failures and 5xx.
const RETRIES = 2
const BACKOFF_MS = 700

// ── In-memory request cache ───────────────────────────────────
const _cache = new Map()

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

/** True when the error is an HTTP answer the server will repeat (404, 403…). */
export function isHttpClientError(err) {
  return typeof err?.status === 'number' && err.status >= 400 && err.status < 500
}

async function fetchWithRetry(url, { timeout = TIMEOUT_MS, retries = RETRIES } = {}) {
  let lastError
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) {
        const err = new Error(`HTTP ${res.status} for ${url}`)
        err.status = res.status
        throw err
      }
      return await res.json()
    } catch (err) {
      lastError = err
      // Retrying cannot fix a 4xx, and offline there is nothing to retry against:
      // fail fast so the page can offer a retry once the connection is back.
      if (isHttpClientError(err) || navigator.onLine === false) break
      if (attempt < retries) await sleep(BACKOFF_MS * 2 ** attempt)
    } finally {
      clearTimeout(timer)
    }
  }
  throw lastError
}

export async function fetchJSON(path, { lang: forceLang, timeout, retries } = {}) {
  const lang = forceLang || getActiveLang() || 'fr'
  const baseUrl = import.meta.env.BASE_URL || '/'

  // Normalize path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const url = `${baseUrl}data/${lang}/${cleanPath}`

  // Return cached promise if already in flight or done
  if (_cache.has(url)) return _cache.get(url)

  const promise = fetchWithRetry(url, { timeout, retries })
    .catch(err => {
      // Forget the failure so a later call (retry button, connection back) refetches.
      _cache.delete(url)
      // A missing translation file falls back to French. A network failure does
      // not: the French file would fail the same way and double the wait.
      if (lang !== 'fr' && isHttpClientError(err)) {
        console.warn(`[i18n] Falling back to FR for: ${cleanPath}`)
        return fetchJSON(path, { lang: 'fr', timeout, retries })
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
