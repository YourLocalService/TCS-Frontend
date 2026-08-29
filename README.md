# TCS Canada — Next.js Clone

A rebuild of [tcs-canada.ca](https://tcs-canada.ca/) using Next.js (App Router) + TypeScript + Tailwind CSS v4, instead of the original WordPress site — with the real photos, real logo, and real fonts pulled from the live site, not placeholders.

## What the original site was built with

For reference, tcs-canada.ca itself runs on:

- **WordPress 7.1** with a bespoke PHP theme (`wp-content/themes/tcs`) — not a page builder like Elementor or Divi
- **Contact Form 7** + a small custom "popup" plugin (SweetAlert2) for the consultation form
- **WP Multilang** for the EN / RU / UA languages and CA / USA / UA country switcher
- **Swiper.js** for the gallery carousel
- Two self-hosted licensed fonts: **Book Antiqua** (headings) and **Futura New** (body text)
- Hosted on shared hosting behind nameservers `ns1–3.hostingww.com`

## What's in this clone

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- All pages from the original, at the same URLs: `/`, `/about-us`, `/gallery`, `/contacts`, and the 9 service pages (`/mounting`, `/thermal`, `/hydro-isolation`, `/remont`, `/dismantling`, `/landscaping-and-interlocking`, `/deck`, `/walls`, `/gazebo`)
- **The real hero photo for every page** (each service page has its own distinct photo on the live site — these were pulled from the original site's own `wp-content/uploads`, then compressed with `sharp` from the original ~1–6MB PNGs down to ~1.6MB total)
- **The real logo**, extracted from the site and re-processed so it renders correctly as a white silhouette on the navy footer
- **The real project gallery photos** (7 of them) in a prev/next carousel matching the original's layout
- **The real fonts** — Book Antiqua and Futura New — self-hosted as `.woff2` files in `public/fonts`, loaded with the exact same `@font-face` rules as the live site
- Exact colors (`#1c2748` navy, `#f9e6ae` gold), exact button treatment (sharp corners, uppercase, the diagonal "shine" sweep animation from the original CSS), exact container width (1440px) and header/hero spacing, pulled directly from the theme's own stylesheet
- Plain white title-banner layout on About/Gallery/Contacts (matching the original — only the homepage and the 9 service pages use the dark photo hero)

## What's intentionally different / left as TODO

- **Contact form**: `src/components/ContactForm.tsx` is front-end only right now (no email is actually sent). Wire it up to a form service (e.g. Formspree, Resend, or a Next.js API route) before going live.
- **Language switcher / country flags**: shown in the header/footer for visual parity, but not functional — the original's RU/UA translations weren't ported over.
- **Google Map embed** on the Contacts page.
- Image files were re-compressed to JPEG for reasonable load times; if you want pixel-identical source files, the originals are on the live site under `/wp-content/uploads/...`.

## Project structure

- `src/data/site.ts` — company info, phone numbers, nav/services list, team members, hero image paths
- `src/data/serviceContent.ts` — the text content for each of the 9 service pages
- `src/components/` — Header, Footer, Hero, PageTitle, Button, PriceBanner, TeamSection, GalleryCarousel, ServiceIcon, ServicePageTemplate
- `src/app/` — one route folder per page
- `public/images/` — hero photos, logo, gallery photos (all pulled from the live site)
- `public/fonts/` — Book Antiqua + Futura New woff2 files (pulled from the live site)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

to build and run the production build.

## Deploying

Works out of the box on [Vercel](https://vercel.com/new) (drag-and-drop the folder or connect a GitHub repo), or any host that can run `next build && next start` / a static export.
