/* SCC v0.8.2 database stable hotfix
   - independent global database renderer
   - reliable left-nav switching
   - driver flags through country fallback
   - circuit race counts are unique races, not classes/entries
*/
(function(){
'use strict';
const $ = id => document.getElementById(id);
const E = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean = s => String(s || '').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const norm = s => clean(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,' ').trim().toLowerCase();
const pct = (a,b) => b ? Math.round((+a||0)*100/(+b||0)) + '%' : '—';
const localKeyCountries = 'scc_driver_countries_v082';
const localKeyDob = 'scc_driver_dobs_v082';

const EXTRA_COUNTRIES = {
  'tommaso mosca':'Italy','tomasso mosca':'Italy','alex aka':'Belgium','aaron muss':'Switzerland','alessandro ghiretti':'Italy',
  'ahmad al harthy':'Oman','benjamin lessennes':'Belgium','cedric sbirrazzuoli':'Monaco','gregoire saucy':'Switzerland',
  'daniel juncadella':'Spain','dani juncadella':'Spain','yasser shahin':'Australia','petru umbrarescu':'Romania',
  'alexander west':'Sweden','antalas au':'Hong Kong','antares au':'Hong Kong','tom van rompuy':'Belgium',
  'hadrien david':'France','alessio rovera':'Italy','maceo capietto':'France','paul loup chatin':'France',
  'will stevens':'United Kingdom','norman nato':'France','louis deletraz':'Switzerland','robin frijns':'Netherlands',
  'rene rast':'Germany','sheldon van der linde':'South Africa','kevin magnussen':'Denmark','raffaele marciello':'Switzerland',
  'dries vanthoor':'Belgium','harry tincknell':'United Kingdom','tom gamble':'United Kingdom','marco sorensen':'Denmark',
  'alex riberas':'Spain','mikkel sorensen':'Denmark','mikkel jensen':'Denmark','mattia drudi':'Italy',
  'michael christensen':'Denmark','ryan hardwick':'United States','zacharie robichon':'Canada','ian james':'United Kingdom',
  'nicky catsburg':'Netherlands','ben keating':'United States','jonny edgar':'United Kingdom','darren leung':'United Kingdom',
  'sean gelael':'Indonesia','augusto farfus':'Brazil','sebastien bourdais':'France','jenson button':'United Kingdom',
  'earl bamber':'New Zealand','alex lynn':'United Kingdom','andré lotterer':'Germany','andre lotterer':'Germany',
  'luis perez-companc':'Argentina','luis perez companc':'Argentina','jorge cabezas':'Ecuador','loris cabirou':'France',
  'david perel':'South Africa','adam smalley':'United Kingdom','matteo cairoli':'Italy','tom blomqvist':'United Kingdom'
};

function jsonGet(key){ try { return JSON.parse(localStorage.getItem(key)||'{}'); } catch { return {}; } }
function jsonSet(key,val){ try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){ console.warn('SCC DB local save failed', e); } }
function countryCode(c){
  if(!c) return '';
  const aliases = window.FLAG_ALIASES || {};
  return aliases[c] || aliases[clean(c)] || aliases[clean(c).toUpperCase()] || aliases[clean(c).toLowerCase()] || '';
}
function countryLabel(c){
  if(!c) return '';
  const cc = countryCode(c);
  const labels = {it:'Italy',fr:'France',gb:'United Kingdom',us:'United States',be:'Belgium',de:'Germany',es:'Spain',nl:'Netherlands',ch:'Switzerland',dk:'Denmark',se:'Sweden',no:'Norway',br:'Brazil',au:'Australia',za:'South Africa',pl:'Poland',jp:'Japan',cn:'China',ca:'Canada',om:'Oman',hk:'Hong Kong',ro:'Romania',pt:'Portugal',mx:'Mexico',fi:'Finland',at:'Austria',ar:'Argentina',ec:'Ecuador',id:'Indonesia',nz:'New Zealand'};
  return labels[cc] || clean(c);
}
function countryForDriver(name, supplied){
  const manual = jsonGet(localKeyCountries);
  const key = norm(name);
  const v = manual[key] || supplied || EXTRA_COUNTRIES[key] || (window.DRIVER_COUNTRIES && (DRIVER_COUNTRIES[key] || DRIVER_COUNTRIES[clean(name)])) || '';
  return countryLabel(v);
}
function flagFor(country){
  if(!country) return '';
  if(window.flag) return flag(country);
  const cc = countryCode(country);
  return cc ? `<span class="flag-mini">${cc.toUpperCase()}</span>` : '';
}
function dbRaces(){ return Array.isArray(window.RACES) ? window.RACES.filter(r => r && r.id) : []; }
function classPos(e){ return +(e.classPos ?? e.cpos ?? 0) || 0; }
function overallPos(e){ return +(e.pos ?? e.overallPos ?? 0) || 0; }
function isFinish(e){ const s=String(e.status||'FIN').toUpperCase(); return !['RET','DNF','DNS','DSQ','NC','NOT CLASSIFIED'].includes(s); }
function driverNames(e){ return (e.drivers||[]).map(d => Array.isArray(d) ? d[0] : d).map(clean).filter(Boolean); }
function driverCountryInEntry(e, i){ const d=(e.drivers||[])[i]; return Array.isArray(d) ? d[1] : ''; }
function ageFromDob(dob){ if(!dob) return ''; const d=new Date(dob+'T00:00:00'); if(isNaN(+d)) return ''; const n=new Date(); let a=n.getFullYear()-d.getFullYear(); const m=n.getMonth()-d.getMonth(); if(m<0 || (m===0 && n.getDate()<d.getDate())) a--; return a; }

function buildDriverDb(){
  const by = new Map();
  const dmanual = jsonGet(localKeyDob);
  for(const race of dbRaces()){
    const entries = Array.isArray(race.entries) ? race.entries : [];
    for(const entry of entries){
      driverNames(entry).forEach((name, i) => {
        const key = norm(name);
        if(!key) return;
        if(!by.has(key)) by.set(key, {key, name, country:'', dob:dmanual[key]||'', age:'', starts:0, finishes:0, overallWins:0, classWins:0, overallPodiums:0, classPodiums:0, ppOverall:0, ppClass:0, flOverall:0, flClass:0, series:new Map(), records:[], teams:new Set(), classes:new Set(), seen:new Set()});
        const rec = by.get(key);
        rec.country = countryForDriver(name, driverCountryInEntry(entry, i)) || rec.country;
        const unique = `${race.id}|${entry.no}|${entry.class||''}`;
        if(rec.seen.has(unique)) return;
        rec.seen.add(unique);
        rec.starts++;
        if(isFinish(entry)) rec.finishes++;
        const op = overallPos(entry), cp = classPos(entry);
        if(op === 1) rec.overallWins++;
        if(cp === 1) rec.classWins++;
        if(op > 0 && op <= 3) rec.overallPodiums++;
        if(cp > 0 && cp <= 3) rec.classPodiums++;
        rec.teams.add(entry.team||''); rec.classes.add(entry.class||'');
        const sid = race.series || 'unknown';
        if(!rec.series.has(sid)) rec.series.set(sid,{id:sid,starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,ppOverall:0,ppClass:0,flOverall:0,flClass:0});
        const s = rec.series.get(sid); s.starts++; if(isFinish(entry)) s.finishes++; if(op===1)s.overallWins++; if(cp===1)s.classWins++; if(op>0&&op<=3)s.overallPodiums++; if(cp>0&&cp<=3)s.classPodiums++;
        rec.records.push({race,entry,overallPos:op,classPos:cp});
      });
    }
    const addPerf = (items, kind) => (items||[]).forEach(p => {
      const key = norm(p.driver || ''); if(!by.has(key)) return;
      const rec = by.get(key), sid = race.series || 'unknown';
      const cls = norm(p.class||''); const overall = cls === 'overall' || cls === '';
      const prop = kind === 'pp' ? (overall?'ppOverall':'ppClass') : (overall?'flOverall':'flClass');
      rec[prop]++;
      if(!rec.series.has(sid)) rec.series.set(sid,{id:sid,starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,ppOverall:0,ppClass:0,flOverall:0,flClass:0});
      rec.series.get(sid)[prop]++;
    });
    addPerf(race.performance && race.performance.poles, 'pp');
    addPerf(race.performance && race.performance.fastestLaps, 'fl');
  }
  return [...by.values()].map(d=>{ d.age=ageFromDob(d.dob); d.finishPct=d.starts?Math.round(d.finishes*100/d.starts):0; d.seriesStats=[...d.series.values()].sort((a,b)=>b.starts-a.starts); d.records.sort((a,b)=>String(b.race.date||'').localeCompare(String(a.race.date||''))); return d; }).sort((a,b)=>b.starts-a.starts || a.name.localeCompare(b.name));
}
function seriesName(id){ return (window.SERIES && SERIES[id] && (SERIES[id].short || SERIES[id].name)) || id || '—'; }
function badge(cls){ return window.classBadge ? classBadge(cls) : E(cls||''); }
function logoCons(id){ return window.logo ? logo('constructor', id) : ''; }

function driverFilters(){ return window.state.driverFilters082 || (window.state.driverFilters082 = {q:'',country:'',series:'all',ageMin:'',ageMax:'',startsMin:'',winsMin:'',podiumsMin:'',ppMin:'',flMin:'',finishMin:''}); }
function applyDriverFilters(list){
  const f=driverFilters(); let out=[...list];
  const q=norm(f.q), cq=norm(f.country);
  if(q) out=out.filter(d => norm(`${d.name} ${[...d.teams].join(' ')}`).includes(q));
  if(cq) out=out.filter(d => norm(`${d.country} ${countryCode(d.country)}`).includes(cq));
  if(f.series && f.series !== 'all') out=out.filter(d => d.series.has(f.series));
  const numFilters = [['ageMin','age',1],['ageMax','age',-1],['startsMin','starts',1],['winsMin','classWins',1],['podiumsMin','classPodiums',1],['ppMin','ppClass',1],['flMin','flClass',1],['finishMin','finishPct',1]];
  for(const [k,prop,dir] of numFilters){ if(f[k]!=='' && f[k]!=null){ const v=+f[k]; if(!isNaN(v)) out=out.filter(d => dir>0 ? ((+d[prop]||0)>=v) : ((+d[prop]||0)<=v)); } }
  const sort = window.state.driverSort082 || {key:'starts', dir:'desc'};
  out.sort((a,b)=>{ let A=a[sort.key], B=b[sort.key]; if(sort.key==='name'||sort.key==='country'){ A=String(A||''); B=String(B||''); return sort.dir==='asc'?A.localeCompare(B):B.localeCompare(A); } A=+A||0; B=+B||0; return sort.dir==='asc'?A-B:B-A; });
  return out;
}
function sortBtn(label,key){ const s=window.state.driverSort082||{}; return `<button class="sort-head" data-sort082="${E(key)}">${E(label)}${s.key===key?(s.dir==='asc'?' ↑':' ↓'):''}</button>`; }
function dbCounts(){ return {drivers:buildDriverDb().length, teams:buildTeamDb().length, constructors:buildConstructorDb().length, circuits:buildCircuitDb().length, races:dbRaces().length}; }
function diag(){ const c=dbCounts(); return `<div class="db-diagnostics"><strong>Archive DB</strong><span>${c.races}</span><em>races</em><span>${c.drivers}</span><em>drivers</em><span>${c.teams}</span><em>teams</em><span>${c.constructors}</span><em>constructors</em><span>${c.circuits}</span><em>circuits</em><button id="rebuildDbBtn" class="mini-button">↻ Rebuild</button></div>`; }

function renderDrivers(){
  const all=buildDriverDb(); const f=driverFilters(); const drivers=applyDriverFilters(all);
  if(!window.state.selectedDriver082 && drivers[0]) window.state.selectedDriver082=drivers[0].key;
  const selected = drivers.find(d=>d.key===window.state.selectedDriver082) || all.find(d=>d.key===window.state.selectedDriver082) || drivers[0] || all[0];
  if(selected) window.state.selectedDriver082=selected.key;
  const seriesIds=['all',...[...new Set(dbRaces().map(r=>r.series).filter(Boolean))]];
  const rows=drivers.map((d,i)=>`<button class="driver-row db082-row ${selected&&selected.key===d.key?'active':''}" data-driver082="${E(d.key)}"><span>${i+1}</span><strong>${E(d.name)}</strong><span>${flagFor(d.country)} ${E(d.country||'—')}</span><span>${E(d.age||'—')}</span><span>${d.starts}</span><span>${d.overallWins}/${d.classWins}</span><span>${pct(d.overallWins+d.classWins,d.starts)}</span><span>${d.overallPodiums}/${d.classPodiums}</span><span>${pct(d.overallPodiums+d.classPodiums,d.starts)}</span><span>${d.ppOverall}/${d.ppClass}</span><span>${pct(d.ppOverall+d.ppClass,d.starts)}</span><span>${d.flOverall}/${d.flClass}</span><span>${pct(d.flOverall+d.flClass,d.starts)}</span><span>${d.finishPct}%</span></button>`).join('');
  const detail = selected ? driverDetail(selected) : '<aside class="db082-detail"><div class="empty-state">No driver selected.</div></aside>';
  $('dataManager').innerHTML = `${diag()}<div class="db082-layout"><section class="db082-list"><div class="db8-head"><h3>Drivers</h3><span>${drivers.length} / ${all.length}</span></div><div class="db8-filters"><input id="db082Search" placeholder="Name or team…" value="${E(f.q)}"><input id="db082Country" placeholder="Nationality…" value="${E(f.country)}"><select id="db082Series">${seriesIds.map(id=>`<option value="${E(id)}" ${(f.series||'all')===id?'selected':''}>${id==='all'?'All series':E(seriesName(id))}</option>`).join('')}</select><input id="db082AgeMin" type="number" placeholder="Age ≥" value="${E(f.ageMin)}"><input id="db082AgeMax" type="number" placeholder="Age ≤" value="${E(f.ageMax)}"><input id="db082StartsMin" type="number" placeholder="Starts ≥" value="${E(f.startsMin)}"><input id="db082WinsMin" type="number" placeholder="Wins ≥" value="${E(f.winsMin)}"><input id="db082PodiumsMin" type="number" placeholder="Podiums ≥" value="${E(f.podiumsMin)}"><input id="db082PpMin" type="number" placeholder="PP ≥" value="${E(f.ppMin)}"><input id="db082FlMin" type="number" placeholder="FL ≥" value="${E(f.flMin)}"><input id="db082FinishMin" type="number" placeholder="Finish % ≥" value="${E(f.finishMin)}"><button id="db082Clear" class="mini-button">Clear</button></div><div class="driver-row db082-head"><span>#</span>${sortBtn('Name','name')}${sortBtn('Nat.','country')}${sortBtn('Age','age')}${sortBtn('Starts','starts')}${sortBtn('Wins O/C','classWins')}<span>Win %</span>${sortBtn('Pod O/C','classPodiums')}<span>Pod %</span>${sortBtn('PP O/C','ppClass')}<span>PP %</span>${sortBtn('FL O/C','flClass')}<span>FL %</span>${sortBtn('Finish %','finishPct')}</div><div>${rows||'<div class="empty-state">No drivers match current filters.</div>'}</div></section>${detail}</div>`;
  bindDriverUi();
}
function driverDetail(d){
  const series=d.seriesStats.map(s=>`<div class="db082-series-card"><strong>${E(seriesName(s.id))}</strong><span>${s.starts} starts</span><span>W ${s.overallWins}/${s.classWins} · P ${s.overallPodiums}/${s.classPodiums}</span><span>PP ${s.ppOverall}/${s.ppClass} · FL ${s.flOverall}/${s.flClass}</span></div>`).join('');
  const hist=d.records.map(r=>`<div><span>${E(r.race.date||'')}</span><span>${E(seriesName(r.race.series))}</span><span>${E(r.race.event||'')}</span><span>${E(r.entry.team||'')}</span><span>${logoCons(r.entry.constructor)} ${E(r.entry.model||r.entry.constructor||'')}</span><span>${badge(r.entry.class)}</span><span>${r.overallPos?`P${r.overallPos}`:'—'}</span><span>${r.classPos?`C${r.classPos}`:'—'}</span></div>`).join('');
  return `<aside class="db082-detail"><section class="db082-profile"><div class="db8-avatar">${E(d.name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</div><div><h2>${E(d.name)} ${flagFor(d.country)}</h2><p>${E(d.country||'Unknown')} · Age ${E(d.age||'—')}</p><div class="db082-edit"><input id="db082EditCountry" placeholder="Nationality" value="${E(d.country||'')}"><input id="db082EditDob" type="date" value="${E(d.dob||'')}"><button id="db082SaveDriver" class="mini-button">Save</button></div></div></section><section class="db8-stats"><div class="db8-stat starts"><span>Starts</span><strong>${d.starts}</strong><small>${d.finishes} classified · ${d.finishPct}%</small></div><div class="db8-stat"><span>Wins</span><strong>${d.overallWins}</strong><em>overall</em><strong>${d.classWins}</strong><em>class</em></div><div class="db8-stat"><span>Podiums</span><strong>${d.overallPodiums}</strong><em>overall</em><strong>${d.classPodiums}</strong><em>class</em></div><div class="db8-stat"><span>PP</span><strong>${d.ppOverall}</strong><em>overall</em><strong>${d.ppClass}</strong><em>class</em></div><div class="db8-stat"><span>FL</span><strong>${d.flOverall}</strong><em>overall</em><strong>${d.flClass}</strong><em>class</em></div></section><h3>By series</h3><div class="db082-series-grid">${series||'<span class="muted">No series data.</span>'}</div><h3>Race history</h3><div class="db8-history db082-history"><div class="head"><span>Date</span><span>Series</span><span>Race</span><span>Team</span><span>Car</span><span>Class</span><span>Overall</span><span>Class</span></div>${hist||'<div class="empty-state">No race history.</div>'}</div></aside>`;
}
function bindDriverUi(){
  const map=[['db082Search','q'],['db082Country','country'],['db082Series','series'],['db082AgeMin','ageMin'],['db082AgeMax','ageMax'],['db082StartsMin','startsMin'],['db082WinsMin','winsMin'],['db082PodiumsMin','podiumsMin'],['db082PpMin','ppMin'],['db082FlMin','flMin'],['db082FinishMin','finishMin']];
  for(const [id,k] of map){ const el=$(id); if(!el) continue; const handler=()=>{ const pos=('selectionStart' in el)?el.selectionStart:null; driverFilters()[k]=el.value; renderDrivers(); const ne=$(id); if(ne){ ne.focus(); if(pos!=null) try{ne.setSelectionRange(pos,pos)}catch{} } }; el.oninput=handler; el.onchange=handler; }
  document.querySelectorAll('[data-driver082]').forEach(b=>b.onclick=()=>{window.state.selectedDriver082=b.dataset.driver082; renderDrivers();});
  document.querySelectorAll('[data-sort082]').forEach(b=>b.onclick=()=>{ const key=b.dataset.sort082; const cur=window.state.driverSort082||{}; window.state.driverSort082={key,dir:cur.key===key&&cur.dir==='desc'?'asc':'desc'}; renderDrivers(); });
  const clear=$('db082Clear'); if(clear) clear.onclick=()=>{window.state.driverFilters082={q:'',country:'',series:'all',ageMin:'',ageMax:'',startsMin:'',winsMin:'',podiumsMin:'',ppMin:'',flMin:'',finishMin:''}; renderDrivers();};
  const save=$('db082SaveDriver'); if(save) save.onclick=()=>{ const key=window.state.selectedDriver082; const cm=jsonGet(localKeyCountries), dm=jsonGet(localKeyDob); if($('db082EditCountry').value.trim()) cm[key]=$('db082EditCountry').value.trim(); else delete cm[key]; if($('db082EditDob').value) dm[key]=$('db082EditDob').value; else delete dm[key]; jsonSet(localKeyCountries,cm); jsonSet(localKeyDob,dm); renderDrivers(); };
  const rb=$('rebuildDbBtn'); if(rb) rb.onclick=()=>renderDataManager();
}
function buildTeamDb(){
  const m=new Map();
  for(const r of dbRaces()) for(const e of (r.entries||[])){ const k=norm(e.team||'Unknown'); if(!m.has(k))m.set(k,{name:e.team||'Unknown',races:new Set(),entries:0,series:new Set(),classes:new Set(),constructors:new Set()}); const x=m.get(k); x.races.add(r.id); x.entries++; if(r.series)x.series.add(r.series); if(e.class)x.classes.add(e.class); if(e.constructor)x.constructors.add(e.constructor); }
  return [...m.values()].sort((a,b)=>b.races.size-a.races.size||a.name.localeCompare(b.name));
}
function buildConstructorDb(){
  const m=new Map();
  for(const r of dbRaces()) for(const e of (r.entries||[])){ const id=norm(e.constructor||e.model||'unknown'); if(!m.has(id))m.set(id,{id:e.constructor||id,name:e.constructor||'Unknown',races:new Set(),entries:0,models:new Set(),classes:new Set(),series:new Set()}); const x=m.get(id); x.races.add(r.id); x.entries++; if(e.model)x.models.add(e.model); if(e.class)x.classes.add(e.class); if(r.series)x.series.add(r.series); }
  return [...m.values()].sort((a,b)=>b.races.size-a.races.size||a.name.localeCompare(b.name));
}
function buildCircuitDb(){
  const m=new Map();
  for(const r of dbRaces()){ const k=norm(r.circuit||r.event||'unknown'); if(!m.has(k))m.set(k,{name:r.circuit||r.event||'Unknown',country:r.country||'',raceIds:new Set(),series:new Set(),seasons:new Set(),first:'',last:''}); const x=m.get(k); x.raceIds.add(r.id); if(r.series)x.series.add(r.series); if(r.season)x.seasons.add(r.season); if(r.country)x.country=r.country; if(r.date){ if(!x.first||r.date<x.first)x.first=r.date; if(!x.last||r.date>x.last)x.last=r.date; } }
  return [...m.values()].sort((a,b)=>b.raceIds.size-a.raceIds.size||a.name.localeCompare(b.name));
}
function renderCardGrid(kind, items){
  let html = `${diag()}<section class="data-manager-panel"><div class="data-subhead"><h3>${E(kind)}</h3><span class="muted">${items.length}</span></div><div class="data-grid db082-card-grid">`;
  html += items.map(x=>{
    if(kind==='Circuits') return `<div class="data-card"><strong>${flagFor(x.country)} ${E(x.name)}</strong><span>${x.raceIds.size} race${x.raceIds.size===1?'':'s'}</span><em>${[...x.series].map(seriesName).join(' · ')}</em><em>${[...x.seasons].sort().join(', ')}</em><em>${E(x.first||'—')} → ${E(x.last||'—')}</em></div>`;
    if(kind==='Constructors') return `<div class="data-card"><div class="data-card-logo">${logoCons(x.id)}</div><strong>${E(x.name)}</strong><span>${x.raceIds?x.raceIds.size:x.races.size} race appearances · ${x.entries} entries</span><em>${[...x.classes].filter(Boolean).join(', ')}</em><em>${[...x.models].slice(0,5).join(', ')}</em></div>`;
    return `<div class="data-card"><strong>${E(x.name)}</strong><span>${x.races.size} race starts · ${x.entries} entries</span><em>${[...x.series].map(seriesName).join(' · ')}</em><em>${[...x.classes].filter(Boolean).join(', ')}</em><em>${[...x.constructors].filter(Boolean).join(', ')}</em></div>`;
  }).join('') + '</div></section>';
  $('dataManager').innerHTML=html;
  const rb=$('rebuildDbBtn'); if(rb) rb.onclick=()=>renderDataManager();
}
window.renderDataManager=function(){
  const el=$('dataManager'); if(!el) return;
  const tab=window.state.dataTab || 'drivers';
  document.querySelectorAll('.database-nav button,.data-tab').forEach(b=>b.classList.toggle('active',(b.dataset.dbTab||b.dataset.dataTab)===tab));
  if(tab==='teams') return renderCardGrid('Teams', buildTeamDb());
  if(tab==='constructors') return renderCardGrid('Constructors', buildConstructorDb());
  if(tab==='circuits') return renderCardGrid('Circuits', buildCircuitDb());
  return renderDrivers();
};
window.showSccDatabase=function(tab){ window.state.dataTab = tab || 'drivers'; document.querySelectorAll('.tab-content').forEach(s=>s.classList.remove('active')); $('tab-data')?.classList.add('active'); document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab==='data')); window.renderDataManager(); };
// disabled old DB click listener; v0.8.4 owns DB routing

