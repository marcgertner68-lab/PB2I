const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imgs = ['og-image', 'imprimantes', 'history-1', 'musee', 'mecanographie'];

async function run() {
  for (const name of imgs) {
    const src = path.resolve(`public/assets/images/${name}.webp`);
    const tmp = path.resolve(`public/assets/images/${name}_tmp.webp`);
    if (!fs.existsSync(src)) { console.log(`Skipping ${name} (not found)`); continue; }
    try {
      const orig = fs.statSync(src).size;
      const info = await sharp(src)
        .resize({ width: 900, withoutEnlargement: true })
        .webp({ quality: 75, effort: 5 })
        .toFile(tmp);
      if (info.size < orig) {
        fs.copyFileSync(tmp, src);
        console.log(`${name}: ${Math.round(orig/1024)}KB → ${Math.round(info.size/1024)}KB (-${Math.round((1-info.size/orig)*100)}%)`);
      } else {
        console.log(`${name}: kept original (${Math.round(orig/1024)}KB, compressed was larger)`);
      }
      fs.unlinkSync(tmp);
    } catch(e) {
      console.error(`${name}: ERROR`, e.message);
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  }
}

run();
