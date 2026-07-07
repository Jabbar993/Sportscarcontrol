let state={race:null,mode:'time',selectedSegment:null,classFilter:null,assets:{},dataTab:'drivers',selectedDriver:null,driverFilters:{q:'',country:'',series:'all',ageMin:'',ageMax:'',startsMin:'',winsMin:'',podiumsMin:'',ppMin:'',flMin:''},driverSort:{key:'starts',dir:'desc'}};
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function parseTime(t){if(typeof t==='number')return t;const p=String(t||'0').split(':').map(Number);return (p[0]||0)*3600+(p[1]||0)*60+(p[2]||0)}
function fmtTime(sec){sec=Math.max(0,Math.round(sec));const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
function fmtShort(sec){sec=Math.max(0,Math.round(sec));const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`}
function series(){return SERIES[state.race.series]}
function raceClassIds(){
  const order=Object.keys(series().classes||{});
  const present=[...new Set((state.race.entries||[]).map(e=>e.class).filter(Boolean))];
  return present.length ? order.filter(c=>present.includes(c)).concat(present.filter(c=>!order.includes(c))) : order;
}
// Sorting class sections alphabetically (localeCompare) happened to match the real pecking
// order for WEC's own HYP/LMGT3 (H before L) - coincidence that broke the moment a series with
// more classes appeared: WEC 2023's GTEAM/HYP/LMP2 alphabetizes to GTEAM first, ELMS's
// LMGT3/LMP2/LMP2PA/LMP3 puts the slowest class first too. Order by the series' own declared
// class order instead (fastest class first, as defined in SERIES[x].classes).
function classSortIndex(cls){
  const order=raceClassIds();
  const i=order.indexOf(cls);
  return i<0?order.length:i;
}
function constructorMeta(id){return CONSTRUCTORS.find(c=>c.id===id)||{id,name:id,short:String(id||'?').slice(0,3).toUpperCase(),logo:'',fallbackColor:'#334'} }
const GLOBAL_CLASS_META={HYP:{label:'Hypercar',short:'HYP',color:'#e31b3f',text:'#fff'},LMGT3:{label:'LMGT3',short:'LMGT3',color:'#00b969',text:'#04110b'},LMP2:{label:'LMP2',short:'LMP2',color:'#0d7ee8',text:'#fff'},LMP2PA:{label:'LMP2 P/A',short:'LMP2 P/A',color:'#69d7ff',text:'#071014'},LMP3:{label:'LMP3',short:'LMP3',color:'#8b5cf6',text:'#fff'},GTP:{label:'GTP',short:'GTP',color:'#f2f2f2',text:'#111'},GTDPRO:{label:'GTD PRO',short:'GTD PRO',color:'#e31b3f',text:'#fff'},GTD_PRO:{label:'GTD PRO',short:'GTD PRO',color:'#e31b3f',text:'#fff'},GTD:{label:'GTD',short:'GTD',color:'#00b969',text:'#04110b'},PRO:{label:'Pro',short:'PRO',color:'#f2f2f2',text:'#111'},GOLD:{label:'Gold',short:'GOLD',color:'#f2c230',text:'#111'},SILVER:{label:'Silver',short:'SILVER',color:'#2d8cff',text:'#fff'},BRONZE:{label:'Bronze',short:'BRONZE',color:'#cd7f32',text:'#fff'},PROAM:{label:'Pro-Am',short:'PRO-AM',color:'#00a651',text:'#071014'},GT3:{label:'GT3',short:'GT3',color:'#00b969',text:'#04110b'}};
function classMeta(cls){return (series().classes&&series().classes[cls])||GLOBAL_CLASS_META[cls]||{label:cls,short:cls,color:'#778',text:'#fff'}}
function emojiFlag(code){code=String(code||'').toUpperCase();if(!/^[A-Z]{2}$/.test(code))return '';return [...code].map(c=>String.fromCodePoint(127397+c.charCodeAt(0))).join('')}
function flag(country){const raw=String(country||'').trim();const code=(FLAG_ALIASES[raw]||FLAG_ALIASES[raw.toUpperCase()]||FLAG_ALIASES[raw.toLowerCase()]||raw.toLowerCase()).replace(/[^a-z]/g,'');const svg=SCC_FLAG_SVGS[code];if(svg)return `<span class="flag flag-${esc(code)}" title="${esc(raw||code)}"><span class="flag-inner">${svg}</span></span>`;const em=emojiFlag(code);if(em)return `<span class="flag flag-emoji" title="${esc(raw||code)}">${em}</span>`;return `<span class="unknown-flag" title="${esc(raw)}">${esc((code||'??').slice(0,2).toUpperCase())}</span>`}
function logo(type,id,extraClass=''){
  const meta=type==='series'
    ? {id,short:SERIES[id]?.short||id,logo:SERIES[id]?.logo,name:SERIES[id]?.name||id,fallbackColor:'#1b5'}
    : constructorMeta(id);
  const key=`${type}:${id}`;
  const src=state.assets[key]||meta.logo;
  const short=esc(meta.short||String(id).slice(0,3).toUpperCase());
  const title=esc(meta.name||id);
  const border=esc(meta.fallbackColor||'#e13046');
  const fallback=`<span class="fallback-logo" style="border-color:${border}">${short}</span>`;
  const safeSrc=String(src||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const img=safeSrc?`<img alt="" src="${safeSrc}" onload="this.parentElement.classList.add('has-img')" onerror="this.remove()">`:'';
  return `<span class="logo-box ${type==='series'?'series':''} ${extraClass}" data-logo="${esc(id)}" data-logotype="${type}" title="${title}">${fallback}${img}</span>`;
}
function classBadge(cls){const m=classMeta(cls);return `<span class="class-badge" style="background:${m.color};color:${m.text}">${esc(m.short||cls)}</span>`}
function normalizedDriverCountry(name,country){return country||lookupDriverCountry(name)||''}
function driverList(drivers,compact=false,highlightName=''){
  // highlightName comes straight from the imported PDF text (e.g. "David Heinemeier"), never
  // through the same alias table the roster names below are resolved through (which turns that
  // into "David Heinemeier Hansson") - comparing the raw form against the resolved form silently
  // never matched, so the row's actual driver never got highlighted.
  // Accepts either one name (single-driver-per-lap formats) or an array of two (the 2013-2020
  // two-driver-average era, where BOTH nominated drivers set a qualifying-relevant lap and the
  // third crew member - who never drove in qualifying at all - stays unhighlighted).
  const hlNames=(Array.isArray(highlightName)?highlightName:[highlightName]).filter(Boolean);
  const hlKeys=new Set(hlNames.map(n=>normalizeDriverName(resolveDriverFullName(n))));
  return `<div class="driver-list ${compact?'compact':''}">${(drivers||[]).map(d=>{
    const name=resolveDriverFullName(d[0]);
    const c=normalizedDriverCountry(name,d[1]);
    const isHl=hlKeys.has(normalizeDriverName(name));
    return `<div class="driver">${c?flag(c):'<span class="no-flag"></span>'}<span>${isHl?`<strong class="qual-time-driver">${esc(name)}</strong>`:esc(name)}</span></div>`;
  }).join('')}</div>`;
}
function groupRaces(){const out={};RACES.forEach(r=>{out[r.season]??={};out[r.season][r.series]??=[];out[r.season][r.series].push(r)});Object.values(out).forEach(seriesGroup=>Object.values(seriesGroup).forEach(arr=>arr.sort((a,b)=>(a.round||999)-(b.round||999)||String(a.event).localeCompare(String(b.event)))));return out}
async function init(){
  await loadAssets();
  // Supports opening a specific race straight to its Dashboard via a "#race=<id>" link
  // (e.g. the "open in new tab" action on a driver's race-history row) - falls back to the
  // default first race whenever the hash is absent or doesn't match a known id.
  const hashRaceId=(location.hash.match(/race=([^&]+)/)||[])[1];
  const hashRace=hashRaceId?RACES.find(r=>r.id===decodeURIComponent(hashRaceId)):null;
  state.race=structuredClone(hashRace||RACES[0]);
  buildRaceSelectors();
  bindEvents();
  render();
  if(hashRace)switchTab('dashboard');
}
function bindEvents(){document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));$('modeTime').onclick=()=>setMode('time');$('modeLaps').onclick=()=>setMode('laps');$('segmentForm').onsubmit=saveSegment;$('cancelEditBtn').onclick=resetForm;$('exportRaceBtn').onclick=exportRace;$('resetRaceBtn').onclick=()=>{const r=RACES.find(x=>x.id===state.race.id);state.race=structuredClone(r);state.selectedSegment=null;render()};$('exportAssetsBtn').onclick=exportAssets;$('importAssetsInput').onchange=importAssets;$('clearAssetsBtn').onclick=async()=>{if(confirm('Clear all uploaded logos stored in this browser?')){state.assets={};await saveAssets();render()}};if($('applyMetadataBtn'))$('applyMetadataBtn').onclick=applyImportMetadata;if($('previewEntriesBtn'))$('previewEntriesBtn').onclick=()=>previewCsv('entry');if($('importEntriesBtn'))$('importEntriesBtn').onclick=importEntriesCsv;if($('previewResultsBtn'))$('previewResultsBtn').onclick=()=>previewCsv('results');if($('importResultsBtn'))$('importResultsBtn').onclick=importResultsCsv;if($('previewPerformanceBtn'))$('previewPerformanceBtn').onclick=()=>previewCsv('performance');if($('importPerformanceBtn'))$('importPerformanceBtn').onclick=importPerformanceCsv;if($('previewRaceControlBtn'))$('previewRaceControlBtn').onclick=()=>previewCsv('raceControl');if($('importRaceControlBtn'))$('importRaceControlBtn').onclick=importRaceControlCsv;setupImportDropzones();document.querySelectorAll('.data-tab').forEach(b=>b.onclick=()=>{state.dataTab=b.dataset.dataTab;renderDataManager();syncDatabaseNav()});document.querySelectorAll('.database-nav button').forEach(b=>b.onclick=()=>{state.dataTab=b.dataset.dbTab;switchTab('data');renderDataManager();syncDatabaseNav()})}
function switchTab(tab){document.body.classList.toggle('db-tab-active',tab==='data');document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelectorAll('.tab-content').forEach(s=>s.classList.toggle('active',s.id===`tab-${tab}`));if(tab==='settings')renderAssets();if(tab==='races')renderRaceBrowser(true);if(tab==='data'){window.__db85Selected='';renderDataManager();syncDatabaseNav()}
  // renderSummaryFull() (and its Class Podiums name-wrap measurement) usually runs while the
  // Summary tab is still display:none - e.g. importing a race calls render() and then switches
  // to Dashboard, so the wrap check measures 0 height and never abbreviates anything. Re-running
  // it here, now that the tab is actually visible, gives it real layout to measure against.
  if(tab==='summary' && typeof renderSummaryFull==='function') renderSummaryFull();
}
function setMode(mode){state.mode=mode;$('modeTime').classList.toggle('active',mode==='time');$('modeLaps').classList.toggle('active',mode==='laps');renderTimeline();renderStats()}
function loadRace(id){state.race=structuredClone(RACES.find(r=>r.id===id));state.selectedSegment=null;state.classFilter=null;state.selectedDriver=null;document.querySelectorAll('.race-button').forEach(b=>b.classList.toggle('active',b.dataset.race===id));render();switchTab('dashboard')}

function buildRaceSelectors(){
  const seasons=[...new Set(RACES.map(r=>r.season))].sort((a,b)=>b-a);
  $('seasonSelect').innerHTML=seasons.map(y=>`<option value="${y}">${y}</option>`).join('');
  $('seasonSelect').onchange=()=>{
    const prevSeries=$('seriesSelect').value;
    populateSeriesSelect();
    if([...$('seriesSelect').options].some(o=>o.value===prevSeries)) $('seriesSelect').value=prevSeries;
    populateRaceSelect();
    loadRace($('raceSelect').value);
  };
  $('seriesSelect').onchange=()=>{populateRaceSelect();loadRace($('raceSelect').value)};
  $('raceSelect').onchange=()=>loadRace($('raceSelect').value);
  syncRaceSelectors();
}
function populateSeriesSelect(){
  const season=+$('seasonSelect').value;
  const ids=[...new Set(RACES.filter(r=>r.season===season).map(r=>r.series))];
  $('seriesSelect').innerHTML=ids.map(id=>`<option value="${id}">${SERIES[id].short}</option>`).join('');
}
function populateRaceSelect(){
  const season=+$('seasonSelect').value, sid=$('seriesSelect').value;
  const races=RACES.filter(r=>r.season===season && r.series===sid).sort((a,b)=>(a.round||999)-(b.round||999)||String(a.event).localeCompare(String(b.event)));
  $('raceSelect').innerHTML=races.map(r=>`<option value="${r.id}">R${r.round||''} · ${esc(r.event)}</option>`).join('');
}
function syncRaceSelectors(){
  if(!$('seasonSelect')||!state.race)return;
  $('seasonSelect').value=state.race.season;
  populateSeriesSelect();
  $('seriesSelect').value=state.race.series;
  populateRaceSelect();
  $('raceSelect').value=state.race.id;
}
function render(){(RACES||[]).forEach(r=>{learnDriverCountries(r.entries||[]);learnDriverFullNames(r.entries||[])});learnDriverCountries(state.race?.entries||[]);learnDriverFullNames(state.race?.entries||[]);renderHeader();renderRaceNav();renderPhaseInputs();renderLegend();renderTimeline();renderWinners();renderFastestLaps();renderPolePositions();renderSummaryFull();renderRaceSummary();renderStats();renderFacts();renderSegmentDetails();renderSegments();renderOrder();renderRaceBrowser();renderAssets();renderImportWizard();renderDataManager();syncRaceSelectors()}
function renderHeader(){const r=state.race,s=series();$('seriesLogo').innerHTML=logo('series',r.series);$('seriesName').textContent=s.name;$('raceTitle').textContent=r.event;$('circuitFlag').innerHTML=flag(r.country);$('circuitName').textContent=r.circuit;$('raceDate').textContent=new Date(r.date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});$('durationInfo').textContent=`${r.officialDuration} / ${r.scheduledDuration}`;$('lapsInfo').textContent=`${r.officialLaps} laps`}
// Chronological neighbors of the current race: plain prev/next walk the whole calendar for
// this series in date order; "at this track" narrows that same walk to races at the same
// circuit, so e.g. previous-at-track for ELMS 2026 Imola is ELMS 2025 Imola even if other
// series raced at Imola in between (those don't belong to this series' walk at all).
function raceNavNeighbors(){
  const r=state.race;
  if(!r) return {prevRace:null,nextRace:null,prevTrack:null,nextTrack:null};
  const byDate=(a,b)=>String(a.date||'').localeCompare(String(b.date||''))||((a.round||0)-(b.round||0));
  const sameSeries=RACES.filter(x=>x.series===r.series).sort(byDate);
  const idx=sameSeries.findIndex(x=>x.id===r.id);
  const prevRace=idx>0?sameSeries[idx-1]:null;
  const nextRace=(idx>=0&&idx<sameSeries.length-1)?sameSeries[idx+1]:null;
  const track=(r.circuit||'').trim().toLowerCase();
  const sameTrack=sameSeries.filter(x=>(x.circuit||'').trim().toLowerCase()===track);
  const tIdx=sameTrack.findIndex(x=>x.id===r.id);
  const prevTrack=tIdx>0?sameTrack[tIdx-1]:null;
  const nextTrack=(tIdx>=0&&tIdx<sameTrack.length-1)?sameTrack[tIdx+1]:null;
  return {prevRace,nextRace,prevTrack,nextTrack};
}
function renderRaceNav(){
  const row=$('raceNavRow');
  if(!row) return;
  const nav=raceNavNeighbors();
  const setBtn=(elId,race)=>{
    const el=$(elId);
    if(!el) return;
    const labelEl=el.querySelector('.race-nav-label');
    if(!race){ el.disabled=true; el.title=''; el.onclick=null; if(labelEl)labelEl.textContent='—'; return; }
    el.disabled=false;
    el.title=`${SERIES[race.series]?.short||race.series} ${race.season} · R${race.round||''} ${race.event}`;
    if(labelEl)labelEl.textContent=`${race.season} · ${race.event}`;
    el.onclick=()=>loadRace(race.id);
  };
  setBtn('navPrevRace',nav.prevRace);
  setBtn('navNextRace',nav.nextRace);
  setBtn('navPrevTrack',nav.prevTrack);
  setBtn('navNextTrack',nav.nextTrack);
}
function renderPhaseInputs(){const allowed=series().phases;$('phaseInput').innerHTML=allowed.map(p=>`<option value="${p}">${SCC_PHASES[p].label}</option>`).join('')}
function renderLegend(){const used=[...new Set(state.race.segments.map(s=>s.phase))].filter(p=>series().phases.includes(p));$('phaseLegend').innerHTML=used.map(p=>{const ph=SCC_PHASES[p];return `<span class="legend-item"><span class="swatch ${p==='SLOW_ZONE'?'slow-swatch':''}" style="background:${p==='SLOW_ZONE'?'':ph.color}"></span>${esc(ph.label)}</span>`}).join('')}
function renderTimeline(){const r=state.race,total=state.mode==='time'?parseTime(r.officialDuration):r.officialLaps;const svg=$('timelineSvg');svg.innerHTML=`<defs><pattern id="slowHatch" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(35)"><rect width="12" height="12" fill="${SCC_PHASES.SLOW_ZONE.color}"/><rect width="3" height="12" fill="rgba(255,255,255,.45)"/></pattern></defs>`;const x0=42,w=900,y=46,h=34,axisY=25;for(let i=0;i<=6;i++){const x=x0+w*i/6,val=total*i/6;const label=state.mode==='time'?fmtTime(val).replace(/:00$/,''):Math.round(val);svg.insertAdjacentHTML('beforeend',`<line x1="${x}" y1="${axisY+8}" x2="${x}" y2="${y+h+15}" stroke="#2b3e56" stroke-width="1"/><text x="${x}" y="${axisY}" text-anchor="${i===0?'start':i===6?'end':'middle'}" fill="#9aacc2" font-size="12">${label}</text>`)}svg.insertAdjacentHTML('beforeend',`<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="7" fill="#06101a" stroke="#25354b"/>`);state.race.segments.forEach(seg=>{const a=state.mode==='time'?seg.start:seg.startLap,b=state.mode==='time'?seg.end:seg.endLap;const x=x0+w*a/total,ww=Math.max(1,w*(b-a)/total);const ph=SCC_PHASES[seg.phase];const fill=seg.phase==='SLOW_ZONE'?'url(#slowHatch)':ph.color;const sel=state.selectedSegment?.id===seg.id;svg.insertAdjacentHTML('beforeend',`<rect data-id="${seg.id}" x="${x}" y="${y}" width="${ww}" height="${h}" rx="${ww<12?2:6}" fill="${fill}" stroke="${sel?'#fff':'rgba(0,0,0,.48)'}" stroke-width="${sel?3:1}"/>`)});svg.insertAdjacentHTML('beforeend',`<g data-finish="1" transform="translate(${x0+w+8},${y-5})"><rect width="30" height="44" rx="7" fill="#0c1320" stroke="#fff" opacity=".95"/><text x="15" y="29" text-anchor="middle" font-size="24">🏁</text></g>`);svg.querySelectorAll('rect[data-id]').forEach(el=>{el.onmousemove=e=>showTip(e,state.race.segments.find(s=>s.id===el.dataset.id));el.onmouseleave=hideTip;el.onclick=()=>{state.selectedSegment=state.race.segments.find(s=>s.id===el.dataset.id);renderTimeline();renderSegmentDetails();renderStats()}})}
function showTip(e,seg){const t=$('tooltip');t.innerHTML=`<strong>${SCC_PHASES[seg.phase].label}</strong><br>${fmtTime(seg.start)} → ${fmtTime(seg.end)}<br>${fmtShort(seg.end-seg.start)} · ${seg.endLap-seg.startLap} laps<br><span class="muted">${esc(seg.reason||'')}</span>`;t.style.left=Math.min(e.clientX+14,window.innerWidth-220)+'px';t.style.top=Math.min(e.clientY+14,window.innerHeight-120)+'px';t.classList.remove('hidden')}
function hideTip(){$('tooltip').classList.add('hidden')}
function renderWinners(){const classes=raceClassIds();const winners=classes.map(cls=>state.race.entries.find(e=>e.class===cls)).filter(Boolean);const list=classes.length>1?winners:state.race.entries.slice(0,3);$('winnersTitle').textContent=classes.length>1?'Class Winners':'Top 3';$('winnersList').innerHTML=list.length?list.map(winnerCard).join(''):'<div class="empty-state">No results added yet.</div>'}
function winnerCard(e){
  const cls=classMeta(e.class);
  const gap=e.pos===1?'WINNER':esc(e.gap||'');
  return `<article class="winner-card winner-card-v2" style="--class-color:${cls.color}">
    <div class="winner-pos-block">
      <div class="winner-pos">${e.pos}</div>
      ${classBadge(e.class)}
    </div>
    <div class="winner-logo">${logo('constructor',e.constructor)}</div>
    <div class="winner-info">
      <div class="winner-title-line"><strong>#${esc(e.no)} ${esc(e.team)}</strong><span>${gap}</span></div>
      <div class="carline">${esc(e.model||constructorMeta(e.constructor).name)}</div>
      <div class="winner-drivers-inline">${driversInline(e)}</div>
    </div>
    <div class="winner-result">
      <strong>${esc(String(e.laps))} laps</strong>
      <small>${esc(e.time||'')}</small>
    </div>
  </article>`;
}
function entryFinishSeconds(e){
  const t=String(e.time||'').trim();
  if(!t || t.startsWith('+') || /lap/i.test(t) || /NC|DNF|DNS/i.test(t)) return null;
  return parseTime(t);
}
function classRanks(){
  const ranks={};
  state.race.entries.forEach(e=>{
    ranks[e.class]??=[];
    ranks[e.class].push(e);
  });
  Object.keys(ranks).forEach(cls=>ranks[cls].sort((a,b)=>statusRank(a)-statusRank(b)||(Number(a.pos)||9999)-(Number(b.pos)||9999)||String(a.no).localeCompare(String(b.no))).forEach((e,i)=>{e.__classPos=i+1}));
  return ranks;
}
// Starting grid position within class (only populated when a Starting Grid PDF was
// imported - entries without e.grid are simply absent from these rankings).
function classGridRanks(){
  const ranks={};
  state.race.entries.forEach(e=>{ if(Number(e.grid)>0) (ranks[e.class]??=[]).push(e); });
  Object.keys(ranks).forEach(cls=>ranks[cls].sort((a,b)=>(Number(a.grid)||9999)-(Number(b.grid)||9999)).forEach((e,i)=>{e.__classGridPos=i+1}));
  return ranks;
}
function parseGapParts(e){
  const raw=String(e?.gap||e?.time||'').trim();
  if(!raw || raw==='—') return null;
  if(/DNF|DNS|RET|NC|DSQ|Electrical|Suspension|Transmission|Power loss/i.test(raw)) return null;

  // hasSeconds distinguishes "we parsed a real seconds value" from "seconds defaulted to 0
  // because this gap was only ever expressed in whole laps" - conflating the two made two
  // different "+1 Lap" cars look exactly 0.000s apart, which is never really true.
  const out={laps:0,seconds:0,absolute:false,hasSeconds:false};
  if(!raw.startsWith('+')){
    const parts=raw.split(':').map(Number);
    if(parts.length===3 && parts.every(Number.isFinite)) return {laps:0,seconds:parts[0]*3600+parts[1]*60+parts[2],absolute:true,hasSeconds:true};
    if(parts.length===2 && parts.every(Number.isFinite)) return {laps:0,seconds:parts[0]*60+parts[1],absolute:true,hasSeconds:true};
    const n=Number(raw);
    return Number.isFinite(n)?{laps:0,seconds:n,absolute:false,hasSeconds:true}:null;
  }

  const x=raw.slice(1).trim().toLowerCase();
  const lapMatch=x.match(/(\d+)\s*laps?/);
  if(lapMatch) out.laps=Number(lapMatch[1])||0;
  let timePart=x.replace(/\d+\s*laps?/g,'').replace(/^\s*\+\s*/,'').trim();
  if(timePart){
    const parts=timePart.split(':').map(Number);
    if(parts.length===3 && parts.every(Number.isFinite)) { out.seconds=parts[0]*3600+parts[1]*60+parts[2]; out.hasSeconds=true; }
    else if(parts.length===2 && parts.every(Number.isFinite)) { out.seconds=parts[0]*60+parts[1]; out.hasSeconds=true; }
    else { const n=Number(timePart.replace(/^\+/,'')); if(Number.isFinite(n)) { out.seconds=n; out.hasSeconds=true; } }
  } else if(!lapMatch){
    const parts=x.split(':').map(Number);
    if(parts.length===3 && parts.every(Number.isFinite)) { out.seconds=parts[0]*3600+parts[1]*60+parts[2]; out.hasSeconds=true; }
    else if(parts.length===2 && parts.every(Number.isFinite)) { out.seconds=parts[0]*60+parts[1]; out.hasSeconds=true; }
    else { const n=Number(x); if(Number.isFinite(n)) { out.seconds=n; out.hasSeconds=true; } else return null; }
  }
  return out;
}
function gapSeconds(e){
  const p=parseGapParts(e);
  return p && !p.laps ? p.seconds : null;
}
function fmtDeltaSeconds(d){
  if(!Number.isFinite(d) || d<0) return '—';
  if(d>=60){
    const m=Math.floor(d/60), s=d-m*60;
    return `+${m}:${s.toFixed(3).padStart(6,'0')}`;
  }
  return `+${d.toFixed(3)}`;
}
function fmtLapTime(sec){
  if(!Number.isFinite(sec)) return '—';
  const m=Math.floor(sec/60), s=sec-m*60;
  return `${m}:${s.toFixed(3).padStart(6,'0')}`;
}
// Signed version of fmtDeltaSeconds - the class average line needs both directions (faster
// than average is exactly as common as slower), unlike a gap-to-pole which is never negative.
function fmtSignedDelta(d){
  if(!Number.isFinite(d)) return '';
  return `${d<0?'-':'+'}${Math.abs(d).toFixed(3)}`;
}
// Average of every real recorded qualifying time in a class - purely a render-time calculation
// over data that's already stored, so it's automatically available for every qualifying
// already imported and every one imported from now on, no re-import needed.
function classAverageLaptimes(rows){
  const sums={}, counts={};
  (rows||[]).forEach(r=>{
    if(!r.time) return;
    const t=parseTime('0:'+r.time);
    sums[r.class]=(sums[r.class]||0)+t;
    counts[r.class]=(counts[r.class]||0)+1;
  });
  const out={};
  Object.keys(sums).forEach(cls=>{ out[cls]=sums[cls]/counts[cls]; });
  return out;
}
function qualifyingAverageLaptimesHtml(classAvg){
  const classes=Object.keys(classAvg);
  if(!classes.length) return '';
  const cards=classes.map(cls=>`<div class="qual-avg-card">${classBadge(cls)}<div class="qual-avg-text"><span>Average laptime</span><strong>${esc(fmtLapTime(classAvg[cls]))}</strong></div></div>`).join('');
  return `<div class="qual-avg-grid">${cards}</div>`;
}
function classGap(e, classWinner){
  if(!classWinner || e===classWinner || e.no===classWinner.no) return '—';
  if(/NC|DNF|DNS|RET|DSQ/i.test(String(e.gap||e.status||''))) return e.gap||e.status;
  const lapDiff=(Number(classWinner.laps)||0)-(Number(e.laps)||0);
  if(lapDiff>0) return `${lapDiff} ${lapDiff===1?'Lap':'Laps'}`;
  const a=entryFinishSeconds(classWinner), b=entryFinishSeconds(e);
  if(a!==null && b!==null && b>=a) return fmtDeltaSeconds(b-a);
  const wp=parseGapParts(classWinner), ep=parseGapParts(e);
  if(wp && ep && ep.laps===wp.laps && wp.hasSeconds && ep.hasSeconds && ep.seconds>=wp.seconds) return fmtDeltaSeconds(ep.seconds-wp.seconds);
  const intv=String(e.int||e.interval||'').trim();
  if(intv && !/^[-—]$/.test(intv)) return intv;
  return e.gap||'—';
}

function statusRank(e){const s=entryStatus(e);return s==='Classified'?0:s==='NC'?1:s==='RET'?2:s==='DNS'?3:s==='DSQ'?4:5}
function sortOrderEntries(arr){return arr.slice().sort((a,b)=>statusRank(a)-statusRank(b)||(Number(a.pos)||9999)-(Number(b.pos)||9999)||(Number(b.laps)||0)-(Number(a.laps)||0)||String(a.no).localeCompare(String(b.no)))}
function displayInterval(e,prev){
  if(!prev) return '—';
  const status=entryStatus(e);
  if(status==='DNS'||status==='DSQ') return status;
  const lapDiff=(Number(prev.laps)||0)-(Number(e.laps)||0);
  if(lapDiff>0) return `+${lapDiff} ${lapDiff===1?'lap':'laps'}`;
  const a=entryFinishSeconds(prev), b=entryFinishSeconds(e);
  if(a!==null&&b!==null&&b>=a) return fmtDeltaSeconds(b-a);
  const pp=parseGapParts(prev), ep=parseGapParts(e);
  if(pp && ep && ep.laps===pp.laps && pp.hasSeconds && ep.hasSeconds && ep.seconds>=pp.seconds) return fmtDeltaSeconds(ep.seconds-pp.seconds);
  const raw=String(e.int||e.interval||'').trim();
  if(raw) return raw;
  // No reliable second-level data for two cars sharing the same lap deficit (e.g. both
  // "+1 Lap" with no time detail) - showing a fabricated "+0.000" implied they were
  // literally tied, which is essentially never true. Honest "unknown" beats a fake number.
  return '—';
}

function orderRowsHtml(entries,limit=null,classMode=!!state.classFilter){
  const ranks=classRanks();
  const gridRanks=classGridRanks();
  const overallLeader=(state.race.entries||[]).slice().sort((a,b)=>(Number(a.pos)||9999)-(Number(b.pos)||9999))[0];
  const data=limit?sortOrderEntries(entries).slice(0,limit):sortOrderEntries(entries);
  return data.map((e,idx)=>{
    const cpos=e.__classPos || ((ranks[e.class]||[]).findIndex(x=>x.no===e.no)+1);
    const status=entryStatus(e);
    const isRunning=status==='Classified';
    const displayPos=classMode?cpos:e.pos;
    const gap=classMode?displayGapClass(e,(ranks[e.class]||[])[0]):displayGapOverall(e,overallLeader);
    const prev=data[idx-1];
    const interval=displayInterval(e,prev);
    // Overall P1 gets "Winner overall"; every class's own P1 (even mid-pack overall) gets
    // "Winner <Class>" - both keep showing gap/int/laps instead of replacing them, since a
    // class winner running P17 overall still has a meaningful gap-to-leader.
    const isOverallWinner=isRunning && !classMode && Number(e.pos)===1;
    const isClassWinner=isRunning && cpos===1;
    // "Winner overall" keeps the gold treatment; a class winner's label uses that class's
    // own badge color instead, so e.g. an LMGT3 class leader reads in LMGT3 green.
    const winnerLabel=isOverallWinner ? 'Winner overall' : (isClassWinner ? `Winner ${esc(classMeta(e.class).short||e.class)}` : '');
    const winnerLabelStyle=(!isOverallWinner && isClassWinner) ? ` style="color:${classMeta(e.class).color};text-shadow:none"` : '';
    const winnerRowColor=isOverallWinner?'#f2c230':(isClassWinner?classMeta(e.class).color:'');
    // Position change vs the class-relative starting grid slot (only available once a
    // Starting Grid PDF has been imported for this race - otherwise no arrow is shown).
    const gridClassPos=e.__classGridPos || ((gridRanks[e.class]||[]).findIndex(x=>x.no===e.no)+1);
    const posDelta=isRunning && gridClassPos ? gridClassPos-cpos : null;
    const posChangeHtml=posDelta===null?'':posDelta>0?`<em class="pos-change pos-change-up" title="Started C${gridClassPos}, gained ${posDelta}">▲${posDelta}</em>`:posDelta<0?`<em class="pos-change pos-change-down" title="Started C${gridClassPos}, lost ${-posDelta}">▼${-posDelta}</em>`:`<em class="pos-change pos-change-flat" title="Started C${gridClassPos}">–</em>`;
    const posCell=classMode
      ? `<div class="pos class-mode-pos ${isRunning?'':'non-classified'}"><strong>${isRunning?displayPos:status}</strong><small>${isRunning?'Class':(Number(e.laps)>0?Number(e.laps)+' laps':'')}</small>${posChangeHtml}</div>`
      : `<div class="pos ${isRunning?'':'non-classified'}"><strong>${isRunning?displayPos:status}</strong><small>${isRunning?'C'+cpos:(Number(e.laps)>0?Number(e.laps)+' laps':'')}</small>${posChangeHtml}</div>`;
    // A winner's own gap/int is just "—" (no gap to itself) - showing two empty dash lines
    // under the label looks broken, so they're only rendered when there's a real value.
    const gapIsEmpty=!gap || gap==='—';
    const intervalIsEmpty=!interval || interval==='—';
    const gapLine=(winnerLabel && gapIsEmpty) ? '' : `<strong>${esc(gap)}</strong>`;
    const intLine=(winnerLabel && intervalIsEmpty) ? '' : `<small>Int ${esc(interval)}</small>`;
    const gapHtml=`<div class="gap-cell${winnerLabel?' winner-gap':''}">${winnerLabel?`<em class="order-winner-label"${winnerLabelStyle}>${winnerLabel}</em>`:''}${gapLine}${intLine}<small>${esc(String(e.laps||0))} laps · ${statusBadge(status)}</small></div>`;
    return `<div class="order-row ${isRunning?'':'order-row-status'}${winnerRowColor?' order-row-winner':''}"${winnerRowColor?` style="--order-winner-color:${winnerRowColor}"`:''}><div>${posCell}</div>${classBadge(e.class)}<div class="car-no">${esc(e.no)}</div>${logo('constructor',e.constructor)}<div><div class="team-name">${esc(e.team)}</div><div class="car-model">${esc(e.model||constructorMeta(e.constructor).name)}</div></div><div class="order-drivers">${driverList(e.drivers,false,e.bestLapDriver)}</div>${gapHtml}</div>`;
  }).join('');
}
// Only Hyperpole documents give a real lap time (top ~10 per class); the rest of the field's
// qualifying order (if known at all) only comes from the Starting Grid PDF as a bare position,
// no time. Extends state.race.qualifying with those grid-only rows - but only when the race
// actually has Hyperpole data to extend (no qualifying data at all -> nothing to show) AND grid
// data exists (otherwise there's no way to know the order beyond the Hyperpole cutoff).
function extendedQualifyingRows(){
  const qual=state.race.qualifying||[];
  if(!qual.length) return qual;
  const entries=state.race.entries||[];
  if(!entries.some(e=>Number(e.grid)>0)) return qual;
  const covered=new Set(qual.map(r=>r.class+'|'+r.no));
  const maxPosByClass={};
  qual.forEach(r=>{ maxPosByClass[r.class]=Math.max(maxPosByClass[r.class]||0,r.pos); });
  const remainingByClass={};
  entries.forEach(e=>{
    if(!Number(e.grid)||covered.has(e.class+'|'+e.no)) return;
    (remainingByClass[e.class]??=[]).push(e);
  });
  const extra=[];
  Object.keys(remainingByClass).forEach(cls=>{
    remainingByClass[cls].sort((a,b)=>Number(a.grid)-Number(b.grid)).forEach((e,i)=>{
      extra.push({pos:(maxPosByClass[cls]||0)+i+1,no:e.no,class:cls,team:e.team,model:e.model,constructor:e.constructor,drivers:e.drivers,time:e.gridTime||'',timeDriver:e.gridDriver||'',fromGrid:true});
    });
  });
  return [...qual,...extra];
}
function qualifyingRowsHtml(rows){
  // "Pole Position Overall" is whichever class-P1 actually set the fastest time, not
  // necessarily HYP just because it's usually quickest - compare real lap times.
  const classPoles=rows.filter(r=>r.pos===1&&!r.fromGrid);
  const overallPoleNo=classPoles.length?classPoles.reduce((best,r)=>parseTime('0:'+r.time)<parseTime('0:'+best.time)?r:best).no:null;
  const classAvg=classAverageLaptimes(rows);
  const out=[];
  let lastClass=null, seenCutoff=false;
  rows.forEach(r=>{
    if(r.class!==lastClass){
      lastClass=r.class; seenCutoff=false;
      out.push(`<div class="qualifying-divider">${esc(classMeta(r.class).short||r.class)} Qualifying</div>`);
    }
    if(r.fromGrid && !seenCutoff){
      seenCutoff=true;
      out.push(`<div class="qualifying-divider">Beyond Recorded Time &middot; Grid Order</div>`);
    }
    const isClassPole=r.pos===1&&!r.fromGrid;
    const isOverallPole=isClassPole&&r.no===overallPoleNo;
    const poleLabel=isOverallPole?'Pole Position Overall':(isClassPole?`Pole Position ${esc(classMeta(r.class).short||r.class)}`:'');
    const rowColor=isOverallPole?'#f2c230':(isClassPole?classMeta(r.class).color:'');
    const labelStyle=(!isOverallPole&&isClassPole)?` style="color:${rowColor};text-shadow:none"`:'';
    // Gap to that car's own class pole (not "Int" - the car immediately ahead - since
    // qualifying order has no meaningful "car ahead" concept the way a race does). Cars
    // beyond the Hyperpole cutoff can still have a real time (from the Starting Grid
    // document, which times the whole field, not just the top 10) and get a gap too.
    const classPole=classPoles.find(p=>p.class===r.class);
    const gap=(!isClassPole&&classPole&&r.time)?fmtDeltaSeconds(parseTime('0:'+r.time)-parseTime('0:'+classPole.time)):'';
    // Deviation from the class average, not just the gap to pole - green when this lap was
    // faster than the class's own average, red when slower.
    const avgDiff=(r.time&&classAvg[r.class]!=null)?parseTime('0:'+r.time)-classAvg[r.class]:null;
    const avgHtml=avgDiff!=null?`<small class="qual-avg-diff ${avgDiff<0?'qual-avg-faster':'qual-avg-slower'}">Avg ${fmtSignedDelta(avgDiff)}</small>`:'';
    const timeCell=r.time?`<strong>${esc(r.time)}</strong>${gap?`<strong class="qual-gap">Gap ${esc(gap)}</strong>`:''}${avgHtml}`:'<strong>—</strong><small>No lap time recorded</small>';
    out.push(`<div class="order-row qualifying-row${r.fromGrid?' qualifying-row-grid':''}${rowColor?' order-row-winner':''}"${rowColor?` style="--order-winner-color:${rowColor}"`:''}><div class="pos"><strong>${esc(r.pos)}</strong><small>Class</small></div>${classBadge(r.class)}<div class="car-no">${esc(r.no)}</div>${logo('constructor',r.constructor)}<div><div class="team-name">${esc(r.team)}</div><div class="car-model">${esc(r.model||constructorMeta(r.constructor).name)}</div></div><div class="order-drivers">${driverList(r.drivers,false,r.timeDrivers||r.timeDriver)}</div><div class="gap-cell">${poleLabel?`<em class="order-winner-label"${labelStyle}>${poleLabel}</em>`:''}${timeCell}</div></div>`);
  });
  return out.join('');
}
// A Fastest Lap by Driver document ranks every recorded lap - one row per DRIVER, not per car
// (a car with 3 drivers who each set a personal-best lap appears 3 times). Ranks are computed
// here at render time (both overall across the whole field, and within each class) rather than
// stored, so this stays correct even if classAverageLaptimes/etc. change independently.
// Related sub-classes are shown together as one combined "family" (LMGTE Pro + LMGTE Am ->
// "GTE", LMP2 + LMP2 Pro-Am -> "LMP2") - one divider instead of two, with rows from both
// sub-classes interleaved by actual pace instead of listed as two back-to-back blocks. Each
// row keeps its own real class for the badge colour and for classPos (the narrow sub-class
// rank, still used by the per-class average card exactly as before - the average stays split
// by real class, only the Fastest Laps list/divider itself is merged).
function flFamilyOf(cls){
  if(cls==='GTEPRO'||cls==='GTEAM') return 'GTE';
  if(cls==='LMP2'||cls==='LMP2PA') return 'LMP2';
  // IMSA's GTD PRO / GTD split the same way WEC's GTE Pro/Am does (a faster Pro-only class and
  // a Pro-Am-eligible one) - merged into "GTD" the same way, harmless no-op for any other series
  // that has a plain GTD class with no GTD PRO counterpart (this just maps GTD to itself).
  if(cls==='GTDPRO'||cls==='GTD') return 'GTD';
  // 2014 WEC LMP1 split into Hybrid (LMP1-H, works teams) and Light/non-hybrid (LMP1-L,
  // privateers) sub-classes for that one season only - kept as distinct classes everywhere
  // else (different colors/badges), but merged back into one "LMP1" family here per user
  // request, same pattern as GTE/GTD above.
  if(cls==='LMP1H'||cls==='LMP1L'||cls==='LMP1') return 'LMP1';
  // MLMC's LMP3 / LMP3 Pro-Am split the same way WEC/ELMS's LMP2 / LMP2 Pro-Am does.
  if(cls==='LMP3'||cls==='LMP3PA') return 'LMP3';
  // GTWC Europe/America and GT Open all run one single-make GT3 category split purely by
  // driver-rating lineup (Pro/Gold/Silver/Bronze/Pro-Am/Am), not by different cars - same
  // "one underlying class, several crew-rating labels" pattern as GTE/GTD/LMP2/LMP3 above,
  // merged into "GT3" per user request. These class ids only ever appear in gtwc/gtwc_us/
  // gtopen, so this is unambiguous across every other series.
  if(cls==='PRO'||cls==='GOLD'||cls==='SILVER'||cls==='BRONZE'||cls==='PROAM'||cls==='AM') return 'GT3';
  return cls;
}
function flFamilyLabel(cls){
  const f=flFamilyOf(cls);
  return f==='GTE'||f==='LMP2'||f==='GTD'||f==='LMP1'||f==='LMP3'||f==='GT3' ? f : (classMeta(cls).short||cls);
}
function flFamilySortIndex(cls){
  const f=flFamilyOf(cls);
  const members=f==='GTE'?['GTEPRO','GTEAM']:f==='LMP2'?['LMP2','LMP2PA']:f==='GTD'?['GTDPRO','GTD']:f==='LMP1'?['LMP1H','LMP1L','LMP1']:f==='LMP3'?['LMP3','LMP3PA']:f==='GT3'?['PRO','GOLD','SILVER','BRONZE','PROAM','AM']:[cls];
  return Math.min(...members.map(classSortIndex));
}
function flClassificationRows(){
  const rows=(state.race.flClassification||[]).filter(r=>r.time).slice();
  if(!rows.length) return [];
  rows.sort((a,b)=>parseTime('0:'+a.time)-parseTime('0:'+b.time));
  rows.forEach((r,i)=>{ r.pos=i+1; });
  const byClass={};
  rows.forEach(r=>{ (byClass[r.class]??=[]).push(r); });
  Object.values(byClass).forEach(arr=>{
    arr.sort((a,b)=>parseTime('0:'+a.time)-parseTime('0:'+b.time)).forEach((r,i)=>{ r.classPos=i+1; });
  });
  // Within the same family, order by actual time (so a quicker Am car can sit ahead of a
  // slower Pro car) instead of by narrow classPos, which would keep printing all of one
  // sub-class before the other regardless of pace.
  return rows.sort((a,b)=>flFamilySortIndex(a.class)-flFamilySortIndex(b.class)||parseTime('0:'+a.time)-parseTime('0:'+b.time));
}
function flClassificationRowsHtml(rows){
  const classAvg=classAverageLaptimes(rows);
  const out=[];
  let lastFamily=null;
  rows.forEach(r=>{
    const fam=flFamilyOf(r.class);
    if(fam!==lastFamily){
      lastFamily=fam;
      out.push(`<div class="qualifying-divider">${esc(flFamilyLabel(r.class))} Fastest Laps</div>`);
    }
    const isClassFastest=r.classPos===1;
    const isOverallFastest=r.pos===1;
    const fastestLabel=isOverallFastest?'Fastest Overall':(isClassFastest?`Fastest ${esc(classMeta(r.class).short||r.class)}`:'');
    const rowColor=isOverallFastest?'#f2c230':(isClassFastest?classMeta(r.class).color:'');
    const labelStyle=(!isOverallFastest&&isClassFastest)?` style="color:${rowColor};text-shadow:none"`:'';
    const classFastest=rows.find(x=>x.class===r.class&&x.classPos===1);
    const gap=(!isClassFastest&&classFastest)?fmtDeltaSeconds(parseTime('0:'+r.time)-parseTime('0:'+classFastest.time)):'';
    const avgDiff=(classAvg[r.class]!=null)?parseTime('0:'+r.time)-classAvg[r.class]:null;
    const avgHtml=avgDiff!=null?`<small class="qual-avg-diff ${avgDiff<0?'qual-avg-faster':'qual-avg-slower'}">Avg ${fmtSignedDelta(avgDiff)}</small>`:'';
    const timeCell=`<strong>${esc(r.time)}</strong>${gap?`<strong class="qual-gap">Gap ${esc(gap)}</strong>`:''}${avgHtml}`;
    const name=resolveDriverFullName(r.driver);
    const country=driverCountry(name);
    const driverHtml=`<div class="driver-list"><div class="driver">${country?flag(country):'<span class="no-flag"></span>'}<span>${esc(name)}</span></div></div>`;
    out.push(`<div class="order-row qualifying-row${rowColor?' order-row-winner':''}"${rowColor?` style="--order-winner-color:${rowColor}"`:''}><div class="pos"><strong>${esc(r.pos)}</strong><small>C${esc(r.classPos)}</small></div>${classBadge(r.class)}<div class="car-no">${esc(r.no)}</div>${logo('constructor',r.constructor)}<div><div class="team-name">${esc(r.team)}</div><div class="car-model">${esc(r.model||constructorMeta(r.constructor).name)}</div></div><div class="order-drivers">${driverHtml}</div><div class="gap-cell">${fastestLabel?`<em class="order-winner-label"${labelStyle}>${fastestLabel}</em>`:''}${timeCell}</div></div>`);
  });
  return out.join('');
}
function renderOrder(){
  // Qualifying is only ever a per-class ranking (there's no meaningful combined-classes
  // "overall qualifying position" the way there is for the race), so the toggle just swaps
  // which dataset the existing class filter pills apply to.
  const view=state.orderView||'race';
  const hasQualifying=!!(state.race.qualifying&&state.race.qualifying.length);
  const hasFlClassification=!!(state.race.flClassification&&state.race.flClassification.length);
  if($('orderViewToggle')) $('orderViewToggle').innerHTML=(hasQualifying||hasFlClassification)
    ? `<button class="filter-pill ${view==='race'?'active':''}" onclick="state.orderView='race';renderOrder()">Race</button>`
      +(hasQualifying?`<button class="filter-pill ${view==='qualifying'?'active':''}" onclick="state.orderView='qualifying';renderOrder()">Qualifying</button>`:'')
      +(hasFlClassification?`<button class="filter-pill ${view==='fl'?'active':''}" onclick="state.orderView='fl';renderOrder()">FL Classification</button>`:'')
    : '';
  const classes=raceClassIds();
  if($('classFilters')) $('classFilters').innerHTML=`<button class="filter-pill ${!state.classFilter?'active':''}" onclick="state.classFilter=null;renderOrder()">All</button>`+classes.map(c=>`<button class="filter-pill ${state.classFilter===c?'active':''}" onclick="state.classFilter='${c}';renderOrder()">${esc(classMeta(c).short||c)}</button>`).join('');
  if(hasQualifying && view==='qualifying'){
    const qual=extendedQualifyingRows().filter(r=>!state.classFilter||r.class===state.classFilter).sort((a,b)=>classSortIndex(a.class)-classSortIndex(b.class)||a.pos-b.pos);
    // Purely computed from qual.time, already present on every past and future import - no
    // re-import needed for this to "just work" on existing races.
    const avgHtml=qualifyingAverageLaptimesHtml(classAverageLaptimes(qual));
    const header=`<div class="order-header"><span>Pos</span><span>Class</span><span>#</span><span></span><span>Team / Car</span><span>Drivers</span><span>Time</span></div>`;
    const rows=qual.length?qualifyingRowsHtml(qual):'<div class="empty-state">No qualifying order for this class.</div>';
    if($('orderTable')) $('orderTable').innerHTML=`${avgHtml}${header}<div class="entry-table">${rows}</div>`;
    return;
  }
  if(hasFlClassification && view==='fl'){
    const flRows=flClassificationRows().filter(r=>!state.classFilter||r.class===state.classFilter);
    const avgHtml=qualifyingAverageLaptimesHtml(classAverageLaptimes(flRows));
    const header=`<div class="order-header"><span>Pos</span><span>Class</span><span>#</span><span></span><span>Team / Car</span><span>Driver</span><span>Time</span></div>`;
    const rows=flRows.length?flClassificationRowsHtml(flRows):'<div class="empty-state">No fastest lap classification for this class.</div>';
    if($('orderTable')) $('orderTable').innerHTML=`${avgHtml}${header}<div class="entry-table">${rows}</div>`;
    return;
  }
  const entries=sortOrderEntries(state.race.entries.filter(e=>!state.classFilter||e.class===state.classFilter));
  const posLabel=state.classFilter?'Class Pos':'Pos';
  const gapLabel=state.classFilter?'Class Gap':'Gap';
  const header=`<div class="order-header"><span>${posLabel}</span><span>Class</span><span>#</span><span></span><span>Team / Car</span><span>Drivers</span><span>${gapLabel}</span></div>`;
  const rows=entries.length?orderRowsHtml(entries,null,!!state.classFilter):'<div class="empty-state">No entries added yet.</div>';
  if($('orderTable')) $('orderTable').innerHTML=`${header}<div class="entry-table">${rows}</div>`;
}

function classGroups(){const groups={};state.race.entries.forEach(e=>{(groups[e.class]??=[]).push(e)});Object.values(groups).forEach(arr=>arr.sort((a,b)=>(a.__classPos||99)-(b.__classPos||99)||(a.pos||99)-(b.pos||99)));return groups}
function entryStatus(e){
  const raw=String(e.status||e.gap||e.time||'').toUpperCase();
  if(raw.includes('DNS'))return 'DNS';
  if(raw.includes('DSQ')||raw.includes('DQ')||raw.includes('DISQUAL'))return 'DSQ';
  if(raw.includes('DNF')||raw.includes('RET')||raw.includes('RETIRED'))return 'RET';
  if(raw.includes('NC')||raw.includes('NOT CLASS'))return 'NC';
  if(Number(e.laps)===0 && (e.pos||e.gap||e.time)) return 'NC';
  return 'Classified';
}
function statusBadge(status){
  const cls=status==='Classified'?'ok':status.toLowerCase();
  return `<span class="status-badge ${cls}">${esc(status==='Classified'?'FIN':status)}</span>`;
}
function displayGapOverall(e,leader){
  const status=entryStatus(e);
  if(status!=='Classified'){
    const lapInfo=Number(e.laps)>0?` · ${Number(e.laps)} laps`:'';
    return `${status}${lapInfo}`;
  }
  if(!leader || e===leader || e.no===leader.no) return '—';
  const lapDiff=(Number(leader.laps)||0)-(Number(e.laps)||0);
  if(lapDiff>0) return `+${lapDiff} ${lapDiff===1?'lap':'laps'}`;
  const a=entryFinishSeconds(leader), b=entryFinishSeconds(e);
  if(a!==null && b!==null){const d=b-a;if(d>=0)return `+${d.toFixed(3)}`;}
  const raw=String(e.gap||e.time||'').trim();
  if(/^\d+\s*laps?$/i.test(raw)) return '+'+raw.toLowerCase();
  return raw||'—';
}
function displayGapClass(e,winner){
  const status=entryStatus(e);
  if(status!=='Classified'){
    const lapInfo=Number(e.laps)>0?` · ${Number(e.laps)} laps`:'';
    return `${status}${lapInfo}`;
  }
  return classGap(e,winner);
}
function renderRaceSummary(){
  if(!$('raceSummary'))return;
  const entries=state.race.entries||[];
  if(!entries.length){$('raceSummary').innerHTML='<div class="empty-state">No result data imported yet.</div>';return;}
  const classified=entries.filter(e=>entryStatus(e)==='Classified');
  const nonClass=entries.filter(e=>entryStatus(e)!=='Classified');
  const overall=entries.slice().sort((a,b)=>(a.pos||999)-(b.pos||999))[0];
  const groups=classGroups();
  const podiums=Object.entries(groups).map(([cls,arr])=>{
    const winner=arr[0];
    const top=arr.slice(0,3).map((e,i)=>`<div class="summary-podium-row"><span>${i+1}.</span><strong>#${esc(e.no)} ${esc(e.team)}</strong><em>${i===0?esc(String(e.laps||'—')+' laps'):esc(classGap(e,winner))}</em></div>`).join('');
    return `<div class="summary-class"><div class="summary-class-head">${classBadge(cls)}<span>${esc(classMeta(cls).label||cls)}</span></div>${top}</div>`;
  }).join('');
  const phases=state.race.segments.filter(s=>s.phase!=='GREEN' && (s.end-s.start)>=1);
  const neutralTime=phases.reduce((a,s)=>a+s.end-s.start,0);
  const finishStatus=state.race.segments[state.race.segments.length-1]?.phase||'GREEN';
  $('raceSummary').innerHTML=`
    <div class="summary-grid">
      <div class="summary-tile"><span>Overall winner</span><strong>#${esc(overall?.no||'—')} ${esc(overall?.team||'—')}</strong></div>
      <div class="summary-tile"><span>Finishers</span><strong>${classified.length} / ${entries.length}</strong></div>
      <div class="summary-tile"><span>NC/DNF/DNS</span><strong>${nonClass.length}</strong></div>
      <div class="summary-tile"><span>Neutralized</span><strong>${fmtShort(neutralTime)} · ${(neutralTime/parseTime(state.race.officialDuration)*100).toFixed(1)}%</strong></div>
      <div class="summary-tile"><span>Finish phase</span><strong>${esc(SCC_PHASES[finishStatus]?.label||finishStatus)}</strong></div>
      <div class="summary-tile"><span>Official finish</span><strong>${esc(state.race.officialDuration)} · ${state.race.officialLaps} laps</strong></div>
    </div>
    <div class="summary-podiums">${podiums}</div>`;
}

function renderStats(){const totals={};state.race.segments.forEach(s=>{if(!series().phases.includes(s.phase))return;const d=s.end-s.start,l=s.endLap-s.startLap;if(d<1)return;totals[s.phase]??={count:0,time:0,laps:0};totals[s.phase].count++;totals[s.phase].time+=d;totals[s.phase].laps+=l});const totalTime=parseTime(state.race.officialDuration),totalLaps=state.race.officialLaps;let rows='<div class="stats-row header"><span>Phase</span><span>#</span><span>Time</span><span>Laps</span><span>%</span></div>';Object.keys(totals).forEach(p=>{const t=totals[p],ph=SCC_PHASES[p],pct=(state.mode==='time'?t.time/totalTime:t.laps/totalLaps)*100;rows+=`<div class="stats-row ${state.selectedSegment?.phase===p?'highlight':''}"><span><span class="swatch ${p==='SLOW_ZONE'?'slow-swatch':''}" style="background:${p==='SLOW_ZONE'?'':ph.color}"></span> ${esc(ph.label)}</span><span>${t.count}</span><span>${fmtShort(t.time)}</span><span>${t.laps}</span><span>${pct.toFixed(1)}%</span></div>`});$('statsList').innerHTML=rows}
function renderFacts(){const segs=state.race.segments;const greens=segs.filter(s=>s.phase==='GREEN');const neutral=segs.filter(s=>s.phase!=='GREEN');const longestGreen=greens.reduce((a,s)=>Math.max(a,s.end-s.start),0);const longestNeutral=neutral.reduce((a,s)=>Math.max(a,s.end-s.start),0);const totalNeutral=neutral.reduce((a,s)=>a+s.end-s.start,0);const extra=parseTime(state.race.officialDuration)-parseTime(state.race.scheduledDuration);const finishPhase=segs[segs.length-1]?.phase||'GREEN';$('quickFacts').innerHTML=[['Longest green',fmtShort(longestGreen)],['Longest neutralization',fmtShort(longestNeutral)],['Total neutralization',`${fmtShort(totalNeutral)} (${(totalNeutral/parseTime(state.race.officialDuration)*100).toFixed(1)}%)`],['Finish phase',SCC_PHASES[finishPhase]?.label||finishPhase],['Extra race time',fmtShort(extra)]].map(([a,b])=>`<div class="fact-row"><span>${a}</span><strong>${b}</strong></div>`).join('')}
function renderSegmentDetails(){const s=state.selectedSegment;if(!s){$('segmentDetails').innerHTML='<div class="empty-state">Click a timeline segment.</div>';return}$('segmentDetails').innerHTML=`<div class="segment-detail-grid compact"><span>Phase</span><strong>${SCC_PHASES[s.phase].label}</strong><span>Start</span><strong>${fmtTime(s.start)} · lap ${s.startLap}</strong><span>End</span><strong>${fmtTime(s.end)} · lap ${s.endLap}</strong><span>Duration</span><strong>${fmtShort(s.end-s.start)} · ${s.endLap-s.startLap} laps</strong><span>Reason</span><strong>${esc(s.reason||'—')}</strong><span>Notes</span><strong>${esc(s.notes||'—')}</strong></div>`}
function renderSegments(){$('segmentTable').innerHTML=state.race.segments.map(s=>`<div class="segment-line"><strong>${SCC_PHASES[s.phase].label}</strong><span>${fmtTime(s.start)}</span><span>${fmtTime(s.end)}</span><span>${esc(s.reason||'')}<div class="muted">${esc(s.notes||'')}</div></span><div class="actions"><button onclick="editSegment('${s.id}')">Edit</button><button onclick="deleteSegment('${s.id}')">Delete</button></div></div>`).join('')}
function ensureBrowserFilters(){
  if(!$('browserSeason')||!$('browserSeries'))return;
  const seasons=[...new Set(RACES.map(r=>r.season))].sort((a,b)=>b-a);
  if(!$('browserSeason').options.length){
    $('browserSeason').innerHTML=seasons.map(y=>`<option value="${y}">${y}</option>`).join('');
    $('browserSeason').onchange=()=>{populateBrowserSeries();renderRaceBrowser(false)};
    $('browserSeries').onchange=()=>renderRaceBrowser(false);
  }
  if(!$('browserSeason').value) $('browserSeason').value=state.race?.season||seasons[0];
  populateBrowserSeries();
}
function populateBrowserSeries(){
  if(!$('browserSeason')||!$('browserSeries'))return;
  const season=+$('browserSeason').value;
  const current=$('browserSeries').value || state.race?.series || 'all';
  const ids=[...new Set(RACES.filter(r=>r.season===season).map(r=>r.series))];
  $('browserSeries').innerHTML='<option value="all">All series</option>'+ids.map(id=>`<option value="${id}">${SERIES[id].short}</option>`).join('');
  $('browserSeries').value=ids.includes(current)?current:'all';
}
function renderRaceBrowser(sync=true){
  if(!$('raceBrowser'))return;
  ensureBrowserFilters();
  if(sync && $('browserSeason')){
    $('browserSeason').value=state.race?.season || $('browserSeason').value;
    populateBrowserSeries();
    $('browserSeries').value=state.race?.series || 'all';
  }
  const season=$('browserSeason') ? +$('browserSeason').value : state.race?.season;
  const sid=$('browserSeries') ? $('browserSeries').value : 'all';
  const races=RACES.filter(r=>r.season===season && (sid==='all'||r.series===sid))
    .sort((a,b)=>String(SERIES[a.series].short).localeCompare(SERIES[b.series].short)||(a.round||999)-(b.round||999)||String(a.event).localeCompare(String(b.event)));
  if(!races.length){$('raceBrowser').innerHTML='<div class="empty-state">No races for this filter.</div>';return;}
  let last='';
  $('raceBrowser').innerHTML=races.map(r=>{
    const group=`${r.season} · ${SERIES[r.series].short}`;
    const head=group!==last ? (last=group, `<div class="browser-group-title">${esc(group)}</div>`) : '';
    return `${head}<button class="browser-race row ${r.id===state.race?.id?'active':''}" onclick="loadRace('${r.id}');switchTab('dashboard')"><strong>R${r.round||''}</strong><span>${esc(r.event)}</span><small>${flag(r.country)} ${esc(r.circuit)} · ${esc(r.date)}</small></button>`;
  }).join('');
}
function saveSegment(ev){ev.preventDefault();const id=$('editingId').value||('seg'+Date.now());const seg={id,phase:$('phaseInput').value,start:parseTime($('startInput').value),end:parseTime($('endInput').value),startLap:+$('startLapInput').value,endLap:+$('endLapInput').value,reason:$('reasonInput').value,notes:$('notesInput').value};if(seg.end<=seg.start)return alert('End must be after start.');state.race.segments=state.race.segments.filter(s=>s.id!==id);insertSegment(seg);resetForm();render()}
function insertSegment(newSeg){let out=[];for(const s of state.race.segments){if(s.end<=newSeg.start||s.start>=newSeg.end){out.push(s);continue}if(s.start<newSeg.start)out.push({...s,end:newSeg.start,endLap:newSeg.startLap,id:s.id+'a'});if(s.end>newSeg.end)out.push({...s,start:newSeg.end,startLap:newSeg.endLap,id:s.id+'b'});}out.push(newSeg);state.race.segments=mergeGreens(out.sort((a,b)=>a.start-b.start))}
function mergeGreens(segs){const res=[];for(const s of segs){const last=res[res.length-1];if(last&&last.phase===s.phase&&last.end===s.start&&last.endLap===s.startLap&&last.phase==='GREEN'){last.end=s.end;last.endLap=s.endLap;last.notes=[last.notes,s.notes].filter(Boolean).join(' / ')}else res.push(s)}return res}
function editSegment(id){const s=state.race.segments.find(x=>x.id===id);$('editingId').value=s.id;$('phaseInput').value=s.phase;$('startInput').value=fmtTime(s.start);$('endInput').value=fmtTime(s.end);$('startLapInput').value=s.startLap;$('endLapInput').value=s.endLap;$('reasonInput').value=s.reason||'';$('notesInput').value=s.notes||'';$('saveSegmentBtn').textContent='Save changes';switchTab('raceControl')}
function deleteSegment(id){const s=state.race.segments.find(x=>x.id===id);state.race.segments=state.race.segments.filter(x=>x.id!==id);state.race.segments.push({id:'green'+Date.now(),phase:'GREEN',start:s.start,end:s.end,startLap:s.startLap,endLap:s.endLap,reason:'Green replacement',notes:'Created after deleted segment.'});state.race.segments=mergeGreens(state.race.segments.sort((a,b)=>a.start-b.start));state.selectedSegment=null;render()}
function resetForm(){$('segmentForm').reset();$('editingId').value='';$('saveSegmentBtn').textContent='Add segment'}

function renderImportWizard(){
  if(!$('importSeries'))return;
  if(!$('importSeries').options.length){$('importSeries').innerHTML=Object.entries(SERIES).map(([id,s])=>`<option value="${id}">${esc(s.short)} · ${esc(s.name)}</option>`).join('')}
  const r=state.race;
  const values={importSeries:r.series,importSeason:r.season,importRound:r.round,importId:r.id,importEvent:r.event,importCircuit:r.circuit,importCountry:r.country,importDate:r.date,importScheduled:r.scheduledDuration,importOfficial:r.officialDuration,importLaps:r.officialLaps};
  for(const [id,val] of Object.entries(values)){const el=$(id);if(el && !el.matches(':focus') && !el.dataset.dirty){el.value=val??''}}
  renderImportChecklist();
  renderImportValidation();
}
function renderImportChecklist(){if(!$('importChecklist'))return;const entries=state.race.entries||[];const res=entries.filter(e=>e.pos);const segs=state.race.segments||[];const classes=[...new Set(entries.map(e=>e.class))];const perf=state.race.performance||{};const staged=(state.importSources||[]).filter(Boolean);$('importChecklist').innerHTML=[
  ['Metadata', state.race.event&&state.race.circuit?'ok':'missing', `${state.race.event||'—'} · ${state.race.circuit||'—'}`],
  ['Results', res.length?'ok':'missing', `${res.length} classified/result rows`],
  ['Performance', (perf.fastestLaps?.length||perf.poles?.length)?'ok':'draft', `${perf.fastestLaps?.length||0} FL · ${perf.poles?.length||0} PP`],
  ['Race Control', segs.length>1?'ok':'draft', segs.length>1?`${segs.length} segments`:'single green shell'],
  ['Staged source files', staged.length?'draft':'missing', staged.length?staged.map(s=>s.name).slice(-3).join(', '):'none'],
].map(([a,status,b])=>`<div class="check-row ${status}"><span>${status==='ok'?'✓':status==='draft'?'◌':'×'}</span><strong>${a}</strong><em>${b}</em></div>`).join('')}

function raceValidationWarnings(r=state.race){
  const warnings=[];
  const entries=r.entries||[];
  const nums=new Map();
  entries.forEach(e=>{const key=String(e.no||'').trim(); if(!key)return; if(nums.has(key))warnings.push({level:'err',title:'Duplicate car number',text:`#${key} appears more than once (${nums.get(key)} / ${e.team||'unknown team'}).`}); else nums.set(key,e.team||'unknown team')});
  const driverCars=new Map();
  entries.forEach(e=>(e.drivers||[]).forEach(d=>{const name=String(d[0]||'').trim(); if(!name)return; const key=normalizeDriverName(name); const car=`#${e.no} ${e.team}`; if(driverCars.has(key)&&driverCars.get(key)!==car)warnings.push({level:'err',title:'Driver assigned to multiple cars',text:`${name}: ${driverCars.get(key)} and ${car}.`}); else driverCars.set(key,car)}));
  entries.forEach(e=>{if(!constructorMeta(e.constructor)?.id)warnings.push({level:'warn',title:'Unknown constructor',text:`#${e.no} ${e.team}: ${e.constructor||'empty constructor'}.`});});
  const missingFlags=[];
  entries.forEach(e=>(e.drivers||[]).forEach(d=>{const c=normalizedDriverCountry(d[0],d[1]); if(!c || !SCC_FLAG_SVGS[(FLAG_ALIASES[c]||FLAG_ALIASES[String(c).toUpperCase()]||String(c).toLowerCase()).replace(/[^a-z]/g,'')]) missingFlags.push(d[0]||'unknown')}));
  if(missingFlags.length)warnings.push({level:'warn',title:'Missing driver flags',text:[...new Set(missingFlags)].slice(0,8).join(', ')+(missingFlags.length>8?'…':'')});
  const classes=[...new Set(entries.map(e=>e.class).filter(Boolean))];
  const perf=r.performance||{};
  const flClasses=new Set((perf.fastestLaps||[]).map(p=>p.class));
  const ppClasses=new Set((perf.poles||[]).map(p=>p.class));
  const missingFL=classes.filter(c=>!flClasses.has(c));
  const missingPP=classes.filter(c=>!ppClasses.has(c));
  if(entries.length && missingFL.length)warnings.push({level:'warn',title:'Fastest laps incomplete',text:`Missing class FL: ${missingFL.join(', ')}.`});
  if(entries.length && missingPP.length)warnings.push({level:'warn',title:'Pole positions incomplete',text:`Missing class PP: ${missingPP.join(', ')}.`});
  if(!(r.segments||[]).length || ((r.segments||[]).length===1 && (r.segments[0].phase==='GREEN'))) warnings.push({level:'warn',title:'Race Control not complete',text:'Only a single green shell is present.'});
  return warnings;
}
function renderImportValidation(){
  if(!$('importValidation'))return;
  const warnings=raceValidationWarnings(state.race);
  if(!warnings.length){$('importValidation').innerHTML='<div class="validation-row ok"><div>✓</div><div><strong>No warnings</strong><span>Current race data passes basic SCC validation.</span></div></div>';return;}
  $('importValidation').innerHTML=warnings.map(w=>`<div class="validation-row ${w.level}"><div>${w.level==='err'?'!':'⚠'}</div><div><strong>${esc(w.title)}</strong><span>${esc(w.text)}</span></div></div>`).join('');
}

function applyImportMetadata(){
  const oldId=state.race.id;
  const id=$('importId').value.trim()||oldId||('race-'+Date.now());
  Object.assign(state.race,{id,series:$('importSeries').value,season:+$('importSeason').value||state.race.season,round:+$('importRound').value||state.race.round,event:$('importEvent').value.trim()||state.race.event,circuit:$('importCircuit').value.trim()||state.race.circuit,country:$('importCountry').value.trim()||state.race.country,date:$('importDate').value||state.race.date,scheduledDuration:$('importScheduled').value.trim()||state.race.scheduledDuration,officialDuration:$('importOfficial').value.trim()||state.race.officialDuration,scheduledLaps:+$('importLaps').value||state.race.scheduledLaps,officialLaps:+$('importLaps').value||state.race.officialLaps});
  const idx=RACES.findIndex(r=>r.id===oldId||r.id===id); if(idx>=0)RACES[idx]=state.race; else RACES.push(state.race);
  render();
  alert('Metadata applied to current race.');
}

function detectDelimiter(line){
  const counts={',':(line.match(/,/g)||[]).length,';':(line.match(/;/g)||[]).length,'\t':(line.match(/\t/g)||[]).length};
  return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0] || ',';
}
function splitCsvLine(line,delim){const out=[];let cur='',q=false;for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(q&&line[i+1]==='"'){cur+='"';i++}else q=!q}else if(ch===delim&&!q){out.push(cur.trim());cur=''}else cur+=ch}out.push(cur.trim());return out}
function cleanHeader(h){return String(h||'').trim().toLowerCase().replace(/[\uFEFF]/g,'').replace(/[^a-z0-9]+/g,'')}
function parseCsv(text){
  const raw=String(text||'').replace(/\r/g,'').split('\n').filter(l=>l.trim().length);
  if(!raw.length)return[];
  const headerLine=raw[0];
  const delim=detectDelimiter(headerLine);
  let headers=splitCsvLine(headerLine,delim).map(cleanHeader);
  // If a copied table was separated by large spaces rather than delimiters, fall back to 2+ spaces.
  if(headers.length<3 && /\s{2,}/.test(headerLine)) headers=headerLine.trim().split(/\s{2,}/).map(cleanHeader);
  return raw.slice(1).map(line=>{
    let vals=splitCsvLine(line,delim);
    if(vals.length<headers.length && /\s{2,}/.test(line)) vals=line.trim().split(/\s{2,}/);
    const obj={};headers.forEach((h,i)=>obj[h]=vals[i]??'');return obj;
  }).filter(o=>Object.values(o).some(v=>String(v).trim()));
}
function detectImportFormat(rows){
  if(!rows.length)return 'Empty';
  const keys=Object.keys(rows[0]).join('|');
  if(/position|gapfirst|total/i.test(keys) && /number|num|no/i.test(keys) && /team/i.test(keys) && /driver1/i.test(keys)) return 'Al Kamel / Timing Classification';
  if(/overallpos|classpos|pos/.test(keys) && /number|no/.test(keys)) return 'SCC CSV';
  return 'Generic CSV';
}
function val(row, names){for(const n of names){const k=cleanHeader(n); if(row[k]!==undefined && String(row[k]).trim()!=='') return row[k]} return ''}
function normClass(v){const x=String(v||'').toUpperCase().replace(/[\s_/-]/g,'');if(x==='LMP2PA'||x==='LMP2PAM'||x==='LMP2PROAM'||x==='LMP2PROAMATEUR'||x==='PA')return'LMP2PA';if(x==='LMP3PA'||x==='LMP3PAM'||x==='LMP3PROAM'||x==='LMP3PROAMATEUR')return'LMP3PA';if(x==='HYP'||x==='HYPERCAR')return'HYP';if(x==='LMP1H')return'LMP1H';if(x==='LMP1L')return'LMP1L';if(x==='LMP1')return'LMP1';if(x==='LMP2')return'LMP2';if(x==='LMP3')return'LMP3';if(x==='LMGT3')return'LMGT3';if(x==='GT3')return'GT3';if(x==='GTDPRO')return'GTDPRO';if(x==='PROAM')return'PROAM';if(x==='GTEAM'||x==='LMGTEAM')return'GTEAM';if(x==='GTEPRO'||x==='LMGTEPRO')return'GTEPRO';return String(v||'').trim()}
function normConstructor(v){return String(v||'').trim().toLowerCase().replace(/[^a-z0-9]/g,'').replace('mercedesamg','mercedes').replace('astonmartinracing','astonmartin')}
function constructorFromVehicle(v){
  const x=String(v||'').toLowerCase();
  const known=['oreca','ligier','duqueine','adess','ginetta','ferrari','porsche','bmw','mercedes','mclaren','astonmartin','aston martin','lamborghini','ford','corvette','lexus','audi','toyota','cadillac','alpine','peugeot','genesis','acura','hyundai','alfa romeo','alfa-romeo','chevrolet','isotta','maserati','dallara','nissan','bentley','jaguar'];
  const hit=known.find(k=>x.includes(k));
  return hit?normConstructor(hit):'';
}
function countryGuessFromFlagCode(s){return s}
function normalizeDriverName(name){return String(name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,' ').trim().toLowerCase()}
const DRIVER_COUNTRY_DB={};
Object.assign(DRIVER_COUNTRY_DB, {
  'adam smalley':'United Kingdom','ahmad al harthy':'Oman','aleksei nesov':'Russia','alessio rovera':'Italy','alex fontana':'Switzerland','alfredo hernandez ortega':'Mexico',
  'antoine doquin':'France','arjun maini':'India','augusto farfus':'Brazil','aurelien panis':'France','baptiste moulin':'Belgium','bastian buus':'Denmark',
  'carrie schreiner':'Germany','chandler hull':'United States','christian hahn':'Brazil','christopher haase':'Germany','daniel harper':'United Kingdom','daniel juncadella':'Spain',
  'dries vanthoor':'Belgium','dustin blattner':'Germany','dylan pereira':'Luxembourg','ezequiel perez companc':'Argentina','finn wiebelhaus':'Germany','franck perera':'France',
  'frederik schandorff':'Denmark','gabriel rindone':'Italy','gaspard simon':'France','gerhard tweraser':'Austria','gilles magnus':'Belgium','horatio fitz-simon':'South Africa',
  'ignacio montenegro':'Argentina','james kell':'United Kingdom','jonathan adam':'United Kingdom','joseph loake':'United Kingdom','kelvin van der linde':'South Africa','lilou wadoux':'France',
  'luca engstler':'Germany','lucas auer':'Austria','marcelo tomasoni':'Brazil','marvin dienst':'Germany','matias zagazeta':'Peru','mattia drudi':'Italy',
  'maxime martin':'Belgium','michael porter':'United States','morris schuring':'Netherlands','oliver söderström':'Sweden','rafael duran':'Mexico','ralf bohn':'Germany',
  'reece barr':'Ireland','riccardo pera':'Italy','roberto merhi':'Spain','rocco mazzola':'Italy','scott noble':'United Kingdom','stefano costantini':'Italy',
  'tanart sathienthirakul':'Thailand','thomas fleming':'United Kingdom','tomas pintos':'Spain','ugo de wilde':'Belgium',
  'kelvin van der linde':'South Africa','bernardo sousa':'Portugal','celia martin':'France','valentin hasse clot':'France','andrew gilbert':'United Kingdom','benjamin barker':'United Kingdom',
  'ben barker':'United Kingdom','darren leung':'United Kingdom','thomas flohr':'Switzerland','james cottingham':'United Kingdom','sheldon van der linde':'South Africa',
  'david heinemeier hansson':'Denmark','edward cheever':'United States','cem bolukbasi':'Turkey',
  'robert shwartzman':'Israel','oliver rasmussen':'Denmark','mirko bortolotti':'Italy','edoardo mortara':'Italy',
  'nicolas lapierre':'France','antonio serravalle':'Canada','wattana bennett':'Thailand','carl wattana bennett':'Thailand',
  'jean karl vernay':'France','daniel mancinelli':'Italy','joshua caygill':'United Kingdom','hiroshi koizumi':'Japan',
  'erwan bastard':'France','nicolas costa':'Brazil','stephen grove':'Australia','brenton grove':'Australia',
  'valentin hasse':'France','david heinemeier':'Denmark','antonio felix':'Portugal',
  'adam christodoulou':'United Kingdom','dennis andersen':'Denmark','richard westbrook':'United Kingdom',
  'david beckmann':'Germany','fabio scherer':'Switzerland','albert costa':'Spain','julien canal':'France',
  'scott huffaker':'United States','ulysse de pauw':'Belgium','gabriel aubry':'France','michael dinan':'United Kingdom',
  'satoshi hoshino':'Japan','tomonobu fujii':'Japan','paul dalla lana':'Canada','axcil jefferies':'Zimbabwe',
  'gunnar jeannette':'United States','esteban guerrieri':'Argentina','jacques villeneuve':'Canada',
  'gustavo menezes':'United States','andre negrao':'Brazil','memo rojas':'Mexico','olli caldwell':'United Kingdom',
  'joshua pierson':'United States','ryan briscoe':'Australia','olivier pla':'France','luis perez companc':'Argentina',
  'razvan petru umbrarescu':'Romania','pj hyett':'United States','jens reno moller':'Denmark',
  'abdulla ali al khelaifi':'Qatar','sergio sette camara':'Brazil','manuel espirito santo':'Portugal',
  'ewan thomas':'United Kingdom','christian dannemand jorgensen':'Denmark','kristian brookes':'United Kingdom',
  'nico hantke':'Germany','maksymilian angelard':'Poland','rey acosta iii':'United States',
  'gonzalo de andres martin':'Spain','lorenzo ferdinando innocenti':'Italy','oscar lee ryndziewicz':'United Kingdom',
  'josep mayola comadira':'Spain','shawn rashid':'United States','georges nakas':'Australia',
  'alex brundle':'United Kingdom','andrea piccini':'Italy','andrew haryanto':'Indonesia','andrew watson':'United Kingdom',
  'anthony davidson':'United Kingdom','beitske visser':'Netherlands','darren burke':'United Kingdom','esteban garcia':'Spain',
  'antonio felix da costa':'Portugal','franco colapinto':'Argentina','frits van eerd':'Netherlands','giancarlo fisichella':'Italy',
  'gianmaria bruni':'Italy','giedo van der garde':'Netherlands','giorgio sernagiotto':'Italy','jan magnussen':'Denmark',
  'jaxon evans':'New Zealand','juan pablo montoya':'Colombia','katherine legge':'United Kingdom','kazuki nakajima':'Japan',
  'manuela gostner':'Italy','marco seefried':'Germany','marcos gomes':'Brazil','miroslav konopka':'Slovakia',
  'oliver gavin':'United Kingdom','patrick kelly':'United States','roberto gonzalez':'Mexico','roberto lacorte':'Italy',
  'roman rusinov':'Russia','simon trummer':'Switzerland','sophia floersch':'Germany','thomas jackson':'United Kingdom',
  'tatiana calderon':'Colombia'
});
// WEC Spa 2018 (2018-19) + Silverstone 2019 (2019-20) - researched and reviewed before applying.
Object.assign(DRIVER_COUNTRY_DB, {
  'fernando alonso':'Spain','thomas laurent':'France','oliver webb':'United Kingdom','dominik kraihamer':'Austria',
  'mikhail aleshin':'Russia','vitaly petrov':'Russia','andrea pizzitola':'France','ho pin tung':'China',
  'stephane richelmi':'Monaco','pierre thiriet':'France','jazeman jaafar':'Malaysia','weiron tan':'Malaysia',
  'nabil jeffri':'Malaysia','pastor maldonado':'Venezuela','nathanael berthon':'France','erwin creed':'France',
  'romano ricci':'France','stefan mucke':'Germany','billy johnson':'United States','sam bird':'United Kingdom',
  'darren turner':'United Kingdom','martin tomczyk':'Germany','pedro lamy':'Portugal','mathias lauda':'Austria',
  'euan alers hankey':'United Kingdom','sun mok':'Singapore','keita sawa':'Japan','motoaki ishikawa':'Japan',
  'olivier beretta':'Monaco','khaled al qubaisi':'United Arab Emirates','jan lammers':'Netherlands','alex davison':'Australia',
  'jorg bergmeister':'Germany','patrick lindsey':'United States','egidio perfetti':'Norway','stephane sarrazin':'France',
  'egor orudzhev':'Russia','matevos isaakyan':'Russia','bruno senna':'Brazil','charlie robertson':'United Kingdom',
  'antonin borga':'Switzerland','pierre ragues':'France','andrea belicchi':'Italy','mark patterson':'United States',
  'kenta yamashita':'Japan','kei cozzolino':'Japan','david kolkmann':'Germany','bonamy grimes':'United Kingdom',
  'johnny mowlem':'United Kingdom','charles hollings':'United Kingdom','jeroen bleekemolen':'Netherlands','michael simpson':'United Kingdom',
  'guy smith':'United Kingdom','luca giraudi':'Italy','ricardo sanchez':'Mexico','andy priaulx':'United Kingdom','tony kanaan':'Brazil'
});
function learnDriverCountries(entries){(entries||[]).forEach(e=>(e.drivers||[]).forEach(d=>{if(d&&d[0]&&d[1])DRIVER_COUNTRY_DB[normalizeDriverName(d[0])]=d[1]}))}
// Some drivers race under more than one spelling of their own name across different PDFs
// ("Ben Barker" vs "Benjamin Barker") - without a fixed canonical form, every place that
// groups by name (the driver database, country/DOB lookup) treats them as two different
// people. This always wins over whatever a results PDF says, by design.
// 'david heinemeier':'David Heinemeier Hansson' works around a real Le Mans 2025 Race
// Classification PDF layout quirk: his two-word surname "HEINEMEIER HANSSON" is spaced far
// enough apart on the page that column-detection splits it into two cells, truncating the
// parsed name to "D. Heinemeier" with "Hansson" swallowed into the next column.
// 'maria lopez':'Jose Maria Lopez' - his real name has two given names ("Jose Maria"), but the
// full-name regex only expects one Title-Case word before an ALL-CAPS surname, so it skips
// "Jose" (not immediately followed by all-caps "MARIA") and matches "Maria LOPEZ" instead,
// starting the name one word too late.
const DRIVER_NAME_ALIASES={'ben barker':'Benjamin Barker','tom fleming':'Thomas Fleming','david heinemeier':'David Heinemeier Hansson','wattana bennett':'Carl Wattana Bennett','maria lopez':'Jose Maria Lopez','razvan umbrarescu':'Răzvan Petru Umbrărescu','petru umbrarescu':'Răzvan Petru Umbrărescu','dan harper':'Daniel Harper','jonny adam':'Jonathan Adam','lorenzo fluxa cross':'Lorenzo Fluxá','aliaksandr malykhin':'Alex Malykhin','akhil kumar':'Ajith Kumar','marco sorensen':'Marco Sørensen','nicolas pino':'Nico Pino','matthew campbell':'Matt Campbell','benjamin hanley':'Ben Hanley','horst felix felbermayr':'Horst Felbermayr','matthew bell':'Matt Bell','matthew richard bell':'Matt Bell','olli gray':'Oliver Gray','mikkel pedersen':'Mikkel Gaarde Pedersen','horst felbermayr jr.':'Horst Felbermayr','eddie cheever':'Eddie Cheever III','thomas sargent':'Tom Sargent','v. hasse clot':'Valentin Hasse-Clot','v hasse clot':'Valentin Hasse-Clot','alex jacoby':'Alexander Jacoby','gaarde pedersen':'Mikkel Gaarde Pedersen','c. eastwood':'Charlie Eastwood','charles eastwood':'Charlie Eastwood','edward cheever':'Eddie Cheever III','n. varrone':'Nicolás Varrone','j. lopez':'Jose Maria Lopez','m. espirito santo':'Manuel Espírito Santo','p. hanson':'Phil Hanson','a. quinn':'Alex Quinn','alexander quinn':'Alex Quinn','christopher froggatt':'Chris Froggatt','oscar ryndziewicz':'Oscar Lee Ryndziewicz','matthew kurzejewski':'Matt Kurzejewski','christian dannemand jorgensen':'Christian Dannemand Jørgensen','a priaulx':'Andy Priaulx','t kanaan':'Tony Kanaan'};
const DRIVER_NAME_ALIASES_BY_INITIAL={};
Object.values(DRIVER_NAME_ALIASES).forEach(canon=>{
  const cp=canon.split(/\s+/);
  DRIVER_NAME_ALIASES_BY_INITIAL[cp[0][0].toUpperCase()+'|'+cp.slice(1).join(' ').toLowerCase()]=canon;
});
// Registry of "initial + surname" -> the full name(s) seen for it anywhere in the archive, so
// an initials-only name from one race (Race Classification only ever prints "D. Vanthoor") can
// be upgraded using a full name already known from a DIFFERENT race, the same way
// lookupDriverCountry already falls back across documents. Only resolves when exactly one full
// name is known for that initial+surname - two different people who happen to share both never
// get silently merged.
const DRIVER_FULLNAME_SETS={};
// A hyphenated surname ("Hasse-Clot") and its space-separated equivalent ("Hasse Clot", used
// inconsistently in a few older race rows) must land on the same key, or the fallback below
// never finds them.
function fullNameKey(first,rest){return first[0].toUpperCase()+'|'+rest.join(' ').toLowerCase().replace(/-/g,' ');}
function learnDriverFullNames(entries){
  (entries||[]).forEach(e=>(e.drivers||[]).forEach(d=>{
    if(!d||!d[0]) return;
    const parts=String(d[0]).trim().split(/\s+/);
    if(parts.length<2) return;
    const first=parts[0];
    if(/^[A-ZÀ-Ý]\.?$/.test(first)) return; // itself just initials, nothing to learn from
    const canon=DRIVER_NAME_ALIASES[normalizeDriverName(d[0])]||d[0];
    (DRIVER_FULLNAME_SETS[fullNameKey(first,parts.slice(1))]??=new Set()).add(canon);
  }));
}
function resolveDriverFullName(name){
  if(!name) return name;
  const norm=normalizeDriverName(name);
  if(DRIVER_NAME_ALIASES[norm]) return DRIVER_NAME_ALIASES[norm];
  const parts=String(name).trim().split(/\s+/);
  if(parts.length<2) return name;
  const first=parts[0];
  if(!/^[A-ZÀ-Ý]\.?$/.test(first)) return name; // already looks like a full first name
  const key=fullNameKey(first,parts.slice(1));
  if(DRIVER_NAME_ALIASES_BY_INITIAL[key]) return DRIVER_NAME_ALIASES_BY_INITIAL[key];
  const known=DRIVER_FULLNAME_SETS[key];
  return (known && known.size===1) ? [...known][0] : name;
}
function lookupDriverCountry(name){
  const key=normalizeDriverName(name);
  if(DRIVER_COUNTRY_DB[key]) return DRIVER_COUNTRY_DB[key];
  // Race Classification only prints initials ("A. Al Harthy"), but the DB is keyed by full
  // first names ("ahmad al harthy") learned from documents that spell them out in full - an
  // exact key match fails even though this exact person is already known. Fall back to
  // matching by surname + first-initial, but only when unambiguous (exactly one DB entry
  // shares that surname and initial) - e.g. "M Schumacher" must not guess between Michael
  // and Mick.
  const parts=key.split(' ');
  if(parts.length<2 || parts[0].length!==1) return '';
  const surname=parts.slice(1).join(' ');
  const matches=Object.keys(DRIVER_COUNTRY_DB).filter(k=>{
    const kp=k.split(' ');
    return kp.length>1 && kp.slice(1).join(' ')===surname && kp[0][0]===parts[0];
  });
  return matches.length===1 ? DRIVER_COUNTRY_DB[matches[0]] : '';
}
function setDriverCountry(name,country){if(name&&country){DRIVER_COUNTRY_DB[normalizeDriverName(name)]=country;try{localStorage.setItem('sccDriverCountries',JSON.stringify(DRIVER_COUNTRY_DB))}catch{}}}
try{Object.assign(DRIVER_COUNTRY_DB,JSON.parse(localStorage.getItem('sccDriverCountries')||'{}'))}catch{}
Object.assign(FLAG_ALIASES,{Portugal:'pt',Estonia:'ee',Monaco:'mc',Indonesia:'id',Malaysia:'my',Singapore:'sg',Philippines:'ph',Guatemala:'gt',Israel:'il',Andorra:'ad',Liechtenstein:'li',Uruguay:'uy',Malta:'mt',Slovakia:'sk',Slovenia:'si',Romania:'ro',Serbia:'rs',Croatia:'hr',Greece:'gr','Saudi Arabia':'sa',Qatar:'qa',UAE:'ae','United Arab Emirates':'ae',Korea:'kr','South Korea':'kr',Taiwan:'tw',Thailand:'th',Luxembourg:'lu',Russia:'ru',Belarus:'by',Czechia:'cz','Czech Republic':'cz',Hungary:'hu','Puerto Rico':'pr',Venezuela:'ve',Colombia:'co',Ecuador:'ec',Peru:'pe',Chile:'cl',Argentina:'ar'});
[
 ['Tommaso Mosca','Italy'],['Tomasso Mosca','Italy'],['Aaron Muss','United Kingdom'],['Alberto Di Folco','Italy'],['Alessandro Ghiretti','Italy'],['Alex Aka','Belgium'],['Alex Fontana','Switzerland'],['Aleksei Nesov','Russia'],['Alfredo Hernandez Ortega','Mexico'],['Aliaksandr Malykhin','Belarus'],['Antares Au','Hong Kong'],['Arjun Maini','India'],['Aurelien Panis','France'],['Baptiste Moulin','France'],['Benjamin Paque','Belgium'],['Carrie Schreiner','Germany'],['Cesar Gazeau','France'],['Chandler Hull','United States'],['Christian Hahn','Brazil'],['Colin Caresani','Netherlands'],['Dante Rappange','Netherlands'],['Dylan Medler','United States'],['Dylan Pereira','Luxembourg'],['Eduardo Coseteng','Philippines'],['Ethan Ischer','Switzerland'],['Etienne Cheli','France'],['Ezequiel Perez Companc','Argentina'],['Finn Wiebelhaus','Germany'],['Francesco Simonazzi','Italy'],['Freddie Tomlinson','United Kingdom'],['Gabriele Piana','Italy'],['Gabriel Rindone','Australia'],['Gaspard Simon','France'],['Gerhard Tweraser','Austria'],['Giacomo Petrobelli','Italy'],['Gilles Magnus','Belgium'],['Gilles Stadsbader','Belgium'],['Guilherme Oliveira','Portugal'],['Horatio Fitz-Simon','United Kingdom'],['Huub van Eijndhoven','Netherlands'],['Ignacio Montenegro','Argentina'],['Ivan Klymenko','Ukraine'],['James Kellett','United Kingdom'],['James Kell','United Kingdom'],['Jonathan Adam','United Kingdom'],['Jonny Adam','United Kingdom'],['Joseph Loake','United Kingdom'],['Kyle Marcelli','Canada'],['Loek Hartog','Netherlands'],['Lorens Lecertua','Belgium'],['Lorenzo Fluxa Cross','Spain'],['Lorenzo Patrese','Italy'],['Malte Ebdrup','Denmark'],['Marcelo Tomasoni','Brazil'],['Marco Sorensen','Denmark'],['Mari Boya','Spain'],['Mateo Villagomez','Ecuador'],['Matias Zagazeta','Peru'],['Max Hofer','Austria'],['Maxime Oosten','Netherlands'],['Maxwell Lynn','United Kingdom'],['Michael Porter','United States'],['Miguel Ramos','Portugal'],['Rafael Duran','United States'],['Reece Barr','United Kingdom'],['Rinat Salikhov','Russia'],['Robert De Haan','Netherlands'],['Roberto Merhi','Spain'],['Rocco Mazzola','Switzerland'],['Rolf Ineichen','Switzerland'],['Simon Birch','Denmark'],['Stefano Costantini','Italy'],['Tanart Sathienthirakul','Thailand'],['Thomas Drouet','France'],['Thomas Fleming','United Kingdom'],['Tomas Pintos','Spain'],['Tom Wood','United Kingdom'],['Ugo De Wilde','Belgium'],['Valentino Rossi','Italy']
].forEach(([n,c])=>setDriverCountry(n,c));

