/* SCC v0.7.7 patch: database reliability + WEC PDF import hardening */
(function(){
  'use strict';

  const byId = (id)=>document.getElementById(id);
  const E = (s)=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  // Visible version sanity check.
  document.addEventListener('DOMContentLoaded',()=>{
    document.title='SCC v0.7.7 · Importer + Database fix';
    document.querySelectorAll('.brand span').forEach(x=>x.textContent='v0.7.7');
    document.body.dataset.sccVersion='0.7.7';
  });

  // --- canonical helpers ----------------------------------------------------
  const CLASS_ALIASES = {
    HYPERCAR:'HYP', HYP:'HYP', LMGT3:'LMGT3', GT3:'LMGT3',
    LMP2:'LMP2', 'LMP2 PRO/AM':'LMP2_PA', LMP2PROAM:'LMP2_PA', LMP2PA:'LMP2_PA', PA:'LMP2_PA',
    LMP3:'LMP3', GTP:'GTP', GTDPRO:'GTD_PRO', 'GTD PRO':'GTD_PRO', GTD:'GTD',
    PRO:'PRO', GOLD:'GOLD', SILVER:'SILVER', BRONZE:'BRONZE', PROAM:'PROAM', 'PRO-AM':'PROAM'
  };
  window.sccNormClass077 = function(v){
    const raw=String(v||'').trim();
    const k=raw.toUpperCase().replace(/[\s_/-]+/g,'');
    return CLASS_ALIASES[raw.toUpperCase()] || CLASS_ALIASES[k] || raw;
  };

  const VEHICLE_MAP = [
    ['BMW M Hybrid V8','bmw','BMW M Hybrid V8'],
    ['Ferrari 499P','ferrari','Ferrari 499P'],
    ['Aston Martin Valkyrie','astonmartin','Aston Martin Valkyrie'],
    ['Toyota GR010 Hybrid','toyota','Toyota GR010 Hybrid'],
    ['Toyota TR010 Hybrid','toyota','Toyota GR010 Hybrid'],
    ['Peugeot 9X8','peugeot','Peugeot 9X8'],
    ['Genesis GMR-001-Hypercar','genesis','Genesis GMR-001-Hypercar'],
    ['Genesis GMR-001','genesis','Genesis GMR-001-Hypercar'],
    ['Cadillac V-Series.R','cadillac','Cadillac V-Series.R'],
    ['Cadillac V Series R','cadillac','Cadillac V-Series.R'],
    ['Alpine A424','alpine','Alpine A424'],
    ['McLaren 720S LMGT3 Evo','mclaren','McLaren 720S LMGT3 Evo'],
    ['Aston Martin Vantage AMR LMGT3','astonmartin','Aston Martin Vantage AMR LMGT3'],
    ['Porsche 911 GT3 R LMGT3','porsche','Porsche 911 GT3 R LMGT3'],
    ['Porsche 911 GT3 R','porsche','Porsche 911 GT3 R LMGT3'],
    ['Ferrari 296 LMGT3 Evo','ferrari','Ferrari 296 LMGT3 Evo'],
    ['Ferrari 296 GT3','ferrari','Ferrari 296 GT3'],
    ['Lexus RC F LMGT3','lexus','Lexus RC F LMGT3'],
    ['Corvette Z06 LMGT3.R','corvette','Corvette Z06 LMGT3.R'],
    ['Chevrolet Corvette Z06 GT3.R','corvette','Corvette Z06 GT3.R'],
    ['Mercedes-AMG LMGT3','mercedes','Mercedes-AMG LMGT3'],
    ['Mercedes-AMG GT3','mercedes','Mercedes-AMG GT3'],
    ['BMW M4 LMGT3 Evo','bmw','BMW M4 LMGT3 Evo'],
    ['Ford Mustang LMGT3 Evo','ford','Ford Mustang LMGT3 Evo'],
    ['Ford Mustang LMGT3','ford','Ford Mustang LMGT3'],
    ['Oreca 07','oreca','Oreca 07 - Gibson'],
    ['Ligier JS P320','ligier','Ligier JS P320'],
    ['Duqueine D09','duqueine','Duqueine D09'],
    ['Adess','adess','Adess'],
    ['Ginetta','ginetta','Ginetta']
  ];
  // Keep a reference to the pre-patch constructorFromVehicle before overwriting the global
  // below - calling the bare `constructorFromVehicle` identifier from inside vehicleInfo would
  // resolve to the *new* window.constructorFromVehicle once reassigned, causing infinite
  // self-recursion (and a stack overflow) for any vehicle text not in VEHICLE_MAP.
  const originalConstructorFromVehicle = typeof constructorFromVehicle==='function' ? constructorFromVehicle : null;
  function vehicleInfo(text){
    const x=String(text||'').toLowerCase().replace(/[–—]/g,'-').replace(/\s+/g,' ');
    for(const [needle,ctor,model] of VEHICLE_MAP){
      if(x.includes(needle.toLowerCase())) return {constructor:ctor, model};
    }
    if(originalConstructorFromVehicle){
      const ctor=originalConstructorFromVehicle(text);
      return {constructor:ctor, model:String(text||'').trim()};
    }
    return {constructor:'',model:String(text||'').trim()};
  }
  window.constructorFromVehicle = function(v){ return vehicleInfo(v).constructor; };

  // Add/repair a few flag aliases that repeatedly appear in imports.
  if(typeof FLAG_ALIASES!=='undefined') Object.assign(FLAG_ALIASES,{
    'Great Britain':'gb','United Kingdom':'gb','U.K.':'gb','UK':'gb',GBR:'gb',Britain:'gb',
    'The Netherlands':'nl',Holland:'nl',NLD:'nl',
    'United States of America':'us',USA:'us',US:'us',
    'South Africa':'za',RSA:'za',ZAF:'za',
    'Czech Republic':'cz',Czechia:'cz',
    'Russia':'ru',RUS:'ru','Belarus':'by',BLR:'by',
    'Hong Kong':'hk','United Arab Emirates':'ae',UAE:'ae',Qatar:'qa',
    'Puerto Rico':'pr',Venezuela:'ve',Romania:'ro',Slovakia:'sk',Slovenia:'si',Serbia:'rs',Croatia:'hr',Malta:'mt',Liechtenstein:'li',Uruguay:'uy'
  });
  if(typeof SCC_FLAG_SVGS!=='undefined'){
    SCC_FLAG_SVGS.ru = SCC_FLAG_SVGS.ru || `<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v.667H0z"/><path fill="#0039a6" d="M0 .667h3v.666H0z"/><path fill="#d52b1e" d="M0 1.333h3V2H0z"/></svg>`;
    SCC_FLAG_SVGS.by = SCC_FLAG_SVGS.by || `<svg viewBox="0 0 3 2"><path fill="#c8313e" d="M0 0h3v1.35H0z"/><path fill="#4aa657" d="M0 1.35h3V2H0z"/><path fill="#fff" d="M0 0h.28v2H0z"/></svg>`;
    SCC_FLAG_SVGS.cz = SCC_FLAG_SVGS.cz || `<svg viewBox="0 0 3 2"><path fill="#fff" d="M0 0h3v1H0z"/><path fill="#d7141a" d="M0 1h3v1H0z"/><path fill="#11457e" d="M0 0l1.5 1L0 2z"/></svg>`;
  }

  // --- WEC PDF final classification parser --------------------------------
  function clean(s){ return String(s||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim(); }
  function titleName(s){
    return clean(s).split(/\s+/).map(w=>{
      if(/^([A-ZÁÉÍÓÚÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ])\.$/.test(w)) return w;
      if(['VAN','DER','DE','DA','DI','DEL','DU','LA','LE'].includes(w)) return w.toLowerCase();
      return w.charAt(0)+w.slice(1).toLowerCase();
    }).join(' ').replace(/\bvan\b/g,'van').replace(/\bder\b/g,'der').replace(/\bde\b/g,'de').replace(/\bda\b/g,'da');
  }
  function driverPairsFromLine(line){
    const rx=/[A-ZÁÉÍÓÚÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ]\.[^\/\d]+?(?=\s*\/|\s+(?:Ferrari|BMW|Toyota|Aston Martin|Peugeot|Genesis|Cadillac|Alpine|McLaren|Porsche|Lexus|Corvette|Mercedes|Ford)\b|\s+(?:HYPERCAR|LMGT3)\b|$)/gi;
    const out=[]; let m;
    while((m=rx.exec(line))){
      let n=titleName(m[0]);
      n=n.replace(/\s+(HYPERCAR|LMGT3|M|G)$/i,'').trim();
      if(n && !/^No\s/i.test(n)) out.push([n, (typeof lookupDriverCountry==='function'?lookupDriverCountry(n):'')]);
    }
    return out.slice(0,4);
  }
  function bestLapFromLine(line){
    const times=[...line.matchAll(/\b\d{1,2}:\d{2}\.\d{3}\b/g)].map(m=>({time:m[0],idx:m.index}));
    if(!times.length) return {time:'',lap:''};
    const best=times[times.length-1];
    const before=line.slice(0,best.idx).trim().split(/\s+/);
    let lap='';
    for(let i=before.length-1;i>=0;i--){ if(/^\d{1,3}$/.test(before[i])){ lap=before[i]; break; } }
    return {time:best.time,lap};
  }
  function statusRank(s){ const r={FIN:0,Classified:0,NC:1,RET:2,DNF:2,DNS:3,DSQ:4}; return r[s]??9; }
  function parseWecFinalClassificationPdf077(type,text){
    const body=(typeof pdfTextBody==='function'?pdfTextBody(text):String(text||'')).replace(/\r/g,'');
    if(!/(FIA\s*WEC|World\s+Endurance|6\s+Hours|Final\s+Classification)/i.test(body)) return [];
    const lines=body.split('\n').map(clean).filter(Boolean);
    const rows=[]; let status='FIN';
    for(const line of lines){
      if(/^Not\s+classified/i.test(line)){ status='NC'; continue; }
      if(/^Retired/i.test(line)){ status='RET'; continue; }
      if(/^Circuit\s+Best|^Circuit\s+Race|^CAR\s+|^Published|^Stewards|^Timekeeper/i.test(line)) break;
      if(!/(HYPERCAR|LMGT3)/i.test(line)) continue;
      if(/Circuit Best Laps|Circuit Race Records/i.test(line)) continue;
      const cls=/HYPERCAR/i.test(line)?'HYP':'LMGT3';
      let pos='', no='';
      let m=line.match(/^\s*(\d+)\s+([0-9]{1,3}|0[0-9]{2})\b/);
      if(m){ pos=+m[1]; no=m[2]; }
      else {
        m=line.match(/\b(\d{1,2})\s+([0-9]{1,3}|0[0-9]{2})\s+(?=[A-ZÁÉÍÓÚÄËÏÖÜÑÇ]\.|[A-Z][a-z])/);
        if(m){ pos=+m[1]; no=m[2]; }
        else { const n=line.match(/\b([0-9]{1,3}|0[0-9]{2})\b/); if(n){ no=n[1]; pos=rows.length+1; } }
      }
      if(!no) continue;
      const vi=vehicleInfo(line);
      const classToken=/\b(HYPERCAR|LMGT3)\b/i.exec(line);
      const afterClass=classToken?line.slice(classToken.index+classToken[0].length):'';
      const lapsMatch=afterClass.match(/\b[MG]\s+(\d{2,3})\b|\b(\d{2,3})\s+(?:\d{1,2}:\d{2}:\d{2}\.\d{3}|\d+:\d{2}\.\d{3})/);
      const laps=Number(lapsMatch?.[1]||lapsMatch?.[2]||0)||0;
      const total=(line.match(/\b\d{1,2}:\d{2}:\d{2}\.\d{3}\b/)||[''])[0];
      const bl=bestLapFromLine(line);
      const drivers=driverPairsFromLine(line);
      // Team: prefer text between car number and first driver/model, but keep simple and safe.
      let team='';
      const noIdx=line.indexOf(no);
      if(noIdx>=0){
        let rest=line.slice(noIdx+no.length).trim();
        rest=rest.replace(/^\d+\s+/, '');
        const cutCandidates=[...VEHICLE_MAP.map(x=>rest.toLowerCase().indexOf(x[0].toLowerCase())).filter(i=>i>=0), rest.search(/[A-ZÁÉÍÓÚÄËÏÖÜÑÇ]\./)].filter(i=>i>=0);
        const cut=cutCandidates.length?Math.min(...cutCandidates):Math.min(rest.length,40);
        team=clean(rest.slice(0,cut));
      }
      if(!team) team=vi.constructor ? (typeof constructorMeta==='function'?constructorMeta(vi.constructor).name:vi.constructor) : '';
      let gap='—', intv='';
      if(status!=='FIN') gap=status;
      else if(laps){
        const gapL=line.match(/\b(\d+)\s+Laps?\b/i);
        if(gapL) gap=`${gapL[1]} laps`;
        else {
          const nums=[...line.matchAll(/\b\d+\.\d{3}\b/g)].map(x=>x[0]).filter(x=>x!==bl.time);
          if(pos===1) gap='—'; else if(nums.length) gap='+'+nums[0];
          if(nums.length>1) intv='+'+nums[1];
        }
      }
      rows.push({__sccParsed:true,pos,no,team,drivers:drivers.map(d=>d[0]).join(' | '),nations:drivers.map(d=>d[1]||'').join(' | '),constructor:vi.constructor,model:vi.model,class:cls,laps,gap,int:intv,status,bestLap:bl.time,bestLapNo:bl.lap,total_time:total,time:total});
    }
    const byNo=new Map();
    for(const r of rows){
      const prev=byNo.get(String(r.no));
      if(!prev || statusRank(r.status)<statusRank(prev.status) || (String(r.drivers).length>String(prev.drivers).length)) byNo.set(String(r.no),r);
    }
    const cleanRows=[...byNo.values()].sort((a,b)=>statusRank(a.status)-statusRank(b.status) || (Number(a.pos)||9999)-(Number(b.pos)||9999));
    if(type==='performance'){
      const out=[]; const best={};
      for(const r of cleanRows){
        if(!r.bestLap) continue;
        const p={type:'FL',class:r.class,no:r.no,driver:(r.drivers||'').split('|')[0].trim(),lap:r.bestLapNo,time:r.bestLap,constructor:r.constructor,model:r.model,team:r.team};
        const sec=(typeof parseTime==='function')?parseTime('0:'+r.bestLap):0;
        if(!best[r.class] || sec<best[r.class]._sec) best[r.class]={...p,_sec:sec};
        if(!best.Overall || sec<best.Overall._sec) best.Overall={...p,class:'Overall',_sec:sec};
      }
      ['Overall','HYP','LMGT3'].forEach(k=>{ if(best[k]){ const {_sec,...p}=best[k]; out.push(p); } });
      return out;
    }
    return cleanRows;
  }
  window.parseWecFinalClassificationPdf = parseWecFinalClassificationPdf077;
  window.rowsFromPdfText = function(type,text){
    const wec=parseWecFinalClassificationPdf077(type,text);
    if(wec.length) return wec;
    if(typeof tabularRowsFromPdfText==='function'){
      const tableRows=tabularRowsFromPdfText(text);
      if(tableRows.length) return tableRows;
    }
    if(typeof rowsFromLoosePdfText==='function') return rowsFromLoosePdfText(type,text);
    return [];
  };

  // Avoid mapping already-normalized rows through generic header guesses incorrectly.
  const oldRowsToEntries = window.rowsToEntries;
  window.rowsToEntries = function(rows){
    if(Array.isArray(rows) && rows.some(r=>r && r.__sccParsed)){
      return rows.map((r,i)=>({
        pos:Number(r.pos)||i+1,
        class:sccNormClass077(r.class),
        no:String(r.no||'').trim(),
        constructor:r.constructor||constructorFromVehicle(r.model||r.team),
        model:r.model||'',
        team:r.team||'',
        gap:r.gap||'—',
        int:r.int||'',
        laps:Number(r.laps)||0,
        time:r.time||r.total_time||'',
        status:r.status||'FIN',
        drivers:String(r.drivers||'').split('|').map((d,idx)=>[clean(d), String(r.nations||'').split('|')[idx]|| (typeof lookupDriverCountry==='function'?lookupDriverCountry(d):'')]).filter(d=>d[0])
      })).filter(e=>e.no);
    }
    return oldRowsToEntries ? oldRowsToEntries(rows) : [];
  };

  // --- Database rendering repairs -----------------------------------------
  function allDbRaces(){ return (typeof RACES!=='undefined'?RACES:[]).filter(r=>Array.isArray(r.entries)&&r.entries.length); }
  window.databaseRaces = allDbRaces;
  function classPosMap(r){
    const out={};
    (r.entries||[]).forEach(e=>{ const cls=e.class||'UNKNOWN'; (out[cls]??=[]).push(e); });
    Object.values(out).forEach(arr=>arr.sort((a,b)=>(Number(a.pos)||9999)-(Number(b.pos)||9999)||String(a.no).localeCompare(String(b.no))).forEach((e,i)=>{e.__sccClassPos=e.classPos||i+1;}));
    return out;
  }
  window.driverRecords = function(){
    const map=new Map();
    const get=(name,country)=>{
      name=clean(name); if(!name) return null;
      const key=typeof normalizeDriverName==='function'?normalizeDriverName(name):name.toLowerCase();
      if(!map.has(key)) map.set(key,{key,name,country:country||lookupDriverCountry(name)||'',dob:typeof driverDob==='function'?driverDob(name):'',records:[],classes:new Set(),teams:new Set(),constructors:new Set(),series:new Map(),overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0,finishes:0});
      const d=map.get(key); if(!d.country && country) d.country=country; return d;
    };
    const inc=(d,sid,field)=>{ sid=sid||'unknown'; if(!d.series.has(sid)) d.series.set(sid,{starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0}); d.series.get(sid)[field]++; };
    allDbRaces().forEach(r=>{
      classPosMap(r);
      (r.entries||[]).forEach(e=>{
        (e.drivers||[]).forEach(pair=>{
          const d=get(pair?.[0],pair?.[1]); if(!d) return;
          const cpos=Number(e.__sccClassPos||e.classPos)||0, opos=Number(e.pos)||0;
          const status=String(e.status||'FIN').toUpperCase(); const finished=!/(NC|RET|DNF|DNS|DSQ|NOT CLASSIFIED|EXCLUDED|WITHDRAWN)/i.test(status+' '+(e.gap||''));
          d.records.push({race:r,entry:e,classPos:cpos,overallPos:opos,finished});
          d.classes.add(e.class||''); d.teams.add(e.team||''); d.constructors.add(e.constructor||'');
          inc(d,r.series,'starts'); if(finished){d.finishes++;inc(d,r.series,'finishes');}
          if(opos===1){d.overallWins++;inc(d,r.series,'overallWins');}
          if(opos>0&&opos<=3){d.overallPodiums++;inc(d,r.series,'overallPodiums');}
          if(cpos===1){d.classWins++;inc(d,r.series,'classWins');}
          if(cpos>0&&cpos<=3){d.classPodiums++;inc(d,r.series,'classPodiums');}
        });
      });
      const addPerf=(p,type)=>{ const d=get(p.driver,lookupDriverCountry(p.driver)); if(!d) return; const overall=String(p.class||'').toLowerCase()==='overall'; const f=type==='pp'?(overall?'polesOverall':'polesClass'):(overall?'fastestOverall':'fastestClass'); d[f]++; inc(d,r.series,f); };
      (r.performance?.poles||[]).forEach(p=>addPerf(p,'pp'));
      (r.performance?.fastestLaps||[]).forEach(p=>addPerf(p,'fl'));
    });
    return [...map.values()].map(d=>{ const starts=d.records.length, ppTotal=d.polesOverall+d.polesClass, flTotal=d.fastestOverall+d.fastestClass; return {...d, starts, age:typeof driverAge==='function'?driverAge(d.name):'', ppTotal, flTotal, finishPct:starts?100*d.finishes/starts:0, winPctClass:starts?100*d.classWins/starts:0, podiumPctClass:starts?100*d.classPodiums/starts:0, ppPct:starts?100*ppTotal/starts:0, flPct:starts?100*flTotal/starts:0, records:d.records.sort((a,b)=>String(b.race.date).localeCompare(String(a.race.date))), seriesStats:[...d.series.entries()].map(([id,v])=>({id,...v}))}; });
  };
  window.sccTeamRecords = function(){
    const map=new Map();
    allDbRaces().forEach(r=>(r.entries||[]).forEach(e=>{ const key=(typeof sccNormId==='function'?sccNormId(e.team):String(e.team).toLowerCase())||'unknown'; if(!map.has(key)) map.set(key,{key,name:e.team||'Unknown team',entries:0,races:new Set(),classes:new Set(),series:new Set(),constructors:new Set()}); const x=map.get(key); x.entries++; x.races.add(r.id); x.classes.add(e.class||''); x.series.add(r.series||''); x.constructors.add(e.constructor||''); }));
    return [...map.values()].map(x=>({...x,starts:x.entries,raceCount:x.races.size})).sort((a,b)=>b.entries-a.entries||a.name.localeCompare(b.name));
  };
  window.sccConstructorRecords = function(){
    const map=new Map();
    allDbRaces().forEach(r=>(r.entries||[]).forEach(e=>{ const id=e.constructor||'unknown', meta=typeof constructorMeta==='function'?constructorMeta(id):{name:id}; if(!map.has(id)) map.set(id,{key:id,id,name:meta.name||id,entries:0,races:new Set(),classes:new Set(),series:new Set(),models:new Set()}); const x=map.get(id); x.entries++; x.races.add(r.id); x.classes.add(e.class||''); x.series.add(r.series||''); x.models.add(e.model||''); }));
    return [...map.values()].map(x=>({...x,starts:x.entries,raceCount:x.races.size})).sort((a,b)=>b.entries-a.entries||a.name.localeCompare(b.name));
  };
  window.sccCircuitRecords = function(){
    const map=new Map();
    allDbRaces().forEach(r=>{ const key=(typeof sccNormId==='function'?sccNormId(r.circuit):String(r.circuit).toLowerCase())||'unknown'; if(!map.has(key)) map.set(key,{key,name:r.circuit||r.event||'Unknown circuit',country:r.country||'',races:0,series:new Set(),events:[]}); const c=map.get(key); c.races++; c.series.add(r.series||''); c.events.push(r); if(!c.country&&r.country)c.country=r.country; });
    return [...map.values()].sort((a,b)=>b.races-a.races||a.name.localeCompare(b.name));
  };
  window.sccDbCounts = function(){ return {drivers:driverRecords().length,teams:sccTeamRecords().length,constructors:sccConstructorRecords().length,circuits:sccCircuitRecords().length,races:allDbRaces().length,series:[...new Set(allDbRaces().map(r=>r.series))].length}; };
  window.renderDbDiagnostics = function(){ const c=sccDbCounts(); return `<div class="db-diagnostics"><span>Archive DB</span><strong>${c.drivers}</strong><em>drivers</em><strong>${c.teams}</strong><em>teams</em><strong>${c.constructors}</strong><em>constructors</em><strong>${c.circuits}</strong><em>circuits</em><button id="rebuildDbBtn" class="mini-button">↻ Rebuild</button></div>`; };
  function cardGrid(items,kind){
    if(!items.length) return '<div class="empty-state">No records found.</div>';
    return `<div class="data-grid">${items.map(x=>{
      const series=[...(x.series||new Set())].map(id=>(typeof SERIES!=='undefined'&&SERIES[id]?SERIES[id].short:id)).join(' · ');
      if(kind==='circuits') return `<div class="data-card circuit-card"><strong>${x.country?flag(x.country):''} ${E(x.name)}</strong><span>${x.races} races · ${series}</span><em>${x.events.map(r=>String(r.season)).filter((v,i,a)=>a.indexOf(v)===i).sort().join(' · ')}</em></div>`;
      if(kind==='constructors') return `<div class="data-card"><div class="data-card-logo">${logo('constructor',x.id)}</div><strong>${E(x.name)}</strong><span>${x.entries} car entries · ${x.raceCount} races</span><em>${series}</em><em>${[...x.models].filter(Boolean).slice(0,4).map(E).join(', ')}</em></div>`;
      return `<div class="data-card"><strong>${E(x.name)}</strong><span>${x.entries||x.starts} car entries · ${x.raceCount||0} races</span><em>${series}</em><em>${[...(x.constructors||new Set())].filter(Boolean).join(', ')}</em></div>`;
    }).join('')}</div>`;
  }
  window.renderTeamsManager=function(){ const items=sccTeamRecords(); byId('dataManager').innerHTML=`${renderDbDiagnostics()}<section class="data-manager-panel"><div class="data-subhead"><h3>Teams</h3><span class="muted">${items.length}</span></div>${cardGrid(items,'teams')}</section>`; const rb=byId('rebuildDbBtn'); if(rb)rb.onclick=()=>renderDataManager(); };
  window.renderConstructorsManager=function(){ const items=sccConstructorRecords(); byId('dataManager').innerHTML=`${renderDbDiagnostics()}<section class="data-manager-panel constructor-data"><div class="data-subhead"><h3>Constructors</h3><span class="muted">${items.length}</span></div>${cardGrid(items,'constructors')}</section>`; const rb=byId('rebuildDbBtn'); if(rb)rb.onclick=()=>renderDataManager(); };
  window.renderCircuitsManager=function(){ const items=sccCircuitRecords(); byId('dataManager').innerHTML=`${renderDbDiagnostics()}<section class="data-manager-panel"><div class="data-subhead"><h3>Circuits</h3><span class="muted">${items.length}</span></div>${cardGrid(items,'circuits')}</section>`; const rb=byId('rebuildDbBtn'); if(rb)rb.onclick=()=>renderDataManager(); };
  const oldRenderDataManager = window.renderDataManager;
  window.renderDataManager=function(){
    const el=byId('dataManager'); if(!el) return;
    if(typeof syncDatabaseNav==='function') syncDatabaseNav();
    if(state.dataTab==='teams') return renderTeamsManager();
    if(state.dataTab==='constructors') return renderConstructorsManager();
    if(state.dataTab==='circuits') return renderCircuitsManager();
    return oldRenderDataManager ? oldRenderDataManager() : null;
  };
  // disabled old DB nav listener; v0.8.4 owns DB routing
})();
