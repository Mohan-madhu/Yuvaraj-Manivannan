# Yuvaraj Manivannan Portfolio

A responsive personal portfolio for **Yuvaraj Manivannan**, positioning him for Data Analyst, Business Analyst, and Digital Marketing Analyst roles.

## Stack

- React 19 + Vite
- Tailwind CSS 4
- GSAP (scroll and letter-by-letter text reveals)
- Lenis smooth scrolling
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

The local development server runs at `http://localhost:5173`.

## Production build

```bash
npm run build
```

Vite writes the static production site to `dist/`.

## Deploy to Vercel

1. Import this GitHub repository in [Vercel](https://vercel.com/new).
2. Select the Vite framework preset, or leave it auto-detected.
3. Keep the default settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

The site is a single-page static Vite site. Navigation uses in-page anchor links, so all section links work on Vercel without custom rewrite rules.