[
 ['Robin Frijns','Netherlands'],['René Rast','Germany'],['Rene Rast','Germany'],['Sheldon Van Der Linde','South Africa'],['Sheldon van der Linde','South Africa'],['Kevin Magnussen','Denmark'],['Raffaele Marciello','Switzerland'],['Antonio Fuoco','Italy'],['Miguel Molina','Spain'],['Nicklas Nielsen','Denmark'],['Harry Tincknell','United Kingdom'],['Tom Gamble','United Kingdom'],['Mike Conway','United Kingdom'],['Kamui Kobayashi','Japan'],['Nyck De Vries','Netherlands'],['Nyck de Vries','Netherlands'],['Ye Yifei','China'],['Yifei Ye','China'],['Robert Kubica','Poland'],['Phil Hanson','United Kingdom'],['Paul Di Resta','United Kingdom'],['Paul di Resta','United Kingdom'],['Stoffel Vandoorne','Belgium'],['Nick Cassidy','New Zealand'],['Andre Lotterer','Germany'],['André Lotterer','Germany'],['Luis Felipe Derani','Brazil'],['Pipo Derani','Brazil'],['Mathys Jaubert','France'],['Will Stevens','United Kingdom'],['Norman Nato','France'],['Louis Deletraz','Switzerland'],['Louis Delétraz','Switzerland'],['Sebastien Buemi','Switzerland'],['Sébastien Buemi','Switzerland'],['Brendon Hartley','New Zealand'],['Ryo Hirakawa','Japan'],['Frederic Makowiecki','France'],['Frédéric Makowiecki','France'],['Jules Gounon','France'],['Victor Martins','France'],['Antonio Felix Da Costa','Portugal'],['António Félix Da Costa','Portugal'],['Charles Milesi','France'],['Ferdinand Habsburg','Austria'],['Mathieu Jaminet','France'],['Paul Loup Chatin','France'],['Dani Juncadella','Spain'],['Daniel Juncadella','Spain'],['Antares Au','Hong Kong'],['Tom Fleming','United Kingdom'],['Marvin Kirchhöfer','Germany'],['Marvin Kirchhofer','Germany'],['Ian James','United Kingdom'],['Zacharie Robichon','Canada'],['Mattia Drudi','Italy'],['Yasser Shahin','Australia'],['Richard Lietz','Austria'],['Francois Heriau','France'],['François Hériau','France'],['Simon Mann','United States'],['Adam West','Australia'],['Finn Gehrsitz','Germany'],['Ben Goethe','Denmark'],['Petr Umbrarescu','Romania'],['Petru Umbrarescu','Romania'],['Clemens Schmid','Austria'],['Jose Maria Lopez','Argentina'],['José María López','Argentina'],['Joel Sturm','Germany'],['Takeshi Kimura','Japan'],['Tom Van Rompuy','Belgium'],['Hadrien David','France'],['Esteban Masson','France'],['Loic Duval','France'],['Loïc Duval','France'],['Malthe Jakobsen','Denmark'],['Theo Pourchaire','France'],['Théo Pourchaire','France'],['Earl Bamber','New Zealand'],['Sebastien Bourdais','France'],['Sébastien Bourdais','France'],['Jack Aitken','United Kingdom']
].forEach(([n,c])=>setDriverCountry(n,c));
function splitDriverCell(cell){return String(cell||'').split(/\s*\/\s*|\s*\|\s*|\s*;\s*/).map(x=>x.trim()).filter(Boolean)}
function normalizeVehicleText(vehicle, cls){
  let v=String(vehicle||'').replace(/\s+/g,' ').trim();
  if(!v)return '';
  // Al Kamel copied tables may append tyre/class letters to the vehicle cell.
  v=v.replace(/\s+(G|M)\s*$/i,'').replace(new RegExp('\\s+'+String(cls||'').replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s*$','i'),'').trim();
  return v;
}
function driversFromRow(row){
  const drivers=String(val(row,['drivers','driver','driversnames'])||'').split('|').map(x=>x.trim()).filter(Boolean);
  const nations=String(val(row,['nations','nationalities','countries'])||'').split('|').map(x=>x.trim()).filter(Boolean);
  const pairs=[];
  if(drivers.length){drivers.forEach((d,i)=>pairs.push([d,nations[i]||lookupDriverCountry(d)]));return pairs}
  for(let i=1;i<=6;i++){
    const d=val(row,[`driver${i}`,`driver_${i}`,`driver ${i}`,`d${i}`]);
    if(d)pairs.push([d,val(row,[`nation${i}`,`country${i}`,`nationality${i}`,`driver${i}country`, `driver_${i}_country`, `driver${i}nationality`])||lookupDriverCountry(d)]);
  }
  // Al Kamel sometimes has one combined Drivers column after copy/PDF extraction.
  if(!pairs.length){
    const combined=val(row,['drivers','drivernames','crew']);
    splitDriverCell(combined).forEach(d=>pairs.push([d,lookupDriverCountry(d)]));
  }
  return pairs;
}
function rowsToEntries(rows){return rows.map((r,i)=>{
  const no=String(val(r,['no','number','num','car','carnumber'])||'').trim();
  const rawClass=val(r,['class','cat','category','division','group']);
  const cls=normClass(rawClass);
  const vehicleRaw=val(r,['vehicle','vehicletype','vehicletyres','vehiclemodel','car','model','carmodel','chassis']);
  const vehicle=normalizeVehicleText(vehicleRaw, rawClass||cls);
  return {pos:+(val(r,['pos','position','overallpos','overallposition','rank'])||0)||i+1,class:cls,no,
    constructor:normConstructor(val(r,['constructor','make','manufacturer','chassisconstructor'])||constructorFromVehicle(vehicle)),
    model:vehicle||val(r,['model','carmodel'])||'',team:val(r,['team','entry','entrant','competitor'])||'',
    gap:val(r,['gap','gapfirst','gaptofirst','gap_first'])||'—',int:val(r,['int','interval','gap_previous','gapprev'])||'',laps:+(val(r,['laps','lap'])||0)||0,
    time:val(r,['time','totaltime','total','racetime','total_time'])||'',status:val(r,['status','classification','classified'])||'',drivers:driversFromRow(r)}
}).filter(e=>e.no)}
function importTextFor(type){return type==='entry'?$('entryCsv').value:type==='results'?$('resultsCsv').value:type==='performance'?$('performanceCsv').value:$('raceControlCsv')?.value||''}
function previewElementFor(type){return type==='entry' ? $('entryPreview') : type==='results' ? $('resultsPreview') : type==='performance' ? $('performancePreview') : $('raceControlPreview')}
function isStagedSource(text){return /^\[SCC_SOURCE:/.test(String(text||'').trim())}
function previewCsv(type){
  const text=importTextFor(type);const el=previewElementFor(type);
  if(!el)return;
  if(isStagedSource(text)){el.innerHTML=`<div class="import-format pdf-staged">${esc(text.split('\n')[0].replace('[SCC_SOURCE:','').replace(']',''))} source staged. It is linked to this import step; automatic PDF extraction will use the ${esc(type)} parser hook.</div>`;renderImportChecklist();return;}
  const rows=importRows(type);
  if(isPdfTextSource(text)){
    const h=pdfTextHeader(text).replace('[SCC_PDF_TEXT:','').replace(']','');
    const extracted=pdfTextBody(text).split('\n').filter(l=>l.trim()).length;
    if(!rows.length){el.innerHTML=`<div class="import-format pdf-staged">${esc(h)} extracted (${extracted} text lines), but no table rows were mapped automatically. Paste/convert the extracted text to CSV or try the official timing CSV.</div><pre>${esc(pdfTextBody(text).slice(0,2000))}</pre>`;return;}
  }
  if(!rows.length){el.innerHTML='<div class="empty-state">No rows detected.</div>';return}
  const fmt=isPdfTextSource(text)?'PDF text extraction / parser hook':detectImportFormat(rows);
  let summary=`<strong>${rows.length} rows detected</strong><div class="import-format">Detected: ${esc(fmt)}</div>`;
  if(type==='entry'||type==='results'){
    const entries=rowsToEntries(rows);
    const classes=[...new Set(entries.map(e=>e.class).filter(Boolean))];
    const constructors=[...new Set(entries.map(e=>e.constructor).filter(Boolean))]; const noDrivers=entries.filter(e=>!e.drivers||!e.drivers.length).length; summary+=`<div class="import-detected"><span>${entries.length} cars</span><span>${classes.length} classes</span><span>${classes.map(c=>esc(c)).join(', ')}</span><span>${constructors.length} constructors</span><span>${noDrivers?('⚠ '+noDrivers+' without drivers'):'drivers OK'}</span></div>`;
  }
  if(type==='raceControl'){
    const segs=raceControlRows(rows);summary+=`<div class="import-detected"><span>${segs.length} segments/messages</span><span>${[...new Set(segs.map(s=>s.phase))].join(', ')}</span></div>`;
  }
  el.innerHTML=summary+`<pre>${esc(JSON.stringify(rows.slice(0,3),null,2))}</pre>`;
}
function importEntriesCsv(){if(isStagedSource($('entryCsv').value))return alert('Entry List PDF/JSON source is staged. CSV/JSON extraction parser hook is ready; use CSV for immediate import.');const rows=importRows('entry');const entries=rowsToEntries(rows);if(!entries.length)return alert('No entries detected. Check the CSV header.');state.race.entries=entries;learnDriverCountries(entries);recalculateClassPositions();render();alert(`${entries.length} entries imported.`)}
function importResultsCsv(){
  if(isStagedSource($('resultsCsv').value))return alert('Results PDF/JSON source is staged. CSV/JSON extraction parser hook is ready; use CSV for immediate import.');
  const rows=importRows('results');if(!rows.length)return alert('No result rows detected.');
  const parsed=rowsToEntries(rows);
  if(!state.race.entries.length){state.race.entries=parsed;learnDriverCountries(parsed);recalculateClassPositions();render();alert(`${parsed.length} result rows imported as entries.`);return;}
  const byNo=Object.fromEntries(state.race.entries.map(e=>[String(e.no),e]));let matched=0,created=0;
  parsed.forEach(p=>{let e=byNo[String(p.no)]; if(!e){e=p;state.race.entries.push(e);created++;}else{Object.assign(e,{pos:p.pos||e.pos,class:p.class||e.class,constructor:p.constructor||e.constructor,model:p.model||e.model,team:p.team||e.team,gap:p.gap||e.gap,laps:p.laps||e.laps,time:p.time||e.time,status:p.status||e.status,int:p.int||e.int,drivers:p.drivers?.length?p.drivers:e.drivers});matched++;}});
  learnDriverCountries(state.race.entries);state.race.entries.sort((a,b)=>(a.pos||999)-(b.pos||999));recalculateClassPositions();render();alert(`${matched} matched, ${created} added from results.`)
}
function recalculateClassPositions(){
  const groups={};state.race.entries.forEach(e=>{(groups[e.class]??=[]).push(e)});Object.values(groups).forEach(arr=>arr.sort((a,b)=>(a.pos||999)-(b.pos||999)).forEach((e,i)=>e.classPos=i+1));
}
function performanceRows(rows){return rows.map((r,i)=>({type:String(val(r,['type','kind','session'])||'FL').toUpperCase().includes('P')?'PP':'FL',class:normClass(val(r,['class','category'])||'Overall'),no:String(val(r,['no','number','car'])||'').trim(),driver:val(r,['driver','name','driver1'])||'',lap:+(val(r,['lap','laps'])||0)||'',time:val(r,['time','laptime','bestlap'])||''})).filter(x=>x.no||x.driver||x.time)}
function importPerformanceCsv(){if(isStagedSource($('performanceCsv').value))return alert('Performance PDF/JSON source is staged. CSV/JSON extraction parser hook is ready; use CSV for immediate import.');const rows=importRows('performance');const perf=performanceRows(rows);if(!perf.length)return alert('No performance rows detected.');state.race.performance=state.race.performance||{};state.race.performance.fastestLaps=perf.filter(x=>x.type==='FL');state.race.performance.poles=perf.filter(x=>x.type==='PP');render();alert(`${perf.length} performance rows imported.`)}

function raceControlRows(rows){
  const messages=rows.map(r=>({
    start:parseTime(val(r,['start','starttime','from','time','elapsed'])||'0:00'),
    end:val(r,['end','endtime','to'])?parseTime(val(r,['end','endtime','to'])):null,
    phase:String(val(r,['phase','type','flag','status'])||'GREEN').toUpperCase().replace(/\s+/g,''),
    reason:val(r,['reason','trigger','incident'])||'',
    notes:val(r,['notes','comment','message'])||'',
    startLap:+(val(r,['startlap','lap'])||0)||0,
    endLap:+(val(r,['endlap'])||0)||0
  })).filter(m=>m.start||m.phase);
  const duration=parseTime(state.race.officialDuration||state.race.scheduledDuration);
  const laps=state.race.officialLaps||state.race.scheduledLaps||0;
  messages.sort((a,b)=>a.start-b.start);
  return messages.map((m,i)=>{
    const next=messages[i+1];
    const end=m.end??(next?next.start:duration);
    return {id:'rc'+Date.now()+i,phase:m.phase==='FULLCOURSEYELLOW'?'FCY':m.phase,start:m.start,end,startLap:m.startLap||0,endLap:m.endLap||laps,reason:m.reason||m.phase,notes:m.notes};
  }).filter(s=>s.end>s.start);
}
function importRaceControlCsv(){
  const txt=$('raceControlCsv')?.value||'';
  if(isStagedSource(txt))return alert('Race Control PDF/JSON source is staged. Use CSV for immediate segment import.');
  const rows=importRows('raceControl');const segs=raceControlRows(rows);
  if(!segs.length)return alert('No race-control rows detected.');
  state.race.segments=mergeGreens(segs.sort((a,b)=>a.start-b.start));
  render();alert(`${segs.length} Race Control segments imported.`)
}

function setupImportDropzones(){
  const zones=[['entryDrop','entryFile','entryCsv','entry'],['resultsDrop','resultsFile','resultsCsv','results'],['performanceDrop','performanceFile','performanceCsv','performance'],['raceControlDrop','raceControlFile','raceControlCsv','raceControl']];
  zones.forEach(([dropId,fileId,textId,type])=>{const dz=$(dropId),fi=$(fileId),ta=$(textId); if(!dz||dz.dataset.bound)return; dz.dataset.bound='1';
    const loadFile=f=>{if(!f)return;state.importSources=state.importSources||[];const ext=(f.name.split('.').pop()||'').toLowerCase();
      if(/pdf/i.test(f.type)||ext==='pdf'){
        state.importSources.push({type,kind:'PDF',name:f.name,size:f.size,ts:Date.now()});
        ta.value=`[SCC_SOURCE:PDF] ${f.name}\nParser target: ${type}\nStatus: extracting text...`;
        previewCsv(type);renderImportChecklist();
        readPdfText(f).then(txt=>{
          ta.value=`[SCC_PDF_TEXT:${type}] ${f.name}\n${txt}`;
          previewCsv(type);renderImportChecklist();
        }).catch(err=>{
          ta.value=`[SCC_SOURCE:PDF] ${f.name}\nParser target: ${type}\nStatus: PDF extraction failed: ${err.message}`;
          previewCsv(type);renderImportChecklist();
        });
        return;
      }
      const r=new FileReader();r.onload=()=>{ta.value=r.result;if(ext==='json'||/json/i.test(f.type)){state.importSources.push({type,kind:'JSON',name:f.name,size:f.size,ts:Date.now()});}previewCsv(type)};r.readAsText(f)};
    dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('drag')});dz.addEventListener('dragleave',()=>dz.classList.remove('drag'));
    dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('drag');loadFile(e.dataTransfer.files[0])});
    fi.onchange=e=>loadFile(e.target.files[0]);
  });
}


