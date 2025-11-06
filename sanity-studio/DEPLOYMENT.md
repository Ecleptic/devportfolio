# Sanity Studio Deployment Guide

This guide covers deploying your Sanity Studio with deploy preview support for testing changes (like the mobile UI improvements).

## Deployment Options

### Option 1: Netlify (Recommended for Deploy Previews) ✅

**Benefits:**
- ✅ Deploy previews for every PR
- ✅ Test mobile UI improvements before merging
- ✅ Custom domain support
- ✅ Free for open source projects
- ✅ Automatic deployments on push

**Setup Steps:**

1. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - **Important:** Set the base directory to `sanity-studio`
   - Netlify will auto-detect the build settings from `netlify.toml`

2. **Configure Environment Variables** (if needed)
   - In Netlify dashboard → Site settings → Environment variables
   - Add any custom environment variables (usually not needed for Sanity Studio)

3. **Enable Deploy Previews**
   - Go to Site settings → Build & deploy → Deploy contexts
   - Enable "Deploy previews" for all pull requests
   - Enable "Branch deploys" if you want (optional)

4. **Test Your Setup**
   - Create a PR with your mobile improvements
   - Netlify will automatically create a deploy preview
   - You'll get a unique URL like: `deploy-preview-123--your-studio.netlify.app`
   - Test the mobile UI on your phone!

### Option 2: Sanity's Built-in Hosting

**Benefits:**
- ✅ Free Sanity-hosted URL (`your-studio.sanity.studio`)
- ✅ Managed by Sanity
- ✅ Zero configuration
- ❌ No deploy previews

**Setup Steps:**

1. **Deploy to Sanity**
   ```bash
   cd sanity-studio
   npm run deploy
   ```

2. **Access Your Studio**
   - Your studio will be available at: `https://your-studio.sanity.studio`
   - The studio name is configured in `sanity.config.ts` (currently: "default")

3. **Update Your Studio**
   - Just run `npm run deploy` again whenever you want to update

**Note:** You already have a deployment ID configured (`socys80ej7o2iawhbv12lj70`), so Sanity knows where to deploy.

## Testing Mobile UI Improvements

### Using Netlify Deploy Previews (Recommended)

1. **Create/push your PR branch**
   ```bash
   git push -u origin claude/improve-sanity-mobile-ui-011CUoS9WBh4j3KV5hdnXVYE
   ```

2. **Check Netlify**
   - Wait for Netlify to build (usually 2-3 minutes)
   - Find the deploy preview URL in:
     - PR comments (Netlify bot)
     - Netlify dashboard
     - GitHub Checks tab

3. **Test on Mobile**
   - Open the preview URL on your phone/tablet
   - Test the mobile improvements:
     - ✅ Quick Edit menu navigation
     - ✅ Collapsible sections
     - ✅ Touch targets (44px minimum)
     - ✅ No unwanted zoom on inputs
     - ✅ Sticky headers
     - ✅ Portrait and landscape modes

4. **Share for Review**
   - Send the preview URL to team members
   - Everyone can test before merging!

### Using Local Testing

1. **Run locally**
   ```bash
   cd sanity-studio
   npm install
   npm run dev
   ```

2. **Access from mobile device**
   - Find your computer's local IP: `ifconfig` or `ipconfig`
   - Open `http://YOUR_IP:3333` on your phone
   - Make sure your phone is on the same network

3. **Test responsive design**
   - Use browser dev tools to simulate mobile
   - Chrome: DevTools → Toggle device toolbar (Cmd+Shift+M)
   - Test different screen sizes

## Multiple Environments

You can use Sanity datasets to test different environments:

```typescript
// sanity.config.ts
export default defineConfig({
  // ...
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
})
```

Then in Netlify:
- Production: `SANITY_STUDIO_DATASET=production`
- Preview: `SANITY_STUDIO_DATASET=preview`

## Continuous Deployment Workflow

### Recommended Git Workflow with Deploy Previews

1. **Create feature branch**
   ```bash
   git checkout -b feature/mobile-improvements
   ```

2. **Make changes and push**
   ```bash
   git add .
   git commit -m "feat: improve mobile UI"
   git push -u origin feature/mobile-improvements
   ```

3. **Create PR**
   - Netlify automatically creates deploy preview
   - Test on mobile devices using preview URL
   - Get feedback from team

4. **Merge when ready**
   - Once approved, merge to main
   - Production deployment happens automatically

## Troubleshooting

### Build Fails on Netlify

**Check Node version:**
```toml
[build.environment]
  NODE_VERSION = "20"
```

**Check build command:**
```bash
cd sanity-studio
npm install
npm run build
```

**Check base directory:**
- Should be `sanity-studio` in Netlify settings

### Deploy Preview Not Created

1. Check Netlify settings → Deploy contexts
2. Ensure "Deploy previews" is enabled
3. Check if PR is from a fork (deploy previews may be restricted)
4. Look for build logs in Netlify dashboard

### Mobile UI Not Working

1. Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear browser cache
3. Check browser console for errors
4. Ensure MobileLayout component is imported correctly

## Cost Considerations

- **Netlify:** Free for personal projects, includes deploy previews
- **Sanity Hosting:** Free, but no deploy previews
- **Sanity API:** Free tier includes 3 users, 100k API requests/month

## Next Steps

1. ✅ Set up Netlify for your Sanity Studio
2. ✅ Test the deploy preview with current PR
3. ✅ Verify mobile improvements on real devices
4. ✅ Merge and deploy to production
5. 📱 Share studio URL with your team!

## Resources

- [Sanity Deploy Docs](https://www.sanity.io/docs/deployment)
- [Netlify Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/)
- [Sanity + Netlify Guide](https://www.sanity.io/guides/deploying-sanity-studio-on-netlify)
