/* SCC v0.8.6.17: backfill missing officialDuration on already-saved/imported races.
   officialDuration falls back to scheduledDuration until it's set explicitly (import wizard's
   "Official" field, or a data.js fix like this one) - so a race saved to the local archive
   before that value existed keeps shadowing any later fix forever, since mergeSavedRaces()
   always prefers the saved copy over RACES and a browser refresh never touches localStorage.
   Every classified entry's raw "time" field is that car's own total elapsed race time (not just
   a gap), so the P1 (overall winner) entry's time IS the real official race duration - this
   recovers it from data that's already stored, without needing the original PDF again. */
(function(){
'use strict';
const DURATION_RE=/^\d{1,2}:\d{2}:\d{2}(\.\d+)?$/;
function officialFromEntries(entries){
  const classified=(entries||[]).filter(e=>Number(e.pos)>0 && DURATION_RE.test(String(e.time||'')));
  if(!classified.length) return '';
  const winner=classified.reduce((best,e)=>Number(e.pos)<Number(best.pos)?e:best);
  return winner.time;
}
function repairRaceIfDefaulted(r){
  if(!r) return false;
  if(r.officialDuration && r.officialDuration!==r.scheduledDuration) return false;
  const guess=officialFromEntries(r.entries);
  if(!guess || guess===r.officialDuration) return false;
  r.officialDuration=guess;
  return true;
}
function repairStore(key,isMap){
  try{
    const raw=localStorage.getItem(key); if(!raw)return false;
    const data=JSON.parse(raw);
    let any=false;
    const list=isMap?Object.values(data||{}):(Array.isArray(data)?data:[]);
    list.forEach(r=>{ if(r&&repairRaceIfDefaulted(r))any=true; });
    if(any)localStorage.setItem(key,JSON.stringify(data));
    return any;
  }catch(e){ return false; }
}
function run(){
  const changedStore=repairStore('scc_saved_races_v081',false)|repairStore('scc_imported_races_v1',true);
  // patch-v081's mergeSavedRaces() already ran (synchronously, on DOMContentLoaded, before this
  // setTimeout fires) and copied the stale saved race straight into the shared RACES array - so
  // the localStorage fix above alone won't show up until a SECOND reload. Patch the live RACES
  // array too, and the currently-selected race in state, so this takes effect immediately.
  const races=(typeof RACES!=='undefined'&&Array.isArray(RACES))?RACES:(Array.isArray(window.RACES)?window.RACES:[]);
  let changedLive=false;
  races.forEach(r=>{ if(repairRaceIfDefaulted(r))changedLive=true; });
  if(typeof state!=='undefined'&&state&&state.race&&repairRaceIfDefaulted(state.race))changedLive=true;
  if(changedLive&&typeof window.render==='function') window.render();
}
if(document.readyState==='complete'||document.readyState==='interactive') setTimeout(run,50);
else document.addEventListener('DOMContentLoaded',()=>setTimeout(run,50));
})();
