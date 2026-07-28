import { docs } from './docs'
import { toNavItem, type DocNavItem } from './docTypes'
import { internalNav } from './internalNav'

export type NavItem = DocNavItem

/**
 * All sidebar entries — public docs plus the (locked) internal docs. Internal
 * entries carry menu metadata only; their bodies are fetched from the
 * protected API after sign-in.
 */
export const navItems: NavItem[] = [...docs.map(toNavItem), ...internalNav]

/** Preferred group order for the sidebar. Unknown groups fall to the end. */
const groupOrder = [
  'Getting started',
  'Deployment',
  'System setup',
  'Alerts',
  'Monitoring',
  'Equature Nexus',
  'Mobile',
  'Reference',
  'Authoring',
]

const rank = (group: string) => {
  const index = groupOrder.indexOf(group)
  return index === -1 ? groupOrder.length : index
}

export const navGroups: Record<string, NavItem[]> = navItems.reduce<
  Record<string, NavItem[]>
>((groups, item) => {
  groups[item.group] = [...(groups[item.group] ?? []), item]
  return groups
}, {})

/** Group entries in the preferred order for rendering. */
export const orderedNavGroups: [string, NavItem[]][] = Object.entries(navGroups).sort(
  ([a], [b]) => rank(a) - rank(b),
)

const internalPaths = new Set(internalNav.map((item) => item.path))

export const isInternalPath = (path: string): boolean => internalPaths.has(path)
