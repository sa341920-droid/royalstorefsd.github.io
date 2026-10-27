ROYAL MOBILE & PRINTING STORE — BACKEND DEPLOYMENT PACK

Is package mein worker.js ek Cloudflare Worker hai jo storefront aur API ek hi deployment mein serve karta hai.
Isay abhi production-ready complete Amazon/Daraz replacement na samjhein. Is mein backend foundation aur kuch business APIs hain; external services ko alag authorize/configure karna hoga.

IS PACKAGE MEIN MAUJOOD FOUNDATION
- Cloudflare Worker website + API
- Cloudflare KV se cloud-side product/order/business records (STORE binding required)
- Owner bootstrap/login aur secure password hashing/session tokens
- Staff accounts aur module permissions ke API routes
- Product CRUD aur 100 starter items seed endpoint
- Order requests save karna aur order status update API
- Invoice/customer/supplier/expense/payment/production/staff records ke APIs
- Optional Workers AI assistant (AI binding required)
- Theme selector ko customer header se hata kar admin-login area mein move kiya gaya

CLOUDFARE SETUP
1. Cloudflare Dashboard > Workers & Pages > apna Worker open karein.
2. worker.js ka poora code editor mein paste karein, Save and Deploy karein.
3. Settings > Bindings mein KV Namespace binding add karein:
   Variable name: STORE
   KV namespace: royal-store-data (ya aapka existing KV namespace)
4. Settings > Variables and Secrets mein secret add karein:
   ADMIN_PASSWORD = lamba, unique bootstrap/admin password (12+ chars recommended)
5. Optional: Workers AI binding ko AI naam se connect karein, warna AI chat fallback response dega.
6. Worker URL khol kar /health check karein. storeBinding=true aur adminConfigured=true expected hain.
7. Owner account bootstrap ke liye POST request /api/auth/bootstrap-owner par JSON bhejna hoga:
   {"bootstrapPassword":"YOUR_ADMIN_PASSWORD","email":"owner@example.com","name":"Farhan Abbas","password":"A-NEW-STRONG-PASSWORD-12+"}
   Is request ko trusted API client se bhejein; actual email apna use karein. Password kisi ko share na karein.
8. Owner login /api/auth/login par email/password se hota hai.

IMPORTANT LIMITATIONS / JO ABHI ALAG KAAM MANGTA HAI
- Password reset by email: email provider/verification flow configure nahi hai.
- Invoice records save hote hain, lekin certified accounting, automatic tax calculations, ledger reconciliation aur polished PDF invoice generation ko separately implement/test karna hai.
- Payments: COD ko order method ke taur par record kiya ja sakta hai; bank/wallet/manual verification aur online gateway live nahi hain. Easypaisa/JazzCash/bank/online gateway ke merchant credentials, callbacks/webhooks aur test transactions required hain.
- Courier: live tracking API connected nahi. Courier provider account/API key aur webhook integration required hai.
- Social posting: automatic Facebook/Instagram/TikTok publishing connected nahi. Platform app approval, page/business permissions, access tokens aur platform-specific APIs required hain. Passwords share na karein.
- Image uploads: KV is not ideal for a large product image library; Cloudflare R2/object storage and access rules should be configured for durable cross-device images.
- Theme selection is owner-only in this UI, but the selected theme is currently browser-local; shared theme persistence across all devices needs a server-side settings API and frontend wiring.
- Backups/restore, rate limiting, security audit, privacy policy, terms, refund policy and production testing remain required before accepting real customer/payment data.

DEPLOYMENT NOTES
- This Worker serves the website from its own root URL. GitHub Pages URL will not automatically update from this file unless you separately deploy the frontend there.
- Do not paste secret keys into public GitHub files or the website HTML.
- Never claim payment, courier or social auto-publishing is live until provider callbacks and real test transactions succeed.
