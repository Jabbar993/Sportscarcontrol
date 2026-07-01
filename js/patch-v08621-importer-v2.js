/* SCC v0.8.6.21.1 · ACO Importer v2.1 preview
   Scope: Results / Fastest Laps / Pole Positions only. Race Control stays manual.
   v2.1: separate Results + Fastest Laps inputs and 1..N Qualifying/Hyperpole PDFs.
   Adds a safe preview-first importer; it does not change existing races unless Add to archive is clicked.
*/
(function(){
  if(window.__SCC_IMPORTER_V21__) return;
  window.__SCC_IMPORTER_V21__=true;

  const $ = id => document.getElementById(id);
  const esc2 = window.esc || (s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));

  function normClsLocal(v){
    if(typeof window.normClass==='function') return window.normClass(v);
    const x=String(v||'').toUpperCase().replace(/[\s_/-]/g,'');
    if(x==='HYPERCAR'||x==='HYP') return 'HYP';
    if(x==='LMGT3'||x==='GT3') return 'LMGT3';
    if(x==='LMP2PA'||x==='LMP2PROAM'||x==='LMP2PAM') return 'LMP2_PA';
    if(x==='GTEPRO') return 'GTE_PRO';
    if(x==='GTEAM') return 'GTE_AM';
    return String(v||'').trim() || 'Overall';
  }
  function clean(s){ return String(s||'').replace(/\s+/g,' ').trim(); }
  function textSource(name,text){ return `[SCC_PDF_TEXT:${name}]\n${text||''}`; }
  function timeToSeconds(t){
    const s=String(t||'').trim().replace(',', '.');
    if(!s) return Infinity;
    const p=s.split(':').map(Number);
    if(p.length===3) return p[0]*3600+p[1]*60+p[2];
    if(p.length===2) return p[0]*60+p[1];
    const n=Number(s); return Number.isFinite(n)?n:Infinity;
  }
  function inferClassFromName(name,text){
    const both=(String(name||'')+' '+String(text||'')).toUpperCase();
    if(/LMGT3|GT3/.test(both)) return 'LMGT3';
    if(/HYPERCAR|\bHYP\b/.test(both)) return 'HYP';
    if(/LMP2\s*(PRO\/AM|P\/A|PA|PRO-AM)/.test(both)) return 'LMP2_PA';
    if(/\bLMP2\b/.test(both)) return 'LMP2';
    if(/\bLMP3\b/.test(both)) return 'LMP3';
    if(/GTE\s*AM/.test(both)) return 'GTE_AM';
    return '';
  }
  function classifyDoc(name,text){
    const s=(String(name||'')+'\n'+String(text||'')).toLowerCase();
    if(/fastest\s*lap|best\s*lap\s*after/.test(s)) return 'fastest';
    if(/hyperpole|qualifying|qualification|starting\s*grid/.test(s)) return 'pole';
    if(/classification|final\s*classification|race\s+hour|race\s+classification/.test(s)) return 'results';
    return 'unknown';
  }
  async function fileText(file){
    const ext=(file.name.split('.').pop()||'').toLowerCase();
    if(ext==='pdf' || /pdf/i.test(file.type||'')) return await readPdfText(file);
    return await file.text();
  }
  function entriesFromClassification(name,text){
    const src=textSource(name,text);
    const rows = (typeof rowsFromPdfText==='function') ? rowsFromPdfText('results',src) : [];
    const entries = rows && rows.length && typeof rowsToEntries==='function' ? rowsToEntries(rows) : [];
    return entries.map(e=>({
      ...e,
      no:String(e.no||'').trim(),
      class:normClsLocal(e.class),
      drivers:(e.drivers||[]).map(d=>[d[0], d[1] || (window.lookupDriverCountry?lookupDriverCountry(d[0]):'')])
    })).filter(e=>e.no);
  }
  function fastestFromText(name,text,entries){
    // First use existing ACO hook if possible. It extracts FL from final classification too.
    const src=textSource(name,text);
    let perf=[];
    try{ perf = (typeof rowsFromPdfText==='function') ? rowsFromPdfText('performance',src) : []; }catch(e){ perf=[]; }
    if(Array.isArray(perf) && perf.length && perf[0] && perf[0].type==='FL') return normalizePerf(perf,'FL',entries);

    // Fallback: scan lines for car number + driver + lap time.
    const lines=String(text||'').replace(/\r/g,'').split('\n').map(clean).filter(Boolean);
    const candidates=[];
    for(const line of lines){
      if(/^(No|Pos|Car|Driver|Team|Best|FIA|Published|Stewards)/i.test(line)) continue;
      const tm=[...line.matchAll(/\b\d{1,2}:\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      if(!tm.length) continue;
      const noMatch=line.match(/(?:^|\s)(0?\d{1,3}|\d{1,3})(?=\s)/);
      if(!noMatch) continue;
      const no=noMatch[1];
      const entry=entries.find(e=>String(e.no)===String(no))||{};
      const cls=entry.class || inferClassFromName(name,line) || 'Overall';
      const lapMatch=line.match(/(?:Lap|LAP|lap)\s*(\d+)/) || line.match(/\s(\d{1,3})\s+\d{1,2}:\d{2}\.\d{3}/);
      const time=tm[tm.length-1];
      let driver='';
      if(entry.drivers && entry.drivers.length) driver=entry.drivers[0][0];
      candidates.push({type:'FL',class:cls,no,team:entry.team||'',driver,lap:lapMatch?lapMatch[1]:'',time});
    }
    return bestByClass(candidates,'FL');
  }
  function polesFromText(name,text,entries){
    const lines=String(text||'').replace(/\r/g,'').split('\n').map(clean).filter(Boolean);
    const docCls=inferClassFromName(name,text);
    const candidates=[];
    for(const line of lines){
      if(/^(No|Pos|Car|Driver|Team|Best|FIA|Published|Stewards|Classification|Session)/i.test(line)) continue;
      if(/Race\s+Final\s+Classification/i.test(line)) continue;
      const times=[...line.matchAll(/\b\d{1,2}:\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      if(!times.length) continue;
      const first=line.match(/^\s*(\d{1,2})\s+(0?\d{1,3}|\d{1,3})\s+(.+)$/);
      const loose=line.match(/(?:^|\s)(0?\d{1,3}|\d{1,3})(?=\s)/);
      const no=first?first[2]:(loose?loose[1]:'');
      if(!no) continue;
      const entry=entries.find(e=>String(e.no)===String(no))||{};
      const cls=docCls || entry.class || inferClassFromName(name,line) || 'Overall';
      const driver=guessDriverFromLine(line,entry);
      const time=times[0];
      candidates.push({type:'PP',class:cls,no:String(no),team:entry.team||'',driver,time});
    }
    return bestByClass(candidates,'PP');
  }
  function guessDriverFromLine(line,entry){
    if(entry && entry.drivers){
      for(const d of entry.drivers){
        const surname=String(d[0]||'').split(/\s+/).pop();
        if(surname && new RegExp(surname.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(line)) return d[0];
      }
      if(entry.drivers[0]) return entry.drivers[0][0];
    }
    return '';
  }
  function bestByClass(items,type){
    const out={};
    items.forEach(p=>{
      if(!p.time) return;
      const cls=p.class||'Overall';
      if(!out[cls] || timeToSeconds(p.time)<timeToSeconds(out[cls].time)) out[cls]={...p,type,class:cls};
      if(!out.Overall || timeToSeconds(p.time)<timeToSeconds(out.Overall.time)) out.Overall={...p,type,class:'Overall'};
    });
    return Object.values(out).sort((a,b)=>['Overall','HYP','LMP2','LMP2_PA','LMP3','LMGT3','GTE_AM'].indexOf(a.class)-['Overall','HYP','LMP2','LMP2_PA','LMP3','LMGT3','GTE_AM'].indexOf(b.class));
  }
  function normalizePerf(rows,type,entries){
    return bestByClass((rows||[]).map(p=>{
      const entry=entries.find(e=>String(e.no)===String(p.no))||{};
      return {...p,type,class:normClsLocal(p.class||entry.class||'Overall'),team:p.team||entry.team||'',driver:p.driver||((entry.drivers||[])[0]?.[0]||'')};
    }), type);
  }
  function defaultSegments(r){
    const dur=typeof parseTime==='function'?parseTime(r.officialDuration||r.scheduledDuration||'06:00:00'):21600;
    return [{id:'g0',phase:'GREEN',start:0,end:dur,startLap:0,endLap:Number(r.officialLaps)||Number(r.scheduledLaps)||0,reason:'Race',notes:'Race Control pending manual entry.'}];
  }
  function buildRaceObject(meta,entries,fl,poles){
    const officialLaps=Math.max(0,...entries.map(e=>Number(e.laps)||0));
    const officialDuration=(entries[0]&&entries[0].time&&!String(entries[0].time).startsWith('+'))?entries[0].time:(meta.officialDuration||meta.scheduledDuration||'06:00:00');
    const race={
      id: meta.id || makeRaceId(meta),
      season:Number(meta.season)||new Date(meta.date||Date.now()).getFullYear(),
      round:Number(meta.round)||0,
      series:meta.series||'wec',
      event:meta.event||'Imported race',
      circuit:meta.circuit||'',
      country:meta.country||'',
      date:meta.date||'',
      scheduledDuration:meta.scheduledDuration||officialDuration,
      officialDuration,
      scheduledLaps:Number(meta.scheduledLaps)||officialLaps,
      officialLaps:Number(meta.officialLaps)||officialLaps,
      segments:defaultSegments({officialDuration,officialLaps}),
      entries:entries.slice().sort((a,b)=>(Number(a.pos)||9999)-(Number(b.pos)||9999)),
      performance:{fastestLaps:fl||[],poles:poles||[]},
      completeness:{metadata:true,results:!!entries.length,fastestLaps:!!(fl&&fl.length),poles:!!(poles&&poles.length),raceControl:false},
      sources:meta.sources||['ACO Importer v2']
    };
    return race;
  }
  function makeRaceId(meta){
    const slug=String(meta.event||'imported-race').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    return `${meta.series||'wec'}-${slug}-${meta.season||new Date().getFullYear()}`;
  }
  function toCode(r){
    return `replaceRace(${JSON.stringify(r,null,2)});`;
  }
  function readMeta(){
    return {
      id:$('acoV2Id')?.value.trim(), series:$('acoV2Series')?.value||'wec', season:$('acoV2Season')?.value, round:$('acoV2Round')?.value,
      event:$('acoV2Event')?.value.trim(), circuit:$('acoV2Circuit')?.value.trim(), country:$('acoV2Country')?.value.trim(), date:$('acoV2Date')?.value,
      scheduledDuration:$('acoV2Scheduled')?.value.trim(), officialDuration:$('acoV2Official')?.value.trim(), scheduledLaps:$('acoV2Laps')?.value, officialLaps:$('acoV2Laps')?.value
    };
  }
  async function readInputFiles(inputId, role, required=false){
    const input=$(inputId);
    const files=input && input.files ? Array.from(input.files) : [];
    if(required && !files.length) throw new Error(role+' file is required.');
    const docs=[];
    for(const f of files){
      try{ docs.push({name:f.name,role,text:await fileText(f)}); }
      catch(e){ docs.push({name:f.name,role,text:'',error:e.message||String(e)}); }
    }
    return docs;
  }
  function fileListHtml(docs,empty){
    if(!docs.length) return `<span class="muted">${esc2(empty||'none')}</span>`;
    return docs.map(d=>`<span class="import-chip ${d.error?'warn':''}">${d.error?'⚠':'✓'} ${esc2(d.name)}</span>`).join(' ');
  }
  async function analyze(){
    const out=$('acoV2Output');
    out.innerHTML='<div class="empty-state">Reading files…</div>';
    let resultsDocs=[], fastestDocs=[], qualDocs=[];
    try{
      resultsDocs=await readInputFiles('acoV2ResultsFile','Race Classification',true);
      fastestDocs=await readInputFiles('acoV2FastestFile','Fastest Laps',false);
      qualDocs=await readInputFiles('acoV2QualFiles','Qualifying / Hyperpole',false);
    }catch(e){ alert(e.message||String(e)); out.innerHTML=''; return; }

    const docs=[...resultsDocs,...fastestDocs,...qualDocs];
    const notes=[];
    docs.forEach(d=>{ if(d.error) notes.push(`ERR ${d.role}: ${d.name}: ${d.error}`); else notes.push(`${d.role}: ${d.name}`); });

    let entries=[];
    for(const d of resultsDocs){
      if(d.error) continue;
      const parsed=entriesFromClassification(d.name,d.text);
      notes.push(`  results rows from ${d.name}: ${parsed.length}`);
      if(parsed.length){ entries=parsed; break; }
    }

    let fl=[];
    for(const d of fastestDocs){
      if(d.error) continue;
      const parsed=fastestFromText(d.name,d.text,entries);
      notes.push(`  FL from ${d.name}: ${parsed.length}`);
      if(parsed.length) fl=mergePerf(fl,parsed,'FL');
    }
    // Fallback: if no separate FL PDF was supplied, try to extract FL from the race classification.
    if(!fl.length){
      for(const d of resultsDocs){
        if(d.error) continue;
        const parsed=fastestFromText(d.name,d.text,entries);
        if(parsed.length){ fl=mergePerf(fl,parsed,'FL'); notes.push(`  FL fallback from ${d.name}: ${parsed.length}`); }
      }
    }

    let poles=[];
    for(const d of qualDocs){
      if(d.error) continue;
      const parsed=polesFromText(d.name,d.text,entries);
      notes.push(`  PP from ${d.name}: ${parsed.length}`);
      if(parsed.length) poles=mergePerf(poles,parsed,'PP');
    }

    const race=buildRaceObject({...readMeta(),sources:docs.map(d=>`${d.role}: ${d.name}`)},entries,fl,poles);
    window.__SCC_IMPORTER_V2_PREVIEW__=race;
    renderPreview(race,notes,{resultsDocs,fastestDocs,qualDocs});
  }
  function mergePerf(a,b,type){
    const map={}; [...(a||[]),...(b||[])].forEach(p=>{const k=p.class||'Overall'; if(!map[k] || timeToSeconds(p.time)<timeToSeconds(map[k].time)) map[k]={...p,type};});
    return Object.values(map);
  }
  function renderPreview(race,notes,groups={resultsDocs:[],fastestDocs:[],qualDocs:[]}){
    const classes=[...new Set((race.entries||[]).map(e=>e.class))];
    const warnings=[];
    if(!race.entries.length) warnings.push('No entries parsed from classification.');
    if(!(race.performance.fastestLaps||[]).length) warnings.push('No fastest laps parsed.');
    if(!(race.performance.poles||[]).length) warnings.push('No pole positions parsed.');
    const dupCars=[]; const seen={}; race.entries.forEach(e=>{const k=String(e.no); if(seen[k])dupCars.push(k); seen[k]=1;});
    if(dupCars.length) warnings.push('Duplicate car numbers: '+dupCars.join(', '));
    const presentPoleClasses=new Set((race.performance.poles||[]).map(p=>p.class));
    const classOrder=['Overall','HYP','LMP2','LMP2_PA','LMP3','LMGT3','GTE_AM','GTD_PRO','GTD'];
    const poleSummary=classOrder.filter(c=>presentPoleClasses.has(c)).map(c=>`✓ ${c}`).join(' · ') || 'none';
    const readiness=[
      ['Results', !!race.entries.length, `${race.entries.length} cars`],
      ['Fastest Laps', !!(race.performance.fastestLaps||[]).length, `${(race.performance.fastestLaps||[]).length} records`],
      ['Pole Positions', !!(race.performance.poles||[]).length, poleSummary],
      ['Qualifying PDFs', !!(groups.qualDocs||[]).length, `${(groups.qualDocs||[]).length} file(s)`]
    ];
    $('acoV2Output').innerHTML=`
      <div class="import-format"><strong>ACO Importer v2 preview</strong></div>
      <div class="import-detected"><span>${race.entries.length} cars</span><span>${classes.length} classes</span><span>${classes.map(esc2).join(', ')}</span><span>${race.performance.fastestLaps.length} FL</span><span>${race.performance.poles.length} PP</span></div>
      <div class="import-detected"><strong>Results</strong> ${fileListHtml(groups.resultsDocs,'missing')}<br><strong>Fastest Laps</strong> ${fileListHtml(groups.fastestDocs,'optional / fallback from results')}<br><strong>Qualifying / Hyperpole</strong> ${fileListHtml(groups.qualDocs,'optional')}</div>
      <div class="validation-list">${readiness.map(r=>`<div class="validation-row ${r[1]?'ok':'warn'}"><div>${r[1]?'✓':'⚠'}</div><div><strong>${esc2(r[0])}</strong><span>${esc2(r[2])}</span></div></div>`).join('')}</div>
      ${warnings.length?`<div class="validation-row warn"><div>⚠</div><div><strong>Warnings</strong><span>${warnings.map(esc2).join('<br>')}</span></div></div>`:'<div class="validation-row ok"><div>✓</div><div><strong>Preview OK</strong><span>Check the first rows before adding to archive.</span></div></div>'}
      <pre>${esc2(notes.join('\n'))}</pre>
      <pre>${esc2(JSON.stringify({id:race.id,event:race.event,entries:race.entries.slice(0,5),performance:race.performance},null,2))}</pre>
      <label class="full">Generated replaceRace() code<textarea id="acoV2Code" class="import-textarea" rows="12"></textarea></label>
      <div class="form-actions"><button id="acoV2AddBtn">Add preview to archive</button><button id="acoV2CopyBtn" class="secondary">Select generated code</button></div>`;
    $('acoV2Code').value=toCode(race);
    $('acoV2AddBtn').onclick=addToArchive;
    $('acoV2CopyBtn').onclick=()=>{$('acoV2Code').focus();$('acoV2Code').select();};
  }
  function addToArchive(){
    const race=window.__SCC_IMPORTER_V2_PREVIEW__;
    if(!race || !race.id) return alert('No preview race generated.');
    if(!race.entries || !race.entries.length) return alert('Preview has no entries; not adding.');
    if(typeof window.replaceRace==='function') window.replaceRace(race); else { const i=RACES.findIndex(x=>x.id===race.id); if(i>=0)RACES[i]=race; else RACES.push(race); }
    if(window.state){ window.state.race=JSON.parse(JSON.stringify(race)); window.state.selectedSegment=null; window.state.classFilter=null; }
    if(typeof window.render==='function') window.render();
    if(typeof window.switchTab==='function') window.switchTab('dashboard');
    alert(`${race.event} added to archive preview (${race.entries.length} cars). Export/save data.js manually for permanent storage.`);
  }
  function installUI(){
    if($('acoImporterV2Card')) return;
    const target=document.querySelector('#tab-import .import-panel');
    if(!target) return;
    const card=document.createElement('div');
    card.className='wizard-card'; card.id='acoImporterV2Card';
    card.innerHTML=`
      <h3>ACO Importer v2.1 · Results / FL / PP</h3>
      <p class="muted">Preview-first importer for Al Kamel PDFs. Race Control stays manual. Use one Race Classification, optional Fastest Laps, and 1..N Qualifying/Hyperpole PDFs. Multiple qualifying PDFs are merged automatically.</p>
      <div class="form-grid import-meta-grid">
        <label>Series<select id="acoV2Series"><option value="wec">WEC</option><option value="elms">ELMS</option><option value="asian-lms">Asian LMS</option><option value="mlmc">MLMC</option></select></label>
        <label>Season<input id="acoV2Season" type="number" value="2025" /></label>
        <label>Round<input id="acoV2Round" type="number" /></label>
        <label>Race ID<input id="acoV2Id" placeholder="wec-spa-2025" /></label>
        <label class="full">Event<input id="acoV2Event" placeholder="6 Hours of Spa-Francorchamps" /></label>
        <label>Circuit<input id="acoV2Circuit" placeholder="Spa-Francorchamps" /></label>
        <label>Country<input id="acoV2Country" placeholder="Belgium" /></label>
        <label>Date<input id="acoV2Date" type="date" /></label>
        <label>Scheduled<input id="acoV2Scheduled" placeholder="06:00:00" /></label>
        <label>Official<input id="acoV2Official" placeholder="optional" /></label>
        <label>Laps<input id="acoV2Laps" type="number" /></label>
      </div>
      <div class="form-grid import-meta-grid">
        <label class="full">Race Classification PDF<input id="acoV2ResultsFile" type="file" accept=".pdf,.txt,.csv,application/pdf,text/plain,text/csv" /></label>
        <label class="full">Fastest Laps PDF<input id="acoV2FastestFile" type="file" accept=".pdf,.txt,.csv,application/pdf,text/plain,text/csv" /></label>
        <label class="full">Qualifying / Hyperpole PDFs <small class="muted">(1 až N souborů, např. HYP + LMGT3)</small><input id="acoV2QualFiles" type="file" accept=".pdf,.txt,.csv,application/pdf,text/plain,text/csv" multiple /></label>
      </div>
      <div class="form-actions"><button id="acoV2AnalyzeBtn" class="secondary">Generate Preview</button></div>
      <div id="acoV2Output" class="import-preview"></div>`;
    target.insertBefore(card, target.children[1] || null);
    $('acoV2AnalyzeBtn').onclick=analyze;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installUI); else installUI();
})();
