# Automatic Publish Setup

This guide shows you how to set up **fully automatic** publishing:
- Click "Publish" in Sanity → Website updates automatically ✨

## How It Works

```
┌─────────────────────┐
│   You Click         │
│   "Publish" in      │
│   Sanity Studio     │
└──────────┬──────────┘
           │
           │ Webhook triggers immediately
           ▼
┌─────────────────────┐
│   Netlify Function  │
│   (Middleware)      │
└──────────┬──────────┘
           │
           │ Reformats request
           ▼
┌─────────────────────┐
│   GitHub Action     │
│   Starts            │
└──────────┬──────────┘
           │
           │ Syncs from Sanity
           ▼
┌─────────────────────┐
│   Commits           │
│   resume.json       │
└──────────┬──────────┘
           │
           │ Git push triggers
           ▼
┌─────────────────────┐
│   Netlify           │
│   Deploys Site      │
└─────────────────────┘
           │
           ▼
     ✅ LIVE! 🎉
```

## Step 1: Add Netlify Environment Variable

First, add your GitHub token to Netlify so the webhook function can trigger the GitHub Action:

1. Go to: https://app.netlify.com/sites/YOUR_SITE/configuration/env
2. Click **"Add a variable"**
3. Add:

**Key:** `GITHUB_TOKEN`

**Value:** Your GitHub token (the one starting with `github_pat_`)
- If you don't have it handy, get it from:
  ```bash
  cd nextjs
  grep GITHUB_TOKEN .env.local
  ```

4. Click **"Save"**

## Step 2: Add GitHub Secrets

Add the Sanity secrets to GitHub so the Action can sync:

1. Go to: https://github.com/Ecleptic/devportfolio/settings/secrets/actions
2. Click **"New repository secret"** for each:

### Required Secrets

**SANITY_PROJECT_ID**
- Value: `qet8gm0s`

**SANITY_API_TOKEN**
- Get this from your local environment:
  ```bash
  cd sanity-studio
  grep SANITY_API_TOKEN .env.local
  ```
- Copy the value after `SANITY_API_TOKEN=`

## Step 3: Deploy the Middleware Function

The middleware function is already in your repo at `netlify/functions/sanity-webhook.js`. 

To deploy it:

```bash
git add netlify/
git commit -m "Add Sanity webhook middleware function"
git push origin master
```

Once Netlify deploys, your function will be available at:
```
https://YOUR_SITE.netlify.app/.netlify/functions/sanity-webhook
```

## Step 4: Create Sanity Webhook

Now configure Sanity to trigger the workflow:

1. Go to: https://www.sanity.io/manage/project/qet8gm0s/api/webhooks
2. Click **"Create webhook"**
3. Fill in the form:

### Webhook Configuration

**Name:** `Auto-Deploy to Website`

**URL:** 
```
https://YOUR_SITE.netlify.app/.netlify/functions/sanity-webhook
```
(Replace `YOUR_SITE` with your actual Netlify site name)

**Dataset:** `production`

**Trigger on:**
- ❌ Create (uncheck - document already exists)
- ✅ **Update** (check - triggers when you publish changes)
- ❌ Delete (uncheck - don't trigger on deletion)

**Filter (GROQ):**
```groq
_type == "resume"
```
(This ensures it only triggers for resume document changes)

**HTTP method:** `POST`

**HTTP Headers:** *(Leave empty)*

**Projection:** *(Leave empty)*

**Secret:** Leave empty (not needed for this setup)

4. Click **"Save"**

## Step 5: Test It!

1. Go to Sanity Studio: https://camkgreen.sanity.studio/
2. Make a small edit (e.g., add a word to your summary)
3. Click **"Publish"** 🎉
4. Watch the magic:
   - Sanity sends webhook to your Netlify Function
   - Function triggers GitHub Action automatically
   - Action syncs and commits resume.json
   - Netlify detects the commit and deploys your site
5. Check progress at: https://github.com/Ecleptic/devportfolio/actions

The entire process takes about 2-3 minutes from publish to live site!

## Troubleshooting

### Webhook not triggering?
- Check the webhook logs in Sanity: https://www.sanity.io/manage/project/qet8gm0s/api/webhooks
- Check Netlify Function logs: https://app.netlify.com/sites/YOUR_SITE/logs/functions
- Verify the GITHUB_TOKEN is set in Netlify environment variables
- Make sure you selected "Update" as the trigger (not "Create")

### GitHub Action not starting?
- Check the Netlify Function logs for errors
- Verify your GitHub token has the correct permissions (Contents + Workflows)
- Make sure the GitHub secrets (SANITY_PROJECT_ID, SANITY_API_TOKEN) are set

### Action runs but no changes?
- Verify you clicked "Publish" (not just saved as draft)
- Check the GitHub Action logs for sync errors

### Changes not on website?
- Check Netlify deployment logs
- Verify the commit was pushed to master branch
- Make sure Netlify is configured to auto-deploy from master

## Manual Trigger (Backup)

If you need to manually sync without publishing in Sanity:

1. Go to: https://github.com/Ecleptic/devportfolio/actions/workflows/sync-from-sanity.yml
2. Click **"Run workflow"** → **"Run workflow"**

## Security Notes

- The GitHub token is stored securely in Netlify environment variables
- The Sanity API token is stored in GitHub Secrets
- All commits are signed by `github-actions[bot]`
- The middleware function only accepts POST requests
