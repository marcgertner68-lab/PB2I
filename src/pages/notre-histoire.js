/**
 * PB2I — Notre histoire page JS
 */
import { mountComponents, refreshNavbar } from '../components.js'
import { initI18n, translateDOM } from '../utils/i18n.js'

window.PB2I_PAGE = 'histoire'
mountComponents('histoire')
initI18n().then(() => { refreshNavbar('histoire'); translateDOM() })
