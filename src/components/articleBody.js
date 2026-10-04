/**
 * PB2I — Article body renderer
 *
 * An article `content` array is a list of blocks, rendered in order:
 *   "un paragraphe"                                  → <p>
 *   { "type": "image", "src": "...", "caption": "…" } → <figure> at that exact spot
 *
 * Legacy articles (only strings in `content`, images listed in `images`) keep
 * rendering as before: images not already placed inline fall back to the
 * trailing gallery, so both schemas can coexist.
 */

import { parseInlineMarkdown } from '../utils/markdown.js'

/** Extra classes an inline figure takes, keyed by the block's `size` field. */
const FIGURE_LAYOUTS = {
  wide:  'sm:col-span-full',
  half:  'sm:col-span-1',
  third: 'sm:col-span-1 lg:col-span-1',
}

/**
 * Renders the article `content` blocks.
 *
 * @param {Array<string|object>} content - ordered blocks
 * @param {object} ctx
 * @param {string} ctx.baseUrl      - site base URL, for asset resolution
 * @param {string} ctx.title        - article title, used as fallback alt text
 * @returns {{html: string, usedImages: Set<string>}} rendered HTML + inline image sources
 */
export function renderArticleContent(content, { baseUrl = '/', title = '' } = {}) {
  const usedImages = new Set()
  const blocks = Array.isArray(content) ? content : []

  const html = blocks.map(block => {
    if (typeof block === 'string') {
      const text = parseInlineMarkdown(block.trim())
      return text ? `<p class="text-muted text-base leading-loose mb-6">${text}</p>` : ''
    }
    if (block && block.type === 'image') {
      const src = block.src
      if (!src) return ''
      usedImages.add(src)
      return renderInlineFigure(block, { baseUrl, title })
    }
    // Unknown block type: never silently drop content that may be a typo.
    console.warn('[article] unknown content block, rendered as text:', block)
    return typeof block?.text === 'string'
      ? `<p class="text-muted text-base leading-loose mb-6">${parseInlineMarkdown(block.text)}</p>`
      : ''
  }).join('')

  return { html, usedImages }
}

/**
 * Renders the trailing gallery for images that were not placed inline.
 *
 * @param {string[]} images
 * @param {Set<string>} usedImages - sources already rendered inside the text
 */
export function renderArticleGallery(images, usedImages = new Set()) {
  const remaining = (images || []).filter(img => img && !usedImages.has(img))
  if (remaining.length === 0) return ''
  return `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      ${remaining.map(renderThumb).join('')}
    </div>
  `
}

function assetUrl(src, baseUrl) {
  return src.startsWith('/') ? baseUrl + src.slice(1) : src
}

function renderInlineFigure(block, { baseUrl, title }) {
  const layoutClass = FIGURE_LAYOUTS[block.size] || ''
  const caption = block.caption
    ? `<figcaption class="text-center text-xs text-black/50 italic mt-2">${parseInlineMarkdown(block.caption)}</figcaption>`
    : ''
  return `
    <figure class="${layoutClass} my-8">
      <img src="${assetUrl(block.src, baseUrl)}" alt="${block.alt || title}" loading="lazy"
        class="w-full h-auto rounded-xl shadow-sm border border-black/5 cursor-zoom-in hover:shadow-md transition-shadow"
        onclick="window.open(this.src, '_blank')"
        onerror="this.onerror=null;this.remove()">
      ${caption}
    </figure>
  `
}

function renderThumb(img) {
  return `
    <figure class="rounded-xl overflow-hidden shadow-sm border border-black/5 hover:shadow-md transition-shadow">
      <img src="${img}" alt="" class="w-full h-40 object-cover cursor-pointer" loading="lazy" onerror="this.style.display='none'" onclick="window.open(this.src, '_blank')">
    </figure>
  `
}