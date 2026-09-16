/**
 * PB2I — Load failure notice
 *
 * Replaces a loading area with an explanation and a retry button, instead of
 * leaving skeletons or a dead-end message when the network is slow or absent.
 * Colours are inherited, so the same notice works on white and on dark red.
 */
import { t } from '../utils/i18n.js'

export function renderLoadError(container, { message, onRetry }) {
  if (!container) return

  const offline = navigator.onLine === false
  const text = offline
    ? t('ui.offline', 'Vous êtes hors ligne. Le contenu se chargera au retour de la connexion.')
    : message

  container.innerHTML = `
    <div class="load-error col-span-full" role="alert">
      <p>${text}</p>
      <button type="button" class="load-error-retry">${t('ui.retry', 'Réessayer')}</button>
    </div>`

  const button = container.querySelector('.load-error-retry')
  let launched = false
  const retry = () => {
    if (launched) return
    launched = true
    window.removeEventListener('online', retry)
    button.disabled = true
    button.textContent = t('ui.loading', 'Chargement…')
    onRetry()
  }

  button.addEventListener('click', retry)
  // Coming back online is the most common way this resolves.
  window.addEventListener('online', retry)
}
