/** Heuristic: treat copy as Markdown when typical patterns appear (tables, headings, emphasis, lists). */
export function looksLikeMarkdown(text: string): boolean {
  const t = text.trim()
  if (t.length === 0) return false

  if (/^#{1,6}\s/m.test(text)) return true
  if (/\*\*[^*\n]+\*\*/.test(text) || /\*[^*\n]+\*/.test(text)) return true
  if (/^```[\s\S]*```/m.test(text)) return true

  const pipeLines = [...text.matchAll(/^\|.+\|\s*$/gm)]
  if (pipeLines.length >= 2) {
    const next = pipeLines.map((m) => m[0]).join('\n')
    if (/^\|[\s:|-]+\|$/m.test(next)) return true
  }

  if (/^[ \t]*[-*+]\s+.+/m.test(text)) return true
  if (/^>\s+/m.test(text)) return true
  if (/^\[[^\]]+\]\([^)]+\)/m.test(text)) return true

  return false
}

function firstTrimmedString(...candidates: unknown[]): string | undefined {
  for (const c of candidates) {
    if (typeof c === 'string') {
      const s = c.trim()
      if (s.length > 0) return s
    }
  }
  return undefined
}

export function pickMarkdownFields(p: Record<string, unknown>): {
  descriptionMarkdown?: string
  overviewMarkdown?: string
  specsMarkdown?: string
} {
  const descriptionMarkdown = firstTrimmedString(
    p.description_md,
    p.descriptionMarkdown,
    p.description_markdown,
    p.body_md,
    p.body_markdown,
    p.long_description_md,
    p.long_description_markdown,
    p.markdown,
    p.copy_md,
    p.details_md,
    p.details_markdown,
  )

  const overviewMarkdown = firstTrimmedString(p.overview_md, p.overview_markdown)

  const specsMarkdown = firstTrimmedString(
    p.specs_md,
    p.specs_markdown,
    p.specifications_md,
    p.specifications_markdown,
    p.spec_md,
    p.spec_markdown,
  )

  const out: { descriptionMarkdown?: string; overviewMarkdown?: string; specsMarkdown?: string } = {}
  if (descriptionMarkdown !== undefined) out.descriptionMarkdown = descriptionMarkdown
  if (overviewMarkdown !== undefined) out.overviewMarkdown = overviewMarkdown
  if (specsMarkdown !== undefined) out.specsMarkdown = specsMarkdown
  return out
}
