/**
 * PB2I — Magnétographie page JS
 */
import { mountComponents, refreshNavbar, initFadeIn, bindMachineModal } from '../../components.js'
import { fetchCollection, prefetch } from '../../utils/api.js'
import { initI18n, translateDOM } from '../../utils/i18n.js'

mountComponents('magnetographie')
prefetch('collections/magnetographie.json')
initI18n().then(() => { refreshNavbar('magnetographie'); translateDOM() })

const baseUrl = import.meta.env.BASE_URL || '/'

// ── Refs & Modal binder ─────────────────────────────────────────
const grid = document.getElementById('tech-grid')
const { openMachineModal } = bindMachineModal(baseUrl)

// ── Load & render tech ────────────────────────────────────────
async function loadTechnologies() {
  if (!grid) return
  try {
    const data = await fetchCollection('magnetographie')
    const techs = data.technologies || []

    grid.innerHTML = techs.map((t, i) => `
      <button
        class="card-machine h-full"
        data-id="${t.id}" data-fade
        style="animation-delay:${i * 40}ms"
        aria-label="En savoir plus sur ${t.name}">
        <img src="${baseUrl}${t.image.startsWith('/') ? t.image.slice(1) : t.image}" alt="${t.name}"
          class="w-full h-24 object-contain mx-auto mb-4"
          loading="lazy"
          onerror="this.onerror=null;this.src='${baseUrl}assets/images/placeholder.svg'">
        <p class="text-body font-heading font-bold text-sm leading-snug transition-colors duration-200">
          ${t.name}
        </p>
      </button>
    `).join('')

    grid.querySelectorAll('[data-id]').forEach(btn => {
      const tech = techs.find(t => t.id === btn.dataset.id)
      if (!tech) return
      btn.addEventListener('click', () => openMachineModal(tech))
    })

    initFadeIn('[data-fade]')

  } catch (err) {
    console.error('Error loading technologies:', err)
    grid.innerHTML = '<p class="col-span-full text-center text-sm text-gray-400 italic py-8">Impossible de charger les technologies.</p>'
  }
}

loadTechnologies()
