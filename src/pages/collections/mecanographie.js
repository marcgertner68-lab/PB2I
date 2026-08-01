/**
 * PB2I — Mécanographie page JS
 */
import { mountComponents, refreshNavbar, initFadeIn, bindMachineModal, openVideo } from '/src/components.js'
import { initI18n, translateDOM } from '../../utils/i18n.js'
import { fetchCollection, prefetch } from '../../utils/api.js'

mountComponents('mecanographie')
prefetch('collections/mecanographie.json')
initI18n().then(() => { refreshNavbar('mecanographie'); translateDOM() })

const baseUrl = import.meta.env.BASE_URL || '/'

// ── Refs & Modal binder ─────────────────────────────────────────
const grid = document.getElementById('tech-grid')
const { openMachineModal } = bindMachineModal(baseUrl)

// ── Load Data & Build Grid ────────────────────────────────────
async function loadTechs() {
  if (!grid) return

  try {
    const techs = await fetchCollection('mecanographie')

    grid.innerHTML = techs.map(tech => {
      const imgUrl = tech.image.startsWith('/') ? baseUrl + tech.image.slice(1) : tech.image
      return `
      <button class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border text-left flex flex-col group h-full"
        style="border-color:rgba(0,0,0,0.08)"
        data-id="${tech.id}"
        aria-label="Détails : ${tech.name}">
        <div class="bg-warm-bg w-full h-40 overflow-hidden relative">
          <img src="${imgUrl}" alt="${tech.name}" class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" loading="lazy"
            onerror="this.onerror=null;this.src='${baseUrl}assets/images/placeholder.svg'">
        </div>
        <div class="p-4 flex flex-col flex-1">
          <h3 class="text-body font-bold text-sm mb-1">${tech.name}</h3>
          <span class="text-primary text-xs font-semibold mt-auto">En savoir plus ↗</span>
        </div>
      </button>
      `
    }).join('')

    const btns = grid.querySelectorAll('button[data-id]')
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const t = techs.find(x => x.id === btn.getAttribute('data-id'))
        if (t) openMachineModal(t)
      })
    })

    initFadeIn('[data-fade]')

  } catch (err) {
    console.error('Error loading mecanographie JSON:', err)
  }
}

loadTechs()

// Video modal handlers — static elements in HTML
document.querySelectorAll('.card-video').forEach(card => {
  card.addEventListener('click', () => {
    const videoUrl = card.getAttribute('data-video')
    if (videoUrl) openVideo(videoUrl)
  })
})
