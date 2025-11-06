# Resume Portfolio CMS

This directory contains the Sanity Studio for managing your portfolio content via mobile or web.

## ✨ New: Mobile-Optimized UI

This studio now includes comprehensive mobile improvements:
- 📱 Touch-friendly navigation with Quick Edit menu
- 🎯 44px minimum touch targets for easy tapping
- 📂 Collapsible sections to reduce scrolling
- 🚀 Optimized for iOS and Android devices
- 📋 See [MOBILE_IMPROVEMENTS.md](./MOBILE_IMPROVEMENTS.md) for details
- 🚢 See [DEPLOYMENT.md](./DEPLOYMENT.md) for deploy preview testing

## Setup Instructions

### 1. Login to Sanity (IN PROGRESS)
```bash
cd sanity-studio
npx sanity login
```
Complete the GitHub authentication in your browser.

### 2. Initialize Sanity Project
After logging in, create a new Sanity project:
```bash
npx sanity init --project-plan free --create-project "Resume Portfolio CMS" --dataset production
```

This will:
- Create a new Sanity project
- Generate a project ID
- Set up the production dataset

### 3. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your values:
- `SANITY_STUDIO_PROJECT_ID`: From the init command output
- `SANITY_STUDIO_DATASET`: `production` (default)
- `SANITY_API_TOKEN`: Generate in https://sanity.io/manage → Your Project → API → Tokens (needs "Editor" permission)
- `SANITY_WEBHOOK_SECRET`: Generate a random string (e.g., `openssl rand -hex 32`)
- `GITHUB_TOKEN`: Create a fine-grained Personal Access Token with:
  - Repository: `Ecleptic/devportfolio`
  - Permissions: `Contents: Read and Write`
- `WEBHOOK_SECRET`: Another random string for webhook validation

### 4. Start Sanity Studio
```bash
npm run dev
```

This starts Sanity Studio at http://localhost:3333

### 5. Deploy Sanity Studio (for mobile access)

**Option A: Sanity Hosting (Quick & Easy)**
```bash
npm run deploy
```
Choose a hostname (e.g., `resume-cms`) and it will be available at:
`https://resume-cms.sanity.studio`

**Option B: Netlify (Recommended for Deploy Previews)**
- Follow the detailed guide in [DEPLOYMENT.md](./DEPLOYMENT.md)
- Get deploy previews for every PR
- Test mobile improvements before merging
- Free for open source projects

### 6. Initial Data Import
After setting up environment variables, run the import script from the project root:
```bash
cd ..
node scripts/sync-json-to-sanity.js
```

## File Structure
```
sanity-studio/
├── package.json                # Sanity dependencies
├── sanity.config.ts            # Sanity Studio configuration
├── sanity.cli.ts               # CLI configuration
├── tsconfig.json               # TypeScript config
├── netlify.toml                # Netlify deployment config (NEW)
├── .env.example                # Environment variable template
├── .env.local                  # Your actual credentials (gitignored)
├── .gitignore                  # Ignore sensitive files
├── components/                 # Custom React components (NEW)
│   └── MobileLayout.tsx        # Mobile-friendly layout wrapper
├── structure/                  # Studio structure (NEW)
│   └── mobile.ts               # Mobile-optimized navigation
├── schemas/
│   └── resume.ts               # Resume data schema
├── MOBILE_IMPROVEMENTS.md      # Mobile UI documentation (NEW)
└── DEPLOYMENT.md               # Deployment guide (NEW)
```

## Features
- **Mobile-Optimized**: Edit your resume from your phone
- **OAuth Authentication**: Secure login via GitHub or Google
- **Bidirectional Sync**: Changes in Sanity → JSON → Git → Netlify deploy
- **Single Source of Truth**: resume.json remains the master data file
- **Version Control**: All changes committed to GitHub with automatic deployment

## Testing Mobile Improvements

### Deploy Preview Testing (Recommended)
1. Set up Netlify following [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Create a PR with your changes
3. Netlify automatically creates a deploy preview
4. Test on your phone using the preview URL
5. Share with team for feedback before merging

### Local Mobile Testing
1. Start dev server: `npm run dev`
2. Find your local IP: `ifconfig` or `ipconfig`
3. Open `http://YOUR_IP:3333` on your mobile device
4. Ensure both devices are on the same network

## Documentation

- **[MOBILE_IMPROVEMENTS.md](./MOBILE_IMPROVEMENTS.md)** - Details on mobile UI enhancements
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy previews, Netlify setup, testing workflows

## Next Steps
1. Complete Sanity login
2. Run `npx sanity init` to get your project ID
3. Configure environment variables
4. Import existing data
5. Deploy Studio (Sanity hosting or Netlify)
6. Set up deploy previews on Netlify (optional but recommended)
7. Set up webhook in Sanity dashboard (see main SANITY_MIGRATION_SPEC.md)
