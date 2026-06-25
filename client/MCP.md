# Aware Docs MCP Server

This package includes a local Model Context Protocol server that exposes the Aware documentation content to MCP-compatible chat clients.

## Build

```bash
pnpm mcp:build
```

## Run

```bash
pnpm mcp:start
```

The server uses stdio transport. It must not write ordinary logs to stdout, because stdout is reserved for MCP JSON-RPC messages.

## Tools

- `list_docs`: list pages, optionally filtered by query, group, or editorial status.
- `search_docs`: search docs content and return ranked matching pages and sections.
- `get_doc`: fetch a complete documentation page as Markdown by path, title, or navigation label.
- `list_media`: list screenshot assets and media placeholders for all docs or a single page.

## Claude Desktop

After running `pnpm mcp:build`, add this to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "aware-docs": {
      "command": "node",
      "args": [
        "/Users/shawnpapineau/Developer/Equature/aware-docs/client/dist-mcp/mcp/server.js"
      ]
    }
  }
}
```

Restart Claude Desktop after saving the config.

## Goose

Add a stdio extension that runs:

```bash
node /Users/shawnpapineau/Developer/Equature/aware-docs/client/dist-mcp/mcp/server.js
```

## Codex Or Other MCP Hosts

Use the same stdio command:

```bash
node /Users/shawnpapineau/Developer/Equature/aware-docs/client/dist-mcp/mcp/server.js
```
