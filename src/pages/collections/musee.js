/**
 * PB2I — Musée page JS
 * Loads machines from JSON, renders grid, handles modal
 */
import { mountComponents, refreshNavbar, initFadeIn, bindMachineModal, renderLoadError } from '../../components.js'
import { fetchCollection, prefetch } from '../../utils/api.js'
import { initI18n, translateDOM, t } from '../../utils/i18n.js'

// 1) Render immediately
mountComponents('musee')
// 2) Data + i18n in parallel
prefetch('collections/musee.json')
const i18nReady = initI18n()
i18nReady.then(() => { refreshNavbar('musee'); translateDOM() })

const baseUrl = import.meta.env.BASE_URL || '/'

// ── Refs & Modal binder ─────────────────────────────────────────
const grid = document.getElementById('machines-grid')
const { openMachineModal } = bindMachineModal(baseUrl)

// ── Load & render machines ────────────────────────────────────
async function loadMachines() {
  if (!grid) return
  try {
    // Data is already cached from the prefetch above; wait for translations too,
    // so the generated aria-labels are localized.
    const [data] = await Promise.all([fetchCollection('musee'), i18nReady])
    const machines = data.machines || []
    const learnMore = t('ui.learn_more_about', 'En savoir plus sur')

    grid.innerHTML = machines.map((m, i) => `
      <button
        class="card-machine h-full"
        data-id="${m.id}" data-fade
        style="animation-delay:${i * 40}ms"
        aria-label="${learnMore} ${m.name}">
        <img src="${baseUrl}${m.image.startsWith('/') ? m.image.slice(1) : m.image}" alt="${m.name}"
          class="w-28 h-24 object-contain mx-auto"
          loading="lazy"
          onerror="this.onerror=null;this.src='${baseUrl}assets/images/placeholder.svg'">
        <p class="text-body font-heading font-bold text-sm leading-snug text-center transition-colors duration-200">
          ${m.name}
        </p>
      </button>
    `).join('')

    // Attach click handlers
    grid.querySelectorAll('[data-id]').forEach(btn => {
      const machine = machines.find(m => m.id === btn.dataset.id)
      if (!machine) return
      btn.addEventListener('click', () => openMachineModal(machine))
    })

    initFadeIn('[data-fade]')

  } catch (err) {
    console.error('Error loading machines:', err)
    renderLoadError(grid, {
      message: t('ui.machines_error', 'Impossible de charger les machines.'),
      onRetry: loadMachines,
    })
  }
}

loadMachines()