function isPdfTextSource(text){return /^\[SCC_PDF_TEXT:/.test(String(text||'').trim())}
function pdfTextBody(text){const raw=String(text||'');return raw.split('\n').slice(1).join('\n')}
function pdfTextHeader(text){return String(text||'').split('\n')[0]||''}
function tabularRowsFromPdfText(text){
  const lines=pdfTextBody(text).replace(/\r/g,'').split('\n').map(l=>l.trim()).filter(Boolean);
  const candidates=lines.filter(l=>l.includes('\t') || /\s{2,}/.test(l));
  if(!candidates.length)return [];
  let headerIdx=candidates.findIndex(l=>/(no\.?|number|car|pos|position|team|competitor|driver|class|vehicle|laps|gap|time)/i.test(l) && (l.includes('\t') || /\s{2,}/.test(l)));
  if(headerIdx<0) headerIdx=0;
  const table=candidates.slice(headerIdx).map(l=>l.includes('\t')?l:l.replace(/\s{2,}/g,'\t')).join('\n');
  return parseCsv(table);
}
function wordsAfterKnownVehicle(line){
  const constructors=['Ferrari','Porsche','Toyota','BMW','Cadillac','Alpine','Peugeot','Aston Martin','Lamborghini','Oreca','Ligier','Duqueine','Adess','Ginetta','Corvette','Ford','Lexus','Mercedes','McLaren','Audi','Acura','Genesis'];
  const hit=constructors.find(c=>line.toLowerCase().includes(c.toLowerCase()));
  return hit||'';
}
function rowsFromLoosePdfText(type,text){
  const body=pdfTextBody(text).replace(/\r/g,'');
  const lines=body.split('\n').map(l=>l.trim()).filter(Boolean);
  const classRe='HYP|LMGT3|LMP2\\s*P\\/?A|LMP2|LMP3|GTP|GTD\\s*PRO|GTD|PRO\\-?AM|PRO|GOLD|SILVER|BRONZE|GT3';
  const rows=[];
  for(const line of lines){
    const compact=line.replace(/\s+/g,' ');
    if(type==='raceControl'){
      const m=compact.match(/(\d{1,2}:\d{2}(?::\d{2})?)\s+(GREEN|FCY|FULL COURSE YELLOW|SC|SAFETY CAR|VSC|RED|YELLOW|CODE\s*60|SLOW ZONE)\b\s*(.*)/i);
      if(m) rows.push({time:m[1], type:m[2].replace(/FULL COURSE YELLOW/i,'FCY').replace(/SAFETY CAR/i,'SC'), reason:m[3]||'', notes:''});
      continue;
    }
    const classMatch=compact.match(new RegExp('\\b('+classRe+')\\b','i'));
    const noMatch=compact.match(/(?:^|\s)#?(\d{1,3})(?=\s|$)/);
    if(!classMatch||!noMatch) continue;
    const no=noMatch[1];
    const cls=normClass(classMatch[1]);
    const vehicle=wordsAfterKnownVehicle(compact);
    const constructor=constructorFromVehicle(vehicle||compact);
    if(type==='performance'){
      const time=compact.match(/\b\d{1,2}:\d{2}\.\d{3}\b|\b\d{1,2}:\d{2}:\d{2}\.\d{3}\b/);
      if(time) rows.push({type:/pole|qualifying|hyperpole/i.test(body)?'PP':'FL', class:cls, no, driver:'', lap:'', time:time[0]});
    }else{
      rows.push({pos:rows.length+1,no,class:cls,team:'',constructor,model:vehicle||'',drivers:'',nations:'',laps:'',gap:'—',status:''});
    }
  }
  return rows;
}

function titleCaseDriverTokenName(parts){
  return parts.join(' ').replace(/\s+/g,' ').trim().replace(/\b([A-ZÁÉÍÓÚÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ]+)\b/g,w=>w.length===1?w:w.charAt(0)+w.slice(1).toLowerCase());
}
function splitWecGapTokens(parts){
  parts=(parts||[]).filter(Boolean);
  if(!parts.length)return ['—',''];
  function takeOne(arr){
    if(arr.length>=2 && /^\d+$/.test(arr[0]) && /^laps?$/i.test(arr[1])) return [arr.slice(0,2).join(' '), arr.slice(2)];
    return [arr[0], arr.slice(1)];
  }
  const [gap,rest]=takeOne(parts);
  const [intv]=takeOne(rest);
  return [gap||'—',intv||''];
}
function parseWecFinalClassificationPdf(type,text){
  const body=pdfTextBody(text).replace(/\r/g,'');
  // WEC/ACO final classifications are printed as a fixed-width table.  The PDF.js
  // text stream sometimes preserves columns with tabs, sometimes with long spaces,
  // and sometimes breaks a few rows differently.  This parser prefers the real
  // table structure and only falls back to the older token parser when needed.
  if(!/(FIA\s*WEC|World\s+Endurance|TotalEnergies\s+6\s+Hours|Final\s+Classification)/i.test(body) || !/Final\s*\t?\s*Classification/i.test(body)) return [];
  const rawLines=body.split('\n').map(l=>l.replace(/\u00a0/g,' '));
  const rows=[];
  let status='Classified';
  const classRx=/^(HYPERCAR|LMGT3)$/i;
  const ctorNames=['Aston Martin','Mercedes-AMG','BMW','Ferrari','Porsche','Toyota','Cadillac','Alpine','Peugeot','Genesis','McLaren','Lexus','Corvette','Ford'];
  function clean(s){return String(s||'').replace(/\s+/g,' ').trim()}
  function splitCols(line){
    // Use real tabs when available, otherwise fixed-width gaps.  Drop tiny empty cells.
    let cols=line.includes('\t') ? line.split(/\t+/) : line.split(/\s{2,}/);
    cols=cols.map(clean).filter(Boolean);
    // Some rows split position and car number into two columns: ["5", "7 Toyota Racing", ...]
    if(cols.length>1 && /^\d+$/.test(cols[0]) && /^0?\d{1,3}\b/.test(cols[1])){
      cols[0]=cols[0]+' '+cols[1]; cols.splice(1,1);
    }
    return cols;
  }
  function parseFirstCell(cell,classified){
    cell=clean(cell);
    if(classified){
      const m=cell.match(/^(\d+)\s+([0-9]{1,3}|0[0-9]{2})\s+(.+)$/);
      if(m) return {pos:+m[1], no:m[2], team:clean(m[3])};
    }else{
      const m=cell.match(/^([0-9]{1,3}|0[0-9]{2})\s+(.+)$/);
      if(m) return {pos:rows.length+1, no:m[1], team:clean(m[2])};
    }
    return null;
  }
  function titleDriverName(s){
    return clean(s).split(' ').map(w=>{
      if(w==='/'||!w)return w;
      if(/^([A-ZÁÉÍÓÚÄËÏÖÜÑÇŘŠŽÝŮĚČĎŤŇ])\.$/.test(w)) return w;
      return w.charAt(0)+w.slice(1).toLowerCase();
    }).join(' ');
  }
  function parseDrivers(s){
    return clean(s).split(/\s*\/\s*/).map(titleDriverName).filter(Boolean).join(' | ');
  }
  function parseRest(cols, fromIdx){
    const tail=cols.slice(fromIdx).join(' ');
    const m=tail.match(/(?:(\d+)\s+Laps?|(\d+\.\d{3}))?\s*(?:(\d+)\s+Laps?|(\d+\.\d{3}|1\s+Lap))?\s*(\d+)\s+(\d+)\s+(\d{1,2}:\d{2}\.\d{3})\s+([0-9.]+)/i);
    if(!m) return {gap:'—',int:'',pit:'',bestLapNo:'',bestLap:''};
    const gap = m[1]?`${m[1]} Laps`:(m[2]||'—');
    const intv = m[3]?`${m[3]} Laps`:(m[4]?m[4].replace(/\s+/g,' '):'');
    return {gap,int:intv,pit:m[5]||'',bestLapNo:m[6]||'',bestLap:m[7]||''};
  }
  function tryColumnLine(line){
    const cols=splitCols(line);
    if(cols.length<7) return false;
    // Find the class column; this prevents vehicle names being mistaken for classes.
    const classIdx=cols.findIndex(c=>classRx.test(c));
    if(classIdx<3) return false;
    const first=parseFirstCell(cols[0], status==='Classified');
    if(!first) return false;
    const drivers=cols[1];
    const model=cols.slice(2,classIdx).join(' ');
    const ty=cols[classIdx+1]||'';
    const laps=Number(cols[classIdx+2])||0;
    const totalTime=cols[classIdx+3]||'';
    const rest=parseRest(cols, classIdx+4);
    rows.push({
      pos:first.pos,no:first.no,team:first.team,drivers:parseDrivers(drivers),nations:'',
      constructor:constructorFromVehicle(model||first.team),model, class: classRx.test(cols[classIdx]) ? (/HYPERCAR/i.test(cols[classIdx])?'HYP':'LMGT3') : normClass(cols[classIdx]),
      laps,total_time:totalTime,time:totalTime,gap:status==='Classified'?rest.gap:status,int:status==='Classified'?rest.int:'',status,
      bestLap:rest.bestLap,bestLapNo:rest.bestLapNo
    });
    return true;
  }
  function tok(line){ return line.includes('\t') ? line.split(/\t+/).filter(Boolean) : line.split(/\s+/).filter(Boolean); }
  function isNo(t){ return /^\d{1,3}$/.test(String(t||'')) || /^0\d\d$/.test(String(t||'')); }
  function findCtorIdx(tokens,start,end){
    for(let i=start;i<end;i++){
      const one=tokens[i], two=tokens.slice(i,i+2).join(' ');
      if(ctorNames.some(c=>c.toLowerCase()===two.toLowerCase() || c.toLowerCase()===one.toLowerCase())) return i;
    }
    return -1;
  }
  function addFromTokenLine(line){
    const tokens=tok(line); if(!tokens.length) return false;
    const startsPos=/^\d+$/.test(tokens[0]) && isNo(tokens[1]);
    const startsNo=isNo(tokens[0]);
    if(!startsPos && !startsNo) return false;
    let pos,no,offset;
    if(startsPos){pos=Number(tokens[0]);no=tokens[1];offset=2}else{pos=rows.length+1;no=tokens[0];offset=1}
    const classIdx=tokens.findIndex(t=>/^(HYPERCAR|LMGT3)$/i.test(t));
    if(classIdx<0) return false;
    const cls=/HYP/i.test(tokens[classIdx])?'HYP':'LMGT3';
    const lapsIdx=classIdx+2, totalIdx=classIdx+3;
    const laps=Number(tokens[lapsIdx])||0;
    const totalTime=tokens[totalIdx]||'';
    let bestIdx=tokens.findIndex((t,i)=>i>totalIdx && /^\d{1,2}:\d{2}\.\d{3}$/.test(t));
    if(bestIdx<0) bestIdx=tokens.length-2;
    const pitIdx=Math.max(totalIdx+1,bestIdx-2);
    const gapTokens=tokens.slice(totalIdx+1,pitIdx);
    const [gap,intv]=status==='Classified'?splitWecGapTokens(gapTokens):[status,''];
    const bestLap=/^\d{1,2}:\d{2}\.\d{3}$/.test(tokens[bestIdx]||'') ? tokens[bestIdx] : '';
    const bestLapNo=bestLap ? (tokens[bestIdx-1]||'') : '';
    const firstInitial=tokens.findIndex((t,i)=>i>=offset && /^[A-ZÁÉÍÓÚÄËÏÖÜÑÇ]\.$/.test(t));
    if(firstInitial<0 || firstInitial>=classIdx) return false;
    const slashIdx=tokens.map((t,i)=>t==='/'?i:-1).filter(i=>i>=0 && i<classIdx);
    const lastSlash=slashIdx.length?slashIdx[slashIdx.length-1]:firstInitial;
    let carStart=findCtorIdx(tokens, Math.max(firstInitial,lastSlash+1), classIdx);
    if(carStart<0) carStart=findCtorIdx(tokens, firstInitial+1, classIdx);
    if(carStart<0) carStart=classIdx-2;
    const team=tokens.slice(offset,firstInitial).join(' ');
    const driverChunk=tokens.slice(firstInitial,carStart);
    const drivers=[]; let cur=[];
    driverChunk.forEach(t=>{if(t==='/'){if(cur.length)drivers.push(titleCaseDriverTokenName(cur));cur=[]}else cur.push(t)});
    if(cur.length)drivers.push(titleCaseDriverTokenName(cur));
    const model=tokens.slice(carStart,classIdx).join(' ');
    rows.push({pos,no,team,drivers:drivers.join(' | '),nations:'',constructor:constructorFromVehicle(model||team),model,class:cls,laps,gap,status,int:intv,bestLap,bestLapNo,total_time:totalTime,time:totalTime});
    return true;
  }
  for(const raw of rawLines){
    const line=raw.trim(); if(!line) continue;
    if(/^Not\s+classified/i.test(line)){status='NC';continue}
    if(/^Retired/i.test(line)){status='RET';continue}
    if(/^Circuit\s+Best|^Circuit\s+Race|^CAR\s+/i.test(line)) break;
    // Skip headers and page noise.
    if(/^(No\s+Team|Best\s+Lap|Race$|Final\s+Classification|FIA\s+WEC|TotalEnergies|Published|Stewards|Timekeeper)/i.test(line)) continue;
    if(!tryColumnLine(raw)) addFromTokenLine(line);
  }
  // De-duplicate accidental double rows from PDF text extraction, keeping the richest row.
  const byNo={};
  rows.forEach(r=>{const k=String(r.no); if(!byNo[k] || (r.drivers||'').length>(byNo[k].drivers||'').length) byNo[k]=r});
  const cleanRows=Object.values(byNo).sort((a,b)=>{
    const rank={Classified:0,NC:1,RET:2,DNS:3,DSQ:4};
    return (rank[a.status]??9)-(rank[b.status]??9) || (a.pos||999)-(b.pos||999);
  });
  if(type==='performance'){
    const perf=[]; const byClass={};
    cleanRows.forEach(r=>{
      if(!r.bestLap || !/^\d/.test(r.bestLap))return;
      const sec=parseTime('0:'+r.bestLap);
      const drv=(r.drivers||'').split('|')[0].trim();
      if(!byClass[r.class] || sec<parseTime('0:'+byClass[r.class].time)) byClass[r.class]={type:'FL',class:r.class,no:r.no,driver:drv,lap:r.bestLapNo,time:r.bestLap};
      if(!byClass.Overall || sec<parseTime('0:'+byClass.Overall.time)) byClass.Overall={type:'FL',class:'Overall',no:r.no,driver:drv,lap:r.bestLapNo,time:r.bestLap};
    });
    ['Overall','HYP','LMGT3','LMP2','LMP3','GTP','GTDPRO','GTD'].forEach(k=>{if(byClass[k])perf.push(byClass[k])});
    return perf;
  }
  return cleanRows;
}
function rowsFromPdfText(type,text){
  const wecRows=parseWecFinalClassificationPdf(type,text);
  if(wecRows.length) return wecRows;
  const tableRows=tabularRowsFromPdfText(text);
  if(tableRows.length){
    const entriesLike=(type==='entry'||type==='results')?rowsToEntries(tableRows):[];
    if(type==='entry'||type==='results'){
      const good=entriesLike.filter(e=>e.no && (e.class||e.team||e.model||e.constructor));
      if(good.length>=3) return tableRows;
    } else if(type==='performance') {
      const perf=performanceRows(tableRows); if(perf.length) return tableRows;
    } else if(type==='raceControl') {
      const rc=raceControlRows(tableRows); if(rc.length) return tableRows;
    }
  }
  return rowsFromLoosePdfText(type,text);
}
function importRows(type){
  const text=importTextFor(type);
  if(isPdfTextSource(text)) return rowsFromPdfText(type,text);
  return parseCsv(text);
}
async function readPdfText(file){
  const lib=window.pdfjsLib || (window['pdfjs-dist/build/pdf'] || null);
  if(!lib) throw new Error('PDF.js is not loaded. Connect to the internet once or use CSV/text export.');
  if(lib.GlobalWorkerOptions){
    lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }
  const data=await file.arrayBuffer();
  const pdf=await lib.getDocument({data, disableWorker:true}).promise;
  const out=[];
  for(let pno=1;pno<=pdf.numPages;pno++){
    const page=await pdf.getPage(pno);
    const tc=await page.getTextContent();
    const rows=[];
    tc.items.forEach(it=>{
      const x=it.transform[4], y=it.transform[5], str=String(it.str||'').trim();
      if(!str)return;
      let row=rows.find(r=>Math.abs(r.y-y)<3);
      if(!row){row={y,items:[]};rows.push(row)}
      row.items.push({x,str});
    });
    rows.sort((a,b)=>b.y-a.y).forEach(r=>{
      r.items.sort((a,b)=>a.x-b.x);
      const line=r.items.map(i=>i.str).join('\t').replace(/\t{2,}/g,'\t').trim();
      if(line) out.push(line);
    });
  }
  return out.join('\n');
}

function findEntry(no){return (state.race.entries||[]).find(e=>String(e.no)===String(no))}
function perfCard(p,overall=false){const e=findEntry(p.no)||{};const cls=p.class&&p.class!=='Overall'?p.class:(e.class||'Overall');const m=cls==='Overall'?{color:'#8b5cf6',text:'#fff',short:'ALL',label:'Overall'}:classMeta(cls);return `<div class="perf-row" style="--perf:${m.color}"><span class="perf-badge" style="background:${m.color};color:${m.text||'#fff'}">${esc(m.short||cls)}</span><div class="perf-main"><strong>#${esc(p.no||e.no||'—')} ${esc(e.team||'')}</strong><span>${esc(p.driver||'Unknown driver')}${p.lap?` · lap ${esc(p.lap)}`:''}</span></div><div class="perf-time">${esc(p.time||'—')}</div></div>`}

function driverCountry(name){
  const n=String(name||'').trim();
  // A driver imported before their country was known (or before this driver was added to the
  // DB) got stored with an empty country string on the entry itself - returning that empty
  // value directly, without ever trying the lookup, meant the flag stayed missing forever even
  // after the DB was fixed. Only trust a non-empty stored value; otherwise fall through.
  for(const e of (state.race.entries||[])) for(const d of (e.drivers||[])) if(String(d[0])===n && d[1]) return d[1];
  return lookupDriverCountry(n)||'';
}
function perfDriverLine(p){
  const c=driverCountry(p.driver)||p.country||'';
  return `<span class="perf-driver">${c?flag(c):'<span class="no-flag"></span>'}<span>${esc(p.driver||'Unknown driver')}</span></span>`;
}
// One .perf-driver line per crew member (instead of just whoever set the time) - highlightNames
// (a single name or an array of two, mirroring driverList's own signature) get bolded, everyone
// else renders plain.
function perfDriversLines(drivers,highlightNames){
  const names=(Array.isArray(highlightNames)?highlightNames:[highlightNames]).filter(Boolean);
  const hlKeys=new Set(names.map(n=>normalizeDriverName(resolveDriverFullName(n))));
  return (drivers||[]).map(d=>{
    const name=resolveDriverFullName(d[0]);
    const c=normalizedDriverCountry(name,d[1]);
    const isHl=hlKeys.has(normalizeDriverName(name));
    return `<span class="perf-driver">${c?flag(c):'<span class="no-flag"></span>'}<span>${isHl?`<strong class="qual-time-driver">${esc(name)}</strong>`:esc(name)}</span></span>`;
  }).join('');
}
function cleanLapTime(t){
  const raw=String(t||'').trim();
  if(!raw || raw==='—' || raw==='-' || /\?/.test(raw)) return '—';
  return raw.replace(/\?+/g,'—');
}
function perfEntryRow(p,opts={}){
  const e=findEntry(p.no)||{};
  const cls=p.class&&p.class!=='Overall'?p.class:(e.class||'Overall');
  const m=cls==='Overall'?{color:'#8b5cf6',text:'#fff',short:'ALL',label:'Overall'}:classMeta(cls);
  const overall=opts.overall||p.class==='Overall';
  const constructorId=e.constructor || p.constructor || '';
  const model=e.model || constructorMeta(constructorId).name || '';
  // Only the two-driver-average era needs the whole crew visible (the third member never drove
  // in qualifying, but still gets listed unhighlighted). Every other era has exactly one driver
  // who set the time, so opts.driverNames has a single entry - show just that one line, same as
  // before this feature existed, instead of expanding to the full crew.
  const namesArr=Array.isArray(opts.driverNames)?opts.driverNames.filter(Boolean):(opts.driverNames?[opts.driverNames]:[]);
  const whoHtml=(namesArr.length>1 && e.drivers && e.drivers.length)?perfDriversLines(e.drivers,namesArr):perfDriverLine(p);
  return `<div class="perf-card ${overall?'overall':''}" style="--perf:${m.color}">
    <div class="perf-left">${overall?'<span class="overall-label">OVERALL</span>':`<span class="perf-badge" style="background:${m.color};color:${m.text||'#fff'}">${esc(m.short||cls)}</span>`}</div>
    <div class="perf-logo">${constructorId?logo('constructor',constructorId,'perf-logo-box'):''}</div>
    <div class="perf-car"><strong>#${esc(p.no||e.no||'—')} ${esc(e.team||'')}</strong><span>${esc(model)}</span></div>
    <div class="perf-who">${whoHtml}${p.lap?`<small>Lap ${esc(p.lap)}</small>`:''}</div>
    <div class="perf-time">${esc(cleanLapTime(p.time))}</div>
  </div>`;
}
function performanceGroupHtml(kind){
  const perf=state.race.performance||{};
  const list=kind==='FL'?(perf.fastestLaps||[]):(perf.poles||[]);
  if(!list.length) return `<div class="empty-state">No ${kind==='FL'?'fastest-lap':'pole'} data imported yet.</div>`;
  const rows=[];
  const sorted=list.slice().filter(x=>x.time).sort((a,b)=>String(a.time).localeCompare(String(b.time)));
  // The two-driver-average era emits one pole record PER nominated driver sharing the same
  // class+car (polesFromAverageRows) - grouping by class+car recovers both names instead of
  // just whichever one happened to be found first, so both get highlighted in the full crew.
  const groupFor=(matchList,cls)=>{
    const first=matchList.find(x=>x.class===cls)||matchList.find(x=>(findEntry(x.no)||{}).class===cls);
    if(!first) return null;
    const names=matchList.filter(x=>x.class===cls&&x.no===first.no).map(x=>x.driver);
    return {p:first,names:names.length?names:[first.driver]};
  };
  const overallGroup=groupFor(list,'Overall')||(sorted[0]?{p:sorted[0],names:[sorted[0].driver]}:null);
  if(overallGroup) rows.push(perfEntryRow({...overallGroup.p,class:'Overall'}, {overall:true,driverNames:overallGroup.names}));
  rows.push('<div class="perf-separator"></div>');
  raceClassIds().forEach(cls=>{
    const g=groupFor(list,cls);
    if(g) rows.push(perfEntryRow({...g.p,class:cls}, {driverNames:g.names}));
  });
  return `<div class="performance-list">${rows.join('')}</div>`;
}
function renderFastestLaps(){
  if(!$('fastestLapPanel'))return;
  $('fastestLapPanel').innerHTML=performanceGroupHtml('FL');
}
function renderPolePositions(){
  if(!$('polePanel'))return;
  $('polePanel').innerHTML=performanceGroupHtml('PP');
}
function driversInline(e,compact){
  // Always render full names. In tight card layouts (Class Podiums), a row of 3 full names
  // can wrap to a second line and make that row taller than its neighbours - but whether that
  // actually happens depends on the real rendered width (driver count, flag widths, container
  // size), which can't be guessed from character counts alone. fixPodiumNameWraps() runs after
  // the DOM is in place and only abbreviates a row's longest name(s) if it truly wrapped.
  const drivers=e.drivers||[];
  const cls=compact?' class="dname"':'';
  return `<span class="summary-drivers-inline">${drivers.map(d=>{
    const name=resolveDriverFullName(d[0]);
    const c=normalizedDriverCountry(name,d[1]);
    return `<span>${c?flag(c):'<span class="no-flag"></span>'}<span${cls} data-full="${esc(name)}">${esc(name)}</span></span>`;
  }).join('')}</span>`;
}
function abbrevDriverName(full){
  const parts=String(full||'').split(/\s+/);
  if(parts.length<2) return full;
  return `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
}
function fixPodiumNameWraps(){
  document.querySelectorAll('.podium-row-v2 .summary-drivers-inline').forEach(row=>{
    const names=Array.from(row.querySelectorAll('.dname'));
    if(!names.length) return;
    const lineHeight=parseFloat(getComputedStyle(row).lineHeight)||16;
    const order=[...names].sort((a,b)=>b.dataset.full.length-a.dataset.full.length);
    let i=0;
    while(row.getBoundingClientRect().height>lineHeight*1.6 && i<order.length){
      order[i].textContent=abbrevDriverName(order[i].dataset.full);
      i++;
    }
  });
}
function podiumGroup(cls,arr){
  const winner=arr[0];
  const clsColor=classMeta(cls).color;
  return `<section class="summary-class-card summary-class-card-v2">
    <div class="summary-class-head">${classBadge(cls)}<strong>${esc(classMeta(cls).label||cls)}</strong></div>
    <div class="podium-table podium-table-v2">
      ${arr.slice(0,3).map((e,i)=>`<div class="podium-row podium-row-v2${i===0?' podium-row-winner':''}"${i===0?` style="--podium-winner-color:${clsColor}"`:''}>
        <span class="podium-pos">${i+1}.</span>
        <span class="podium-logo">${logo('constructor',e.constructor,'podium-logo-box')}</span>
        <div class="podium-team"><strong>#${esc(e.no)} ${esc(e.team)}</strong><span class="podium-car">${esc(e.model||constructorMeta(e.constructor).name)}</span>${driversInline(e,true)}</div>
        <span class="podium-gap">${i===0?esc(String(e.laps||'—')+' laps'):esc(classGap(e,winner))}</span>
      </div>`).join('')}
    </div>
  </section>`;
}
function placesProgressByClass(){
  const ranks=classRanks(), gridRanks=classGridRanks();
  return raceClassIds().map(cls=>{
    const arr=(ranks[cls]||[]).filter(e=>entryStatus(e)==='Classified' && e.__classGridPos);
    if(!arr.length) return null;
    const withDelta=arr.map(e=>({e,delta:e.__classGridPos-e.__classPos}));
    return {cls,gained:withDelta.reduce((a,b)=>b.delta>a.delta?b:a),lost:withDelta.reduce((a,b)=>b.delta<a.delta?b:a)};
  }).filter(Boolean);
}
function progressDriversHtml(e){
  return (e.drivers||[]).map((d,i)=>{
    const name=resolveDriverFullName(d[0]);
    const c=normalizedDriverCountry(name,d[1]);
    return `${i?', ':''}${c?flag(c):'<span class="no-flag"></span>'}${esc(name)}`;
  }).join('');
}
function progressRowHtml(cls,item,dir){
  const e=item.e,delta=item.delta,m=classMeta(cls);
  return `<div class="progress-row">
    <span class="progress-badge" style="background:${m.color};color:${m.text}">${esc(m.short||cls)}</span>
    <span class="progress-logo">${logo('constructor',e.constructor,'progress-logo-box')}</span>
    <div class="progress-info"><strong>#${esc(e.no)} ${esc(e.team)}</strong><span class="progress-drivers">${progressDriversHtml(e)}</span></div>
    <span class="progress-delta progress-delta-${dir}">${dir==='up'?'▲':'▼'} ${Math.abs(delta)}</span>
  </div>`;
}
function winningMarginByClass(){
  const groups=classGroups();
  const rows=Object.entries(groups).map(([cls,arr])=>{
    const margin=arr[1]?classGap(arr[1],arr[0]):'—';
    return `<div class="summary-line"><span>${classBadge(cls)} ${esc(classMeta(cls).label||cls)}</span><strong>${esc(margin)}</strong></div>`;
  }).join('');
  return rows||'<div class="empty-state">No class margins.</div>';
}
function renderSummaryFull(){
  if(!$('summaryFull'))return;
  const entries=state.race.entries||[];
  if(!entries.length){$('summaryFull').innerHTML='<div class="empty-state">No race data imported yet.</div>';return;}
  const groups=classGroups();
  const classified=entries.filter(e=>entryStatus(e)==='Classified');
  const nonClass=entries.filter(e=>entryStatus(e)!=='Classified');
  const overall=entries.slice().sort((a,b)=>(a.pos||999)-(b.pos||999))[0];
  const neutral=state.race.segments.filter(s=>s.phase!=='GREEN');
  const totalNeutral=neutral.reduce((a,s)=>a+s.end-s.start,0);
  const longestGreen=state.race.segments.filter(s=>s.phase==='GREEN').reduce((a,s)=>Math.max(a,s.end-s.start),0);
  const longestNeutral=neutral.reduce((a,s)=>Math.max(a,s.end-s.start),0);
  const extra=parseTime(state.race.officialDuration)-parseTime(state.race.scheduledDuration);
  const comp=state.race.completeness||{};
  const compItems=[['metadata','Metadata'],['results','Results'],['fastestLaps','Fastest laps'],['poles','Pole positions'],['raceControl','Race control timeline']]
    .map(([k,label])=>`<div class="completeness-item ${comp[k]?'ok':'missing'}">${label}</div>`).join('');
  const sourceItems=(state.race.sources||[]).map(x=>`<li>${esc(x)}</li>`).join('');
  const finishedPct=entries.length?(classified.length/entries.length*100).toFixed(1):'0.0';
  const progressByClass=placesProgressByClass();
  $('summaryFull').innerHTML=`
    <div class="summary-hero-grid">
      <section class="summary-block"><h3>General</h3><div class="summary-line"><span>Series</span><strong>${esc(series().name)}</strong></div><div class="summary-line"><span>Race</span><strong>${esc(state.race.event)}</strong></div><div class="summary-line"><span>Circuit</span><strong>${flag(state.race.country)} ${esc(state.race.circuit)}</strong></div><div class="summary-line"><span>Official / Scheduled</span><strong>${esc(state.race.officialDuration)} / ${esc(state.race.scheduledDuration)}</strong></div></section>
      <section class="summary-block"><h3>Classification</h3><div class="summary-line"><span>Overall winner</span><strong>#${esc(overall?.no||'—')} ${esc(overall?.team||'—')}</strong></div><div class="summary-line"><span>Finishers</span><strong>${classified.length} / ${entries.length}</strong></div><div class="summary-line"><span>% Finished</span><strong>${finishedPct}%</strong></div><div class="summary-line"><span>Official laps</span><strong>${esc(state.race.officialLaps)}</strong></div></section>
    </div>
    <section class="summary-block podiums-big"><h3>Class Podiums</h3><div class="podium-class-grid">${Object.entries(groups).map(([cls,arr])=>podiumGroup(cls,arr)).join('')}</div></section>
    <div class="performance-duo">
      <section class="summary-block"><h3>Performance · Fastest Laps</h3>${performanceGroupHtml('FL')}</section>
      <section class="summary-block"><h3>Performance · Pole Positions</h3>${performanceGroupHtml('PP')}</section>
    </div>
    <div class="summary-kpi-row">
      <div class="kpi-card"><span>Extra race time</span><strong>${fmtShort(extra)}</strong><em>After scheduled finish</em></div>
      <div class="kpi-card"><span>Total neutralized</span><strong>${fmtShort(totalNeutral)}</strong><em>${(totalNeutral/parseTime(state.race.officialDuration)*100).toFixed(1)}%</em></div>
      <div class="kpi-card"><span>Longest green</span><strong>${fmtShort(longestGreen)}</strong><em>Single run</em></div>
      <div class="kpi-card"><span>Longest neutralization</span><strong>${fmtShort(longestNeutral)}</strong><em>FCY / SC / red</em></div>
    </div>
    ${progressByClass.length?`<div class="summary-two-columns lower">
      <section class="summary-block"><h3>Most Places Gained · by Class</h3><div class="progress-list">${progressByClass.map(p=>progressRowHtml(p.cls,p.gained,'up')).join('')}</div></section>
      <section class="summary-block"><h3>Most Places Lost · by Class</h3><div class="progress-list">${progressByClass.map(p=>progressRowHtml(p.cls,p.lost,'down')).join('')}</div></section>
    </div>`:''}
    <div class="summary-two-columns lower">
      <section class="summary-block"><h3>Winning Margins by Class</h3>${winningMarginByClass()}</section>
      <section class="summary-block"><h3>Race Control</h3><div class="summary-line"><span>Total neutralized</span><strong>${fmtShort(totalNeutral)}</strong></div><div class="summary-line"><span>Longest green</span><strong>${fmtShort(longestGreen)}</strong></div><div class="summary-line"><span>Longest neutralization</span><strong>${fmtShort(longestNeutral)}</strong></div><div class="summary-line"><span>Extra race time</span><strong>${fmtShort(extra)}</strong></div></section>
    </div>
    <section class="summary-block wide"><h3>Data Completeness</h3><div class="completeness-list">${compItems}</div><ul class="source-list">${sourceItems}</ul></section>`;
  fixPodiumNameWraps();
}
function classRanksForRace(race){
  const ranks={};
  (race.entries||[]).forEach(e=>{ranks[e.class]??=[];ranks[e.class].push(e)});
  Object.keys(ranks).forEach(cls=>ranks[cls].sort((a,b)=>(Number(a.pos)||9999)-(Number(b.pos)||9999)||String(a.no).localeCompare(String(b.no))).forEach((e,i)=>e.__historyClassPos=i+1));
  return ranks;
}

const DRIVER_BIRTH_DB={
  'bernardo sousa':'1987-05-16','celia martin':'1991-10-04','valentin hasse clot':'1996-02-27','andrew gilbert':'1980-10-24','benjamin barker':'1991-04-23','ben barker':'1991-04-23',
  'robert shwartzman':'1999-09-16','oliver rasmussen':'2000-11-21','mirko bortolotti':'1990-01-10','edoardo mortara':'1987-01-12',
  'nicolas lapierre':'1984-04-02','antonio serravalle':'2002-09-18','wattana bennett':'2004-09-02','carl wattana bennett':'2004-09-02',
  'jean karl vernay':'1987-10-31','daniel mancinelli':'1988-07-23','joshua caygill':'1989-06-22','hiroshi koizumi':'1969-05-25',
  'erwan bastard':'1998-06-09','nicolas costa':'1991-11-14','shawn rashid':'1995-10-05','georges nakas':'1970-02-24',
  'alex brundle':'1991-06-03','andrea piccini':'1979-06-26','anthony davidson':'1979-04-18','beitske visser':'1996-09-22',
  'antonio felix da costa':'1991-08-31','franco colapinto':'2003-05-27','giancarlo fisichella':'1973-01-14',
  'gianmaria bruni':'1981-05-30','giedo van der garde':'1985-03-25','jan magnussen':'1973-07-04',
  'juan pablo montoya':'1975-09-20','katherine legge':'1980-01-24','kazuki nakajima':'1985-01-11',
  'oliver gavin':'1971-04-20','roman rusinov':'1985-07-10','sophia floersch':'2000-11-08','tatiana calderon':'1997-02-17',
  // WEC Spa 2018 (2018-19) + Silverstone 2019 (2019-20) - DOB only where confidently sourced;
  // Erwin Creed, Charlie Robertson, Sun Mok and Charles Hollings got a flag only above, no DOB
  // here, because the only source found for each was too weak to trust (single low-quality
  // snippet or a suspiciously round placeholder-looking date).
  'fernando alonso':'1981-07-29','thomas laurent':'1998-04-05','oliver webb':'1991-03-20','dominik kraihamer':'1989-11-29',
  'mikhail aleshin':'1987-05-22','vitaly petrov':'1984-09-08','andrea pizzitola':'1992-06-19','ho pin tung':'1982-12-04',
  'stephane richelmi':'1990-03-17','pierre thiriet':'1989-04-20','jazeman jaafar':'1992-11-13','weiron tan':'1994-12-03',
  'nabil jeffri':'1993-10-24','pastor maldonado':'1985-03-09','nathanael berthon':'1989-07-01','romano ricci':'1978-05-10',
  'stefan mucke':'1981-11-22','billy johnson':'1986-10-10','sam bird':'1987-01-09','darren turner':'1974-04-13',
  'martin tomczyk':'1981-12-07','pedro lamy':'1972-03-20','mathias lauda':'1981-01-30','euan alers hankey':'1987-03-18',
  'keita sawa':'1976-08-16','motoaki ishikawa':'1967-04-07','olivier beretta':'1969-11-23','khaled al qubaisi':'1975-12-22',
  'jan lammers':'1956-06-02','alex davison':'1979-11-03','jorg bergmeister':'1976-02-13','patrick lindsey':'1982-04-22',
  'egidio perfetti':'1975-06-05','stephane sarrazin':'1975-11-02','egor orudzhev':'1995-10-16','matevos isaakyan':'1998-04-17',
  'bruno senna':'1983-10-15','antonin borga':'1987-09-21','pierre ragues':'1984-01-10','andrea belicchi':'1976-12-18',
  'mark patterson':'1951-12-16','kenta yamashita':'1995-08-03','kei cozzolino':'1987-11-09','david kolkmann':'1996-12-06',
  'bonamy grimes':'1971-09-05','johnny mowlem':'1969-02-12','jeroen bleekemolen':'1981-10-23','michael simpson':'1983-09-13',
  'guy smith':'1974-09-12','luca giraudi':'1968-11-11','ricardo sanchez':'1990-01-02','andy priaulx':'1974-08-07','tony kanaan':'1974-12-31'
};
try{Object.assign(DRIVER_BIRTH_DB,JSON.parse(localStorage.getItem('scc_driver_birth_db')||'{}'))}catch(e){}
function saveDriverBirthDb(){try{localStorage.setItem('scc_driver_birth_db',JSON.stringify(DRIVER_BIRTH_DB))}catch(e){console.warn('DOB storage failed',e)}}
function driverDob(name){
  const key=normalizeDriverName(name);
  if(DRIVER_BIRTH_DB[key]) return DRIVER_BIRTH_DB[key];
  // Same "A. Surname" fallback as lookupDriverCountry: only when exactly one known DOB
  // shares that surname + first initial, so it never guesses between e.g. two Schumachers.
  const parts=key.split(' ');
  if(parts.length<2 || parts[0].length!==1) return '';
  const surname=parts.slice(1).join(' ');
  const matches=Object.keys(DRIVER_BIRTH_DB).filter(k=>{
    const kp=k.split(' ');
    return kp.length>1 && kp.slice(1).join(' ')===surname && kp[0][0]===parts[0];
  });
  return matches.length===1 ? DRIVER_BIRTH_DB[matches[0]] : '';
}
function driverAge(name, atDate){const dob=driverDob(name); if(!dob)return ''; const a=new Date(dob+'T00:00:00'), b=new Date((atDate||new Date().toISOString().slice(0,10))+'T00:00:00'); let y=b.getFullYear()-a.getFullYear(); const m=b.getMonth()-a.getMonth(); if(m<0||(m===0&&b.getDate()<a.getDate()))y--; return y>=0?String(y):''}

function databaseRaces(){
  return (RACES||[]).filter(r=>Array.isArray(r.entries) && r.entries.length);
}
function driverRecords(){
  const map=new Map();
  databaseRaces().forEach(r=>{
    const ranks=classRanksForRace(r);
    const raceDrivers=new Set();
    (r.entries||[]).forEach(e=>{
      (e.drivers||[]).forEach(d=>{
        const rawName=resolveDriverFullName(d[0]); if(!rawName) return;
        const key=normalizeDriverName(rawName);
        const country=d[1]||lookupDriverCountry(rawName)||'';
        if(!map.has(key)) map.set(key,{key,name:rawName,country,dob:driverDob(rawName),records:[],classes:new Set(),teams:new Set(),series:new Map(),overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,poles:0,fastest:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0});
        const x=map.get(key);
        if(!x.country && country) x.country=country;
        if(!x.dob) x.dob=driverDob(rawName);
        const classList=ranks[e.class]||[];
        const cpos=e.__historyClassPos || (classList.findIndex(z=>z.no===e.no)+1) || e.classPos || 0;
        const rec={race:r,entry:e,classPos:cpos,overallPos:e.pos||0};
        x.records.push(rec);
        x.classes.add(e.class); x.teams.add(e.team);
        const ser=r.series||'unknown';
        if(!x.series.has(ser)) x.series.set(ser,{starts:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0});
        const sx=x.series.get(ser); sx.starts++;
        if((rec.overallPos||0)===1){x.overallWins++;sx.overallWins++}
        if((rec.overallPos||0)>0 && (rec.overallPos||0)<=3){x.overallPodiums++;sx.overallPodiums++}
        if(cpos===1){x.classWins++;sx.classWins++}
        if(cpos>0 && cpos<=3){x.classPodiums++;sx.classPodiums++}
      });
    });
    (r.performance?.poles||[]).forEach(p=>{const key=normalizeDriverName(p.driver);if(map.has(key)){const x=map.get(key);x.poles++; const overall=String(p.class||'').toLowerCase()==='overall'; if(overall)x.polesOverall++; else x.polesClass++; const ser=x.series.get(r.series); if(ser){ if(overall)ser.polesOverall++; else ser.polesClass++;}}});
    (r.performance?.fastestLaps||[]).forEach(p=>{const key=normalizeDriverName(p.driver);if(map.has(key)){const x=map.get(key);x.fastest++; const overall=String(p.class||'').toLowerCase()==='overall'; if(overall)x.fastestOverall++; else x.fastestClass++; const ser=x.series.get(r.series); if(ser){ if(overall)ser.fastestOverall++; else ser.fastestClass++;}}});
  });
  return [...map.values()].map(d=>({
    ...d,
    wins:d.classWins,
    podiums:d.classPodiums,
    starts:d.records.length,
    age:driverAge(d.name),
    ppTotal:d.polesOverall+d.polesClass,
    flTotal:d.fastestOverall+d.fastestClass,
    records:d.records.sort((a,b)=>String(b.race.date).localeCompare(String(a.race.date))),
    seriesStats:[...d.series.entries()].map(([id,v])=>({id,...v,wins:v.classWins,podiums:v.classPodiums,poles:v.polesOverall+v.polesClass,fastest:v.fastestOverall+v.fastestClass}))
  }));
}
function syncDatabaseNav(){
  document.querySelectorAll('.database-nav button').forEach(b=>b.classList.toggle('active',b.dataset.dbTab===state.dataTab));
  document.querySelectorAll('.data-tab').forEach(b=>b.classList.toggle('active',b.dataset.dataTab===state.dataTab));
}
function statBox(label,value){return `<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`}
function renderDriverHistory(d){
  if(!d) return `<section class="driver-detail-panel"><div class="empty-state">Select a driver to see race history.</div></section>`;
  const best=d.records.reduce((a,r)=>Math.min(a,r.classPos||999),999);
  const rows=d.records.map(({race,entry,classPos,overallPos})=>`<tr>
    <td>${esc(new Date(race.date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}))}</td>
    <td>${esc(SERIES[race.series]?.short||race.series)}</td>
    <td>${esc(race.event)}</td>
    <td>${esc(entry.team)}</td>
    <td>${esc(entry.model||constructorMeta(entry.constructor).name)}</td>
    <td>${classBadge(entry.class)}</td>
    <td>P${esc(overallPos||'—')}</td>
    <td><strong>C${esc(classPos||'—')}</strong></td>
    <td>${classPos===1?'Class win':classPos<=3?'Class podium':esc(entry.status||'Classified')}</td>
  </tr>`).join('');
  return `<section class="driver-detail-panel">
    <div class="driver-detail-head">
      <div class="driver-avatar">${esc(d.name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</div>
      <div><h3>${esc(d.name)} ${d.country?flag(d.country):''}</h3><p>${esc(d.country||'Unknown country')} · ${esc([...d.classes].join(', '))}</p><div class="driver-birth driver-birth-edit">Born: <input id="driverDobInput" type="date" value="${esc(d.dob||'')}" /> <button class="mini-button" onclick="saveDriverDobForSelected()">Save</button> <span>${d.age?`Age ${esc(d.age)}`:'age unavailable'}</span></div></div>
    </div>
    <div class="driver-kpis driver-kpis-wide">
      ${statBox('Starts',d.starts)}
      ${statBox('Overall wins',d.overallWins)}
      ${statBox('Class wins',d.classWins)}
      ${statBox('Overall podiums',d.overallPodiums)}
      ${statBox('Class podiums',d.classPodiums)}
      ${statBox('Overall PP',d.polesOverall)}
      ${statBox('Class PP',d.polesClass)}
      ${statBox('Overall FL',d.fastestOverall)}
      ${statBox('Class FL',d.fastestClass)}
      ${statBox('Best class result',best<999?'C'+best:'—')}
    </div>
    <h4>By series</h4><div class="series-stat-pills series-stat-pills-detailed">${d.seriesStats.map(s=>`<div><strong>${esc(SERIES[s.id]?.short||s.id)}</strong><span>${s.starts} starts · O/C wins ${s.overallWins}/${s.classWins} · O/C podiums ${s.overallPodiums}/${s.classPodiums} · PP ${s.polesOverall}/${s.polesClass} · FL ${s.fastestOverall}/${s.fastestClass}</span></div>`).join('')}</div><h4>Race history</h4>
    <div class="history-table-wrap"><table class="history-table"><thead><tr><th>Date</th><th>Series</th><th>Race</th><th>Team</th><th>Car</th><th>Class</th><th>Overall</th><th>Class</th><th>Result</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>`;
}
function saveDriverDobForSelected(){
  const name=state.selectedDriver; const input=$('driverDobInput');
  if(!name||!input)return; const key=normalizeDriverName(name);
  if(input.value) DRIVER_BIRTH_DB[key]=input.value; else delete DRIVER_BIRTH_DB[key];
  saveDriverBirthDb(); renderDataManager();
}
window.saveDriverDobForSelected=saveDriverDobForSelected;

function sortDrivers(list){
  const {key,dir}=state.driverSort||{key:'starts',dir:'desc'}; const mul=dir==='asc'?1:-1;
  return [...list].sort((a,b)=>{
    const av=key==='name'?a.name:(key==='age'?(Number(a.age)||-1):(Number(a[key])||0));
    const bv=key==='name'?b.name:(key==='age'?(Number(b.age)||-1):(Number(b[key])||0));
    if(typeof av==='string') return mul*av.localeCompare(String(bv));
    return mul*(av-bv)||a.name.localeCompare(b.name);
  });
}
function filterDrivers(list){
  const f=state.driverFilters||{};
  return list.filter(d=>{
    const q=String(f.q||'').toLowerCase();
    if(q&&!(d.name.toLowerCase().includes(q)||[...d.teams].join(' ').toLowerCase().includes(q))) return false;
    const cq=String(f.country||'').toLowerCase();
    if(cq&&!String(d.country||'').toLowerCase().includes(cq)) return false;
    if(f.series&&f.series!=='all'&&!d.series.has(f.series)) return false;
    const age=Number(d.age)||0;
    if(f.ageMin&&(!age||age<Number(f.ageMin))) return false;
    if(f.ageMax&&(!age||age>Number(f.ageMax))) return false;
    if(f.startsMin&&d.starts<Number(f.startsMin)) return false;
    if(f.winsMin&&(d.overallWins+d.classWins)<Number(f.winsMin)) return false;
    if(f.podiumsMin&&(d.overallPodiums+d.classPodiums)<Number(f.podiumsMin)) return false;
    if(f.ppMin&&d.ppTotal<Number(f.ppMin)) return false;
    if(f.flMin&&d.flTotal<Number(f.flMin)) return false;
    if(f.finishPctMin&&d.finishPct<Number(f.finishPctMin)) return false;
    return true;
  });
}
function renderDriversManager(){
  const activeId=document.activeElement?.id||'';
  const activeSel=document.activeElement&&'selectionStart' in document.activeElement?document.activeElement.selectionStart:null;
  const all=driverRecords();
  const seriesOptions=['all',...Object.keys(SERIES).filter(id=>all.some(d=>d.series.has(id)))];
  const filtered=filterDrivers(all);
  const drivers=sortDrivers(filtered);
  if(!state.selectedDriver&&drivers.length)state.selectedDriver=drivers[0].name;
  const selected=all.find(d=>d.name===state.selectedDriver)||drivers[0];
  const f=state.driverFilters||{};
  const rows=drivers.map((d,i)=>`<button class="driver-row driver-row-core ${selected?.name===d.name?'active':''}" data-driver-key="${esc(d.key)}"><span class="driver-rank">${i+1}</span><strong>${esc(d.name)}</strong><span>${d.country?flag(d.country):''} ${esc(d.country||'')}</span><span>${esc(d.age||'—')}</span><span>${d.starts}</span><span>${d.overallWins}/${d.classWins}</span><span>${pct(d.overallWins+d.classWins,d.starts)}</span><span>${d.overallPodiums}/${d.classPodiums}</span><span>${pct(d.overallPodiums+d.classPodiums,d.starts)}</span><span>${d.polesOverall}/${d.polesClass}</span><span>${pct(d.ppTotal,d.starts)}</span><span>${d.fastestOverall}/${d.fastestClass}</span><span>${pct(d.flTotal,d.starts)}</span><span>${pct(d.finishes,d.starts)}</span><span>›</span></button>`).join('');
  $('dataManager').innerHTML=`<div class="driver-manager-layout driver-manager-advanced driver-manager-core database-drawer-layout"><section class="driver-list-panel"><div class="data-subhead"><h3>Drivers</h3><span class="muted">${drivers.length} / ${all.length}</span></div><div class="driver-filter-panel core-filter-panel"><input id="driverSearch" placeholder="Driver or team…" value="${esc(f.q||'')}" /><input id="driverCountrySearch" placeholder="Nationality…" value="${esc(f.country||'')}" /><select id="driverSeriesFilter">${seriesOptions.map(id=>`<option value="${id}" ${String(f.series||'all')===id?'selected':''}>${id==='all'?'All series':esc(SERIES[id]?.short||id)}</option>`).join('')}</select><input id="ageMin" type="number" min="0" placeholder="Age ≥" value="${esc(f.ageMin||'')}" /><input id="ageMax" type="number" min="0" placeholder="Age ≤" value="${esc(f.ageMax||'')}" /><input id="startsMin" type="number" min="0" placeholder="Starts ≥" value="${esc(f.startsMin||'')}" /><input id="winsMin" type="number" min="0" placeholder="Wins ≥" value="${esc(f.winsMin||'')}" /><input id="podiumsMin" type="number" min="0" placeholder="Podiums ≥" value="${esc(f.podiumsMin||'')}" /><input id="ppMin" type="number" min="0" placeholder="PP ≥" value="${esc(f.ppMin||'')}" /><input id="flMin" type="number" min="0" placeholder="FL ≥" value="${esc(f.flMin||'')}" /><input id="finishPctMin" type="number" min="0" max="100" placeholder="Finish % ≥" value="${esc(f.finishPctMin||'')}" /><button id="clearDriverFilters" class="mini-button">Clear</button></div><div class="driver-row header driver-row-core"><span>#</span>${sortButton('Name','name')}<span>Nationality</span>${sortButton('Age','age')}${sortButton('Starts','starts')}${sortButton('Wins','classWins')}${sortButton('Win %','winPctClass')}${sortButton('Podiums','classPodiums')}${sortButton('Pod %','podiumPctClass')}${sortButton('PP','ppTotal')}${sortButton('PP %','ppPct')}${sortButton('FL','flTotal')}${sortButton('FL %','flPct')}${sortButton('Finish %','finishPct')}<span></span></div><div id="driverRows">${rows||'<div class="empty-state">No drivers match current filters.</div>'}</div></section>${renderDriverHistory(selected)}</div>`;
  document.querySelectorAll('.driver-row[data-driver-key]').forEach(btn=>btn.onclick=()=>{const d=drivers.find(x=>x.key===btn.dataset.driverKey); if(d){state.selectedDriver=d.name;renderDataManager()}});
  document.querySelectorAll('.sort-head').forEach(btn=>btn.onclick=()=>{const key=btn.dataset.sort; if(state.driverSort.key===key)state.driverSort.dir=state.driverSort.dir==='asc'?'desc':'asc'; else state.driverSort={key,dir:key==='name'?'asc':'desc'};renderDataManager()});
  const update=(k,v)=>{const id=document.activeElement?.id||'';const pos=document.activeElement&&'selectionStart' in document.activeElement?document.activeElement.selectionStart:null;state.driverFilters={...(state.driverFilters||{}),[k]:v};renderDataManager();const el=$(id);if(el){el.focus();try{el.setSelectionRange(pos,pos)}catch{}}};
  [['driverSearch','q'],['driverCountrySearch','country'],['driverSeriesFilter','series'],['ageMin','ageMin'],['ageMax','ageMax'],['startsMin','startsMin'],['winsMin','winsMin'],['podiumsMin','podiumsMin'],['ppMin','ppMin'],['flMin','flMin'],['finishPctMin','finishPctMin']].forEach(([id,k])=>{const el=$(id);if(el)el.onchange=el.oninput=()=>update(k,el.value)});
  const clear=$('clearDriverFilters'); if(clear) clear.onclick=()=>{state.driverFilters={q:'',country:'',series:'all',ageMin:'',ageMax:'',startsMin:'',winsMin:'',podiumsMin:'',ppMin:'',flMin:'',finishPctMin:''};renderDataManager()};
  if(activeId){const el=$(activeId); if(el){el.focus();try{el.setSelectionRange(activeSel,activeSel)}catch{}}}
}

function renderAssets(){if(!$('assetStatus'))return;const groups=[['Series',Object.entries(SERIES).map(([id,s])=>({type:'series',id,name:s.short,path:s.logo}))],['Constructors',CONSTRUCTORS.map(c=>({type:'constructor',id:c.id,name:c.name,path:c.logo}))]];$('assetStatus').innerHTML=groups.map(([title,items])=>`<div class="asset-section">${title}</div>`+items.map(item=>assetRow(item)).join('')).join('')}
function assetRow(item){const key=`${item.type}:${item.id}`;const pack=String(item.path||'').includes('assetpack');const label=state.assets[key]?'uploaded':(pack?'asset pack':'path/fallback');const cls=state.assets[key]||pack?'status-ok':'status-missing';return `<div class="asset-row"><div>${logo(item.type,item.id)}</div><span>${esc(item.name)}</span><span class="${cls}">${label}</span><label>Upload<input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" onchange="uploadAsset(event,'${item.type}','${item.id}')"></label></div>`}
function uploadAsset(ev,type,id){
  const f=ev.target.files[0];
  if(!f)return;
  const reader=new FileReader();
  reader.onload=async()=>{
    state.assets[`${type}:${id}`]=reader.result;
    await saveAssets();
    render();
  };
  reader.readAsDataURL(f);
}
function openAssetDb(){
  return new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)) return reject(new Error('IndexedDB unavailable'));
    const req=indexedDB.open('SCCAssetStorage',1);
    req.onupgradeneeded=()=>req.result.createObjectStore('kv');
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||new Error('IndexedDB open failed'));
  });
}
async function dbGet(key){
  const db=await openAssetDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('kv','readonly');
    const req=tx.objectStore('kv').get(key);
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}
async function dbSet(key,value){
  const db=await openAssetDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('kv','readwrite');
    tx.objectStore('kv').put(value,key);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error);
  });
}
async function loadAssets(){
  try{
    state.assets=await dbGet('assets')||{};
    if(!Object.keys(state.assets).length){
      const legacy=localStorage.getItem('sccAssetsV05');
      if(legacy){
        state.assets=JSON.parse(legacy)||{};
        await saveAssets();
        localStorage.removeItem('sccAssetsV05');
      }
    }
  }catch(e){
    try{state.assets=JSON.parse(localStorage.getItem('sccAssetsV05')||'{}')}catch{state.assets={}}
  }
}
async function saveAssets(){
  try{
    await dbSet('assets',state.assets);
  }catch(e){
    console.warn('IndexedDB asset save failed',e);
    alert('Asset storage failed. Use Export asset pack as a backup, or place logos directly into the assets folders.');
  }
}
function exportAssets(){download(new Blob([JSON.stringify(state.assets,null,2)],{type:'application/json'}),'scc_asset_pack.json')}
function importAssets(e){
  const f=e.target.files[0];
  if(!f)return;
  const r=new FileReader();
  r.onload=async()=>{
    try{
      state.assets=JSON.parse(r.result)||{};
      await saveAssets();
      render();
    }catch{alert('Invalid asset pack')}
  };
  r.readAsText(f);
}
function exportRace(){download(new Blob([JSON.stringify(state.race,null,2)],{type:'application/json'}),`${state.race.id}.json`)}
function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
document.addEventListener('DOMContentLoaded',init);

