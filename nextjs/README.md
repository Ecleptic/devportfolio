# Next.js Portfolio Site

Modern, data-driven portfolio site built with Next.js that pulls all content from `../resume.json`.

**Live Site:** [camerongreens.com](https://camerongreens.com)

## Features

- ✅ **Static Site Generation (SSG)** - All pages pre-rendered at build time for optimal performance
- ✅ **Data-Driven** - All content pulled from `resume.json` (single source of truth)
- ✅ **Identical Styling** - Uses the same SCSS from the original HTML portfolio
- ✅ **Respects Hidden Flags** - Only shows content when `hidden !== "all"` and `hidden !== "site"`
- ✅ **React Components** - Modular, reusable component architecture
- ✅ **Smooth Animations** - Native React animations (converted from jQuery)
- ✅ **Automated PDF Generation** - Resume PDF built automatically during dev & production builds
- ✅ **Mobile Responsive** - Mobile-first design with hamburger menu
- ✅ **Modern Sass** - No deprecated functions, computed color values
- ✅ **Consistent Shadows** - Drop shadows on all card components

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server (auto-generates PDF first)
npm run dev
# Opens at http://localhost:3000
# Resume available at http://localhost:3000/Resume.pdf
```

### Production Build

```bash
# Build static site (auto-generates PDF first)
npm run build
# Output: out/ directory

# Preview production build locally
npx serve@latest out
```

### PDF Generation Only

```bash
# Generate Resume.pdf to public/ directory
npm run generate-pdf
```

## Project Structure

```
nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Global styles
│   │   └── favicon.ico            # Site favicon
│   ├── components/
│   │   ├── Header.tsx             # Navigation + mobile menu
│   │   ├── Lead.tsx               # Hero section
│   │   ├── About.tsx              # About section
│   │   ├── Experience.tsx         # Work experience timeline
│   │   ├── Education.tsx          # Education history
│   │   ├── Projects.tsx           # Project showcase
│   │   ├── Skills.tsx             # Technical skills
│   │   ├── Volunteer.tsx          # Volunteer work
│   │   ├── Contact.tsx            # Contact section
│   │   ├── Footer.tsx             # Footer with social links
│   │   └── ScrollEffects.tsx      # Smooth scroll animations
│   └── styles/
│       └── styles.scss            # Main SCSS (from original portfolio)
├── public/
│   ├── Resume.pdf                 # Auto-generated resume
│   └── images/                    # Project images, assets
├── out/                           # Static build output (gitignored)
├── package.json                   # Dependencies & scripts
├── netlify.toml                   # Netlify deployment config
├── next.config.ts                 # Next.js configuration
└── tsconfig.json                  # TypeScript configuration
```

## Package Scripts

```json
{
  "scripts": {
    "generate-pdf": "node ../pdf/generate-resume.js --output public/Resume.pdf",
    "predev": "npm run generate-pdf",      // Auto-runs before dev
    "dev": "next dev --turbopack",         // Development server
    "prebuild": "npm run generate-pdf",    // Auto-runs before build
    "build": "next build --turbopack",     // Production build
    "start": "next start"                  // Start production server
  }
}
```

**How it works:**
- `predev` and `prebuild` are npm lifecycle hooks
- They automatically run `generate-pdf` before their respective commands
- No manual PDF generation needed!

## Data Source

All content comes from `../resume.json` at build time:

```json
{
  "basics": { ... },           // Name, title, contact, summary
  "work": {
    "jobs": [ ... ]            // Work experience
  },
  "education": {
    "schools": [ ... ]         // Education history
  },
  "skills": {
    "skills": [ ... ]          // Categorized technical skills
  },
  "volunteer": {
    "volunteer": [ ... ]       // Volunteer work
  },
  "projects": {
    "projects": [ ... ]        // Personal projects
  }
}
```

### Hidden Flags

Content can be hidden from the site using the `hidden` property:
- `"hidden": "all"` - Hidden everywhere (site + resume)
- `"hidden": "site"` - Hidden on website only
- No hidden property or `"hidden": "resume"` - Shown on site

## Development

### Adding a New Section

1. Create component in `src/components/NewSection.tsx`
2. Import and add to `src/app/page.tsx`
3. Add styling to `src/styles/styles.scss` if needed
4. Update `resume.json` with data for the section

### Updating Styles

Edit `src/styles/styles.scss` - it's compiled automatically by Next.js.

### Adding Images

Place images in `public/images/` and reference them as `/images/filename.png` in `resume.json`.

## Deploy to Netlify

### Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - **Base directory**: `nextjs`
   - **Build command**: `npm run build`
   - **Publish directory**: `nextjs/out`
6. Click "Deploy site"

Netlify will automatically deploy on every push to your main branch.

### Manual Deployment via CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from nextjs directory
cd nextjs
netlify deploy --prod
```

### Configuration

The `netlify.toml` file includes:
- Build command with PDF generation
- Publish directory: `out/`
- SPA fallback routing
- Separate configs for production, deploy-preview, and branch-deploy

## Build Output

The static site is exported to the `out/` directory and includes:
- All HTML pages (pre-rendered)
- CSS and JavaScript bundles
- Images and assets from `public/`
- Generated `Resume.pdf`

## Technologies

- **Next.js 15.5** - React framework with App Router
- **React 19.1** - UI library
- **TypeScript** - Type safety
- **Turbopack** - Fast dev bundler
- **SASS** - CSS preprocessing
- **PDFKit** - Resume PDF generation (via `../pdf/`)

## Environment Variables

No environment variables needed - this is a fully static site!

## Continuous Deployment

Once connected to GitHub, Netlify will:
- ✅ Deploy automatically on every push
- ✅ Create deploy previews for pull requests  
- ✅ Rebuild when `resume.json` changes
- ✅ Generate fresh PDF on every build

## License

See `../html/LICENSE.md` for license information.

---

**Built with ❤️ using Next.js**