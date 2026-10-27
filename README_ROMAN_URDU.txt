ROYAL MOBILE & PRINTING STORE — MASTER UPGRADE PACK
====================================================

Shop:
Royal Mobile & Printing Store
Faisalabad, Punjab, Pakistan
WhatsApp: +92 304 0011041
Owner label: Farhan Abbas
Delivery message: Fast Delivery All over Pakistan

IMPORTANT — PLEASE READ
-----------------------
This pack is a master specification, implementation checklist and deployment safety plan.
It is NOT a claim that payment gateways, courier APIs, secure account recovery, social auto-publishing,
or an Android APK are already live. Those require implementation, account credentials, provider approval,
deployment and real testing.

DO NOT DELETE YOUR CURRENT GITHUB FILES YET.
Keep index.html, worker.js, README, checklist, CSV and Wrangler templates until the replacement is
deployed and verified. Deleting the old files first could take down the current website and lose useful work.

CURRENT REPOSITORY AUDIT (checked 27 Oct 2026)
----------------------------------------------
Repository: sa341920-droid/sa341920-droid.github.io
- index.html: storefront/frontend, currently a single-page design.
- worker.js: Cloudflare Worker code; source says required binding STORE and secret ADMIN_PASSWORD.
- catalog_starter.csv: starter product catalog.
- wrangler.toml.template / example: deployment templates.
- CHECKLIST.txt: says live tests are still required.
- DEPLOY_STEPS_ROMAN_URDU.txt: deployment guide.

The existing checklist explicitly marks these as not fully implemented/activated:
- payment gateway integrations
- courier API integration
- automatic publishing to all social platforms
- native Android APK
- accounting-grade reports
- complete password recovery workflow

It also says Worker deployment, STORE binding, ADMIN_PASSWORD secret and live tests are still required.
Uploading worker.js to GitHub alone does NOT guarantee that the Cloudflare Worker updates.

REQUIRED FINAL PRODUCT
----------------------
A. Storefront / ecommerce
- Amazon/Daraz/AliExpress-inspired responsive layout; do not copy their branding.
- English + Urdu language switch; mobile-first navigation; search, filters, categories and sorting.
- Product cards, multiple product images/gallery, SKU, description, stock, price, sale price, variants,
  quantity limits, related products, wishlist, cart, checkout and order confirmation.
- 100 starter products; owner can add/edit/archive products and upload images from phone/laptop.
- 20 luxury themes visible ONLY in authenticated owner settings. Customers must not see the theme picker.
- “Customize Store” visible ONLY to authenticated owner/staff with permission. Keep customer product
  personalization (e.g. printing text/design options) as a separate feature.
- Preserve exact original black-and-gold shop logo supplied by owner; never generate or substitute a logo.
- Shop details and message: Faisalabad, Punjab, Pakistan; +92 304 0011041; Fast Delivery All over Pakistan.
- Category coverage: mobile phones/accessories/covers; sublimation; DTF; HTV vinyl; rhinestone;
  Red Sail/vinyl cutting; stationery; business cards; stickers/labels; wedding cards; flyers/posters;
  T-shirts; mugs; keychains; roll-up banners; carrier bags; acrylic name plates; PVC cards; LED/photo
  frames; customized gifts; offset printing; painting and other shop categories.

B. Accounts and security
- Real owner account; staff accounts with role-based permissions.
- Never store plaintext passwords. Use a reputable password hashing/session approach on the server.
- Secure, HttpOnly, SameSite cookies or equivalent secure session tokens; CSRF protections where relevant.
- Login rate limiting, session expiry/revocation, audit log, input validation, secure headers.
- Password reset via verified email/phone with short-lived single-use token; do not expose reset tokens.
- Customers only access their own orders/profile; staff access only permitted modules.
- Never put ADMIN_PASSWORD, API keys, payment secrets or private credentials in index.html/GitHub.
- Do not use a single shared owner password for all staff.
- Protect personal data; collect only required data; define retention and deletion process.

C. Cloud backend and data
- Shared mobile + laptop data using a real database (Cloudflare D1 or other chosen DB).
- Separate object storage for uploaded images (e.g. R2); do not store huge images in KV.
- Database migrations, indexes, backups and tested restore process.
- Server-side authorization on EVERY private API endpoint; hiding a button is not security.
- Health endpoint, structured error messages, logs, monitoring, backup/restore runbook.
- Staging/testing environment before production deployment.