/* v0.7.0 database core patch: global database metrics, editable DOB, rates */
function statusIsFinished(status){
  const s=String(status||'Classified').toLowerCase();
  return !/(dnf|ret|dns|dsq|nc|excluded|not classified|withdrawn)/.test(s);
}
function pct(n,d){return d?((100*n/d).toFixed(n && (100*n/d)<10?1:0)+'%'):'—'}
function pctNum(n,d){return d?100*n/d:0}
function metricPair(label,o,c,den){return `<div class="metric-pair"><span>${esc(label)}</span><strong><b>${esc(o)}</b><em>overall</em></strong><strong><b>${esc(c)}</b><em>class</em></strong>${den?`<small>${pct(o,den)} / ${pct(c,den)}</small>`:''}</div>`}
function statBox2(label,value,sub=''){return `<div><span>${esc(label)}</span><strong>${esc(value)}</strong>${sub?`<em>${esc(sub)}</em>`:''}</div>`}
function databaseRaces(){return (RACES||[]).filter(r=>Array.isArray(r.entries)&&r.entries.length)}
function driverRecords(){
  const map=new Map();
  const addPerf=(r,p,type)=>{
    if(!p||!p.driver) return;
    const key=normalizeDriverName(p.driver); if(!map.has(key)) return;
    const d=map.get(key); const cls=String(p.class||'').toLowerCase()==='overall'?'overall':'class';
    const uniq=`${r.id}|${type}|${cls}|${p.no||''}|${p.driver||''}|${p.time||''}`;
    d._perfSeen??=new Set(); if(d._perfSeen.has(uniq)) return; d._perfSeen.add(uniq);
    const serId=r.series||'unknown'; let sx=d.series.get(serId); if(!sx){sx={starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0};d.series.set(serId,sx)}
    if(type==='pp'){ if(cls==='overall'){d.polesOverall++;sx.polesOverall++} else {d.polesClass++;sx.polesClass++} }
    if(type==='fl'){ if(cls==='overall'){d.fastestOverall++;sx.fastestOverall++} else {d.fastestClass++;sx.fastestClass++} }
  };
  databaseRaces().forEach(r=>{
    const ranks=classRanksForRace(r);
    (r.entries||[]).forEach(e=>{
      (e.drivers||[]).forEach(drv=>{
        const rawName=resolveDriverFullName(drv[0]); if(!rawName) return;
        const key=normalizeDriverName(rawName);
        const country=drv[1]||lookupDriverCountry(rawName)||'';
        if(!map.has(key)) map.set(key,{key,name:rawName,country,dob:driverDob(rawName),records:[],classes:new Set(),teams:new Set(),constructors:new Set(),series:new Map(),overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0,finishes:0});
        const x=map.get(key);
        if(!x.country && country) x.country=country;
        if(!x.dob) x.dob=driverDob(rawName);
        const classList=ranks[e.class]||[];
        const cpos=e.__historyClassPos || (classList.findIndex(z=>z.no===e.no)+1) || e.classPos || 0;
        const rec={race:r,entry:e,classPos:cpos,overallPos:e.pos||0,finished:statusIsFinished(e.status)};
        x.records.push(rec); x.classes.add(e.class); x.teams.add(e.team); x.constructors.add(e.constructor||'');
        const ser=r.series||'unknown';
        if(!x.series.has(ser)) x.series.set(ser,{starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0});
        const sx=x.series.get(ser); sx.starts++;
        if(rec.finished){x.finishes++;sx.finishes++}
        if((rec.overallPos||0)===1){x.overallWins++;sx.overallWins++}
        if((rec.overallPos||0)>0 && (rec.overallPos||0)<=3){x.overallPodiums++;sx.overallPodiums++}
        if(cpos===1){x.classWins++;sx.classWins++}
        if(cpos>0 && cpos<=3){x.classPodiums++;sx.classPodiums++}
      });
    });
    (r.performance?.poles||[]).forEach(p=>addPerf(r,p,'pp'));
    (r.performance?.fastestLaps||[]).forEach(p=>addPerf(r,p,'fl'));
  });
  return [...map.values()].map(d=>{
    const starts=d.records.length;
    const ppTotal=d.polesOverall+d.polesClass, flTotal=d.fastestOverall+d.fastestClass;
    return {...d,
      starts, wins:d.classWins, podiums:d.classPodiums, age:driverAge(d.name), ppTotal, flTotal,
      winPctClass:pctNum(d.classWins,starts), winPctOverall:pctNum(d.overallWins,starts),
      podiumPctClass:pctNum(d.classPodiums,starts), podiumPctOverall:pctNum(d.overallPodiums,starts),
      ppPct:pctNum(ppTotal,starts), flPct:pctNum(flTotal,starts), finishPct:pctNum(d.finishes,starts),
      records:d.records.sort((a,b)=>String(b.race.date).localeCompare(String(a.race.date))),
      seriesStats:[...d.series.entries()].map(([id,v])=>({id,...v,wins:v.classWins,podiums:v.classPodiums,poles:v.polesOverall+v.polesClass,fastest:v.fastestOverall+v.fastestClass,finishPct:pctNum(v.finishes,v.starts)}))
    };
  });
}
function renderDriverHistory(d){
  if(!d) return `<section class="driver-detail-panel"><div class="empty-state">Select a driver to see race history.</div></section>`;
  const best=d.records.reduce((a,r)=>Math.min(a,r.classPos||999),999);
  const rows=d.records.map(({race,entry,classPos,overallPos})=>`<tr><td>${esc(new Date(race.date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}))}</td><td>${esc(SERIES[race.series]?.short||race.series)}</td><td>${esc(race.event)}</td><td>${esc(entry.team)}</td><td>${esc(entry.model||constructorMeta(entry.constructor).name)}</td><td>${classBadge(entry.class)}</td><td>P${esc(overallPos||'—')}</td><td><strong>C${esc(classPos||'—')}</strong></td><td>${classPos===1?'Class win':classPos<=3?'Class podium':esc(entry.status||'Classified')}</td></tr>`).join('');
  return `<section class="driver-detail-panel db-core-detail"><div class="driver-detail-head"><div class="driver-avatar">${esc(d.name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase())}</div><div><h3>${esc(d.name)} ${d.country?flag(d.country):''}</h3><p>${esc([...d.classes].join(', '))}</p><div class="driver-birth driver-birth-edit driver-edit-grid"><label>Country <input id="driverCountryInput" value="${esc(d.country||'')}" placeholder="Country" /></label><label>Born <input id="driverDobInput" type="date" value="${esc(d.dob||'')}" /></label><button class="mini-button" onclick="saveDriverCountryForSelected();saveDriverDobForSelected()">Save</button><span>${d.age?`Age ${esc(d.age)}`:'age unavailable'}</span></div></div></div>
  <div class="driver-kpis driver-kpis-wide core-kpis">
    ${statBox2('Starts',d.starts,`${d.finishes} finished · ${pct(d.finishes,d.starts)}`)}
    ${metricPair('Wins',d.overallWins,d.classWins,d.starts)}
    ${metricPair('Podiums',d.overallPodiums,d.classPodiums,d.starts)}
    ${metricPair('Pole positions',d.polesOverall,d.polesClass,d.starts)}
    ${metricPair('Fastest laps',d.fastestOverall,d.fastestClass,d.starts)}
    ${statBox2('Finish rate',pct(d.finishes,d.starts),'classified finishes')}
    ${statBox2('Best class result',best<999?'C'+best:'—','best finish in class')}
  </div>
  <h4>By series</h4><div class="series-stat-pills series-stat-pills-detailed">${d.seriesStats.map(s=>`<div><strong>${esc(SERIES[s.id]?.short||s.id)}</strong><span>${s.starts} starts · finish ${pct(s.finishes,s.starts)} · wins O/C ${s.overallWins}/${s.classWins} · podiums O/C ${s.overallPodiums}/${s.classPodiums} · PP O/C ${s.polesOverall}/${s.polesClass} · FL O/C ${s.fastestOverall}/${s.fastestClass}</span></div>`).join('')}</div>
  <h4>Race history</h4><div class="history-table-wrap"><table class="history-table"><thead><tr><th>Date</th><th>Series</th><th>Race</th><th>Team</th><th>Car</th><th>Class</th><th>Overall</th><th>Class</th><th>Result</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
}
function sortDrivers(list){
  const {key,dir}=state.driverSort||{key:'starts',dir:'desc'}; const mul=dir==='asc'?1:-1;
  return [...list].sort((a,b)=>{const av=key==='name'?a.name:(key==='age'?(Number(a.age)||-1):(Number(a[key])||0)); const bv=key==='name'?b.name:(key==='age'?(Number(b.age)||-1):(Number(b[key])||0)); if(typeof av==='string') return mul*av.localeCompare(String(bv)); return mul*(av-bv)||a.name.localeCompare(b.name);});
}
function filterDrivers(list){
  const f=state.driverFilters||{};
  return list.filter(d=>{const q=String(f.q||'').toLowerCase(); if(q&&!(d.name.toLowerCase().includes(q)||String(d.country||'').toLowerCase().includes(q)||[...d.teams].join(' ').toLowerCase().includes(q))) return false; if(f.series&&f.series!=='all'&&!d.series.has(f.series)) return false; const age=Number(d.age)||0; if(f.ageMin&&(!age||age<Number(f.ageMin))) return false; if(f.ageMax&&(!age||age>Number(f.ageMax))) return false; if(f.startsMin&&d.starts<Number(f.startsMin)) return false; if(f.winsMin&&(d.overallWins+d.classWins)<Number(f.winsMin)) return false; if(f.podiumsMin&&(d.overallPodiums+d.classPodiums)<Number(f.podiumsMin)) return false; if(f.ppMin&&d.ppTotal<Number(f.ppMin)) return false; if(f.flMin&&d.flTotal<Number(f.flMin)) return false; if(f.finishPctMin&&d.finishPct<Number(f.finishPctMin)) return false; return true;});
}
function renderDriversManager(){
  const all=driverRecords(); const seriesOptions=['all',...Object.keys(SERIES).filter(id=>all.some(d=>d.series.has(id)))]; const filtered=filterDrivers(all); const drivers=sortDrivers(filtered); if(!state.selectedDriver&&drivers.length)state.selectedDriver=drivers[0].name; const selected=all.find(d=>d.name===state.selectedDriver)||drivers[0]; const f=state.driverFilters||{};
  const rows=drivers.map((d,i)=>`<button class="driver-row driver-row-core ${selected?.name===d.name?'active':''}" data-driver-key="${esc(d.key)}"><span class="driver-rank">${i+1}</span><strong>${esc(d.name)}</strong><span>${d.country?flag(d.country):''} ${esc(d.country||'')}</span><span>${esc(d.age||'—')}</span><span>${d.starts}</span><span>${d.overallWins}/${d.classWins}</span><span>${pct(d.overallWins+d.classWins,d.starts)}</span><span>${d.overallPodiums}/${d.classPodiums}</span><span>${pct(d.overallPodiums+d.classPodiums,d.starts)}</span><span>${d.polesOverall}/${d.polesClass}</span><span>${pct(d.ppTotal,d.starts)}</span><span>${d.fastestOverall}/${d.fastestClass}</span><span>${pct(d.flTotal,d.starts)}</span><span>${pct(d.finishes,d.starts)}</span><span>›</span></button>`).join('');
  $('dataManager').innerHTML=`<div class="driver-manager-layout driver-manager-advanced driver-manager-core"><section class="driver-list-panel"><div class="data-subhead"><h3>Drivers</h3><span class="muted">${drivers.length} / ${all.length}</span></div><div class="driver-filter-panel core-filter-panel"><input id="driverSearch" placeholder="Search drivers, teams, country…" value="${esc(f.q||'')}" /><select id="driverSeriesFilter">${seriesOptions.map(id=>`<option value="${id}" ${String(f.series||'all')===id?'selected':''}>${id==='all'?'All series':esc(SERIES[id]?.short||id)}</option>`).join('')}</select><input id="ageMin" type="number" min="0" placeholder="Age ≥" value="${esc(f.ageMin||'')}" /><input id="ageMax" type="number" min="0" placeholder="Age ≤" value="${esc(f.ageMax||'')}" /><input id="startsMin" type="number" min="0" placeholder="Starts ≥" value="${esc(f.startsMin||'')}" /><input id="winsMin" type="number" min="0" placeholder="Wins ≥" value="${esc(f.winsMin||'')}" /><input id="podiumsMin" type="number" min="0" placeholder="Podiums ≥" value="${esc(f.podiumsMin||'')}" /><input id="ppMin" type="number" min="0" placeholder="PP ≥" value="${esc(f.ppMin||'')}" /><input id="flMin" type="number" min="0" placeholder="FL ≥" value="${esc(f.flMin||'')}" /><input id="finishPctMin" type="number" min="0" max="100" placeholder="Finish % ≥" value="${esc(f.finishPctMin||'')}" /><button id="clearDriverFilters" class="mini-button">Clear</button></div><div class="driver-row header driver-row-core"><span>#</span>${sortButton('Name','name')}<span>Nationality</span>${sortButton('Age','age')}${sortButton('Starts','starts')}${sortButton('Wins','classWins')}${sortButton('Win %','winPctClass')}${sortButton('Podiums','classPodiums')}${sortButton('Pod %','podiumPctClass')}${sortButton('PP','ppTotal')}${sortButton('PP %','ppPct')}${sortButton('FL','flTotal')}${sortButton('FL %','flPct')}${sortButton('Finish %','finishPct')}<span></span></div><div id="driverRows">${rows||'<div class="empty-state">No drivers match current filters.</div>'}</div></section>${renderDriverHistory(selected)}</div>`;
  document.querySelectorAll('.driver-row[data-driver-key]').forEach(btn=>btn.onclick=()=>{const d=drivers.find(x=>x.key===btn.dataset.driverKey); if(d){state.selectedDriver=d.name;renderDataManager()}}); document.querySelectorAll('.sort-head').forEach(btn=>btn.onclick=()=>{const key=btn.dataset.sort; if(state.driverSort.key===key)state.driverSort.dir=state.driverSort.dir==='asc'?'desc':'asc'; else state.driverSort={key,dir:key==='name'?'asc':'desc'};renderDataManager()}); const update=(k,v)=>{state.driverFilters={...(state.driverFilters||{}),[k]:v};renderDataManager()}; [['driverSearch','q'],['driverSeriesFilter','series'],['ageMin','ageMin'],['ageMax','ageMax'],['startsMin','startsMin'],['winsMin','winsMin'],['podiumsMin','podiumsMin'],['ppMin','ppMin'],['flMin','flMin'],['finishPctMin','finishPctMin']].forEach(([id,k])=>{const el=$(id);if(el)el.onchange=el.oninput=()=>update(k,el.value)}); const clear=$('clearDriverFilters'); if(clear) clear.onclick=()=>{state.driverFilters={q:'',series:'all',ageMin:'',ageMax:'',startsMin:'',winsMin:'',podiumsMin:'',ppMin:'',flMin:'',finishPctMin:''};renderDataManager()};
}

