export type DocStatus = 'Draft' | 'Source needed' | 'Ready for review'

export type DocSection = {
  path: string
  group: string
  label: string
  title: string
  summary: string
  status: DocStatus
  updated: string
  body: {
    heading: string
    text: string
    bullets?: string[]
    code?: string
  }[]
  media: string[]
}

export const docs: DocSection[] = [
  {
    path: '/install',
    group: 'Get started',
    label: 'Install Aware',
    title: 'Install Aware',
    summary:
      'Prepare the environment, run the installer, and validate that Aware is ready for first use.',
    status: 'Source needed',
    updated: 'Placeholder',
    body: [
      {
        heading: 'Before you begin',
        text: 'Document the supported server requirements, network prerequisites, database expectations, user permissions, and files needed before installation.',
        bullets: [
          'Confirm the target server meets the approved Aware hardware profile.',
          'Verify administrator access and firewall requirements.',
          'Collect customer-specific configuration values before starting.',
        ],
      },
      {
        heading: 'Installation flow',
        text: 'Replace this section with the official installer sequence once source documentation is available.',
        code: '1. Launch installer as administrator\n2. Confirm destination and service account\n3. Apply customer configuration\n4. Complete first-run validation',
      },
      {
        heading: 'Validation',
        text: 'After installation, confirm service health, database connectivity, and initial sign-in. Add screenshots for each successful state.',
      },
    ],
    media: ['Installer screen capture', 'Prerequisite checklist', 'First login screenshot'],
  },
  {
    path: '/update-upgrade',
    group: 'Lifecycle',
    label: 'Update or upgrade',
    title: 'Update or Upgrade Aware',
    summary:
      'Move an existing Aware deployment to a newer version with preflight checks, backup expectations, and post-update validation.',
    status: 'Draft',
    updated: 'Placeholder',
    body: [
      {
        heading: 'Preflight checklist',
        text: 'Use this area for the required checks before applying any update package.',
        bullets: [
          'Record the currently installed Aware version.',
          'Review release notes and compatibility notes.',
          'Confirm a recent database backup is available before proceeding.',
        ],
      },
      {
        heading: 'Apply the update',
        text: 'Describe the supported upgrade path here. Separate patch updates from major version upgrades if the process differs.',
        code: 'aware-update --package <version-package>\naware-healthcheck --scope post-upgrade',
      },
      {
        heading: 'Post-update review',
        text: 'Confirm services are running, user sign-in works, and the expected version number is visible in the application.',
      },
    ],
    media: ['Release notes callout', 'Version check screenshot', 'Upgrade walkthrough video'],
  },
  {
    path: '/operations/services',
    group: 'Operations',
    label: 'Stop, start, restart',
    title: 'Stop, Start, and Restart Aware',
    summary:
      'Use the documented service sequence for planned maintenance, troubleshooting, and controlled restarts.',
    status: 'Source needed',
    updated: 'Placeholder',
    body: [
      {
        heading: 'When to control services',
        text: 'Explain when administrators should stop, start, or restart Aware services, including planned maintenance and troubleshooting scenarios.',
      },
      {
        heading: 'Service sequence',
        text: 'Replace this placeholder with the exact service names and order from Equature operations.',
        code: 'Stop: dependent services first, then core services\nStart: core services first, then dependent services\nRestart: stop sequence followed by start sequence',
      },
      {
        heading: 'Health checks',
        text: 'Add the official verification steps here so administrators know when the system is safe to return to users.',
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
      'Configure Aware database backup coverage in Equature Nexus and document retention, verification, and restore ownership.',
    status: 'Source needed',
    updated: 'Placeholder',
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
        text: 'Briefly identify who owns restore requests, expected escalation paths, and what information support needs from the customer.',
      },
    ],
    media: ['Nexus environment screenshot', 'Backup policy screenshot', 'Backup history screenshot'],
  },
  {
    path: '/mobile-app',
    group: 'Mobile',
    label: 'Companion app',
    title: 'Aware Companion Mobile App',
    summary:
      'Point users to the Aware companion app in the Apple App Store and Google Play with basic sign-in and update guidance.',
    status: 'Draft',
    updated: 'Placeholder',
    body: [
      {
        heading: 'Availability',
        text: 'The Aware companion mobile app will be available through the Apple App Store and Google Play. Add final store links and badges before launch.',
      },
      {
        heading: 'Sign in',
        text: 'Describe the expected sign-in method and any organization-specific access requirements.',
      },
      {
        heading: 'Updates',
        text: 'Recommend automatic app updates unless an organization manages mobile releases through its own device policy.',
      },
    ],
    media: ['Apple App Store badge', 'Google Play badge', 'Mobile sign-in screenshot'],
  },
  {
    path: '/media-guidelines',
    group: 'Authoring',
    label: 'Media guidelines',
    title: 'Media Guidelines',
    summary:
      'Plan how videos, screenshots, diagrams, and downloadable support files should be added to the documentation.',
    status: 'Draft',
    updated: 'Placeholder',
    body: [
      {
        heading: 'Video',
        text: 'Mux is a good fit for short task walkthroughs. Keep each clip scoped to a single procedure and place it near the relevant step.',
      },
      {
        heading: 'Screenshots',
        text: 'Use consistent crops and annotations for installer screens, Nexus policy pages, service controls, and mobile app screens.',
      },
      {
        heading: 'Local and hosted assets',
        text: 'This UI can support either local static files or hosted image providers once the storage decision is final.',
      },
    ],
    media: ['Mux embed placeholder', 'Screenshot upload placeholder', 'Download attachment placeholder'],
  },
]

export const navGroups = docs.reduce<Record<string, DocSection[]>>(
  (groups, doc) => {
    groups[doc.group] = [...(groups[doc.group] ?? []), doc]
    return groups
  },
  {},
)
