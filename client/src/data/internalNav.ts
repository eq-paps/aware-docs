import type { DocNavItem } from './docTypes'

/**
 * Client-side nav entries for the auth-gated docs. This intentionally carries
 * ONLY menu-level metadata (titles/summaries) so the sidebar can show a locked
 * entry. The procedure bodies live server-side in api/_data/internalDocs.ts and
 * arrive only through the protected /api/internal-docs endpoint after sign-in.
 *
 * Keep the path/group/label here in sync with api/_data/internalDocs.ts.
 */
export const internalNav: DocNavItem[] = [
  {
    path: '/deployment/install-aware',
    group: 'Deployment',
    label: 'Install Aware',
    title: 'Install Aware',
    summary:
      'Prepare the host environment, run the installer, and validate first use.',
    status: 'Source needed',
    access: 'internal',
  },
  {
    path: '/deployment/update-upgrade',
    group: 'Deployment',
    label: 'Update or upgrade',
    title: 'Update or Upgrade Aware',
    summary:
      'Move an existing deployment to a newer version with preflight checks, backups, and validation.',
    status: 'Draft',
    access: 'internal',
  },
  {
    path: '/deployment/service-controls',
    group: 'Deployment',
    label: 'Stop, start, restart',
    title: 'Stop, Start, and Restart Aware',
    summary:
      'Use the approved service-control sequence for maintenance or troubleshooting.',
    status: 'Source needed',
    access: 'internal',
  },
  {
    path: '/nexus/database-backup',
    group: 'Equature Nexus',
    label: 'Database backup',
    title: 'Implement Database Backup in Equature Nexus',
    summary: 'Configure Aware database backup coverage in Equature Nexus.',
    status: 'Source needed',
    access: 'internal',
  },
]
