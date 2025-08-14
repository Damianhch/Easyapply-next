## Rollback playbook

Two primary options to restore a previous good state.

### 1) GitHub Revert (preferred)

1. Open the merged PR in GitHub.
2. Click "Revert" to auto-create a revert PR.
3. Merge the revert PR into `main`.

Result: Vercel deploys the reverted commit, restoring the previous version.

Alternative CLI:

```bash
git revert <MERGED_COMMIT_SHA>
git push origin main
```

### 2) Vercel Promote Previous Deployment

1. Open your Vercel project → Deployments.
2. Find a previous successful deployment.
3. Click Promote (or Redeploy) to make it live.

This is instant and does not require git changes.

### Notes

- If a hotfix is needed, branch off the last good commit, make fixes, open a PR, merge.
- Never force-push to `main`. Use PRs for all changes.


