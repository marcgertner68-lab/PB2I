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

export function t(keyPath) {
  const keys = keyPath.split('.')
  let value = translations
  for (const key of keys) {
    if (value && value[key] !== undefined) {
      value = value[key]
    } else {
      return keyPath // Fallback to key
    }
  }
  return typeof value === 'string' ? value : keyPath
}

/**
 * Translate all elements that have a [data-i18n] attribute.
 * Currently disabled — re-enable when static pages have data-i18n attributes.
 */
export function translateDOM() {
  // Désactivé à la demande de l'utilisateur : seule la navbar est traduite.
  /*
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    const translation = t(key)
    if (translation !== key) {
      el.innerHTML = translation
    }
  })
  */
}

// Global exposure for any inline scripts that need it
window.i18n = { t, translateDOM }
