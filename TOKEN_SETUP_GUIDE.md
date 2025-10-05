# Sanity API Token Setup

To use the sync scripts, you need to generate an API token with write permissions.

## Steps to Generate Token:

1. **Visit Sanity Management Console:**
   https://www.sanity.io/manage/project/qet8gm0s/api

2. **Navigate to API section:**
   - Click on "Tokens" tab
   - Click "Add API Token" button

3. **Create Token:**
   - **Name:** `Resume Sync Scripts` (or any descriptive name)
   - **Permissions:** Select "Editor" (allows read and write)
   - Click "Create"

4. **Copy the Token:**
   - ⚠️ **Important:** Copy the token immediately - it won't be shown again!
   - The token will look like: `skAbCd1234...`

5. **Add to Environment File:**
   Edit `sanity-studio/.env.local` and add:
   ```
   SANITY_API_TOKEN=skYourTokenHere
   ```

## Test the Sync

Once you've added the token, test the sync:

```bash
# Import your resume.json into Sanity
cd scripts
npm run sync-to-sanity

# This will create a document in Sanity with all your resume data
```

## GitHub Token Setup (for automated commits)

You'll also need a GitHub Personal Access Token for Phase 3 (webhook automation):

1. Visit: https://github.com/settings/tokens?type=beta
2. Click "Generate new token" (Fine-grained)
3. Configure:
   - **Name:** `Sanity Resume Sync`
   - **Expiration:** 1 year (or custom)
   - **Repository access:** Only select repositories → `Ecleptic/devportfolio`
   - **Permissions:**
     - Repository permissions:
       - **Contents:** Read and write
       - **Metadata:** Read-only (auto-selected)
4. Generate and copy the token
5. Add to `sanity-studio/.env.local`:
   ```
   GITHUB_TOKEN=github_pat_YourTokenHere
   ```

## Security Notes

- ✅ `.env.local` is in `.gitignore` - your tokens are safe
- ✅ Never commit tokens to Git
- ✅ Use separate tokens for development and production
- ✅ Rotate tokens periodically for security

## Current Status

Your `.env.local` should have:
```env
SANITY_STUDIO_PROJECT_ID=qet8gm0s
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=          # ← ADD THIS
GITHUB_TOKEN=              # ← ADD THIS (for Phase 3)
GITHUB_REPO=Ecleptic/devportfolio
GITHUB_OWNER=Ecleptic
GITHUB_BRANCH=master
```
