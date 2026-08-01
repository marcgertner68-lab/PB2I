/**
 * PB2I — Musée page JS
 * Loads machines from JSON, renders grid, handles modal
 */
import { mountComponents, refreshNavbar, initFadeIn, bindMachineModal } from '../../components.js'
import { fetchCollection, prefetch } from '../../utils/api.js'
import { initI18n, translateDOM } from '../../utils/i18n.js'

// 1) Render immediately
mountComponents('musee')
// 2) Data + i18n in parallel
prefetch('collections/musee.json')
initI18n().then(() => { refreshNavbar('musee'); translateDOM() })

const baseUrl = import.meta.env.BASE_URL || '/'

// ── Refs & Modal binder ─────────────────────────────────────────
const grid = document.getElementById('machines-grid')
const { openMachineModal } = bindMachineModal(baseUrl)

// ── Load & render machines ────────────────────────────────────
async function loadMachines() {
  if (!grid) return
  try {
    const data = await fetchCollection('musee') // already cached from prefetch
    const machines = data.machines || []

    grid.innerHTML = machines.map((m, i) => `
      <button
        class="card-machine h-full"
        data-id="${m.id}" data-fade
        style="animation-delay:${i * 40}ms"
        aria-label="En savoir plus sur ${m.name}">
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
    grid.innerHTML = '<p class="col-span-full text-center text-sm text-gray-400 italic py-8">Impossible de charger les machines.</p>'
  }
}

loadMachines()
