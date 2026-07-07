/* SCC v0.8.6.18: fix misattributed bestLapDriver for 5 known AF Corse #83/#183 entries.
   The Al Kamel "Fastest Lap by Driver" PDF importer mis-parses these five races because
   François Perrodo is both the registered team entrant AND a driver on the same car -
   the entrant-name-vs-driver-name heuristic in importer.js's driverPairsFromLine() always
   attributes the car's fastest lap to him, even though he's actually the slowest of the
   crew every single time. Verified against the official FIA WEC / ELMS "Final Classification
   by Driver Fastest Lap" documents for all five races before writing this fix. Same
   localStorage-then-live-RACES double-patch as patch-v08617, for the same reason:
   mergeSavedRaces() (patch-v081) already overwrote RACES with the stale saved copy by the
   time a plain localStorage fix would run. */
(function(){
'use strict';
const CORRECTIONS={
  'wec-spa-2021':        [{no:'83',  correctSurname:'rovera'}],
  'wec-sebring-2022':    [{no:'83',  correctSurname:'rovera'}],
  'elms-barcelona-2025': [{no:'83',  correctSurname:'rovera'}],
  'wec-lemans-2025':     [{no:'183', correctSurname:'vaxiviere'}],
  'elms-barcelona-2026': [{no:'83',  correctSurname:'fuoco'}]
};
const DIACRITICS_RE=new RegExp('[̀-ͯ]','g');
function normSurname(name){
  if(!name) return '';
  const parts=String(name).trim().split(/\s+/);
  return parts[parts.length-1].toLowerCase().normalize('NFD').replace(DIACRITICS_RE,'');
}
function driverNames(e){
  return (e.drivers||[]).map(d=>Array.isArray(d)?d[0]:(d&&d.name)||d).filter(Boolean);
}
function fixEntry(e,wantSurname){
  const match=driverNames(e).find(n=>normSurname(n)===wantSurname);
  if(!match || e.bestLapDriver===match) return false;
  e.bestLapDriver=match;
  return true;
}
function repairRace(r){
  const fixes=r&&CORRECTIONS[r.id];
  if(!fixes || !Array.isArray(r.entries)) return false;
  let any=false;
  fixes.forEach(c=>{
    const e=r.entries.find(e=>String(e.no)===c.no);
    if(e && fixEntry(e,c.correctSurname)) any=true;
  });
  return any;
}
function repairStore(key,isMap){
  try{
    const raw=localStorage.getItem(key); if(!raw)return false;
    const data=JSON.parse(raw);
    let any=false;
    const list=isMap?Object.values(data||{}):(Array.isArray(data)?data:[]);
    list.forEach(r=>{ if(r&&repairRace(r))any=true; });
    if(any)localStorage.setItem(key,JSON.stringify(data));
    return any;
  }catch(e){ return false; }
}
function run(){
  repairStore('scc_saved_races_v081',false);
  repairStore('scc_imported_races_v1',true);
  const races=(typeof RACES!=='undefined'&&Array.isArray(RACES))?RACES:(Array.isArray(window.RACES)?window.RACES:[]);
  let changedLive=false;
  races.forEach(r=>{ if(repairRace(r))changedLive=true; });
  if(typeof state!=='undefined'&&state&&state.race&&repairRace(state.race))changedLive=true;
  if(changedLive&&typeof window.render==='function') window.render();
}
if(document.readyState==='complete'||document.readyState==='interactive') setTimeout(run,50);
else document.addEventListener('DOMContentLoaded',()=>setTimeout(run,50));
})();
