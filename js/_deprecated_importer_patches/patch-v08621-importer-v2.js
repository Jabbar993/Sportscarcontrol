/* SCC v0.8.6.21.2 · ACO Importer v2.2 preview
   Scope: Results / Fastest Laps / Pole Positions only. Race Control stays manual.
   v2.2: single clean wizard UI, metadata refresh, graphical SCC-style preview, advanced code output.
   Adds a safe preview-first importer; it does not change existing races unless Add to archive is clicked.
*/
(function(){
  if(window.__SCC_IMPORTER_V22__) return;
  window.__SCC_IMPORTER_V22__=true;

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
  function normalizeDateInput(v){
    const raw=String(v||'').trim();
    if(!raw) return '';
    if(/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    const m=raw.match(/^(\d{1,2})[.\/\-](\d{1,2})[.\/\-](\d{4})$/);
    if(m) return `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`;
    return raw;
  }
  function readMeta(){
    return {
      id:$('acoV2Id')?.value.trim(), series:$('acoV2Series')?.value||'wec', season:$('acoV2Season')?.value, round:$('acoV2Round')?.value,
      event:$('acoV2Event')?.value.trim(), circuit:$('acoV2Circuit')?.value.trim(), country:$('acoV2Country')?.value.trim(), date:normalizeDateInput($('acoV2Date')?.value),
      scheduledDuration:$('acoV2Scheduled')?.value.trim(), officialDuration:$('acoV2Official')?.value.trim(), scheduledLaps:$('acoV2Laps')?.value, officialLaps:$('acoV2Laps')?.value
    };
  }
  function setMetaDefaultsFromCurrentRace(){
    const r=(window.state&&state.race)||{};
    const values={acoV2Series:r.series||'wec',acoV2Season:r.season||2025,acoV2Round:r.round||'',acoV2Id:r.id||'',acoV2Event:r.event||'',acoV2Circuit:r.circuit||'',acoV2Country:r.country||'',acoV2Date:r.date||'',acoV2Scheduled:r.scheduledDuration||'06:00:00',acoV2Official:r.officialDuration||'',acoV2Laps:r.officialLaps||r.scheduledLaps||''};
    Object.entries(values).forEach(([id,val])=>{const el=$(id); if(el && !el.value) el.value=val;});
  }
  function applyMetadataToPreview(){
    if(!window.__SCC_IMPORTER_V2_SESSION__) return;
    const sess=window.__SCC_IMPORTER_V2_SESSION__;
    const race=buildRaceObject({...readMeta(),sources:sess.docs.map(d=>`${d.role}: ${d.name}`)},sess.entries||[],sess.fl||[],sess.poles||[]);
    window.__SCC_IMPORTER_V2_PREVIEW__=race;
    renderPreview(race,sess.notes||[],sess.groups||{});
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

    const groups={resultsDocs,fastestDocs,qualDocs};
    window.__SCC_IMPORTER_V2_SESSION__={docs,notes,entries,fl,poles,groups};
    const race=buildRaceObject({...readMeta(),sources:docs.map(d=>`${d.role}: ${d.name}`)},entries,fl,poles);
    window.__SCC_IMPORTER_V2_PREVIEW__=race;
    renderPreview(race,notes,groups);
  }
  function mergePerf(a,b,type){
    const map={}; [...(a||[]),...(b||[])].forEach(p=>{const k=p.class||'Overall'; if(!map[k] || timeToSeconds(p.time)<timeToSeconds(map[k].time)) map[k]={...p,type};});
    return Object.values(map);
  }
  function perfRowsHtml(items){
    if(!items || !items.length) return '<div class="empty-state">No records parsed.</div>';
    return `<div class="import-mini-table">${items.map(p=>`<div><strong>${esc2(p.class||'Overall')}</strong><span>#${esc2(p.no)} ${esc2(p.team||'')}</span><em>${esc2(p.driver||'')} ${esc2(p.lap?('Lap '+p.lap):'')} · ${esc2(p.time||'')}</em></div>`).join('')}</div>`;
  }
  function previewOrderHtml(race){
    if(!race.entries || !race.entries.length) return '<div class="empty-state">No entries parsed.</div>';
    try{
      if(typeof orderRowsHtml==='function' && window.state){
        const oldRace=state.race, oldFilter=state.classFilter;
        state.race=race; state.classFilter=null;
        const rows=orderRowsHtml(race.entries,12,false);
        state.race=oldRace; state.classFilter=oldFilter;
        return `<div class="order-header"><span>Pos</span><span>Class</span><span>#</span><span></span><span>Team / Car</span><span>Drivers</span><span>Gap</span></div><div class="entry-table">${rows}</div>`;
      }
    }catch(e){}
    return `<div class="import-mini-table">${race.entries.slice(0,12).map(e=>`<div><strong>${esc2(e.pos)}. #${esc2(e.no)} ${esc2(e.class)}</strong><span>${esc2(e.team)} · ${esc2(e.model||e.constructor||'')}</span><em>${esc2((e.drivers||[]).map(d=>d[0]).join(' / '))} · ${esc2(e.gap||e.time||'')}</em></div>`).join('')}</div>`;
  }
  function classWinnersHtml(race){
    const groups={}; (race.entries||[]).forEach(e=>{(groups[e.class]??=[]).push(e)});
    const winners=Object.entries(groups).map(([cls,arr])=>{arr.sort((a,b)=>(Number(a.pos)||9999)-(Number(b.pos)||9999)); return [cls,arr[0]];});
    if(!winners.length) return '<div class="empty-state">No class winners.</div>';
    return `<div class="import-detected">${winners.map(([cls,e])=>`<span>✓ ${esc2(cls)} #${esc2(e.no)} ${esc2(e.team||'')}</span>`).join('')}</div>`;
  }
  function renderPreview(race,notes,groups={resultsDocs:[],fastestDocs:[],qualDocs:[]}){
    const classes=[...new Set((race.entries||[]).map(e=>e.class))];
    const warnings=[];
    if(!race.id || !race.event || !race.circuit) warnings.push('Metadata incomplete: race id, event and circuit should be filled.');
    if(!race.entries.length) warnings.push('No entries parsed from classification.');
    if(!(race.performance.fastestLaps||[]).length) warnings.push('No fastest laps parsed.');
    if(!(race.performance.poles||[]).length) warnings.push('No pole positions parsed.');
    const dupCars=[]; const seen={}; race.entries.forEach(e=>{const k=String(e.no); if(seen[k])dupCars.push(k); seen[k]=1;});
    if(dupCars.length) warnings.push('Duplicate car numbers: '+dupCars.join(', '));
    const presentPoleClasses=new Set((race.performance.poles||[]).map(p=>p.class));
    const classOrder=['Overall','HYP','LMP2','LMP2_PA','LMP2PA','LMP3','LMGT3','GTE_AM','GTD_PRO','GTD'];
    const poleSummary=classOrder.filter(c=>presentPoleClasses.has(c)).map(c=>`✓ ${c}`).join(' · ') || 'none';
    const readiness=[
      ['Metadata', !!(race.id&&race.event&&race.circuit), `${race.event||'—'} · ${race.circuit||'—'}`],
      ['Results', !!race.entries.length, `${race.entries.length} cars`],
      ['Fastest Laps', !!(race.performance.fastestLaps||[]).length, `${(race.performance.fastestLaps||[]).length} records`],
      ['Pole Positions', !!(race.performance.poles||[]).length, poleSummary],
      ['Qualifying PDFs', !!(groups.qualDocs||[]).length, `${(groups.qualDocs||[]).length} file(s)`]
    ];
    const out=$('acoV2Output');
    if(!out) return;
    out.innerHTML=`
      <div class="import-format"><strong>ACO Importer v2.2 preview</strong><span class="muted">Graphical preview before archive import.</span></div>
      <div class="import-detected"><span>${race.entries.length} cars</span><span>${classes.length} classes</span><span>${classes.map(esc2).join(', ')||'no classes'}</span><span>${race.performance.fastestLaps.length} FL</span><span>${race.performance.poles.length} PP</span></div>
      <div class="import-detected"><strong>Results</strong> ${fileListHtml(groups.resultsDocs,'missing')}<br><strong>Fastest Laps</strong> ${fileListHtml(groups.fastestDocs,'optional / fallback from results')}<br><strong>Qualifying / Hyperpole</strong> ${fileListHtml(groups.qualDocs,'optional')}</div>
      <div class="validation-list">${readiness.map(r=>`<div class="validation-row ${r[1]?'ok':'warn'}"><div>${r[1]?'✓':'⚠'}</div><div><strong>${esc2(r[0])}</strong><span>${esc2(r[2])}</span></div></div>`).join('')}</div>
      ${warnings.length?`<div class="validation-row warn"><div>⚠</div><div><strong>Warnings</strong><span>${warnings.map(esc2).join('<br>')}</span></div></div>`:'<div class="validation-row ok"><div>✓</div><div><strong>Preview OK</strong><span>Review Order, PP and FL before importing.</span></div></div>'}
      <div class="wizard-card preview-card"><h3>Dashboard preview</h3><div class="import-detected"><span>${esc2(race.series?.toUpperCase?.()||race.series)}</span><span>R${esc2(race.round||'—')}</span><span>${esc2(race.event)}</span><span>${esc2(race.circuit)}</span><span>${esc2(race.date||'—')}</span><span>${esc2(race.officialDuration||race.scheduledDuration||'—')}</span><span>${esc2(race.officialLaps||race.scheduledLaps||'—')} laps</span></div></div>
      <div class="wizard-card preview-card"><h3>Order preview</h3>${previewOrderHtml(race)}</div>
      <div class="wizard-card preview-card"><h3>Class winners</h3>${classWinnersHtml(race)}</div>
      <div class="wizard-card preview-card"><h3>Fastest Laps</h3>${perfRowsHtml(race.performance.fastestLaps)}</div>
      <div class="wizard-card preview-card"><h3>Pole Positions</h3>${perfRowsHtml(race.performance.poles)}</div>
      <details class="wizard-card"><summary>Advanced · parser log and generated replaceRace() code</summary><pre>${esc2(notes.join('\n'))}</pre><label class="full">Generated replaceRace() code<textarea id="acoV2Code" class="import-textarea" rows="12"></textarea></label><div class="form-actions"><button id="acoV2CopyBtn" class="secondary">Select generated code</button></div></details>
      <div class="form-actions sticky-import-actions"><button id="acoV2AddBtn">Import race to archive</button><button id="acoV2RefreshBtn" class="secondary">Refresh preview from metadata</button></div>`;
    $('acoV2Code').value=toCode(race);
    $('acoV2AddBtn').onclick=addToArchive;
    $('acoV2RefreshBtn').onclick=applyMetadataToPreview;
    $('acoV2CopyBtn').onclick=()=>{$('acoV2Code').focus();$('acoV2Code').select();};
    renderV2SidePanel(race,warnings,groups);
  }
  function renderV2SidePanel(race,warnings=[],groups={}){
    const box=$('acoV2Side'); if(!box) return;
    box.innerHTML=`<h2>ACO Import Session</h2>
      <div class="stat-grid"><div class="stat"><strong>${race.entries.length}</strong><span>RESULTS CARS</span></div><div class="stat"><strong>${race.performance.fastestLaps.length}</strong><span>FL ROWS</span></div><div class="stat"><strong>${race.performance.poles.length}</strong><span>PP ROWS</span></div></div>
      <div class="validation-list">${warnings.length?warnings.map(w=>`<div class="validation-row warn"><div>⚠</div><div><strong>Warning</strong><span>${esc2(w)}</span></div></div>`).join(''):'<div class="validation-row ok"><div>✓</div><div><strong>Ready</strong><span>Preview can be imported.</span></div></div>'}</div>
      <p class="muted">Race Control remains manual. Import adds/updates only the race object in this browser session.</p>`;
  }
  function addToArchive(){
    const race=window.__SCC_IMPORTER_V2_PREVIEW__;
    if(!race || !race.id) return alert('No preview race generated.');
    if(!race.entries || !race.entries.length) return alert('Preview has no entries; not importing.');
    if(typeof window.replaceRace==='function') window.replaceRace(race); else { const i=RACES.findIndex(x=>x.id===race.id); if(i>=0)RACES[i]=race; else RACES.push(race); }
    if(window.state){ window.state.race=JSON.parse(JSON.stringify(race)); window.state.selectedSegment=null; window.state.classFilter=null; }
    if(typeof window.render==='function') window.render();
    if(typeof window.switchTab==='function') window.switchTab('dashboard');
    alert(`${race.event} imported to archive preview (${race.entries.length} cars). Use generated code or update data.js for permanent storage.`);
  }
  function clearSession(){
    window.__SCC_IMPORTER_V2_SESSION__=null;
    window.__SCC_IMPORTER_V2_PREVIEW__=null;
    ['acoV2ResultsFile','acoV2FastestFile','acoV2QualFiles'].forEach(id=>{const el=$(id); if(el) el.value='';});
    if($('acoV2Output')) $('acoV2Output').innerHTML='<div class="empty-state">No PDFs loaded in this session.</div>';
    if($('acoV2Side')) $('acoV2Side').innerHTML='<h2>ACO Import Session</h2><div class="empty-state">No PDFs loaded yet.</div>';
  }

  function installV2Styles(){
    if($('acoV2Styles')) return;
    const st=document.createElement('style'); st.id='acoV2Styles';
    st.textContent=`.aco-v2-layout .preview-card{margin-top:14px}.import-mini-table{display:grid;gap:8px}.import-mini-table>div{border:1px solid rgba(148,163,184,.22);border-radius:12px;padding:10px;background:rgba(15,23,42,.35)}.import-mini-table strong{display:block}.import-mini-table span{display:block;color:var(--muted)}.import-mini-table em{display:block;font-style:normal;color:#cbd5e1}.sticky-import-actions{position:sticky;bottom:0;background:rgba(2,6,23,.92);padding:12px;border-top:1px solid rgba(148,163,184,.18);z-index:2}.aco-v2-layout details summary{cursor:pointer;font-weight:800}`;
    document.head.appendChild(st);
  }
  function installUI(){
    installV2Styles();
    if($('acoImporterV2Card')) return;
    const tab=$('tab-import');
    if(!tab) return;
    tab.innerHTML=`
      <div class="import-layout aco-v2-layout">
        <section class="panel import-panel">
          <div id="acoImporterV2Card" class="wizard-card">
            <h2>ACO Importer v2.2</h2>
            <p class="muted">Clean preview-first importer for Al Kamel PDFs. Race Control stays manual. Use one Race Classification, optional Fastest Laps, and 1..N Qualifying/Hyperpole PDFs. Multiple qualifying PDFs are merged automatically.</p>
            <div class="wizard-steps">
              <span class="wizard-step active">1 Metadata</span>
              <span class="wizard-step">2 Classification</span>
              <span class="wizard-step">3 FL / PP</span>
              <span class="wizard-step">4 Preview</span>
              <span class="wizard-step">5 Import</span>
            </div>
            <h3>1 · Metadata</h3>
            <div class="form-grid import-meta-grid">
              <label>Series<select id="acoV2Series"><option value="wec">WEC</option><option value="elms">ELMS</option><option value="asian-lms">Asian LMS</option><option value="mlmc">MLMC</option><option value="imsa">IMSA</option></select></label>
              <label>Season<input id="acoV2Season" type="number" value="2025" /></label>
              <label>Round<input id="acoV2Round" type="number" /></label>
              <label>Race ID<input id="acoV2Id" placeholder="wec-fuji-2025" /></label>
              <label class="full">Event<input id="acoV2Event" placeholder="6 Hours of Fuji" /></label>
              <label>Circuit<input id="acoV2Circuit" placeholder="Fuji Speedway" /></label>
              <label>Country<input id="acoV2Country" placeholder="Japan" /></label>
              <label>Date<input id="acoV2Date" placeholder="YYYY-MM-DD or DD.MM.YYYY" /></label>
              <label>Scheduled<input id="acoV2Scheduled" placeholder="06:00:00" /></label>
              <label>Official<input id="acoV2Official" placeholder="optional" /></label>
              <label>Laps<input id="acoV2Laps" type="number" /></label>
            </div>
            <h3>2 · Race Classification</h3>
            <label class="full">Race Classification PDF<input id="acoV2ResultsFile" type="file" accept=".pdf,.txt,.csv,application/pdf,text/plain,text/csv" /></label>
            <h3>3 · Fastest Laps and Qualifying / Hyperpole</h3>
            <label class="full">Fastest Laps PDF <small class="muted">optional, fallback may be extracted from classification</small><input id="acoV2FastestFile" type="file" accept=".pdf,.txt,.csv,application/pdf,text/plain,text/csv" /></label>
            <label class="full">Qualifying / Hyperpole PDFs <small class="muted">1 až N souborů, např. HYP + LMGT3</small><input id="acoV2QualFiles" type="file" accept=".pdf,.txt,.csv,application/pdf,text/plain,text/csv" multiple /></label>
            <div class="form-actions"><button id="acoV2AnalyzeBtn">Generate graphical preview</button><button id="acoV2ClearBtn" class="secondary">Start new import / clear PDFs</button></div>
          </div>
          <div id="acoV2Output" class="import-preview"><div class="empty-state">No PDFs loaded in this session.</div></div>
        </section>
        <aside id="acoV2Side" class="panel import-help"><h2>ACO Import Session</h2><div class="empty-state">No PDFs loaded yet.</div></aside>
      </div>`;
    setMetaDefaultsFromCurrentRace();
    $('acoV2AnalyzeBtn').onclick=analyze;
    $('acoV2ClearBtn').onclick=clearSession;
    ['acoV2Series','acoV2Season','acoV2Round','acoV2Id','acoV2Event','acoV2Circuit','acoV2Country','acoV2Date','acoV2Scheduled','acoV2Official','acoV2Laps'].forEach(id=>{const el=$(id); if(el) el.addEventListener('input',()=>{if(window.__SCC_IMPORTER_V2_SESSION__) applyMetadataToPreview();});});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installUI); else installUI();
})();
