# Deployment Model Status — 2026-04-04

## Canonical Model
- **Source of truth**: GitHub repo `https://github.com/chaser1-ops/STAARTEST`
- **Publish directory**: `site/` (configured in `netlify.toml`)
- **Target**: `https://staartest.netlify.app/`
- **Preferred method**: GitHub-backed continuous deployment
- **Fallback**: Manual drag-and-drop of `site/` folder to Netlify

## Current State
- GitHub repo: **Active and up to date** — all site files committed and pushed
- netlify.toml: **Configured** — `publish = "site"`
- Netlify site: **Exists** at staartest.netlify.app (previously deployed via manual upload)
- GitHub-Netlify link: **Needs operator action** to connect

## Exact Steps to Enable Continuous Deployment

### If the Netlify site is NOT yet linked to GitHub:
1. Log into [Netlify](https://app.netlify.com/)
2. Navigate to the **staartest** site
3. Go to **Site configuration** > **Build & deploy** > **Continuous deployment**
4. Click **Link site to Git**
5. Choose **GitHub** as the Git provider
6. Authorize Netlify to access the `chaser1-ops` GitHub account (if not already authorized)
7. Select the **STAARTEST** repository
8. Set build settings:
   - **Branch to deploy**: `main`
   - **Build command**: *(leave empty — static site, no build step)*
   - **Publish directory**: `site`
9. Click **Deploy site**
10. Every push to `main` will now auto-deploy

### If already linked:
- Verify in Netlify dashboard: Site configuration > Build & deploy > Repository
- Should show: `chaser1-ops/STAARTEST`, branch `main`, publish `site`
- Every `git push origin main` triggers auto-deploy within ~30 seconds

## Manual Deploy Fallback
If continuous deployment is not available or temporarily needed:
1. Clone or pull the latest from `https://github.com/chaser1-ops/STAARTEST`
2. Open Netlify dashboard > Deploys
3. Drag the `site/` folder into the deploy dropzone
4. Wait for deploy to complete (~10 seconds)

## What NOT to Do
- Don't create a new Netlify site — use the existing `staartest.netlify.app` site
- Don't set a build command — this is a static site with no build step
- Don't change the publish directory from `site`
- Don't touch other Netlify sites or teams
