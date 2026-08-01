/**
 * PB2I — Mentions Légales page JS
 */
import { mountComponents, refreshNavbar } from '../components.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'mentions-legales'
mountComponents('')
initI18n().then(() => { refreshNavbar(''); translateDOM() })
