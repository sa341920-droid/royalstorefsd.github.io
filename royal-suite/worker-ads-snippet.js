// FREE AD AUTOMATION (Telegram channel + Facebook Page), 3 times/day. Purane code mein sirf ADD karein.
// Setup (ek dafa):
//  1) wrangler.toml mein add:   [triggers]  crons = ["*/15 * * * *"]
//  2) Secrets:  wrangler secret put ADS_KEY   (wohi lamba key jo app mein "Sync Key" hai)
//               wrangler secret put TG_TOKEN  (BotFather se bot token)   wrangler secret put TG_CHAT  (@yourchannel, bot ko admin banayein)
//               wrangler secret put FB_PAGE_ID   wrangler secret put FB_TOKEN  (Page access token; optional)
//  3) "KV" ki jagah apni KV binding ka naam likhein.
// A) fetch() mein, baqi routes se PEHLE paste karein:
const cors={'access-control-allow-origin':'*','access-control-allow-headers':'x-key,content-type','access-control-allow-methods':'GET,POST,OPTIONS'};
if(new URL(request.url).pathname==='/ads'){
  if(request.method==='OPTIONS')return new Response(null,{headers:cors});
  if(!env.ADS_KEY||request.headers.get('x-key')!==env.ADS_KEY)return new Response('unauthorized',{status:401,headers:cors});
  if(request.method==='POST'){
    const nw=await request.json(),old=JSON.parse((await env.KV.get('ads:queue'))||'[]');
    nw.forEach(a=>{const o=old.find(x=>x.id===a.id);a.done=o?o.done||{}:{}});   // dobara push par duplicate post nahi hogi
    await env.KV.put('ads:queue',JSON.stringify(nw));return new Response('ok',{headers:cors});
  }
  return new Response((await env.KV.get('ads:queue'))||'[]',{headers:{...cors,'content-type':'application/json'}});
}
// B) export default { ... } ke andar ek naya method add karein:
//    async scheduled(event, env, ctx){ await runAds(env); },
// C) file ke neeche ye functions paste karein:
async function runAds(env){
  const q=JSON.parse((await env.KV.get('ads:queue'))||'[]'),now=new Date(Date.now()+5*3600e3),day=now.toISOString().slice(0,10),mins=now.getUTCHours()*60+now.getUTCMinutes();let ch=false;
  for(const a of q){if(a.until&&day>a.until)continue;a.done=a.done||{};
    for(const s of a.slots){const [h,m]=s.split(':').map(Number),k=day+s;if(a.done[k]||Math.abs(h*60+m-mins)>7)continue;a.done[k]=1;ch=true;
      const blob=dataUrlToBlob(a.img);
      if(a.tg&&env.TG_TOKEN){const f=new FormData();f.append('chat_id',env.TG_CHAT);f.append('caption',a.cap.slice(0,1000));f.append('photo',blob,'ad.jpg');await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendPhoto`,{method:'POST',body:f});}
      if(a.fb&&env.FB_TOKEN){const f=new FormData();f.append('caption',a.cap);f.append('access_token',env.FB_TOKEN);f.append('source',blob,'ad.jpg');await fetch(`https://graph.facebook.com/v19.0/${env.FB_PAGE_ID}/photos`,{method:'POST',body:f});}
    }}
  if(ch)await env.KV.put('ads:queue',JSON.stringify(q));
}
function dataUrlToBlob(u){const b=atob(u.split(',')[1]),r=new Uint8Array(b.length);for(let i=0;i<b.length;i++)r[i]=b.charCodeAt(i);return new Blob([r],{type:'image/jpeg'})}
