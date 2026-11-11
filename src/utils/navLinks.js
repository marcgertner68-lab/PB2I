import { t } from './i18n.js'

export function getLinks(baseUrl = '/') {
  return [
    { label: t('navbar.histoire'),    href: `${baseUrl}notre-histoire.html`, key: 'histoire' },
    { label: t('navbar.association'), href: `${baseUrl}association.html`,    key: 'association' },
    { label: t('navbar.missions'),    href: `${baseUrl}nos-missions.html`,   key: 'missions' },
    { label: t('navbar.actualites'),  href: `${baseUrl}actualites.html`,     key: 'actualites' },
    { label: t('navbar.collections'), href: `${baseUrl}collections/musee.html`, key: 'musee' },
    { label: t('navbar.contact'),     href: `${baseUrl}contact.html`,        key: 'contact' },
  ]
}

export function getCollectionLinks(baseUrl = '/') {
  return [
    { label: t('navbar.mecanographie'),  href: `${baseUrl}collections/mecanographie.html`, key: 'mecanographie' },
    { label: t('navbar.imprimantes'),    href: `${baseUrl}collections/impressions.html`, key: 'impressions' },
    { label: t('navbar.magnetographie'), href: `${baseUrl}collections/magnetographie.html`, key: 'magnetographie' },
  ]
}
