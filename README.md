# Dev Portfolio Project

Personal portfolio website and resume generator for Cameron Green.

**Live Site:** [camerongreens.com](https://camerongreens.com)

## Project Structure

```
devportfolio/
├── resume.json                    # Single source of truth for all content
├── nextjs/                        # Modern Next.js portfolio (CURRENT)
│   ├── src/
│   │   ├── app/                   # Next.js App Router
│   │   ├── components/            # React components
│   │   └── styles/                # SCSS styles
│   ├── public/
│   │   └── Resume.pdf             # Auto-generated resume
│   ├── package.json               # Dependencies & build scripts
│   ├── netlify.toml               # Netlify deployment config
│   └── out/                       # Static build output
├── pdf/                           # Resume PDF generator
│   ├── generate-resume.js         # PDF generator script (PDFKit)
│   ├── package.json               # Generator dependencies
│   └── output/                    # Default output directory
│       └── Cameron_Green_Resume.pdf
└── html/                          # Original HTML portfolio (LEGACY)
    ├── index.html                 # Static HTML version
    ├── scss/styles.scss           # Source styles
    └── js/scripts.js              # Source JavaScript
```

## Quick Start

### Development (Local)

```bash
cd nextjs
npm install
npm run dev                        # Starts dev server at http://localhost:3000
                                   # Automatically generates Resume.pdf first
```

### Production Build

```bash
cd nextjs
npm run build                      # Generates static site in out/
                                   # Automatically generates Resume.pdf first
```

### PDF Generation Only

```bash
# Generate to default location (pdf/output/)
cd pdf
node generate-resume.js

# Generate to custom location
node generate-resume.js --output /path/to/output.pdf

# From Next.js directory (automatic in builds)
cd nextjs
npm run generate-pdf               # Outputs to public/Resume.pdf
```

## Components

### 1. Resume Data (`resume.json`)
**Single source of truth** containing:
- Basic information (name, email, website, summary)
- Work experience with highlights
- Education history
- Technical skills (categorized)
- Volunteer work
- Personal projects
- Social profiles (GitHub, LinkedIn)

**Hidden Flags**: Content with `"hidden": "all"` or `"hidden": "site"` is excluded from the website (but may appear in PDF).

### 2. Next.js Portfolio (`nextjs/`) - **CURRENT**
Modern, data-driven portfolio site:
- **Next.js 15.5** with App Router & TypeScript
- **Static Site Generation (SSG)** - Pre-rendered at build time
- **Data-driven** - All content from `resume.json`
- **Identical styling** - Same SCSS as original HTML portfolio
- **Automated PDF generation** - Runs automatically in builds
- **Deployed on Netlify** - Live at camerongreens.com

**Key Features:**
- React components for modularity
- Smooth scroll animations
- Mobile-responsive design
- Automatic PDF generation on build
- Zero runtime dependencies

### 3. PDF Resume Generator (`pdf/`)
Automated PDF generation using PDFKit:
- Reads from `resume.json`
- Professional single-page layout
- Customizable colors and styling
- **CLI support** - `--output` flag for custom paths
- Auto-creates directories as needed

### 4. HTML Portfolio (`html/`) - **LEGACY**
Original static HTML version:
- Gulp build system
- jQuery animations
- Manual content editing
- **Note:** Retained for reference, not actively maintained

## Workflow

### Update Your Resume & Portfolio

1. **Edit `resume.json`** with your latest information
2. **Build & Deploy:**
   ```bash
   cd nextjs
   npm run build                   # Generates PDF + builds site
   git add .
   git commit -m "Update resume"
   git push                        # Netlify auto-deploys
   ```

### Local Development

```bash
cd nextjs
npm run dev                        # Auto-generates PDF, starts dev server
# Visit http://localhost:3000
# Resume available at http://localhost:3000/Resume.pdf
```

### Automated Builds

The `prebuild` and `predev` npm hooks automatically generate the PDF before building or starting the dev server. No manual steps needed!

## Deployment

### Netlify (Current)

The site is deployed to [camerongreens.com](https://camerongreens.com) via Netlify.

**Automatic Deployment:**
- Push to GitHub triggers automatic build
- PDF is generated during build process
- Static site deployed from `nextjs/out/`

**Manual Deployment:**
```bash
cd nextjs
npm run build                      # Builds to out/
netlify deploy --prod              # Deploy to production
```

**Configuration:**
- Base directory: `nextjs`
- Build command: `npm run build` (includes PDF generation via prebuild hook)
- Publish directory: `nextjs/out`

## Package Scripts

### Next.js (`nextjs/package.json`)

```json
{
  "scripts": {
    "generate-pdf": "node ../pdf/generate-resume.js --output public/Resume.pdf",
    "predev": "npm run generate-pdf",      // Runs before dev
    "dev": "next dev --turbopack",
    "prebuild": "npm run generate-pdf",    // Runs before build
    "build": "next build --turbopack",
    "start": "next start"
  }
}
```

### PDF Generator (`pdf/package.json`)

```json
{
  "scripts": {
    "generate": "node generate-resume.js"  // Outputs to pdf/output/
  }
}
```

## Features

### Next.js Portfolio
- ✅ Static Site Generation (SSG)
- ✅ Data-driven from `resume.json`
- ✅ Responsive design (mobile-first)
- ✅ Smooth scroll animations
- ✅ Timeline experience section
- ✅ Project showcase with dynamic images
- ✅ Categorized skills display
- ✅ Volunteer section
- ✅ Contact section with social links
- ✅ Automatic PDF generation
- ✅ SEO-friendly meta tags
- ✅ Modern color functions (no Sass deprecations)
- ✅ Consistent drop shadows across all cards

### PDF Resume Generator
- ✅ Professional single-page layout
- ✅ Split-color name styling (Cameron in blue, Green in green)
- ✅ Auto-formatted dates and bullets
- ✅ Customizable colors matching portfolio
- ✅ CLI support with `--output` flag
- ✅ Smart path resolution
- ✅ Auto-creates output directories
- ✅ PDF metadata for searchability

## Technologies

- **Next.js 15.5** - React framework with SSG
- **TypeScript** - Type safety
- **Turbopack** - Fast bundler
- **SASS/SCSS** - CSS preprocessing
- **PDFKit** - PDF generation
- **Netlify** - Hosting and continuous deployment
- **GitHub** - Version control and CI/CD

## Documentation

- `nextjs/README.md` - Next.js portfolio documentation
- `pdf/RESUME_GENERATOR.md` - PDF generator documentation
- `html/README.md` - Legacy HTML portfolio documentation

## License

See `html/LICENSE.md` for license information.

---

**Made with ❤️ by Cameron Green**

## Technologies

**Portfolio:**
- HTML5, CSS3/SCSS, JavaScript
- Bootstrap Grid
- Font Awesome
- Gulp, Babel, Sass

**Resume Generator:**
- Node.js
- PDFKit
- JSON-based data structure

## Documentation

- `html/README.md` - Portfolio website documentation
- `pdf/RESUME_GENERATOR.md` - Resume generator documentation
- `pdf/.github/pdfkit-api-reference.md` - PDFKit API reference
- `.github/copilot-instructions.md` - Portfolio design system reference

## Author

**Cameron Green**
- Website: [camerongreens.com](https://camerongreens.com)
- GitHub: [@Ecleptic](https://github.com/Ecleptic)
- LinkedIn: [cameron-k-green](https://www.linkedin.com/in/cameron-k-green/)

## License

MIT
