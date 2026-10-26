/**
 * Cloudflare Worker starter API.
 * Bind KV namespace as STORE. Optional Workers AI binding as AI.
 * Set ADMIN_PASSWORD as a secret. This is a starter, not production-grade auth.
 */
const CORS={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization"};
const json=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{...CORS,"Content-Type":"application/json"}});
export default {async fetch(request,env){
 if(request.method==="OPTIONS")return new Response(null,{headers:CORS});
 const u=new URL(request.url),p=u.pathname;
 if(p==="/api/health")return json({ok:true,service:"Royal Mobile & Printing Store API"});
 if(p==="/api/products"&&request.method==="GET"){const raw=await env.STORE?.get("products");return json({products:raw?JSON.parse(raw):[]})}
 if(p==="/api/products"&&request.method==="POST"){
  if(!env.ADMIN_PASSWORD||(request.headers.get("Authorization")||"")!=="Bearer "+env.ADMIN_PASSWORD)return json({error:"Unauthorized"},401);
  const b=await request.json();if(!Array.isArray(b.products))return json({error:"products must be an array"},400);
  await env.STORE.put("products",JSON.stringify(b.products));return json({ok:true,count:b.products.length});
 }
 if(p==="/api/ai/promotion"&&request.method==="POST"){
  const b=await request.json(),prompt=String(b.prompt||"").slice(0,3000);if(!prompt)return json({error:"prompt required"},400);
  if(!env.AI)return json({draft:"Workers AI binding is not configured. Create an honest campaign for Royal Mobile & Printing Store, Faisalabad. Do not invent prices, reviews or rankings.",mode:"fallback"});
  try{const r=await env.AI.run("@cf/meta/llama-3.1-8b-instruct",{messages:[
   {role:"system",content:"You are a marketing assistant for Royal Mobile & Printing Store, Faisalabad, Pakistan. Create honest platform-specific promotional drafts. Never promise #1 rankings, fake reviews or invented discounts. Contact +92 304 0011041. Delivery claim: Fast Delivery All over Pakistan."},
   {role:"user",content:prompt}]});return json({draft:r.response||r,mode:"workers-ai"})}
  catch(e){return json({error:"AI call failed; check current Workers AI binding and model availability"},502)}
 }
 return json({error:"Not found"},404)
}};
