/* SCC v0.8.6.12 · ACO/WEC importer pass
   - keeps v0.8.6.5/11 database UI foundation
   - importer workflow: Metadata → Results → FL/PP → Race control (no Entry List step)
   - prettier preview: drivers stacked with flags, model/constructor visible
   - PP parser for ACO Qualifying / Hyperpole / Starting Grid PDF text
   - result merge dedupes by car number; driver initials are resolved to full names when possible
   - Save to database persists imported race to localStorage and updates archive immediately
*/
(function(){
  const VERSION='v0.8.6.12';
  const STORE='sccSavedRaces.v0.8.6.12';
  const E = window.esc || (s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])));
  const $ = window.$ || (id=>document.getElementById(id));
  const stripAcc=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  const norm=s=>(window.normalizeDriverName?window.normalizeDriverName(s):stripAcc(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim());
  const classCanon=c=>{c=String(c||'').toUpperCase().replace(/\s+/g,''); if(c==='HYPERCAR'||c==='HY')return'HYP'; if(c==='LMGT3'||c==='GT3')return'LMGT3'; if(c==='LMP2PA'||c==='LMP2P/A')return'LMP2PA'; return c||'Overall'};
  const constructorFrom=(s)=> window.constructorFromVehicle?constructorFromVehicle(s):clean(s).split(/\s+/)[0].toLowerCase();
  const countryFor=(name,fallback='')=> (window.lookupDriverCountry&&lookupDriverCountry(name)) || (window.DRIVER_COUNTRY_DB&&DRIVER_COUNTRY_DB[norm(name)]) || fallback || '';
  const flagFor=(country)=> country && window.flag ? flag(country) : '';
  const titleName=s=>clean(s).toLowerCase().replace(/(^|[\s'\-])([a-záéíóúýčďěňřšťžüöäøåæœ])/g,(m,a,b)=>a+b.toUpperCase()).replace(/\bMacdonald\b/g,'MacDonald').replace(/\bMcdonald\b/g,'McDonald').replace(/\bDi\b/g,'di').replace(/\bDe\b/g,'de').replace(/\bVan\b/g,'van').replace(/\bDer\b/g,'der');
  function driverNameUniverse(){
    const names=new Map();
    function add(n){n=clean(n); if(n&&!/driver name|unknown|upload/i.test(n)) names.set(norm(n),n);}
    try{(window.DRIVER_MASTER?.drivers||[]).forEach(d=>add(d.name));}catch{}
    try{(window.RACES||[]).forEach(r=>(r.entries||[]).forEach(e=>(e.drivers||[]).forEach(d=>add(Array.isArray(d)?d[0]:d))));}catch{}
    try{Object.keys(window.DRIVER_COUNTRY_DB||{}).forEach(k=>add(k));}catch{}
    return [...names.values()];
  }
  function initialAliasMap(){
    const map=new Map();
    driverNameUniverse().forEach(full=>{
      const bits=stripAcc(full).split(/\s+/).filter(Boolean); if(bits.length<2)return;
      const surname=bits[bits.length-1].toLowerCase(); const first=bits[0][0]?.toLowerCase();
      if(first&&surname) map.set(`${first}.${surname}`,full);
      // common names with particles: P. DI RESTA, S. VAN DER LINDE
      const tail=bits.slice(1).join(' ').toLowerCase(); if(first&&tail) map.set(`${first}.${tail}`,full);
    });
    return map;
  }
  function expandDriverName(raw){
    raw=clean(raw).replace(/\s*\.\s*/g,'. ').replace(/\s+/g,' '); if(!raw)return'';
    const m=stripAcc(raw).match(/^([A-Z])\.\s+(.+)$/i);
    if(m){const key=`${m[1].toLowerCase()}.${m[2].toLowerCase().replace(/\s+/g,' ')}`; const hit=initialAliasMap().get(key); if(hit)return hit;}
    return titleName(raw);
  }
  function splitDrivers(raw){
    return clean(raw).split(/\s*\/\s*|\s*\|\s*|\s*;\s*/).map(expandDriverName).filter(Boolean);
  }
  function normalizeEntry(e){
    const drivers=(e.drivers||[]).map(d=>Array.isArray(d)?d[0]:d).filter(Boolean).map(expandDriverName);
    const unique=[]; const seen=new Set(); drivers.forEach(d=>{const k=norm(d); if(!seen.has(k)){seen.add(k);unique.push([d,countryFor(d)]);}});
    const cls=classCanon(e.class||e.cat||e.category);
    const model=clean(e.model||e.vehicle||e.carModel||e.car||'');
    return {...e,no:String(e.no||e.number||e.car||'').trim(),class:cls,constructor:e.constructor||constructorFrom(model||e.team||''),model,drivers:unique};
  }
  function dedupeEntries(entries){
    const byNo=new Map();
    (entries||[]).map(normalizeEntry).filter(e=>e.no).forEach(e=>{
      const key=String(e.no);
      const old=byNo.get(key);
      if(!old){byNo.set(key,e);return;}
      byNo.set(key,{...old,...e,drivers:e.drivers?.length?e.drivers:old.drivers,pos:e.pos||old.pos,class:e.class||old.class,model:e.model||old.model,constructor:e.constructor||old.constructor,team:e.team||old.team,laps:e.laps||old.laps,time:e.time||old.time,status:e.status||old.status,gap:e.gap||old.gap});
    });
    return [...byNo.values()].sort((a,b)=>(+a.pos||999)-(+b.pos||999));
  }
  function pdfBody(text){return String(text||'').replace(/\r/g,'').split('\n').slice(1).join('\n');}
  function isPdf(text){return /^\[SCC_PDF_TEXT:/i.test(String(text||'').trim());}
  function textFor(type){return type==='results'?$('resultsCsv')?.value||'':type==='performance'?$('performanceCsv')?.value||'':type==='raceControl'?$('raceControlCsv')?.value||'':type==='entry'?$('entryCsv')?.value||'':'';}
  function rowsFor(type){
    const text=textFor(type);
    if(type==='results') return parseResults(text);
    if(type==='performance') return parsePerformance(text);
    return window.importRows?window.importRows(type):[];
  }
  function parseResults(text){
    let rows=[];
    if(isPdf(text)){
      try{ if(window.parseWecFinalClassificationPdf) rows=parseWecFinalClassificationPdf('results',text)||[]; }catch{}
      if(!rows.length && window.rowsFromPdfText) try{ rows=rowsFromPdfText('results',text)||[]; }catch{}
    } else if(window.parseCsv) rows=parseCsv(text)||[];
    return dedupeEntries((window.rowsToEntries?rowsToEntries(rows):rows).map(r=>{
      if(r.drivers && Array.isArray(r.drivers)) return r;
      return normalizeEntry(r);
    }));
  }
  function firstDriverFromLine(line){
    const names=[]; const re=/([A-ZÀ-Ž])\.\s*([A-ZÀ-Ž][A-ZÀ-Ž'\-]+(?:\s+(?:DA|DE|DEL|DI|DOS|DU|VAN|VAN DER|DER|LA|LE)\s+[A-ZÀ-Ž][A-ZÀ-Ž'\-]+)?)/g; let m;
    while((m=re.exec(stripAcc(line).toUpperCase()))){names.push(expandDriverName(`${m[1]}. ${m[2]}`));}
    return names[0]||'';
  }
  function timeFrom(line){const a=[...line.matchAll(/\b\d{1,2}:\d{2}\.\d{3}\b/g)].map(m=>m[0]); return a[a.length-1]||'';}
  function parseQualifyingPp(text){
    const body=isPdf(text)?pdfBody(text):String(text||'');
    const lines=body.split('\n').map(l=>clean(l)).filter(Boolean);
    const candidates=[];
    for(const line of lines){
      if(!/\b(HYPERCAR|LMGT3|HYP|LMP2|LMP3)\b/i.test(line) || !/\b\d{1,2}:\d{2}\.\d{3}\b/.test(line)) continue;
      let pos='', no='';
      let m=line.match(/^(\d+)\s+(\d{1,3}|0\d{2})\s+/); // normal classification
      if(m){pos=+m[1];no=m[2];}
      if(!m){m=line.match(/\s(\d+)\s+(\d{1,3}|0\d{2})\s+[^\n]*\b(HYPERCAR|LMGT3|HYP|LMP2|LMP3)\b/i); if(m){pos=+m[1];no=m[2];}}
      if(!no) continue;
      const clsMatch=line.match(/\b(HYPERCAR|LMGT3|HYP|LMP2|LMP3)\b/i); const cls=classCanon(clsMatch&&clsMatch[1]);
      const driver=firstDriverFromLine(line); const time=timeFrom(line); if(!time)continue;
      candidates.push({type:'PP',class:cls,no:String(no),driver,lap:'',time,pos:pos||candidates.length+1,source:'qualifying'});
    }
    if(!candidates.length) return [];
    candidates.sort((a,b)=>(+a.pos||999)-(+b.pos||999));
    const bestByClass=new Map(); candidates.forEach(x=>{if(!bestByClass.has(x.class))bestByClass.set(x.class,x);});
    const out=[]; const overall=candidates[0]; if(overall) out.push({...overall,class:'Overall'});
    bestByClass.forEach(v=>out.push(v));
    const seen=new Set(); return out.filter(x=>{const k=x.type+'|'+x.class+'|'+x.no; if(seen.has(k))return false; seen.add(k); return true;});
  }
  function parseFlFromResults(text){
    const entries=parseResults(text), byClass=new Map(); let best=null;
    entries.forEach(e=>{const t=e.bestLap||e.bestlap||e.best_lap||''; if(!t)return; const p={type:'FL',class:e.class,no:e.no,driver:(e.drivers?.[0]?.[0]||''),lap:e.bestLapNo||e.bestlapno||'',time:t}; if(!best||p.time<best.time)best=p; if(!byClass.has(e.class)||p.time<byClass.get(e.class).time)byClass.set(e.class,p);});
    const out=[]; if(best)out.push({...best,class:'Overall'}); byClass.forEach(v=>out.push(v)); return out;
  }
  function parsePerformance(text){
    let rows=[];
    if(isPdf(text)){
      const body=pdfBody(text);
      if(/qualifying|hyperpole|starting grid|final starting grid/i.test(body)) rows=parseQualifyingPp(text);
      if(!rows.length && /Final\s+Classification|Race/i.test(body)) rows=parseFlFromResults(text);
      if(!rows.length && window.rowsFromPdfText) try{rows=rowsFromPdfText('performance',text)||[];}catch{}
    } else {
      rows=(window.parseCsv?parseCsv(text):[]).map(r=>({type:String(r.type||r.kind||'FL').toUpperCase().includes('P')?'PP':'FL',class:classCanon(r.class||r.category||'Overall'),no:String(r.no||r.number||r.car||'').trim(),driver:expandDriverName(r.driver||r.name||r.driver1||''),lap:r.lap||'',time:r.time||r.laptime||r.bestlap||''}));
    }
    return rows.map(p=>({...p,class:classCanon(p.class),driver:expandDriverName(p.driver||''),no:String(p.no||'').trim()})).filter(p=>p.time||p.no||p.driver);
  }
  function driverStack(drivers){
    if(!drivers?.length)return '<span class="muted">drivers missing</span>';
    return `<div class="aco-driver-stack">${drivers.map(d=>{const n=Array.isArray(d)?d[0]:d,c=Array.isArray(d)?d[1]:countryFor(n);return `<div>${flagFor(c)}<span>${E(n)}</span></div>`}).join('')}</div>`;
  }
  function previewResults(entries){
    const classes=[...new Set(entries.map(e=>e.class).filter(Boolean))];
    return `<div class="import-ok"><b>${entries.length}</b> cars · ${classes.map(c=>E(c)).join(', ')} · deduped by car number</div><div class="aco-preview-table"><div class="head"><span>Pos</span><span>No</span><span>Class</span><span>Team</span><span>Car</span><span>Drivers</span><span>Status</span></div>${entries.slice(0,40).map(e=>`<div><b>P${E(e.pos||'')}</b><b>#${E(e.no)}</b><span>${window.classBadge?classBadge(e.class):E(e.class)}</span><span>${E(e.team||'')}</span><span>${E(e.model||e.constructor||'')}</span>${driverStack(e.drivers)}<span>${E(e.status||'')}</span></div>`).join('')}</div>`;
  }
  function previewPerf(rows){
    const pp=rows.filter(x=>x.type==='PP'), fl=rows.filter(x=>x.type!=='PP');
    return `<div class="import-ok">${pp.length} PP · ${fl.length} FL</div><div class="aco-perf-list">${rows.map(p=>`<div><span class="pill">${E(p.type)}</span><span>${E(p.class)}</span><b>#${E(p.no)}</b><span>${flagFor(countryFor(p.driver))}${E(p.driver||'')}</span><strong>${E(p.time||'—')}</strong></div>`).join('')}</div>`;
  }
  const oldPreview=window.previewCsv;
  window.previewCsv=function(type){
    const el= type==='results'?$('resultsPreview'):type==='performance'?$('performancePreview'):type==='raceControl'?$('raceControlPreview'):$('entryPreview');
    if(!el)return oldPreview&&oldPreview(type);
    if(type==='results'){
      const entries=rowsFor('results');
      el.innerHTML=entries.length?previewResults(entries):'<div class="empty-state">No ACO result rows detected. Use Race / Final Classification PDF or CSV.</div>';
      window.renderImportChecklist&&renderImportChecklist(); return;
    }
    if(type==='performance'){
      const rows=rowsFor('performance');
      el.innerHTML=rows.length?previewPerf(rows):'<div class="empty-state">No PP/FL rows detected. Use Qualifying / Hyperpole for PP, Race Classification for FL.</div>';
      window.renderImportChecklist&&renderImportChecklist(); return;
    }
    return oldPreview?oldPreview(type):undefined;
  };
  window.importResultsCsv=function(){
    const entries=rowsFor('results'); if(!entries.length)return alert('No result rows detected.');
    state.race.entries=dedupeEntries(entries); if(window.learnDriverCountries)learnDriverCountries(state.race.entries); if(window.recalculateClassPositions)recalculateClassPositions();
    render(); alert(`${state.race.entries.length} cars imported from results. Duplicates by car number were merged.`);
  };
  window.importPerformanceCsv=function(){
    const perf=rowsFor('performance'); if(!perf.length)return alert('No PP/FL rows detected.');
    state.race.performance=state.race.performance||{};
    const merge=(oldRows,newRows)=>{const m=new Map(); (oldRows||[]).concat(newRows||[]).forEach(p=>{const k=[p.type,p.class,p.no,p.time].join('|'); if(p.time||p.no)m.set(k,p);}); return [...m.values()];};
    const pp=perf.filter(p=>p.type==='PP'), fl=perf.filter(p=>p.type!=='PP');
    if(pp.length) state.race.performance.poles=merge(state.race.performance.poles,pp);
    if(fl.length) state.race.performance.fastestLaps=merge(state.race.performance.fastestLaps,fl);
    render(); alert(`${pp.length} pole-position and ${fl.length} fastest-lap rows imported.`);
  };
  function savedRaces(){try{return JSON.parse(localStorage.getItem(STORE)||'[]')}catch{return[]}}
  function writeSaved(arr){localStorage.setItem(STORE,JSON.stringify(arr));}
  function mergeSaved(){const arr=savedRaces(); if(!Array.isArray(arr)||!arr.length||!window.RACES)return; arr.forEach(r=>{const i=RACES.findIndex(x=>x.id===r.id); if(i>=0)RACES[i]=r; else RACES.push(r);});}
  function commitRace(){
    if(!state.race?.id)return alert('Missing race ID.');
    const copy=structuredClone(state.race); copy.entries=dedupeEntries(copy.entries||[]); copy.completeness=copy.completeness||{}; copy.completeness.results=!!copy.entries.length; copy.completeness.poles=!!copy.performance?.poles?.length; copy.completeness.fastestLaps=!!copy.performance?.fastestLaps?.length;
    const i=RACES.findIndex(r=>r.id===copy.id); if(i>=0)RACES[i]=copy; else RACES.push(copy);
    const saved=savedRaces().filter(r=>r.id!==copy.id); saved.push(copy); writeSaved(saved);
    window.sccLearnArchiveCountries?.(); window.buildRaceTree?.(); window.buildRaceSelectors?.(); window.renderRaceTree?.(); window.renderImportChecklist?.();
    const st=$('commitRaceStatus')||$('saveRaceStatus'); if(st)st.innerHTML=`✓ Saved permanently in browser storage · ${copy.entries.length} cars · ${copy.performance?.poles?.length||0} PP · ${copy.performance?.fastestLaps?.length||0} FL`;
    alert(`Saved to database: ${copy.event||copy.id}\n${copy.entries.length} cars, ${copy.performance?.poles?.length||0} PP, ${copy.performance?.fastestLaps?.length||0} FL.`);
  }
  const oldChecklist=window.renderImportChecklist;
  window.renderImportChecklist=function(){
    if(oldChecklist)oldChecklist();
    const el=$('importChecklist'); if(!el)return;
    if(!$('commitRaceBtn')) el.insertAdjacentHTML('beforeend',`<div class="import-commit-box"><button id="commitRaceBtn">Save to database</button><span id="commitRaceStatus" class="muted">Persists current imported race in this browser and updates the archive immediately.</span></div>`);
    const b=$('commitRaceBtn'); if(b)b.onclick=commitRace;
  };
  function patchImportCopy(){
    const intro=document.querySelector('#tab-import .import-panel>p.muted'); if(intro)intro.textContent='Import ACO/WEC race data from Al Kamel Results / Qualifying / Hyperpole PDFs, CSV or JSON. Entry List is intentionally skipped: SCC builds the archive from official classification, FL/PP and Race Control sources.';
    const h=document.querySelector('#tab-import .wizard-card:nth-of-type(3) h3'); if(h)h.textContent='3 · FL / PP / Qualifying';
  }
  function addCss(){
    if(document.getElementById('acoImporterCss'))return; const s=document.createElement('style'); s.id='acoImporterCss'; s.textContent=`
    .aco-preview-table{display:grid;gap:4px;margin-top:10px;overflow:auto}.aco-preview-table>div{display:grid;grid-template-columns:58px 52px 86px minmax(150px,1fr) minmax(150px,1fr) minmax(190px,1.2fr) 95px;gap:8px;align-items:center;padding:7px 8px;border-bottom:1px solid rgba(255,255,255,.07)}.aco-preview-table .head{font-size:11px;text-transform:uppercase;color:#9fb0c7;font-weight:800;background:rgba(255,255,255,.04);border-radius:8px}.aco-driver-stack{display:grid;gap:3px}.aco-driver-stack>div{display:flex;gap:6px;align-items:center;white-space:nowrap}.aco-perf-list{display:grid;gap:4px;margin-top:8px}.aco-perf-list>div{display:grid;grid-template-columns:48px 80px 54px minmax(170px,1fr) 90px;gap:8px;align-items:center;padding:7px 8px;border-bottom:1px solid rgba(255,255,255,.07)}.import-ok{padding:8px 10px;background:rgba(34,197,94,.10);border:1px solid rgba(34,197,94,.25);border-radius:10px;margin-top:8px}.pill{display:inline-flex;justify-content:center;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:2px 7px;font-weight:900}.import-commit-box{margin-top:12px;padding:10px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(255,255,255,.045);display:grid;gap:6px}`; document.head.appendChild(s);
  }
  function boot(){
    document.title='SCC v0.8.6.12 · ACO importer pass'; document.querySelectorAll('.brand span,.version,.app-version,[data-version]').forEach(el=>el.textContent=VERSION); document.body.dataset.sccVersion='0.8.6.12';
    addCss(); mergeSaved(); patchImportCopy(); setTimeout(()=>{patchImportCopy(); window.renderImportChecklist&&renderImportChecklist();},80);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot); else boot();
})();
