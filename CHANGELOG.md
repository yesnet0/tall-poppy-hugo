# Changelog

## v1.0.0 - Hugo Conversion (2026-02-09)

### Migrated

- **Homepage** - Hero section with "Applied cybersecurity" headline, CTA button, poppy illustration
- **About page** - All 5 content sections (Why we exist, What we back, How we work, Partners for long run)
- **Portfolio list** - 3 company cards (White Label Security, Bugcrowd, Disclose.io)
- **Portfolio detail pages** - Full case studies for each company with About, Key Solutions, Impact sections
- **Advisory page** - 9 company cards with logos and links
- **Contact page** - Two-column layout with contact info and form
- **Navigation** - Header with logo, nav links, Portfolio dropdown
- **Footer** - Logo, navigation links, contact email, social icons
- **Mobile menu** - Responsive hamburger menu with slide-out drawer

### Equivalent Features

- **Visual design** - Pixel-perfect match using same Tailwind CSS classes
- **Color scheme** - Preserved brand red (#dc2626, #b91c1c, navbar #b32c2c)
- **Typography** - Inter font family maintained
- **Responsive layout** - Same breakpoints and grid system
- **SEO metadata** - Title, description, OG tags, favicon

### Improved

- **Performance** - Static HTML vs server-rendered React
- **Hosting simplicity** - No server runtime required
- **Build speed** - Hugo builds in milliseconds
- **Content editing** - Markdown files vs hardcoded JSX

### Changed

- **Form handling** - Server Actions → Formspree (third-party static form service)
- **Hero background** - tsparticles animation → CSS geometric pattern (simpler, no JS)
- **Image optimization** - Next.js Image component → standard img with lazy loading
- **Analytics** - Same GA4 tracking, simplified script inclusion

### Removed / Descoped

- **Dark mode** - Theme toggle removed (was not enabled in production anyway)
- **Toast notifications** - Replaced with standard form confirmation
- **Client-side validation** - Uses HTML5 validation instead of Zod
- **Image loading skeletons** - Removed in favor of native lazy loading

### Technical Stack

| Before | After |
|--------|-------|
| Next.js 15.2.8 | Hugo 0.155.2 |
| React 19 | Go templates |
| TypeScript | N/A |
| Vercel hosting | GitHub Pages |
| Server Actions | Formspree |
| tsparticles | CSS patterns |
| shadcn/ui | Custom Tailwind |

### File Structure

```
Source (Next.js)          →  Hugo
─────────────────────────────────────────
app/page.tsx              →  layouts/index.html
app/about/page.tsx        →  content/about/_index.md
app/portfolio/page.tsx    →  layouts/portfolio/list.html + data/companies.yaml
app/portfolio/*/page.tsx  →  content/portfolio/*.md
app/advisory/page.tsx     →  layouts/advisory/list.html + data/advisory.yaml
app/contact/page.tsx      →  layouts/contact/single.html
components/navbar.tsx     →  layouts/partials/header.html
components/footer.tsx     →  layouts/partials/footer.html
app/globals.css           →  assets/css/main.css
public/*                  →  static/*
```

### Known Differences

1. **Form submission** - Requires Formspree setup (placeholder ID in template)
2. **URL trailing slashes** - Hugo uses `/about/` vs Next.js `/about`
3. **404 page** - Not yet implemented (Hugo default)
4. **RSS feed** - Added (Hugo built-in feature)
5. **Sitemap** - Added (Hugo built-in feature)

### Verification

All pages visually compared against reference screenshots captured from tallpoppygroup.com. See `reference-screenshots/` in source repository.
