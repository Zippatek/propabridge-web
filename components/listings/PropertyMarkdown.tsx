import type { ComponentPropsWithoutRef } from 'react'

import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { looksLikeMarkdown } from '@/lib/property-markdown'
import { cn } from '@/lib/cn'

const mdBase =
  '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0 text-grey text-[15px] font-medium leading-[1.7]'

interface PropertyMarkdownProps {
  content: string
  /** When true, always parse as GFM Markdown (explicit API field). */
  forceMarkdown?: boolean
  className?: string
}

export function PropertyMarkdown({ content, forceMarkdown, className }: PropertyMarkdownProps) {
  const raw = content.trim()
  if (!raw) return null

  const renderAsMarkdown = forceMarkdown || looksLikeMarkdown(raw)

  if (!renderAsMarkdown) {
    const paras = raw.split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
    return (
      <div className={cn(mdBase, className)}>
        <div className="space-y-4">
          {paras.map((para, i) => (
            <p key={i} className="text-navy">
              {para}
            </p>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(mdBase, 'property-markdown', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: MarkdownH1,
          h2: MarkdownH2,
          h3: MarkdownH3,
          h4: MarkdownH4,
          p: MarkdownP,
          ul: MarkdownUl,
          ol: MarkdownOl,
          li: MarkdownLi,
          strong: MarkdownStrong,
          a: MarkdownA,
          blockquote: MarkdownBlockquote,
          hr: MarkdownHr,
          code: MarkdownCode,
          pre: MarkdownPre,
          table: MarkdownTable,
          thead: MarkdownThead,
          tbody: MarkdownTbody,
          tr: MarkdownTr,
          th: MarkdownTh,
          td: MarkdownTd,
        }}
      >
        {raw}
      </ReactMarkdown>
    </div>
  )
}

function MarkdownH1(props: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1 {...props} className="mt-8 mb-3 text-navy font-bold text-[clamp(22px,2vw,28px)] leading-tight tracking-tight first:mt-0" />
  )
}

function MarkdownH2(props: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2 {...props} className="mt-8 mb-3 text-navy font-bold text-[clamp(20px,1.75vw,24px)] leading-snug tracking-tight first:mt-0" />
  )
}

function MarkdownH3(props: ComponentPropsWithoutRef<'h3'>) {
  return <h3 {...props} className="mt-6 mb-2 text-navy font-bold text-h3-m first:mt-0" />
}

function MarkdownH4(props: ComponentPropsWithoutRef<'h4'>) {
  return <h4 {...props} className="mt-5 mb-2 text-navy font-semibold text-h5 first:mt-0" />
}

function MarkdownP(props: ComponentPropsWithoutRef<'p'>) {
  return <p {...props} className="mb-4 last:mb-0 text-grey" />
}

function MarkdownStrong(props: ComponentPropsWithoutRef<'strong'>) {
  return <strong {...props} className="font-semibold text-navy" />
}

function MarkdownUl(props: ComponentPropsWithoutRef<'ul'>) {
  return <ul {...props} className="my-4 list-disc pl-6 text-grey space-y-1.5" />
}

function MarkdownOl(props: ComponentPropsWithoutRef<'ol'>) {
  return <ol {...props} className="my-4 list-decimal pl-6 text-grey space-y-1.5" />
}

function MarkdownLi(props: ComponentPropsWithoutRef<'li'>) {
  return <li {...props} className="marker:text-grey" />
}

function MarkdownA(props: ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      {...props}
      className="text-blue underline underline-offset-2 hover:text-blue-hover transition-colors"
      rel={props.rel ?? 'noopener noreferrer'}
      target={typeof props.href === 'string' && props.href.startsWith('http') ? '_blank' : undefined}
    />
  )
}

function MarkdownBlockquote(props: ComponentPropsWithoutRef<'blockquote'>) {
  return (
    <blockquote
      {...props}
      className="border-l-[3px] border-divider my-5 pl-4 italic text-grey"
    />
  )
}

function MarkdownHr(props: ComponentPropsWithoutRef<'hr'>) {
  return <hr {...props} className="my-8 border-0 border-t border-divider" />
}

function MarkdownCode({ className, ...props }: ComponentPropsWithoutRef<'code'>) {
  const isFenced = typeof className === 'string' && /\blanguage-/.test(className)
  if (isFenced) {
    return (
      <code
        {...props}
        className={cn('block w-full text-[13px] font-mono text-navy whitespace-pre', className)}
      />
    )
  }
  return (
    <code
      {...props}
      className={cn(
        'rounded px-1.5 py-0.5 bg-beige-dark/60 text-navy text-[13px] font-mono',
        className,
      )}
    />
  )
}

function MarkdownPre(props: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre
      {...props}
      className="my-4 overflow-x-auto rounded-panel border border-divider bg-brand-light1 p-4"
    />
  )
}

function MarkdownTable(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-panel border border-divider bg-brand-light1/40">
      <table {...props} className="min-w-full border-collapse text-left text-[14px] text-navy" />
    </div>
  )
}

function MarkdownThead(props: ComponentPropsWithoutRef<'thead'>) {
  return <thead {...props} className="border-b border-divider bg-beige-dark/70" />
}

function MarkdownTbody(props: ComponentPropsWithoutRef<'tbody'>) {
  return <tbody {...props} className="divide-y divide-divider" />
}

function MarkdownTr(props: ComponentPropsWithoutRef<'tr'>) {
  return <tr {...props} className="border-divider hover:bg-beige-dark/35 transition-colors" />
}

function MarkdownTh(props: ComponentPropsWithoutRef<'th'>) {
  return (
    <th {...props} className="border border-divider px-3 py-2.5 font-semibold align-top text-[13px]" />
  )
}

function MarkdownTd(props: ComponentPropsWithoutRef<'td'>) {
  return <td {...props} className="border border-divider px-3 py-2.5 align-top text-grey font-medium text-[13px]" />
}
