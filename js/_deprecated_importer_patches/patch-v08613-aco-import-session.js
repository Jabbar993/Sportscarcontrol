/* SCC v0.8.6.13 · ACO import session
   Actual scope:
   - multi-PDF session for ACO/WEC import, especially two Hyperpole PDFs (HYP + LMGT3)
   - visible confirmation that PDFs were read and whether data was detected for Results / FL / PP
   - keeps Entry List out of workflow
   - keeps v0.8.6.5/11 database view foundation and v0.8.6.12 ACO preview styling
*/
(function(){
  const VERSION='v0.8.6.13';
  const STORE='sccSavedRaces.v0.8.6.13';
  const E = window.esc || (s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])));
  const $ = window.$ || (id=>document.getElementById(id));
  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  const stripAcc=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const norm=s=>stripAcc(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const classCanon=c=>{c=String(c||'').toUpperCase().replace(/\s+/g,''); if(c==='HYPERCAR'||c==='HY')return'HYP'; if(c==='GT3'||c==='LMGT3')return'LMGT3'; if(c==='LMP2P/A'||c==='LMP2PA')return'LMP2PA'; return c||'Overall'};
  const pdfWrap=(type,name,txt)=>`[SCC_PDF_TEXT:${type}] ${name}\n${txt||''}`;
  const isPdfText=t=>/^\[SCC_PDF_TEXT:/i.test(String(t||'').trim());
  const pdfBody=t=>String(t||'').replace(/\r/g,'').split('\n').slice(1).join('\n');
  const constructorFrom=s=> window.constructorFromVehicle?constructorFromVehicle(s):clean(s).split(/\s+/)[0].toLowerCase();
  const countryFor=(name,fallback='')=> (window.lookupDriverCountry&&lookupDriverCountry(name)) || (window.DRIVER_COUNTRY_DB&&DRIVER_COUNTRY_DB[norm(name)]) || fallback || '';
  const flagFor=country=> country && window.flag ? flag(country) : '';
  const titleName=s=>clean(s).toLowerCase().replace(/(^|[\s'\-])([a-záéíóúýčďěňřšťžüöäøåæœ])/g,(m,a,b)=>a+b.toUpperCase()).replace(/\bMacdonald\b/g,'MacDonald').replace(/\bMcdonald\b/g,'McDonald').replace(/\bDi\b/g,'di').replace(/\bDe\b/g,'de').replace(/\bVan\b/g,'van').replace(/\bDer\b/g,'der');

  const session = window.acoImportSession = window.acoImportSession || {results:[],performance:[],raceControl:[]};

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
      const first=bits[0][0]?.toLowerCase(); const tail=bits.slice(1).join(' ').toLowerCase(); const surname=bits[bits.length-1].toLowerCase();
      if(first&&surname) map.set(`${first}.${surname}`,full);
      if(first&&tail) map.set(`${first}.${tail}`,full);
    });
    return map;
  }
  function expandDriverName(raw){
    raw=clean(raw).replace(/\s*\.\s*/g,'. ').replace(/\s+/g,' '); if(!raw)return'';
    const m=stripAcc(raw).match(/^([A-Z])\.\s+(.+)$/i);
    if(m){const hit=initialAliasMap().get(`${m[1].toLowerCase()}.${m[2].toLowerCase().replace(/\s+/g,' ')}`); if(hit)return hit;}
    return titleName(raw);
  }
  function normalizeEntry(e){
    const drivers=(e.drivers||[]).map(d=>Array.isArray(d)?d[0]:d).filter(Boolean).map(expandDriverName);
    const unique=[]; const seen=new Set(); drivers.forEach(d=>{const k=norm(d); if(!seen.has(k)){seen.add(k);unique.push([d,countryFor(d)]);}});
    const cls=classCanon(e.class||e.cat||e.category);
    const model=clean(e.model||e.vehicle||e.carModel||e.car||'');
    return {...e,no:String(e.no||e.number||e.car||'').trim(),class:cls,constructor:e.constructor||constructorFrom(model||e.team||''),model,drivers:unique};
  }
  function dedupeEntries(entries){
    const byKey=new Map();
    (entries||[]).map(normalizeEntry).filter(e=>e.no).forEach(e=>{
      const key=[String(e.no),e.class||''].join('|');
      const old=byKey.get(key);
      if(!old){byKey.set(key,e);return;}
      byKey.set(key,{...old,...e,drivers:e.drivers?.length?e.drivers:old.drivers,pos:e.pos||old.pos,class:e.class||old.class,model:e.model||old.model,constructor:e.constructor||old.constructor,team:e.team||old.team,laps:e.laps||old.laps,time:e.time||old.time,status:e.status||old.status,gap:e.gap||old.gap});
    });
    return [...byKey.values()].sort((a,b)=>(+a.pos||999)-(+b.pos||999));
  }
  function parseResultsText(text){
    let rows=[];
    if(isPdfText(text)){
      try{ if(window.parseWecFinalClassificationPdf) rows=window.parseWecFinalClassificationPdf('results',text)||[]; }catch{}
      if(!rows.length && window.rowsFromPdfText) try{ rows=window.rowsFromPdfText('results',text)||[]; }catch{}
    } else if(window.parseCsv) rows=window.parseCsv(text)||[];
    const entries=(window.rowsToEntries?window.rowsToEntries(rows):rows).map(normalizeEntry);
    return dedupeEntries(entries);
  }
  function allResults(){
    const sources=session.results?.length?session.results:[{name:'paste area',text:$('resultsCsv')?.value||'',kind:'text'}];
    return dedupeEntries(sources.flatMap(s=>parseResultsText(s.text)));
  }
  function firstDriverFromLine(line){
    const names=[]; const re=/([A-ZÀ-Ž])\.\s*([A-ZÀ-Ž][A-ZÀ-Ž'\-]+(?:\s+(?:DA|DE|DEL|DI|DOS|DU|VAN|VAN DER|DER|LA|LE)\s+[A-ZÀ-Ž][A-ZÀ-Ž'\-]+)?)/g; let m;
    while((m=re.exec(stripAcc(line).toUpperCase()))){names.push(expandDriverName(`${m[1]}. ${m[2]}`));}
    return names[0]||'';
  }
  function timeFrom(line){const a=[...line.matchAll(/\b\d{1,2}:\d{2}\.\d{3}\b/g)].map(m=>m[0]); return a[a.length-1]||'';}
  function parseQualifyingPp(text){
    const body=isPdfText(text)?pdfBody(text):String(text||'');
    const lines=body.split('\n').map(l=>clean(l)).filter(Boolean);
    const candidates=[];
    for(const line of lines){
      if(!/\b(HYPERCAR|LMGT3|HYP|LMP2|LMP3)\b/i.test(line) || !/\b\d{1,2}:\d{2}\.\d{3}\b/.test(line)) continue;
      let pos='', no=''; let m=line.match(/^(\d+)\s+(\d{1,3}|0\d{2})\s+/);
      if(m){pos=+m[1]; no=m[2];}
      if(!m){m=line.match(/\s(\d+)\s+(\d{1,3}|0\d{2})\s+[^\n]*\b(HYPERCAR|LMGT3|HYP|LMP2|LMP3)\b/i); if(m){pos=+m[1]; no=m[2];}}
      if(!no) continue;
      const clsMatch=line.match(/\b(HYPERCAR|LMGT3|HYP|LMP2|LMP3)\b/i); const cls=classCanon(clsMatch&&clsMatch[1]);
      const driver=firstDriverFromLine(line); const time=timeFrom(line); if(!time)continue;
      candidates.push({type:'PP',class:cls,no:String(no),driver,lap:'',time,pos:pos||candidates.length+1,source:'qualifying'});
    }
    candidates.sort((a,b)=>(+a.pos||999)-(+b.pos||999));
    const bestByClass=new Map(); candidates.forEach(x=>{if(!bestByClass.has(x.class))bestByClass.set(x.class,x);});
    const out=[]; if(candidates[0]) out.push({...candidates[0],class:'Overall'});
    bestByClass.forEach(v=>out.push(v));
    return uniquePerf(out);
  }
  function parseFlFromClassification(text){
    const entries=parseResultsText(text), byClass=new Map(); let best=null;
    entries.forEach(e=>{
      const t=e.bestLap||e.bestlap||e.best_lap||e.bestLapTime||''; if(!t)return;
      const p={type:'FL',class:e.class,no:e.no,driver:(e.drivers?.[0]?.[0]||''),lap:e.bestLapNo||e.bestlapno||e.best_lap_no||'',time:t,source:'classification'};
      const sec=window.parseTime?window.parseTime('0:'+t):Number.MAX_VALUE; p._sec=sec;
      if(!best||sec<best._sec)best=p;
      if(!byClass.has(e.class)||sec<byClass.get(e.class)._sec)byClass.set(e.class,p);
    });
    const out=[]; if(best)out.push({...best,class:'Overall'}); byClass.forEach(v=>out.push(v));
    return uniquePerf(out.map(({_sec,...x})=>x));
  }
  function parsePerformanceText(text){
    let rows=[]; const body=isPdfText(text)?pdfBody(text):String(text||'');
    if(isPdfText(text)){
      if(/qualifying|hyperpole/i.test(body)) rows=rows.concat(parseQualifyingPp(text));
      if(/fastest\s+lap|best\s+lap|final\s+classification|race\s+classification/i.test(body)) rows=rows.concat(parseFlFromClassification(text));
      if(!rows.length && window.rowsFromPdfText) try{rows=window.rowsFromPdfText('performance',text)||[];}catch{}
    } else if(window.parseCsv) {
      rows=(window.parseCsv(text)||[]).map(r=>({type:String(r.type||r.kind||'FL').toUpperCase().includes('P')?'PP':'FL',class:classCanon(r.class||r.category||'Overall'),no:String(r.no||r.number||r.car||'').trim(),driver:expandDriverName(r.driver||r.name||r.driver1||''),lap:r.lap||'',time:r.time||r.laptime||r.bestlap||''}));
    }
    return uniquePerf(rows.map(p=>({...p,type:String(p.type||'FL').toUpperCase().includes('P')?'PP':'FL',class:classCanon(p.class),driver:expandDriverName(p.driver||''),no:String(p.no||'').trim()})).filter(p=>p.time||p.no||p.driver));
  }
  function uniquePerf(rows){
    const m=new Map(); (rows||[]).forEach(p=>{const key=[p.type,p.class,p.no,p.time].join('|'); if(p.time||p.no)m.set(key,p);}); return [...m.values()];
  }
  function combinePerformance(){
    const srcs=session.performance?.length?session.performance:[{name:'paste area',text:$('performanceCsv')?.value||'',kind:'text'}];
    const all=srcs.flatMap(s=>parsePerformanceText(s.text).map(p=>({...p,_file:s.name})));
    const pp=all.filter(p=>p.type==='PP'), fl=all.filter(p=>p.type!=='PP');
    function seconds(t){return window.parseTime?window.parseTime('0:'+t):Number.MAX_VALUE;}
    const bestPpByClass=new Map(), bestFlByClass=new Map(); let bestPp=null,bestFl=null;
    pp.forEach(p=>{const sec=seconds(p.time); if(!bestPp||sec<seconds(bestPp.time))bestPp={...p,class:'Overall'}; if(p.class!=='Overall' && (!bestPpByClass.has(p.class)||sec<seconds(bestPpByClass.get(p.class).time)))bestPpByClass.set(p.class,p);});
    fl.forEach(p=>{const sec=seconds(p.time); if(!bestFl||sec<seconds(bestFl.time))bestFl={...p,class:'Overall'}; if(p.class!=='Overall' && (!bestFlByClass.has(p.class)||sec<seconds(bestFlByClass.get(p.class).time)))bestFlByClass.set(p.class,p);});
    return uniquePerf([bestPp,...bestPpByClass.values(),bestFl,...bestFlByClass.values()].filter(Boolean));
  }
  function sourceRole(text){
    const b=String(text||'');
    if(/hyperpole|qualifying/i.test(b))return'PP';
    if(/fastest\s+lap/i.test(b))return'FL';
    if(/classification|classified|final classification|race/i.test(b))return'Results/FL';
    return'Unknown';
  }
  function refreshTextAreas(){
    if($('resultsCsv')) $('resultsCsv').value = session.results.map(s=>s.text).join('\n\n--- SCC_NEXT_SOURCE ---\n\n');
    if($('performanceCsv')) $('performanceCsv').value = session.performance.map(s=>s.text).join('\n\n--- SCC_NEXT_SOURCE ---\n\n');
  }
  function driverStack(drivers){
    if(!drivers?.length)return '<span class="muted">drivers missing</span>';
    return `<div class="aco-driver-stack">${drivers.map(d=>{const n=Array.isArray(d)?d[0]:d,c=Array.isArray(d)?d[1]:countryFor(n);return `<div>${flagFor(c)}<span>${E(n)}</span></div>`}).join('')}</div>`;
  }
  function previewResults(entries){
    const classes=[...new Set(entries.map(e=>e.class).filter(Boolean))];
    return `<div class="import-ok"><b>${entries.length}</b> cars detected · ${classes.map(E).join(', ')||'classes missing'} · duplicates merged by car number + class</div><div class="aco-preview-table"><div class="head"><span>Pos</span><span>No</span><span>Class</span><span>Team</span><span>Car</span><span>Drivers</span><span>Status</span></div>${entries.slice(0,60).map(e=>`<div><b>P${E(e.pos||'')}</b><b>#${E(e.no)}</b><span>${window.classBadge?classBadge(e.class):E(e.class)}</span><span>${E(e.team||'')}</span><span>${E(e.model||e.constructor||'')}</span>${driverStack(e.drivers)}<span>${E(e.status||'')}</span></div>`).join('')}</div>`;
  }
  function previewPerf(rows){
    const pp=rows.filter(x=>x.type==='PP'), fl=rows.filter(x=>x.type!=='PP');
    return `<div class="import-ok"><b>${pp.length}</b> PP rows · <b>${fl.length}</b> FL rows detected</div><div class="aco-perf-list">${rows.map(p=>`<div><span class="pill">${E(p.type)}</span><span>${E(p.class)}</span><b>#${E(p.no)}</b><span>${flagFor(countryFor(p.driver))}${E(p.driver||'')}</span><strong>${E(p.time||'—')}</strong></div>`).join('')}</div>`;
  }
  function statusBlock(){
    const entries=allResults(); const perf=combinePerformance();
    const pp=perf.filter(p=>p.type==='PP'), fl=perf.filter(p=>p.type!=='PP');
    const sources=[...(session.results||[]),...(session.performance||[])];
    return `<div id="acoSessionStatus" class="aco-session-status">
      <div class="aco-session-title">ACO import session</div>
      <div class="aco-session-kpis">
        <div class="${entries.length?'ok':'bad'}"><b>${entries.length}</b><span>Order / Results cars</span></div>
        <div class="${fl.length?'ok':'bad'}"><b>${fl.length}</b><span>FL rows</span></div>
        <div class="${pp.length?'ok':'bad'}"><b>${pp.length}</b><span>PP rows</span></div>
      </div>
      <div class="aco-session-files">${sources.length?sources.map(s=>`<div class="${s.count?'ok':'warn'}"><span>${E(s.name)}</span><b>${E(s.role||sourceRole(s.text))}</b><small>${E(s.countText||'read, no mapped data yet')}</small></div>`).join(''):'<div class="warn"><span>No PDFs loaded yet</span><b>Waiting</b><small>Drop Results, FL and both Hyperpole PDFs.</small></div>'}</div>
      <div class="aco-session-actions"><button id="clearAcoSessionBtn" class="secondary">Clear import session</button><span class="muted">Use multiple PDFs in FL / PP: Hyperpole HYP + Hyperpole LMGT3 can be loaded together.</span></div>
    </div>`;
  }
  function renderSessionStatus(){
    let host=$('acoSessionHost');
    if(!host){
      const target=document.querySelector('#tab-import .import-help h2') || $('importChecklist');
      host=document.createElement('div'); host.id='acoSessionHost';
      if(target) target.insertAdjacentElement('afterend',host);
    }
    host.innerHTML=statusBlock();
    const clear=$('clearAcoSessionBtn'); if(clear) clear.onclick=()=>{session.results=[];session.performance=[];session.raceControl=[];refreshTextAreas(); previewCsv('results'); previewCsv('performance'); renderSessionStatus(); window.renderImportChecklist&&renderImportChecklist();};
  }
  const oldPreview=window.previewCsv;
  window.previewCsv=function(type){
    const el= type==='results'?$('resultsPreview'):type==='performance'?$('performancePreview'):type==='raceControl'?$('raceControlPreview'):$('entryPreview');
    if(type==='results' && el){const entries=allResults(); el.innerHTML=entries.length?previewResults(entries):'<div class="empty-state">No ACO result rows detected. Use Race / Final Classification PDF or CSV.</div>'; renderSessionStatus(); window.renderImportChecklist&&renderImportChecklist(); return;}
    if(type==='performance' && el){const rows=combinePerformance(); el.innerHTML=rows.length?previewPerf(rows):'<div class="empty-state">No PP/FL rows detected. Drop Fastest Laps plus Hyperpole HYP and Hyperpole LMGT3 PDFs.</div>'; renderSessionStatus(); window.renderImportChecklist&&renderImportChecklist(); return;}
    return oldPreview?oldPreview(type):undefined;
  };
  window.importResultsCsv=function(){
    const entries=allResults(); if(!entries.length)return alert('No result rows detected.');
    state.race.entries=entries; if(window.learnDriverCountries)learnDriverCountries(entries); if(window.recalculateClassPositions)recalculateClassPositions();
    render(); renderSessionStatus(); alert(`${entries.length} result cars imported. Duplicate rows were merged by car number + class.`);
  };
  window.importPerformanceCsv=function(){
    const perf=combinePerformance(); if(!perf.length)return alert('No PP/FL rows detected.');
    state.race.performance=state.race.performance||{};
    state.race.performance.poles=perf.filter(p=>p.type==='PP');
    state.race.performance.fastestLaps=perf.filter(p=>p.type!=='PP');
    render(); renderSessionStatus(); alert(`${state.race.performance.poles.length} PP rows and ${state.race.performance.fastestLaps.length} FL rows imported.`);
  };
  function savedRaces(){try{return JSON.parse(localStorage.getItem(STORE)||'[]')}catch{return[]}}
  function writeSaved(arr){localStorage.setItem(STORE,JSON.stringify(arr));}
  function commitRace(){
    if(!state.race?.id)return alert('Missing race ID.');
    const copy=structuredClone(state.race); copy.entries=dedupeEntries(copy.entries||[]); copy.completeness=copy.completeness||{};
    copy.completeness.results=!!copy.entries.length; copy.completeness.poles=!!copy.performance?.poles?.length; copy.completeness.fastestLaps=!!copy.performance?.fastestLaps?.length;
    const i=RACES.findIndex(r=>r.id===copy.id); if(i>=0)RACES[i]=copy; else RACES.push(copy);
    const saved=savedRaces().filter(r=>r.id!==copy.id); saved.push(copy); writeSaved(saved);
    window.sccLearnArchiveCountries?.(); window.buildRaceTree?.(); window.buildRaceSelectors?.(); window.renderRaceTree?.(); window.renderImportChecklist?.(); renderSessionStatus();
    const msg=`Saved to database: ${copy.event||copy.id}\n${copy.entries.length} cars · ${copy.performance?.fastestLaps?.length||0} FL · ${copy.performance?.poles?.length||0} PP`;
    const st=$('commitRaceStatus')||$('saveRaceStatus'); if(st)st.innerHTML=`✓ ${E(msg).replace(/\n/g,'<br>')}`;
    alert(msg);
  }
  const oldChecklist=window.renderImportChecklist;
  window.renderImportChecklist=function(){
    if(oldChecklist)oldChecklist();
    const el=$('importChecklist'); if(!el)return;
    if(!$('commitRaceBtn')) el.insertAdjacentHTML('beforeend',`<div class="import-commit-box"><button id="commitRaceBtn">Save to database</button><span id="commitRaceStatus" class="muted">Saves current imported race in this browser and updates the archive immediately.</span></div>`);
    const b=$('commitRaceBtn'); if(b)b.onclick=commitRace;
  };
  function bindMultiDrop(dropId,fileId,type){
    const dz=$(dropId), fi=$(fileId), ta=$(type==='results'?'resultsCsv':type==='performance'?'performanceCsv':'raceControlCsv'); if(!dz||!fi||!ta)return;
    fi.multiple=true;
    const loadFiles=files=>{
      [...files].forEach(f=>{
        const ext=(f.name.split('.').pop()||'').toLowerCase();
        const addSource=(text,kind)=>{
          const src={type,kind,name:f.name,size:f.size,ts:Date.now(),text,role:sourceRole(text),count:0,countText:''};
          if(type==='results'){const entries=parseResultsText(text); src.count=entries.length; src.countText=`${entries.length} result cars detected`; session.results.push(src);} 
          else if(type==='performance'){const rows=parsePerformanceText(text); const pp=rows.filter(r=>r.type==='PP').length, fl=rows.filter(r=>r.type!=='PP').length; src.count=pp+fl; src.countText=`${pp} PP · ${fl} FL detected`; session.performance.push(src);} 
          refreshTextAreas(); previewCsv(type); renderSessionStatus();
        };
        if(/pdf/i.test(f.type)||ext==='pdf'){
          const pending={type,kind:'PDF',name:f.name,size:f.size,ts:Date.now(),text:'',role:'Reading PDF',count:0,countText:'extracting text...'};
          session[type].push(pending); renderSessionStatus();
          readPdfText(f).then(txt=>{const text=pdfWrap(type,f.name,txt); Object.assign(pending,{text,role:sourceRole(text)}); if(type==='results'){const entries=parseResultsText(text); pending.count=entries.length; pending.countText=`${entries.length} result cars detected`;} else {const rows=parsePerformanceText(text); const pp=rows.filter(r=>r.type==='PP').length, fl=rows.filter(r=>r.type!=='PP').length; pending.count=pp+fl; pending.countText=`${pp} PP · ${fl} FL detected`; } refreshTextAreas(); previewCsv(type); renderSessionStatus();}).catch(err=>{Object.assign(pending,{role:'PDF failed',countText:err.message||'failed'}); renderSessionStatus();});
        } else {
          const r=new FileReader(); r.onload=()=>addSource(String(r.result||''),ext==='json'?'JSON':'Text/CSV'); r.readAsText(f);
        }
      });
    };
    dz.ondragover=e=>{e.preventDefault();dz.classList.add('drag')};
    dz.ondragleave=()=>dz.classList.remove('drag');
    dz.ondrop=e=>{e.preventDefault();dz.classList.remove('drag');loadFiles(e.dataTransfer.files)};
    fi.onchange=e=>loadFiles(e.target.files);
  }
  function patchImportCopy(){
    const intro=document.querySelector('#tab-import .import-panel>p.muted'); if(intro)intro.textContent='Import ACO/WEC race data as a session. Drop Results, Fastest Laps and both Hyperpole PDFs; SCC confirms what each PDF yielded before you save. Entry List is intentionally skipped.';
    const perfP=document.querySelector('#performanceDrop')?.previousElementSibling; if(perfP)perfP.innerHTML='Optional: fastest laps and pole positions. You can load multiple PDFs here at once, e.g. <b>Fastest Laps</b>, <b>Hyperpole HYP</b> and <b>Hyperpole LMGT3</b>. SCC combines them into FL and PP rows.';
    const perfDrop=$('performanceDrop'); if(perfDrop) perfDrop.firstChild.nodeValue='Drop one or more FL / Hyperpole / Qualifying PDFs here';
  }
  function addCss(){
    if(document.getElementById('acoImportSessionCss'))return; const s=document.createElement('style'); s.id='acoImportSessionCss'; s.textContent=`
      .aco-session-status{margin:10px 0 14px;padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,255,255,.045);display:grid;gap:10px}.aco-session-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#9fb0c7;font-weight:900}.aco-session-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.aco-session-kpis>div{padding:9px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}.aco-session-kpis b{display:block;font-size:22px;line-height:1}.aco-session-kpis span{font-size:11px;color:#9fb0c7;text-transform:uppercase;font-weight:800}.aco-session-kpis .ok{border-color:rgba(34,197,94,.35);background:rgba(34,197,94,.08)}.aco-session-kpis .bad{border-color:rgba(239,68,68,.32);background:rgba(239,68,68,.07)}.aco-session-files{display:grid;gap:5px}.aco-session-files>div{display:grid;grid-template-columns:minmax(0,1fr) 78px 110px;gap:8px;align-items:center;padding:7px 8px;border-radius:9px;background:rgba(0,0,0,.17);border:1px solid rgba(255,255,255,.08)}.aco-session-files span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.aco-session-files b{font-size:11px;text-transform:uppercase}.aco-session-files small{color:#9fb0c7}.aco-session-files .ok{border-color:rgba(34,197,94,.25)}.aco-session-files .warn{border-color:rgba(245,158,11,.25)}.aco-session-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}`; document.head.appendChild(s);
  }
  function boot(){
    document.title='SCC v0.8.6.13 · ACO import session'; document.querySelectorAll('.brand span,.version,.app-version,[data-version]').forEach(el=>el.textContent=VERSION); document.body.dataset.sccVersion='0.8.6.13';
    addCss(); patchImportCopy(); bindMultiDrop('resultsDrop','resultsFile','results'); bindMultiDrop('performanceDrop','performanceFile','performance'); renderSessionStatus(); setTimeout(()=>{patchImportCopy(); renderSessionStatus(); window.renderImportChecklist&&renderImportChecklist();},120);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot); else boot();
})();
