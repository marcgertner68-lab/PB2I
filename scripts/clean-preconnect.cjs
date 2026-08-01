// Remove Google Fonts preconnect links from all HTML files (fonts are now self-hosted)
const fs = require('fs')
const path = require('path')

function walk(dir) {
  let results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', '.git', '_site'].includes(entry.name)) continue
      results = results.concat(walk(full))
    } else if (entry.name.endsWith('.html')) {
      results.push(full)
    }
  }
  return results
}

const root = path.resolve(__dirname, '..')
const files = walk(root)

// Remove preconnect/dns-prefetch to Google Fonts and Unsplash (no longer needed)
const patterns = [
  /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\n?/g,
  /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\n?/g,
  /<link rel="dns-prefetch" href="https:\/\/images\.unsplash\.com">\n?/g,
]

let updated = 0
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8')
  let changed = false
  for (const re of patterns) {
    re.lastIndex = 0
    const next = content.replace(re, '')
    if (next !== content) { content = next; changed = true }
  }
  if (changed) {
    fs.writeFileSync(file, content, 'utf8')
    updated++
    console.log('Cleaned:', path.relative(root, file))
  }
}
console.log(`Done — ${updated} HTML files cleaned`)
