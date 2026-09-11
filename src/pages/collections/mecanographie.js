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

// Video modal handlers — static elements in HTML
document.querySelectorAll('.card-video').forEach(card => {
  card.addEventListener('click', () => {
    const videoUrl = card.getAttribute('data-video')
    if (videoUrl) openVideo(videoUrl)
  })
})
