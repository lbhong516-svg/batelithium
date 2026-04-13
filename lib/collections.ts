export interface CollectionInfo {
  handle: string
  titleKey: string
  icon: string
  descKey: string
}

export const COLLECTIONS: CollectionInfo[] = [
  { handle: 'frontpage', titleKey: 'colFeatured', icon: '\u2B50', descKey: 'colFeaturedDesc' },
  { handle: 'h\u1EC7-th\u1ED1ng-l\u01B0u-tr\u1EEF-nang-l\u01B0\u1EE3ng', titleKey: 'colEnergy', icon: '\uD83D\uDD0B', descKey: 'colEnergyDesc' },
  { handle: 'l\u01B0u-tr\u1EEF-nang-l\u01B0\u1EE3ng-cong-nghi\u1EC7p', titleKey: 'colHomeStorage', icon: '\uD83C\uDFE0', descKey: 'colHomeStorageDesc' },
  { handle: 'l\u01B0u-tr\u1EEF-nang-l\u01B0\u1EE3ng-cong-nghi\u1EC7p-1', titleKey: 'colIndustrial', icon: '\uD83C\uDFED', descKey: 'colIndustrialDesc' },
]

export const BOTTOM_TABS = [
  { href: '/', labelKey: 'home', icon: 'home' },
  { href: '/collections/all', labelKey: 'products', icon: 'grid' },
  { href: '/calculator', labelKey: 'calculator', icon: 'zap' },
  { href: '/contact', labelKey: 'contact', icon: 'message' },
]
