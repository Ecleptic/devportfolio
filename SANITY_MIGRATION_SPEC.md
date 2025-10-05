# Sanity CMS Integration Specification

## Overview
Convert the current resume.json-based portfolio system to include Sanity Studio for mobile editing while maintaining the JSON file as the single source of truth.

## Current State Analysis

### Existing Architecture
- **Frontend**: Next.js 15.5.4 with static export
- **Data Source**: `resume.json` file in project root
- **Deployment**: Netlify with automated PDF generation
- **Styling**: SCSS with optimized build pipeline
- **Content Structure**: Structured JSON with metadata, work experience, projects, skills

### Current Workflow
1. Edit `resume.json` manually in code editor
2. Commit changes to GitHub (master branch)
3. Netlify auto-deploys on push
4. PDF generation runs automatically
5. Site rebuilds with new content

## Target Architecture

### New System Components
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   resume.json   │◄──►│   Sanity CMS    │◄──►│  Mobile Editing │
│ (Source Truth)  │    │   (Interface)   │    │   (Studio)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                       │
        ▼                        ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Next.js Application                          │
│              (No changes to existing code)                     │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Netlify Deployment                              │
│            (Enhanced with webhooks)                            │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture
```
Manual JSON Edit ──────────► JSON File ◄────────── Sanity Webhook
       │                         │                        │
       ▼                         ▼                        ▼
   Git Commit ──────────► Netlify Deploy ◄──── GitHub API Commit
       │                         │                        │
       ▼                         ▼                        ▼
   Site Rebuild ◄────────── Site Rebuild ◄──── Site Rebuild
```

## Technical Requirements

### New Dependencies
```json
// package.json additions
{
  "dependencies": {
    "@sanity/client": "^6.x.x",
    "@sanity/webhook": "^4.x.x"
  },
  "devDependencies": {
    "@sanity/cli": "^3.x.x"
  }
}
```

### Environment Variables
```bash
# Sanity Configuration
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
SANITY_WEBHOOK_SECRET=your-webhook-secret

# GitHub Integration
GITHUB_TOKEN=your-github-token
GITHUB_REPO=Ecleptic/devportfolio

# Security
WEBHOOK_SECRET=your-secure-webhook-secret
```

### New File Structure
```
devportfolio/
├── resume.json                    # (existing - remains source of truth)
├── sanity-studio/                 # (new - Sanity Studio)
│   ├── sanity.config.ts
│   ├── package.json
│   └── schemas/
│       └── resume.ts
├── scripts/                       # (new - sync scripts)
│   ├── sync-json-to-sanity.js
│   ├── sync-sanity-to-json.js
│   └── sanity-client.js
├── nextjs/                        # (existing - minimal changes)
│   └── src/
│       └── app/
│           └── api/
│               └── sanity-webhook/  # (new - webhook handler)
│                   └── route.ts
└── SANITY_MIGRATION_SPEC.md       # (this document)
```

## Implementation Phases

### Phase 1: Sanity Setup (1-2 hours)
**Deliverables:**
- [ ] Create Sanity project
- [ ] Configure Sanity Studio
- [ ] Create resume schema matching JSON structure
- [ ] Deploy Sanity Studio to sanity.studio
- [ ] Test authentication and mobile access

**Files Created:**
- `sanity-studio/` directory with full configuration
- `scripts/sanity-client.js` - Sanity connection utility

### Phase 2: Bidirectional Sync Scripts (2-3 hours)
**Deliverables:**
- [ ] JSON → Sanity sync script
- [ ] Sanity → JSON sync script
- [ ] Initial data import to Sanity
- [ ] Package.json script integration

**Files Created:**
- `scripts/sync-json-to-sanity.js`
- `scripts/sync-sanity-to-json.js`
- Updated `package.json` with sync commands

### Phase 3: Webhook Integration (1-2 hours)
**Deliverables:**
- [ ] Sanity webhook endpoint in Next.js
- [ ] GitHub API integration for auto-commits
- [ ] Webhook security validation
- [ ] Sanity webhook configuration

**Files Created:**
- `nextjs/src/app/api/sanity-webhook/route.ts`
- Sanity webhook configuration

### Phase 4: Testing & Validation (1 hour)
**Deliverables:**
- [ ] Test JSON → Sanity sync
- [ ] Test Sanity → JSON sync
- [ ] Test mobile editing workflow
- [ ] Test automatic deployment pipeline
- [ ] Verify data integrity

### Phase 5: Documentation & Training (30 minutes)
**Deliverables:**
- [ ] Update README with new workflows
- [ ] Document mobile editing process
- [ ] Create troubleshooting guide

## Security Considerations

### Sanity Studio Security
- **Authentication**: Google/GitHub OAuth (no custom passwords)
- **Access Control**: Email-based user restrictions
- **HTTPS**: Automatic SSL on sanity.studio domain
- **API Tokens**: Read/write tokens with scope limitations

