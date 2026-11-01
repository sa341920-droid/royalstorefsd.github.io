// SECURITY ADD-ON for the Worker (pehle wale snippets ke saath). Purana code mat badlein — yeh block fetch() mein
// worker-store-snippet.js wale block se PEHLE paste karein. "KV" ki jagah apni KV binding ka naam.
// Yeh karta hai: (1) /order par server khud total nikalta hai (customer ka bheja total ignore) (2) /order aur /feedback par spam limit
// (3) galat key se baar baar try karne wale ko 429.
// Optional behtar limit: wrangler.toml mein Cloudflare "Rate Limiting binding" RL lagayen (docs: developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/);
// binding na ho tab bhi neeche wali in-memory limit chalti hai (best-effort).
{
const cors={'access-control-allow-origin':'*','access-control-allow-headers':'x-key,content-type','access-control-allow-methods':'GET,POST,OPTIONS'};
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{...cors,'content-type':'application/json'}});
const S_=(v,n)=>String(v==null?'':v).slice(0,n);
const path=new URL(request.url).pathname,ip=request.headers.get('cf-connecting-ip')||'x';
globalThis.__rl=globalThis.__rl||new Map();
const hit=(k,max,ms)=>{const n=Date.now(),a=(globalThis.__rl.get(k)||[]).filter(t=>n-t<ms);a.push(n);globalThis.__rl.set(k,a);if(globalThis.__rl.size>5000)globalThis.__rl.clear();return a.length<=max};
const slow=async(tag,max,ms)=>{if(!hit(tag+ip,max,ms))return true;if(env.RL){const r=await env.RL.limit({key:tag+ip});if(!r.success)return true}return false};
if(request.method!=='OPTIONS'&&(['/orders','/ack','/ai'].includes(path)||(path==='/catalog'&&request.method!=='GET'))&&request.headers.get('x-key')!==env.ADS_KEY&&!hit('bad'+ip,10,600000))return J({e:'too many attempts'},429);
if(path==='/feedback'&&request.method==='POST'&&await slow('f',5,60000))return J({e:'slow down'},429);
if(path==='/order'&&request.method==='POST'){
  if(await slow('o',5,60000))return J({e:'slow down'},429);
  const t=await request.text();if(t.length>450000)return J({e:'big'},413);
  let b;try{b=JSON.parse(t)}catch(e){return J({e:'bad'},400)}
  if(!/^[A-Za-z0-9_-]{6,40}$/.test(b.rid||''))return J({e:'rid'},400);
  const cat=JSON.parse((await env.KV.get('catalog'))||'{}'),CP=cat.p||[],pay=cat.pay||{ship:150,far:250,free:5000},city=cat.city||{};
  let sub=0,unk=0;const items=[];
  for(const i of(Array.isArray(b.items)?b.items:[]).slice(0,50)){const q=Math.min(999,Math.max(1,+i.q||1)),p=CP.find(x=>x.sku===i.sku);
    if(!p){unk++;items.push({sku:S_(i.sku,20),n:S_(i.n,80),q,pr:+i.pr||0});continue}
    const pr=p.sale&&p.sale<p.price?p.sale:p.price;sub+=pr*q;items.push({sku:S_(p.sku,20),n:S_(p.name,80),q,pr})}
  const ad=S_(b.addr,250).toLowerCase(),ck=Object.keys(city).find(k=>k&&ad.includes(k));
  let ship=sub>=(+pay.free||5000)?0:(ck?+city[ck]:(/faisalabad/.test(ad)?+pay.ship:+pay.far));
  const maxp=Math.max(0,...(cat.cpn||[]).map(c=>+c.p||0)),disc=Math.min(Math.max(0,+b.disc||0),Math.round(sub*maxp/100));
  const verified=CP.length>0&&unk===0&&items.length>0;
  const total=verified?sub-disc+ship:(+b.total||0);
  const o={rid:b.rid,cust:S_(b.cust,80),ph:S_(b.ph,30),addr:S_(b.addr,250),note:S_(b.note,300),pm:S_(b.pm,20),total,claimed:+b.total||0,verified,ship:verified?ship:(+b.ship||0),disc:verified?disc:(+b.disc||0),shot:/^data:image\//.test(b.shot||'')&&b.shot.length<350000?b.shot:'',items};
  await env.KV.put('o:'+o.rid,JSON.stringify(o),{expirationTtl:60*60*24*60});
  return J({ok:1,total,verified})}
}
