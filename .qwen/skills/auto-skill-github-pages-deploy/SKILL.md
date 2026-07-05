---
name: github-pages-deploy
description: Deploy Vite React app to GitHub Pages and troubleshoot deployment failures
source: auto-skill
extracted_at: '2026-07-05T14:11:34.745Z'
---

# GitHub Pages Deployment Workflow

## Standard Deployment

After making code changes:

```bash
git add -A
git commit -m "descriptive message"
git push origin main
```

GitHub Actions automatically builds and deploys to GitHub Pages.

## Check Deployment Status

```bash
# List recent deployments
gh run list --limit 3

# Check specific deployment
gh run view <run-id> --json status,conclusion

# View failed deployment logs
gh run view <run-id> --log-failed
```

## Troubleshooting Failed Deployments

When deployment fails with "Deployment failed, try again later":

1. **Check if it's a code error or GitHub issue**:
   - If `npm run build` succeeds locally, code is fine
   - "Deployment failed, try again later" = GitHub Pages temporary issue

2. **Manually trigger deployment**:
   ```bash
   gh workflow run deploy.yml
   ```

3. **Wait and verify**:
   - Deployment takes 1-2 minutes
   - Check status: `gh run list --limit 1 --json status,conclusion`
   - Success shows: `{"conclusion":"success","status":"completed"}`

## Common Issues

- **Node version deprecation warnings**: Safe to ignore, GitHub auto-upgrades
- **Punycode deprecation**: Safe to ignore
- **"Deployment failed, try again later"**: GitHub Pages temporary issue, retry with manual trigger

## Website URL

For this project: https://wwyethan.github.io/my-first-vibe-coding/
