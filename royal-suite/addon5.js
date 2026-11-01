/* Royal Suite Add-on 5 (additive): online-order total check, corrected Business>Analytics cashbook line,
   barcode labels (Code 39), staff salary + leave, profit by product, courier tracking links, AI chat restore.
   Nothing from earlier files is edited or removed. */
(function(){
const B=window.B,W=window.W4,D=(k,v)=>{if(S[k]===undefined)S[k]=v};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const td=()=>new Date().toLocaleDateString(),init=()=>{D('sal',[]);D('lv',[])};
const paid=o=>typeof o.paid=='number'?o.paid:(o.src=='POS'&&o.pm!='Udhaar'?o.total:0);
/* 1) online orders: customer-sent totals are untrusted — flag mismatches (row gets ⭐ highlight in Orders) */
if(W&&W.pull){const p0=W.pull;W.pull=async function(){let seen=new Set(S.o.map(o=>o.rid));await p0();let bad=0;
S.o.forEach(o=>{if(o.src!='Online'||seen.has(o.rid)||o.chk)return;o.chk=1;
let ex=(o.items||[]).reduce((a,i)=>{let p=S.p.find(x=>x.id==i.id);return a+(p?(p.sale&&p.sale<p.price?p.sale:p.price)*i.q:0)},0)+(o.ship||0)-(o.disc||0);
if(o.total<ex*.5-5||o.total>ex+5){o.hl=1;o.note=(o.note?o.note+' | ':'')+'⚠ TOTAL CHECK: expected '+P(ex)+', customer sent '+P(o.total);bad++}});
sv();if(bad){alert('⚠ '+bad+' order ka total store ke rate se match nahi karta (⭐ highlight). Confirm karne se pehle check karein.');R()}}}
/* 2) Business>Analytics cashbook: count only money actually received */
const _R=R;
R=function(){init();_R();
if(tab=='biz'){let m=$('#m');if(m&&/<div>Cash in: [^<]*<\/div>/.test(m.innerHTML)){
let i=S.o.reduce((a,o)=>a+(o.cx||o.st=='Cancelled'||o.st=='Returned'?0:paid(o)),0)+(S.inc||[]).reduce((a,x)=>a+x.a,0)+S.job.filter(j=>!j.oid).reduce((a,j)=>a+(j.adv||0),0),
out=S.ex.reduce((a,e)=>a+e.a,0)+S.sup.reduce((a,s)=>a+(s.paid||0),0);
m.innerHTML=m.innerHTML.replace(/<div>Cash in: [^<]*<\/div>/,`<div>Cash in (asli wasooli): ${P(i)} | Out: ${P(out)} | Net: ${P(i-out)}</div>`)}}
if(tab=='pro'&&$('#m')&&!$('#x5'))$('#m').insertAdjacentHTML('beforeend',panel())};
/* 3) Code 39 barcode labels (scanners + camera scan read SKU) */
const C39={'0':'nnnwwnwnn','1':'wnnwnnnnw','2':'nnwwnnnnw','3':'wnwwnnnnn','4':'nnnwwnnnw','5':'wnnwwnnnn','6':'nnwwwnnnn','7':'nnnwnnwnw','8':'wnnwnnwnn','9':'nnwwnnwnn','A':'wnnnnwnnw','B':'nnwnnwnnw','C':'wnwnnwnnn','D':'nnnnwwnnw','E':'wnnnwwnnn','F':'nnwnwwnnn','G':'nnnnnwwnw','H':'wnnnnwwnn','I':'nnwnnwwnn','J':'nnnnwwwnn','K':'wnnnnnnww','L':'nnwnnnnww','M':'wnwnnnnwn','N':'nnnnwnnww','O':'wnnnwnnwn','P':'nnwnwnnwn','Q':'nnnnnnwww','R':'wnnnnnwwn','S':'nnwnnnwwn','T':'nnnnwnwwn','U':'wwnnnnnnw','V':'nwwnnnnnw','W':'wwwnnnnnn','X':'nwnnwnnnw','Y':'wwnnwnnnn','Z':'nwwnwnnnn','-':'nwnnnnwnw','.':'wwnnnnwnn',' ':'nwwnnnwnn','*':'nwnnwnwnn'};
function bars(t){let s='*'+String(t).toUpperCase().replace(/[^0-9A-Z.\- ]/g,'')+'*',x=0,r='';
for(const ch of s){let p=C39[ch];for(let i=0;i<9;i++){let w=p[i]=='w'?3:1;if(i%2==0)r+=`<rect x="${x}" y="0" width="${w}" height="40"/>`;x+=w}x+=1}
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x} 40" width="150" height="40" preserveAspectRatio="none">${r}</svg>`}
W.lbl=()=>{let c=prompt('Category number (khali = sab)\n'+C.map((x,i)=>i+'='+x[1]).join(', '));let n=Math.max(1,+prompt('Har item ke kitne labels?',1)||1);
let l=S.p.filter(p=>!p.del&&(c===''||c===null||+c==p.cat));if(!l.length)return alert('Koi item nahi');
let h=l.map(p=>`<div class="l">${esc(p.name.slice(0,26))}<br>${bars(p.sku)}<br><b>${esc(p.sku)}</b> • ${P(p.price)}</div>`.repeat(n)).join('');
let w=open('','_blank');w.document.write(`<style>body{font:11px sans-serif}.l{display:inline-block;width:190px;border:1px dashed #999;padding:4px;margin:3px;text-align:center}</style>${h}`);w.print()};
/* 4) staff salary + leave, profit by product, courier tracking links */
W.sal=()=>{if(!S.stf.length)return alert('Pehle Business>Staff mein staff add karein');let s=S.stf[+prompt(S.stf.map((x,i)=>i+'='+x.n).join(' '))||0],a=+prompt('Salary Rs');if(!a)return;S.sal.unshift({n:s.n,a,d:td()});S.ex.push({t:'Salary '+s.n,a,d:td()});sv();R()};
W.lv=()=>{if(!S.stf.length)return alert('Pehle staff add karein');let s=S.stf[+prompt(S.stf.map((x,i)=>i+'='+x.n).join(' '))||0];S.lv.unshift({n:s.n,d:prompt('Chhutti ki date',td())||td(),r:prompt('Wajah')||''});sv();R()};
function panel(){let t={};S.o.forEach(o=>{if(o.cx)return;(o.items||[]).forEach(i=>{let p=S.p.find(x=>x.id==i.id);if(p){t[p.id]=(t[p.id]||0)+(p.price-p.cost)*i.q}})});
let top=Object.entries(t).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([id,v])=>`<div>${esc((S.p.find(p=>p.id==id)||{}).name)}: ${P(v)}</div>`).join('')||'Abhi orders nahi';
let ship=S.o.filter(o=>o.cn).slice(0,10).map(o=>`<div>${esc(o.no)} • ${esc(o.courier||'')} ${esc(o.cn)} <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent((o.courier||'courier')+' tracking '+o.cn)}">Track</a></div>`).join('')||'Koi shipped order nahi';
return `<div id="x5"><hr><h4>🏷 Barcode labels</h4><button class="btn p" onclick="W4.lbl()">Print labels</button><h4>💼 Staff salary / leave</h4><div class="row"><button class="btn" onclick="W4.sal()">+ Salary pay</button><button class="btn" onclick="W4.lv()">+ Leave</button></div>${S.sal.slice(0,5).map(x=>`<div>${esc(x.d)} ${esc(x.n)} salary ${P(x.a)}</div>`).join('')}${S.lv.slice(0,5).map(x=>`<div>${esc(x.d)} ${esc(x.n)} leave: ${esc(x.r)}</div>`).join('')}<h4>📈 Profit by product (top 10)</h4>${top}<h4>🚚 Courier tracking</h4>${ship}</div>`}
/* 5) AI chat: restore saved conversation after reload */
init();if(!ch.length&&S.chat&&S.chat.length)S.chat.forEach(m=>ch.push([m.role=='user'?1:0,esc(m.content).replace(/\n/g,'<br>')]));
R();
})();
