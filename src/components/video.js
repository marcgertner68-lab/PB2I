/**
 * PB2I — Video overlay component
 */

export function createVideoOverlay() {
  return `
  <div id="video-overlay"
    class="fixed inset-0 z-[1000] bg-black/75 backdrop-blur-sm flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-250">
    <div class="relative w-full max-w-4xl mx-4 aspect-video">
      <button id="video-close"
        class="absolute -top-10 right-0 text-white/80 hover:text-white text-3xl font-light bg-transparent border-none cursor-pointer transition-colors"
        aria-label="Fermer la vidéo">✕</button>
      <iframe id="video-iframe" class="w-full h-full rounded-xl shadow-2xl" title="Lecteur vidéo"
        allow="autoplay; fullscreen" allowfullscreen frameborder="0" src=""></iframe>
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
    overlay.classList.add('opacity-0', 'pointer-events-none')
    iframe.src = ''
    document.body.style.overflow = ''
  }

  closeBtn?.addEventListener('click', closeVideo)
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeVideo() })
}
