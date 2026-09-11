/**
 * PB2I — Magnétographie page JS
 */
import { mountComponents, refreshNavbar, initFadeIn, bindMachineModal } from '../../components.js'
import { fetchCollection, prefetch } from '../../utils/api.js'
import { initI18n, translateDOM, t } from '../../utils/i18n.js'

mountComponents('magnetographie')
prefetch('collections/magnetographie.json')
const i18nReady = initI18n()
i18nReady.then(() => { refreshNavbar('magnetographie'); translateDOM() })

const baseUrl = import.meta.env.BASE_URL || '/'

// ── Refs & Modal binder ─────────────────────────────────────────
const grid = document.getElementById('tech-grid')
const { openMachineModal } = bindMachineModal(baseUrl)

// ── Load & render tech ────────────────────────────────────────
async function loadTechnologies() {
  if (!grid) return
  try {
    // Wait for translations too, so the generated aria-labels are localized.
    const [data] = await Promise.all([fetchCollection('magnetographie'), i18nReady])
    const techs = data.technologies || []
    const learnMore = t('ui.learn_more_about', 'En savoir plus sur')

    grid.innerHTML = techs.map((tech, i) => `
      <button
        class="card-machine h-full"
        data-id="${tech.id}" data-fade
        style="animation-delay:${i * 40}ms"
        aria-label="${learnMore} ${tech.name}">
        <img src="${baseUrl}${tech.image.startsWith('/') ? tech.image.slice(1) : tech.image}" alt="${tech.name}"
          class="w-full h-24 object-contain mx-auto mb-4"
          loading="lazy"
          onerror="this.onerror=null;this.src='${baseUrl}assets/images/placeholder.svg'">
        <p class="text-body font-heading font-bold text-sm leading-snug transition-colors duration-200">
          ${tech.name}
        </p>
      </button>
    `).join('')

    grid.querySelectorAll('[data-id]').forEach(btn => {
      const tech = techs.find(x => x.id === btn.dataset.id)
      if (!tech) return
      btn.addEventListener('click', () => openMachineModal(tech))
    })

    initFadeIn('[data-fade]')

  } catch (err) {
    console.error('Error loading technologies:', err)
    grid.innerHTML = `<p class="col-span-full text-center text-sm text-gray-400 italic py-8">${t('ui.tech_error', 'Impossible de charger les technologies.')}</p>`
  }
}

loadTechnologies()
