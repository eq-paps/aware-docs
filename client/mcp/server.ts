#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { docs, type DocMedia, type DocSection, type DocStatus } from '../src/data/docs.js'

const server = new McpServer({
  name: 'aware-docs',
  version: '0.1.0',
})

const statusSchema = z.enum(['Draft', 'Source needed', 'Ready for review'])

type TextResult = {
  content: {
    type: 'text'
    text: string
  }[]
}

function textResult(text: string): TextResult {
  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
  }
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function compactPath(value: string): string {
  return value.startsWith('/') ? value : `/${value}`
}

function getDocSearchText(doc: DocSection): string {
  return [
    doc.path,
    doc.group,
    doc.label,
    doc.title,
    doc.summary,
    doc.status,
    doc.updated,
    ...doc.body.flatMap((section) => [
      section.heading,
      section.text,
      ...(section.bullets ?? []),
      section.code ?? '',
      ...(section.table?.headers ?? []),
      ...(section.table?.rows.flat() ?? []),
    ]),
    ...doc.media.map(formatMediaForSearch),
  ].join(' ')
}

function formatMediaForSearch(item: DocMedia): string {
  if (typeof item === 'string') return item

  return [item.title, item.src, item.alt ?? '', item.note ?? '', item.section ?? ''].join(' ')
}

function findDoc(pathOrTitle: string): DocSection | undefined {
  const target = normalize(pathOrTitle)
  const targetPath = compactPath(pathOrTitle)

  return docs.find((doc) => {
    const pathWithoutSlash = doc.path.slice(1)

    return (
      doc.path === targetPath ||
      pathWithoutSlash === pathOrTitle ||
      normalize(doc.title) === target ||
      normalize(doc.label) === target
    )
  })
}

function docSummary(doc: DocSection) {
  return {
    path: doc.path,
    group: doc.group,
    label: doc.label,
    title: doc.title,
    summary: doc.summary,
    status: doc.status,
    updated: doc.updated,
    sectionCount: doc.body.length,
    mediaCount: doc.media.length,
  }
}

function formatMedia(item: DocMedia) {
  if (typeof item === 'string') {
    return {
      type: 'placeholder',
      title: item,
    }
  }

  return {
    type: 'asset',
    title: item.title,
    src: item.src,
    alt: item.alt,
    note: item.note,
    section: item.section,
  }
}

function formatDocAsMarkdown(doc: DocSection, includeMedia: boolean): string {
  const lines = [
    `# ${doc.title}`,
    '',
    `Path: ${doc.path}`,
    `Group: ${doc.group}`,
    `Status: ${doc.status}`,
    `Updated: ${doc.updated}`,
    '',
    doc.summary,
  ]

  for (const section of doc.body) {
    lines.push('', `## ${section.heading}`, '', section.text)

    if (section.bullets?.length) {
      lines.push('', ...section.bullets.map((bullet) => `- ${bullet}`))
    }

    if (section.code) {
      lines.push('', '```text', section.code, '```')
    }

    if (section.table) {
      lines.push('', section.table.headers.join(' | '))
      lines.push(section.table.headers.map(() => '---').join(' | '))
      for (const row of section.table.rows) {
        lines.push(row.join(' | '))
      }
    }

    if (includeMedia) {
      const sectionMedia = doc.media.filter(
        (item) => typeof item !== 'string' && item.section === section.heading,
      )

      if (sectionMedia.length) {
        lines.push('', 'Media:')
        for (const item of sectionMedia) {
          const media = formatMedia(item)
          lines.push(`- ${media.title}${media.type === 'asset' ? ` (${media.src})` : ''}`)
        }
      }
    }
  }

  if (includeMedia) {
    const unplacedMedia = doc.media.filter(
      (item) => typeof item === 'string' || !item.section,
    )

    if (unplacedMedia.length) {
      lines.push('', '## Unplaced media', '')
      for (const item of unplacedMedia) {
        const media = formatMedia(item)
        lines.push(`- ${media.title}${media.type === 'asset' ? ` (${media.src})` : ''}`)
      }
    }
  }

  return lines.join('\n')
}

