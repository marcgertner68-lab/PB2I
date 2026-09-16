/**
 * PB2I — i18n utility
 * Loads UI translations from /data/{lang}/ui.json.
 * Missing keys fall back to the bundled French strings, then to the key path.
 */
import { getActiveLang } from './lang.js'
import { fetchJSON } from './api.js'
// Bundled so the UI never shows raw keys ("navbar.histoire") while ui.json is
// still on its way — or if it never arrives on a poor connection.
import frDefaults from '../../public/data/fr/ui.json'

let translations = {}

// Pages wait for translations before rendering generated content. On a slow
// connection that wait is capped: content shows in French, and the interface
// is re-translated if the file lands later.
const I18N_WAIT_MS = 3000

export function initI18n() {
  const load = fetchJSON('ui.json', { timeout: 6000 })
    .then(data => { translations = data; return true })
    .catch(() => {
      console.warn('[i18n] Could not load translations, using French defaults.')
      return false
    })
  const cap = new Promise(resolve => setTimeout(() => resolve('late'), I18N_WAIT_MS))

  return Promise.race([load, cap]).then(result => {
    if (result !== 'late') return
    load.then(ok => {
      if (!ok) return
      translateDOM()
      document.dispatchEvent(new CustomEvent('pb2i:i18n-late'))
    })
  })
}

function lookup(dict, keys) {
  let value = dict
  for (const key of keys) {
    if (value && value[key] !== undefined) value = value[key]
    else return undefined
  }
  return typeof value === 'string' ? value : undefined
}

export function t(keyPath, fallback) {
  const keys = keyPath.split('.')
  return lookup(translations, keys) ?? lookup(frDefaults, keys) ?? fallback ?? keyPath
}

/**
 * Translate all elements that have a [data-i18n] attribute.
 * The French source text lives in the HTML; if a key is missing from the
 * active language's ui.json, the element is left untouched (French fallback).
 */
export function translateDOM() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    const translation = t(key)
    if (translation !== key) {
      el.innerHTML = translation
    }
  })
  // Attribute variants (placeholders, aria-labels, alt text, tooltips)
  const attrMap = {
    'data-i18n-placeholder': 'placeholder',
    'data-i18n-aria-label': 'aria-label',
    'data-i18n-alt': 'alt',
    'data-i18n-title': 'title',
  }
  for (const [dataAttr, target] of Object.entries(attrMap)) {
    document.querySelectorAll(`[${dataAttr}]`).forEach(el => {
      const key = el.getAttribute(dataAttr)
      const translation = t(key)
      if (translation !== key) el.setAttribute(target, translation)
    })
  }
  translateMeta()
}

const OG_LOCALES = { fr: 'fr_FR', en: 'en_GB', de: 'de_DE' }

function setMetaContent(selector, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute('content', value)
}

/**
 * Translate the page's <title> and social/SEO meta tags.
 *
 * The page identifies itself via <html data-page="..."> and the strings live
 * under `meta.<page>` in ui.json. A page without a key keeps its French HTML
 * source, so adding a page never breaks the build.
 */
export function translateMeta() {
  const page = document.documentElement.dataset.page
  const lang = document.documentElement.lang || 'fr'

  const locale = OG_LOCALES[lang]
  if (locale) setMetaContent('meta[property="og:locale"]', locale)

  if (!page) return

  const title = t(`meta.${page}.title`)
  if (title !== `meta.${page}.title`) {
    document.title = title
    setMetaContent('meta[property="og:title"]', title)
  }

  const description = t(`meta.${page}.description`)
  if (description !== `meta.${page}.description`) {
    setMetaContent('meta[name="description"]', description)
    setMetaContent('meta[property="og:description"]', description)
  }
}

// Global exposure for any inline scripts that need it
window.i18n = { t, translateDOM, translateMeta }
