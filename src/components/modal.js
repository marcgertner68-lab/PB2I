/**
 * PB2I — Modal helpers (shared across pages)
 */

let _openModals = [];

export function openModal(overlayEl) {
  if (!overlayEl) return;
  overlayEl.classList.remove('opacity-0', 'pointer-events-none');
  overlayEl.classList.add('opacity-100', 'pointer-events-auto');
  document.body.style.overflow = 'hidden';
  _openModals.push(overlayEl);
}

export function closeModal(overlayEl) {
  if (!overlayEl) return;
  overlayEl.classList.add('opacity-0', 'pointer-events-none');
  overlayEl.classList.remove('opacity-100', 'pointer-events-auto');
  _openModals = _openModals.filter(m => m !== overlayEl);
  if (_openModals.length === 0) document.body.style.overflow = '';
}

export function closeAllModals() {
  [..._openModals].forEach(m => closeModal(m));
}

/**
 * Binds DOM elements of the machine details modal and returns the open helper.
 * Centralizes the markdown descriptions formatting (lists, image embedding) and events.
 * @param {string} baseUrl - site base URL for asset resolution
 */
export function bindMachineModal(baseUrl = '/') {
  const overlay    = document.getElementById('machine-overlay');
  const modalImg   = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalName  = document.getElementById('modal-name');
  const modalDesc  = document.getElementById('modal-desc');
  const closeBtn   = document.getElementById('modal-close');

  if (!overlay) return { openMachineModal: () => {} };

  function parseInlineMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, (match, linkText, url) => {
        const isExternal = url.startsWith('http') || url.startsWith('//');
        const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${url}"${target} class="text-primary underline font-bold hover:text-primary-light transition-colors">${linkText}</a>`;
      });
  }

  // Format description text supporting list items and inline images
  function formatDescription(rawDesc) {
    if (!rawDesc) return '';
    const formatted = rawDesc.split('\n').reduce((acc, line) => {
      line = line.trim();
      if (!line) return acc;

      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        if (acc.inList) {
          acc.html += '</ul>';
          acc.inList = false;
        }
        const alt = imgMatch[1];
        const src = imgMatch[2].startsWith('/') ? baseUrl + imgMatch[2].slice(1) : imgMatch[2];
        // Une illustration absente ne doit pas laisser d'icône cassée dans la modale.
        acc.html += `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.remove()" class="w-auto max-w-full mx-auto rounded-xl my-5 shadow-sm object-contain max-h-72 bg-white p-2 border" style="border-color:rgba(0,0,0,0.08)">`;
        return acc;
      }

      if (line.startsWith('- ') || line.startsWith('• ')) {
        if (!acc.inList) {
          acc.html += '<ul class="list-disc list-inside space-y-1 mb-3 ml-2">';
          acc.inList = true;
        }
        acc.html += `<li>${parseInlineMarkdown(line.substring(2))}</li>`;
      } else {
        if (acc.inList) {
          acc.html += '</ul>';
          acc.inList = false;
        }
        acc.html += `<p class="mb-3">${parseInlineMarkdown(line)}</p>`;
      }
      return acc;
    }, { html: '', inList: false });

    if (formatted.inList) formatted.html += '</ul>';
    return formatted.html;
  }

  function openMachineModal(item) {
    if (modalTitle) modalTitle.textContent = item.name;
    if (modalName) modalName.textContent  = item.name;
    if (modalDesc) modalDesc.innerHTML    = formatDescription(item.description);
    if (modalImg) {
      modalImg.src = item.image.startsWith('/') ? baseUrl + item.image.slice(1) : item.image;
      modalImg.alt = item.name;
    }

    const scrollContainer = overlay.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTop = 0;

    openModal(overlay);
  }

  closeBtn?.addEventListener('click', () => closeModal(overlay));
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal(overlay);
  });

  return { openMachineModal };
}