function addCss(){
 const css = `.db082-layout{display:grid;grid-template-columns:minmax(760px,1fr) minmax(520px,42vw);gap:16px;align-items:start}.db082-list,.db082-detail{background:rgba(10,18,31,.82);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px}.db082-row,.db082-head{grid-template-columns:34px minmax(160px,1.25fr) minmax(120px,.9fr) 58px 68px 86px 64px 92px 64px 86px 64px 86px 64px 74px!important;font-size:13px}.db082-row{width:100%;border:0;background:transparent;color:inherit;cursor:pointer}.db082-row:hover,.db082-row.active{background:rgba(255,255,255,.06)}.db082-profile{display:flex;gap:14px;align-items:center;margin-bottom:14px}.db082-edit{display:flex;gap:8px;margin-top:8px}.db082-edit input{background:#0a1320;border:1px solid #26354a;color:#e7edf7;border-radius:9px;padding:7px}.db082-series-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.db082-series-card{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px;display:grid;gap:4px}.db082-history{overflow:auto}.db082-history>div{grid-template-columns:84px 82px minmax(150px,1.2fr) minmax(140px,1fr) minmax(150px,1fr) 90px 70px 70px}.db082-card-grid .data-card{min-height:130px}.db-diagnostics{display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:8px 10px;border-radius:12px;margin-bottom:10px}.db-diagnostics span{font-weight:800}.db-diagnostics em{font-style:normal;color:#9fb0c7;margin-right:6px}.flag-mini svg,.flag-inline svg{vertical-align:-2px}`;
 const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
}
function boot(){ document.title='SCC v0.8.2 · Database stable'; document.querySelectorAll('.brand span').forEach(x=>x.textContent='v0.8.2'); addCss(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
