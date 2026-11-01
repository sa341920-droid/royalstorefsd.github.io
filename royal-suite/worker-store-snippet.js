// SHARED STORE BACKEND (KV) + AI. Apne existing worker.js mein sirf ADD karein (purana code mat badlein).
// Secrets: wrangler secret put ADS_KEY (wohi lamba key jo app mein Sync Key hai, 12+ chars)
//          optional AI: OPENAI_KEY, DEEPSEEK_KEY, GEMINI_KEY (+ OPENAI_MODEL / DEEPSEEK_MODEL / GEMINI_MODEL / CF_MODEL)
// "KV" ki jagah apni KV binding ka naam; Workers AI binding "AI" pehle se hai to Cloudflare AI chalega.
// fetch() mein baqi routes se PEHLE paste karein:
{
const cors={'access-control-allow-origin':'*','access-control-allow-headers':'x-key,content-type','access-control-allow-methods':'GET,POST,OPTIONS'};
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{...cors,'content-type':'application/json'}});
const path=new URL(request.url).pathname,ok=()=>env.ADS_KEY&&request.headers.get('x-key')===env.ADS_KEY;
const S_=(v,n)=>String(v==null?'':v).slice(0,n);
if(['/catalog','/order','/feedback','/orders','/ack','/ai'].includes(path)){
 if(request.method==='OPTIONS')return new Response(null,{headers:cors});
 if(path==='/catalog'&&request.method==='GET')return new Response((await env.KV.get('catalog'))||'{}',{headers:{...cors,'content-type':'application/json','cache-control':'public,max-age=60'}});
 if(path==='/catalog'){if(!ok())return J({e:'unauthorized'},401);await env.KV.put('catalog',await request.text());return J({ok:1})}
 if(path==='/order'&&request.method==='POST'){const t=await request.text();if(t.length>450000)return J({e:'big'},413);let b;try{b=JSON.parse(t)}catch(e){return J({e:'bad'},400)}
  if(!/^[A-Za-z0-9_-]{6,40}$/.test(b.rid||''))return J({e:'rid'},400);
  const o={rid:b.rid,cust:S_(b.cust,80),ph:S_(b.ph,30),addr:S_(b.addr,250),note:S_(b.note,300),pm:S_(b.pm,20),total:+b.total||0,ship:+b.ship||0,disc:+b.disc||0,shot:/^data:image\//.test(b.shot||'')&&b.shot.length<350000?b.shot:'',items:(Array.isArray(b.items)?b.items:[]).slice(0,50).map(i=>({sku:S_(i.sku,20),n:S_(i.n,80),q:Math.min(999,+i.q||1),pr:+i.pr||0}))};
  await env.KV.put('o:'+o.rid,JSON.stringify(o),{expirationTtl:60*60*24*60});return J({ok:1})}
 if(path==='/feedback'&&request.method==='POST'){const t=await request.text();if(t.length>4000)return J({e:'big'},413);let b;try{b=JSON.parse(t)}catch(e){return J({e:'bad'},400)}
  await env.KV.put('f:'+Date.now()+Math.random().toString(36).slice(2,6),JSON.stringify({c:S_(b.c,60),t:S_(b.t,20),m:S_(b.m,500),sku:S_(b.sku,20),r:+b.r||5}),{expirationTtl:60*60*24*60});return J({ok:1})}
 if(path==='/orders'){if(!ok())return J({e:'unauthorized'},401);const rd=async p=>{const l=await env.KV.list({prefix:p,limit:200});return Promise.all(l.keys.map(async k=>({k:k.name,v:JSON.parse(await env.KV.get(k.name))})))};return J({orders:await rd('o:'),fb:await rd('f:')})}
 if(path==='/ack'){if(!ok())return J({e:'unauthorized'},401);const b=await request.json();await Promise.all((b.keys||[]).filter(k=>/^[of]:/.test(k)).map(k=>env.KV.delete(k)));return J({ok:1})}
 if(path==='/ai'&&request.method==='POST'){if(!ok())return J({e:'unauthorized'},401);const {model,prompt,context,messages}=await request.json();
  const sys='Tum Farhan AI ho, Royal Mobile & Printing Store (Faisalabad, owner Farhan Abbas) ke business assistant. Mukhtasar jawab do (Roman Urdu ya English). Store data: '+JSON.stringify(context||{});
  const msgs=[{role:'system',content:sys},...(messages||[]).slice(-8),{role:'user',content:S_(prompt,2000)}];let reply;
  const oa=async(url,key,m)=>{const r=await fetch(url,{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+key},body:JSON.stringify({model:m,messages:msgs})});const j=await r.json();return j.choices&&j.choices[0].message.content};
  if(model==='ChatGPT'&&env.OPENAI_KEY)reply=await oa('https://api.openai.com/v1/chat/completions',env.OPENAI_KEY,env.OPENAI_MODEL||'gpt-4o-mini');
  else if(model==='DeepSeek'&&env.DEEPSEEK_KEY)reply=await oa('https://api.deepseek.com/chat/completions',env.DEEPSEEK_KEY,env.DEEPSEEK_MODEL||'deepseek-chat');
  else if(model==='Gemini'&&env.GEMINI_KEY){const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL||'gemini-2.0-flash'}:generateContent`,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':env.GEMINI_KEY},body:JSON.stringify({contents:[{parts:[{text:sys+'\n'+S_(prompt,2000)}]}]})});const j=await r.json();reply=j.candidates&&j.candidates[0].content.parts[0].text}
  else if(env.AI){reply=(await env.AI.run(env.CF_MODEL||'@cf/meta/llama-3.1-8b-instruct',{messages:msgs})).response}
  return J({reply:reply||'Is model ki API key set nahi hai'})}
}}