/* --- SCC v0.7.6 database repair: global archive DB + stable UI --- */
function sccDatabaseRaces(){
  return (window.RACES || (typeof RACES!=='undefined'?RACES:[]) || []).filter(r=>Array.isArray(r.entries) && r.entries.length);
}
function sccNormId(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'unknown'}
function sccEntryStatus(e){return String(e?.status||e?.classification||'FIN').toUpperCase()}
function sccIsClassified(e){
  const s=sccEntryStatus(e).toLowerCase();
  const gap=String(e?.gap||'').toLowerCase();
  return !/(ret|dnf|dns|dsq|nc|not classified|excluded|withdrawn)/.test(s+' '+gap);
}
function databaseRaces(){return sccDatabaseRaces()}
function sccSeriesIdsFromRaces(){return [...new Set(databaseRaces().map(r=>r.series).filter(Boolean))]}
function sccEnsureDriverCountry(name,country){
  if(name && country) try{ setDriverCountry(name,country) }catch(e){}
}
function sccLearnArchiveCountries(){
  databaseRaces().forEach(r=>(r.entries||[]).forEach(e=>(e.drivers||[]).forEach(d=>sccEnsureDriverCountry(d?.[0],d?.[1]))));
}
function driverRecords(){
  sccLearnArchiveCountries();
  const map=new Map();
  const getRec=(rawName,country)=>{
    const name=resolveDriverFullName(String(rawName||'').trim()); if(!name) return null;
    const key=normalizeDriverName(name);
    const c=country||lookupDriverCountry(name)||'';
    if(!map.has(key)) map.set(key,{key,name,country:c,dob:driverDob(name),records:[],classes:new Set(),teams:new Set(),constructors:new Set(),series:new Map(),overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0,finishes:0});
    const d=map.get(key);
    if(!d.country && c) d.country=c;
    if(!d.dob) d.dob=driverDob(name);
    return d;
  };
  const incSeries=(d,seriesId,field)=>{
    const sid=seriesId||'unknown';
    if(!d.series.has(sid)) d.series.set(sid,{starts:0,finishes:0,overallWins:0,classWins:0,overallPodiums:0,classPodiums:0,polesOverall:0,polesClass:0,fastestOverall:0,fastestClass:0});
    d.series.get(sid)[field]++;
  };
  databaseRaces().forEach(r=>{
    const classGroups={};
    (r.entries||[]).forEach(e=>{const cls=e.class||'UNKNOWN'; (classGroups[cls]??=[]).push(e)});
    Object.values(classGroups).forEach(arr=>arr.sort((a,b)=>(Number(a.pos)||9999)-(Number(b.pos)||9999)||String(a.no).localeCompare(String(b.no))).forEach((e,i)=>e.__sccClassPos=e.classPos||e.__historyClassPos||i+1));
    (r.entries||[]).forEach(e=>{
      (e.drivers||[]).forEach(drv=>{
        const d=getRec(drv?.[0],drv?.[1]); if(!d) return;
        const classPos=e.__sccClassPos||e.classPos||0;
        const overallPos=Number(e.pos)||0;
        const rec={race:r,entry:e,classPos,overallPos,classified:sccIsClassified(e)};
        d.records.push(rec);
        d.classes.add(e.class||'UNKNOWN'); d.teams.add(e.team||''); d.constructors.add(e.constructor||'');
        incSeries(d,r.series,'starts');
        if(rec.classified){d.finishes++; incSeries(d,r.series,'finishes')}
        if(overallPos===1){d.overallWins++; incSeries(d,r.series,'overallWins')}
        if(overallPos>0 && overallPos<=3){d.overallPodiums++; incSeries(d,r.series,'overallPodiums')}
        if(classPos===1){d.classWins++; incSeries(d,r.series,'classWins')}
        if(classPos>0 && classPos<=3){d.classPodiums++; incSeries(d,r.series,'classPodiums')}
      });
    });
    const addPerf=(p,type)=>{
      if(!p||!p.driver) return;
      const d=getRec(p.driver, lookupDriverCountry(p.driver)); if(!d) return;
      const overall=String(p.class||'').toLowerCase()==='overall';
      const own=type==='pp'?(overall?'polesOverall':'polesClass'):(overall?'fastestOverall':'fastestClass');
      d[own]++; incSeries(d,r.series,own);
    };
    (r.performance?.poles||[]).forEach(p=>addPerf(p,'pp'));
    (r.performance?.fastestLaps||[]).forEach(p=>addPerf(p,'fl'));
  });
  return [...map.values()].map(d=>{
    const starts=d.records.length;
    const ppTotal=d.polesOverall+d.polesClass, flTotal=d.fastestOverall+d.fastestClass;
    return {...d, starts, wins:d.classWins, podiums:d.classPodiums, age:driverAge(d.name), ppTotal, flTotal,
      winPctClass:pctNum(d.classWins,starts), winPctOverall:pctNum(d.overallWins,starts),
      podiumPctClass:pctNum(d.classPodiums,starts), podiumPctOverall:pctNum(d.overallPodiums,starts),
      ppPct:pctNum(ppTotal,starts), flPct:pctNum(flTotal,starts), finishPct:pctNum(d.finishes,starts),
      records:d.records.sort((a,b)=>String(b.race.date).localeCompare(String(a.race.date)) || (Number(a.overallPos)||999)-(Number(b.overallPos)||999)),
      seriesStats:[...d.series.entries()].map(([id,v])=>({id,...v,wins:v.classWins,podiums:v.classPodiums,poles:v.polesOverall+v.polesClass,fastest:v.fastestOverall+v.fastestClass,finishPct:pctNum(v.finishes,v.starts)})).sort((a,b)=>a.id.localeCompare(b.id))
    };
  });
}
function sccTeamRecords(){
  const map=new Map();
  databaseRaces().forEach(r=>(r.entries||[]).forEach(e=>{
    const name=e.team||'Unknown team', key=sccNormId(name); if(!map.has(key)) map.set(key,{key,name,starts:0,wins:0,podiums:0,classes:new Set(),series:new Set(),constructors:new Set(),records:[]});
    const t=map.get(key); t.starts++; t.classes.add(e.class||''); t.series.add(r.series||''); t.constructors.add(e.constructor||''); t.records.push({race:r,entry:e});
    if(Number(e.pos)===1)t.wins++; if(Number(e.pos)>0&&Number(e.pos)<=3)t.podiums++;
  }));
  return [...map.values()].sort((a,b)=>b.starts-a.starts||a.name.localeCompare(b.name));
}
function sccConstructorRecords(){
  const map=new Map();
  databaseRaces().forEach(r=>(r.entries||[]).forEach(e=>{
    const id=e.constructor||'unknown', meta=constructorMeta(id), key=id; if(!map.has(key)) map.set(key,{key,id,name:meta.name||id,starts:0,wins:0,podiums:0,classes:new Set(),series:new Set(),models:new Set(),records:[]});
    const c=map.get(key); c.starts++; c.classes.add(e.class||''); c.series.add(r.series||''); c.models.add(e.model||meta.name||id); c.records.push({race:r,entry:e});
    if(Number(e.pos)===1)c.wins++; if(Number(e.pos)>0&&Number(e.pos)<=3)c.podiums++;
  }));
  return [...map.values()].sort((a,b)=>b.starts-a.starts||a.name.localeCompare(b.name));
}
function sccCircuitRecords(){
  const map=new Map();
  databaseRaces().forEach(r=>{
    const name=r.circuit||r.event||'Unknown circuit', key=sccNormId(name); if(!map.has(key)) map.set(key,{key,name,country:r.country||'',races:0,series:new Set(),events:[],avgLaps:0});
    const c=map.get(key); c.races++; c.series.add(r.series||''); c.events.push(r); c.avgLaps+=Number(r.officialLaps||r.scheduledLaps||0);
  });
  return [...map.values()].map(c=>({...c,avgLaps:c.races?Math.round(c.avgLaps/c.races):0})).sort((a,b)=>b.races-a.races||a.name.localeCompare(b.name));
}
function saveDriverCountryForSelected(){
  const name=state.selectedDriver, input=$('driverCountryInput');
  if(!name||!input) return;
  const val=input.value.trim();
  if(val) setDriverCountry(name,val);
  renderDataManager();
}
window.saveDriverCountryForSelected=saveDriverCountryForSelected;
function sccDbCounts(){
  return {drivers:driverRecords().length,teams:sccTeamRecords().length,constructors:sccConstructorRecords().length,circuits:sccCircuitRecords().length,races:databaseRaces().length,series:sccSeriesIdsFromRaces().length};
}
function renderDataManager(){
  const el=$('dataManager'); if(!el) return;
  syncDatabaseNav();
  if(state.dataTab==='teams') return renderTeamsManager();
  if(state.dataTab==='constructors') return renderConstructorsManager();
  if(state.dataTab==='circuits') return renderCircuitsManager();
  return renderDriversManager();
}
function renderDbDiagnostics(){
  const c=sccDbCounts();
  return `<div class="db-diagnostics"><span>Archive DB</span><strong>${c.drivers}</strong><em>drivers</em><strong>${c.teams}</strong><em>teams</em><strong>${c.constructors}</strong><em>constructors</em><strong>${c.circuits}</strong><em>circuits</em><button id="rebuildDbBtn" class="mini-button">↻ Rebuild</button></div>`;
}
function renderDriversManager(){
  const activeId=document.activeElement?.id||'';
  const activeSel=document.activeElement&&'selectionStart' in document.activeElement?document.activeElement.selectionStart:null;
  const all=driverRecords();
  const seriesOptions=['all',...sccSeriesIdsFromRaces().filter(id=>all.some(d=>d.series.has(id)))];
  const filtered=filterDrivers(all);
  const drivers=sortDrivers(filtered);
  if((!state.selectedDriver || !all.some(d=>d.name===state.selectedDriver)) && drivers.length) state.selectedDriver=drivers[0].name;
  const selected=all.find(d=>d.name===state.selectedDriver)||drivers[0];
  const f=state.driverFilters||{};
  const rows=drivers.map((d,i)=>`<button class="driver-row driver-row-core ${selected?.key===d.key?'active':''}" data-driver-key="${esc(d.key)}"><span class="driver-rank">${i+1}</span><strong>${esc(d.name)}</strong><span>${d.country?flag(d.country):''} ${esc(d.country||'')}</span><span>${esc(d.age||'—')}</span><span>${d.starts}</span><span>${d.overallWins}/${d.classWins}</span><span>${pct(d.overallWins+d.classWins,d.starts)}</span><span>${d.overallPodiums}/${d.classPodiums}</span><span>${pct(d.overallPodiums+d.classPodiums,d.starts)}</span><span>${d.polesOverall}/${d.polesClass}</span><span>${pct(d.ppTotal,d.starts)}</span><span>${d.fastestOverall}/${d.fastestClass}</span><span>${pct(d.flTotal,d.starts)}</span><span>${pct(d.finishes,d.starts)}</span><span>›</span></button>`).join('');
  $('dataManager').innerHTML=`${renderDbDiagnostics()}<div class="driver-manager-layout driver-manager-advanced driver-manager-core database-drawer-layout"><section class="driver-list-panel"><div class="data-subhead"><h3>Drivers</h3><span class="muted">${drivers.length} / ${all.length}</span></div><div class="driver-filter-panel core-filter-panel"><input id="driverSearch" placeholder="Driver or team…" value="${esc(f.q||'')}" /><input id="driverCountrySearch" placeholder="Nationality…" value="${esc(f.country||'')}" /><select id="driverSeriesFilter">${seriesOptions.map(id=>`<option value="${id}" ${String(f.series||'all')===id?'selected':''}>${id==='all'?'All series':esc(SERIES[id]?.short||id)}</option>`).join('')}</select><input id="ageMin" type="number" min="0" placeholder="Age ≥" value="${esc(f.ageMin||'')}" /><input id="ageMax" type="number" min="0" placeholder="Age ≤" value="${esc(f.ageMax||'')}" /><input id="startsMin" type="number" min="0" placeholder="Starts ≥" value="${esc(f.startsMin||'')}" /><input id="winsMin" type="number" min="0" placeholder="Wins ≥" value="${esc(f.winsMin||'')}" /><input id="podiumsMin" type="number" min="0" placeholder="Podiums ≥" value="${esc(f.podiumsMin||'')}" /><input id="ppMin" type="number" min="0" placeholder="PP ≥" value="${esc(f.ppMin||'')}" /><input id="flMin" type="number" min="0" placeholder="FL ≥" value="${esc(f.flMin||'')}" /><input id="finishPctMin" type="number" min="0" max="100" placeholder="Finish % ≥" value="${esc(f.finishPctMin||'')}" /><button id="clearDriverFilters" class="mini-button">Clear</button></div><div class="driver-row header driver-row-core"><span>#</span>${sortButton('Name','name')}<span>Nationality</span>${sortButton('Age','age')}${sortButton('Starts','starts')}${sortButton('Wins','classWins')}${sortButton('Win %','winPctClass')}${sortButton('Podiums','classPodiums')}${sortButton('Pod %','podiumPctClass')}${sortButton('PP','ppTotal')}${sortButton('PP %','ppPct')}${sortButton('FL','flTotal')}${sortButton('FL %','flPct')}${sortButton('Finish %','finishPct')}<span></span></div><div id="driverRows">${rows||'<div class="empty-state">No drivers match current filters.</div>'}</div></section>${renderDriverHistory(selected)}</div>`;
  document.querySelectorAll('.driver-row[data-driver-key]').forEach(btn=>btn.onclick=()=>{const d=drivers.find(x=>x.key===btn.dataset.driverKey); if(d){state.selectedDriver=d.name;renderDataManager()}});
  document.querySelectorAll('.sort-head').forEach(btn=>btn.onclick=()=>{const key=btn.dataset.sort; if(state.driverSort.key===key)state.driverSort.dir=state.driverSort.dir==='asc'?'desc':'asc'; else state.driverSort={key,dir:key==='name'?'asc':'desc'};renderDataManager()});
  const update=(k,v)=>{const id=document.activeElement?.id||'';const pos=document.activeElement&&'selectionStart' in document.activeElement?document.activeElement.selectionStart:null;state.driverFilters={...(state.driverFilters||{}),[k]:v};renderDataManager();const el=$(id);if(el){el.focus();try{el.setSelectionRange(pos,pos)}catch{}}};
  [['driverSearch','q'],['driverCountrySearch','country'],['driverSeriesFilter','series'],['ageMin','ageMin'],['ageMax','ageMax'],['startsMin','startsMin'],['winsMin','winsMin'],['podiumsMin','podiumsMin'],['ppMin','ppMin'],['flMin','flMin'],['finishPctMin','finishPctMin']].forEach(([id,k])=>{const x=$(id); if(x) x.oninput=x.onchange=()=>update(k,x.value)});
  const clear=$('clearDriverFilters'); if(clear) clear.onclick=()=>{state.driverFilters={q:'',country:'',series:'all',ageMin:'',ageMax:'',startsMin:'',winsMin:'',podiumsMin:'',ppMin:'',flMin:'',finishPctMin:''};renderDataManager()};
  const rb=$('rebuildDbBtn'); if(rb) rb.onclick=()=>{sccLearnArchiveCountries();renderDataManager()};
  if(activeId){const x=$(activeId);if(x){x.focus();try{x.setSelectionRange(activeSel,activeSel)}catch{}}}
}
function sccCards(items,kind){
  if(!items.length) return '<div class="empty-state">No records found.</div>';
  return `<div class="data-grid">${items.map(x=>`<div class="data-card"><div class="data-card-logo">${kind==='constructors'?logo('constructor',x.id):''}</div><strong>${esc(x.name)}</strong><span>${esc(x.starts??x.races??0)} ${kind==='circuits'?'races':'starts'} · wins ${esc(x.wins??0)} · podiums ${esc(x.podiums??0)}</span><em>${esc([...((x.series)||new Set())].map(id=>SERIES[id]?.short||id).join(' · '))}</em>${x.classes?`<em>${esc([...x.classes].filter(Boolean).join(', '))}</em>`:''}${x.country?`<em>${esc(x.country)}</em>`:''}</div>`).join('')}</div>`;
}
function renderTeamsManager(){ const items=sccTeamRecords(); $('dataManager').innerHTML=`${renderDbDiagnostics()}<section class="data-manager-panel"><div class="data-subhead"><h3>Teams</h3><span class="muted">${items.length}</span></div>${sccCards(items,'teams')}</section>`; const rb=$('rebuildDbBtn'); if(rb)rb.onclick=()=>renderDataManager(); }
function renderConstructorsManager(){ const items=sccConstructorRecords(); $('dataManager').innerHTML=`${renderDbDiagnostics()}<section class="data-manager-panel constructor-data"><div class="data-subhead"><h3>Constructors</h3><span class="muted">${items.length}</span></div>${sccCards(items,'constructors')}</section>`; const rb=$('rebuildDbBtn'); if(rb)rb.onclick=()=>renderDataManager(); }
function renderCircuitsManager(){ const items=sccCircuitRecords(); $('dataManager').innerHTML=`${renderDbDiagnostics()}<section class="data-manager-panel"><div class="data-subhead"><h3>Circuits</h3><span class="muted">${items.length}</span></div>${sccCards(items,'circuits')}</section>`; const rb=$('rebuildDbBtn'); if(rb)rb.onclick=()=>renderDataManager(); }
