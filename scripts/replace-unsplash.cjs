const fs = require('fs')
const path = require('path')

const placeholder = '/assets/images/placeholder.svg'
const unsplashRe = /https:\/\/images\.unsplash\.com\/[^\s'">`]+/g

function walk(dir, exts) {
  let results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(entry.name)) continue
      results = results.concat(walk(full, exts))
    } else if (exts.some(e => entry.name.endsWith(e))) {
      results.push(full)
    }
  }
  return results
}

const root = path.resolve(__dirname, '..')
const files = walk(root, ['.js', '.html'])

let updated = 0
for (const file of files) {
  const orig = fs.readFileSync(file, 'utf8')
  if (!unsplashRe.test(orig)) continue
  unsplashRe.lastIndex = 0
  const next = orig.replace(unsplashRe, placeholder)
  if (next !== orig) {
    fs.writeFileSync(file, next, 'utf8')
    updated++
    console.log('Updated:', path.relative(root, file))
  }
}
console.log(`Done — ${updated} files updated`)
