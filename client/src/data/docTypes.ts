export type DocStatus = 'Draft' | 'Source needed' | 'Ready for review'

/**
 * Public docs are bundled into the client and freely readable.
 * Internal docs are gated: their nav entry is visible, but the body is
 * served only from the auth-protected API and never shipped in the bundle.
 */
export type DocAccess = 'public' | 'internal'

export type DocMedia =
  | string
  | {
      title: string
      src: string
      alt?: string
      note?: string
      section?: string
    }

export type DocBodyBlock = {
  heading: string
  text: string
  bullets?: string[]
  code?: string
  table?: {
    headers: string[]
    rows: string[][]
  }
}

export type DocSection = {
  path: string
  group: string
  label: string
  title: string
  summary: string
  status: DocStatus
  updated: string
  access: DocAccess
  body: DocBodyBlock[]
  media: DocMedia[]
}

/**
 * Lightweight nav metadata. For internal docs this is the ONLY thing that
 * ships in the client bundle — enough to render a (locked) nav entry and the
 * article header, but none of the procedure body.
 */
export type DocNavItem = {
  path: string
  group: string
  label: string
  title: string
  summary: string
  status: DocStatus
  access: DocAccess
}

export const toNavItem = (doc: DocSection): DocNavItem => ({
  path: doc.path,
  group: doc.group,
  label: doc.label,
  title: doc.title,
  summary: doc.summary,
  status: doc.status,
  access: doc.access,
})
