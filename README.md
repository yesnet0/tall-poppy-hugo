# Tall Poppy Group - Hugo Website

A static website for Tall Poppy Group, built with Hugo and Tailwind CSS. This is a conversion from the original Next.js/Vercel deployment to a Hugo static site optimized for GitHub Pages.

## Overview

Tall Poppy Group is a cybersecurity-focused investment and advisory firm. This website showcases:

- **About** - Company mission, values, and approach
- **Portfolio** - Companies started by Tall Poppy Group (Bugcrowd, Disclose.io, White Label Security)
- **Advisory** - Investment and advisory portfolio companies
- **Contact** - Contact form and social links

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version, 0.155.2 or later)
- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tall-poppy-hugo.git
   cd tall-poppy-hugo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS:**
   ```bash
   npm run css:build
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   hugo server --buildDrafts
   ```

5. **Open your browser to** http://localhost:1313/

### CSS Development

For active CSS development with hot reload:

```bash
# Terminal 1: Watch Tailwind CSS
npm run css:watch

# Terminal 2: Hugo server
npm run dev
```

## Building for Production

```bash
# Build CSS
npm run css:build

# Build Hugo site
npm run build
# or
hugo --minify
```

The built site will be in the `public/` directory.

## Deployment

### GitHub Pages (Recommended)

This repository includes a GitHub Actions workflow (`.github/workflows/hugo.yml`) that automatically builds and deploys the site to GitHub Pages when you push to the `main` branch.

**Setup:**
1. Push to GitHub
2. Go to repository Settings > Pages
3. Under "Build and deployment", select "GitHub Actions"
4. Push any change to `main` to trigger deployment

### Manual Deployment

Build the site and upload the `public/` folder to any static hosting service:

```bash
npm run css:build && hugo --minify
```

Compatible with: Netlify, Cloudflare Pages, Vercel, Amazon S3, etc.

## Project Structure

```
tall-poppy-hugo/
├── archetypes/         # Content templates
├── assets/
│   └── css/
│       └── main.css    # Tailwind CSS source
├── content/
│   ├── _index.md       # Homepage
│   ├── about/          # About page
│   ├── portfolio/      # Portfolio section
│   ├── advisory/       # Advisory section
│   └── contact/        # Contact page
├── data/
│   ├── companies.yaml  # Portfolio companies data
│   └── advisory.yaml   # Advisory companies data
├── layouts/
│   ├── _default/       # Base templates
│   ├── partials/       # Reusable components
│   ├── portfolio/      # Portfolio templates
│   ├── advisory/       # Advisory templates
│   └── contact/        # Contact template
├── static/
│   ├── css/           # Built CSS
│   └── images/        # Images and logos
├── hugo.toml          # Hugo configuration
├── tailwind.config.js # Tailwind configuration
└── package.json       # Node dependencies
```

## Content Editing

### Adding a New Portfolio Company

1. Create a new markdown file in `content/portfolio/`:
   ```bash
   hugo new portfolio/company-name.md
   ```

2. Edit the front matter:
   ```yaml
   ---
   title: Company Name
   description: Short description
   tagline: Company tagline
   founded: 2024
   image: images/logos/company-logo.png
   website: https://company.com
   layout: single
   ---
   ```

3. Add content sections (About, Key Solutions, Impact)

4. Add the company logo to `static/images/logos/`

### Adding an Advisory Company

Edit `data/advisory.yaml`:

```yaml
- id: company-id
  name: Company Name
  description: Company tagline
  image: images/advisory/company-logo.png
  website: https://company.com
```

### Editing Page Content

- **Homepage**: Edit hero content in `layouts/index.html`
- **About**: Edit `content/about/_index.md`
- **Contact**: Edit form in `layouts/contact/single.html`

## Configuration

Key settings in `hugo.toml`:

- `baseURL` - Update for your deployment URL
- `params.email` - Contact email
- `params.linkedin` - LinkedIn URL
- `params.twitter` - Twitter URL
- `params.ga_id` - Google Analytics ID

## Contact Form

The contact form uses [Formspree](https://formspree.io/) for submission handling. To configure:

1. Create a Formspree account
2. Create a new form
3. Update the form action URL in `layouts/contact/single.html`

## Design System (v2.0.0)

The site is styled by the **CJE / Tall Poppy design system** (from the Claude Design
`cje-tall-poppy-design-system-template` bundle), not Tailwind utilities. Two static
stylesheets in `static/css/` are loaded directly by `layouts/_default/baseof.html`
and copied verbatim by Hugo (they survive the CI Tailwind build, which only writes the
now-unreferenced `style.css`):

- **`design-system.css`** — brand tokens: warm paper `#FAF7F1`, single accent poppy
  crimson `#B5202A`, the `--n-*` / `--poppy-*` / `--space-*` / `--radius-*` ramps, the
  type scale, and semantic type classes. Type stack: Noto Sans (display + UI),
  JetBrains Mono (kickers/tags), EB Garamond (long-form). **Edit tokens here.**
- **`tallpoppy.css`** — component layer: `.tp-header`, `.tp-hero`, `.tp-card`,
  `.tp-band` (dark advisory CTA), `.tp-shell` (about/advisory/contact), `.tp-form`,
  `.tp-footer`, plus `:focus-visible` a11y states and responsive rules. **Edit
  component styling here**; reuse the CSS variables, don't hardcode values.

To restyle: change a token in `design-system.css` or a component rule in
`tallpoppy.css` — no build step needed locally (Hugo serves `static/` as-is).

## Architecture Decisions

1. **Hugo over Next.js** - Static site generation for simpler hosting and better performance
2. **Design-system CSS over Tailwind** - Two hand-authored sheets (`design-system.css` + `tallpoppy.css`) carry the brand; Tailwind is no longer used for rendering
3. **Data files** - Company data in YAML (`data/companies.yaml` carries `kicker`/`role`/`tagline`); easy editing without touching templates
4. **Cloudflare Worker** - Contact form posts to `tpg-contact-form.cje.workers.dev`
5. **Flat paper aesthetic** - One crimson accent, square-ish flat cards, lone-poppy hero (no particles/gradient-wash)

## Migration Notes

This site was converted from a Next.js application. Key changes:

- React components → Hugo templates
- Server components → Static HTML
- Next.js Image → Standard `<img>` tags
- Server Actions → Formspree form handling
- tsparticles → CSS geometric pattern

See `CONVERSION_PLAN.md` for detailed migration documentation.

## License

All rights reserved. Tall Poppy Group.
