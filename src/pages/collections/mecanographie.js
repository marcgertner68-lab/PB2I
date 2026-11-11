/**
 * PB2I — Mécanographie page JS
 *
 * Le contenu de cette page est figé en statique dans le HTML : contrairement aux
 * autres collections, il n'y a pas de grille rendue depuis un JSON. Seules les
 * vignettes vidéo sont dynamiques.
 */
import { mountComponents, refreshNavbar, openVideo } from '../../components.js'
import { initI18n, translateDOM } from '../../utils/i18n.js'

mountComponents('mecanographie')
initI18n().then(() => { refreshNavbar('mecanographie'); translateDOM() })

// Tabs switching handler
window.switchTab = function(tab) {
  const btnCarte = document.getElementById('tab-carte')
  const btnFichier = document.getElementById('tab-fichier')
  const contentCarte = document.getElementById('content-carte')
  const contentFichier = document.getElementById('content-fichier')
  if (!btnCarte || !btnFichier || !contentCarte || !contentFichier) return

  const activeCls = 'px-6 py-3 font-bold text-[#205c56] border-b-2 border-[#79C0B8] transition-colors bg-white cursor-pointer'
  const inactiveCls = 'px-6 py-3 font-semibold text-gray-600 border-b-2 border-transparent transition-colors hover:text-gray-800 hover:bg-gray-50 cursor-pointer'
  const isCarte = tab === 'carte'

  btnCarte.className = isCarte ? activeCls : inactiveCls
  btnFichier.className = isCarte ? inactiveCls : activeCls
  btnCarte.setAttribute('aria-selected', String(isCarte))
  btnFichier.setAttribute('aria-selected', String(!isCarte))
  contentCarte.classList.toggle('hidden', !isCarte)
  contentFichier.classList.toggle('hidden', isCarte)
}

// Video modal handlers — static elements in HTML
document.querySelectorAll('.card-video').forEach(card => {
  card.addEventListener('click', () => {
    const videoUrl = card.getAttribute('data-video')
    if (videoUrl) openVideo(videoUrl)
  })
})
