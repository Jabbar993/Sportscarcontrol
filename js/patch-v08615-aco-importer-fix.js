/* SCC v0.8.6.15 · ACO importer fix
   Focused fixes from user feedback:
   - clear import session between races
   - Results/Race classification has its own working PDF field
   - Qualifying/PP accepts multiple PDFs (HYP + LMGT3)
   - FL can be extracted from the race classification PDF
   - visible confirmation for Results / FL / PP data
   - Save to database writes to RACES and browser localStorage, then refreshes selectors/tree
*/
(function(){
  const VERSION='v0.8.6.16';
  const STORE='sccSavedRaces.v0.8.6';
  const $=id=>document.getElementById(id);
  const esc=window.esc||(s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])));
  const clean=s=>String(s||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
  const normClass=c=>{c=String(c||'').toUpperCase().replace(/[\s_-]+/g,''); if(c==='HYPERCAR'||c==='HY')return'HYP'; if(c==='GT3'||c==='LMGT3')return'LMGT3'; return c||'Overall'};
  const strip=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const normName=s=>strip(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const countryFor=n=>(window.lookupDriverCountry&&lookupDriverCountry(n))||(window.DRIVER_COUNTRY_DB&&DRIVER_COUNTRY_DB[normName(n)])||'';
  const flagFor=c=>c&&window.flag?flag(c):'';
  const constructorFrom=s=>window.constructorFromVehicle?constructorFromVehicle(s):clean(s).split(/\s+/)[0].toLowerCase();
  const pdfHeader=(type,name)=>`[SCC_PDF_TEXT:${type}] ${name}\n`;
  const isPdf=t=>/^\[SCC_PDF_TEXT:/i.test(String(t||'').trim());
  const pdfBody=t=>String(t||'').replace(/\r/g,'').split('\n').slice(1).join('\n');
  const titleName=s=>clean(s).toLowerCase().replace(/(^|[\s'\-])([a-záéíóúýčďěňřšťžüöäøåæœ])/g,(m,a,b)=>a+b.toUpperCase()).replace(/\bDi\b/g,'di').replace(/\bDe\b/g,'de').replace(/\bVan\b/g,'van').replace(/\bDer\b/g,'der').replace(/\bMcdonald\b/g,'McDonald');
  const DRIVER_CANONICAL={'daniel juncadella':'Dani Juncadella','d juncadella':'Dani Juncadella'};
  const canonicalDriverName=n=>DRIVER_CANONICAL[normName(n)]||titleName(n);

  const session=window.sccAcoSession={results:[],qualifying:[],lastRaceId:''};

  function version(){
    document.title='SCC '+VERSION+' · ACO importer fixed';
    document.querySelectorAll('.brand span,.version,.app-version,[data-version]').forEach(el=>el.textContent=VERSION);
    document.body.dataset.sccVersion='0.8.6.16';
  }
  function saved(){try{return JSON.parse(localStorage.getItem(STORE)||'[]')}catch{return[]}}
  function writeSaved(arr){localStorage.setItem(STORE,JSON.stringify(arr))}
  function mergeSavedRaces(){
    const arr=saved(); if(!Array.isArray(arr)||!arr.length||!window.RACES)return;
    arr.forEach(r=>{if(!r||!r.id)return; const i=RACES.findIndex(x=>x.id===r.id); if(i>=0)RACES[i]=r; else RACES.push(r);});
  }
  mergeSavedRaces();

  function clearSession(){
    session.results=[]; session.qualifying=[]; session.lastRaceId=$('importId')?.value||'';
    ['resultsCsv','performanceCsv'].forEach(id=>{const el=$(id); if(el)el.value='';});
    ['resultsFile','performanceFile'].forEach(id=>{const el=$(id); if(el)el.value='';});
    ['resultsPreview','performancePreview'].forEach(id=>{const el=$(id); if(el)el.innerHTML='<div class="empty-state">No data loaded for this import session.</div>';});
    renderStatus();
  }
  window.sccClearAcoImportSession=clearSession;

  function raceKey(){return clean($('importId')?.value||window.state?.race?.id||'');}
  function checkRaceChanged(){const id=raceKey(); if(session.lastRaceId && id && id!==session.lastRaceId) clearSession(); if(id) session.lastRaceId=id;}

  async function readPdfText(file){
    const lib=window.pdfjsLib || window['pdfjs-dist/build/pdf'];
    if(!lib) throw new Error('PDF.js není načtené. Otevři aplikaci online nebo použij text/CSV export.');
    if(lib.GlobalWorkerOptions) lib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const pdf=await lib.getDocument({data:await file.arrayBuffer(),disableWorker:true}).promise;
    const out=[];
    for(let p=1;p<=pdf.numPages;p++){
      const page=await pdf.getPage(p); const tc=await page.getTextContent(); const rows=[];
      tc.items.forEach(it=>{const str=String(it.str||'').trim(); if(!str)return; const x=it.transform[4], y=it.transform[5]; let row=rows.find(r=>Math.abs(r.y-y)<3); if(!row){row={y,items:[]};rows.push(row)} row.items.push({x,str});});
      rows.sort((a,b)=>b.y-a.y).forEach(r=>{r.items.sort((a,b)=>a.x-b.x); const line=r.items.map(i=>i.str).join('\t').replace(/\t{2,}/g,'\t').trim(); if(line)out.push(line);});
    }
    return out.join('\n');
  }

  function normalizeEntry(e){
    if(!e)return null;
    const drivers=[]; const raw=e.drivers||e.driver||e.driversText||'';
    if(Array.isArray(raw)) raw.forEach(d=>drivers.push(Array.isArray(d)?[canonicalDriverName(d[0]),d[1]||countryFor(canonicalDriverName(d[0]))]:[titleName(d),countryFor(d)]));
    else String(raw).split(/\s*\|\s*|\s*\/\s*/).filter(Boolean).forEach(d=>drivers.push([canonicalDriverName(d),countryFor(canonicalDriverName(d))]));
    const seen=new Set(); const unique=[]; drivers.forEach(d=>{const k=normName(d[0]); if(k&&!seen.has(k)){seen.add(k); unique.push(d)}});
    const model=clean(e.model||e.vehicle||e.car||e.constructor||'');
    const no=String(e.no||e.number||e.carNo||'').trim();
    return {...e,no,class:normClass(e.class||e.category||e.cat),constructor:e.constructor||constructorFrom(model||e.team||''),model,drivers:unique,pos:Number(e.pos||e.position)||e.pos||'',status:e.status||'',laps:e.laps||'',time:e.time||e.total_time||e.totalTime||'',gap:e.gap||''};
  }
  function dedupeEntries(entries){
    const map=new Map(); (entries||[]).map(normalizeEntry).filter(e=>e&&e.no).forEach(e=>{
      const key=e.no; const old=map.get(key);
      if(!old){map.set(key,e);return;}
      const byName=new Map(); [...(old.drivers||[]),...(e.drivers||[])].forEach(d=>{const nm=canonicalDriverName(d[0]); const k=normName(nm); if(k&&!byName.has(k)) byName.set(k,[nm,d[1]||countryFor(nm)]);});
      const better=[...byName.values()];
      map.set(key,{...old,...e,drivers:better,team:e.team||old.team,model:e.model||old.model,constructor:e.constructor||old.constructor,pos:e.pos||old.pos,class:e.class||old.class,status:e.status||old.status,laps:e.laps||old.laps,time:e.time||old.time,gap:e.gap||old.gap});
    });
    const arr=[...map.values()];
    arr.sort((a,b)=>(Number(a.pos)||999)-(Number(b.pos)||999));
    // If PDF parser skipped one classified position, keep visible numbering honest instead of hiding a blank row.
    return arr;
  }
  function parseResults(text){
    let rows=[];
    try{ if(window.parseWecFinalClassificationPdf) rows=window.parseWecFinalClassificationPdf('results',text)||[]; }catch(e){}
    if(!rows.length){ try{ if(window.rowsFromPdfText) rows=window.rowsFromPdfText('results',text)||[]; }catch(e){} }
    if(!rows.length && window.parseCsv) rows=window.parseCsv(isPdf(text)?pdfBody(text):text)||[];
    if(window.rowsToEntries){try{rows=window.rowsToEntries(rows)||rows}catch(e){}}
    return dedupeEntries(rows);
  }
  function allResults(){return dedupeEntries(session.results.flatMap(s=>parseResults(s.text)));}

  function seconds(t){
    t=String(t||'').trim(); if(!t)return 9e9;
    const m=t.match(/(?:(\d+):)?(\d{1,2}):(\d{2})\.(\d{3})$/); if(m)return (+m[1]||0)*3600+(+m[2])*60+(+m[3])+(+m[4])/1000;
    const n=t.match(/^(\d{1,2}):(\d{2})\.(\d{3})$/); if(n)return (+n[1])*60+(+n[2])+(+n[3])/1000;
    return 9e9;
  }
  function flFromRaceTexts(){
    const candidates=[];
    session.results.forEach(src=>{
      let perf=[]; try{ if(window.parseWecFinalClassificationPdf) perf=window.parseWecFinalClassificationPdf('performance',src.text)||[]; }catch(e){}
      if(perf.length) candidates.push(...perf.map(p=>({...p,source:src.name,type:'FL'})));
      // fallback from parsed result rows with bestLap data
      parseResults(src.text).forEach(e=>{const t=e.bestLap||e.bestlap||e.best_lap||''; if(t)candidates.push({type:'FL',class:e.class,no:e.no,driver:e.drivers?.[0]?.[0]||'',lap:e.bestLapNo||e.bestlapno||'',time:t,source:src.name});});
    });
    return bestByClass(candidates,'FL');
  }
  function inferClassFromSource(text,name){
    const s=(name+'\n'+text).toUpperCase();
    if(/LMGT3|GT3/.test(s) && !/HYPERCAR/.test(s)) return 'LMGT3';
    if(/HYPERCAR|\bHYP\b/.test(s) && !/LMGT3/.test(s)) return 'HYP';
    return '';
  }
  function expandDriver(raw){
    raw=clean(raw); if(!raw)return'';
    const m=raw.match(/^([A-Z])\.\s*(.+)$/i);
    if(m){
      const target=normName(m[2]);
      const db=[...Object.keys(window.DRIVER_COUNTRY_DB||{}),...((window.DRIVER_MASTER?.drivers||[]).map(d=>d.name)||[])];
      const hit=db.find(n=>{const parts=strip(n).split(/\s+/); return parts[0]?.[0]?.toLowerCase()===m[1].toLowerCase() && normName(parts.slice(1).join(' '))===target;});
      if(hit)return canonicalDriverName(hit);
    }
    return canonicalDriverName(raw);
  }
  function parsePpText(text,name){
    const body=isPdf(text)?pdfBody(text):String(text||'');
    const srcClass=inferClassFromSource(body,name);
    const rows=[];
    body.split('\n').map(l=>clean(l)).filter(Boolean).forEach(line=>{
      if(!/\d{1,2}:\d{2}\.\d{3}/.test(line))return;
      if(/practice|free practice|warm/i.test(line))return;
      const noM=line.match(/(?:^|\s)(\d{1,3})(?=\s|\t|$)/); if(!noM)return;
      const no=noM[1];
      const times=[...line.matchAll(/\b\d{1,2}:\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      const time=times[times.length-1];
      let cls=srcClass; const clsM=line.match(/\b(HYPERCAR|HYP|LMGT3|GT3|LMP2|LMP3)\b/i); if(clsM) cls=normClass(clsM[1]);
      // Driver is usually printed as I. Surname; prefer the first such token after car number.
      let driver=''; const dm=line.match(/\b([A-Z])\.\s*([A-ZÀ-Ž][A-ZÀ-Ž'\-]+(?:\s+(?:DA|DE|DEL|DI|DOS|DU|VAN|DER|VAN DER|LE|LA)\s+[A-ZÀ-Ž][A-ZÀ-Ž'\-]+)?)\b/i); if(dm)driver=expandDriver(`${dm[1]}. ${dm[2]}`);
      rows.push({type:'PP',class:cls||'Overall',no,driver,time,source:name});
    });
    return bestByClass(rows,'PP');
  }
  function bestByClass(rows,type){
    const by=new Map(); let overall=null;
    (rows||[]).filter(r=>r&&r.no&&r.time).forEach(r=>{
      const p={...r,type,class:normClass(r.class)}; const sec=seconds(p.time);
      if(!overall || sec<seconds(overall.time)) overall={...p,class:'Overall'};
      if(p.class && p.class!=='Overall' && (!by.has(p.class)||sec<seconds(by.get(p.class).time))) by.set(p.class,p);
    });
    return [overall,...by.values()].filter(Boolean);
  }
  function parseQualifying(){return bestByClass(session.qualifying.flatMap(s=>parsePpText(s.text,s.name)),'PP');}
  function combinedPerformance(){
    const fl=flFromRaceTexts();
    const pp=parseQualifying();
    const key=new Set(); return [...pp,...fl].filter(p=>{const k=[p.type,p.class,p.no,p.time].join('|'); if(key.has(k))return false; key.add(k); return true;});
  }

  function roleFor(text,name,type){
    const s=(name+'\n'+text).toUpperCase();
    if(type==='results')return 'Race results';
    if(/HYPERPOLE|QUALIFYING|GRID/.test(s))return 'PP / Qualifying';
    return 'Performance';
  }
  function status(){
    const res=allResults(); const perf=combinedPerformance(); const pp=perf.filter(p=>p.type==='PP'), fl=perf.filter(p=>p.type==='FL');
    const files=[...session.results.map(s=>({...s,role:'Race results'})),...session.qualifying.map(s=>({...s,role:'PP / Qualifying'}))];
    return `<div class="aco-session-status"><div class="aco-session-title">ACO import session <b>${VERSION}</b></div>
      <div class="aco-session-kpis"><div class="${res.length?'ok':'bad'}"><b>${res.length}</b><span>Results cars</span></div><div class="${fl.length?'ok':'bad'}"><b>${fl.length}</b><span>FL rows from race</span></div><div class="${pp.length?'ok':'bad'}"><b>${pp.length}</b><span>PP rows</span></div></div>
      <div class="aco-session-files">${files.length?files.map(f=>`<div class="${f.count?'ok':'warn'}"><span>${esc(f.name)}</span><b>${esc(f.role)}</b><small>${esc(f.countText||'read')}</small></div>`).join(''):'<div class="warn"><span>No PDF loaded</span><b>Waiting</b><small>Load Race Classification + both Hyperpole PDFs.</small></div>'}</div>
      <div class="aco-session-actions"><button id="clearAcoSessionBtn" class="secondary">Start new import / clear loaded PDFs</button><span class="muted">Data is not reused between races after clearing or changing Race ID.</span></div></div>`;
  }
  function renderStatus(){
    let host=$('acoSessionHost'); if(!host){host=document.createElement('div'); host.id='acoSessionHost'; const target=document.querySelector('#tab-import .import-help h2')||$('importChecklist'); target?.insertAdjacentElement('afterend',host);} host.innerHTML=status();
    const b=$('clearAcoSessionBtn'); if(b)b.onclick=clearSession;
  }
  function driverStack(drivers){
    if(!drivers?.length)return '<span class="muted">drivers missing</span>';
    return `<div class="aco-driver-stack">${drivers.map(d=>`<div>${flagFor(d[1])}<span>${esc(d[0])}</span></div>`).join('')}</div>`;
  }
  function previewResults(){
    const entries=allResults(); const el=$('resultsPreview'); if(!el)return;
    el.innerHTML=entries.length?`<div class="import-ok"><b>${entries.length}</b> race result cars detected · duplicates merged by car number + class</div><div class="aco-preview-table"><div class="head"><span>Pos</span><span>No</span><span>Class</span><span>Team</span><span>Car</span><span>Drivers</span><span>Status</span></div>${entries.map(e=>`<div><b>P${esc(e.pos||'')}</b><b>#${esc(e.no)}</b><span>${window.classBadge?classBadge(e.class):esc(e.class)}</span><span>${esc(e.team||'')}</span><span>${esc(e.model||e.constructor||'')}</span>${driverStack(e.drivers)}<span>${esc(e.status||'')}</span></div>`).join('')}</div>`:'<div class="empty-state">No race result rows detected.</div>';
    renderStatus();
  }
  function previewPerformance(){
    const rows=combinedPerformance(); const el=$('performancePreview'); if(!el)return;
    const pp=rows.filter(p=>p.type==='PP'), fl=rows.filter(p=>p.type==='FL');
    el.innerHTML=rows.length?`<div class="import-ok"><b>${pp.length}</b> PP rows · <b>${fl.length}</b> FL rows extracted from race results</div><div class="aco-perf-list">${rows.map(p=>`<div><span class="pill">${esc(p.type)}</span><span>${esc(p.class)}</span><b>#${esc(p.no)}</b><span>${flagFor(countryFor(p.driver))}${esc(p.driver||'')}</span><strong>${esc(p.time||'—')}</strong></div>`).join('')}</div>`:'<div class="empty-state">No PP rows detected. Load both Hyperpole PDFs in this section; FL comes from Race Classification.</div>';
    renderStatus();
  }

  function syncTextareas(){
    if($('resultsCsv')) $('resultsCsv').value=session.results.map(s=>s.text).join('\n\n--- SCC_NEXT_RESULTS_PDF ---\n\n');
    if($('performanceCsv')) $('performanceCsv').value=session.qualifying.map(s=>s.text).join('\n\n--- SCC_NEXT_QUALIFYING_PDF ---\n\n');
  }
  function bindDrop(dropId,fileId,type){
    const dz=$(dropId), fi=$(fileId); if(!dz||!fi)return; fi.multiple=true;
    async function addFiles(files){
      checkRaceChanged();
      for(const f of [...files]){
        const list=type==='results'?session.results:session.qualifying;
        const pending={name:f.name,text:'',count:0,countText:'reading PDF...',role:type==='results'?'Race results':'PP / Qualifying'}; list.push(pending); renderStatus();
        try{
          const ext=(f.name.split('.').pop()||'').toLowerCase(); let text='';
          if(ext==='pdf'||/pdf/i.test(f.type)) text=pdfHeader(type,f.name)+await readPdfText(f); else text=await f.text();
          pending.text=text;
          if(type==='results'){
            const entries=parseResults(text); const fl=bestByClass((()=>{let out=[]; try{out=window.parseWecFinalClassificationPdf?window.parseWecFinalClassificationPdf('performance',text)||[]:[]}catch(e){} return out;})(),'FL');
            pending.count=entries.length; pending.countText=`${entries.length} cars · ${fl.length} FL`;
          } else {
            const pp=parsePpText(text,f.name); pending.count=pp.length; pending.countText=`${pp.length} PP`;
          }
        }catch(err){pending.countText='failed: '+(err.message||err);}
        syncTextareas(); previewResults(); previewPerformance(); renderStatus();
      }
    }
    dz.ondragover=e=>{e.preventDefault(); dz.classList.add('drag')};
    dz.ondragleave=()=>dz.classList.remove('drag');
    dz.ondrop=e=>{e.preventDefault(); dz.classList.remove('drag'); addFiles(e.dataTransfer.files);};
    fi.onchange=e=>addFiles(e.target.files);
  }

  window.previewCsv=function(type){ if(type==='results')return previewResults(); if(type==='performance')return previewPerformance(); return window.__sccOldPreviewCsv?window.__sccOldPreviewCsv(type):undefined; };
  window.importResultsCsv=function(){
    const entries=allResults(); if(!entries.length)return alert('No race result rows detected.');
    state.race.entries=entries; if(window.learnDriverCountries)learnDriverCountries(entries); if(window.recalculateClassPositions)recalculateClassPositions();
    // Also stage fastest laps from the race PDF immediately.
    const fl=flFromRaceTexts(); state.race.performance=state.race.performance||{}; if(fl.length)state.race.performance.fastestLaps=fl;
    render(); previewResults(); previewPerformance(); alert(`${entries.length} result cars imported. ${fl.length} FL rows extracted from race classification.`);
  };
  window.importPerformanceCsv=function(){
    const perf=combinedPerformance(); const pp=perf.filter(p=>p.type==='PP'), fl=perf.filter(p=>p.type==='FL');
    state.race.performance=state.race.performance||{}; state.race.performance.poles=pp; if(fl.length)state.race.performance.fastestLaps=fl;
    render(); previewPerformance(); alert(`${pp.length} PP rows imported. ${fl.length} FL rows available from race classification.`);
  };
  function saveRace(){
    if(!state.race?.id)return alert('Missing Race ID. Apply metadata first.');
    const copy=structuredClone(state.race); copy.entries=dedupeEntries(copy.entries||[]); copy.performance=copy.performance||{};
    copy.completeness={results:!!copy.entries.length,poles:!!copy.performance.poles?.length,fastestLaps:!!copy.performance.fastestLaps?.length};
    const i=RACES.findIndex(r=>r.id===copy.id); if(i>=0)RACES[i]=copy; else RACES.push(copy);
    const arr=saved().filter(r=>r.id!==copy.id); arr.push(copy); writeSaved(arr);
    window.buildRaceTree?.(); window.buildRaceSelectors?.(); window.renderRaceTree?.(); window.renderImportChecklist?.(); window.render?.(); renderStatus();
    const msg=`Saved to database: ${copy.event||copy.id}\n${copy.entries.length} cars · ${copy.performance.fastestLaps?.length||0} FL · ${copy.performance.poles?.length||0} PP`;
    const st=$('commitRaceStatus')||$('saveRaceStatus'); if(st)st.innerHTML='✓ '+esc(msg).replace(/\n/g,'<br>');
    alert(msg);
  }
  function patchCopy(){
    const steps=document.querySelector('.wizard-steps'); if(steps)steps.innerHTML='<span class="wizard-step active">1 Metadata</span><span class="wizard-step">2 Race classification</span><span class="wizard-step">3 Qualifying / PP</span><span class="wizard-step">4 Save</span>';
    const intro=document.querySelector('#tab-import .import-panel>p.muted'); if(intro)intro.textContent='ACO/WEC import without Entry List. Load Race Classification first; SCC extracts order and FL from it. Then load both Hyperpole PDFs for PP (HYP + LMGT3).';
    const rCard=$('resultsDrop')?.closest('.wizard-card'); if(rCard){const h=rCard.querySelector('h3'); if(h)h.textContent='2 · Race classification / results'; const p=rCard.querySelector('p.muted'); if(p)p.textContent='Main race classification PDF. This creates the race order and also extracts fastest laps, so FL does not need a second upload.';}
    const pCard=$('performanceDrop')?.closest('.wizard-card'); if(pCard){const h=pCard.querySelector('h3'); if(h)h.textContent='3 · Qualifying / Hyperpole for PP'; const p=pCard.querySelector('p.muted'); if(p) p.innerHTML='Load multiple PDFs here at once: <b>Hyperpole HYP</b> and <b>Hyperpole LMGT3</b>. SCC combines both categories into PP rows.';} 
    const rd=$('resultsDrop'); if(rd)rd.childNodes[0].nodeValue='Drop Race Classification / Results PDF here';
    const pd=$('performanceDrop'); if(pd)pd.childNodes[0].nodeValue='Drop both Hyperpole / Qualifying PDFs here';
    const rc=$('raceControlDrop')?.closest('.wizard-card'); if(rc)rc.style.display='none';
  }
  function addCommit(){
    const el=$('importChecklist'); if(el&&!$('commitRaceBtn')) el.insertAdjacentHTML('beforeend','<div class="import-commit-box"><button id="commitRaceBtn">Save to database</button><span id="commitRaceStatus" class="muted">Saves this race in the browser database and refreshes the archive.</span></div>');
    const b=$('commitRaceBtn'); if(b)b.onclick=saveRace;
  }
  function css(){
    if($('aco8615css'))return; const s=document.createElement('style'); s.id='aco8615css'; s.textContent=`.aco-session-status{margin:10px 0 14px;padding:12px;border:1px solid rgba(255,255,255,.13);border-radius:14px;background:rgba(255,255,255,.045);display:grid;gap:10px}.aco-session-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#9fb0c7;font-weight:900}.aco-session-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.aco-session-kpis>div{padding:9px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}.aco-session-kpis b{display:block;font-size:22px;line-height:1}.aco-session-kpis span{font-size:11px;color:#9fb0c7;text-transform:uppercase;font-weight:800}.aco-session-kpis .ok{border-color:rgba(34,197,94,.35);background:rgba(34,197,94,.08)}.aco-session-kpis .bad{border-color:rgba(239,68,68,.32);background:rgba(239,68,68,.07)}.aco-session-files{display:grid;gap:5px}.aco-session-files>div{display:grid;grid-template-columns:minmax(0,1fr) 110px 130px;gap:8px;align-items:center;padding:7px 8px;border-radius:9px;background:rgba(0,0,0,.17);border:1px solid rgba(255,255,255,.08)}.aco-session-files span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.aco-session-files b{font-size:11px;text-transform:uppercase}.aco-session-files small{color:#9fb0c7}.aco-session-files .ok{border-color:rgba(34,197,94,.25)}.aco-session-files .warn{border-color:rgba(245,158,11,.25)}.aco-session-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.import-commit-box{margin-top:12px;display:grid;gap:8px}`; document.head.appendChild(s);
  }
  function boot(){
    version(); css(); mergeSavedRaces(); patchCopy(); bindDrop('resultsDrop','resultsFile','results'); bindDrop('performanceDrop','performanceFile','qualifying'); renderStatus(); addCommit();
    const oldApply=window.applyImportMetadata; const applyBtn=$('applyMetadataBtn'); if(applyBtn){applyBtn.onclick=()=>{const before=session.lastRaceId; oldApply&&oldApply(); const id=raceKey(); if(before&&id&&before!==id)clearSession(); session.lastRaceId=id; renderStatus();};}
    const idInput=$('importId'); if(idInput)idInput.addEventListener('change',checkRaceChanged);
    setTimeout(()=>{version(); patchCopy(); renderStatus(); addCommit();},200);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot); else boot();
})();
