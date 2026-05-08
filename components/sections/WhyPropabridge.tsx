/* ─────────────────────────────────────────────────────────────
   OUR UNIQUENESS — "Why We Are Not Just Another Property Platform"
   4-column feature grid matching reference design
───────────────────────────────────────────────────────────── */

const UNIQUENESS_COLUMNS = [
  {
    id: 'verified',
    title: 'Every Listing is Physically Verified',
    bullets: [
      'Our team physically inspects the property — every time',
      'Original title documents sighted and recorded before listing',
      'Fraudulent or misrepresented listings are rejected at source',
    ],
  },
  {
    id: 'free',
    title: 'You Never Pay to View. Full Stop.',
    bullets: [
      'Zero inspection fees — legally, morally, and operationally',
      'Zero registration fees for property seekers',
      'Commission-based model — we only succeed when you do',
    ],
  },
  {
    id: 'noagents',
    title: 'No Agents on the Front End. By Design.',
    bullets: [
      'Agents supply inventory — but never contact you unsolicited',
      'All listings uploaded and quality-controlled by our team',
      'One professional point of contact throughout',
    ],
  },
  {
    id: 'propa',
    title: 'Propa Answers at 3am. Agents Don\'t.',
    bullets: [
      'Conversational search in plain language',
      'Available on web and WhatsApp, 24 hours, 7 days',
      'Books viewings, sends property details, and follows up',
    ],
  },
]

export default function WhyPropabridge() {
  return (
    <section className="bg-beige" aria-labelledby="uniqueness-heading">

      {/* ── DIVIDER — separates from ServicesSection above ── */}
      <hr className="border-t border-grey-light mx-6" aria-hidden="true" />

      {/* ── HEADER — label left, heading centered ── */}
      <div className="container-site section-pt pb-12">
        <div className="flex items-center gap-6">

          {/* Label — navy square + OUR UNIQUENESS, left-aligned, shrinks to fit */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0"
              aria-hidden="true"
            />
            <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em] whitespace-nowrap">
              OUR UNIQUENESS
            </p>
          </div>

          {/* Heading — takes remaining space, centered within it */}
          <h2
            id="uniqueness-heading"
            className="flex-1 text-center text-display-lg font-medium text-heading"
          >
            Why We Are Not Just<br className="hidden md:block" /> Another Property Platform.
          </h2>
        </div>
      </div>

      {/* ── 4-COLUMN FEATURE GRID ── */}
      <div className="container-site section-pb">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {UNIQUENESS_COLUMNS.map((col) => (
            <div
              key={col.id}
              className="flex flex-col border-l border-navy/20 pl-6"
            >
              {/* Column title — size and weight matching reference */}
              <h3 className="text-navy font-medium text-[22px] tracking-[-0.01em] leading-[1.2] mb-6 pr-4">
                {col.title}
              </h3>

              {/* Bullet list — navy filled dot + text */}
              <ul className="flex flex-col" role="list">
                {col.bullets.map((bullet, i) => (
                  <li key={i} className="flex flex-col">
                    <div className="flex items-start gap-3 py-3">
                      {/* Navy filled square bullet */}
                      <span
                        className="mt-[8px] shrink-0 w-[6px] h-[6px] bg-navy"
                        aria-hidden="true"
                      />
                      <span className="text-[14.5px] text-grey leading-[1.3] tracking-[-0.004em] pr-2">
                        {bullet}
                      </span>
                    </div>
                    {/* Thin divider below EACH bullet EXCEPT the last one */}
                    {i < col.bullets.length - 1 && (
                      <hr className="border-t border-grey-light/80 my-1" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
