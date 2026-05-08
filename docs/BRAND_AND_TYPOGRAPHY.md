# Propabridge brand and typography

Single source of truth for Framer-aligned tokens. Implement in `tailwind.config.ts`, `app/globals.css` (`:root` + `@layer` utilities), and semantic Tailwind classes.

## Brand colors (strict)

Do not use pure `#ffffff` for brand surfaces. Prefer `brand-light1` / `brand-light2` and `brand-textWhite` for light UI and hero copy.

| Token | Hex | Tailwind |
| --- | --- | --- |
| CTA | `#006AFF` | `bg-blue`, `text-blue`, `bg-brand-cta` |
| Primary navy | `#001A40` | `bg-brand-navy`, `text-navy`, `bg-navy` |
| Brand Light 1 | `#FFFFF2` | `bg-brand-light1` |
| Brand Light 2 | `#F4F3EA` | `bg-brand-light2`, `bg-beige` |
| Text White | `#FFF8ED` | `text-brand-textWhite` |
| Text Black | `#21201B` | `text-brand-textBlack` |
| Light Green | `#DFF1C4` | `bg-brand-lightGreen` |
| Light Yellow / gold | `#FFC870` | `text-brand-gold`, `text-gold`, `bg-gold` |
| Red | `#FF8585` | `text-brand-red`, `red.alert` |
| Dark green | `#324F07` | `text-brand-darkGreen`, `verified` |
| Dark brown | `#9E6100` | `text-brand-darkBrown` |
| Dark red | `#800000` | `text-brand-darkRed`, `danger` |

CSS variables live in `app/globals.css` under `:root` (`--brand-*`).

## Typography (Framer → code)

Headings use responsive defaults in `@layer base` (`h1`–`h6`). Prefer Tailwind `text-*` tokens or globals utilities (`.text-h1-l`, `.text-para-l`, …).

| Framer name | Size / line-height / letter | Tailwind `fontSize` key | Utility class |
| --- | --- | --- | --- |
| H1 – L | 56px / 1.0 | `h1-l` | `.text-h1-l` |
| H1 – S | 40px / 1.1 | `h1-s` | `.text-h1-s` |
| H2 – L | 48px / 1.1 | `h2-l` | `.text-h2-l` |
| H2 – S | 30px / 1.3 | `h2-s` | `.text-h2-s` |
| H3 – L | 26px / 1.3 | `h3-l` | `.text-h3-l` |
| H3 – M | 20px / 1.3 | `h3-m` | `.text-h3-m` |
| H3 – S | 16px / 1.3 | `h3-s` | `.text-h3-s` |
| H4 | 18px / 1.5 | `h4` | `.text-h4` |
| H5 | 16px / 1.4, −0.04em | `h5` | `.text-h5` |
| P XXL | 80px / 1.0; 1200px+ letter −3.7px | `p-xxl` | `.text-p-xxl` |
| Paragraph – L | 28px / 1.3; 1200px+ −0.8px | `para-l` + `.text-para-l` | `.text-para-l` (responsive in CSS) |
| Paragraph – M | 18px / 1.3, −0.4px | `para-m` | `.text-para-m` |
| Paragraph – S | 16px / 1.4, −0.03em | `para-s` | `.text-para-s` |
| Paragraph – XS | 15px / 1.5 | `para-xs` | `.text-para-xs` |
| Body | 14px / 1.5 | `body` | `.text-body-token` |
| Body Uppercase | 12px / 1.5, uppercase, letter 0 at L | `body-uppercase` | `.text-body-uppercase` |

Breakpoint `hero` = `1200px` in `tailwind.config.ts` (`hero:*` utilities).

## Hero (`HeroSection.tsx`)

Layer order (back → front): background → image (brightness **0.8**, scroll scale “speed”) → blur overlay (`backdrop-filter` clears on scroll) → vignette (navy, not black) → grid pattern → copy.

- **buy. sell. rent.**: Inter Medium, `text-brand-textWhite`, `tracking-[-12px]`, `leading-[1.2]`; default **buy.** in `text-brand-gold`; **sell.** / **rent.** white; **hover** any segment → `#FFC870`.
- **Tagline**: `text-brand-textWhite`, `text-balance`, chips on **Rent,**, **Buy**, **Invest**, **Properties**, **Nigeria** with `bg-brand-textWhite/20` + light ring (no harsh black).
- **Single `h1`**: reserved for **buy. sell. rent.**; tagline is `<p>` with `id="hero-tagline"`.

## Navbar hamburger (mobile)

Closed state: **one full-width** horizontal bar and a **second bar at half width** (Framer-style), implemented in `components/layout/Navbar.tsx` (not the old three-line menu icon).

## Property card (`PropertyCard.tsx`)

Structure: **image wrapper → image** → **text block**: location (icon + label) → specs + price row → divider → title → **tag wrapper** (asymmetric rounded beige / `brand-light2`) + status text.

## Intentional compromises

- **Pure white** may remain inside **form inputs**, **blog prose**, or **third-party** contexts where contrast or CMS content requires it.
- **P XXL** is defined at 80px in Tailwind; responsive clamp for hero display is handled separately where needed.
- **Particles** in the Framer hero are omitted (optional minimal CSS only).

When extending the site, prefer `brand-*` and typography tokens before new raw pixel values.
