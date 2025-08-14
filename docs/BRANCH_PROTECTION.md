## Branch protection (apply in GitHub settings)

Protect `main` with:

1) Require a pull request before merging
- Require approvals: 1+
- Dismiss stale approvals on new commits
- Require review from Code Owners (optional)

2) Require status checks to pass before merging
- Select "CI" workflow
- Do not allow bypassing

3) Restrict who can push to matching branches
- Disallow force pushes
- Disallow deletions

4) Require conversation resolution before merging (optional)


