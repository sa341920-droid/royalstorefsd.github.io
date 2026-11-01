/* Royal Suite Add-on 2: customer accounts, wishlist, filters/sort, Farhan AI quick tools, WhatsApp order alert,
   quotations, stock adjust, health check, safe archive (no data deleted), search-focus fix, image shrink */
(function(){
const B=window.B,H=s=>{let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return h+''};
const W=window.W2={},td=()=>new Date().toLocaleDateString();let CU=null,F={sort:'',min:'',max:'',ins:0};
const D=(k,v)=>{if(S[k]===undefined)S[k]=v};
const init=()=>{D('qt',[]);D('adj',[]);D('wl',[]);D('wan',0);D('wno','923040011041')};
const wl=()=>CU?(CU.wl=CU.wl||[]):S.wl;
const _R=R,_shop=shop,_ai=ai,_mk=mk,_prod=prod;
TABS.push(['me','👤 Account','اکاؤنٹ'],['more','🧩 More','مزید']);
const nav=()=>TABS.map(t=>`<button class="${tab==t[0]?'on':''}" onclick="go('${t[0]}')">${S.ur?t[2]:t[1]}</button>`).join('');
R=function(){init();
if(tab=='more'){if(!B.au()&&!B.login())tab='shop';else if(!B.can('biz')){alert('Is section ki permission nahi');tab='shop'}}
if(tab=='me'||tab=='more'){let t=tab;tab='shop';_R();tab=t;$('#nv').innerHTML=nav();$('#m').innerHTML=t=='me'?me():more()}else _R();
if(CU&&(tab=='cart'||tab=='pos')){let n=$('#cn'),p=$('#cp');if(n&&!n.value)n.value=CU.n;if(p&&!p.value)p.value=CU.ph||''}};
/* shop: filters + sort + wishlist + hide archived + search-focus fix (data untouched) */
shop=function(){let all=S.p,l=all.filter(p=>!p.del&&(!F.ins||p.stock>0)&&(F.min===''||p.price>=+F.min)&&(F.max===''||p.price<=+F.max));
if(F.sort=='lo')l=[...l].sort((a,b)=>a.price-b.price);if(F.sort=='hi')l=[...l].sort((a,b)=>b.price-a.price);if(F.sort=='az')l=[...l].sort((a,b)=>a.name.localeCompare(b.name));
let h;S.p=l;try{h=_shop()}finally{S.p=all}
h=h.replace('oninput="q=this.value;R();this.focus()"','oninput="q=this.value;R();W2.fo()"');
h=h.replace(/(<button class="btn p" onclick="add\((\d+)\)">Add<\/button>)/g,(m,a,id)=>a+` <button class="btn" onclick="W2.w(${id})">${wl().includes(+id)?'❤️':'♡'}</button>`);
let o=(v,t)=>`<option value="${v}" ${F.sort==v?'selected':''}>${t}</option>`;
return `<div class="row"><select onchange="W2.f('sort',this.value)">${o('','Sort')}${o('lo','Price: low → high')}${o('hi','Price: high → low')}${o('az','A → Z')}</select><input type="number" placeholder="Min Rs" value="${F.min}" onchange="W2.f('min',this.value)"><input type="number" placeholder="Max Rs" value="${F.max}" onchange="W2.f('max',this.value)"><label><input type="checkbox" style="width:auto" ${F.ins?'checked':''} onchange="W2.f('ins',this.checked?1:0)"> In stock</label></div>`+h};
W.f=(k,v)=>{F[k]=v;R()};
W.fo=()=>{let e=document.querySelector('#m input[oninput*="W2.fo"]');if(e){e.focus();e.setSelectionRange(e.value.length,e.value.length)}};
W.w=id=>{let l=wl(),i=l.indexOf(id);i<0?l.push(id):l.splice(i,1);sv();R()};
/* customer account */
W.reg=()=>{let n=$('#ua_n').value.trim(),p=$('#ua_p').value.trim(),k=$('#ua_k').value;if(!n||!p||k.length<4)return alert('Naam, phone aur 4+ digit PIN chahiye');
let c=S.cu.find(x=>x.ph==p);if(c){if(c.pin)return alert('Account pehle se hai — login karein');if(c.n.toLowerCase()!=n.toLowerCase())return alert('Naam us phone ke record se match nahi karta')}else{c={n,ph:p,bal:0,pts:0};S.cu.push(c)}
c.pin=H(k);CU=c;sv();R()};
W.lg=()=>{let c=S.cu.find(x=>x.ph==$('#ua_p').value.trim()&&x.pin&&x.pin==H($('#ua_k').value));c?(CU=c,R()):alert('Phone ya PIN galat')};
W.out=()=>{CU=null;R()};
function me(){if(!CU)return `<h4>Customer Account</h4><input id="ua_n" placeholder="Name (sirf naye account ke liye)"><input id="ua_p" placeholder="Phone"><input id="ua_k" type="password" placeholder="PIN (4+ digits)"><div class="row"><button class="btn p" onclick="W2.lg()">Login</button><button class="btn" onclick="W2.reg()">Naya account</button></div>`;
let os=S.o.filter(o=>o.cust==CU.n);
return `<div class="row"><div class="card">${CU.n}<br><small>${CU.ph||''}</small></div><div class="card">Points<div class="k">${CU.pts||0}</div></div><div class="card">Udhaar<div class="k">${P(CU.bal)}</div></div></div><button class="btn" onclick="W2.out()">Logout</button><h4>My Orders</h4>`+(os.map(o=>`<div class="msg">${o.no} • ${o.d}<br>${P(o.total)} • ${o.pm} • <b>${o.st}</b><br><small>Track: ${o.track||'-'}</small></div>`).join('')||'Abhi koi order nahi')+'<h4>Wishlist ❤️</h4>'+(wl().map(id=>S.p.find(p=>p.id==id)).filter(p=>p&&!p.del).map(p=>`<div>${p.name} — ${P(p.price)} <button class="btn p" onclick="add(${p.id})">Add</button></div>`).join('')||'Khali')}
/* Farhan AI quick tools */
ai=function(){let b=`<div class="row">${[['rep','📊 Daily report'],['low','📦 Low stock'],['top','🏆 Top items'],['ad','📣 Ad caption'],['rpl','💬 Customer reply'],['udh','💰 Udhaar list']].map(x=>`<button class="btn" onclick="W2.q('${x[0]}')">${x[1]}</button>`).join('')}</div>`;return _ai().replace('<div id="ch">',b+'<div id="ch">')};
W.q=k=>{let t=new Date().toDateString(),to=S.o.filter(o=>new Date(o.ts||Date.parse(o.d)||0).toDateString()==t),sa=to.reduce((a,o)=>a+o.total,0),act=S.p.filter(p=>!p.del),r;
if(k=='rep'){let x=`Royal Store ${td()}: ${to.length} orders, sales ${P(sa)}, low stock ${act.filter(p=>p.stock<8).length}, udhaar ${P(S.cu.reduce((a,c)=>a+c.bal,0))}`;r=x+`<br><a href="https://wa.me/${S.wno||'923040011041'}?text=${encodeURIComponent(x)}" target="_blank">WhatsApp par bhejein</a>`}
else if(k=='low')r='Low stock: '+(act.filter(p=>p.stock<8).slice(0,15).map(p=>p.name+' ('+p.stock+')').join(', ')||'koi nahi');
else if(k=='top'){let t2={};S.o.forEach(o=>o.items.forEach(i=>t2[i.id]=(t2[i.id]||0)+i.q));r=Object.entries(t2).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([i,q])=>((S.p.find(p=>p.id==i)||{}).name||'?')+' x'+q).join(', ')||'Abhi orders nahi'}
else if(k=='ad'){let p=act.filter(x=>x.stock>0);p=p[Math.floor(Math.random()*p.length)];r=p?`🔥 ${p.name} sirf ${P(p.price)}! Royal Mobile & Printing Store, Faisalabad. Fast Delivery All over Pakistan. WhatsApp: +92 304 0011041`:'Koi product nahi'}
else if(k=='rpl')r='Assalam o Alaikum! Royal Mobile & Printing Store mein khush amdeed. Aap ka paigham mil gaya hai, hum jald rabta karenge. WhatsApp: +92 304 0011041';
else r=S.cu.filter(c=>c.bal>0).map(c=>c.n+': '+P(c.bal)).join('<br>')||'Koi udhaar nahi';
ch.push([0,r]);tab='ai';R()};
/* WhatsApp order alert (opens customer's WhatsApp with order text to owner) */
mk=function(...a){let o=_mk(...a);if(S.wan&&a[3]=='Web'&&tab=='cart'){let t=`Naya order ${o.no}\n${o.cust}\nTotal ${P(o.total)} (${o.pm})\n`+o.items.map(i=>{let p=S.p.find(x=>x.id==i.id);return p.name+' x'+i.q}).join('\n')+(o.addr?'\n'+o.addr:'')+(o.note?'\nNote: '+o.note:'');open('https://wa.me/'+S.wno+'?text='+encodeURIComponent(t),'_blank')}return o};
/* safe archive instead of delete (old orders keep working) */
prod=function(){return _prod().replace(/S\.p=S\.p\.filter\(x=>x\.id!=(\d+)\);sv\(\);R\(\)/g,'W2.del($1)')};
W.del=id=>{let p=S.p.find(x=>x.id==id);if(p&&confirm('Archive karein? Purane orders safe rahenge, shop se hat jayega.')){p.del=1;p.stock=0;if(!/^🗄/.test(p.name))p.name='🗄 '+p.name;sv();R()}};
/* More tab */
function more(){init();return `<div class="row"><button class="btn p" onclick="W2.ck()">🩺 Health check</button><button class="btn" onclick="W2.qt()">🧾 New Quotation</button><button class="btn" onclick="W2.sa()">± Stock adjust</button></div><div id="hc"></div><label><input type="checkbox" style="width:auto" ${S.wan?'checked':''} onchange="S.wan=this.checked?1:0;sv()"> Order par WhatsApp alert (customer ke phone se khulta hai)</label><label>Owner WhatsApp (92...)<input value="${S.wno}" onchange="S.wno=this.value.replace(/\\D/g,'');sv()"></label><h4>Quotations</h4>${S.qt.map((q,i)=>`<div>${q.no} • ${q.c} • ${P(q.t)} <button class="btn" onclick="W2.qp(${i})">🖨</button></div>`).join('')}<h4>Stock adjustments</h4>${S.adj.slice(0,10).map(a=>`<div>${a.d} ${a.s} ${a.q>0?'+':''}${a.q} ${a.r}</div>`).join('')}`}
W.qt=()=>{let c=prompt('Customer name');if(!c)return;let it=[],t=0;for(;;){let k=prompt('Item SKU ya naam (khali = khatam)');if(!k)break;let p=S.p.find(x=>x.sku.toLowerCase()==k.toLowerCase()||x.name.toLowerCase()==k.toLowerCase()),pr=+prompt('Rate',p?p.price:0)||0,q=+prompt('Qty',1)||1;it.push({nm:p?p.name:k,pr,q});t+=pr*q}
if(!it.length)return;S.qt.unshift({no:'QT-'+(S.qt.length+1001),c,d:td(),it,t});sv();W.qp(0);R()};
W.qp=i=>{let q=S.qt[i],w=open('','_blank');w.document.write(`<pre style="font:14px monospace">ROYAL MOBILE & PRINTING STORE\nFaisalabad | 0304 0011041\nQUOTATION ${q.no}  ${q.d}\nFor: ${q.c}\n--------------\n${q.it.map(x=>x.nm+' x'+x.q+'  '+P(x.pr*x.q)).join('\n')}\n--------------\nTOTAL ${P(q.t)}\nValid: 7 days</pre>`);w.print()};
W.sa=()=>{let p=S.p.find(x=>x.sku.toLowerCase()==(prompt('SKU')||'').toLowerCase());if(!p)return alert('SKU nahi mila');let q=+prompt('Qty (+ barhane, - kam karne ke liye)');if(!q)return;S.adj.unshift({d:td(),s:p.sku,q,r:prompt('Wajah (damage/loss/count)')||''});p.stock+=q;sv();R()};
const miss=()=>{let s=new Set();S.o.forEach(o=>o.items.forEach(i=>{if(!S.p.find(p=>p.id==i.id))s.add(i.id)}));return[...s]};
W.ck=()=>{let m=[],ids={},sk={};S.p.forEach(p=>{if(sk[p.sku])m.push('Duplicate SKU '+p.sku);sk[p.sku]=1;if(ids[p.id])m.push('Duplicate id '+p.id);ids[p.id]=1;if(p.stock<0)m.push('Negative stock: '+p.name);if(!p.price&&!p.del)m.push('Price 0: '+p.name)});
let x=miss();if(x.length)m.push(x.length+' deleted products purane orders mein hain — dashboard error de sakta hai (Fix dabayen)');
try{if(localStorage.rms.length>4e6)m.push('Storage lagbhag full — backup export karein, images chhoti rakhein')}catch(e){}
$('#hc').innerHTML=(m.length?m.map(t=>'<div class="msg">⚠️ '+t+'</div>').join(''):'<div class="msg">✅ Sab theek hai</div>')+(x.length?'<button class="btn p" onclick="W2.fx()">Fix</button>':'')};
W.fx=()=>{miss().forEach(id=>S.p.push({id,sku:'DEL'+id,name:'🗄 (deleted item '+id+')',cat:0,price:0,cost:0,stock:0,img:'',del:1}));sv();R()};
/* images: auto-shrink before saving so storage doesn't fill */
document.addEventListener('change',async e=>{let i=e.target;if(i.type!='file'||!/^image/.test(i.accept||'')||i._ok||!i.files[0])return;e.stopImmediatePropagation();
try{let f=i.files[0],b=await createImageBitmap(f),s=Math.min(1,1000/Math.max(b.width,b.height)),c=document.createElement('canvas');c.width=b.width*s;c.height=b.height*s;c.getContext('2d').drawImage(b,0,0,c.width,c.height);
let png=f.type=='image/png',bl=await new Promise(r=>c.toBlob(r,png?'image/png':'image/jpeg',.82)),dt=new DataTransfer();dt.items.add(new File([bl],'i',{type:bl.type}));i.files=dt.files}catch(x){}
i._ok=1;i.dispatchEvent(new Event('change'));i._ok=0},true);
addEventListener('error',e=>{if(/quota/i.test(e.message||''))alert('Storage full! Backup export karein aur chhoti images use karein.')});
init();R();
})();
