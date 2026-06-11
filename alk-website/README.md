# ALK Real Estate — Website (design preview)

A luxury real-estate & hospitality site for the Adriatic coast of Montenegro.
Aesthetic: **light Liquid Glass** — warm daylight, frosted translucency,
architectural minimalism, editorial typography. Built to feel like a calm
extension of the operating system rather than a marketing page.

## Run it

No build step. Just open the files in a browser:

```
open "index.html"        # macOS
```

Or serve locally (recommended — avoids any browser file:// quirks):

```
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Pages

| File | Page |
|------|------|
| `index.html`       | Home / landing |
| `residences.html`  | The collection (filterable) |
| `residence.html`   | Single residence — specs, gallery, **floor plans** |
| `hospitality.html` | Managed living, spa, dining |
| `location.html`    | Boka Bay — the setting & getting here |
| `contact.html`     | Enquiry form & studio details |

## Structure

```
assets/css/style.css   — the whole design system (tokens, glass, layout)
assets/js/main.js      — nav, scroll reveal, parallax, filters, tabs, form
```

## Photography — your real renders are wired in

Your renders from `WEBSITE/` (President Budva + Tivat) are imported, compressed
to web-friendly JPEGs (~700 KB, 2000 px wide) and live in `assets/img/`:

| File | Used for |
|------|----------|
| `tivat-pool-facade.jpg` | home hero, project card, CTAs |
| `tivat-entrance.jpg` | arrival / gallery |
| `tivat-rooftop.jpg` | hospitality hero, The Bay |
| `tivat-restaurant.jpg` | dining |
| `tivat-onebed.jpg` / `tivat-studio.jpg` | residence types |
| `president-suite.jpg` | project card, residence hero |
| `president-lobby.jpg` | lobby / contact |
| `plan-studio.jpg` / `plan-onebed.jpg` | **real floor plans** (Floor Plans page) |

To add or replace images later:
1. Drop new files into `assets/img/` (keep them ~2000 px, JPEG ≤ 1 MB).
   Re-compress originals with: `sips -s format jpeg -s formatOptions 82 --resampleWidth 2000 IN.png --out assets/img/OUT.jpg`
2. Point the relevant `src="assets/img/..."` at the new file.
3. Every `<img>` sits over a `.ph` gradient layer, so nothing looks broken if a
   file is ever missing.

> Mediterranean photo placeholders were removed — the site now uses only your
> project renders. The 4 mockups in `WEBSITE/ASSETS/` are kept as design
> reference (the "Timeless places. Lasting value." direction).

## Design tokens (edit once, change everywhere)

All colours, spacing, blur and motion live in `:root` at the top of
`assets/css/style.css` — warm whites, misty grays, soft coastal blue, stone,
champagne accent. Adjust there to retune the whole site.

## Notes for release

- Fully static — deploy to Netlify, Vercel, Cloudflare Pages or any host as-is.
- The contact form is a front-end demo; wire `form[data-demo]` to your mailer
  / backend (e.g. Formspree, a serverless function) before launch.
- Respects `prefers-reduced-motion`; responsive at 375 / 768 / 1024 / 1440.
