# MK's Tandoori — SEO / Local SEO / AI-SEO Audit

**Site:** mkstandoori.com (Next.js 14, App Router)
**Scope:** `app/`, `public/`, `next.config.js`, structured data, all 7 pages (home + 6 dish/location landing pages)
**Date:** 2026-07-29

---

## Scores

| Category | Score | Notes |
|---|---|---|
| Overall Technical SEO | **84 / 100** | Strong foundation (Metadata API, canonicals, sitemap, robots, FAQ/Breadcrumb schema on every page). Docked for missing landing pages and (pre-fix) NAP duplication. |
| AI SEO / LLM Optimization | **78 / 100** | Good entity structure (FAQPage, semantic HTML, `<details>` accordions crawlers/LLMs can parse natively). Docked for no About/author page and several requested dish pages missing. |
| Local SEO | **80 / 100** | NAP now centralized, GeoCoordinates added. Docked for no verifiable FSSAI number, no Google Business Profile link, no reviews/ratings data. |
| Performance | **70 / 100*** | OG image fixed from 3.8MB→90KB, `sizes` added to all `fill` images. Docked for large uncompressed source photos and a third-party QR image fetched at request time. |
| Accessibility | **75 / 100** | Alt text present everywhere, heading hierarchy fixed. Docked for low-opacity text (contrast risk) that needs a design decision, not a blind code fix. |

\* *Performance score is a static-analysis estimate (bundle size, image weight, code review). No Lighthouse/CWV run was performed — this environment has no browser or live URL to measure LCP/CLS/INP against. Treat as directional, not a certified score.*

---

## What Was Already Right (don't re-litigate these)

- Full Next.js **Metadata API** usage, per-page `generateMetadata`-style static `metadata` exports, correct title templates via `layout.tsx`.
- **Canonical URLs** on every page (`alternates.canonical`).
- **`app/sitemap.ts`** and **`app/robots.ts`** using Next's typed file conventions — all 7 routes included, no orphans.
- **FAQPage + BreadcrumbList + FoodEstablishment/Restaurant JSON-LD** on every one of the 6 landing pages, plus Organization + Restaurant schema on the homepage.
- 100% **static rendering** (SSG) — appropriate for a marketing site with no per-request data.
- `next/font/google` with `display: swap` for all three font families — correct font-loading practice.
- Descriptive, unique `<title>` and meta description per page, all under reasonable length.
- Real internal cross-linking between the 6 landing pages ("Also try…" blocks) — no orphan pages.
- Semantic `<details>/<summary>` FAQ accordions — accessible without JS and fully crawlable by both search bots and LLMs.

---

## Fixes Implemented Automatically (safe, non-destructive)

All of these are committed as working-tree changes — see the diff at the end of this report.

### 1. Open Graph / Twitter share images (Critical → Fixed)
The site's OG/Twitter image was `mascot-badge.png` — a **3.8MB, 1833×1833 raw PNG** linked directly in `<meta>` tags, bypassing Next's image optimizer entirely (meta tags always serve the raw file). Facebook/Twitter/LinkedIn/WhatsApp crawlers frequently timeout or refuse to render images that large, and AI answer engines that pull preview images have the same issue.

**Fix:** generated a properly cropped, brand-consistent `public/og-image.jpg` (1200×630, 90KB) and **5 page-specific OG images** (`og-tandoori-chicken.jpg`, `og-chicken-biryani.jpg`, `og-soya-chaap.jpg`, `og-chicken-roll.jpg`, `og-kati-roll.jpg`, all 110–190KB) derived from each page's own hero photo, wired into that page's `openGraph.images` / `twitter.images`.

