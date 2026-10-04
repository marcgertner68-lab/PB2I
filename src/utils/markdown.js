/**
 * PB2I — Inline markdown
 *
 * Minimal inline formatting shared by the machine descriptions (modal.js) and
 * the article bodies (articleBody.js): bold, italic and links.
 *
 * The link pattern deliberately refuses a leading `!` so an image syntax
 * `![alt](src)` is never turned into a broken `!<a>` — image placement is
 * handled by structured data, not by markdown.
 */

export function parseInlineMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/(^|[^!])\[(.*?)\]\((.*?)\)/g, (match, lead, linkText, url) => {
      const isExternal = url.startsWith('http') || url.startsWith('//');
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `${lead}<a href="${url}"${target} class="text-primary underline font-bold hover:text-primary-light transition-colors">${linkText}</a>`;
    });
}