/* DEPRECATED - superseded by patch-v085-database-polish.js. Left unwired (no <script> tag in
   index.html) because it was fighting patch-v085 for #dataManager: this file's boot() rendered
   directly into #dataManager and bound its own onclick on [data-db-tab]/[data-data-tab] buttons,
   racing v085's render/bindNav on every page load and intermittently showing this old db84- UI.
   Confirmed via repo-wide search that nothing outside this file calls its internals -
   window.openSccDatabase is assigned here but never invoked anywhere, and window.renderDataManager
   is reassigned by patch-v085 anyway. Safe to leave disabled; kept on disk for reference only. */
(function(){
'use strict';
const VERSION='v0.8.4';
function $(id){return document.getElementById(id)}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ')}
function key(s){return norm(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'unknown'}
function allRaces(){
  const arr=[];
  if(Array.isArray(window.RACES)) arr.push(...window.RACES);
  try{const saved=JSON.parse(localStorage.getItem('scc_saved_races_v081')||'[]'); if(Array.isArray(saved))arr.push(...saved);}catch{}
  const by=new Map();
  arr.filter(r=>r&&r.id).forEach(r=>by.set(r.id,r));
  return [...by.values()];
}
const countryAliases={
  italy:'Italy',italian:'Italy',ita:'Italy',it:'Italy',france:'France',french:'France',fra:'France',fr:'France',germany:'Germany',german:'Germany',deu:'Germany',ger:'Germany',de:'Germany',spain:'Spain',spanish:'Spain',esp:'Spain',es:'Spain',belgium:'Belgium',belgian:'Belgium',bel:'Belgium',be:'Belgium',netherlands:'Netherlands',dutch:'Netherlands',nld:'Netherlands',nl:'Netherlands',poland:'Poland',polish:'Poland',pol:'Poland',pl:'Poland',denmark:'Denmark',danish:'Denmark',dnk:'Denmark',dk:'Denmark',switzerland:'Switzerland',swiss:'Switzerland',che:'Switzerland',sui:'Switzerland',ch:'Switzerland',austria:'Austria',austrian:'Austria',aut:'Austria',at:'Austria',portugal:'Portugal',portuguese:'Portugal',prt:'Portugal',por:'Portugal',pt:'Portugal',unitedkingdom:'United Kingdom','united kingdom':'United Kingdom',britain:'United Kingdom',british:'United Kingdom',uk:'United Kingdom',gb:'United Kingdom',gbr:'United Kingdom',unitedstates:'United States','united states':'United States',usa:'United States',us:'United States',american:'United States',japan:'Japan',japanese:'Japan',jpn:'Japan',jp:'Japan',china:'China',chinese:'China',chn:'China',cn:'China',brazil:'Brazil',brazilian:'Brazil',bra:'Brazil',br:'Brazil',australia:'Australia',australian:'Australia',aus:'Australia',au:'Australia',canada:'Canada',canadian:'Canada',can:'Canada',ca:'Canada',oman:'Oman',omn:'Oman',om:'Oman',southafrica:'South Africa','south africa':'South Africa',rsa:'South Africa',zaf:'South Africa',za:'South Africa',turkey:'Turkey',turkish:'Turkey',tur:'Turkey',tr:'Turkey',russia:'Russia',russian:'Russia',rus:'Russia',ru:'Russia',belarus:'Belarus',blr:'Belarus',by:'Belarus',argentina:'Argentina',argentine:'Argentina',arg:'Argentina',ar:'Argentina',hongkong:'Hong Kong','hong kong':'Hong Kong',hkg:'Hong Kong',hk:'Hong Kong',ireland:'Ireland',irish:'Ireland',irl:'Ireland',ie:'Ireland',luxembourg:'Luxembourg',lux:'Luxembourg',lu:'Luxembourg',norway:'Norway',norwegian:'Norway',nor:'Norway',no:'Norway',sweden:'Sweden',swedish:'Sweden',swe:'Sweden',se:'Sweden'};
function canonicalCountry(c){const n=norm(c).replace(/\s+/g,' ');return countryAliases[n]||countryAliases[n.replace(/\s/g,'')]||String(c||'').trim()}
function flagHtml(country){
  const c=canonicalCountry(country);
  const code=(window.FLAG_ALIASES&&(window.FLAG_ALIASES[c]||window.FLAG_ALIASES[c?.toUpperCase?.()]||window.FLAG_ALIASES[String(country||'').trim()]||window.FLAG_ALIASES[String(country||'').trim().toUpperCase()]))||'';
  if(code&&window.SCC_FLAG_SVGS&&window.SCC_FLAG_SVGS[code]) return `<span class="flag-inline">${window.SCC_FLAG_SVGS[code]}</span>`;
  return `<span class="flag-inline flag-missing">·</span>`;
}
function dobStore(){try{return JSON.parse(localStorage.getItem('scc_driver_dobs_v082')||'{}')}catch{return {}}}
function countryStore(){try{return JSON.parse(localStorage.getItem('scc_driver_countries_v082')||'{}')}catch{return {}}}
function ageFromDob(dob){if(!dob)return ''; const d=new Date(dob); if(isNaN(d))return ''; const now=new Date(); let age=now.getFullYear()-d.getFullYear(); const m=now.getMonth()-d.getMonth(); if(m<0||(m===0&&now.getDate()<d.getDate()))age--; return age>=0&&age<100?String(age):''}
function classMeta(series,cls){const s=window.SERIES&&window.SERIES[series]; const m=s&&s.classes&&s.classes[cls]; return m||{short:cls||'—',color:'#303844',text:'#fff'};}
function classBadge(series,cls){const m=classMeta(series,cls); return `<span class="db84-class" style="background:${m.color};color:${m.text}">${esc(m.short||cls||'—')}</span>`}
function posVal(e){return Number(e.pos||e.overallPos||e.position||9999)}
function classPosVal(e){return Number(e.classPos||e.cpos||e.classPosition||9999)}
function isWinner(e){return posVal(e)===1}
function isClassWinner(e){return classPosVal(e)===1 || e.classWinner}
function isPodium(e){return posVal(e)<=3}
function isClassPodium(e){return classPosVal(e)<=3 || e.classPodium}
function statusOf(e){return String(e.status||'FIN').toUpperCase()}
function isFinished(e){return !/RET|DNF|DNS|DSQ|NC/.test(statusOf(e))}
function perfDriverSet(r,type,overall){
  const perf=r.performance;
  const items=Array.isArray(perf)?perf:[...(perf?.poles||[]),...(perf?.fastestLaps||[])];
  const arr=items.filter(p=>String(p.type||'').toUpperCase()===type);
  if(!arr.length)return new Set();
  return new Set(arr.filter(p=>overall ? (p.class==='Overall'||p.overall) : p.class && p.class!=='Overall').map(p=>key(p.driver||'')));
}
function buildDrivers(){
  const dobs=dobStore(), countries=countryStore();
  const m=new Map();
  for(const r of allRaces()){
    const raceId=r.id;
    const perfPPOverall=perfDriverSet(r,'PP',true), perfPPClass=perfDriverSet(r,'PP',false);
    const perfFLOverall=perfDriverSet(r,'FL',true), perfFLClass=perfDriverSet(r,'FL',false);
    for(const e of (r.entries||[])){
      const drivers=Array.isArray(e.drivers)?e.drivers:[];
      for(const d of drivers){
        const name=Array.isArray(d)?d[0]:d?.name||d;
        if(!name)continue;
        const k=key(name);
        const importedCountry=Array.isArray(d)?d[1]:d?.country||d?.nationality||'';
        if(!m.has(k))m.set(k,{key:k,name:String(name),country:'',dob:'',raceIds:new Set(),teamIds:new Set(),teams:new Set(),constructors:new Set(),series:new Map(),history:[],overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,ppOverall:0,ppClass:0,flOverall:0,flClass:0,finishes:0});
        const x=m.get(k);
        const c=canonicalCountry(countries[k]||importedCountry||x.country||''); if(c)x.country=c;
        if(dobs[k])x.dob=dobs[k];
        if(!x.raceIds.has(raceId)){x.raceIds.add(raceId);}
        x.teams.add(e.team||''); x.constructors.add(e.constructor||'');
        const ser=x.series.get(r.series)||{starts:new Set(),winsO:0,winsC:0,podO:0,podC:0,ppO:0,ppC:0,flO:0,flC:0};
        if(!ser.starts.has(raceId)){ser.starts.add(raceId);} x.series.set(r.series,ser);
        if(isWinner(e)){x.overallWins++;ser.winsO++} if(isClassWinner(e)){x.classWins++;ser.winsC++}
        if(isPodium(e)){x.overallPodiums++;ser.podO++} if(isClassPodium(e)){x.classPodiums++;ser.podC++}
        if(isFinished(e))x.finishes++;
        if(perfPPOverall.has(k)){x.ppOverall++;ser.ppO++} if(perfPPClass.has(k)){x.ppClass++;ser.ppC++}
        if(perfFLOverall.has(k)){x.flOverall++;ser.flO++} if(perfFLClass.has(k)){x.flClass++;ser.flC++}
        x.history.push({raceId,event:r.event,series:r.series,season:r.season,date:r.date,team:e.team,constructor:e.constructor,model:e.model,class:e.class,pos:posVal(e),classPos:classPosVal(e),status:statusOf(e)});
      }
    }
  }
  return [...m.values()].map(x=>{x.starts=x.raceIds.size; x.age=ageFromDob(x.dob); x.finishPct=x.starts?Math.round(100*x.finishes/x.starts):0; return x}).sort((a,b)=>b.starts-a.starts||a.name.localeCompare(b.name));
}
function buildTeams(){const m=new Map(); for(const r of allRaces())for(const e of (r.entries||[])){const k=key(e.team); if(!m.has(k))m.set(k,{name:e.team||'Unknown',races:new Set(),entries:0,series:new Set(),constructors:new Set()}); const x=m.get(k); x.races.add(r.id);x.entries++;x.series.add(r.series);x.constructors.add(e.constructor||'');} return [...m.values()].sort((a,b)=>b.races.size-a.races.size||a.name.localeCompare(b.name));}
function buildConstructors(){const m=new Map(); for(const r of allRaces())for(const e of (r.entries||[])){const id=e.constructor||'unknown';const k=key(id); if(!m.has(k))m.set(k,{id:k,name:(window.CONSTRUCTORS||[]).find(c=>c.id===id)?.name||id||'Unknown',races:new Set(),entries:0,series:new Set(),models:new Set()}); const x=m.get(k); x.races.add(r.id);x.entries++;x.series.add(r.series);x.models.add(e.model||'');} return [...m.values()].sort((a,b)=>b.races.size-a.races.size||a.name.localeCompare(b.name));}
function buildCircuits(){const m=new Map(); for(const r of allRaces()){const k=key(r.circuit||r.event); if(!m.has(k))m.set(k,{name:r.circuit||r.event,country:r.country||'',races:new Set(),series:new Set(),events:[]}); const x=m.get(k); x.races.add(r.id);x.series.add(r.series);x.events.push({id:r.id,season:r.season,series:r.series,event:r.event,date:r.date}); if(!x.country&&r.country)x.country=r.country;} return [...m.values()].sort((a,b)=>b.races.size-a.races.size||a.name.localeCompare(b.name));}
function diag(){const d=buildDrivers(), t=buildTeams(), c=buildConstructors(), ci=buildCircuits(), r=allRaces(); return `<div class="db84-diag"><b>Database</b><span>${r.length} races</span><span>${d.length} drivers</span><span>${t.length} teams</span><span>${c.length} constructors</span><span>${ci.length} circuits</span><button id="db84Rebuild">↻ Rebuild</button></div>`}
function pct(n,d){return d?Math.round(100*n/d)+'%':'—'}
function renderDrivers(){
  const el=$('dataManager'); if(!el)return;
  const filters=window.__db84Filters||(window.__db84Filters={q:'',country:'',series:'all',sort:'starts'});
  let list=buildDrivers();
  if(filters.q)list=list.filter(d=>norm(d.name+' '+[...d.teams].join(' ')).includes(norm(filters.q)));
  if(filters.country)list=list.filter(d=>norm(d.country).includes(norm(filters.country)));
  if(filters.series&&filters.series!=='all')list=list.filter(d=>d.series.has(filters.series));
  [['ageMin','age'],['startsMin','starts'],['winsMin','classWins'],['podiumsMin','classPodiums'],['ppMin','ppClass'],['flMin','flClass']].forEach(([f,k])=>{const v=Number(filters[f]||0); if(v)list=list.filter(d=>Number(d[k]||0)>=v)});
  const sort=filters.sort||'starts'; list.sort((a,b)=>(Number(b[sort]||0)-Number(a[sort]||0))||a.name.localeCompare(b.name));
  if(!window.__db84Selected || !list.some(d=>d.key===window.__db84Selected)) window.__db84Selected=list[0]?.key||'';
  const selected=buildDrivers().find(d=>d.key===window.__db84Selected)||list[0];
  const seriesOpts=['all',...new Set(buildDrivers().flatMap(d=>[...d.series.keys()]))];
  el.innerHTML=`${diag()}<div class="db84-layout"><section class="db84-list"><div class="db84-tools"><input id="db84Q" placeholder="Name / team…" value="${esc(filters.q)}"><input id="db84Country" placeholder="Nationality…" value="${esc(filters.country)}"><select id="db84Series">${seriesOpts.map(s=>`<option value="${esc(s)}" ${filters.series===s?'selected':''}>${s==='all'?'All series':esc((window.SERIES&&SERIES[s]?.short)||s)}</option>`).join('')}</select><select id="db84Sort"><option value="starts">Sort: starts</option><option value="classWins">Sort: wins</option><option value="classPodiums">Sort: podiums</option><option value="age">Sort: age</option><option value="ppClass">Sort: PP</option><option value="flClass">Sort: FL</option></select><input id="db84AgeMin" type="number" placeholder="Age ≥" value="${esc(filters.ageMin||'')}"><input id="db84StartsMin" type="number" placeholder="Starts ≥" value="${esc(filters.startsMin||'')}"><button id="db84Clear">Clear</button></div><div class="db84-row db84-head"><span>#</span><span>Name</span><span>Nat</span><span>Age</span><span>Starts</span><span>Wins O/C</span><span>Pod O/C</span><span>PP O/C</span><span>FL O/C</span></div><div class="db84-rows">${list.map((d,i)=>`<button class="db84-row ${selected&&selected.key===d.key?'active':''}" data-driver="${esc(d.key)}"><span>${i+1}</span><strong>${esc(d.name)}</strong><span>${flagHtml(d.country)} ${esc(d.country||'—')}</span><span>${esc(d.age||'—')}</span><span>${d.starts}</span><span>${d.overallWins}/${d.classWins}</span><span>${d.overallPodiums}/${d.classPodiums}</span><span>${d.ppOverall}/${d.ppClass}</span><span>${d.flOverall}/${d.flClass}</span></button>`).join('')||'<div class="empty-state">No drivers.</div>'}</div></section>${driverDetail(selected)}</div>`;
  const bind=(id,k)=>{const x=$(id); if(x){x.value=filters[k]||x.value||''; x.oninput=x.onchange=()=>{const pos=x.selectionStart; filters[k]=x.value; renderDrivers(); const n=$(id); if(n){n.focus(); try{n.setSelectionRange(pos,pos)}catch{}}}}};
  bind('db84Q','q');bind('db84Country','country');bind('db84Series','series');bind('db84Sort','sort');bind('db84AgeMin','ageMin');bind('db84StartsMin','startsMin');
  $('db84Clear')&&($('db84Clear').onclick=()=>{window.__db84Filters={q:'',country:'',series:'all',sort:'starts'};renderDrivers()});
  document.querySelectorAll('[data-driver]').forEach(b=>b.onclick=()=>{window.__db84Selected=b.dataset.driver;renderDrivers()});
  const save=$('db84Save'); if(save&&selected) save.onclick=()=>{const cs=countryStore(), ds=dobStore(); cs[selected.key]=$('db84EditCountry').value.trim(); ds[selected.key]=$('db84EditDob').value; localStorage.setItem('scc_driver_countries_v082',JSON.stringify(cs)); localStorage.setItem('scc_driver_dobs_v082',JSON.stringify(ds)); renderDrivers();};
  const rebuild=$('db84Rebuild'); if(rebuild)rebuild.onclick=renderDrivers;
}
function driverDetail(d){if(!d)return `<aside class="db84-detail"><div class="empty-state">No driver selected.</div></aside>`; const bySeries=[...d.series.entries()].map(([id,s])=>`<div class="db84-series-card"><b>${esc((window.SERIES&&SERIES[id]?.short)||id)}</b><span>${s.starts.size} starts</span><span>${s.winsO}/${s.winsC} wins O/C</span><span>${s.podO}/${s.podC} podiums O/C</span></div>`).join(''); const history=d.history.sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(h=>`<tr><td>${esc(h.date||h.season||'')}</td><td>${esc((window.SERIES&&SERIES[h.series]?.short)||h.series)}</td><td>${esc(h.event)}</td><td>${classBadge(h.series,h.class)}</td><td>${esc(h.team||'')}</td><td>${esc(h.constructor||'')}</td><td>P${isFinite(h.pos)?h.pos:'—'}</td><td>C${isFinite(h.classPos)?h.classPos:'—'}</td><td>${esc(h.status)}</td></tr>`).join(''); return `<aside class="db84-detail"><div class="db84-profile"><h3>${flagHtml(d.country)} ${esc(d.name)}</h3><div>${esc(d.country||'—')} · Age ${esc(d.age||'—')}</div><label>Nationality<input id="db84EditCountry" value="${esc(d.country||'')}"></label><label>DOB<input id="db84EditDob" type="date" value="${esc(d.dob||'')}"></label><button id="db84Save">Save</button></div><div class="db84-metrics"><div><b>${d.starts}</b><span>Starts</span></div><div><b>${d.overallWins}/${d.classWins}</b><span>Wins O/C</span></div><div><b>${pct(d.classWins,d.starts)}</b><span>Win % class</span></div><div><b>${d.overallPodiums}/${d.classPodiums}</b><span>Podiums O/C</span></div><div><b>${pct(d.classPodiums,d.starts)}</b><span>Podium % class</span></div><div><b>${d.ppOverall}/${d.ppClass}</b><span>PP O/C</span></div><div><b>${d.flOverall}/${d.flClass}</b><span>FL O/C</span></div><div><b>${d.finishPct}%</b><span>Finish %</span></div></div><h4>By series</h4><div class="db84-series-grid">${bySeries}</div><h4>Race history</h4><div class="db84-table-wrap"><table class="db84-history"><thead><tr><th>Date</th><th>Series</th><th>Race</th><th>Class</th><th>Team</th><th>Car</th><th>O</th><th>C</th><th>Status</th></tr></thead><tbody>${history}</tbody></table></div></aside>`}
function renderCardDb(kind){const el=$('dataManager'); if(!el)return; let items=[]; if(kind==='teams')items=buildTeams(); if(kind==='constructors')items=buildConstructors(); if(kind==='circuits')items=buildCircuits(); const title=kind[0].toUpperCase()+kind.slice(1); el.innerHTML=`${diag()}<section class="db84-card-section"><div class="db84-card-head"><h3>${title}</h3><span>${items.length}</span></div><div class="db84-grid">${items.map(x=>{const series=[...x.series].map(s=>(window.SERIES&&SERIES[s]?.short)||s).join(' · '); if(kind==='circuits')return `<div class="db84-card"><h3>${flagHtml(x.country)} ${esc(x.name)}</h3><p>${x.races.size} unique race${x.races.size===1?'':'s'}</p><em>${esc(series)}</em></div>`; if(kind==='constructors')return `<div class="db84-card"><div class="db84-logo">${window.logo?logo('constructor',x.id):''}</div><h3>${esc(x.name)}</h3><p>${x.races.size} races · ${x.entries} entries</p><em>${esc([...x.models].filter(Boolean).slice(0,4).join(', '))}</em><em>${esc(series)}</em></div>`; return `<div class="db84-card"><h3>${esc(x.name)}</h3><p>${x.races.size} races · ${x.entries} entries</p><em>${esc([...x.constructors].filter(Boolean).join(', '))}</em><em>${esc(series)}</em></div>`}).join('')}</div></section>`; const rb=$('db84Rebuild'); if(rb)rb.onclick=()=>renderDatabase(kind);}
function openDatabase(tab){window.state=window.state||{}; state.dataTab=tab||state.dataTab||'drivers'; document.querySelectorAll('.tab-content').forEach(s=>s.classList.remove('active')); const sec=$('tab-data'); if(sec)sec.classList.add('active'); document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab==='data')); document.querySelectorAll('[data-db-tab],[data-data-tab]').forEach(b=>b.classList.toggle('active',(b.dataset.dbTab||b.dataset.dataTab)===state.dataTab)); renderDatabase(state.dataTab);}
function renderDatabase(tab){tab=tab||state.dataTab||'drivers'; if(tab==='drivers')return renderDrivers(); return renderCardDb(tab);}
window.openSccDatabase=openDatabase; window.renderDataManager=()=>renderDatabase(state.dataTab||'drivers');
function bindDbNav(){document.querySelectorAll('[data-db-tab],[data-data-tab]').forEach(btn=>{btn.onclick=(ev)=>{ev.preventDefault(); ev.stopPropagation(); state.dataTab=btn.dataset.dbTab||btn.dataset.dataTab||'drivers'; openDatabase(state.dataTab); return false;};});}
function boot(){document.title='SCC v0.8.4 · Audit DB stable'; const brand=document.querySelector('.brand span'); if(brand)brand.textContent=VERSION; bindDbNav(); if($('dataManager'))renderDatabase(state?.dataTab||'drivers');}
document.addEventListener('DOMContentLoaded',boot); setTimeout(boot,50); setTimeout(bindDbNav,500);
})();
