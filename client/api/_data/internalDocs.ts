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
  {
    path: '/deployment/managed-install',
    group: 'Deployment',
    label: 'Managed install & deployment',
    title: 'AWARE Managed Install & Deployment Guide',
    summary:
      'Build, release, deploy, and validate AWARE on managed instances using versioned release images.',
    status: 'Ready for review',
    updated: 'Managed install guide v1',
    access: 'internal',
    body: [
      {
        heading: 'Overview',
        text: 'AWARE deployment has moved to a managed install process using versioned releases. Instead of building AWARE separately on each server — with no way to track which version is running where — we build a single image per release version and deploy that image everywhere. This works like over-the-air updates: the release image is pushed to the cloud registry once, and target servers pull the correct image for their hardware.',
      },
      {
        heading: 'Future state',
        text: 'Updates will eventually be triggerable remotely without SSH access to each server. That is not yet in place — for now, updates are performed via the install script on the target server.',
      },
      {
        heading: 'Part 1 — Building and releasing a new version',
        text: 'Access restriction: this process should be limited to authorized release personnel only. Running it builds AWARE and pushes it to the cloud registry, so bad code pushed here propagates to all servers. Rollback is possible via Git, but prevention is preferred.',
      },
      {
        heading: 'Build prerequisites',
        text: 'Confirm the following before starting a release build.',
        bullets: [
          'A build server with a supported GPU. The current build server is GPU-003 (RTX 4090), which can build for both 4090 and 5090 targets.',
          'AWARE install scripts transferred to the build server.',
        ],
      },
      {
        heading: 'Build and release steps',
        text: 'On the build server, run the install script and drill into the developer tooling.',
        bullets: [
          'Start the install script on the build server.',
          'Select Option 7 — Developer Tools.',
          'Select Option 1 — Build and Release New AWARE Version (Production).',
        ],
      },
      {
        heading: 'What the release script does',
        text: 'The build and release routine runs the full pipeline automatically.',
        bullets: [
          'Pulls the latest release branch.',
          'Compiles AWARE.',
          'Builds the container image.',
          'Pushes the image to the cloud Docker registry (EQ Dev Registry).',
        ],
      },
      {
        heading: 'Build variants',
        text: 'Two image variants are produced. Each image carries its own hash digest, used for tagging and identification in the registry.',
        table: {
          headers: ['Variant', 'Notes'],
          rows: [
            ['4090', 'Standard build. No 4090 tag on the image.'],
            ['5090', 'Requires a TensorRT build step. Tagged accordingly.'],
          ],
        },
      },
      {
        heading: 'Part 2 — Installing or updating a target server',
        text: 'On the target server, start the install script, select Install or Update, then choose an install type. The script auto-detects the GPU present in the machine and pulls the matching image from the registry (for example, a 5090 server pulls the 5090 image). AWARE starts automatically once the install completes.',
        bullets: [
          'Clean Install — fresh install that removes the existing AWARE container.',
          'Safe Install — preserves existing configuration.',
        ],
      },
      {
        heading: 'Other install menu options',
        text: 'The install script displays the current state of both the pipeline and the remote agent on startup. These additional menu options are available.',
        table: {
          headers: ['Option', 'Purpose'],
          rows: [
            [
              'Diagnostics & Repair',
              'Checks for NVIDIA container issues. Not part of the standard flow — run only when troubleshooting.',
            ],
            [
              'Advanced',
              'Backwards compatibility only. Slated for removal in favor of the Test Suite option for building specific AWARE versions.',
            ],
          ],
        },
      },
      {
        heading: 'Backups',
        text: 'A restore script is available for restoring server backups after a clean install. Taking a manual backup before making changes is recommended (not required) as a safeguard.',
      },
      {
        heading: 'Part 3 — Post-install validation',
        text: 'Three tests must be run after any install or update.',
      },
      {
        heading: 'Test 1 — Restart test (service independence)',
        text: 'Confirms the container can start independently of the install script. Kill all AWARE services, restart AWARE, and verify all services come up in the terminals/nodes view. Known issue: the AWARE API may fail on first start after install; this is a known bug pending resolution and typically comes up on retry. Then browse to https://<server>.equature.net/<endpoint> — a certificate-not-trusted warning is expected, so accept it and proceed (certificate trust is a known outstanding item) — log in, and confirm the UI loads.',
        bullets: ['AWARE API', 'Web client', 'Fish ID worker', 'Monitoring', 'Remote agent'],
      },
      {
        heading: 'Test 2 — End-to-end test (detection and alerting)',
        text: 'From the install script, go to Test Suite → E2E Test and run the test. What to look for as an admin: confirm that detections appear. Detection frequency is a developer-level concern, not a service-team pass/fail criterion.',
        bullets: [
          'The E2E test may fail if the pipeline does not come up in time — this is common on slower servers. Re-run the test.',
          'Alert delivery is currently unreliable; alerts may not be sent. When alerts do not fire, escalations will also not fire (nothing to escalate). This does not block the install and is primarily relevant to automated test runs.',
        ],
      },
      {
        heading: 'Test 3 — Reboot test (auto-start and remote agent)',
        text: 'Simulates a system crash or unplanned reboot. Reboot the server, monitor it from the cloud dashboard, and confirm a server-down alert fires after the server stops responding to pings. Once it is back up, reconnect via SSH, navigate to the download folder, start the install script, and select Option 3. If AWARE is already running without you having started it, AWARE auto-started on boot and the test passed. Note: the camera UI will not be visible in this state; viewing it requires stopping AWARE and starting it in the alternate mode, and on test servers cameras from other sites will not connect regardless.',
        code: 'sudo reboot',
      },
      {
        heading: 'Part 4 — Verifying in the cloud dashboard',
        text: 'After install, always verify the server appears correctly in the cloud portal.',
        bullets: [
          'Confirm the server is listed and reporting.',
          'Check the last update timestamp.',
          'A critical error state is expected when cameras are disabled or offline — this is not necessarily an install failure.',
          'Cameras belonging to other sites will not connect and will not appear.',
        ],
      },
      {
        heading: 'Process logs',
        text: 'To view process logs, return to the main menu and select Disable Process Logs to display full output.',
      },
      {
        heading: 'Part 5 — QA testing: pulling branches',
        text: 'When testing developer branches, the script prompts for two branch selections.',
        table: {
          headers: ['Prompt', 'Repository', 'Default branch'],
          rows: [
            ['First', 'AWARE', 'develop'],
            ['Second', 'Web Client (Nuxt)', 'main'],
          ],
        },
      },
      {
        heading: 'QA workflow',
        text: 'Typical QA workflow: leave the AWARE branch blank to accept the default, and enter the web client branch the developer specified (commonly develop). No Azure DevOps permission changes are required to run QA testing. Naming note: AWARE’s default branch is currently develop and web’s is main; these will eventually be normalized to develop then master.',
      },
      {
        heading: 'Operational notes and best practices',
        text: 'Follow these operational guidelines.',
        bullets: [
          'Do not run Docker commands with sudo. Running docker start / docker compose up under sudo is bad practice. Some servers (e.g., the Lenovo unit) currently require it — this is a known gap.',
          'Target state: run AWARE under a dedicated non-root privileged user with a dedicated AWARE directory.',
          'Rollback: if a bad release reaches the cloud, roll back via Git and re-run the build/release process.',
        ],
      },
      {
        heading: 'Known issues',
        text: 'Known issues as of this document.',
        table: {
          headers: ['Issue', 'Status'],
          rows: [
            ['Bulk operation bug', 'Blocking further update pushes until resolved.'],
            ['AWARE API fails on first start after install', 'Known bug, resolves on retry.'],
            ['Alerts not being delivered in E2E test', 'Under investigation.'],
            ['SSL certificate not trusted', 'Pending resolution.'],
            ['sudo required for Docker on some servers', 'Known bad practice, to be corrected.'],
          ],
        },
      },
    ],
    media: [],
  },
]

export const internalDocBySlug = (slug: string): DocSection | undefined =>
  internalDocs.find((doc) => doc.path === `/${slug}`)