```tsx
// app/tandoori-chicken-noida-sector-75/page.tsx
openGraph: {
  ...
  images: [{ url: 'https://mkstandoori.com/og-tandoori-chicken.jpg', width: 1200, height: 630, alt: "…" }],
},
twitter: {
  card: 'summary_large_image',
  ...
  images: ['https://mkstandoori.com/og-tandoori-chicken.jpg'],
},
```
**Impact:** High — directly affects click-through rate from every social share and any AI tool that surfaces a link preview.

### 2. Missing GeoCoordinates + WebSite schema (Local SEO / AI SEO — High → Fixed)
No page had `geo` coordinates in its LocalBusiness/Restaurant/FoodEstablishment JSON-LD — an explicit gap called out for Local SEO, and a real disambiguation signal for AI answer engines resolving "MK's" as a place entity. There was also no `WebSite` entity, so nothing tied the Organization to the site as a whole.

**Fix:** added `geo: { '@type': 'GeoCoordinates', latitude: 28.5745, longitude: 77.3591 }` (decoded from the site's own Google Maps embed — not fabricated) to all 7 schema blocks, plus a `WebSite` schema linked to the `Organization` via `@id` on the homepage.

```ts
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://mkstandoori.com/#website',
  name: "MK's Tandoori",
  url: 'https://mkstandoori.com',
  publisher: { '@id': 'https://mkstandoori.com/#organization' },
  inLanguage: 'en-IN',
}
```
**Impact:** Medium-High for Local Pack eligibility and entity resolution in Google AI Overviews / Perplexity / ChatGPT search.

### 3. NAP inconsistency risk (Local SEO — High → Fixed)
`app/lib/constants.ts` is explicitly commented *"Centralized, easy-to-edit site facts. Update here — everything else reads from this file"* — but all 6 landing pages **hardcoded** the phone number (`tel:+918076374624`, `+91 80763 74624`) and street address directly instead of importing from it. If the number or address ever changes, five of the six pages silently go stale, creating a real NAP (Name-Address-Phone) inconsistency risk across the site and in structured data.

**Fix:** every landing page now imports `PHONE_SECONDARY`, `PHONE_SECONDARY_TEL`, `ADDRESS_LINE_1` from `lib/constants.ts` for both the visible CTA links and the JSON-LD `telephone`/`streetAddress` fields.

**Impact:** Medium now, High in the future — this was a maintenance trap more than an active bug, but it's exactly the kind of thing that silently breaks NAP consistency after a business changes hours/numbers.

### 4. Heading hierarchy skip (Accessibility — Medium → Fixed)
Homepage went `h1` (visually hidden) → `h2` ("Popular Menu") → **`h4`** (menu item names in `MenuTabs.tsx`), skipping `h3` entirely.

**Fix:** changed the menu item heading from `<h4>` to `<h3>` in `app/components/MenuTabs.tsx`.

### 5. Missing `lang` attribute on Hindi text (Accessibility / i18n — Low → Fixed)
`nameHindi` strings (Devanagari script) rendered with no `lang="hi"`, so screen readers fall back to English pronunciation rules on Hindi text.

**Fix:** added `lang="hi"` to the Hindi name in `SpecialsSlider.tsx`.

### 6. Missing `sizes` on `fill` images (Performance — Medium → Fixed)
Every `<Image fill>` instance (18 across the codebase — heroes, gallery grid, menu thumbnails, circular photo crops) had no `sizes` prop, so Next.js defaulted to requesting `100vw`-equivalent images even for 64px menu thumbnails and 128px photo crops — real wasted bytes on mobile.

**Fix:** added contextually correct `sizes` values everywhere (`100vw` for full-bleed heroes, `80px` for menu thumbnails, `(max-width: 768px) 50vw, 384px` for the gallery grid, etc.) across `page.tsx`, `MenuTabs.tsx`, `SpecialsSlider.tsx`, `Footer.tsx`, and all 6 landing pages.

### 7. Weak internal linking from homepage to money pages (Technical SEO — Medium → Fixed)
The homepage never linked to any of the 6 keyword-targeted landing pages in its own body content — only the sitewide footer did. Footer links carry less contextual/topical weight than an in-content link with descriptive anchor text.

**Fix:** added an "Explore Noida Sector 75 / What Are You In The Mood For?" section on the homepage with six keyword-rich internal links (`Tandoori Chicken in Sector 75`, `Chicken Biryani in Noida`, etc.) directly to each landing page.

---

## Findings NOT Auto-Fixed (need your input — flagged, not fabricated)

### Critical

- **Six of the twelve dishes/pages explicitly requested in your checklist have no dedicated landing page**: Butter Chicken, Chicken Tikka (standalone), Kebab, Takeaway, Delivery, Catering. Only Tandoori Chicken, Chicken Biryani, Family Restaurant, Soya Chaap, Chicken Roll, and Kati Roll exist. I did not fabricate new pages with invented prices/menu items — "Butter Chicken" is even referenced in the Family Restaurant page copy but **does not exist in `app/lib/menu.ts`**, meaning it may not be a real, orderable item. **Action needed:** confirm real menu items/prices for these dishes before I (or you) build the pages — publishing invented prices would be a factual-accuracy and possibly legal problem, not just an SEO one.
- **No real review/rating data anywhere.** `AggregateRating`/`Review` schema is one of the highest-value Local SEO signals, but I will not fabricate ratings or review counts — that violates Google's structured data guidelines and schema.org's intent, and reads as manipulative to AI answer engines too. If you have real Google/Zomato/Swiggy ratings, they should be added as `AggregateRating` referencing the actual source.

### High

- **`FSSAI Certified` badge in the footer shows no license number.** An unverifiable compliance claim is a weaker trust/E-E-A-T signal than a real number, and in India, FSSAI display requirements expect the actual registration number. I did not invent one — please supply the real FSSAI number so it can be added as visible text (and optionally as `Organization.identifier`).
- **No About / Owner / Contact page.** For E-E-A-T (Experience, Expertise, Authoritativeness, Trust) — which materially affects both classic SEO and how confidently LLMs cite a business — a short About page (who runs it, how long it's operated, sourcing/hygiene practices) is one of the highest-leverage additions you could make. This needs real content from you, not placeholder copy.
- **Large uncompressed source images.** Several files used directly by `<Image>` (which *does* auto-optimize on render, mitigating most of this) are 2–5.7MB PNGs (`Gemini_Generated_Image_denxeedenxeedenx (1).png` 5.7MB, `Gemini_Generated_Image_c19bsjc19bsjc19b.png` 5.5MB, `mascot-badge.png` 3.8MB, several soya-chaap/roll PNGs 1.9–2.6MB). Not a live bug for on-page rendering (Next's optimizer resizes/recompresses on the fly), but it bloats the repo/build and any place these are linked directly (like the old OG tags, now fixed). **Recommend:** re-export the Gemini-generated PNGs as compressed JPEGs/WebP at the source, since they're photographic content, not graphics needing transparency.
- **Filenames with spaces/parentheses** (`Chicken Tikka Roll (1).jpg`, `Classic Chicken Tikka Skewers.jpg`, `Creamy Chicken Roll 2.png`) force `%20`-encoded URLs sprinkled through the code and are a (minor) negative for image-search SEO, which favors descriptive, hyphenated filenames. This is a mechanical rename + reference-update across ~10 files — I did not do it in this pass because it touches every page that references these assets and I wanted to keep this batch of changes reviewable; happy to do it as a dedicated follow-up if you want it.

### Medium

- **`chicken-roll-noida` and `kati-roll-noida` have topically overlapping content** (both: tandoori chicken, rumali roti, mint chutney, ₹150–180). Real keyword-cannibalization risk. The existing FAQ ("What is a kati roll?") already partially disambiguates the two, which helps — but consider sharpening the differentiation further (e.g., lean harder into the "skewer-roasted vs. tawa-cooked" distinction in the H1/intro copy, not just the FAQ).
- **Family Restaurant page uses external Unsplash stock photos** (`images.unsplash.com/photo-1517248135467…`, `…1585937421612…`) for its hero and "Experience" image instead of real photos of MK's own dining space. For a Local Business / E-E-A-T standpoint, generic stock photography of an unrelated restaurant is a weaker trust signal than real photos — and if a customer visits expecting what they saw, it can actively hurt trust. Recommend replacing with real interior photos when available.
- **No `sameAs` link to a Google Business Profile or Facebook Page** in the Organization schema (only Instagram, Swiggy, Zomato). If either exists, adding it strengthens entity consolidation for Local Pack and Knowledge Panel eligibility.
- **Text contrast risk**: many UI elements use very low opacity (`text-white/30`, `text-white/40`, `text-ink/30`) on the landing-page dark theme, e.g. FAQ body text, "Also try" footer links, image captions. These likely fail WCAG AA (4.5:1) for body text at that opacity. I did not change these — opacity is a deliberate visual-design choice across the whole site's dark sections, and blindly bumping it would alter brand look without your sign-off. Recommend a manual contrast pass (a contrast checker on the actual rendered colors) before deciding how much to raise the minimum opacity.
- **No ESLint config in the repo** (`next lint` prompts for first-time setup rather than running). Not an SEO issue per se, but it means accessibility/Next.js best-practice lint rules (e.g. `next/no-img-element`, `jsx-a11y/*`) aren't enforced in CI. I didn't set this up automatically since it adds new devDependencies and a config file that should be a deliberate choice, not a side effect of an SEO pass.
- **Instagram QR code image is fetched from a third-party API at render time** (`api.qrserver.com`) with `unoptimized` set, on every homepage load. Fine functionally, but it's an external runtime dependency for something that never changes — pre-generating it once as a static asset would remove a third-party request from the critical-ish path and guarantee it never breaks if that free API ever goes down.

### Low

- `sitemap.ts` sets every page's `lastModified` to `new Date()` (i.e., build/request time) rather than the page's actual last-edited date — harmless, but it means the sitemap never signals *which* page actually changed most recently, slightly diluting the crawl-priority hint.
- Homepage's visible `<h1>` is `sr-only` (screen-reader-only text over a hero photo). This is legitimate, accessible markup — not cloaking, since bots and users get identical HTML — but Google's own guidance mildly prefers a visible H1 matching the primary heading where feasible. Given the hero is a full-bleed photo + circular badge design, a visible H1 would require a design change I didn't want to make unilaterally.
- Category names in `titleHindi`/`nameHindi` (defined in `app/lib/menu.ts`) are captured in the data model but **never rendered** in `MenuTabs.tsx` (only used in `SpecialsSlider.tsx`). This is unused bilingual content that could add legitimate semantic/entity richness (Hindi + English dish names) if surfaced — low effort, your call on whether it fits the design.

---

## Section 9 — Per-Dish Landing Page Checklist (as requested)

| Page | Unique Title | Unique Desc | H1 | FAQ | Schema | Local Keywords | Images | Internal Links |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Tandoori Chicken | ✅ | ✅ | ✅ | ✅ (5) | ✅ FoodEstablishment+FAQ+Breadcrumb | ✅ | ✅ | ✅ |
| Chicken Biryani | ✅ | ✅ | ✅ | ✅ (5) | ✅ | ✅ | ✅ | ✅ |
| Chicken Roll | ✅ | ✅ | ✅ | ✅ (5) | ✅ | ✅ | ✅ | ✅ |
| Kati Roll | ✅ | ✅ | ✅ | ✅ (5) | ✅ | ✅ | ✅ | ✅ |
| Soya Chaap | ✅ | ✅ | ✅ | ✅ (5) | ✅ | ✅ | ✅ | ✅ |
| Family Restaurant | ✅ | ✅ | ✅ | ✅ (5) | ✅ Restaurant+FAQ+Breadcrumb | ✅ | ⚠️ stock photos | ✅ |
| **Butter Chicken** | ❌ missing | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Chicken Tikka** (standalone) | ❌ missing* | — | — | — | — | — | — | — |
| **Kebab** | ❌ missing | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Takeaway** | ❌ missing | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Delivery** | ❌ missing | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Catering** | ❌ missing | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

\* Chicken Tikka is sold as a menu item and appears inside the Tandoori Chicken page's menu grid, but has no dedicated landing page of its own.

---

## Structured Data Validation Summary

| Type | Present? | Where | Notes |
|---|---|---|---|
| Organization | ✅ | Home | Now has `@id` for entity linking |
| WebSite | ✅ *(added)* | Home | New |
| Restaurant / FoodEstablishment | ✅ | Home + all 6 subpages | Now includes `geo` on all 7 |
| BreadcrumbList | ✅ | All 6 subpages | Not on home (root page — correct, not needed) |
| FAQPage | ✅ | All 6 subpages | 5 Q&As each, well-formed |
| Menu (schema.org `Menu`/`MenuSection`) | ⚠️ partial | via `hasMenuItem` | Valid but not using the full `Menu`/`MenuSection` hierarchy — acceptable, `hasMenuItem` directly on Restaurant is valid schema.org |
| ImageObject | ❌ | — | Not present; low priority, `image` string fields are valid without full ImageObject |
| VideoObject | ❌ | — | No video content on the site |
| Review / AggregateRating | ❌ | — | **Do not fabricate** — add only with real data |
| SearchAction | ❌ | — | Not applicable — site has no internal search feature |

No invalid/malformed JSON-LD was found; all blocks are well-formed and passed a manual schema shape review.

---

## Verification Performed

- `npm run build` — **succeeds**, all 7 routes statically generated (○), no type errors.
- `npm run lint` — no ESLint config present in the repo (first-run setup prompt); not configured as part of this pass since it would add new dependencies/config as a side effect of an SEO audit (flagged above as a Medium finding instead).
- Could not run Lighthouse/PageSpeed or open a browser — no live URL and no headless browser available in this environment. Performance score above is a static-analysis estimate, not a measured Core Web Vitals result.

---

## Git Diff Summary

```
 app/chicken-biryani-noida/page.tsx             | 23 ++++++++--
 app/chicken-roll-noida/page.tsx                | 23 ++++++++--
 app/components/Footer.tsx                      |  2 +-
 app/components/MenuTabs.tsx                    |  4 +-
 app/components/SpecialsSlider.tsx               |  4 +-
 app/family-restaurant-sector-75-noida/page.tsx | 14 ++++--
 app/kati-roll-noida/page.tsx                   | 22 +++++++--
 app/layout.tsx                                 |  4 +-
 app/page.tsx                                   | 62 ++++++++++++++++++++++++--
 app/soya-chaap-noida/page.tsx                  | 23 ++++++++--
 app/tandoori-chicken-noida-sector-75/page.tsx  | 22 +++++++--
 11 files changed, 169 insertions(+), 34 deletions(-)

 New files (not tracked yet):
   public/og-image.jpg              (89.6 KB — homepage/default OG+Twitter image)
   public/og-tandoori-chicken.jpg   (133 KB)
   public/og-chicken-biryani.jpg    (188 KB)
   public/og-soya-chaap.jpg         (158 KB)
   public/og-chicken-roll.jpg       (113 KB)
   public/og-kati-roll.jpg          (126 KB)
```

Nothing was deleted, renamed, or overwritten destructively. No prices, reviews, ratings, certifications, or business facts were invented — every added value (geo coordinates, phone, address) was derived from data already present in the codebase (the Google Maps embed, `lib/constants.ts`).

Run `git diff` for the full patch, or `git diff --stat` for the summary above.
