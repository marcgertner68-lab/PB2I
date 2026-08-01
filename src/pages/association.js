/**
 * PB2I — Association page JS
 */
import { mountComponents, refreshNavbar } from '../components.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'association'
mountComponents('association')
initI18n().then(() => { refreshNavbar('association'); translateDOM() })
