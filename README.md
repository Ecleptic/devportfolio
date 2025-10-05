# Cameron Green's Portfolio

Personal portfolio website with CMS-powered resume editing.

**Live Site:** [camerongreens.com](https://camerongreens.com)  
**Resume Editor:** [camkgreen.sanity.studio](https://camkgreen.sanity.studio)

## 🚀 Quick Start

### Local Development
```bash
# Start Next.js site
cd nextjs
npm install
npm run dev                    # http://localhost:3000

# Start Sanity Studio (optional)
cd sanity-studio
npm install
npm run dev                    # http://localhost:3333
```

### Edit Your Resume
**Option 1: Mobile/Web CMS**
1. Visit: https://camkgreen.sanity.studio/
2. Log in with GitHub/Google
3. Edit your content
4. Click "Publish"
5. Sync changes: `cd scripts && npm run sync-from-sanity`

**Option 2: Direct JSON Editing**
1. Edit `resume.json`
2. Optionally sync to Sanity: `cd scripts && npm run sync-to-sanity`

## 📂 Project Structure

```
devportfolio/
├── resume.json                    # Single source of truth
├── nextjs/                        # Next.js portfolio site
│   ├── src/
│   │   ├── app/                   # Pages & API routes
│   │   ├── components/            # React components
│   │   └── styles/                # SCSS styles
│   └── public/Resume.pdf          # Auto-generated PDF
├── sanity-studio/                 # Content Management System
│   ├── schemas/resume.ts          # Resume data structure
│   └── sanity.config.ts           # Studio configuration
├── scripts/                       # Sync utilities
│   ├── sync-json-to-sanity.js     # Import JSON → Sanity
│   └── sync-sanity-to-json.js     # Export Sanity → JSON
└── pdf/                           # PDF generator
    └── generate-resume.js         # Creates Resume.pdf
```

## 🎨 Features

### Portfolio Website (Next.js)
- **Next.js 15.5** with static generation
- **Automated PDF generation** on every build
- **Mobile-responsive** design
- **Data-driven** from `resume.json`
- **Deployed on Netlify** with auto-deployments

### Content Management (Sanity)
- **Mobile-optimized** editing interface
- **OAuth authentication** (GitHub/Google)
- **Bidirectional sync** with resume.json
- **Version control** via Git
- **Accessible anywhere** via https://camkgreen.sanity.studio/

### Resume PDF Generator
- **Automated** PDF creation from resume.json
- **Professional** single-page layout
- **Customizable** styling
- **CLI support** for manual generation

## 🔄 Workflows

### Update Resume (via CMS)
1. Edit in Sanity Studio
2. `cd scripts && npm run sync-from-sanity`
3. `git add resume.json && git commit -m "Update resume"`
4. `git push` (triggers Netlify deployment)

### Update Resume (via JSON)
1. Edit `resume.json` directly
2. (Optional) `cd scripts && npm run sync-to-sanity`
3. `git add resume.json && git commit -m "Update resume"`
4. `git push` (triggers Netlify deployment)

### Generate PDF Manually
```bash
cd pdf
node generate-resume.js --output /path/to/output.pdf
```

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, SCSS
- **CMS:** Sanity Studio with custom schema
- **PDF:** PDFKit with custom layout
- **Deployment:** Netlify (static export)
- **Version Control:** Git with automated sync

## 📚 Documentation

For detailed information about the Sanity CMS integration, see:
- **[COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md)** - Complete guide to the CMS system

## 🔐 Environment Variables

Required for full functionality:

**`nextjs/.env.local`:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=qet8gm0s
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WEBHOOK_SECRET=<your-secret>
GITHUB_TOKEN=<your-token>
GITHUB_REPO=Ecleptic/devportfolio
GITHUB_BRANCH=master
```

**`sanity-studio/.env.local`:**
```env
SANITY_STUDIO_PROJECT_ID=qet8gm0s
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=<your-token>
GITHUB_TOKEN=<your-token>
SANITY_WEBHOOK_SECRET=<your-secret>
```

## 📱 Mobile Editing

Add Sanity Studio to your phone:
1. Visit https://camkgreen.sanity.studio/ on your phone
2. Log in with GitHub or Google
3. Tap "Add to Home Screen" (iOS) or "Add to Home screen" (Android)
4. Edit resume anywhere!

## 🚢 Deployment

**Automatic:** Push to GitHub → Netlify builds and deploys  
**Manual:** `cd nextjs && npm run build` → Upload `out/` directory

## 📄 License

MIT License - See LICENSE.md

## 👤 Author

**Cameron Green**
- Website: https://camerongreens.com
- GitHub: [@Ecleptic](https://github.com/Ecleptic)
- LinkedIn: [cameron-k-green](https://www.linkedin.com/in/cameron-k-green/)