server.registerTool(
  'list_docs',
  {
    description:
      'List Aware documentation pages with optional filtering by query, group, or status.',
    inputSchema: {
      query: z.string().optional().describe('Case-insensitive text to match against page metadata and body content.'),
      group: z.string().optional().describe('Documentation group name, such as "System setup" or "Alerts".'),
      status: statusSchema.optional().describe('Editorial status to filter by.'),
    },
  },
  async ({ query, group, status }: { query?: string; group?: string; status?: DocStatus }) => {
    const normalizedQuery = query ? normalize(query) : ''
    const normalizedGroup = group ? normalize(group) : ''

    const matches = docs.filter((doc) => {
      const queryMatches =
        !normalizedQuery || normalize(getDocSearchText(doc)).includes(normalizedQuery)
      const groupMatches = !normalizedGroup || normalize(doc.group) === normalizedGroup
      const statusMatches = !status || doc.status === status

      return queryMatches && groupMatches && statusMatches
    })

    return textResult(JSON.stringify(matches.map(docSummary), null, 2))
  },
)

server.registerTool(
  'search_docs',
  {
    description:
      'Search Aware documentation content and return ranked page matches with matching sections.',
    inputSchema: {
      query: z.string().min(1).describe('Search text to match against documentation pages.'),
      limit: z.number().int().min(1).max(25).default(10).describe('Maximum number of matching pages to return.'),
    },
  },
  async ({ query, limit }: { query: string; limit: number }) => {
    const terms = normalize(query).split(/\s+/).filter(Boolean)

    const matches = docs
      .map((doc) => {
        const fields = [
          doc.title,
          doc.label,
          doc.summary,
          doc.group,
          ...doc.body.map((section) => `${section.heading} ${section.text}`),
        ]
        const haystack = normalize(fields.join(' '))
        const score = terms.reduce(
          (total, term) => total + (haystack.includes(term) ? 1 : 0),
          0,
        )

        return {
          ...docSummary(doc),
          score,
          matchingSections: doc.body
            .filter((section) =>
              terms.some((term) =>
                normalize(`${section.heading} ${section.text} ${(section.bullets ?? []).join(' ')}`).includes(term),
              ),
            )
            .map((section) => section.heading),
        }
      })
      .filter((doc) => doc.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, limit)

    return textResult(JSON.stringify(matches, null, 2))
  },
)

server.registerTool(
  'get_doc',
  {
    description:
      'Fetch a full Aware documentation page as Markdown by path, title, or navigation label.',
    inputSchema: {
      pathOrTitle: z.string().min(1).describe('Page path, title, or navigation label. Examples: /setup/cameras, Configure Cameras, Cameras.'),
      includeMedia: z.boolean().default(true).describe('Include media asset and placeholder references in the Markdown output.'),
    },
  },
  async ({ pathOrTitle, includeMedia }: { pathOrTitle: string; includeMedia: boolean }) => {
    const doc = findDoc(pathOrTitle)

    if (!doc) {
      return textResult(
        `No Aware documentation page matched "${pathOrTitle}". Use list_docs or search_docs to find valid paths.`,
      )
    }

    return textResult(formatDocAsMarkdown(doc, includeMedia))
  },
)

server.registerTool(
  'list_media',
  {
    description:
      'List screenshot assets and media placeholders for all docs or one documentation page.',
    inputSchema: {
      pathOrTitle: z.string().optional().describe('Optional page path, title, or navigation label to limit media results.'),
    },
  },
  async ({ pathOrTitle }: { pathOrTitle?: string }) => {
    const selectedDocs = pathOrTitle ? [findDoc(pathOrTitle)].filter(Boolean) : docs

    if (pathOrTitle && selectedDocs.length === 0) {
      return textResult(
        `No Aware documentation page matched "${pathOrTitle}". Use list_docs or search_docs to find valid paths.`,
      )
    }

    const media = selectedDocs.map((doc) => ({
      path: doc?.path,
      title: doc?.title,
      media: doc?.media.map(formatMedia),
    }))

    return textResult(JSON.stringify(media, null, 2))
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Aware Docs MCP server running on stdio')
}

main().catch((error: unknown) => {
  console.error('Fatal error in Aware Docs MCP server:', error)
  process.exit(1)
})
