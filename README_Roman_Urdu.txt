ROYAL MOBILE & PRINTING STORE — REQUESTED CHANGES

Is package mein updated single-file Cloudflare Worker hai. Existing store design/catalog ko replace karne ke bajaye current worker ke andar requested owner tools add kiye gaye hain.

Naye owner options:
- /admin par Owner Admin aur Manage Store buttons
- Sign In aur secure Owner Setup/Sign Up info option
- Promotion Manager: Single Piece Offer / Bulk Piece Offer
- Promotion title, details, start/end calendar dates, offer text
- Was price aur Now price alag fields
- Phone/PC se promotion picture upload (URL zaroori nahi)
- Customer-facing active promotions with type, dates and prices
- Store Branding: manually upload/change logo and cover image
- Customize Feedback button: label, link, customer message
- Bank/wallet payment details jo customers ko dikhani hain
- Theme customization remains owner-only

SECURITY:
- Admin password browser ya public page mein store nahi hota. Cloudflare Worker secret ADMIN_PASSWORD hi owner login hai.
- Public self-sign-up se kisi ko admin access dena unsafe hota; is liye Sign Up / Owner Setup button safe setup instructions deta hai. Cloudflare Dashboard mein ADMIN_PASSWORD secret owner hi set/reset kare.
- Bank/wallet section mein sirf customer ko dene wali payment details likhein. Password, PIN, OTP, bank login password, private API keys ya social account passwords kabhi na likhein.
- Social media par automated posting ke liye Facebook/Instagram/TikTok ki official authorization/API permissions chahiye. Yeh Worker apne aap aapke accounts mein login ya posting enable nahi karta.

UPLOAD:
1. Cloudflare Dashboard > Workers & Pages > apna existing royal-mobile-store-api Worker kholein.
2. Edit Code / Quick Edit mein worker.js ka poora code replace karein is package ke worker.js se.
3. Save and Deploy karein.
4. Ensure existing STORE KV binding aur ADMIN_PASSWORD secret maujood hain.
5. Open https://royal-mobile-store-api.sa341920.workers.dev/admin
6. Owner password se sign in karein. Customers ke liye main site ka URL alag ho sakta hai.

NOTE:
Yeh file local syntax check pass karti hai, lekin Cloudflare account par deploy ya live end-to-end test is package banate waqt nahi hua. Deploy ke baad /health aur /admin test karein.
