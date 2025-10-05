# Quick Reference: Resume Editing Workflow

## 🎯 Daily Usage

### Option 1: Edit from Mobile (after Phase 3 complete)
1. Visit your deployed Sanity Studio URL (will be like `https://resume-cms.sanity.studio`)
2. Log in with GitHub or Google
3. Edit your resume sections
4. Hit "Publish"
5. Webhook automatically:
   - Updates resume.json
   - Commits to GitHub
   - Triggers Netlify deployment
   - Your site updates in ~2 minutes

### Option 2: Edit JSON Directly (available now)
1. Edit `resume.json` in your code editor
2. Commit and push to GitHub
3. Manually sync to Sanity (optional):
   ```bash
   cd scripts
   npm run sync-to-sanity
   ```

## 🛠️ Development Commands

### Start Sanity Studio (Local)
```bash
cd sanity-studio
npm run dev
# Opens at http://localhost:3333
```

### Sync Commands
```bash
cd scripts

# Import JSON to Sanity
npm run sync-to-sanity

# Export Sanity to JSON
npm run sync-from-sanity
```

### Deploy Studio (for mobile access)
```bash
cd sanity-studio
npm run deploy
# Choose a hostname like: resume-cms
# Studio will be available at: https://resume-cms.sanity.studio
```

## 📝 Common Editing Tasks

### Update Your Professional Summary
**Sanity Studio:**
- Navigate to "Basic Information" tab
- Find "Professional Summary" field
- Edit and save

**JSON:**
- Edit `basics.summary` in resume.json

### Add a New Job
**Sanity Studio:**
- Go to "Work Experience"
- Click "Add item" in Jobs section
- Fill in: Company, Position, Dates, Summary, Highlights
- Set visibility if needed

**JSON:**
- Add object to `work.jobs[]` array

### Add a New Project
**Sanity Studio:**
- Go to "Projects"
- Click "Add item" in Project List
- Fill in: Name, Description, Highlights, Links, Image
- Set visibility

**JSON:**
- Add object to `projects.projects[]` array

### Update Skills
**Sanity Studio:**
- Go to "Skills"
- Expand skill categories
- Add/remove/edit skills

**JSON:**
- Edit `skills.skills[]` array

## 🔄 Sync Workflow Examples

### Scenario 1: Made changes in Sanity Studio
```bash
cd scripts
npm run sync-from-sanity
git diff resume.json          # Review changes
git add resume.json
git commit -m "Update resume from Sanity"
git push                      # Triggers Netlify deployment
```

### Scenario 2: Made changes in resume.json
```bash
git add resume.json
git commit -m "Update job description"
git push

# Optional: sync to Sanity for mobile editing
cd scripts
npm run sync-to-sanity
```

## 🚨 Troubleshooting

### Sanity Studio won't start
```bash
cd sanity-studio
rm -rf node_modules .sanity
npm install
npm run dev
```

### Sync script fails with "401 Unauthorized"
- Check `SANITY_API_TOKEN` in `sanity-studio/.env.local`
- Regenerate token at: https://www.sanity.io/manage/project/qet8gm0s/api
- Ensure token has "Editor" permissions

### Changes not appearing on site
1. Check Netlify deployment status
2. Clear browser cache
3. Verify resume.json was committed to Git
4. Check for build errors in Netlify dashboard

### Studio shows old data
```bash
# Re-sync from JSON
cd scripts
npm run sync-to-sanity
```

## 📱 Mobile Editing Tips

Once Studio is deployed:
1. **Bookmark the Studio URL** on your phone's home screen
2. **Stay logged in** - OAuth tokens last for weeks
3. **Use Publish button** - saves and triggers deployment
4. **Drafts auto-save** - your work is never lost
5. **Preview changes** - use the Vision plugin to query data

## 🔒 Security Reminders

- ✅ Never commit `.env.local` to Git
- ✅ Rotate API tokens every 6-12 months
- ✅ Use separate tokens for dev and production
- ✅ Studio is only accessible to authenticated users
- ✅ All webhooks are signature-verified (Phase 3)

## 🎨 Customization

### Hide sections from resume/portfolio
Use the "Visibility" field:
- **Visible:** Shows everywhere
- **Resume Only:** Only in PDF resume
- **Hide All:** Hidden from all views

### Change site metadata (SEO)
Edit the "Site Metadata" section:
- Page title
- Description
- Keywords
- Social media settings

## 📊 Monitoring

### Check Sanity usage
https://www.sanity.io/manage/project/qet8gm0s/usage

### Check Netlify deployments
Your Netlify dashboard (linked to GitHub repo)

### View GitHub commits
https://github.com/Ecleptic/devportfolio/commits/master

---

**Studio (Local):** http://localhost:3333
**Studio (Deployed):** Will be set up in Phase 3
**Management Console:** https://www.sanity.io/manage/project/qet8gm0s
