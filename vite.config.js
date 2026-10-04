import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'fs'
import { resolve } from 'path'

/**
 * Exposes public/data/fr/ui.json to the bundler as `virtual:pb2i-fr-ui-defaults`.
 *
 * That file stays the single source of truth in public/ — it is what the site
 * fetches at runtime — but Vite refuses to import anything from the public
 * directory. Exposing it as a virtual module bundles the French fallbacks
 * without duplicating the JSON into src/.
 */
function frUiDefaults() {
  const id = 'virtual:pb2i-fr-ui-defaults'
  const resolved = '\0' + id
  return {
    name: 'pb2i-fr-ui-defaults',
    resolveId: source => (source === id ? resolved : null),
    load(source) {
      if (source !== resolved) return null
      return `export default ${readFileSync(resolve(import.meta.dirname, 'public/data/fr/ui.json'), 'utf-8')}`
    },
  }
}

export default defineConfig(() => ({
  // Domaine dédié pb2i-belfort.fr : le site est servi à la racine.
  base: '/',
  plugins: [
    tailwindcss(),
    frUiDefaults(),
  ],
  // Allow fetching local JSON files in dev
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main:          resolve(import.meta.dirname, 'index.html'),
        notreHistoire: resolve(import.meta.dirname, 'notre-histoire.html'),
        nosMissions:   resolve(import.meta.dirname, 'nos-missions.html'),
        association:   resolve(import.meta.dirname, 'association.html'),
        actualites:    resolve(import.meta.dirname, 'actualites.html'),
        article:       resolve(import.meta.dirname, 'article.html'),
        contact:       resolve(import.meta.dirname, 'contact.html'),
        mentionsLegales:resolve(import.meta.dirname, 'mentions-legales.html'),
        mecanographie: resolve(import.meta.dirname, 'collections/mecanographie.html'),
        imprimantes:   resolve(import.meta.dirname, 'collections/imprimantes.html'),
        magnetographie:resolve(import.meta.dirname, 'collections/magnetographie.html'),
        musee:         resolve(import.meta.dirname, 'collections/musee.html'),
      }
    }
  }
}))
