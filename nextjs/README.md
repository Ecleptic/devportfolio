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

## Deploy to Netlify

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - **Base directory**: `nextjs`
   - **Build command**: `npm run build`
   - **Publish directory**: `nextjs/out`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify site (run from nextjs directory)
cd nextjs
netlify init

# Deploy manually
netlify deploy --prod
```

### Option 3: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Configuration

The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `out`
- SPA fallback routing

### Environment Variables

No environment variables are needed for this static site.

### Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to the main branch
- Create deploy previews for pull requests
- Rebuild when `resume.json` changes (triggers new static generation)

