/* SCC v0.8.6.15: backfill missing entry.constructor on already-saved/imported races.
   constructorFromVehicle()'s recognized-brand list grows over time (e.g. isotta, maserati,
   dallara, nissan, bentley, jaguar were added after some races had already been imported), so
   entries imported before a brand was added were left with constructor:'' and fall back to the
   "?" placeholder logo forever. This re-derives the constructor for any entry that's missing one,
   once, at boot - it does not touch entries that already resolved correctly. */
(function(){
'use strict';
function repairRace(r){
  let changed=false;
  (r.entries||[]).forEach(e=>{
    if(!e.constructor && typeof window.constructorFromVehicle==='function'){
      const guess=window.constructorFromVehicle(e.model||e.team||'');
      if(guess){ e.constructor=guess; changed=true; }
    }
  });
  return changed;
}
function repairStore(key,isMap){
  try{
    const raw=localStorage.getItem(key); if(!raw)return;
    const data=JSON.parse(raw);
    let any=false;
    if(isMap){ Object.values(data||{}).forEach(r=>{ if(r&&repairRace(r))any=true; }); }
    else if(Array.isArray(data)){ data.forEach(r=>{ if(r&&repairRace(r))any=true; }); }
    if(any)localStorage.setItem(key,JSON.stringify(data));
  }catch(e){}
}
function run(){ repairStore('scc_saved_races_v081',false); repairStore('scc_imported_races_v1',true); }
if(document.readyState==='complete'||document.readyState==='interactive') setTimeout(run,50);
else document.addEventListener('DOMContentLoaded',()=>setTimeout(run,50));
})();
