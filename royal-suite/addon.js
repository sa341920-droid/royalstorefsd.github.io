/* Royal Suite Add-on: login/staff, catalog pack, coupons, shipping, tracking, returns, printing jobs,
   suppliers, customers/loyalty/complaints, analytics, bulk import, 3D customize, offline PWA, cloud sync */
(function(){
const H=s=>{let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return h+''};
const D=(k,v)=>{if(S[k]===undefined)S[k]=v};
const B=window.B={s:'an',ak:'d'};let AU=null,lastJ='';
const td=()=>new Date().toLocaleDateString();
const dl=(n,t)=>{let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t]));a.download=n;a.click()};
const PK=["Phone Case|Tempered Glass|Fast Charger 25W|USB-C Cable|Lightning Cable|Earbuds|Bluetooth Speaker|Power Bank 10000mAh|Phone Holder|Memory Card 64GB|OTG Adapter",
"DTF Film A3 Roll|DTF Powder 1kg|DTF Ink CMYK Set|DTF White Ink|Sublimation Paper A4|Sublimation Ink 100ml|Heat Tape|Heat Press 38x38|Gang Sheet 60cm",
"Vinyl Roll Gloss 1m|Matte Vinyl Roll|Reflective Vinyl|Heat Transfer Vinyl|Transfer Tape|Plotter Blade Set|Cutting Mat|Vinyl Sticker Cut|Name Plate Sticker|Car Sticker Custom",
"Rhinestone Sheet Custom|Hotfix Stones SS10|Hotfix Stones SS16|Rhinestone Template Board|Hotfix Applicator|Rhinestone Motif A4|Glitter HTV",
"A4 Paper Ream|Ball Pen Box|Marker Set|Stapler|File Cover|Notebook 200pg|Register Book|Calculator|Glue Stick|Scissors|Sticky Notes",
"Acrylic Sheet 3mm|Acrylic Sheet 5mm|Laser Cut Name Plate|Acrylic Keychain|Acrylic Sign Board|Acrylic Trophy|MDF Cut Letters|Acrylic Cake Topper",
"Photo Gift Box|Custom Keychain|Custom Pillow|Couple Gift Set|Name Pen|Photo Lamp|Wooden Frame Gift|Custom Wallet",
"Flex Banner per sqft|Vinyl Banner|Panaflex Signboard|Standee Roll-up|Backlit Sign|Shop Name Board|Glow Sign Letters|Pole Flag",
"Paper Bag Custom 100|Gift Box Custom|Mailer Box|Poly Mailer 100|Bubble Wrap Roll|Tape Roll Printed|Shopper Bag|Cake Box",
"PVC ID Card|Employee Card Set|School ID Card|Lanyard Printed|Card Holder|Membership Card|Visiting PVC Card",
"Visiting Cards 1000|Letterhead 500|Bill Book 50x3|Brochure A4 1000|Flyer A5 1000|Envelope Printed|Calendar Custom|Sticker Roll Print|Poster A3 100|Menu Card Print",
"Typing & Composing|Photocopy per page|Color Print A4|CV Design|Logo Design|Social Media Post Design|Scanning|Lamination A4|Spiral Binding|USB Flash Drive 32GB|Keyboard Mouse Set",
"Wedding Card Premium 100|Wedding Card Budget 100|Mehndi Card|Walima Card|Dawat Nama|Event Invitation|Welcome Board|Thank You Cards",
"Self Ink Stamp|Pre-Ink Stamp|Round Stamp|Embossing Seal|Dater Stamp|Name Stamp|Company Seal|Stamp Pad",
"Photo Print 4x6|Photo Print 8x12|Passport Photo 8|Photo Frame 8x10|Canvas Print 12x18|Collage Frame|Wall Photo Panel|Photo Album",
"Sublimation Mug 11oz|Magic Mug|Custom T-Shirt|Polo Shirt Print|Custom Cap|Mouse Pad Print|Tote Bag Print|Hoodie Print|Water Bottle Print|Jersey Custom",
"Screen Replacement|Battery Replacement|Charging Port Repair|Software Flash|Back Glass Change|Water Damage Check|Data Transfer|FRP Unlock",
"Epson Ink 664|Canon Ink GI-790|HP Toner 85A|HP Toner 12A|Brother Toner TN|Ink Tank Refill|Printer Head Clean|Photo Paper Glossy A4"];
function init(){D('stf',[]);D('sup',[]);D('pur',[]);D('job',[]);D('cmp',[]);D('cpn',[{c:'ROYAL10',p:10,on:1}]);D('cats',[]);
D('pay',{jc:'',ep:'',bank:'',ship:150,far:250,free:5000});D('pin','');D('fx',{on:1,tilt:6,depth:6,mode:'raised'});D('att',[]);D('bn','');D('pk',0);D('sk','');D('cc','');
if(!S.pk){S.cats.push(['📲','Mobile Repair Services'],['🖋️','Printer Ink & Toner']);}
S.cats.forEach(c=>{if(!C.find(x=>x[1]==c[1]))C.push(c)});
if(!S.pk){pack();S.pk=1;sv()}}
function pack(){let n=0;PK.forEach((s,ci)=>{if(!C[ci])return;s.split('|').forEach(nm=>{if(S.p.some(p=>p.name==nm))return;let id=Math.max(0,...S.p.map(p=>p.id))+1,h=+H(nm),pr=(h%90+10)*50;S.p.push({id,sku:'RMP'+String(id).padStart(4,'0'),name:nm,cat:ci,price:pr,cost:Math.round(pr*.7),stock:10+h%50,img:'',custom:ci>0&&ci!=4&&ci<16});n++})});sv();return n}
/* ---- login & permissions ---- */
function login(){if(!S.pin){let p=prompt('Owner PIN set karein (4+ digits)');if(!p||p.length<4)return false;S.pin=H(p);sv();AU={o:1};return true}
let p=prompt('PIN daalein (Owner / Staff)');if(!p)return false;let h=H(p);if(h==S.pin){AU={o:1};return true}
let s=S.stf.find(x=>x.pin==h);if(s){AU={n:s.n,perm:s.perm};return true}alert('Galat PIN');return false}
const can=t=>AU&&(AU.o||(AU.perm||[]).includes(t));
B.lo=()=>{AU=null;go('shop')};B.au=()=>AU;B.can=can;B.login=login;
/* ---- wrapped core functions (originals untouched) ---- */
const _R=R,_mk=mk,_cart=cart,_shop=shop;
R=function(){init();
if(['admin','pos','biz'].includes(tab)){if(!AU&&!login())tab='shop';else if(!can(tab)){alert('Is section ki permission nahi');tab='shop'}}
if(tab=='biz'){tab='shop';_R();tab='biz';$('#nv').innerHTML=TABS.map(t=>`<button class="${tab==t[0]?'on':''}" onclick="go('${t[0]}')">${S.ur?t[2]:t[1]}</button>`).join('');$('#m').innerHTML=biz()}else _R();post()};
TABS.push(['biz','🏢 Business','بزنس']);
shop=function(){return _shop()+`<h4>Feedback / Complaint</h4><div class="row"><input id="fn" placeholder="Name"><select id="ft"><option>Feedback</option><option>Complaint</option></select></div><textarea id="fm" rows=2 placeholder="Message"></textarea><button class="btn p" onclick="B.fb()">Send</button>`};
B.fb=()=>{let m=$('#fm').value;if(!m)return;S.cmp.unshift({c:$('#fn').value||'Guest',t:$('#ft').value,m,st:'Open',d:td()});sv();alert('Shukriya! Aap ka paigham mil gaya.');R()};
cart=function(){let h=_cart();if(tab!='cart')return h;let p=S.pay;
let x=`<div class="msg">Delivery: Faisalabad ${P(p.ship)}, baqi Pakistan ${P(p.far)} — ${P(p.free)} se upar FREE.${p.jc?'<br>JazzCash: '+p.jc:''}${p.ep?'<br>Easypaisa: '+p.ep:''}${p.bank?'<br>Bank: '+p.bank:''}</div><input placeholder="Coupon code" value="${S.cc||''}" oninput="B.cpv(this.value)"><small id="cpm"></small><textarea id="cnote" rows=2 placeholder="Custom order notes: size, design, text, colour"></textarea>`;
return h.replace('<div class="row"><input id="cn"',x+'<div class="row"><input id="cn"')};
B.cpv=v=>{S.cc=v.toUpperCase();sv();let c=S.cpn.find(x=>x.on&&x.c==S.cc);$('#cpm').textContent=c?c.p+'% discount lagega':(v?'Invalid coupon':'')};
mk=function(items,cust,pm,src,hl){let o=_mk(items,cust,pm,src,hl),sub=o.total,w=src=='Web'&&tab=='cart';
o.ts=Date.now();o.track='TRK'+Math.floor(Math.random()*9e6+1e6);if(tab=='pos')o.src='POS';
if(w){let ad=$('#ca'),city=ad?ad.value:'',cp=S.cpn.find(c=>c.on&&c.c==S.cc);if(cp)o.disc=Math.round(sub*cp.p/100);
o.ship=sub>=S.pay.free?0:(/faisalabad/i.test(city)?S.pay.ship:S.pay.far);o.addr=city;o.note=($('#cnote')||{}).value||'';S.cc=''}
o.total=sub-(o.disc||0)+(o.ship||0);
let c=S.cu.find(x=>x.n==cust);if(!c){c={n:cust,ph:'',bal:0};S.cu.push(c)}
if(pm=='Udhaar')c.bal+=o.total-sub;let ph=$('#cp');if(w&&ph&&ph.value)c.ph=ph.value;c.pts=(c.pts||0)+Math.floor(sub/100);sv();return o};
/* ---- views ---- */
const BS=[['an','📊 Analytics'],['jb','🖨️ Printing'],['cu','👥 Customers'],['st','🧑‍💼 Staff'],['su','🚚 Suppliers'],['dl','📦 Delivery'],['cp','🏷️ Coupons'],['pr','➕ Products'],['fx','🧊 3D Look'],['se','⚙️ Settings']];
const JT=['DTF','Sublimation','Rhinestone','Vinyl','Stickers','Banner','Mug','T-Shirt','Custom'],JS=['Design','Approval','Printing','Ready','Delivered'];
const ots=o=>o.ts||Date.parse(o.d)||Date.now();
function key(ts,k){let d=new Date(ts),y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0');if(k=='d')return y+'-'+m+'-'+String(d.getDate()).padStart(2,'0');if(k=='m')return y+'-'+m;if(k=='y')return ''+y;let j=new Date(y,0,1);return y+'-W'+String(Math.ceil(((d-j)/864e5+j.getDay()+1)/7)).padStart(2,'0')}
const tb=(h,r)=>`<table><tr>${h.map(x=>'<th>'+x).join('')}</tr>${r.join('')}</table>`;
function biz(){return `<div class="row">${BS.map(x=>`<button class="btn ${B.s==x[0]?'p':''}" onclick="B.s='${x[0]}';R()">${x[1]}</button>`).join('')}<button class="btn" onclick="B.lo()">Logout</button></div>`+V[B.s]()}
const V={
an(){let g={},t={};S.o.forEach(o=>{let k=key(ots(o),B.ak);g[k]=(g[k]||0)+o.total;o.items.forEach(i=>t[i.id]=(t[i.id]||0)+i.q)});let ks=Object.keys(g).sort().slice(-12),mx=Math.max(1,...ks.map(k=>g[k]));
return `<div class="row">${[['d','Daily'],['w','Weekly'],['m','Monthly'],['y','Yearly']].map(x=>`<button class="btn ${B.ak==x[0]?'p':''}" onclick="B.ak='${x[0]}';R()">${x[1]}</button>`).join('')}</div>`+ks.map(k=>`<div>${k} <div style="background:var(--ac);height:12px;width:${g[k]/mx*60}%;display:inline-block"></div> ${P(g[k])}</div>`).join('')+'<h4>Top products</h4>'+Object.entries(t).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([i,q])=>`<div>${(S.p.find(p=>p.id==i)||{}).name} — ${q} pcs</div>`).join('')+`<h4>Cashbook</h4><div>Cash in: ${P(S.o.filter(o=>o.pm!='Udhaar').reduce((a,o)=>a+o.total,0))} | Out: ${P(exp()+S.sup.reduce((a,s)=>a+(s.paid||0),0))}</div>`},
jb(){return `<button class="btn p" onclick="B.jn()">+ New Printing Job</button>`+tb(['Job','Customer','Type','Qty','Due','Balance','Status',''],S.job.map((j,i)=>`<tr><td>${j.no}<td>${j.c}<td>${j.t}<td>${j.qty}<td>${j.due}<td>${P(j.price-j.adv)}<td><select onchange="S.job[${i}].st=this.value;sv()">${JS.map(s=>`<option ${s==j.st?'selected':''}>${s}</option>`).join('')}</select><td><button class="btn" onclick="B.ji(${i})">🧾</button>`))},
cu(){return `<button class="btn p" onclick="B.cn()">+ Customer</button>`+tb(['Name','Phone','Points','Udhaar','Orders'],S.cu.map(c=>`<tr><td>${c.n}<td>${c.ph||''}<td>${c.pts||0}<td>${P(c.bal)}<td>${S.o.filter(o=>o.cust==c.n).length}`))+'<h4>Feedback & Complaints</h4>'+S.cmp.map((m,i)=>`<div class="msg">${m.t} • ${m.c} • ${m.d}<br>${m.m}<br><button class="btn" onclick="S.cmp[${i}].st=S.cmp[${i}].st=='Open'?'Resolved':'Open';sv();R()">${m.st}</button></div>`).join('')},
st(){return `<button class="btn p" onclick="B.sn()">+ Staff</button>`+tb(['Name','Role','Perms',''],S.stf.map((s,i)=>`<tr><td>${s.n}<td>${s.r}<td>${s.perm.join(',')}<td><button class="btn" onclick="B.at(${i})">In/Out</button><button class="btn" onclick="S.stf.splice(${i},1);sv();R()">✕</button>`))+'<h4>Attendance</h4>'+S.att.slice(-15).reverse().map(a=>`<div>${a.d} ${a.n}: ${a.in} → ${a.out||'...'}</div>`).join('')},
su(){return `<button class="btn p" onclick="B.sa()">+ Supplier</button><button class="btn p" onclick="B.pu()">+ Purchase (stock in)</button>`+tb(['Supplier','Phone','Payable',''],S.sup.map((s,i)=>`<tr><td>${s.n}<td>${s.ph}<td>${P(s.bal)}<td><button class="btn" onclick="B.sp(${i})">Pay</button>`))+'<h4>Purchases</h4>'+S.pur.slice(0,15).map(p=>`<div>${p.d} ${p.s}: ${p.p} x${p.q} = ${P(p.t)}</div>`).join('')},
dl(){return tb(['Order','Track','City','Ship','Status',''],S.o.map((o,i)=>`<tr><td>${o.no}<td>${o.track||'-'}<td>${o.addr||''}<td>${P(o.ship||0)}<td>${o.st}<td><button class="btn" onclick="B.ret(${i},0)">Return</button><button class="btn" onclick="B.ret(${i},1)">Exchange</button>`))+`<h4>Track</h4><input id="tk" placeholder="Order no / Track no"><button class="btn p" onclick="B.tr()">Check</button><div id="tr"></div>`},
cp(){return `<button class="btn p" onclick="B.cpn()">+ Coupon</button>`+S.cpn.map((c,i)=>`<div>${c.c} — ${c.p}% <button class="btn" onclick="S.cpn[${i}].on=!S.cpn[${i}].on;sv();R()">${c.on?'ON':'OFF'}</button><button class="btn" onclick="S.cpn.splice(${i},1);sv();R()">✕</button></div>`).join('')},
pr(){return `<div class="msg">Total products: ${S.p.length} | Categories: ${C.length}</div><button class="btn p" onclick="alert(pack_()+' naye items add hue');R()">Install full catalog pack</button><button class="btn" onclick="B.ac()">+ New Category</button><button class="btn" onclick="B.ex()">Export CSV</button><h4>Bulk add (name,category,price,cost,stock — ek line, ek product)</h4><textarea id="csv" rows=5></textarea><button class="btn p" onclick="B.im()">Import</button>`},
fx(){let f=S.fx;return `<label><input type="checkbox" ${f.on?'checked':''} onchange="S.fx.on=this.checked;sv();R()" style="width:auto"> 3D tilt on</label><label>Tilt ${f.tilt}°<input type="range" min=0 max=20 value=${f.tilt} oninput="S.fx.tilt=+this.value;sv();R()"></label><label>Depth ${f.depth}<input type="range" min=0 max=20 value=${f.depth} oninput="S.fx.depth=+this.value;sv();R()"></label><div class="row">${['raised','flat','glass','neon'].map(m=>`<button class="btn ${f.mode==m?'p':''}" onclick="S.fx.mode='${m}';sv();R()">${m}</button>`).join('')}</div><p>Themes, logo, cover: Admin > Customize.</p><div class="grid"><div class="card">Preview<br>3D card</div><div class="card">Hover me</div></div>`},
se(){let p=S.pay,f=(l,k)=>`<label>${l}<input value="${p[k]}" onchange="S.pay.${k}=this.value;sv()"></label>`;
return f('JazzCash number','jc')+f('Easypaisa number','ep')+f('Bank account (title/IBAN)','bank')+f('Shipping Faisalabad','ship')+f('Shipping Pakistan','far')+f('Free shipping above','free')+`<label>Promotion banner<input value="${S.bn}" onchange="S.bn=this.value;sv();R()"></label><label>Cloud Sync Key (lamba secret)<input value="${S.sk}" onchange="S.sk=this.value;sv()"></label><div class="row"><button class="btn p" onclick="B.push()">⬆ Cloud push</button><button class="btn" onclick="B.pull()">⬇ Cloud pull</button><button class="btn" onclick="B.nt()">🔔 Alerts on</button><button class="btn" onclick="B.oc()">Orders CSV</button><button class="btn" onclick="B.cp_()">Change Owner PIN</button></div>`}};
/* ---- actions ---- */
window.pack_=pack;
B.jn=()=>{let c=prompt('Customer name');if(!c)return;let t=JT[+prompt('Type: '+JT.map((x,i)=>i+'='+x).join(' '))||0],j={no:'JOB-'+(S.job.length+1),c,t,qty:+prompt('Qty')||1,size:prompt('Size/details')||'',price:+prompt('Total price')||0,adv:+prompt('Advance received')||0,due:prompt('Delivery date')||'',st:'Design'};S.job.unshift(j);
let cu=S.cu.find(x=>x.n==c);if(!cu){cu={n:c,ph:'',bal:0};S.cu.push(cu)}cu.bal+=j.price-j.adv;sv();R()};
B.ji=i=>{let j=S.job[i],w=open('','_blank');w.document.write(`<pre style="font:14px monospace">ROYAL MOBILE & PRINTING STORE\n${j.no} ${td()}\n${j.c}\n${j.t} x${j.qty} ${j.size}\nTotal ${P(j.price)}\nAdvance ${P(j.adv)}\nBalance ${P(j.price-j.adv)}\nDelivery ${j.due}</pre>`);w.print()};
B.cn=()=>{let n=prompt('Name');if(n)S.cu.push({n,ph:prompt('Phone')||'',bal:0,pts:0});sv();R()};
B.sn=()=>{let n=prompt('Staff name');if(!n)return;let pin=prompt('Staff PIN (4+ digits)');if(!pin||pin.length<4)return;let pm=prompt('Permissions: a=Admin p=POS b=Business (e.g. ap)')||'p';S.stf.push({n,r:prompt('Role')||'Staff',pin:H(pin),perm:[...pm].map(c=>({a:'admin',p:'pos',b:'biz'})[c]).filter(Boolean)});sv();R()};
B.at=i=>{let s=S.stf[i],t=new Date(),r=S.att.find(a=>a.n==s.n&&a.d==td()&&!a.out);r?r.out=t.toLocaleTimeString():S.att.push({n:s.n,d:td(),in:t.toLocaleTimeString()});sv();R()};
B.sa=()=>{let n=prompt('Supplier name');if(n)S.sup.push({n,ph:prompt('Phone')||'',bal:0,paid:0});sv();R()};
B.pu=()=>{if(!S.sup.length)return alert('Pehle supplier add karein');let s=S.sup[+prompt(S.sup.map((x,i)=>i+'='+x.n).join(' '))||0],p=S.p.find(x=>x.sku.toLowerCase()==(prompt('Product SKU')||'').toLowerCase());if(!p)return alert('SKU nahi mila');let q=+prompt('Qty')||0,u=+prompt('Unit cost',p.cost)||p.cost;p.stock+=q;p.cost=u;s.bal+=q*u;S.pur.unshift({d:td(),s:s.n,p:p.name,q,t:q*u});sv();R()};
B.sp=i=>{let a=+prompt('Payment amount')||0;S.sup[i].bal-=a;S.sup[i].paid=(S.sup[i].paid||0)+a;sv();R()};
B.ret=(i,ex)=>{let o=S.o[i];if(/Returned|Exchanged/.test(o.st))return;o.items.forEach(x=>S.p.find(p=>p.id==x.id).stock+=x.q);o.st=ex?'Exchanged':'Returned';if(!ex)S.ex.push({t:'Refund '+o.no,a:o.total,d:td()});sv();R()};
B.tr=()=>{let v=$('#tk').value.trim().toLowerCase(),o=S.o.find(x=>x.no.toLowerCase()==v||(x.track||'').toLowerCase()==v);$('#tr').innerHTML=o?`<div class="msg">${o.no} • ${o.st}<br>${o.d}<br>${STS.map(s=>(STS.indexOf(s)<=STS.indexOf(o.st)?'✅ ':'⬜ ')+s).join(' → ')}</div>`:'Nahi mila'};
B.cpn=()=>{let c=prompt('Coupon code');if(c)S.cpn.push({c:c.toUpperCase(),p:+prompt('Discount %')||0,on:1});sv();R()};
B.ac=()=>{let n=prompt('Category name');if(n){S.cats.push([prompt('Emoji icon')||'🆕',n]);sv();R()}};
B.ex=()=>dl('products.csv',S.p.map(p=>[p.name,p.cat,p.price,p.cost,p.stock].join(',')).join('\n'));
B.oc=()=>dl('orders.csv','no,date,customer,total,pay,status\n'+S.o.map(o=>[o.no,o.d.replace(/,/g,' '),o.cust,o.total,o.pm,o.st].join(',')).join('\n'));
B.im=()=>{let n=0;$('#csv').value.split('\n').forEach(l=>{let a=l.split(',').map(x=>x.trim());if(a.length<3||!a[0])return;let ci=isNaN(a[1])?C.findIndex(c=>c[1].toLowerCase()==a[1].toLowerCase()):+a[1];if(ci<0)ci=0;let id=Math.max(...S.p.map(p=>p.id))+1,pr=+a[2]||0;S.p.push({id,sku:'RMP'+String(id).padStart(4,'0'),name:a[0],cat:ci,price:pr,cost:+a[3]||Math.round(pr*.7),stock:+a[4]||0,img:'',custom:true});n++});sv();alert(n+' products add hue');R()};
B.cp_=()=>{let p=prompt('Naya owner PIN');if(p&&p.length>=4){S.pin=H(p);sv()}};
B.nt=()=>'Notification' in window?Notification.requestPermission().then(()=>alert('Alerts on')):alert('Is browser mein alerts nahi');
/* ---- cloud sync (needs Worker route, see worker-sync-snippet.js) ---- */
const base=()=>{try{return new URL(S.api).origin}catch(e){return ''}};
B.push=async q=>{let b=base();if(!b||!S.sk){q||alert('Pehle Admin>Customize mein AI API URL aur yahan Sync Key set karein');return}
try{let r=await fetch(b+'/sync',{method:'POST',headers:{'x-key':S.sk},body:JSON.stringify(S)});lastJ=JSON.stringify(S);q||alert(r.ok?'Cloud par save ho gaya':'Sync fail')}catch(e){q||alert('Offline — online hone par auto sync hoga')}};
B.pull=async()=>{let b=base();if(!b||!S.sk)return alert('API URL aur Sync Key chahiye');try{let d=await(await fetch(b+'/sync',{headers:{'x-key':S.sk}})).json();if(d&&d.p&&confirm('Is device ka data cloud data se replace karein?')){S=d;init();sv();R()}else if(!d.p)alert('Cloud mein data nahi')}catch(e){alert('Offline')}};
const auto=()=>{if(navigator.onLine&&S.sk&&JSON.stringify(S)!=lastJ)B.push(1)};
setInterval(auto,60000);addEventListener('online',()=>{net();auto()});addEventListener('offline',net);
/* ---- post-render: 3D, banner, net badge, Urdu ---- */
const UR={'All categories':'تمام کیٹیگریز','Add':'شامل کریں','Total':'کل','Place Order':'آرڈر دیں','Dashboard':'ڈیش بورڈ','Products':'مصنوعات','Orders':'آرڈرز','Accounts':'اکاؤنٹس','Customize':'تبدیلی','Sales':'سیلز','Profit':'منافع','Low stock':'کم اسٹاک','Analytics':'تجزیہ','Printing':'پرنٹنگ','Customers':'گاہک','Staff':'عملہ','Suppliers':'سپلائرز','Delivery':'ڈیلیوری','Coupons':'کوپن','Settings':'سیٹنگز','Logout':'لاگ آؤٹ','Search':'تلاش','Stock':'اسٹاک','Out':'ختم','Name':'نام','Phone':'فون','Address':'پتہ','Feedback':'رائے','Complaint':'شکایت','Message':'پیغام','Send':'بھیجیں','Daily':'روزانہ','Weekly':'ہفتہ وار','Monthly':'ماہانہ','Yearly':'سالانہ','Income':'آمدن','Expenses':'اخراجات','Status':'حالت','Price':'قیمت','Online':'آن لائن','Offline':'آف لائن','Top products':'بہترین مصنوعات','Return':'واپسی','Exchange':'تبدیلی'};
const UK=Object.keys(UR).sort((a,b)=>b.length-a.length);
function post(){fx();let h=$('header'),n=$('#net');if(!n){n=document.createElement('span');n.id='net';n.className='btn';h.insertBefore(n,h.children[2])}net();
let b=$('#bnr');if(!b){b=document.createElement('div');b.id='bnr';b.style.cssText='background:var(--ac);color:#000;text-align:center;padding:4px;font-weight:700';$('#nv').before(b)}b.textContent=S.bn;b.style.display=S.bn?'block':'none';
if(S.ur){let w=document.createTreeWalker($('#m'),NodeFilter.SHOW_TEXT),x;while(x=w.nextNode()){if(/^(B|TD)$/.test(x.parentElement.tagName))continue;let v=x.nodeValue;UK.forEach(k=>{if(v.includes(k))v=v.split(k).join(UR[k])});x.nodeValue=v}
document.querySelectorAll('#m [placeholder]').forEach(e=>{let v=e.placeholder;UK.forEach(k=>{if(v.includes(k))v=v.split(k).join(UR[k])});e.placeholder=v})}}
function net(){let n=$('#net');if(n)n.textContent=navigator.onLine?'🟢 Online':'🔴 Offline'}
function fx(){let f=S.fx,d=f.depth,st=$('#fxs')||document.head.appendChild(Object.assign(document.createElement('style'),{id:'fxs'}));
let m={raised:`box-shadow:0 ${d}px 0 #0006,0 ${d*2}px ${d*4}px #0008`,flat:'box-shadow:none',glass:`background:#ffffff18!important;backdrop-filter:blur(8px);box-shadow:0 ${d}px ${d*3}px #0008`,neon:`box-shadow:0 0 ${d*2}px var(--ac);border:1px solid var(--ac)`}[f.mode];
st.textContent=`.card{${m}}.card:hover{transform:${f.on?`rotateX(${f.tilt}deg) rotateY(-${f.tilt}deg) translateZ(${d*2}px)`:'none'}}`}
document.addEventListener('mousemove',e=>{let c=e.target.closest&&e.target.closest('.card');if(!c||!S.fx||!S.fx.on)return;let r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,t=S.fx.tilt*1.5;c.style.transform=`rotateX(${-y*t}deg) rotateY(${x*t}deg) translateZ(${S.fx.depth*2}px)`});
document.addEventListener('mouseleave',e=>{if(e.target.classList&&e.target.classList.contains('card'))e.target.style.transform=''},true);
/* ---- offline PWA + low-stock notification ---- */
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
init();
if(window.Notification&&Notification.permission=='granted'){let l=S.p.filter(p=>p.stock<8).length;if(l&&S.ln!=td()){S.ln=td();sv();try{navigator.serviceWorker.ready.then(r=>r.showNotification('Royal Store',{body:l+' items ka stock kam hai'}))}catch(e){}}}
R();
})();
