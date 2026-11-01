/* Royal Suite Add-on 6 (additive, nothing earlier is edited):
   - customer-side points redeem hidden (server recomputes totals; points now owner-controlled)
   - TRX id field + owner payment-proof verify/reject
   - extra product photos + gallery on product page
   - catalog publish v2: real thumbnails (photos were being dropped), coupons, extra photos
   - customers fetch published coupons
   - logo -> logo-192.png / logo-512.png generator for the Android/PWA install */
(function(){
const B=window.B,W4=window.W4,W=window.W6={};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=()=>{try{return new URL(S.api).origin}catch(e){return 'https://royal-mobile-store-api.sa341920.workers.dev'}};
const IMG=/^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+\/=]+$/;
const ONL=['JazzCash','Easypaisa','Bank Transfer'];
/* TRX id travels inside the order note (already sent to server) */
const _cart=cart;
cart=function(){let h=_cart();return tab=='cart'?h.replace('<div class="row"><input id="cn"','<input id="trx6" placeholder="Transaction ID (JazzCash/Easypaisa/Bank par)"><div class="row"><input id="cn"'):h};
const _chk=chk;
chk=function(t){let x=$('#trx6'),n=$('#cnote');if(x&&x.value.trim()&&n&&!/TRX:/.test(n.value))n.value='TRX: '+x.value.trim().slice(0,40)+(n.value?' | '+n.value:'');return _chk(t)};
/* publish v2 */
const thumb=(src,max,q,mime)=>new Promise(r=>{if(!src)return r('');let i=new Image();i.onload=()=>{let s=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=Math.max(1,i.width*s);c.height=Math.max(1,i.height*s);c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL(mime||'image/jpeg',q))};i.onerror=()=>r('');i.src=src});
W4.pub=async()=>{if(!S.sk)return alert('Pehle Business>Settings mein Sync Key set karein');
try{let p=[];for(const x of S.p.filter(q=>!q.del)){let y={...x,cost:0};delete y._o;y.img=await thumb(x.img,420,.7);y.imgs=[];for(const s of(x.imgs||[]).slice(0,3))y.imgs.push(await thumb(s,420,.7));p.push(y)}
let d={p,cats:C,pay:S.pay,pages:S.pages,city:S.city,bn:S.bn,th:S.th,own:S.own,bgc:S.bgc,fx:S.fx,cpn:(S.cpn||[]).filter(c=>c.on).map(c=>({c:c.c,p:c.p,on:1}))};
if(S.lg)d.lg=await thumb(S.lg,300,.92,'image/png');if(S.cv)d.cv=await thumb(S.cv,900,.7);
let body=JSON.stringify(d),mb=(body.length/1048576).toFixed(1);
if(body.length>20e6)return alert('Catalog bahut bara ('+mb+' MB). Kam photos rakhein.');
if(body.length>3e6&&!confirm('Catalog '+mb+' MB hai — customers ka phone dheema ho sakta hai. Phir bhi publish karein?'))return;
let r=await fetch(base()+'/catalog',{method:'POST',headers:{'content-type':'application/json','x-key':S.sk},body});
alert(r.ok?'Catalog publish ho gaya ('+mb+' MB, photos aur coupons ke saath)':'Fail: Key ya Worker route check karein')}catch(e){alert('Fail/Offline: '+e.message)}};
/* customers: pick up published coupons (owner device untouched) */
if(!S.sk&&navigator.onLine)fetch(base()+'/catalog').then(r=>r.json()).then(d=>{if(d&&Array.isArray(d.cpn)){S.cpn=d.cpn;sv()}}).catch(()=>{});
/* owner actions */
W.vw=i=>{let o=S.o[i];if(!IMG.test(o.shot||''))return alert('Screenshot sahi format mein nahi');let w=open('','_blank');w.document.write('<img style="max-width:100%" src="'+o.shot+'">')};
W.vf=(i,ok)=>{let o=S.o[i];if(ok){o.vf=1;o.paid=o.total;if(o.st=='New')o.st='Processing'}else{o.vf=-1;o.st='Payment issue';o.hl=1}sv();R()};
W.pts=()=>{if(!S.cu.length)return;let c=S.cu[+prompt(S.cu.map((x,i)=>i+'='+x.n+' ('+(x.pts||0)+')').join(' '))||0],n=+prompt('Points (+ dene ke liye, - redeem ke liye)');if(!n||!c)return;c.pts=Math.max(0,(c.pts||0)+n);sv();R()};
W.add=inp=>{let p=S.p.find(x=>x.id==W4.pe);if(!p||!inp.files[0])return;let r=new FileReader();r.onload=()=>{p.imgs=p.imgs||[];if(p.imgs.length>=4)return alert('Maximum 4 extra photos');p.imgs.push(r.result);sv();R()};r.readAsDataURL(inp.files[0])};
W.del=i=>{let p=S.p.find(x=>x.id==W4.pe);if(p&&p.imgs){p.imgs.splice(i,1);sv();R()}};
W.icons=async()=>{if(!S.lg)return alert('Pehle Admin>Customize mein apna asli logo upload karein');let im=await new Promise(r=>{let i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=S.lg});if(!im)return;
for(const n of[192,512]){let c=document.createElement('canvas');c.width=c.height=n;let x=c.getContext('2d');x.fillStyle='#0b0b0b';x.fillRect(0,0,n,n);let s=Math.min(n*.8/im.width,n*.8/im.height);x.drawImage(im,(n-im.width*s)/2,(n-im.height*s)/2,im.width*s,im.height*s);
await new Promise(r=>c.toBlob(b=>{let a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='logo-'+n+'.png';a.click();setTimeout(r,500)}))}
alert('logo-192.png aur logo-512.png download hue. Inhein royal-suite folder mein upload karein, phir app install ho sakegi.')};
function panel(){let pr=S.o.map((o,i)=>({o,i})).filter(x=>x.o.shot&&!x.o.vf&&!x.o.cx).slice(0,10);
return `<div id="x6"><hr><h4>🧾 Payment proofs (verify karein)</h4>${pr.map(({o,i})=>`<div class="msg">${esc(o.no)} • ${esc(o.cust)} • ${P(o.total)} • ${esc(o.pm)}<br><small>${esc((o.note||'').slice(0,120))}</small><br><button class="btn" onclick="W6.vw(${i})">🖼 Dekhein</button><button class="btn p" onclick="W6.vf(${i},1)">✅ Verify</button><button class="btn" onclick="W6.vf(${i},0)">❌ Reject</button></div>`).join('')||'Koi pending proof nahi'}<h4>⭐ Loyalty points (sirf owner dega/katega)</h4><button class="btn" onclick="W6.pts()">± Points</button><h4>📲 App install icons</h4><button class="btn" onclick="W6.icons()">Logo se logo-192/512.png banayen</button></div>`}
function imgPanel(p){return `<div id="x6i"><h4>📷 Extra photos (max 4)</h4><input type="file" accept="image/*" onchange="W6.add(this)"><div style="display:flex;gap:6px;overflow:auto">${(p.imgs||[]).filter(s=>IMG.test(s)).map((s,i)=>`<div><img src="${s}" style="height:80px;border-radius:6px"><br><button class="btn" onclick="W6.del(${i})">✕</button></div>`).join('')}</div></div>`}
const _R=R;
R=function(){_R();let m=$('#m');if(!m)return;
if(tab=='cart'){let r=$('#rd');if(r)r.remove()}
if(tab=='pd'){let p=S.p.find(x=>x.id==W4.pdid),c=m.querySelector('.card');if(p&&c&&(p.imgs||[]).length)c.insertAdjacentHTML('afterend','<div style="display:flex;gap:6px;overflow:auto;margin:6px 0">'+p.imgs.filter(s=>IMG.test(s)).map(s=>`<img src="${s}" style="height:150px;border-radius:8px">`).join('')+'</div>')}
if(tab=='pro'){if(!$('#x6'))m.insertAdjacentHTML('beforeend',panel());let p=W4.s=='pe'&&S.p.find(x=>x.id==W4.pe);if(p&&!$('#x6i'))m.insertAdjacentHTML('beforeend',imgPanel(p))}};
R();
})();
