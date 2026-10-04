/**
 * Vérifie l'internationalisation : parité EN/DE, clés référencées mais absentes,
 * clés définies mais jamais utilisées.  Usage : node scripts/check-i18n.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const load = l => JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data', l, 'ui.json'), 'utf8'))
const flatten = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
  v && typeof v === 'object' ? flatten(v, p + k + '.') : [p + k])

const keys = Object.fromEntries(['fr', 'en', 'de'].map(l => [l, new Set(flatten(load(l)))]))

const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
  const f = path.join(d, e.name)
  if (e.isDirectory()) return ['node_modules', 'dist', '.git'].includes(e.name) ? [] : walk(f)
  return /\.(html|js)$/.test(e.name) ? [f] : []
})

const files = [
  ...walk(path.join(ROOT, 'src')),
  ...fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).map(f => path.join(ROOT, f)),
  ...fs.readdirSync(path.join(ROOT, 'collections')).map(f => path.join(ROOT, 'collections', f)),
]

const referenced = new Map()
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const rel = path.relative(ROOT, f)
  for (const m of src.matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)) referenced.set(m[1], rel)
  for (const m of src.matchAll(/\bt\(\s*'([a-zA-Z0-9_.]+)'/g)) referenced.set(m[1], rel)
  const page = f.endsWith('.html') ? src.match(/<html[^>]*data-page="([^"]+)"/) : null
  if (page) {
    referenced.set(`meta.${page[1]}.title`, rel)
    referenced.set(`meta.${page[1]}.description`, rel)
  }
}

let failed = false
console.log(`Clés : fr=${keys.fr.size}  en=${keys.en.size}  de=${keys.de.size}`)

const onlyEn = [...keys.en].filter(k => !keys.de.has(k))
const onlyDe = [...keys.de].filter(k => !keys.en.has(k))
if (onlyEn.length || onlyDe.length) {
  failed = true
  console.log('Parité en<->de : ÉCART')
  onlyEn.forEach(k => console.log(`  seulement EN : ${k}`))
  onlyDe.forEach(k => console.log(`  seulement DE : ${k}`))
} else console.log('Parité en<->de : OK')

console.log(`\nClés référencées par le code : ${referenced.size}`)
for (const lang of ['en', 'de']) {
  // Les clés présentes en FR servent de repli embarqué : elles ne sont pas exigées.
  const missing = [...referenced].filter(([k]) => !keys[lang].has(k) && !keys.fr.has(k))
  if (missing.length) failed = true
  console.log(`  manquantes en ${lang.toUpperCase()} : ${missing.length}`)
  missing.forEach(([k, f]) => console.log(`    ${k}   (${f})`))
}

const unused = [...keys.en].filter(k => !referenced.has(k))
console.log(`\nClés définies en EN mais non référencées : ${unused.length}`)
unused.forEach(k => console.log(`  ${k}`))

process.exit(failed ? 1 : 0)
