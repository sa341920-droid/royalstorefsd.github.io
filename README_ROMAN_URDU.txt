ROYAL MOBILE & PRINTING STORE — CLOUDFLARE WORKER

File: worker.js

Included: shop storefront, original embedded logo, product catalogue and product admin, orders, admin login, AI chat using Cloudflare Workers AI, and KV-backed business record APIs for invoices/customers/suppliers/expenses/payments/production/staff.

Required Cloudflare bindings/settings:
1. KV Namespace binding: STORE (use the existing namespace for your shop data).
2. Secret: ADMIN_PASSWORD (set a strong owner password; never share it publicly).
3. Workers AI binding: AI (the code checks env.AI and uses @cf/meta/llama-3.1-8b-instruct).

Important:
- This file is prepared for the Cloudflare Worker script editor; it is not automatically deployed by downloading it.
- Keep a backup of your current Worker before replacing it.
- Deploying the file does not create payment gateway credentials, courier API access, social-media publishing permissions, or an Android APK.
- After deployment, test /health, the shop page, admin login, product list, order submission, and /chat.
