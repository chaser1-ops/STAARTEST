# staartest.app Cutover Checklist

## Overview
Move the public-facing STAAR Power Portal from staartest.netlify.app to staartest.app as the canonical student/parent/school URL.

## Pre-Cutover (Preparation)
- [x] Site is live and stable on staartest.netlify.app
- [x] GitHub continuous deployment active
- [x] staartest.app domain secured
- [x] DNS provider identified (GoDaddy or registrar where domain was purchased)
- [ ] Confirm staartest.app DNS is accessible/manageable

## Cutover Steps (Operator Action Required)

### Step 1: Add Domain in Netlify
1. Go to https://app.netlify.com/projects/staartest/domain-management
2. Click "Add a domain"
3. Type: `staartest.app`
4. Netlify will provide DNS verification instructions

### Step 2: Configure DNS Records
In GoDaddy (or your DNS provider for staartest.app):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 75.2.60.5 | 1 Hour |
| CNAME | www | staartest.netlify.app. | 1 Hour |

### Step 3: Wait for Propagation
- DNS changes take 5-30 minutes (sometimes up to 48 hours)
- Check with: `dig staartest.app` or visit the URL

### Step 4: SSL Certificate
- Netlify auto-provisions a free Let's Encrypt SSL certificate
- May take a few minutes after DNS propagation
- Both http:// and https:// will work (Netlify forces HTTPS)

### Step 5: Verify
- Visit https://staartest.app — should show the STAAR Power Portal
- Visit https://www.staartest.app — should also work
- Test on mobile
- Check all grade pages load correctly

## Post-Cutover
- staartest.netlify.app continues to work (Netlify keeps it active)
- Update any marketing materials, school flyers, or communications to use staartest.app
- Update README and public-facing docs with the new URL
- No code changes needed — the site is the same regardless of domain

## Rollback
If anything goes wrong:
- Remove the custom domain from Netlify
- Revert DNS changes in GoDaddy
- staartest.netlify.app remains live as fallback
