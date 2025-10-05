# Phase 3: Webhook Integration Setup

## 🎯 What This Does

When you edit your resume in Sanity Studio (on mobile or desktop), the webhook will:
1. Detect the change in Sanity
2. Fetch the updated data
3. Update `resume.json` in GitHub
4. Commit the changes automatically
5. Trigger Netlify deployment
6. Your site updates in ~2 minutes!

## 📋 Step-by-Step Setup

### Step 1: Generate Secrets

We need two secrets:

**1. Webhook Secret (for Sanity → Next.js security):**
Already generated: `02df1a5751e0607e6b6aae5c0c09b18a3806a00662e6fc125cb334667248ac81`

**2. GitHub Personal Access Token:**
Visit: https://github.com/settings/tokens?type=beta

- Click "Generate new token" (Fine-grained)
- **Name:** `Sanity Resume Sync`
- **Expiration:** 1 year
- **Repository access:** Only select repositories → `Ecleptic/devportfolio`
- **Repository permissions:**
  - **Contents:** Read and write ✅
  - **Metadata:** Read-only (auto-selected) ✅
- Generate and copy the token (starts with `github_pat_`)

### Step 2: Add Secrets to Environment Files

**Local Development (`nextjs/.env.local`):**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=qet8gm0s
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WEBHOOK_SECRET=02df1a5751e0607e6b6aae5c0c09b18a3806a00662e6fc125cb334667248ac81
GITHUB_TOKEN=github_pat_YourTokenHere
GITHUB_REPO=Ecleptic/devportfolio
GITHUB_BRANCH=master
```

**Also add to (`sanity-studio/.env.local`):**
```env
# Add these lines to your existing file:
SANITY_WEBHOOK_SECRET=02df1a5751e0607e6b6aae5c0c09b18a3806a00662e6fc125cb334667248ac81
```

### Step 3: Test the Webhook Locally

**Start Next.js:**
```bash
cd nextjs
npm run dev
```

**Test the endpoint:**
```bash
curl http://localhost:3000/api/sanity-webhook
```

Should return:
```json
{
  "status": "ok",
  "message": "Sanity webhook endpoint is running",
  "configured": {
    "webhookSecret": true,
    "githubToken": true,
    "githubRepo": "Ecleptic/devportfolio",
    "githubBranch": "master"
  }
}
```

### Step 4: Deploy to Production

**1. Add environment variables to Netlify:**

Visit your Netlify site settings:
- Go to: Site settings → Environment variables
- Add each variable:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = qet8gm0s
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_WEBHOOK_SECRET = 02df1a5751e0607e6b6aae5c0c09b18a3806a00662e6fc125cb334667248ac81
GITHUB_TOKEN = github_pat_YourTokenHere
GITHUB_REPO = Ecleptic/devportfolio
GITHUB_BRANCH = master
```

**2. Deploy the changes:**
```bash
git add .
git commit -m "Add Sanity webhook integration"
git push
```

Wait for Netlify to deploy.

### Step 5: Configure Webhook in Sanity

**1. Get your production webhook URL:**
```
https://your-site.netlify.app/api/sanity-webhook
```

**2. Add webhook in Sanity dashboard:**
- Visit: https://www.sanity.io/manage/project/qet8gm0s/api/webhooks
- Click "Create webhook"
- **Name:** `Resume Update Webhook`
- **URL:** `https://your-site.netlify.app/api/sanity-webhook`
- **Dataset:** `production`
- **Trigger on:** `Create`, `Update`, `Delete`
- **Filter:** `_type == "resume"` (optional - only trigger for resume document)
- **Secret:** `02df1a5751e0607e6b6aae5c0c09b18a3806a00662e6fc125cb334667248ac81`
- **HTTP method:** `POST`
- Save webhook

### Step 6: Deploy Sanity Studio

Make your Studio accessible from mobile:

```bash
cd sanity-studio
npm run deploy
```

- Choose a hostname: `resume-cms` (or any name you want)
- Your Studio will be available at: `https://resume-cms.sanity.studio`
- Bookmark this on your phone!

## ✅ Testing the Full Workflow

**1. Edit in Sanity Studio:**
- Visit http://localhost:3333 or https://resume-cms.sanity.studio
- Edit something (e.g., your summary)
- Click "Publish"

**2. Check the webhook:**
- Look at Netlify function logs
- Should see: "Resume updated and committed to GitHub"

**3. Verify GitHub:**
- Check: https://github.com/Ecleptic/devportfolio/commits/master
- Should see: "Update resume from Sanity Studio"

**4. Wait for deployment:**
- Netlify will auto-deploy in ~2 minutes
- Your site will show the updated content

## 🔍 Troubleshooting

### Webhook not triggering:
```bash
# Check Sanity webhook logs
Visit: https://www.sanity.io/manage/project/qet8gm0s/api/webhooks
Click on your webhook → View delivery history
```

### GitHub commit fails:
- Verify `GITHUB_TOKEN` has Contents: Write permission
- Check token hasn't expired
- Ensure repository name is correct

### Local testing:
```bash
# Test with a mock webhook
curl -X POST http://localhost:3000/api/sanity-webhook \
  -H "Content-Type: application/json" \
  -H "sanity-webhook-signature: sha256:$(echo -n '{}' | openssl dgst -sha256 -hmac '02df1a5751e0607e6b6aae5c0c09b18a3806a00662e6fc125cb334667248ac81' | cut -d' ' -f2)" \
  -d '{}'
```

## 🎉 Success!

Once everything is set up:
1. ✅ Edit resume from phone via Sanity Studio
2. ✅ Changes auto-commit to GitHub
3. ✅ Netlify auto-deploys
4. ✅ Site updates in minutes
5. ✅ `resume.json` stays as single source of truth

## 📱 Mobile Editing

**Bookmark on phone:**
1. Visit `https://resume-cms.sanity.studio` on phone
2. Log in with GitHub/Google
3. Add to Home Screen
4. Edit anytime, anywhere!

---

**Generated Webhook Secret:** `02df1a5751e0607e6b6aae5c0c09b18a3806a00662e6fc125cb334667248ac81`

**Next Steps:**
1. Generate GitHub token
2. Add secrets to `.env.local` files
3. Test locally
4. Deploy to Netlify
5. Configure Sanity webhook
6. Deploy Sanity Studio
