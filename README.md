# Ledgerline — Crypto, Markets & Business Newsroom

A responsive React + TypeScript + Tailwind starter for a premium financial-news publication. The visual system, page routes and sample newsroom experience are implemented. The included editorial copy is explicitly demonstration content and must be fact-checked and approved before publication.

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env` and add the Supabase project URL and **anon/public** key.
3. Run `npm install` then `npm run dev`.
4. Run `npm run build` for a production bundle.

## Included

- Responsive publication header, topic navigation, trending strip and editorial homepage.
- Featured stories, category grids, market overview, popular articles and newsletter form.
- Dedicated article routes with author details, image credits, sources, related stories and share-link action.
- Search, contact form, author profiles, 404 route and dedicated information/legal pages.
- Admin sign-in and basic draft creation/list/delete workflow using Supabase Auth and Postgres (the database schema also defines editor/author role boundaries).
- Supabase SQL schema with role-based article policies, private subscriber/contact tables and media bucket policies.
- Edge Functions for contact submissions and newsletter pending signups.
- CoinGecko public API market fetch with loading/error states and source/update timestamps; no fabricated fallback prices.
- SEO-ready document metadata, a crawl-safe `robots.txt` starter, and a domain-aware sitemap generator (`npm run seo:generate`).
- Clearly labelled ad inventory placeholders; no simulated AdSense ads.

## Supabase setup

1. Create a Supabase project.
2. Apply `supabase/migrations/0001_ledgerline.sql` using the Supabase CLI or SQL editor.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`.
4. Deploy `contact`, `newsletter`, `newsletter-confirm` and `newsletter-unsubscribe` Edge Functions. Configure `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ALLOWED_ORIGIN` (one exact site origin), `RESEND_API_KEY`, `NEWSLETTER_FROM_EMAIL` (verified sender), and `SITE_URL` in function secrets. The service-role key belongs only in Edge Function secrets, never in the frontend.
5. Create the first admin user through Supabase Auth, then promote that user's profile row to `admin` from the SQL editor. Do not expose an open public role-assignment endpoint.
6. Configure Resend with a verified sender and the function secrets above. The supplied functions send double-opt-in confirmation email and support token-based confirmation and unsubscribe links; test deliverability, token expiry/replay and applicable consent wording before launch.
7. Configure CAPTCHA/rate limiting, spam controls and monitoring for public forms before launch.

Example admin promotion (run manually for the exact trusted user UUID):

```sql
insert into public.profiles (id, display_name, role)
values ('YOUR_AUTH_USER_UUID', 'Publisher Admin', 'admin')
on conflict (id) do update set role = 'admin';
```

## AdSense readiness safeguards

- Demo stories are used only in local development when `VITE_ENABLE_DEMO_CONTENT=true`; production builds never fall back to sample articles. Keep demo mode for local design preview only.
- Pages are marked `noindex,nofollow` until Supabase is configured; the admin route remains noindex.
- Fictional author profiles have been removed from the public authors page. Replace publisher placeholders with accurate details and identify the real writer of every article.
- Do not create `ads.txt` until AdSense provides your actual publisher ID. Never copy an example publisher ID.
- After buying and connecting your domain, set `VITE_SITE_URL=https://your-real-domain` in `.env`, then run `npm run seo:generate` to create the matching `robots.txt` and `sitemap.xml`. Submit that sitemap in Google Search Console.

## Before production / AdSense review

- Replace all publisher placeholders: legal entity, ownership, address, editorial contact, privacy contact, business email and author biographies.
- Replace demonstration articles with original, sourced reporting; have a human editor verify every claim, statistic, quote, date and image licence. Do not index/publish sample copy as real news.
- Complete authoring workflow: image upload to Storage, editing existing stories, tag/source/SEO controls, scheduling, publish/unpublish, revisions and audit trail. Database fields and storage policies are supplied as a foundation; the admin UI is intentionally a minimal draft console, not a finished newsroom CMS.
- Connect live global market-cap and dominance endpoints if those metrics are to be displayed. The current UI shows Bitcoin/Ethereum/Solana live responses only and leaves unavailable fields blank.
- Add server-side sitemap generation and article metadata/canonical/NewsArticle structured data from published database records. Replace `YOUR_DOMAIN.example` in sitemap and robots.txt after domain setup.
- Implement a production CMP with consent withdrawal and Google-certified CMP support where required; the included cookie panel is a UI prototype and does not itself govern third-party scripts.
- Configure email confirmation and unsubscribe links. Configure and test the Resend sender, deliverability, unsubscribe links and retention rules before launch.
- Add rate limiting/CAPTCHA, form abuse protection, backup/retention policies, security headers, CSP, monitoring, analytics with consent, and legal review under applicable Indian DPDP and other relevant laws.
- Add real social profile URLs, publisher details, Search Console verification and the official AdSense code only after approval.

## Market data

The market widget requests the CoinGecko public `/coins/markets` endpoint in the browser. Provider limits or outages are handled by an explicit unavailable state. For a production publisher, proxy market requests through a server/edge function if a paid API key or higher request quota is required. Never place private API credentials in `VITE_*` variables.

## Important status

This is a runnable, polished front-end and backend foundation. It is not a deployed website and it is not yet an AdSense approval guarantee. Production data, legal identities, editorial review, email confirmation, consent management and the full CMS publishing lifecycle require the publisher's own configuration and review.
