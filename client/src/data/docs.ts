export type DocStatus = 'Draft' | 'Source needed' | 'Ready for review'

export type DocMedia =
  | string
  | {
      title: string
      src: string
      alt?: string
      note?: string
      section?: string
    }

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
    table?: {
      headers: string[]
      rows: string[][]
    }
  }[]
  media: DocMedia[]
}

const guideImage = (
  file: string,
  title: string,
  section?: string,
  note?: string,
): DocMedia => ({
  title,
  src: `/docs/aware-guide/${file}`,
  section,
  note,
})

export const docs: DocSection[] = [
  {
    path: '/getting-started/access',
    group: 'Getting started',
    label: 'Access Aware',
    title: 'Access Aware',
    summary:
      'Connect to the Equature Aware web interface, understand supported browsers, and start from the main menu.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Application overview',
        text: 'Equature Aware is a web-based camera monitoring alert application. It runs on the Equature configured network and is used to configure monitored cameras for threat alerting.',
      },
      {
        heading: 'Supported browsers',
        text: 'The guide lists Microsoft Edge v110.x, Google Chrome v110.x, and Mozilla Firefox v110.x as supported browsers. Chrome or Edge is recommended.',
      },
      {
        heading: 'Log on',
        text: 'The guide describes access through TeamViewer before opening Aware locally.',
        bullets: [
          'Log in to TeamViewer using the Partner ID and password provided by Equature.',
          'After the remote connection is established, open a supported browser.',
          'Enter http://localhost:3000 and press Enter.',
          'On initial login, Aware defaults to the Equature Plugins home page so the monitoring system can be set up.',
        ],
      },
    ],
    media: [
      guideImage('image2.png', 'Aware application header', 'Application overview'),
      guideImage('image4.png', 'TeamViewer remote connection login', 'Log on'),
    ],
  },
  {
    path: '/getting-started/restricted-characters',
    group: 'Getting started',
    label: 'Restricted characters',
    title: 'Restricted Characters in Aware',
    summary:
      'Avoid unsupported special characters when entering names, descriptions, recipients, and other configurable fields.',
    status: 'Source needed',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Restricted characters',
        text: 'The QA guide identifies the following characters as prohibited in Aware fields. The exact field list appears to depend on screenshots or formatting that did not extract as text and should be confirmed before launch.',
        code: String.raw`\\ / ' "`,
      },
      {
        heading: 'Fields to confirm',
        text: 'Review source screenshots or application validation rules and fill in the final affected field list.',
        bullets: [
          'System name',
          'Location name',
          'Camera name and description',
          'Camera username and password',
          'Recipient name and contact details',
        ],
      },
    ],
    media: ['Validation error screenshot', 'Restricted character table'],
  },
  {
    path: '/deployment/install-aware',
    group: 'Deployment',
    label: 'Install Aware',
    title: 'Install Aware',
    summary:
      'Prepare the host environment, run the installer, and validate first use. Final installation source material is still needed.',
    status: 'Source needed',
    updated: 'Placeholder',
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
    path: '/setup/system',
    group: 'System setup',
    label: 'System tab',
    title: 'Configure the System Tab',
    summary:
      'Define the system name, alert mute intervals, view license details, and reset an escalated alert state.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Open system setup',
        text: 'To navigate to system setup, hover over the left navigation bar to expand it and select the system setup icon.',
      },
      {
        heading: 'System name',
        text: 'Define a logical system name for the monitoring system. The guide recommends a name that relates to the monitored camera location, such as a campus or facility name.',
      },
      {
        heading: 'Mute alert intervals',
        text: 'Aware lets users define default mute durations that can be applied when muting alerts on a selected camera.',
        bullets: [
          'Enter hours and minutes to define a mute interval.',
          'Create as many default mute interval options as needed.',
          'Edit or delete existing intervals from the interval menu.',
          'Deleted intervals remain visible with strikethrough until the user selects Save or Undo.',
        ],
      },
      {
        heading: 'License keys',
        text: 'License keys are informational only. The System tab displays the license key, number of issued licenses, and expiration date, but these values are not editable.',
      },
      {
        heading: 'Reset escalation state',
        text: 'The Advanced Options area can clear active alerts and reset the escalated state. Use caution because cleared alerts cannot be recovered.',
        bullets: [
          'A reset is required when the system is in an escalated state.',
          'Aware displays a visual alert on all screens during an escalated state.',
          'A red dot appears on the System tab and System icon.',
          'The red reset area glimmers when a reset is required.',
          'Selecting Reset opens a confirmation popup before clearing all alerts.',
        ],
      },
    ],
    media: [
      guideImage('image5.png', 'Open system setup from left navigation', 'Open system setup'),
      guideImage('image6.png', 'System setup features overview', 'Open system setup'),
      guideImage('image7.png', 'Add mute alert interval', 'Mute alert intervals'),
      guideImage('image9.png', 'Mute interval actions menu', 'Mute alert intervals'),
      guideImage('image11.png', 'Deleted mute interval pending save', 'Mute alert intervals'),
      guideImage('image12.png', 'Reset escalation state option', 'Reset escalation state'),
      guideImage('image13.png', 'Escalated state banner', 'Reset escalation state'),
      guideImage('image14.png', 'Reset required visual indicator', 'Reset escalation state'),
      guideImage('image15.png', 'Reset confirmation dialog', 'Reset escalation state'),
    ],
  },
  {
    path: '/setup/locations',
    group: 'System setup',
    label: 'Locations',
    title: 'Manage Locations',
    summary:
      'Create, edit, delete, and review logical location areas for monitored cameras.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Purpose',
        text: 'Locations define logical areas for cameras monitored in Aware.',
      },
      {
        heading: 'Add a location',
        text: 'Select Add Location, enter a logical name for the location of the monitored cameras, and select Save.',
      },
      {
        heading: 'Edit a location',
        text: 'Open the menu for the defined location, select Edit, modify the location name, and select Save.',
      },
      {
        heading: 'Delete a location',
        text: 'Open the menu for the defined location and select Delete. If cameras are linked to that location, Aware presents a warning. Cameras associated with a location must be removed under the Plugins tab before deleting the location.',
      },
      {
        heading: 'View associated cameras',
        text: 'Open the menu for a location and select Cameras to view cameras assigned to that location. Select the picture icon beside a camera name to view the camera image.',
      },
    ],
    media: [
      guideImage('image16.png', 'Add Location action', 'Add a location'),
      guideImage('image17.png', 'Save a new location', 'Add a location'),
      guideImage('image18.png', 'Edit location menu option', 'Edit a location'),
      guideImage('image19.png', 'Save edited location', 'Edit a location'),
      guideImage('image20.png', 'Delete location menu option', 'Delete a location'),
      guideImage('image21.png', 'Location delete warning', 'Delete a location'),
      guideImage('image22.png', 'View cameras associated with a location', 'View associated cameras'),
      guideImage('image23.png', 'Associated camera image preview', 'View associated cameras'),
    ],
  },
  {
    path: '/setup/cameras',
    group: 'System setup',
    label: 'Cameras',
    title: 'Configure Cameras',
    summary:
      'Authenticate detected cameras, edit camera properties, and manually add camera streams.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Camera list',
        text: 'The Cameras tab lists cameras on the Aware network. During initial setup, detected cameras show as unauthenticated and not assigned to a monitoring location.',
      },
      {
        heading: 'Authenticate cameras',
        text: 'Select Authenticate, enter the network camera username and password, and select Apply. Properly authenticated cameras display with a key symbol.',
      },
      {
        heading: 'Set camera properties',
        text: 'After authentication, select a camera in the left column to display its property values and image preview.',
        bullets: [
          'Enter a camera name.',
          'Enter a camera description. The description is used in alerts issued by the camera.',
          'Select Save to apply the changes.',
        ],
      },
      {
        heading: 'Add a camera manually',
        text: 'Select Add Camera, enter the name and description, and follow the RTSP stream URL guidance for the camera manufacturer.',
      },
    ],
    media: [
      guideImage('image24.png', 'Initial unauthenticated camera list', 'Camera list'),
      guideImage('image26.png', 'Authenticate Cameras window', 'Authenticate cameras'),
      guideImage('image29.png', 'Camera properties and preview panel', 'Set camera properties'),
      guideImage('image30.png', 'Saved camera name and description', 'Set camera properties'),
      guideImage('image31.png', 'Updated camera list entry', 'Set camera properties'),
    ],
  },
  {
    path: '/setup/fisheye-dewarping',
    group: 'System setup',
    label: 'Fisheye de-warping',
    title: 'De-warp a Fisheye Camera',
    summary:
      'Use pan, tilt, roll, and zoom to convert a fisheye view into up to four flat camera views.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Purpose',
        text: 'Aware can de-warp a fisheye camera into a maximum of four flat-surface views for clearer weapon detection images.',
      },
      {
        heading: 'Default parameters',
        text: 'The guide says these parameters should almost never be adjusted from defaults.',
        bullets: [
          'HFOV = 2.0',
          'VFOV = 2.0',
          'Output Width = 640',
          'Output Height = 640',
        ],
      },
      {
        heading: 'Rarely adjusted parameters',
        text: 'Input Projection Model is usually Equisolid (0), and Output Projection Model is usually Rectilinear (7).',
      },
      {
        heading: 'Primary adjustments',
        text: 'Pan, tilt, roll, and zoom are the parameters normally adjusted to get the desired view.',
        bullets: [
          'Pan range: -3.14 to 3.14.',
          'Tilt range: -1.57 to 1.57.',
          'Roll range: -3.14 to 3.14.',
          'Zoom range: 0.1 to 1.1. Smaller values zoom in.',
        ],
      },
      {
        heading: 'Suggested adjustment process',
        text: 'Start from Zero Projection, then adjust orientation until the desired view is centered and readable.',
        bullets: [
          'Set Pan = 0.00, Tilt = 0.00, Roll = 0.00, Zoom = 1.00.',
          'Adjust Roll until the desired viewing direction is on top.',
          'Adjust Pan and Tilt to center the desired view.',
          'Adjust Zoom.',
        ],
      },
      {
        heading: 'Orientation reference',
        text: 'The guide includes the following starting values for common object orientations.',
        table: {
          headers: ['Orientation', '12 o clock', '3 o clock', '6 o clock', '9 o clock'],
          rows: [
            ['Pan', '0.00', '0.65', '0.00', '-0.65'],
            ['Tilt', '-0.65', '0.00', '0.65', '0.00'],
            ['Roll', '0.00', '-1.57', '-3.14', '1.57'],
            ['Zoom', '0.34', '0.34', '0.34', '0.342'],
          ],
        },
      },
    ],
    media: [
      guideImage('image32.png', 'Enable fisheye de-warping', 'Purpose'),
      guideImage('image33.png', 'Select de-warp surface count', 'Purpose'),
      guideImage('image34.png', 'De-warping parameter interface', 'Primary adjustments'),
    ],
  },
  {
    path: '/setup/plugins',
    group: 'System setup',
    label: 'Plugins tab',
    title: 'Assign Cameras in the Plugins Tab',
    summary:
      'Assign cameras to locations, save plugin changes, and review linked camera imagery.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Purpose',
        text: 'The Plugins tab is where cameras are assigned to a specific location. If a location was already selected on another tab, Aware keeps that selection as the user navigates.',
      },
      {
        heading: 'Connection indicators',
        text: 'Cameras not linked to a defined location display a red connection icon. Cameras already linked to a location display a green connected icon.',
      },
      {
        heading: 'Assign cameras',
        text: 'Select a location, then assign cameras using one of the supported drag-and-drop workflows.',
        bullets: [
          'Select checkboxes for multiple cameras and drag the group to the assignment box.',
          'Drag an individual camera to the assignment box.',
          'Select Save after cameras are added to the selected location.',
        ],
      },
      {
        heading: 'Remove cameras',
        text: 'Select the X for the camera to remove it from a defined location. Select Save to apply the change.',
      },
      {
        heading: 'Unsaved changes',
        text: 'If the user navigates away from the Plugins tab with unsaved changes, Aware presents a warning popup. Close the popup and select Save or Undo.',
      },
    ],
    media: [
      guideImage('image35.png', 'Plugins tab location selector', 'Purpose'),
      guideImage('image38.png', 'Assign cameras to a location', 'Assign cameras'),
      guideImage('image39.png', 'Save assigned cameras', 'Assign cameras'),
      guideImage('image40.png', 'Remove camera from location', 'Remove cameras'),
      guideImage('image41.png', 'Camera image preview from Plugins', 'Assign cameras'),
      guideImage('image42.png', 'Unsaved changes warning', 'Unsaved changes'),
    ],
  },
  {
    path: '/alerts/recipients',
    group: 'Alerts',
    label: 'Recipients',
    title: 'Configure Alert Recipients',
    summary:
      'Define triage and escalation recipients for alerts generated by cameras in a selected location.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Alert tiers',
        text: 'The Alerts tab defines individuals who receive triage and escalation alerts for cameras saved to the selected location.',
        bullets: [
          'Triage recipients receive alerts generated by cameras in the selected location.',
          'Escalation recipients receive alerts only when a triage recipient escalates the alert or when Aware is already in an escalated state.',
          'Every defined location should have at least one triage recipient.',
        ],
      },
      {
        heading: 'Camera assignment requirement',
        text: 'Recipients cannot be added to a location until cameras have been assigned to that location. If no cameras are assigned, Aware displays a popup and the user must return to the Plugins tab.',
      },
      {
        heading: 'Add a recipient',
        text: 'Select Add Recipient under Triage or Escalation. The alert tier radio button defaults based on the selected list.',
        bullets: [
          'For a new recipient, define name, email, and/or phone.',
          'If both email and phone are entered, the recipient receives both email and text alerts.',
          'For an existing recipient, review and select the user from the existing recipient list.',
        ],
      },
      {
        heading: 'Mobile app code',
        text: 'If a recipient has the mobile Aware app installed, the app code displayed in the mobile app can be linked to the recipient record in Aware.',
      },
      {
        heading: 'Search and duplicate checks',
        text: 'The existing recipient field supports contains search. Aware also checks for duplicate email or phone entries and alerts the user if the contact value is already in use for the selected location or another location.',
      },
    ],
    media: [
      guideImage('image43.png', 'No assigned cameras warning', 'Camera assignment requirement'),
      guideImage('image44.png', 'Add recipient from Alerts tab', 'Add a recipient'),
      guideImage('image45.png', 'Add Recipient fields', 'Add a recipient'),
      guideImage('image46.png', 'Select existing recipient', 'Add a recipient'),
      guideImage('image47.png', 'Mobile app code field', 'Mobile app code'),
      guideImage('image48.png', 'Recipient contains search', 'Search and duplicate checks'),
      guideImage('image49.png', 'Duplicate recipient warning for selected location', 'Search and duplicate checks'),
      guideImage('image50.png', 'Duplicate recipient warning for another location', 'Search and duplicate checks'),
    ],
  },
  {
    path: '/alerts/test-alerts',
    group: 'Alerts',
    label: 'Test alerts',
    title: 'Send Test Alerts',
    summary:
      'Send test messages to one or more recipients for a selected camera and location.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Purpose',
        text: 'The Test tab generates test messages for selected recipients to verify alert delivery. Test alerts validate recipient email and phone entries; they do not verify weapon detection.',
      },
      {
        heading: 'Recipient selection',
        text: 'Available test recipients are limited to recipients defined in the Alerts tab for the selected location. The user can send a test alert to one recipient, multiple recipients, or all recipients. The recipient list supports contains search.',
      },
      {
        heading: 'Alert content',
        text: 'A test alert includes a current image snapshot from the selected camera, regardless of possible weapon detection.',
      },
      {
        heading: 'Text alert actions',
        text: 'To escalate or mute a camera from a text message alert, the user selects the acknowledge link. A browser view on the mobile phone presents escalation and mute options.',
      },
    ],
    media: [
      guideImage('image51.png', 'Test alert tab', 'Purpose'),
      guideImage('image52.png', 'Sample email alert', 'Alert content'),
      guideImage('image53.png', 'Sample text alert', 'Alert content'),
      guideImage('image54.png', 'Escalate or mute options from mobile alert', 'Text alert actions'),
    ],
  },
  {
    path: '/monitoring/dashboard',
    group: 'Monitoring',
    label: 'Dashboard',
    title: 'Use the Aware Dashboard',
    summary:
      'Monitor live camera feeds by selecting locations and filtering the dashboard view.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Open the dashboard',
        text: 'From the home screen, select the Dashboard icon. From inside the app, select the Weapon Detection tab and then select either the Dashboard icon or the Weapon Detection folder.',
      },
      {
        heading: 'Live feed monitoring',
        text: 'The dashboard lets users configure cameras assigned to locations for live feed monitoring. Only cameras assigned to a location under the Plugins tab are visible for selected locations.',
      },
      {
        heading: 'Location selection',
        text: 'Users can select individual locations, select all locations, or filter the location list using contains search. If no cameras are assigned to a selected location, the dashboard indicates No Cameras Assigned.',
      },
      {
        heading: 'Remove locations',
        text: 'The guide notes that locations can be removed from monitoring using three interface options. The exact options should be confirmed from screenshots or current product behavior.',
      },
    ],
    media: [
      guideImage('image55.png', 'Dashboard icon from home screen', 'Open the dashboard'),
      guideImage('image56.png', 'Dashboard access from Weapon Detection', 'Open the dashboard'),
      guideImage('image57.png', 'Dashboard location selection and filtering', 'Location selection'),
      guideImage('image58.png', 'Remove locations from dashboard monitoring', 'Remove locations'),
    ],
  },
  {
    path: '/monitoring/sentinel',
    group: 'Monitoring',
    label: 'Sentinel monitor',
    title: 'Use Aware Sentinel System Monitor',
    summary:
      'Review system health, camera status, uptime, frame rate, crash data, and health notification recipients.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Open Sentinel',
        text: 'Select the System Monitor icon to open the Aware Sentinel page.',
      },
      {
        heading: 'System health panel',
        text: 'The main panel provides overall system health, uptime, crash data, average camera frame rate, and camera status by location. If any cameras are offline, the online/offline indicator in the main status bar pulsates.',
      },
      {
        heading: 'Health alert notifications',
        text: 'Select the Notification Setting tab to configure health notification recipients. Health metric categories are enabled by default and are not currently editable.',
      },
      {
        heading: 'Add notification recipients',
        text: 'Select Add Recipient, define a name and email, and save. Email is currently the only health notification option described in the guide.',
        bullets: [
          'Existing alert recipients can be selected from the recipient list.',
          'Saved recipients appear in the Notification Recipients list.',
          'Remove a recipient by selecting Remove from the menu option.',
        ],
      },
    ],
    media: [
      guideImage('image59.png', 'System Monitor icon', 'Open Sentinel'),
      guideImage('image60.png', 'Aware Sentinel system health panel', 'System health panel'),
      guideImage('image61.png', 'Notification Settings tab', 'Health alert notifications'),
      guideImage('image62.png', 'Health metric categories and notification recipients', 'Health alert notifications'),
      guideImage('image63.png', 'Add health notification recipient', 'Add notification recipients'),
      guideImage('image64.png', 'Select existing health notification recipient', 'Add notification recipients'),
      guideImage('image65.png', 'Save health notification recipient', 'Add notification recipients'),
      guideImage('image67.png', 'Notification recipients list', 'Add notification recipients'),
    ],
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
    path: '/mobile-app',
    group: 'Mobile',
    label: 'Companion app',
    title: 'Aware Companion Mobile App',
    summary:
      'Install the mobile app, copy the app code, and link the mobile device to an Aware recipient.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0',
    body: [
      {
        heading: 'Install and open',
        text: 'Install the provided Aware mobile app on the cellular device. After installation, tap the Aware app icon to open it.',
      },
      {
        heading: 'App code',
        text: 'The mobile app displays an app code that must be provided to the Aware desktop administrator before alerts can be sent to the mobile device.',
      },
      {
        heading: 'Share the code',
        text: 'The user can copy the app code by selecting Copy and then send it to the Aware desktop administrator by email or text.',
      },
      {
        heading: 'Store links',
        text: 'Add final Apple App Store and Google Play links before launch if those are the distribution channels for the companion app.',
      },
    ],
    media: [
      guideImage('image68.png', 'Aware mobile app icon', 'Install and open'),
      guideImage('image69.png', 'Mobile app code screen', 'App code'),
      'Apple App Store badge',
      'Google Play badge',
    ],
  },
  {
    path: '/reference/rtsp-stream-urls',
    group: 'Reference',
    label: 'RTSP stream URLs',
    title: 'RTSP Stream URL Reference',
    summary:
      'Reference RTSP URL formats and troubleshooting notes for supported camera manufacturers.',
    status: 'Ready for review',
    updated: 'Parsed from QA guide v1.0 Appendix A',
    body: [
      {
        heading: 'Overview',
        text: 'RTSP is used to configure and access camera streams. The QA guide includes URL formats for Cisco, Avigilon, Verkada, GeoVision, Dahua, Amcrest, Hikvision, Hanwha, i-PRO, and Advidia cameras.',
      },
      {
        heading: 'Common URL formats',
        text: 'Use the manufacturer format that matches the camera or recorder type.',
        table: {
          headers: ['Manufacturer', 'Example or format', 'Notes'],
          rows: [
            ['Cisco', 'rtsp://ip_address:rtsp_port/RTSP_streaming_access_name_for_stream1_or_stream2', 'Default RTSP port is 554. Authentication may be required.'],
            ['Avigilon', 'rtsp://<name:password>@<CameraIP>/defaultPrimary?streamType=u', 'Primary, secondary, and sometimes tertiary streams are available.'],
            ['Verkada', 'Copied from Verkada Command RTSP settings', 'Default RTSP port is 8554. Replace the password placeholder after copying.'],
            ['GeoVision', 'RTSP://<IP of the GV IP Device>:8554/<CH No.>.sdp', 'Channel values use CH001, CH002, and similar formats.'],
            ['Dahua', 'rtsp://username:password@IP:554/cam/realmonitor?channel=1&subtype=0', 'Use subtype=0 for main stream or subtype=1 for sub stream.'],
            ['Amcrest', 'rtsp://[username]:[password]@[IPaddress]:554/cam/realmonitor?channel=1&subtype=0', 'NVR/DVR format uses /h264Preview_[channel]_[stream].'],
            ['Hikvision', 'rtsp://[username]:[password]@[IP]:[Port]/Streaming/Channels/[ID]/?transportmode=unicast', '101 is main stream channel 1; 102 is sub stream channel 1.'],
            ['Hanwha', 'rtsp://<DeviceIP>/profile<no>/media.smp', 'Profile number specifies stream quality. Multi-sensor cameras include sensor number.'],
            ['i-PRO', 'rtsp://[IP address]/mediainput/h264/stream_2', 'Formerly Panasonic. ONVIF profile URLs may also be used.'],
            ['Advidia', 'rtsp://[username]:[password]@[IP address]:554/Streaming/Channels/1', 'Similar to Hikvision URL formats.'],
          ],
        },
      },
      {
        heading: 'Verkada setup process',
        text: 'The guide includes a specific process for enabling Verkada RTSP streams.',
        bullets: [
          'In Verkada Command, go to All Products > Cameras.',
          'Select a camera and click Settings.',
          'Under Device, toggle on Real Time Streaming Protocol (RTSP).',
          'Enter a username and password, then click Enable.',
          'Copy the standard or high-resolution RTSP URL.',
          'Replace the password placeholder in the copied URL.',
        ],
      },
      {
        heading: 'Troubleshooting',
        text: 'The appendix recommends checking connectivity, credentials, URL path, stream type, bandwidth, codec support, and player compatibility.',
        bullets: [
          'Connection refused: verify power, network connectivity, firewall, IP address, and RTSP port.',
          'Authentication failed: verify credentials and whether special characters require URL encoding.',
          'Stream not found: verify path, channel number, and stream type.',
          'Poor performance: try a lower-quality sub stream and check bandwidth.',
          'No video: verify camera streaming configuration and codec support.',
        ],
      },
      {
        heading: 'Test with VLC',
        text: 'The guide recommends VLC Media Player as the most reliable way to test RTSP streams before troubleshooting Aware-specific behavior.',
        bullets: [
          'Open VLC Media Player.',
          'Select Media > Open Network Stream.',
          'Enter the complete RTSP URL.',
          'Click Play.',
        ],
      },
    ],
    media: ['RTSP URL reference screenshot', 'VLC network stream screenshot'],
  },
  {
    path: '/authoring/media-guidelines',
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
