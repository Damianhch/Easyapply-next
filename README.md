# EasyApply (Next.js + Vercel + WordPress + Supabase)

## How we ship

1. Create a feature branch from `main`.
2. Open a PR. CI runs (build, typecheck, tests). Vercel posts a preview deployment.
3. Reviewer approves and merges.
4. Merge to `main` triggers production deployment.
5. If needed, rollback via GitHub Revert or Vercel Promote (see `docs/ROLLBACK.md`).

## Local development

- Node 20+
- npm install
- npm run dev → http://localhost:4000

## Environment variables (set in Vercel)

- DATABASE_URL
- WP_BASE_URL
- WP_JWT_SECRET or WP_JWT_PUBLIC_KEY
- API_SHARED_SECRET

## Backend routes (Stage 2)

- POST /api/applications → create application (requires WP JWT)
- GET /api/applications → list my applications (requires WP JWT)
- POST /api/generate/application → generate cover letter
- POST /api/webhooks/wp → WP webhook (signed)
- GET /api/cron/daily → cron housekeeping

## Embeds

Use `public/easyapply-embed.js` to inject sections into WordPress via iframe. See `SETUP_STEPS.txt` for details.
