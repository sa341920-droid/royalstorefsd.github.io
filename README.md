# Royal Mobile & Printing Store — GitHub Starter

Amazon-inspired storefront and business-suite starter for **Royal Mobile & Printing Store**.

## Included
- Responsive black-and-gold storefront/admin interface
- Dashboard, product catalogue, inventory, orders, POS/invoice print view
- Customers, supplier/purchase workspace, printing production jobs
- Accounts/ledger starter, expenses, editable tax-rate field and reports
- Staff/roles workspace
- 20 selectable premium theme palettes and manual appearance customization
- Farhan AI Agent UI with provider selector for Cloudflare Workers AI, OpenAI, Gemini, DeepSeek, Groq and OpenRouter
- Cloudflare Worker API endpoint for AI requests (provider keys remain server-side)

## Deploy frontend on GitHub Pages
1. Upload the contents of this folder to the root of your GitHub repository.
2. In GitHub: **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main` and `/public` (or move `public/index.html` to repository root if your Pages setup publishes root).
4. Save and open the published URL.

## Deploy AI API on Cloudflare Workers
1. Create or open your Worker.
2. Paste `worker.js` into the Worker editor and deploy.
3. For Cloudflare Workers AI, bind the AI resource with variable name `AI`.
4. Add provider keys as Worker **Secrets**, not GitHub files:
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
   - `DEEPSEEK_API_KEY`
   - `GROQ_API_KEY`
   - `OPENROUTER_API_KEY`
5. In the app, open **Settings & Integrations** and enter the Worker URL. (Open **Settings & Integrations** in the app and save your Worker URL. The Farhan AI Agent then sends chat requests to `/api/ai`.)

## Important implementation boundary
This is a working front-end starter: product/customer/order/account/job entries are currently saved in the browser's local storage, so they do not yet synchronize between phones and computers. A production multi-user system needs a database (for example Cloudflare D1), secure authentication and role checks, server-side CRUD endpoints, payment/courier integrations, backups, and real PDF/WhatsApp workflows. Payment gateways, FBR filing and social-media publishing are not activated by this starter. Do not enter real customer or financial records until backend security and database persistence are implemented.

## Business identity
- Name: Royal Mobile & Printing Store
- Owner: Farhan Abbas
- Location: Faisalabad, Punjab, Pakistan
- Contact: +92 304 0011041

## Branding
The starter uses a text-based crown mark and black/gold palette. Replace the placeholder mark with the owner's exact original logo asset in `public/` when that original image file is available. It intentionally does not generate a replacement logo.
