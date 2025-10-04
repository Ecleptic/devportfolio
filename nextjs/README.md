# Next.js Portfolio Site

This is a statically generated portfolio site built with Next.js that pulls data from `../resume.json`.

## Features

- ✅ **Static Site Generation (SSG)** - All pages pre-rendered at build time
- ✅ **Data-Driven** - Content pulled from `resume.json`
- ✅ **Identical Styling** - Uses the same SCSS from the original HTML portfolio
- ✅ **Respects Hidden Flags** - Only shows content when hidden !== "all" or "site"
- ✅ **React Components** - Modular, reusable components
- ✅ **Smooth Animations** - Converted jQuery animations to React/vanilla JS

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npx serve@latest out
```

## Build Output

The static site is exported to the `out/` directory.

## Data Source

The site reads from `../resume.json` at build time.
