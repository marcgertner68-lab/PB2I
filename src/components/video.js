/**
 * PB2I — Video overlay component
 */

export function createVideoOverlay() {
  return `
  <div id="video-overlay"
    class="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 opacity-0 pointer-events-none transition-all duration-200">
    <div class="relative w-full max-w-4xl aspect-video bg-black rounded-2xl shadow-2xl overflow-visible">
      <button id="video-close"
        class="absolute -top-12 right-0 sm:-top-5 sm:-right-5 z-50 w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-gray-100 flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer border-none"
        aria-label="Fermer la vidéo" title="Fermer (Échap)">
        <svg class="w-5 h-5 fill-none stroke-current" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <iframe id="video-iframe" class="w-full h-full rounded-2xl" title="Lecteur vidéo" data-i18n-title="ui.video_player"
        allow="autoplay; fullscreen" frameborder="0" src=""></iframe>
    </div>
  </div>
  `
}

export function openVideo(videoUrlOrId) {
  const overlay = document.getElementById('video-overlay')
  const iframe  = document.getElementById('video-iframe')
  if (!overlay || !iframe) return

  let srcUrl = ''
  if (videoUrlOrId.includes('vimeo.com')) {
    const match = videoUrlOrId.match(/vimeo\.com\/(\d+)/)
    const id = match ? match[1] : videoUrlOrId
    srcUrl = `https://player.vimeo.com/video/${id}?autoplay=1`
  } else if (videoUrlOrId.includes('youtube.com') || videoUrlOrId.includes('youtu.be')) {
    let id = videoUrlOrId
    if (videoUrlOrId.includes('watch?v=')) {
      id = videoUrlOrId.split('watch?v=')[1].split('&')[0]
    } else if (videoUrlOrId.includes('youtu.be/')) {
      id = videoUrlOrId.split('youtu.be/')[1].split('?')[0]
    } else if (videoUrlOrId.includes('embed/')) {
      id = videoUrlOrId.split('embed/')[1].split('?')[0]
    }
    srcUrl = `https://www.youtube.com/embed/${id}?autoplay=1`
  } else {
    srcUrl = `https://www.youtube.com/embed/${videoUrlOrId}?autoplay=1`
  }

  iframe.src = srcUrl
  overlay.classList.remove('opacity-0', 'pointer-events-none')
  overlay.classList.add('opacity-100', 'pointer-events-auto')
  document.body.style.overflow = 'hidden'
}

export function initVideoOverlayClose() {
  const overlay = document.getElementById('video-overlay')
  const iframe  = document.getElementById('video-iframe')
  const closeBtn = document.getElementById('video-close')

  function closeVideo() {
    if (!overlay || !iframe) return
    overlay.classList.remove('opacity-100', 'pointer-events-auto')
    overlay.classList.add('opacity-0', 'pointer-events-none')
    iframe.src = ''
    document.body.style.overflow = ''
  }

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation()
    closeVideo()
  })

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.id === 'video-overlay') {
      closeVideo()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && !overlay.classList.contains('pointer-events-none')) {
      closeVideo()
    }
  })
}
