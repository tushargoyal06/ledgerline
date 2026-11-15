# Ledgerline — Cloudflare Pages frontend

This is the Ledgerline frontend project. It does not require Supabase for the public pages to render. Backend features such as newsletter delivery, contact form delivery, login, and CMS publishing remain inactive until a backend is configured.

## Build the site

1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run build`.
5. Upload the **contents of the `dist` folder** to Cloudflare Pages using Direct Upload / Upload assets.

Cloudflare Pages serves the generated `dist` folder; do not upload `src` as the deployed website.

## Frontend-only notes

- No Supabase project or environment variables are required to build the frontend.
- Newsletter and contact forms show an inactive/preview message and do not send or store submissions.
- Admin/CMS and authentication require a backend and are not functional in frontend-only mode.
- Sample/demo stories are not presented as verified current reporting. Add original, fact-checked content before public launch or applying for advertising.

## Cloudflare Pages settings (if using Git deployment)

- Build command: `npm run build`
- Build output directory: `dist`
- Framework preset: Vite
