/**
 * PB2I — Nos missions page JS
 */
import { mountComponents, refreshNavbar } from '../components.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'missions'
mountComponents('missions')
initI18n().then(() => { refreshNavbar('missions'); translateDOM() })