D. Orders, billing and accounting
- Order statuses: pending, confirmed, processing, ready, shipped, delivered, cancelled, refunded.
- Server-generated unique order number; order line items snapshot prices/tax at purchase time.
- Stock reservation/decrement and cancellation/refund stock reversal with transaction safety.
- Customer and supplier records/ledgers, purchases, expenses, payments, udhaar/receivables,
  production/job tracking, SKU/barcode support.
- Estimates/quotations, invoices, receipts, credit notes, printable invoice and actual PDF export.
- Editable tax rate, tax reports, sales/purchase summaries, profit/loss, cash/bank/wallet balances.
- Accounting calculations must be server-side and auditable; validate reports against sample transactions.

E. Payments (provider approval/credentials required)
- Cash on Delivery workflow.
- Bank transfer with reference submission and owner-side manual verification.
- Easypaisa/JazzCash only via approved supported merchant/business integration or documented manual
  payment verification flow; never pretend a screenshot alone proves payment.
- Online payment gateway selected for Pakistan eligibility; provider checkout/webhook signature checks.
- Never store card numbers/CVV. Never mark a payment paid from a client-side success screen.
- Reconciliation, failed/duplicate webhook handling, refunds and audit logs.

F. Delivery / couriers
- Delivery address, city, phone validation, shipping fee/rules, shipment labels if supported.
- Courier adapter for selected Pakistani courier; tracking number, tracking events and order status.
- API keys and contract/merchant approval required; fallback manual tracking if provider API unavailable.
- Customer notification on order status updates.

G. AI and marketing
- Server-side AI API connection via secret binding; never expose API keys to browser.
- Product description/SEO title/meta/keywords generation; owner reviews before publishing.
- Campaign drafts for WhatsApp/Facebook/Instagram and marketing calendar.
- Analytics for visits, searches, cart abandonment, conversion and campaign source, with privacy notice.
- Auto-posting only through official approved platform APIs, with OAuth, permissions and app review.
- Rate limits, spend limits and human approval before paid campaigns or public posts.

H. Owner dashboard and controls
- Owner-only theme picker (20 themes) and brand settings.
- Owner-only store customization and staff permissions.
- Product and category manager, image uploads, inventory alerts, orders, customers, suppliers,
  accounts, invoices, reports, production, shipping, marketing, backups and audit log.
- Staff modules shown only if role allows; APIs enforce same permissions.

I. Quality checks before calling it finished
- Test mobile Android and desktop browsers.
- Test guest checkout and each order status.
- Test stock changes and duplicate submissions.
- Test every API as guest, customer, staff and owner.
- Verify customers cannot call owner endpoints directly.
- Test password reset expiry/reuse, session logout and brute-force rate limits.
- Test image upload file type/size and unauthorized upload attempts.
- Test payment webhooks, signature verification, duplicate events and failed payments in sandbox.
- Test courier tracking in provider sandbox.
- Test PDF invoices and accounting totals using known sample data.
- Test database backup restore from a clean environment.
- Test Urdu layout, accessibility, empty states, loading states, errors and slow connections.
- Only then announce production readiness.

DEPLOYMENT ORDER — DO NOT SKIP
------------------------------
1. Keep a backup copy of the existing repository/files.
2. Decide the production backend and database; create staging first.
3. Implement database schema/migrations and server-side auth/roles.
4. Implement API permissions and tests.
5. Implement storefront against the real API.
6. Add object storage for product images.
7. Configure secrets only in Cloudflare/server secret settings.
8. Configure approved payment/courier providers and sandbox test.
9. Configure AI provider secret and official social platform OAuth/app approvals.
10. Deploy Worker/API; verify health and all private endpoints.
11. Deploy frontend; verify it uses the correct API URL.
12. Test full customer order and owner fulfillment end-to-end.
13. Configure and test backups/restore.
14. Only after successful verification, archive old files. Do not delete the only working copy.

CURRENT CLOUDflare ITEMS TO VERIFY
----------------------------------
- Worker: royal-mobile-store-api (previously reported URL:
  https://royal-mobile-store-api.sa341920.workers.dev/)
- Required KV binding named STORE and secret ADMIN_PASSWORD per current worker.js header.
- Verify the actual Worker deployment matches the repository's current worker.js.
- Verify /health and product save/list/customer order/AI endpoints.
- Check Cloudflare logs for errors.
- A GitHub commit only updates the Worker if a working deployment pipeline is configured.

WHAT THIS PACK DOES NOT CLAIM
-----------------------------
This specification does not itself deploy anything, create accounts, authorize payments, issue courier
credentials, connect social accounts, or produce a signed Android APK. These must be separately configured
and tested. Do not treat a mockup/demo as a live secure system.
