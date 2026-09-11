/**
 * PB2I — i18n utility
 * Loads UI translations from /data/{lang}/ui.json.
 * Falls back to key path if a translation is missing.
 */
import { getActiveLang } from './lang.js'
import { fetchJSON } from './api.js'

let translations = {}

export async function initI18n() {
  try {
    translations = await fetchJSON('ui.json')
  } catch (err) {
    console.warn('[i18n] Could not load translations, using key fallback.')
  }
}

export function t(keyPath, fallback) {
  const keys = keyPath.split('.')
  let value = translations
  for (const key of keys) {
    if (value && value[key] !== undefined) {
      value = value[key]
    } else {
      return fallback ?? keyPath // Fallback to provided default, else key
    }
  }
  return typeof value === 'string' ? value : (fallback ?? keyPath)
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
