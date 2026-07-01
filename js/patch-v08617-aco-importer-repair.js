/* SCC v0.8.6.17 · ACO importer repair
   Real repair layer over v0.8.6.16:
   - robust WEC/ACO race-classification parser for mixed PDF.js line order
   - robust Hyperpole/Qualifying parser for two PDF files (HYP + LMGT3)
   - no old stale session carry-over when race id changes
   - de-duplication by car number, with canonical driver aliases
   - Save to database updates the in-memory RACES array and the browser localStorage override
*/
(function(){
  const VERSION='v0.8.6.17';
  const STORE='sccSavedRaces.v0.8.6';
  const $=id=>document.getElementById(id);
  const E=window.esc||(s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])));
  const clean=s=>String(s||'').replace(/\u00a0/g,' ').replace(/\t/g,' ').replace(/\s+/g,' ').trim();
  const strip=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const norm=s=>strip(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const isPdf=t=>/^\[SCC_PDF_TEXT:/i.test(String(t||'').trim());
  const body=t=>String(t||'').replace(/\r/g,'').split('\n').filter((_,i)=>!(i===0&&/^\[SCC_PDF_TEXT:/i.test(String(t||'')))).join('\n');
  const canonClass=c=>{/LMGT3|GT3/i.test(c||'') ? c='LMGT3' : /HYPERCAR|\bHYP\b/i.test(c||'') ? c='HYP' : c=String(c||'').toUpperCase(); return c||'';};
  const carNo=x=>String(x||'').trim();
  const aliases={
    'daniel juncadella':'Dani Juncadella','d juncadella':'Dani Juncadella',
    's van der linde':'Sheldon van der Linde','l derani':'Pipo Derani','d vanthoor':'Dries Vanthoor',
    'n de vries':'Nyck de Vries','a felix da costa':'António Félix da Costa',
    'p di resta':'Paul di Resta','p loup chatin':'Paul-Loup Chatin',
    'y ye':'Yifei Ye','a umbărescu':'Petru Umbrarescu','p umbrarescu':'Petru Umbrarescu'
  };
  function titleName(s){
    s=clean(s).toLowerCase().replace(/(^|[\s\-'])([a-zà-ž])/g,(m,a,b)=>a+b.toUpperCase());
    return s.replace(/\bVan\b/g,'van').replace(/\bDer\b/g,'der').replace(/\bDe\b/g,'de').replace(/\bDi\b/g,'di').replace(/\bDa\b/g,'da').replace(/\bDu\b/g,'du').replace(/\bDel\b/g,'del').replace(/\bLoup\b/g,'Loup');
  }
  function countryFor(n){return (window.lookupDriverCountry&&window.lookupDriverCountry(n))||(window.DRIVER_COUNTRY_DB&&window.DRIVER_COUNTRY_DB[norm(n)])||'';}
  function expandInitialName(initial,surname){
    let raw=clean((initial?initial+'. ':'')+(surname||'')); const k=norm(raw); if(aliases[k])return aliases[k];
    const last=norm(surname); const fi=String(initial||'').toLowerCase();
    const names=[];
    if(window.DRIVER_MASTER?.drivers) names.push(...window.DRIVER_MASTER.drivers.map(d=>d.name).filter(Boolean));
    if(window.DRIVER_COUNTRY_DB) names.push(...Object.keys(window.DRIVER_COUNTRY_DB));
    const hit=names.find(n=>{const p=strip(n).split(/\s+/); return p[0]?.[0]?.toLowerCase()===fi && norm(p.slice(1).join(' '))===last;})
      || names.find(n=>{const p=strip(n).split(/\s+/); return p[0]?.[0]?.toLowerCase()===fi && norm(p.slice(-Math.max(1,last.split(' ').length)).join(' '))===last;});
    return hit ? titleName(hit) : titleName(raw);
  }
  function driverPairsFromLine(line){
    const out=[];
    const re=/\b([A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ])\.\s*([A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ][A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ'’\-]+(?:\s+(?:VAN|DER|DE|DA|DI|DEL|DU|LE|LA|FÉLIX|LOUP|SETTE)\s+[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ][A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ'’\-]+)*)/g;
    let m; while((m=re.exec(line))){
      const name=expandInitialName(m[1],m[2]); const k=norm(name);
      if(k&&!out.some(d=>norm(d[0])===k)) out.push([name,countryFor(name)]);
    }
    return out;
  }
  const models=['BMW M Hybrid V8','Ferrari 499P','Aston Martin Valkyrie','Toyota TR010 Hybrid','Toyota GR010 HYBRID','Cadillac V-Series.R','Alpine A424','Peugeot 9X8','Genesis GMR-001-Hypercar','Genesis GMR-001','McLaren 720S LMGT3 Evo','Aston Martin Vantage AMR LMGT3','Porsche 911 GT3 R LMGT3','Ferrari 296 LMGT3 Evo','Lexus RC F LMGT3','Corvette Z06 LMGT3.R','Mercedes-AMG LMGT3','BMW M4 LMGT3 Evo','BMW M4 LMGT3','Ford Mustang LMGT3'];
  function findModel(line){const s=clean(line); const hit=models.find(m=>new RegExp(m.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(s)); return hit||'';}
  function ctorFrom(line,model){return (window.constructorFromVehicle&&window.constructorFromVehicle(model||line))||clean(model||line).split(/\s+/)[0].toLowerCase();}
  function parseTimeSeconds(t){
    t=String(t||'').trim(); const p=t.split(':').map(Number); if(p.length===3)return p[0]*3600+p[1]*60+p[2]; if(p.length===2)return p[0]*60+p[1]; return Number(t)||999999;
  }
  function noToken(t){return /^(?:00[79]|\d{1,3})$/.test(String(t||''));}
  function findPosNo(tokens){
    const cand=[];
    for(let i=0;i<tokens.length-1;i++){
      if(!/^\d{1,2}$/.test(tokens[i])||!noToken(tokens[i+1])) continue;
      const pos=+tokens[i]; if(pos<1||pos>80)continue;
      let score=0; if(i===0)score+=10;
      const next=tokens.slice(i+2,i+8).join(' '); const prev=tokens.slice(Math.max(0,i-4),i).join(' ');
      if(/[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇ]\.\s*[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇ]/.test(next))score+=7;
      if(/HYPERCAR|LMGT3|GT3|Hypercar/i.test(prev))score+=4;
      if(/^(M|G|P)$/.test(tokens[i-1]||''))score-=6;
      if(/^\d{2,3}$/.test(tokens[i+2]||''))score-=2;
      cand.push({i,pos,no:tokens[i+1],score});
    }
    cand.sort((a,b)=>b.score-a.score||a.i-b.i);
    return cand[0]||null;
  }
  function parseRaceLine(raw,status){
    const line=clean(raw); if(!line || !/\b(HYPERCAR|LMGT3)\b/i.test(line)) return null;
    if(/^Circuit\s+|^CAR\s+\d+\s+-|Published at|Stewards|Timekeeper/i.test(line)) return null;
    const tokens=line.split(/\s+/); const pn=findPosNo(tokens); if(!pn) return null;
    const cls=canonClass(/\bLMGT3\b/i.test(line)?'LMGT3':'HYPERCAR');
    const drivers=driverPairsFromLine(line);
    if(!drivers.length && status==='Classified') return null;
    const model=findModel(line); const ctor=ctorFrom(line,model);
    let laps='';
    const lapM=line.match(/\b[MG]\s+(\d{2,3})\b/); if(lapM) laps=+lapM[1];
    const times=[...line.matchAll(/\b\d{1,2}:\d{2}(?::\d{2})?\.\d{3}\b/g)].map(m=>m[0]);
    const total=times.find(t=>t.split(':').length===3)||'';
    const lapTimes=times.filter(t=>t.split(':').length===2);
    const bestLap=lapTimes.length?lapTimes[lapTimes.length-1]:'';
    let bestLapNo=''; if(bestLap){const idx=tokens.findIndex(t=>t===bestLap); if(idx>0&&/^\d{1,3}$/.test(tokens[idx-1]))bestLapNo=tokens[idx-1];}
    return {pos:pn.pos,no:carNo(pn.no),class:cls,constructor:ctor,model:model||ctor,team:teamGuess(line,model,pn),drivers,laps,time:total,total_time:total,status:status||'Classified',gap:status==='Classified'?'—':status,bestLap,bestLapNo};
  }
  function teamGuess(line,model,pn){
    let s=clean(line); if(model) s=s.split(model)[0];
    s=s.replace(new RegExp('^\\s*'+pn.pos+'\\s+'+pn.no+'\\s*'),'');
    s=s.replace(/\b[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇ]\.\s*[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇ][A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑÇ'’\-]+(?:\s*\/\s*)?/g,'').replace(/\b(HYPERCAR|LMGT3)\b.*$/i,'');
    return clean(s).slice(0,70)||'';
  }
  function parseAcoRace(text){
    const lines=body(text).split('\n'); const rows=[]; let status='Classified';
    for(const raw of lines){
      const line=clean(raw); if(!line) continue;
      if(/^Not classified/i.test(line)){status='NC';continue;} if(/^Retired/i.test(line)){status='RET';continue;}
      if(/^Circuit Best|^Circuit Race|^CAR\s+\d+\s+-|^Published at|^Stewards|^Timekeeper/i.test(line)) break;
      const r=parseRaceLine(raw,status); if(r) rows.push(r);
    }
    const by=new Map();
    rows.forEach(r=>{const k=carNo(r.no); const old=by.get(k); if(!old || (r.drivers||[]).length>(old.drivers||[]).length || (r.status==='Classified'&&old.status!=='Classified')) by.set(k,r);});
    return [...by.values()].sort((a,b)=>(a.pos||999)-(b.pos||999));
  }
  function parseAcoPp(text,name){
    const txt=body(text), src=canonClass(/LMGT3|GT3/i.test(name+' '+txt)&&!/HYPERCAR/i.test(name)?'LMGT3':/HYPERCAR|\bHYP\b/i.test(name+' '+txt)?'HYP':'');
    const rows=[]; txt.split('\n').forEach(raw=>{
      const line=clean(raw); if(!line || !/\b\d{1,2}:\d{2}\.\d{3}\b/.test(line)) return;
      if(/Free Practice|Warm|Best Sector|Top Speed|Weather/i.test(line)) return;
      const tokens=line.split(/\s+/); const pn=findPosNo(tokens); if(!pn) return;
      const drivers=driverPairsFromLine(line); const model=findModel(line); const times=[...line.matchAll(/\b\d{1,2}:\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      const time=times[0]||''; if(!time)return;
      rows.push({type:'PP',rank:pn.pos,pos:pn.pos,no:carNo(pn.no),class:src||canonClass(/LMGT3/i.test(line)?'LMGT3':'HYPERCAR'),driver:drivers[0]?.[0]||'',time,constructor:ctorFrom(line,model),model});
    });
    const byNo=new Map(); rows.forEach(r=>{const o=byNo.get(r.no); if(!o || (r.rank||999)<(o.rank||999))byNo.set(r.no,r);});
    return [...byNo.values()].sort((a,b)=>(a.rank||999)-(b.rank||999));
  }
  function bestFL(entries){
    const out={}, add=(key,e)=>{if(!e.bestLap)return; const base={type:'FL',class:key,no:e.no,driver:e.drivers?.[0]?.[0]||'',lap:e.bestLapNo||'',time:e.bestLap}; if(!out[key]||parseTimeSeconds(base.time)<parseTimeSeconds(out[key].time)) out[key]=base;};
    entries.forEach(e=>{add(e.class,e); add('Overall',e);});
    return ['Overall','HYP','LMGT3','LMP2','LMP3'].filter(k=>out[k]);
  }
  function getSessionTexts(kind){
    const s=window.sccAcoSession; const list=(kind==='results'?s?.results:s?.qualifying)||[];
    if(list.length) return list.filter(x=>x&&x.text).map(x=>({name:x.name||'',text:x.text}));
    const id=kind==='results'?'resultsCsv':'performanceCsv'; const v=$(id)?.value||''; if(!v)return[];
    return v.split(/---\s*SCC_NEXT_(?:RESULTS|QUALIFYING)_PDF\s*---/i).filter(Boolean).map((text,i)=>({name:'textarea '+(i+1),text}));
  }
  function allRaceEntries(){return dedupe(getSessionTexts('results').flatMap(s=>parseAcoRace(s.text)));}
  function allPpRows(){return getSessionTexts('qualifying').flatMap(s=>parseAcoPp(s.text,s.name));}
  function poleRows(){
    const rows=allPpRows(); const best={}; rows.forEach(r=>{if(!best[r.class] || (r.rank||999)<(best[r.class].rank||999))best[r.class]=r; if(!best.Overall||parseTimeSeconds(r.time)<parseTimeSeconds(best.Overall.time))best.Overall={...r,class:'Overall'};});
    return ['Overall','HYP','LMGT3','LMP2','LMP3'].filter(k=>best[k]).map(k=>best[k]);
  }
  function dedupe(rows){
    const by=new Map(); rows.forEach(r=>{const k=carNo(r.no); if(!k)return; const old=by.get(k); if(!old){by.set(k,r);return;} const names=new Map(); [...(old.drivers||[]),...(r.drivers||[])].forEach(d=>{const name=aliases[norm(d[0])]||d[0]; const nk=norm(name); if(nk&&!names.has(nk))names.set(nk,[name,d[1]||countryFor(name)]);}); by.set(k,{...old,...r,drivers:[...names.values()],pos:Math.min(+old.pos||999,+r.pos||999)});});
    return [...by.values()].sort((a,b)=>(a.pos||999)-(b.pos||999));
  }
  function driverStack(drivers){return `<span class="driver-stack">${(drivers||[]).map(d=>`<span>${window.flag?window.flag(d[1]||countryFor(d[0])):''}${E(d[0]||'')}</span>`).join('')}</span>`;}
  function previewResults(){const el=$('resultsPreview'); if(!el)return; const rows=allRaceEntries(); el.innerHTML=rows.length?`<div class="import-ok"><b>${rows.length}</b> race result cars detected · merged by car number</div><div class="aco-preview-table"><div class="head"><span>Pos</span><span>No</span><span>Class</span><span>Team</span><span>Car</span><span>Drivers</span><span>Status</span></div>${rows.map(r=>`<div><b>P${E(r.pos)}</b><b>#${E(r.no)}</b><span>${window.classBadge?classBadge(r.class):E(r.class)}</span><span>${E(r.team||'')}</span><span>${E(r.model||'')}</span>${driverStack(r.drivers)}<span>${E(r.status||'')}</span></div>`).join('')}</div>`:'<div class="empty-state">No race result rows detected.</div>'; renderStatus(); return rows;}
  function previewPerf(){const el=$('performancePreview'); if(!el)return; const pp=poleRows(); const fl=bestFL(allRaceEntries()); el.innerHTML=(pp.length||fl.length)?`<div class="import-ok"><b>${pp.length}</b> PP rows · <b>${fl.length}</b> FL rows</div><div class="aco-perf-list">${[...pp,...fl].map(p=>`<div><span class="pill">${E(p.type)}</span><span>${E(p.class)}</span><b>#${E(p.no)}</b><span>${window.flag?window.flag(countryFor(p.driver)):''}${E(p.driver||'')}</span><strong>${E(p.time||'—')}</strong></div>`).join('')}</div>`:'<div class="empty-state">No PP/FL rows detected yet.</div>'; renderStatus(); return {pp,fl};}
  function renderStatus(){
    const box=$('acoSessionStatus'); if(!box)return; const r=allRaceEntries(), pp=poleRows(), fl=bestFL(r); const files=[...getSessionTexts('results').map(x=>({role:'Race',name:x.name,count:parseAcoRace(x.text).length})),...getSessionTexts('qualifying').map(x=>({role:'PP',name:x.name,count:parseAcoPp(x.text,x.name).length}))];
    box.innerHTML=`<div class="aco-session-title">ACO import session</div><div class="aco-session-kpis"><div class="${r.length?'ok':'bad'}"><b>${r.length}</b><span>Results cars</span></div><div class="${fl.length?'ok':'bad'}"><b>${fl.length}</b><span>FL rows</span></div><div class="${pp.length?'ok':'bad'}"><b>${pp.length}</b><span>PP rows</span></div></div><div class="aco-session-files">${files.map(f=>`<div class="${f.count?'ok':'warn'}"><span>${E(f.name||'PDF/text')}</span><b>${E(f.role)}</b><small>${f.count} rows</small></div>`).join('')||'<div><span>No PDFs loaded in this session.</span><b>—</b><small>0 rows</small></div>'}</div>`;
  }
  function ensureStatusBox(){const card=$('resultsDrop')?.closest('.wizard-card'); if(card&&!$('acoSessionStatus'))card.insertAdjacentHTML('beforebegin','<div id="acoSessionStatus" class="aco-session-status"></div>');}
  function importResults(){const rows=previewResults(); if(!rows.length)return alert('No race result rows detected.'); window.state.race.entries=rows; const fl=bestFL(rows); state.race.performance=state.race.performance||{}; if(fl.length)state.race.performance.fastestLaps=fl; window.learnDriverCountries?.(rows); window.recalculateClassPositions?.(); window.render?.(); previewResults(); previewPerf(); alert(`${rows.length} result cars imported. ${fl.length} FL rows extracted.`);}
  function importPerf(){const pp=poleRows(), fl=bestFL(allRaceEntries()); state.race.performance=state.race.performance||{}; state.race.performance.poles=pp; if(fl.length)state.race.performance.fastestLaps=fl; window.render?.(); previewPerf(); alert(`${pp.length} PP rows imported. ${fl.length} FL rows available.`);}
  function saved(){try{return JSON.parse(localStorage.getItem(STORE)||'[]')}catch{return[]}}
  function saveDb(){
    if(!state.race?.id)return alert('Missing Race ID.');
    if(!state.race.entries?.length){const rows=allRaceEntries(); if(rows.length)state.race.entries=rows;}
    state.race.performance=state.race.performance||{};
    if(!state.race.performance.fastestLaps?.length){const fl=bestFL(state.race.entries||allRaceEntries()); if(fl.length)state.race.performance.fastestLaps=fl;}
    if(!state.race.performance.poles?.length){const pp=poleRows(); if(pp.length)state.race.performance.poles=pp;}
    const copy=JSON.parse(JSON.stringify(state.race)); copy.entries=dedupe(copy.entries||[]); copy.completeness={...(copy.completeness||{}),results:!!copy.entries.length,fastestLaps:!!copy.performance?.fastestLaps?.length,poles:!!copy.performance?.poles?.length};
    const i=window.RACES.findIndex(r=>r.id===copy.id); if(i>=0)RACES[i]=copy; else RACES.push(copy);
    const arr=saved().filter(r=>r.id!==copy.id); arr.push(copy); localStorage.setItem(STORE,JSON.stringify(arr));
    window.buildRaceTree?.(); window.buildRaceSelectors?.(); window.renderRaceTree?.(); window.renderImportChecklist?.(); window.render?.(); renderStatus();
    const msg=`Saved to database: ${copy.event||copy.id}\n${copy.entries.length} cars · ${copy.performance.fastestLaps?.length||0} FL · ${copy.performance.poles?.length||0} PP`;
    const st=$('commitRaceStatus')||$('saveRaceStatus'); if(st)st.innerHTML='✓ '+E(msg).replace(/\n/g,'<br>'); alert(msg);
  }
  function clearSession(){
    if(window.sccAcoSession){window.sccAcoSession.results=[];window.sccAcoSession.qualifying=[];window.sccAcoSession.lastRaceId=$('importId')?.value||'';}
    ['resultsCsv','performanceCsv'].forEach(id=>{if($(id))$(id).value='';}); ['resultsFile','performanceFile'].forEach(id=>{if($(id))$(id).value='';}); previewResults(); previewPerf(); renderStatus();
  }
  function version(){document.title='SCC '+VERSION+' · ACO importer repaired'; document.body.dataset.sccVersion='0.8.6.17'; document.querySelectorAll('.brand span,.version,.app-version,[data-version]').forEach(el=>el.textContent=VERSION);}
  function css(){if($('aco8617css'))return; const s=document.createElement('style'); s.id='aco8617css'; s.textContent=`.aco-preview-table{display:grid;gap:6px;margin-top:10px}.aco-preview-table>div{display:grid;grid-template-columns:54px 60px 90px 1.15fr 1.15fr 1.2fr 90px;gap:8px;align-items:start;padding:7px 8px;border-bottom:1px solid rgba(255,255,255,.07)}.aco-preview-table .head{font-size:11px;text-transform:uppercase;color:#9fb0c7;font-weight:900}.driver-stack{display:grid;gap:2px}.driver-stack>span{display:block}.aco-session-status{margin:10px 0 14px;padding:12px;border:1px solid rgba(255,255,255,.13);border-radius:14px;background:rgba(255,255,255,.045);display:grid;gap:10px}.aco-session-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#9fb0c7;font-weight:900}.aco-session-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.aco-session-kpis>div{padding:9px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}.aco-session-kpis b{display:block;font-size:22px;line-height:1}.aco-session-kpis span{font-size:11px;color:#9fb0c7;text-transform:uppercase;font-weight:800}.aco-session-kpis .ok{border-color:rgba(34,197,94,.35);background:rgba(34,197,94,.08)}.aco-session-kpis .bad{border-color:rgba(239,68,68,.32);background:rgba(239,68,68,.07)}.aco-session-files{display:grid;gap:5px}.aco-session-files>div{display:grid;grid-template-columns:minmax(0,1fr) 80px 90px;gap:8px;align-items:center;padding:7px 8px;border-radius:9px;background:rgba(0,0,0,.17);border:1px solid rgba(255,255,255,.08)}.aco-session-files span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.aco-session-files b{font-size:11px;text-transform:uppercase}.aco-session-files small{color:#9fb0c7}.aco-session-files .ok{border-color:rgba(34,197,94,.25)}.aco-session-files .warn{border-color:rgba(245,158,11,.25)}`; document.head.appendChild(s);}
  function patchButtons(){
    window.previewCsv=function(type){if(type==='results')return previewResults(); if(type==='performance')return previewPerf(); return [];};
    window.importResultsCsv=importResults; window.importPerformanceCsv=importPerf; window.sccClearAcoImportSession=clearSession;
    const rb=[...document.querySelectorAll('button')].find(b=>/Preview results/i.test(b.textContent)); if(rb)rb.onclick=previewResults;
    const ib=[...document.querySelectorAll('button')].find(b=>/Import results/i.test(b.textContent)); if(ib)ib.onclick=importResults;
    const pb=[...document.querySelectorAll('button')].find(b=>/Preview PP|Preview.*Grid/i.test(b.textContent)); if(pb)pb.onclick=previewPerf;
    const qb=[...document.querySelectorAll('button')].find(b=>/Import PP|Import.*Grid/i.test(b.textContent)); if(qb)qb.onclick=importPerf;
    const cb=$('commitRaceBtn'); if(cb)cb.onclick=saveDb;
  }
  function boot(){version(); css(); ensureStatusBox(); patchButtons(); previewResults(); previewPerf(); renderStatus(); setTimeout(()=>{version(); ensureStatusBox(); patchButtons(); renderStatus();},400);}
  window.sccAcoRepair={parseAcoRace,parseAcoPp,allRaceEntries,poleRows,bestFL,saveDb};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot); else boot();
})();
