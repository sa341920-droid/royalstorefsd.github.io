/* Royal Suite Add-on 3: Ad Studio (custom picture/size/colour), free posting, 3-time/day promotion scheduler,
   auto-ads, cloud auto-post queue (Telegram / Facebook Page via Worker) */
(function(){
const B=window.B,W=window.W3={},td=()=>new Date().toISOString().slice(0,10);
const D=(k,v)=>{if(S[k]===undefined)S[k]=v};const init=()=>D('ads',[]);
const SZ={wa:['WhatsApp Status',1080,1920],ig:['Instagram Post',1080,1080],igp:['Instagram Portrait',1080,1350],fb:['Facebook Post',1200,630],fbc:['Facebook Cover',1640,624],yt:['YouTube Thumbnail',1280,720],a4:['Poster A4',1240,1754],cu:['Custom',1080,1080]};
const TP={'Royal Gold':['#0b0b0b','#2a2205','#f5f1e6','#d4af37'],'Sale Red':['#8b0000','#ff3b30','#ffffff','#ffe14d'],'Clean White':['#ffffff','#e8eef5','#111111','#0a66c2'],'Neon':['#05010f','#1a0540','#ffffff','#39ff14'],'Emerald':['#04210f','#0b5a2a','#ffffff','#ffd54a'],'Sky':['#0d47a1','#42a5f5','#ffffff','#ffeb3b'],'Pink':['#880e4f','#f06292','#ffffff','#fff59d']};
const FF={Modern:'system-ui,sans-serif',Serif:'Georgia,serif',Bold:'Impact,sans-serif',Mono:'Courier New,monospace',Fun:'Comic Sans MS,cursive'};
const NUM=['w','h','ps','fs','days'];
const blank=()=>{let a={id:0,pid:0,hl:'',sub:'',price:'',badge:'',cap:'',ph:'+92 304 0011041',tag:'Fast Delivery All over Pakistan.',loc:'Faisalabad',pic:'',emo:'',fit:'cover',ps:100,sz:'ig',w:1080,h:1080,tp:'Royal Gold',ff:'Modern',fs:100,al:'center',lg:1,s1:'09:00',s2:'14:00',s3:'20:00',days:7,tg:0,fb:0,active:1,fired:{}};[a.c1,a.c2,a.tx,a.ac]=TP['Royal Gold'];return a};
let A=blank(),tm;
/* ---- canvas renderer ---- */
const li=s=>new Promise(r=>{if(!s)return r(null);let i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=s});
const rr=(x,a,b,w,h,r)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()};
function wrap(x,t,mw){let l=[],c='';String(t).split(/\s+/).forEach(k=>{let n=c?c+' '+k:k;if(x.measureText(n).width>mw&&c){l.push(c);c=k}else c=n});if(c)l.push(c);return l}
async function render(cv,a){let Wd=a.w,H=a.h,x=cv.getContext('2d');cv.width=Wd;cv.height=H;
let g=x.createLinearGradient(0,0,Wd,H);g.addColorStop(0,a.c1);g.addColorStop(1,a.c2);x.fillStyle=g;x.fillRect(0,0,Wd,H);
let u=Math.min(Wd,H)/1000*a.fs/100,land=Wd>H*1.25,ff=FF[a.ff]||FF.Modern;
x.strokeStyle=a.ac;x.lineWidth=u*10;x.strokeRect(u*14,u*14,Wd-u*28,H-u*28);
let pc=land?{x:Wd*.05,y:H*.12,w:Wd*.4,h:H*.76}:{x:Wd*.1,y:H*.1,w:Wd*.8,h:H*.44},tx=land?{x:Wd*.5,y:H*.14,w:Wd*.45}:{x:Wd*.08,y:H*.58,w:Wd*.84};
x.save();rr(x,pc.x,pc.y,pc.w,pc.h,u*30);x.clip();x.fillStyle='#ffffff22';x.fillRect(pc.x,pc.y,pc.w,pc.h);
let im=await li(a.pic);
if(im){let s=(a.fit=='cover'?Math.max:Math.min)(pc.w/im.width,pc.h/im.height)*a.ps/100,w=im.width*s,h=im.height*s;x.drawImage(im,pc.x+(pc.w-w)/2,pc.y+(pc.h-h)/2,w,h)}
else if(a.emo){x.font=Math.min(pc.w,pc.h)*.6*a.ps/100+'px serif';x.textAlign='center';x.textBaseline='middle';x.fillText(a.emo,pc.x+pc.w/2,pc.y+pc.h/2)}
x.restore();
let lg=a.lg&&S.lg?await li(S.lg):null;if(lg){let h=H*.07,w=lg.width/lg.height*h;x.drawImage(lg,Wd*.05,H*.025,w,h)}
if(a.badge){let r=u*100,cx=pc.x+pc.w-u*30,cy=pc.y+u*30;x.fillStyle=a.ac;x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.fillStyle=a.c1;x.textAlign='center';x.textBaseline='middle';x.font=`900 ${u*34}px ${ff}`;let l=wrap(x,a.badge,r*1.5);l.forEach((t,i)=>x.fillText(t,cx,cy+(i-(l.length-1)/2)*u*38))}
x.textAlign=a.al;x.textBaseline='top';let ax=a.al=='left'?tx.x:a.al=='right'?tx.x+tx.w:tx.x+tx.w/2,y=tx.y;
const T=(t,sz,col,wt)=>{if(!t)return;x.font=`${wt} ${sz}px ${ff}`;x.fillStyle=col;wrap(x,t,tx.w).forEach(l=>{x.fillText(l,ax,y);y+=sz*1.18});y+=sz*.25};
T(a.hl,u*74,a.ac,'800');T(a.sub,u*38,a.tx,'400');T(a.price,u*96,a.ac,'900');
y=H-u*215;T('ROYAL MOBILE & PRINTING STORE',u*30,a.ac,'700');T('📞 '+a.ph,u*44,a.tx,'700');T(a.tag+' • '+a.loc,u*26,a.tx,'400')}
W.dr=()=>{let c=$('#adcv');if(c)render(c,A)};
W.s=(k,v)=>{A[k]=NUM.includes(k)?+v:v;clearTimeout(tm);tm=setTimeout(W.dr,120)};
/* ---- UI ---- */
const I=(l,k,t='text')=>`<label>${l}<input type="${t}" value="${String(A[k]).replace(/"/g,'&quot;')}" oninput="W3.s('${k}',this.value)"></label>`;
const S_=(l,k,o)=>`<label>${l}<select onchange="W3.s('${k}',this.value);W3.dr()">${o.map(x=>`<option ${A[k]==x?'selected':''}>${x}</option>`).join('')}</select></label>`;
function ui(){let p=S.p.filter(x=>!x.del);
return `<h4>📢 Ad Studio</h4><div class="row"><select onchange="W3.pr(+this.value)"><option value=0>— Product chunein (ya custom) —</option>${p.map(x=>`<option value=${x.id} ${A.pid==x.id?'selected':''}>${x.name}</option>`).join('')}</select><button class="btn" onclick="W3.auto()">⚡ Auto-ads banao</button></div>
<canvas id="adcv" style="width:100%;max-height:55vh;object-fit:contain;border-radius:10px;background:#222"></canvas>
<div class="row"><button class="btn p" onclick="W3.share()">📤 Share / Post</button><button class="btn" onclick="W3.png()">⬇ PNG</button><button class="btn p" onclick="W3.save()">💾 Save + Schedule</button></div>
<details open><summary>✏️ Text</summary>${I('Headline','hl')}${I('Sub text','sub')}${I('Price','price')}${I('Badge (e.g. 20% OFF)','badge')}${I('Phone','ph')}${I('Tagline','tag')}${I('City','loc')}</details>
<details><summary>🖼️ Picture / Size / Colour / Font</summary>
<label>Picture<input type="file" accept="image/*" onchange="W3.up(this)"></label><button class="btn" onclick="W3.s('pic','');W3.s('emo','')">Picture hatayen</button>
${S_('Fit','fit',['cover','contain'])}<label>Picture scale ${A.ps}%<input type="range" min="40" max="160" value="${A.ps}" oninput="W3.s('ps',this.value)"></label>
<label>Size<select onchange="W3.sz(this.value)">${Object.entries(SZ).map(([k,v])=>`<option value="${k}" ${A.sz==k?'selected':''}>${v[0]} ${v[1]}×${v[2]}</option>`).join('')}</select></label>
<div class="row">${I('Width px','w','number')}${I('Height px','h','number')}</div>
<label>Template<select onchange="W3.tp(this.value)">${Object.keys(TP).map(k=>`<option ${A.tp==k?'selected':''}>${k}</option>`).join('')}</select></label>
<div class="row">${[['c1','Bg 1'],['c2','Bg 2'],['tx','Text'],['ac','Accent']].map(([k,l])=>`<label>${l}<input type="color" value="${A[k]}" oninput="W3.s('${k}',this.value)"></label>`).join('')}</div>
<label>Font<select onchange="W3.s('ff',this.value);W3.dr()">${Object.keys(FF).map(k=>`<option ${A.ff==k?'selected':''}>${k}</option>`).join('')}</select></label>
<label>Text size ${A.fs}%<input type="range" min="60" max="160" value="${A.fs}" oninput="W3.s('fs',this.value)"></label>${S_('Align','al',['center','left','right'])}
<label><input type="checkbox" style="width:auto" ${A.lg?'checked':''} onchange="W3.s('lg',this.checked?1:0)"> Logo dikhayen</label></details>
<details><summary>✍️ Caption</summary><textarea rows="5" oninput="W3.s('cap',this.value)">${A.cap}</textarea><button class="btn" onclick="W3.cap()">✨ Auto caption</button></details>
<details><summary>⏰ 3-time promotion (roz 3 dafa)</summary><div class="row">${I('Time 1','s1','time')}${I('Time 2','s2','time')}${I('Time 3','s3','time')}</div>${I('Kitne din chalayen','days','number')}
<label><input type="checkbox" style="width:auto" ${A.tg?'checked':''} onchange="W3.s('tg',this.checked?1:0)"> Telegram channel (auto, Worker se)</label><label><input type="checkbox" style="width:auto" ${A.fb?'checked':''} onchange="W3.s('fb',this.checked?1:0)"> Facebook Page (auto, Worker se)</label>
<small>WhatsApp/Instagram/TikTok par app khuli ho to reminder aata hai, phir ek tap se share.</small><br><button class="btn" onclick="B.nt()">🔔 Reminder alerts on</button></details>
<details><summary>🌐 Free posting</summary><div class="row">${[['WhatsApp','wa'],['Facebook','fb'],['Telegram','tg'],['X','x']].map(([n,k])=>`<button class="btn" onclick="W3.go('${k}')">${n}</button>`).join('')}</div><div class="row">${[['FB Marketplace','https://www.facebook.com/marketplace/create'],['OLX Pakistan','https://www.olx.com.pk/'],['Google Business','https://business.google.com/'],['Instagram','https://www.instagram.com/'],['TikTok','https://www.tiktok.com/upload'],['Pinterest','https://www.pinterest.com/pin-builder/']].map(([n,u])=>`<a class="btn" href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</div></details>
<h4>Saved ads</h4>${S.ads.map((a,i)=>`<div class="msg"><b>${a.hl}</b> • ${[a.s1,a.s2,a.s3].filter(Boolean).join(', ')} • ${a.days} din ${a.tg?'• TG ':''}${a.fb?'• FB ':''}${ended(a)?'• ⏹ khatam':''}<br><button class="btn p" onclick="W3.now(${i})">📤</button><button class="btn" onclick="W3.ed(${i})">Edit</button><button class="btn" onclick="S.ads[${i}].active=!S.ads[${i}].active;sv();R()">${a.active?'ON':'OFF'}</button><button class="btn" onclick="S.ads[${i}].n=(S.ads[${i}].n||0)+1;sv();R()">✓ Posted ${a.n||0}</button><button class="btn" onclick="S.ads.splice(${i},1);sv();R()">✕</button></div>`).join('')||'Abhi koi ad save nahi'}
<button class="btn p" onclick="W3.push()">☁️ Auto-post queue cloud par bhejein</button>`}
/* ---- actions ---- */
const ended=a=>{let e=new Date(a.start||td());e.setDate(e.getDate()+a.days);return td()>e.toISOString().slice(0,10)};
const until=a=>{let e=new Date(a.start||td());e.setDate(e.getDate()+a.days);return e.toISOString().slice(0,10)};
W.pr=id=>{let p=S.p.find(x=>x.id==id);if(!p){A.pid=0;return R()}A.pid=id;A.hl=p.name;A.price=P(p.price);A.emo=C[p.cat][0];A.pic=p.img||'';A.sub=A.sub||'Best quality • Best price';W.cap()};
W.cap=()=>{let p=S.p.find(x=>x.id==A.pid);A.cap=`${A.hl}${A.price?' — '+A.price:''}\n${A.sub}\n📞 WhatsApp: ${A.ph}\n📍 ${A.loc} • ${A.tag}\n#Faisalabad #RoyalStore #Pakistan ${p?'#'+C[p.cat][1].replace(/\W+/g,''):'#Printing'}`;R()};
W.sz=k=>{A.sz=k;if(k!='cu'){A.w=SZ[k][1];A.h=SZ[k][2]}R()};
W.tp=n=>{A.tp=n;[A.c1,A.c2,A.tx,A.ac]=TP[n];R()};
W.up=i=>{let r=new FileReader();r.onload=()=>{A.pic=r.result;W.dr()};r.readAsDataURL(i.files[0])};
W.png=()=>{$('#adcv').toBlob(b=>{let a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='royal-ad.png';a.click()})};
W.share=async ad=>{let a=ad||A,c=document.createElement('canvas');await render(c,a);let bl=await new Promise(r=>c.toBlob(r,'image/jpeg',.9)),f=new File([bl],'royal-ad.jpg',{type:'image/jpeg'});
if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:a.cap})}catch(e){}return}
let l=document.createElement('a');l.href=URL.createObjectURL(bl);l.download='royal-ad.jpg';l.click();try{await navigator.clipboard.writeText(a.cap)}catch(e){}alert('Image download ho gayi aur caption copy ho gaya. Ab app mein post karein.')};
W.go=k=>{let t=encodeURIComponent(A.cap||A.hl),u=encodeURIComponent(location.href);open({wa:'https://wa.me/?text='+t,fb:'https://www.facebook.com/sharer/sharer.php?u='+u+'&quote='+t,tg:'https://t.me/share/url?url='+u+'&text='+t,x:'https://twitter.com/intent/tweet?text='+t}[k],'_blank')};
W.save=()=>{if(!A.hl)return alert('Pehle headline likhein');if(!A.cap)W.cap();let o=JSON.parse(JSON.stringify(A));o.start=o.start||td();let i=o.id?S.ads.findIndex(x=>x.id==o.id):-1;if(!o.id){o.id=Date.now();A.id=o.id}i<0?S.ads.unshift(o):S.ads[i]=o;sv();alert('Ad save ho gaya');R()};
W.ed=i=>{A=JSON.parse(JSON.stringify(S.ads[i]));R();scrollTo(0,0)};
W.now=i=>{W.share(S.ads[i])};
const hm=m=>{m%=1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
W.auto=()=>{let n=Math.min(10,Math.max(1,+prompt('Kitne products ke ads banayen? (1-10)',5)||0));if(!n)return;let t={};S.o.forEach(o=>o.items.forEach(i=>t[i.id]=(t[i.id]||0)+i.q));
let pool=S.p.filter(p=>!p.del&&p.stock>0).sort((a,b)=>(t[b.id]||0)-(t[a.id]||0)||b.stock-a.stock).slice(0,n),ks=Object.keys(TP);
pool.forEach((p,i)=>{let a=blank();a.id=Date.now()+i;a.pid=p.id;a.hl=p.name;a.price=P(p.price);a.emo=C[p.cat][0];a.pic=p.img||'';a.sub='Best quality • Best price';a.start=td();a.tp=ks[i%ks.length];[a.c1,a.c2,a.tx,a.ac]=TP[a.tp];a.s1=hm(540+i*10);a.s2=hm(840+i*10);a.s3=hm(1200+i*10);
let sv_=A;A=a;a.cap=`${a.hl} — ${a.price}\n${a.sub}\n📞 WhatsApp: ${a.ph}\n📍 ${a.loc} • ${a.tag}\n#Faisalabad #RoyalStore #Pakistan #${C[p.cat][1].replace(/\W+/g,'')}`;A=sv_;S.ads.push(a)});sv();alert(pool.length+' ads ban gaye (Saved ads mein dekhein)');R()};
/* ---- cloud auto-post queue ---- */
const base=()=>{try{return new URL(S.api).origin}catch(e){return ''}};
W.push=async()=>{let b=base();if(!b||!S.sk)return alert('Pehle Admin>Customize mein AI API URL aur Business>Settings mein Sync Key set karein');let out=[];
for(let a of S.ads.filter(x=>x.active&&(x.tg||x.fb)&&!ended(x))){let c=document.createElement('canvas');await render(c,a);out.push({id:a.id,cap:a.cap,img:c.toDataURL('image/jpeg',.8),slots:[a.s1,a.s2,a.s3].filter(Boolean),until:until(a),tg:!!a.tg,fb:!!a.fb})}
if(!out.length)return alert('Koi active ad nahi jis par Telegram/Facebook tick ho');
try{let r=await fetch(b+'/ads',{method:'POST',headers:{'x-key':S.sk},body:JSON.stringify(out)});alert(r.ok?out.length+' ads cloud queue mein gaye. Worker ab waqt par khud post karega.':'Fail: Worker mein worker-ads-snippet.js lagayi hai? Key sahi hai?')}catch(e){alert('Offline — baad mein dobara try karein')}};
/* ---- reminders (works while app/PWA is open) ---- */
function note(t,b){try{navigator.serviceWorker.ready.then(r=>r.showNotification(t,{body:b}))}catch(e){}}
function banner(i){let d=$('#adal');if(!d){d=document.createElement('div');d.id='adal';d.style.cssText='position:fixed;bottom:10px;left:10px;right:10px;z-index:9;background:var(--ac);color:#000;padding:10px;border-radius:10px;font-weight:700';document.body.appendChild(d)}
d.innerHTML=`📢 Ad ka waqt: ${S.ads[i].hl} <button class="btn p" onclick="W3.now(${i});this.parentNode.remove()">Share</button> <button class="btn" onclick="this.parentNode.remove()">✕</button>`}
setInterval(()=>{if(!S.ads)return;let n=new Date(),h=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0'),d=td();
S.ads.forEach((a,i)=>{if(!a.active||ended(a))return;[a.s1,a.s2,a.s3].forEach(s=>{let k=d+s;if(s&&s==h&&!(a.fired||{})[k]){a.fired=a.fired||{};a.fired[k]=1;sv();note('Royal Store Ad',a.hl);banner(i)}})})},20000);
/* ---- tab wiring ---- */
const _R=R;TABS.push(['ads','📢 Ads','اشتہارات']);
const nav=()=>TABS.map(t=>`<button class="${tab==t[0]?'on':''}" onclick="go('${t[0]}')">${S.ur?t[2]:t[1]}</button>`).join('');
R=function(){init();if(tab=='ads'){if(!B.au()&&!B.login())tab='shop';else if(!B.can('biz')){alert('Is section ki permission nahi');tab='shop'}}
if(tab=='ads'){tab='shop';_R();tab='ads';$('#nv').innerHTML=nav();$('#m').innerHTML=ui();W.dr()}else _R()};
init();R();
})();
