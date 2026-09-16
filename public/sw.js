/**
 * PB2I — Service worker
 *
 * GitHub Pages caps every response at `Cache-Control: max-age=600`, so without
 * this the browser revalidates every file on each visit. Strategies are chosen
 * per resource type so that content stays fresh while the site still opens
 * offline or on a connection that drops.
 */
const VERSION = 'pb2i-v1'
const STATIC = `${VERSION}-static`   // hashed build output — safe to keep
const MEDIA  = `${VERSION}-media`    // images
const DATA   = `${VERSION}-data`     // pages and JSON
const MEDIA_MAX = 80
const NET_TIMEOUT = 4000

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys()
    await Promise.all(names.filter(n => !n.startsWith(VERSION)).map(n => caches.delete(n)))
    await self.clients.claim()
  })())
})

/** Network, but never hang: fall back to whatever we have cached. */
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), NET_TIMEOUT)
  try {
    const response = await fetch(request, { signal: controller.signal })
    if (response && response.ok) cache.put(request, response.clone())
    return response
  } catch {
    const cached = await cache.match(request)
    if (cached) return cached
    throw new Error('offline and not cached')
  } finally {
    clearTimeout(timer)
  }
}

/** Hashed files never change under the same name. */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response && response.ok) cache.put(request, response.clone())
  return response
}

/** Serve at once, refresh in the background, keep the cache bounded. */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  const network = fetch(request)
    .then(async response => {
      if (response && response.ok) {
        await cache.put(request, response.clone())
        const keys = await cache.keys()
        if (keys.length > MEDIA_MAX) await cache.delete(keys[0])
      }
      return response
    })
    .catch(() => cached)
  return cached || network
}

self.addEventListener('fetch', event => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  // Leave other origins alone: maps, video embeds, fonts from elsewhere.
  if (url.origin !== self.location.origin) return
  // A 23 MB PDF has no business in a cache meant for browsing.
  if (url.pathname.startsWith('/assets/pdf/')) return

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, DATA))
    return
  }
  if (/\.(js|css|woff2?)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC))
    return
  }
  if (/\.(webp|png|jpe?g|gif|svg|ico)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, MEDIA))
    return
  }
  if (url.pathname.endsWith('.json')) {
    event.respondWith(networkFirst(request, DATA))
  }
})
