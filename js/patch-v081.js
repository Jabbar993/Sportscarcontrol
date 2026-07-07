/* SCC v0.8.1: Import save workflow + DB renderer repair + ACO/WEC grid/classification parsing */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=s=>String(s||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const norm=s=>clean(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,' ').trim().toLowerCase();
const title=s=>clean(s).toLowerCase().replace(/(^|\s|[-'])\p{L}/gu,m=>m.toUpperCase());
const SAVED_KEY='scc_saved_races_v081';

function setVersion(){
  document.title='SCC v0.8.1 · Import save + DB repair';
  document.querySelectorAll('.brand span').forEach(x=>x.textContent='v0.8.1');
  document.body.dataset.sccVersion='0.8.1';
}
function savedRaces(){try{return JSON.parse(localStorage.getItem(SAVED_KEY)||'[]')}catch{return[]}}
function persistSaved(list){try{localStorage.setItem(SAVED_KEY,JSON.stringify(list))}catch(e){console.warn('save race failed',e)}}
function mergeSavedRaces(){
  const saved=savedRaces(); if(!Array.isArray(saved)||!saved.length||!window.RACES)return;
  saved.forEach(r=>{const i=RACES.findIndex(x=>x.id===r.id); if(i>=0)RACES[i]=r; else RACES.push(r);});
}
function saveCurrentRaceToArchive(){
  if(!window.state||!state.race)return;
  const race=structuredClone(state.race);
  race.updatedAt=new Date().toISOString();
  const saved=savedRaces();
  const si=saved.findIndex(r=>r.id===race.id); if(si>=0)saved[si]=race; else saved.push(race); persistSaved(saved);
  const ri=RACES.findIndex(r=>r.id===race.id); if(ri>=0)RACES[ri]=race; else RACES.push(race);
  if(typeof window.learnDriverCountries==='function') learnDriverCountries(race.entries||[]);
  if(typeof window.render==='function') render();
  alert(`Race saved to archive and database: ${race.event||race.id}`);
}
function injectSaveButton(){
  // js/importer.js owns the Import tab now and already provides an equivalent action
  // ("Save to database" in the checklist); don't graft this onto its UI.
  if($('importerCard'))return;
  const importPanel=document.querySelector('.import-panel'); if(importPanel && !$('saveRaceToArchiveBtn')){
    const bar=document.createElement('div'); bar.className='wizard-card save-race-card';
    bar.innerHTML=`<h3>6 · Save race</h3><p class="muted">Writes the current imported race into the local archive and immediately rebuilds the global database.</p><div class="form-actions"><button id="saveRaceToArchiveBtn">Save race to archive + database</button></div><div id="saveRaceStatus" class="mini-note"></div>`;
    importPanel.appendChild(bar);
    $('saveRaceToArchiveBtn').onclick=saveCurrentRaceToArchive;
  }
  const storagePanel=[...document.querySelectorAll('.panel h2')].find(h=>/Storage\s*\/\s*Race Data/i.test(h.textContent||''))?.closest('.panel');
  if(storagePanel && !$('saveRaceToArchiveBtnSettings')){
    const b=document.createElement('button'); b.id='saveRaceToArchiveBtnSettings'; b.textContent='Save race to archive + database'; b.onclick=saveCurrentRaceToArchive;
    const actions=storagePanel.querySelector('.form-actions')||storagePanel; actions.appendChild(b);
  }
}

const COUNTRY_BY_DRIVER={
  'robin frijns':'Netherlands','rene rast':'Germany','rené rast':'Germany','sheldon van der linde':'South Africa','kevin magnussen':'Denmark','raffaele marciello':'Switzerland','dries vanthoor':'Belgium','antonio fuoco':'Italy','miguel molina':'Spain','nicklas nielsen':'Denmark','harry tincknell':'United Kingdom','tom gamble':'United Kingdom','mike conway':'United Kingdom','kamui kobayashi':'Japan','nyck de vries':'Netherlands','yifei ye':'China','ye yifei':'China','robert kubica':'Poland','phil hanson':'United Kingdom','paul di resta':'United Kingdom','stoffel vandoorne':'Belgium','nick cassidy':'New Zealand','andre lotterer':'Germany','andré lotterer':'Germany','luis felipe derani':'Brazil','pipo derani':'Brazil','mathys jaubert':'France','will stevens':'United Kingdom','norman nato':'France','louis deletraz':'Switzerland','louis delétraz':'Switzerland','sebastien buemi':'Switzerland','sébastien buemi':'Switzerland','brendon hartley':'New Zealand','ryo hirakawa':'Japan','frederic makowiecki':'France','frédéric makowiecki':'France','jules gounon':'France','victor martins':'France','antonio felix da costa':'Portugal','antónio félix da costa':'Portugal','charles milesi':'France','ferdinand habsburg':'Austria','mathieu jaminet':'France','paul loup chatin':'France','daniel juncadella':'Spain','dani juncadella':'Spain','antares au':'Hong Kong','thomas fleming':'United Kingdom','tom fleming':'United Kingdom','marvin kirchhofer':'Germany','marvin kirchhöfer':'Germany','ian james':'United Kingdom','zacharie robichon':'Canada','mattia drudi':'Italy','yasser shahin':'Australia','richard lietz':'Austria','riccardo pera':'Italy','francois heriau':'France','françois hériau':'France','simon mann':'United States','adam west':'Australia','finn gehrsitz':'Germany','ben goethe':'Denmark','petru umbrarescu':'Romania','petru umbrărescu':'Romania','clemens schmid':'Austria','jose maria lopez':'Argentina','josé maría lópez':'Argentina','joel sturm':'Germany','takeshi kimura':'Japan','tom van rompuy':'Belgium','hadrien david':'France','esteban masson':'France','loic duval':'France','loïc duval':'France','theo pourchaire':'France','théo pourchaire':'France','earl bamber':'New Zealand','alex riberas':'Spain','marco sorensen':'Denmark','marco sørensen':'Denmark','james calado':'United Kingdom','alessandro pier guidi':'Italy','antonio giovinazzi':'Italy','jonny edgar':'United Kingdom','johnny edgar':'United Kingdom','alex riberas':'Spain','mikkel jensen':'Denmark','ritomo miyata':'Japan','oliver gray':'United Kingdom','louis rousset':'France','james allen':'Australia','malthe jakobsen':'Denmark','tom dillmann':'France','bijoy garg':'United States','nick yelloly':'United Kingdom'
};
function countryFor(name,explicit){
  if(explicit)return explicit;
  const k=norm(name); if(COUNTRY_BY_DRIVER[k])return COUNTRY_BY_DRIVER[k];
  if(typeof window.lookupDriverCountry==='function')return lookupDriverCountry(name)||'';
  return '';
}
function driverTuple(name,country){return [clean(name), countryFor(name,country)];}
function parseDriverList(s){return clean(s).split(/\s*\|\s*|\s*\/\s*/).map(x=>x.trim()).filter(Boolean).map(n=>driverTuple(titleDriver(n)));}
function titleDriver(n){return clean(n).split(/\s+/).map(w=>/^[A-Z]\.$/.test(w)?w:w.charAt(0)+w.slice(1).toLowerCase()).join(' ');}
function normalizeClass(c){const x=String(c||'').toUpperCase().replace(/[\s_/-]/g,''); if(x==='HYPERCAR'||x==='HYP')return'HYP'; if(x==='LMGT3'||x==='GT3')return'LMGT3'; if(x==='LMP2PA'||x==='LMP2PROAM'||x==='PA')return'LMP2PA'; if(x==='GTDPRO')return'GTDPRO'; return c||'';}
function constructorFromText(t){
  const x=norm(t); const list=[['astonmartin','astonmartin'],['mercedesamg','mercedes'],['bmw','bmw'],['ferrari','ferrari'],['porsche','porsche'],['toyota','toyota'],['cadillac','cadillac'],['alpine','alpine'],['peugeot','peugeot'],['genesis','genesis'],['mclaren','mclaren'],['lexus','lexus'],['corvette','corvette'],['ford','ford'],['oreca','oreca'],['ligier','ligier'],['duqueine','duqueine'],['adess','adess'],['ginetta','ginetta'],['acura','acura'],['audi','audi'],['lamborghini','lamborghini'],['hyundai','hyundai']];
  const hit=list.find(([needle])=>x.includes(needle)); return hit?hit[1]:'';
}
function existingEntry(no){return (state.race?.entries||[]).find(e=>String(e.no)===String(no));}
function hydrateByNo(base){
  const e=existingEntry(base.no)||{};
  return {...e,...base,
    class: base.class||e.class||'', constructor: base.constructor||e.constructor||constructorFromText(base.model||base.team||''), model: base.model||e.model||'', team: base.team||e.team||'', drivers: (base.drivers&&base.drivers.length)?base.drivers:(e.drivers||[])
  };
}
function splitGapTokens(str){
  str=clean(str); if(!str)return ['—',''];
  const lapMatches=[...str.matchAll(/(\d+)\s+Laps?|1\s+Lap/gi)].map(m=>m[0].replace(/\s+/g,' '));
  const secs=[...str.matchAll(/\d+\.\d{3}/g)].map(m=>m[0]);
  if(lapMatches.length)return [lapMatches[0],lapMatches[1]||secs[0]||''];
  return [secs[0]||'—',secs[1]||''];
}
function parseWecClassification081(text){
  const body=(window.pdfTextBody?pdfTextBody(text):String(text||'')).replace(/\r/g,'');
  if(!/Final\s+Classification/i.test(body) || !/FIA\s*WEC|World\s+Endurance/i.test(body))return [];
  const lines=body.split('\n').map(clean).filter(Boolean);
  let mode='FIN'; const rows=[];
  const classRx='(HYPERCAR|LMGT3)';
  for(const line of lines){
    if(/^Not\s+classified/i.test(line)){mode='NC';continue;} if(/^Retired/i.test(line)){mode='RET';continue;}
    if(/^Circuit\s+Best|^Circuit\s+Race|^CAR\s+|^Published|^Stewards|^Timekeeper/i.test(line))break;
    if(/^(Race|FIA\s*WEC|Final\s+Classification|No\s+Team|Best\s+Lap|TotalEnergies)/i.test(line))continue;
    let l=line.replace(/\t+/g,' ');
    let m;
    if(mode==='FIN'){
      m=l.match(new RegExp('^(\\d{1,2})\\s+([0-9]{1,3}|0[0-9]{2})\\s+(.+?)\\s+'+classRx+'\\s+[A-Z]\\s+(\\d+)\\s+(\\d{1,2}:\\d{2}:\\d{2}\\.\\d{3})\\s+(.+?)\\s+(\\d+)\\s+(\\d+)\\s+(\\d{1,2}:\\d{2}\\.\\d{3})\\s+([0-9.]+)','i'));
      if(!m){
        // handle rows where total time starts the line and the position/car number are later
        m=l.match(new RegExp('^(\\d{1,2}:\\d{2}:\\d{2}\\.\\d{3})\\s+(\\d+)\\s+(\\d{1,2}:\\d{2}\\.\\d{3})\\s+[0-9.]+\\s+(.+?)\\s+([0-9]{1,3}|0[0-9]{2})\\s+(.+?)\\s+'+classRx+'\\s+[A-Z]\\s+(\\d+)\\s+(.+?)\\s+(\\d+)','i'));
        if(m){
          const pos=+m[10], no=m[5], cls=normalizeClass(m[7]), laps=+m[8], total=m[1], best=m[3], bestNo=m[2];
          const [gap,intv]=splitGapTokens(m[9]);
          rows.push(hydrateByNo({pos,no,class:cls,laps,time:total,total_time:total,gap,int:intv,status:'FIN',bestLap:best,bestLapNo:bestNo,team:clean(m[4]),model:'',constructor:constructorFromText(m[4]),drivers:parseDriverList(m[6])}));
        }
        continue;
      }
      const pos=+m[1], no=m[2], before=clean(m[3]), cls=normalizeClass(m[4]), laps=+m[5], total=m[6], tail=m[7], bestNo=m[8], best=m[10];
      const [gap,intv]=splitGapTokens(tail);
      rows.push(hydrateByNo({pos,no,class:cls,laps,time:total,total_time:total,gap,int:intv,status:'FIN',bestLap:best,bestLapNo:bestNo,team:before,model:'',constructor:constructorFromText(before),drivers:[]}));
    }else{
      m=l.match(new RegExp('^([0-9]{1,3}|0[0-9]{2})\\s+(.+?)\\s+'+classRx+'\\s+[A-Z]\\s+(\\d+)\\s+(\\d{1,2}:\\d{2}:\\d{2}\\.\\d{3})\\s+(?:\\d+\\s+)?(?:\\d+\\s+)?(\\d{1,2}:\\d{2}\\.\\d{3})?','i'));
      if(!m)continue;
      rows.push(hydrateByNo({pos:rows.length+1,no:m[1],team:clean(m[2]),class:normalizeClass(m[3]),laps:+m[4],time:m[5],gap:mode,status:mode,bestLap:m[6]||'',drivers:[]}));
    }
  }
  const byNo=new Map(); rows.forEach(r=>{const k=String(r.no); if(!byNo.has(k)||((r.drivers||[]).length>(byNo.get(k).drivers||[]).length))byNo.set(k,r);});
  const rank={FIN:0,NC:1,RET:2,DNS:3,DSQ:4};
  return [...byNo.values()].sort((a,b)=>(rank[a.status]??9)-(rank[b.status]??9)||(Number(a.pos)||999)-(Number(b.pos)||999));
}
function parseWecGrid081(text){
  const body=(window.pdfTextBody?pdfTextBody(text):String(text||'')).replace(/\r/g,'');
  if(!/Final\s+Starting\s+Grid/i.test(body) || !/FIA\s*WEC|World\s+Endurance/i.test(body))return [];
  const lines=body.split('\n').map(clean).filter(Boolean);
  const candidates=[];
  function driverBefore(part){
    const m=part.match(/([A-ZÁÉÍÓÚÄËÏÖÜÑÇ][a-záéíóúäëïöüñçø]+\s+[A-ZÁÉÍÓÚÄËÏÖÜÑÇØ][A-ZÁÉÍÓÚÄËÏÖÜÑÇØ'\-]+)\s*$/u);
    return m?titleDriver(m[1]):'';
  }
  for(const l of lines){
    if(!/\d:\d{2}\.\d{3}/.test(l))continue;
    const times=[...l.matchAll(/\d:\d{2}\.\d{3}/g)].map(m=>m[0]);
    const nums=[...l.matchAll(/\b(0?\d{1,3})\b/g)].map(m=>m[1]).filter(n=>+n>0||/^0/.test(n));
    if(times.length>=2 && nums.length>=4){
      const leftNo=nums[nums.length-4], leftGrid=+nums[nums.length-3], rightGrid=+nums[nums.length-2], rightNo=nums[nums.length-1];
      const idx1=l.indexOf(times[times.length-2]), idx2=l.indexOf(times[times.length-1]);
      const rightDriver=driverBefore(l.slice(0,idx1));
      const leftDriver=driverBefore(l.slice(idx1+times[times.length-2].length,idx2));
      candidates.push({no:leftNo,grid:leftGrid,time:times[times.length-1],driver:leftDriver});
      candidates.push({no:rightNo,grid:rightGrid,time:times[times.length-2],driver:rightDriver});
    }else if(times.length>=1 && nums.length>=2){
      const no=nums[nums.length-2], grid=+nums[nums.length-1]; const idx=l.indexOf(times[times.length-1]);
      candidates.push({no,grid,time:times[times.length-1],driver:driverBefore(l.slice(0,idx))});
    }
  }
  const byNo=new Map(); candidates.forEach(c=>{const e=existingEntry(c.no)||{}; const cls=e.class || (+c.grid<=17?'HYP':'LMGT3'); const item={type:'PP',class:cls,no:c.no,driver:c.driver||((e.drivers||[])[0]||[])[0]||'',time:c.time,grid:c.grid}; if(!byNo.has(c.no)||item.grid<byNo.get(c.no).grid)byNo.set(c.no,item);});
  const all=[...byNo.values()].filter(x=>x.no&&x.grid);
  const out=[];
  const overall=all.slice().sort((a,b)=>a.grid-b.grid)[0]; if(overall)out.push({...overall,class:'Overall'});
  [...new Set(all.map(x=>x.class).filter(Boolean))].forEach(cls=>{const p=all.filter(x=>x.class===cls).sort((a,b)=>a.grid-b.grid)[0]; if(p)out.push({...p,class:cls});});
  return out;
}
function flFromClassificationRows(rows){
  const perf=[]; const best={};
  rows.forEach(r=>{if(!r.bestLap)return; const e=existingEntry(r.no)||r; const cls=e.class||r.class; const p={type:'FL',class:cls,no:r.no,driver:((r.drivers||e.drivers||[])[0]||[])[0]||'',lap:r.bestLapNo||'',time:r.bestLap};
    const sec=window.parseTime?parseTime('0:'+p.time):999999;
    if(!best[cls] || sec<(window.parseTime?parseTime('0:'+best[cls].time):999999))best[cls]=p;
    if(!best.Overall || sec<(window.parseTime?parseTime('0:'+best.Overall.time):999999))best.Overall={...p,class:'Overall'};
  });
  ['Overall','HYP','LMGT3','LMP2','LMP2PA','LMP3','GTP','GTDPRO','GTD','PRO','GOLD','SILVER','BRONZE'].forEach(k=>{if(best[k])perf.push(best[k]);});
  return perf;
}
const oldRowsFromPdf=window.rowsFromPdfText;
window.rowsFromPdfText=function(type,text){
  const body=(window.pdfTextBody?pdfTextBody(text):String(text||''));
  if(/Final\s+Starting\s+Grid/i.test(body))return parseWecGrid081(text);
  if(/Final\s+Classification/i.test(body)&&/FIA\s*WEC|World\s+Endurance/i.test(body)){
    const rows=parseWecClassification081(text);
    if(type==='performance')return flFromClassificationRows(rows);
    return rows;
  }
  return oldRowsFromPdf?oldRowsFromPdf(type,text):[];
};
// importRows in app.js closes over rowsFromPdfText, so override importRows too.
window.importRows=function(type){const text=(type==='entry'?$('entryCsv')?.value:type==='results'?$('resultsCsv')?.value:type==='performance'?$('performanceCsv')?.value:$('raceControlCsv')?.value)||''; if(/^\[SCC_PDF_TEXT:/.test(String(text).trim()))return window.rowsFromPdfText(type,text); return window.parseCsv?parseCsv(text):[];};

// Override immediate import buttons to use v0.8.1 parsing and merging.
window.importResultsCsv=function(){
  const rows=window.importRows('results'); if(!rows.length)return alert('No result rows detected.');
  const parsed=(window.rowsToEntries?rowsToEntries(rows):rows).map(hydrateByNo);
  const byNo=Object.fromEntries((state.race.entries||[]).map(e=>[String(e.no),e])); let matched=0,created=0;
  parsed.forEach(p=>{let e=byNo[String(p.no)]; if(!e){state.race.entries.push(p); created++;} else {Object.assign(e,p); matched++;}});
  if(typeof learnDriverCountries==='function')learnDriverCountries(state.race.entries);
  if(typeof recalculateClassPositions==='function')recalculateClassPositions();
  if(typeof render==='function')render(); alert(`${matched} matched, ${created} added from results.`);
};
window.importPerformanceCsv=function(){
  const rows=window.importRows('performance'); if(!rows.length)return alert('No performance rows detected.');
  const perf=(window.performanceRows?performanceRows(rows):rows).filter(x=>x.time||x.no||x.driver);
  state.race.performance=state.race.performance||{};
  const merge=(oldArr,newArr)=>{const m=new Map((oldArr||[]).map(x=>[`${x.type||''}|${x.class}|${x.no}|${x.driver}|${x.time}`,x])); newArr.forEach(x=>m.set(`${x.type||''}|${x.class}|${x.no}|${x.driver}|${x.time}`,x)); return [...m.values()].filter(x=>x.time&&x.time!=='—');};
  const pp=perf.filter(x=>String(x.type||'').toUpperCase()==='PP'); const fl=perf.filter(x=>String(x.type||'').toUpperCase()!=='PP');
  if(fl.length)state.race.performance.fastestLaps=merge(state.race.performance.fastestLaps,fl);
  if(pp.length)state.race.performance.poles=merge(state.race.performance.poles,pp);
  if(typeof render==='function')render(); alert(`${fl.length} fastest-lap and ${pp.length} pole-position rows imported.`);
};

function normSeriesName(id){return (window.SERIES&&SERIES[id]?.short)||id||'—';}
function driverRecords(){
  const by=new Map();
  (window.RACES||[]).filter(r=>Array.isArray(r.entries)).forEach(r=>{
    (r.entries||[]).forEach(e=>{
      (e.drivers||[]).forEach(d=>{
        const name=clean(Array.isArray(d)?d[0]:d); if(!name)return; const key=norm(name); const country=countryFor(name,Array.isArray(d)?d[1]:'');
        if(!by.has(key))by.set(key,{key,name,country,starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,ppOverall:0,ppClass:0,flOverall:0,flClass:0,records:[],series:new Map(),seen:new Set(),classes:new Set(),teams:new Set()});
        const rec=by.get(key); if(country)rec.country=country; const ek=`${r.id}|${e.no}|${e.class}`; if(rec.seen.has(ek))return; rec.seen.add(ek);
        rec.starts++; const st=String(e.status||'FIN').toUpperCase(); if(!['RET','DNF','DNS','DSQ','NC'].includes(st))rec.finishes++; const op=+e.pos||+e.overallPos||0, cp=+e.classPos||0; if(op===1)rec.overallWins++; if(cp===1)rec.classWins++; if(op&&op<=3)rec.overallPodiums++; if(cp&&cp<=3)rec.classPodiums++; rec.records.push({race:r,entry:e,overallPos:op,classPos:cp}); rec.classes.add(e.class); rec.teams.add(e.team);
        const sid=r.series||'unknown'; if(!rec.series.has(sid))rec.series.set(sid,{id:sid,starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,ppOverall:0,ppClass:0,flOverall:0,flClass:0}); const s=rec.series.get(sid); s.starts++; if(!['RET','DNF','DNS','DSQ','NC'].includes(st))s.finishes++; if(op===1)s.overallWins++; if(cp===1)s.classWins++; if(op&&op<=3)s.overallPodiums++; if(cp&&cp<=3)s.classPodiums++;
      });
    });
    const addPerf=(arr,kind)=>{(arr||[]).forEach(p=>{const key=norm(p.driver||''); if(!by.has(key))return; const rec=by.get(key); const overall=norm(p.class)==='overall'; const sid=r.series||'unknown'; if(!rec.series.has(sid))rec.series.set(sid,{id:sid,starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,ppOverall:0,ppClass:0,flOverall:0,flClass:0}); const s=rec.series.get(sid); const prop=kind==='pp'?(overall?'ppOverall':'ppClass'):(overall?'flOverall':'flClass'); rec[prop]++; s[prop]++;});};
    addPerf(r.performance?.poles,'pp'); addPerf(r.performance?.fastestLaps,'fl');
  });
  return [...by.values()].map(d=>{d.finishPct=d.starts?Math.round(100*d.finishes/d.starts):0; d.seriesStats=[...d.series.values()].sort((a,b)=>b.starts-a.starts); d.records.sort((a,b)=>String(b.race.date||'').localeCompare(String(a.race.date||''))); return d;}).sort((a,b)=>b.starts-a.starts||a.name.localeCompare(b.name));
}
function renderDriversDb(){
  const all=driverRecords(); if(!window.state.selectedDriver081&&all[0])state.selectedDriver081=all[0].key; const selected=all.find(d=>d.key===state.selectedDriver081)||all[0];
  const rows=all.slice(0,300).map((d,i)=>`<button class="driver-row driver-row-core ${selected&&selected.key===d.key?'active':''}" data-driver081="${E(d.key)}"><span>${i+1}</span><strong>${E(d.name)}</strong><span>${(window.flag&&d.country)?flag(d.country):''} ${E(d.country||'')}</span><span>${d.starts}</span><span>${d.overallWins}/${d.classWins}</span><span>${d.overallPodiums}/${d.classPodiums}</span><span>${d.ppOverall}/${d.ppClass}</span><span>${d.flOverall}/${d.flClass}</span><span>${d.finishPct}%</span></button>`).join('');
  const detail=selected?`<aside class="db8-detail"><section class="db8-profile"><div class="db8-avatar">${E(selected.name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</div><div><h2>${E(selected.name)} ${selected.country&&window.flag?flag(selected.country):''}</h2><p>${E(selected.country||'unknown')} · ${[...selected.classes].filter(Boolean).map(c=>window.classBadge?classBadge(c):E(c)).join(' ')}</p></div></section><section class="db8-stats"><div class="db8-stat starts"><span>Starts</span><strong>${selected.starts}</strong><small>${selected.finishes} classified · ${selected.finishPct}%</small></div><div class="db8-stat"><span>Wins</span><strong>${selected.overallWins}</strong><em>overall</em><strong>${selected.classWins}</strong><em>class</em></div><div class="db8-stat"><span>Podiums</span><strong>${selected.overallPodiums}</strong><em>overall</em><strong>${selected.classPodiums}</strong><em>class</em></div><div class="db8-stat"><span>PP</span><strong>${selected.ppOverall}</strong><em>overall</em><strong>${selected.ppClass}</strong><em>class</em></div><div class="db8-stat"><span>FL</span><strong>${selected.flOverall}</strong><em>overall</em><strong>${selected.flClass}</strong><em>class</em></div></section><h3>By series</h3><div class="db8-series-grid">${selected.seriesStats.map(s=>`<div><strong>${E(normSeriesName(s.id))}</strong><span>${s.starts} starts · W ${s.overallWins}/${s.classWins} · P ${s.overallPodiums}/${s.classPodiums} · PP ${s.ppOverall}/${s.ppClass} · FL ${s.flOverall}/${s.flClass}</span></div>`).join('')}</div><h3>Race history</h3><div class="db8-history"><div class="head"><span>Date</span><span>Series</span><span>Race</span><span>Team</span><span>Car</span><span>Class</span><span>Overall</span><span>Class</span></div>${selected.records.map(r=>`<div><span>${E(r.race.date||'')}</span><span>${E(normSeriesName(r.race.series))}</span><span>${E(r.race.event||'')}</span><span>${E(r.entry.team||'')}</span><span>${E(r.entry.model||'')}</span><span>${window.classBadge?classBadge(r.entry.class):E(r.entry.class)}</span><span>${r.overallPos?`P${r.overallPos}`:'—'}</span><span>${r.classPos?`C${r.classPos}`:'—'}</span></div>`).join('')}</div></aside>`:'<aside class="db8-detail"><div class="empty-state">No driver selected.</div></aside>';
  $('dataManager').innerHTML=`<div class="archive-db-pill"><strong>Archive DB</strong><span>${all.length}</span> drivers <button id="rebuildDbBtn" class="mini-button">↻ Rebuild</button></div><div class="db8-layout"><section class="db8-list"><div class="db8-head"><h3>Drivers</h3><span>${all.length}</span></div><div class="db8-driver-row db8-table-head"><span>#</span><span>Name</span><span>Nationality</span><span>Starts</span><span>Wins O/C</span><span>Pod O/C</span><span>PP O/C</span><span>FL O/C</span><span>Finish %</span></div><div class="db8-rows">${rows||'<div class="empty-state">No drivers in archive.</div>'}</div></section>${detail}</div>`;
  document.querySelectorAll('[data-driver081]').forEach(b=>b.onclick=()=>{state.selectedDriver081=b.dataset.driver081;renderDriversDb();}); const rb=$('rebuildDbBtn'); if(rb)rb.onclick=()=>renderDriversDb();
}
function simpleGrid(items,kind){return `<div class="archive-db-pill"><strong>Archive DB</strong><span>${driverRecords().length}</span> drivers</div><section class="db8-card-section"><div class="db8-head"><h3>${kind}</h3><span>${items.length}</span></div><div class="db8-card-grid">${items.map(x=>`<div class="db8-card"><h3>${E(x.name)}</h3><p>${E(x.detail||'')}</p><b>${x.count||0}</b></div>`).join('')}</div></section>`;}
function teamItems(){const m=new Map(); (RACES||[]).forEach(r=>(r.entries||[]).forEach(e=>{const k=norm(e.team); if(!m.has(k))m.set(k,{name:e.team||'Unknown',races:new Set(),entries:0,series:new Set()}); const x=m.get(k); x.entries++; x.races.add(r.id); x.series.add(normSeriesName(r.series));})); return [...m.values()].map(x=>({name:x.name,detail:[...x.series].join(' · '),count:`${x.races.size} races · ${x.entries} entries`}));}
function constructorItems(){const m=new Map(); (RACES||[]).forEach(r=>(r.entries||[]).forEach(e=>{const k=norm(e.constructor); if(!m.has(k))m.set(k,{name:title(e.constructor||'Unknown'),races:new Set(),entries:0,models:new Set()}); const x=m.get(k); x.entries++; x.races.add(r.id); if(e.model)x.models.add(e.model);})); return [...m.values()].map(x=>({name:x.name,detail:[...x.models].slice(0,4).join(', '),count:`${x.races.size} races · ${x.entries} entries`}));}
function circuitItems(){const m=new Map(); (RACES||[]).forEach(r=>{const k=norm(r.circuit||r.event); if(!m.has(k))m.set(k,{name:r.circuit||r.event,country:r.country||'',races:0,series:new Set()}); const x=m.get(k); x.races++; x.series.add(normSeriesName(r.series));}); return [...m.values()].map(x=>({name:`${(window.flag&&x.country)?flag(x.country)+' ':''}${x.name}`,detail:[...x.series].join(' · '),count:`${x.races} races`}));}
window.renderDataManager=function(){if(!$('dataManager'))return; const tab=state.dataTab||'drivers'; document.querySelectorAll('.database-nav button,.data-tab').forEach(b=>b.classList.toggle('active',(b.dataset.dbTab||b.dataset.dataTab)===tab)); if(tab==='drivers')return renderDriversDb(); if(tab==='teams')return $('dataManager').innerHTML=simpleGrid(teamItems(),'Teams'); if(tab==='constructors')return $('dataManager').innerHTML=simpleGrid(constructorItems(),'Constructors'); if(tab==='circuits')return $('dataManager').innerHTML=simpleGrid(circuitItems(),'Circuits'); renderDriversDb();};
function showDb(tab){state.dataTab=tab||'drivers'; document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active')); $('tab-data')?.classList.add('active'); document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab==='data')); window.renderDataManager();}
// disabled old DB click listener; v0.8.4 owns DB routing
function boot(){setVersion(); mergeSavedRaces(); injectSaveButton(); if(typeof buildRaceTree==='function')buildRaceTree(); if(typeof buildRaceSelectors==='function')buildRaceSelectors();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot); else boot();
})();