### Webhook Security
- **Signature Validation**: HMAC SHA-256 webhook signatures
- **IP Whitelist**: Restrict to Sanity IP ranges (optional)
- **Rate Limiting**: Prevent webhook spam
- **Environment Variables**: All secrets in secure env vars

### GitHub Integration
- **Fine-grained PAT**: Repository-scoped GitHub token
- **Commit Attribution**: Automated commits clearly marked
- **Branch Protection**: Optional - require reviews for manual JSON edits

## Workflows

### Workflow A: Manual JSON Editing (Existing - Enhanced)
1. Edit `resume.json` in code editor
2. Run `npm run sync:json-to-sanity` (optional - happens on build)
3. Commit and push to GitHub
4. Netlify auto-deploys
5. Sanity CMS stays in sync

### Workflow B: Mobile Editing via Sanity (New)
1. Access Sanity Studio on mobile: `https://yourproject.sanity.studio`
2. Authenticate with Google/GitHub
3. Edit resume content in mobile-optimized interface
4. Save changes in Sanity
5. **Automatic process:**
   - Sanity webhook fires
   - Next.js API receives webhook
   - Sync script updates `resume.json`
   - GitHub API commits changes
   - Netlify auto-deploys
   - Site rebuilds with new content

### Emergency Workflow: Rollback
1. Revert GitHub commit to previous JSON state
2. Run `npm run sync:json-to-sanity` to restore Sanity
3. Site auto-redeploys with reverted content

## Data Schema Mapping

### resume.json Structure → Sanity Schema
```typescript
// Sanity schema will mirror JSON structure exactly
{
  metadata: {
    title: string,
    description: text,
    keywords: array<string>,
    siteUrl: url,
    siteName: string,
    locale: string
  },
  basics: {
    name: string,
    label: string,
    email: email,
    website: url,
    summary: text,
    profiles: array<{network, username, url}>
  },
  work: {
    hidden: string,
    jobs: array<{company, position, startDate, endDate, summary, highlights, hidden?}>
  },
  // ... etc matching exact JSON structure
}
```

## Testing Strategy

### Unit Tests
- [ ] Sync script functionality
- [ ] JSON validation after sync
- [ ] Webhook signature validation

### Integration Tests
- [ ] End-to-end Sanity → GitHub → Netlify flow
- [ ] JSON → Sanity sync accuracy
- [ ] Mobile Studio functionality

### Performance Tests
- [ ] Webhook response time
- [ ] Build time impact
- [ ] Mobile Studio loading speed

## Success Criteria

### Functional Requirements
- ✅ JSON file remains single source of truth
- ✅ Mobile editing works seamlessly
- ✅ Automatic GitHub commits from Sanity
- ✅ No breaking changes to existing site
- ✅ Bidirectional sync maintains data integrity

### Performance Requirements
- ✅ Webhook response < 5 seconds
- ✅ Mobile Studio loads < 3 seconds
- ✅ No impact on site build time
- ✅ Sync operations complete < 10 seconds

### Security Requirements
- ✅ Only authorized user can access Studio
- ✅ Webhook signatures validated
- ✅ GitHub commits properly attributed
- ✅ No sensitive data exposed

## Risk Mitigation

### Risk: Data Loss During Sync
**Mitigation**: 
- Backup JSON before each sync
- Git history provides rollback capability
- Sanity maintains version history

### Risk: Webhook Failure
**Mitigation**: 
- Manual sync commands available
- Webhook retry logic
- Monitoring and alerts

### Risk: Authentication Issues
**Mitigation**: 
- Multiple OAuth providers
- Clear documentation for access recovery
- Admin override capabilities

## Timeline

### Estimated Total Time: 6-8 hours
- **Phase 1**: 1-2 hours (Sanity setup)
- **Phase 2**: 2-3 hours (Sync scripts)
- **Phase 3**: 1-2 hours (Webhooks)
- **Phase 4**: 1 hour (Testing)
- **Phase 5**: 30 minutes (Documentation)

### Suggested Schedule
- **Session 1**: Phases 1-2 (Sanity setup + sync scripts)
- **Session 2**: Phases 3-5 (Webhooks + testing + docs)

## Post-Implementation

### Monitoring
- [ ] Set up webhook failure alerts
- [ ] Monitor sync operation success rates
- [ ] Track mobile editing usage

### Maintenance
- [ ] Regular Sanity API token rotation
- [ ] Dependency updates
- [ ] Backup verification

### Future Enhancements
- [ ] Real-time preview in Sanity
- [ ] Advanced validation rules
- [ ] Content publishing workflows
- [ ] Image upload capabilities

---

## Approval Checklist

Before proceeding with implementation, confirm:
- [ ] Understanding of bidirectional sync approach
- [ ] Comfort with Sanity Studio for mobile editing
- [ ] Agreement on security measures
- [ ] Timeline and resource allocation
- [ ] Rollback strategy acceptance
- [ ] Success criteria alignment

**Next Steps**: Upon approval, begin Phase 1 (Sanity Setup)