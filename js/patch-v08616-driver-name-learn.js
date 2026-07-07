/* SCC v0.8.6.16: learn full driver names/countries from EVERY race in the archive, not just the
   built-in RACES array + whichever race happens to be selected. app.js's render() only calls
   learnDriverFullNames()/learnDriverCountries() on RACES and state.race, so a driver whose full
   name (or country) only appears in a SEPARATE saved/imported race - one the user isn't currently
   viewing - never gets learned: any other race showing that driver as initials-only
   ("V. Hasse-Clot") or country-less stays that way until the user happens to open the race with
   the full data first. Scanning every stored race up front, before the first render, closes that
   gap for Order/Summary/Dashboard (the Database tab already does this itself in buildDrivers()). */
(function(){
'use strict';
if(typeof window.learnDriverFullNames!=='function') return;
const arr=[];
if(typeof RACES!=='undefined'&&Array.isArray(RACES)) arr.push(...RACES);
else if(Array.isArray(window.RACES)) arr.push(...window.RACES);
try{const saved=JSON.parse(localStorage.getItem('scc_saved_races_v081')||'[]'); if(Array.isArray(saved))arr.push(...saved);}catch(e){}
try{const imported=JSON.parse(localStorage.getItem('scc_imported_races_v1')||'{}'); Object.values(imported).forEach(r=>{if(r&&r.id)arr.push(r);});}catch(e){}
arr.forEach(r=>{
  window.learnDriverFullNames(r.entries||[]);
  if(typeof window.learnDriverCountries==='function') window.learnDriverCountries(r.entries||[]);
});
})();
