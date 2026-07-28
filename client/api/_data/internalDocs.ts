import type { DocSection } from '../../src/data/docTypes.js'

/**
 * SERVER-ONLY. These procedure bodies are gated behind Google auth and must
 * never be imported by client code — that would bundle them into the public
 * JS and defeat the access control. They are served exclusively through the
 * auth-protected /api/internal-docs endpoint.
 *
 * The `_` filename prefix keeps Vercel from exposing this as a route.
 */
export const internalDocs: DocSection[] = [
  {
    path: '/deployment/install-aware',
    group: 'Deployment',
    label: 'Install Aware',
    title: 'Install Aware',
    summary:
      'Prepare the host environment, run the installer, and validate first use. Final installation source material is still needed.',
    status: 'Source needed',
    updated: 'Placeholder',
    access: 'internal',
    body: [
      {
        heading: 'Before you begin',
        text: 'Add final server requirements, network prerequisites, database expectations, user permissions, and installer package details here.',
      },
      {
        heading: 'Installation flow',
        text: 'Replace this placeholder with the official Equature installation sequence.',
        code: '1. Launch installer as administrator\n2. Confirm destination and service account\n3. Apply customer configuration\n4. Complete first-run validation',
      },
      {
        heading: 'Validation',
        text: 'After installation, confirm service health, database connectivity, and initial sign-in.',
      },
    ],
    media: ['Installer screen capture', 'Prerequisite checklist', 'First login screenshot'],
  },
  {
    path: '/deployment/update-upgrade',
    group: 'Deployment',
    label: 'Update or upgrade',
    title: 'Update or Upgrade Aware',
    summary:
      'Move an existing deployment to a newer version with preflight checks, backups, and post-update validation.',
    status: 'Draft',
    updated: 'Placeholder',
    access: 'internal',
    body: [
      {
        heading: 'Preflight checklist',
        text: 'Use this area for required checks before applying any update package.',
        bullets: [
          'Record the currently installed Aware version.',
          'Review release notes and compatibility notes.',
          'Confirm a recent database backup is available before proceeding.',
        ],
      },
      {
        heading: 'Apply the update',
        text: 'Describe the supported upgrade path here. Separate patch updates from major version upgrades if the process differs.',
      },
      {
        heading: 'Post-update review',
        text: 'Confirm services are running, user sign-in works, and the expected version number is visible in the application.',
      },
    ],
    media: ['Release notes callout', 'Version check screenshot', 'Upgrade walkthrough video'],
  },
  {
    path: '/deployment/service-controls',
    group: 'Deployment',
    label: 'Stop, start, restart',
    title: 'Stop, Start, and Restart Aware',
    summary:
      'Use the approved service-control sequence for maintenance or troubleshooting. Final service names are still needed.',
    status: 'Source needed',
    updated: 'Placeholder',
    access: 'internal',
    body: [
      {
        heading: 'When to control services',
        text: 'Explain when administrators should stop, start, or restart Aware services, including planned maintenance and troubleshooting scenarios.',
      },
      {
        heading: 'Service sequence',
        text: 'Replace this placeholder with exact service names and order from Equature operations.',
        code: 'Stop: dependent services first, then core services\nStart: core services first, then dependent services\nRestart: stop sequence followed by start sequence',
      },
    ],
    media: ['Services console screenshot', 'Restart sequence video', 'Health check screenshot'],
  },
  {
    path: '/nexus/database-backup',
    group: 'Equature Nexus',
    label: 'Database backup',
    title: 'Implement Database Backup in Equature Nexus',
    summary:
      'Configure Aware database backup coverage in Equature Nexus. Final Nexus procedure source material is still needed.',
    status: 'Source needed',
    updated: 'Placeholder',
    access: 'internal',
    body: [
      {
        heading: 'Backup policy',
        text: 'Use this section to describe where the backup policy is configured in Nexus and which retention options are supported.',
        bullets: [
          'Open the customer environment in Equature Nexus.',
          'Select the Aware database backup policy.',
          'Choose the approved retention window and save the policy.',
        ],
      },
      {
        heading: 'Verification',
        text: 'Document how to confirm the backup completed successfully and where administrators can view backup history.',
      },
      {
        heading: 'Restore path',
        text: 'Identify restore ownership, escalation paths, and what information support needs from the customer.',
      },
    ],
    media: ['Nexus environment screenshot', 'Backup policy screenshot', 'Backup history screenshot'],
  },
]

export const internalDocBySlug = (slug: string): DocSection | undefined =>
  internalDocs.find((doc) => doc.path === `/${slug}`)
