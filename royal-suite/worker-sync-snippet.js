// Apni existing worker.js ke fetch handler mein, baqi routes se PEHLE paste karein.
// Isse sirf ADD karna hai; purana code change nahi hota. "KV" ki jagah apni KV binding ka naam likhein.
const cors={'access-control-allow-origin':'*','access-control-allow-headers':'x-key,content-type','access-control-allow-methods':'GET,POST,OPTIONS'};
if(new URL(request.url).pathname==='/sync'){
  if(request.method==='OPTIONS')return new Response(null,{headers:cors});
  const key=request.headers.get('x-key');
  if(!key||key.length<12)return new Response('key too short',{status:401,headers:cors});
  if(request.method==='POST'){await env.KV.put('sync:'+key,await request.text());return new Response('ok',{headers:cors});}
  return new Response((await env.KV.get('sync:'+key))||'{}',{headers:{...cors,'content-type':'application/json'}});
}
