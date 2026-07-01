(function(){
'use strict';
const V='v0.7.9';
function setVersion079(){
  document.querySelectorAll('.version, .app-version, [data-version]').forEach(el=>el.textContent=V);
  const logo=document.querySelector('.brand small,.sidebar small'); if(logo && /v0\./i.test(logo.textContent)) logo.textContent=V;
  document.title='SCC v0.7.9 · Import Wizard 2.0 ACO';
}
function E(s){return (window.esc?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])))}
function clsNorm(s){return window.normClass?normClass(s):String(s||'').trim().toUpperCase()}
function val(obj,keys){for(const k of keys){if(obj&&obj[k]!=null&&String(obj[k]).trim()!=='')return obj[k]}return''}
function isPdfText(text){return /^\[SCC_PDF_TEXT:/i.test(String(text||'').trim())}
function pdfBody(text){return String(text||'').split('\n').slice(1).join('\n')}
function toSec(t){ if(window.parseTime)return parseTime('0:'+String(t||'').replace(/^0:/,'')); const m=String(t||'').match(/(\d+):([0-5]\d)\.(\d{3})/); return m?+m[1]*60+ +m[2]+(+m[3]/1000):999999; }
function canonClass(s){
  const u=String(s||'').toUpperCase().replace(/[\s\-_/]+/g,'');
  if(/HYP|HYPERCAR|LMH|LMDH|GTP/.test(u)&&!/GT3/.test(u)) return 'HYP';
  if(/LMGT3|GT3/.test(u)) return 'LMGT3';
  if(/LMP2PROAM|LMP2PA|PROAM/.test(u)) return 'LMP2_PA';
  if(/LMP2/.test(u)) return 'LMP2';
  if(/LMP3/.test(u)) return 'LMP3';
  return clsNorm(s||'Overall');
}
function carClassFromText(t){
  const s=String(t||'');
  if(/\b(HYPERCAR|HYP)\b/i.test(s)) return 'HYP';
  if(/\bLMGT3\b|GT3/i.test(s)) return 'LMGT3';
  if(/LMP2\s*(P\/A|PRO\/?AM|PA)/i.test(s)) return 'LMP2_PA';
  if(/\bLMP2\b/i.test(s)) return 'LMP2';
  if(/\bLMP3\b/i.test(s)) return 'LMP3';
  return '';
}
function driverTitle(s){return String(s||'').trim().split(/\s+/).map(w=>/^[A-ZÁÉÍÓÚÄËÏÖÜÑÇ]\.$/.test(w)?w:w.charAt(0)+w.slice(1).toLowerCase()).join(' ')}
function firstDriver(drivers){return String(drivers||'').split('|')[0].replace(/\s*\/\s*/g,' ').trim()}
function rebuildPerformanceRowsFromClassification(rows){
  const byClass={}, all={};
  rows.forEach(r=>{
    const time=r.bestLap||r.time||r.laptime||'';
    if(!/^\d{1,2}:\d{2}\.\d{3}$/.test(time))return;
    const cls=canonClass(r.class||carClassFromText((r.model||'')+' '+(r.team||''))||'Overall');
    const p={type:'FL',class:cls,no:String(r.no||r.number||''),driver:firstDriver(r.drivers||r.driver||''),lap:r.bestLapNo||r.lap||'',time,constructor:r.constructor,model:r.model,team:r.team};
    if(!byClass[cls]||toSec(time)<toSec(byClass[cls].time))byClass[cls]=p;
    if(!all.Overall||toSec(time)<toSec(all.Overall.time))all.Overall={...p,class:'Overall'};
  });
  return ['Overall','HYP','LMP2','LMP2_PA','LMP3','LMGT3','GTP','GTD_PRO','GTD','GT3'].filter(k=>all[k]||byClass[k]).map(k=>all[k]||byClass[k]);
}
function parseAcoQualifyingText(text){
  const body=pdfBody(text).replace(/\r/g,' ');
  if(/Final\s+Classification/i.test(body) && /Race/i.test(body)) return {kind:'wrong-doc',rows:[],message:'This looks like Race Final Classification. Use Results/Classification for order and Fastest Laps for FL; it is not a Pole Position source.'};
  const lines=body.split('\n').map(x=>x.replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim()).filter(Boolean);
  const rows=[];
  for(const line of lines){
    if(/^(No Team|Published|Stewards|Timekeeper|Race$|Qualifying|Hyperpole|Session|Track Temp|Page )/i.test(line)) continue;
    const times=[...line.matchAll(/\b\d{1,2}:\d{2}\.\d{3}\b/g)];
    if(!times.length) continue;
    const time=times[0][0];
    const before=line.slice(0,times[0].index).trim();
    const cls=carClassFromText(line) || (/(HYPERCAR|LMGT3|LMP2|LMP3)/i.exec(line)||[])[1] || '';
    // Typical ACO line starts with position and car number. If not, keep it as a preview warning only.
    const m=before.match(/^(\d+)\s+([0-9]{1,3}|0[0-9]{2})\s+(.+)$/);
    if(!m) continue;
    const no=m[2]; let rest=m[3];
    // Driver is often just before car/class in qualifying PDFs; use known initial/surname or final two tokens fallback.
    let driver='';
    const initialName=rest.match(/([A-ZÁÉÍÓÚÄËÏÖÜÑÇ]\.?\s+[A-ZÁÉÍÓÚÄËÏÖÜÑÇ][A-ZÁÉÍÓÚÄËÏÖÜÑÇ'’\-]+)\s+(?:BMW|Ferrari|Toyota|Cadillac|Alpine|Peugeot|Genesis|Aston Martin|Porsche|McLaren|Lexus|Corvette|Mercedes|Oreca|Ligier|Duqueine|Adess|Ginetta|Ford)/i);
    if(initialName) driver=driverTitle(initialName[1]);
    if(!driver){const parts=rest.split(' '); driver=driverTitle(parts.slice(Math.max(0,parts.length-2)).join(' '));}
    const modelMatch=line.match(/(BMW M Hybrid V8|Ferrari 499P|Toyota GR010 Hybrid|Cadillac V-Series\.R|Alpine A424|Peugeot 9X8|Genesis GMR-001[^\s]*|Aston Martin Valkyrie|Porsche 911 GT3 R|McLaren 720S[^\s]*|Lexus RC F LMGT3|Corvette Z06 LMGT3\.R|Mercedes-AMG LMGT3|Oreca 07[^\s]*|Ligier JS P3\d+|Duqueine D\d+|Adess\s*\w*|Ginetta\s*\w*|Ford Mustang LMGT3)/i);
    const model=modelMatch?modelMatch[1]:'';
    rows.push({type:'PP',class:canonClass(cls||carClassFromText(model)||'Overall'),no,driver,time,model,constructor:window.constructorFromVehicle?constructorFromVehicle(model):''});
  }
  // pick best per class + overall
  const best={}; rows.forEach(r=>{if(!best[r.class]||toSec(r.time)<toSec(best[r.class].time))best[r.class]=r;if(!best.Overall||toSec(r.time)<toSec(best.Overall.time))best.Overall={...r,class:'Overall'};});
  return {kind:'qualifying',rows:['Overall','HYP','LMP2','LMP2_PA','LMP3','LMGT3'].filter(k=>best[k]).map(k=>best[k]),message:''};
}
function installImportWizard2(){
  const oldCard=document.getElementById('performanceDrop')?.closest('.wizard-card');
  if(!oldCard || oldCard.dataset.v079)return;
  oldCard.dataset.v079='1';
  oldCard.innerHTML=`<h3>4 · Qualifying / Hyperpole / Grid</h3>
    <p class="muted">Pole-position source for ACO series (WEC/ELMS/MLMC/Asian LMS): Qualifying, Hyperpole or Starting Grid PDF/CSV. Race Classification PDFs are rejected here on purpose.</p>
    <div id="qualifyingDrop" class="drop-zone">Drop Qualifying / Hyperpole / Grid PDF / CSV / JSON here<br><small>or</small><br><label class="buttonlike secondary">Browse file<input id="qualifyingFile" type="file" accept=".csv,.txt,.json,.pdf,text/csv,text/plain,application/json,application/pdf" hidden></label></div>
    <textarea id="qualifyingCsv" class="import-textarea" rows="5" placeholder="type,class,no,driver,time\nPP,Overall,50,Antonio Fuoco,1:30.127\nPP,LMGT3,58,Driver Name,1:41.777"></textarea>
    <div class="form-actions"><button id="previewQualifyingBtn" class="secondary">Preview PP/Grid</button><button id="importQualifyingBtn">Import PP/Grid</button></div>
    <div id="qualifyingPreview" class="import-preview"></div>`;
  const rcCard=document.getElementById('raceControlDrop')?.closest('.wizard-card');
  if(rcCard){
    rcCard.insertAdjacentHTML('beforebegin',`<div class="wizard-card" data-v079-fl="1">
      <h3>5 · Fastest Laps</h3>
      <p class="muted">Fastest-lap source. For ACO Final Classification PDFs SCC can extract best race laps per class automatically. If a standalone fastest-lap report exists, use it here.</p>
      <div id="fastestDrop" class="drop-zone">Drop Fastest Laps / Race Classification PDF / CSV / JSON here<br><small>or</small><br><label class="buttonlike secondary">Browse file<input id="fastestFile" type="file" accept=".csv,.txt,.json,.pdf,text/csv,text/plain,application/json,application/pdf" hidden></label></div>
      <textarea id="fastestCsv" class="import-textarea" rows="5" placeholder="type,class,no,driver,lap,time\nFL,Overall,93,Paul Di Resta,142,2:04.177\nFL,LMGT3,21,Alessio Rovera,102,2:18.281"></textarea>
      <div class="form-actions"><button id="previewFastestBtn" class="secondary">Preview FL</button><button id="importFastestBtn">Import FL</button></div>
      <div id="fastestPreview" class="import-preview"></div>
    </div>`);
    const h=rcCard.querySelector('h3'); if(h)h.textContent='6 · Race Control Messages';
  }
  document.querySelectorAll('.wizard-step').forEach((s,i)=>{ if(i===3)s.textContent='4 Qualifying'; });
}
function textFor(kind){return document.getElementById(kind+'Csv')?.value||''}
function elFor(kind){return document.getElementById(kind+'Preview')}
function parsePerfCsv(text, defaultType){
  const rows=(window.parseCsv?parseCsv(text):[]);
  return rows.map(r=>({type:String(val(r,['type'])||defaultType).toUpperCase().includes('P')?'PP':'FL',class:canonClass(val(r,['class','category'])||'Overall'),no:String(val(r,['no','number','car'])||'').trim(),driver:val(r,['driver','name','driver1'])||'',lap:val(r,['lap','laps'])||'',time:val(r,['time','laptime','bestlap'])||''})).filter(x=>x.no||x.driver||x.time);
}
function previewQualifying(){
  const text=textFor('qualifying'), el=elFor('qualifying'); if(!el)return;
  let rows=[]; let msg='';
  if(isPdfText(text)){const parsed=parseAcoQualifyingText(text); rows=parsed.rows; msg=parsed.message; if(parsed.kind==='wrong-doc'){el.innerHTML=`<div class="validation-item warn"><strong>Wrong document for Pole Positions</strong><span>${E(msg)}</span></div><pre>${E(pdfBody(text).slice(0,1500))}</pre>`;return;}}
  else rows=parsePerfCsv(text,'PP').filter(x=>x.type==='PP');
  el.innerHTML=rows.length?`<strong>${rows.length} pole-position rows detected</strong><div class="import-detected"><span>${rows.map(r=>E(r.class)).join(', ')}</span></div><pre>${E(JSON.stringify(rows.slice(0,5),null,2))}</pre>`:`<div class="empty-state">No pole-position rows detected. Use Qualifying / Hyperpole / Grid, not Race Classification.</div>`;
}
function importQualifying(){previewQualifying(); const text=textFor('qualifying'); let rows=isPdfText(text)?parseAcoQualifyingText(text).rows:parsePerfCsv(text,'PP').filter(x=>x.type==='PP'); if(!rows.length)return alert('No pole-position rows detected.'); state.race.performance=state.race.performance||{}; state.race.performance.poles=rows; render(); alert(`${rows.length} pole-position rows imported.`)}
function previewFastest(){
  const text=textFor('fastest'), el=elFor('fastest'); if(!el)return;
  let rows=[];
  if(isPdfText(text)){
    const sourceRows=(window.parseAcoFinalClassificationPdf?parseAcoFinalClassificationPdf('results',text):(window.parseWecFinalClassificationPdf?parseWecFinalClassificationPdf('results',text):[]));
    rows=rebuildPerformanceRowsFromClassification(sourceRows);
  } else rows=parsePerfCsv(text,'FL').filter(x=>x.type==='FL');
  el.innerHTML=rows.length?`<strong>${rows.length} fastest-lap rows detected</strong><div class="import-detected"><span>${rows.map(r=>E(r.class)).join(', ')}</span></div><pre>${E(JSON.stringify(rows.slice(0,5),null,2))}</pre>`:`<div class="empty-state">No fastest-lap rows detected.</div>`;
}
function importFastest(){previewFastest(); const text=textFor('fastest'); let rows=[]; if(isPdfText(text)){const sourceRows=(window.parseAcoFinalClassificationPdf?parseAcoFinalClassificationPdf('results',text):(window.parseWecFinalClassificationPdf?parseWecFinalClassificationPdf('results',text):[])); rows=rebuildPerformanceRowsFromClassification(sourceRows);} else rows=parsePerfCsv(text,'FL').filter(x=>x.type==='FL'); if(!rows.length)return alert('No fastest-lap rows detected.'); state.race.performance=state.race.performance||{}; state.race.performance.fastestLaps=rows; render(); alert(`${rows.length} fastest-lap rows imported.`)}
function bindFile(dropId,fileId,textId,kind,previewFn){
  const dz=document.getElementById(dropId), fi=document.getElementById(fileId), ta=document.getElementById(textId); if(!dz||!fi||!ta||dz.dataset.v079Bound)return; dz.dataset.v079Bound='1';
  const load=f=>{if(!f)return; const ext=(f.name.split('.').pop()||'').toLowerCase(); if(/pdf/i.test(f.type)||ext==='pdf'){ta.value=`[SCC_SOURCE:PDF] ${f.name}\nParser target: ${kind}\nStatus: extracting text...`; previewFn(); readPdfText(f).then(txt=>{ta.value=`[SCC_PDF_TEXT:${kind}] ${f.name}\n${txt}`; previewFn();}).catch(err=>{ta.value=`[SCC_SOURCE:PDF] ${f.name}\nParser target: ${kind}\nStatus: PDF extraction failed: ${err.message}`; previewFn();}); return;} const r=new FileReader(); r.onload=()=>{ta.value=r.result;previewFn();}; r.readAsText(f);};
  dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('drag')}); dz.addEventListener('dragleave',()=>dz.classList.remove('drag')); dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('drag');load(e.dataTransfer.files[0])}); fi.onchange=e=>load(e.target.files[0]);
}
function install079(){
  setVersion079(); installImportWizard2();
  const pq=document.getElementById('previewQualifyingBtn'), iq=document.getElementById('importQualifyingBtn'), pf=document.getElementById('previewFastestBtn'), iff=document.getElementById('importFastestBtn');
  if(pq)pq.onclick=previewQualifying; if(iq)iq.onclick=importQualifying; if(pf)pf.onclick=previewFastest; if(iff)iff.onclick=importFastest;
  bindFile('qualifyingDrop','qualifyingFile','qualifyingCsv','qualifying',previewQualifying);
  bindFile('fastestDrop','fastestFile','fastestCsv','fastestLaps',previewFastest);
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(install079,150));
setVersion079();
})();
