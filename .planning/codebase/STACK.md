# Technology Stack

**Analysis Date:** 2026-04-13

## Languages

**Primary:**
- HTML5 - Static HTML markup and Shopify Liquid templates
- CSS3 - Styling and animations (brand_kit.css as token source)
- JavaScript (ES5 vanilla) - Client-side interactions in HTML files and Liquid sections

**Secondary:**
- Liquid 1.0 - Shopify template language for theme sections

## Runtime

**Environment:**
- Node.js (for local development server)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Shopify Liquid (theme framework) - Dynamic product pages, collections, templates
- Express.js 5.2.1 - Local development server for previewing Liquid sections as HTML

**Build/Dev:**
- None - Pure static HTML/CSS deployment. Local development uses Express for Liquid-to-HTML stripping.

## Key Dependencies

**Critical:**
- `express` 5.2.1 - Serves static HTML files and converts Liquid sections to browser-viewable HTML by stripping Liquid syntax

## Configuration

**Environment:**
- No .env file required for Vercel deployment
- Express server runs on `localhost:3005`
- Project root is served as static site

**Build:**
- No build process - Vercel serves files directly from root with redirects

## Platform Requirements

**Development:**
- Node.js 18+ (for Express server)
- `npm install` for dependencies
- `npm start` launches local server on port 3005

**Production:**
- Vercel Static Deployment
- No build step: output directory is `.` (project root)

---

*Stack analysis: 2026-04-13*
