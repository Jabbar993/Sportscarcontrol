/* SCC v0.8.6.20: fills in bestLapDriver for entries that had flClassification data
   (a valid, fully-parsed per-driver lap list) but never had bestLapDriver computed on the
   entry at all - not a wrong value, an absent one. All three affected races (wec-spa-2018,
   wec-silverstone-2019, elms-barcelona-2025) predate this session's importer.js fixes; the
   value here is the same each car's own already-stored flClassification data would produce
   if re-imported today, reviewed race-by-race with the user before being written here. */
(function(){
'use strict';
const FILLS={"elms-barcelona-2025":{"3":"Laurents Hörr","4":"Wyatt Brichacek","8":"Daniel Nogales","9":"Maceo Capietto","10":"Vladislav Lomko","11":"Ian Aguilera","12":"Griffin Peebles","15":"Gillian Henrion","17":"Theodor Jensen","18":"Daniel Juncadella","20":"Alexander Quinn","21":"Oliver Jarvis","22":"Grégoire Saucy","23":"Wayne Boyd","24":"Ferdinand Habsburg","25":"Matthias Kaiser","27":"Sergio Sette Camara","28":"Paul Lafargue","29":"Mathias Beche","30":"Francesco Simonazzi","31":"Marius Fossard","34":"Luca Ghiotto","35":"Jean-Baptiste Lahaye","37":"Tom Blomqvist","43":"Jakub Smiechowski","47":"Enzo Fittipaldi","48":"Esteban Masson","50":"Riccardo Agostini","51":"Conrad Laursen","55":"David Perel","57":"Ben Tuck","59":"Clément Mateu","60":"Matteo Cressoni","63":"Lorcan Hanafin","66":"Gianmaria Bruni","68":"Quentin Antonel","74":"Miguel Molina","77":"Bent Viscaal","82":"Charlie Eastwood","85":"Sarah Bovy","86":"Riccardo Pera","88":"Reece Gold","99":"Louis Delétraz"},"wec-spa-2018":{"1":"André Lotterer","3":"Gustavo Menezes","4":"Tom Dillmann","7":"Mike Conway","8":"Sébastien Buemi","11":"Vitaly Petrov","17":"Egor Orudzhev","26":"Jean-Eric Vergne","28":"Matthieu Vaxiviere","29":"Giedo van der Garde","31":"Pastor Maldonado","36":"Nicolas Lapierre","37":"Jazeman Jaafar","38":"Ho-Pin Tung","50":"Julien Canal","51":"James Calado","54":"Giancarlo Fisichella","56":"Jörg Bergmeister","61":"Matthew Griffin","66":"Stefan Mücke","70":"Edward Cheever","71":"Davide Rigon","77":"Julien Andlauer","81":"Martin Tomczyk","82":"Felix da Costa","86":"Benjamin Barker","88":"Matteo Cairoli","90":"Euan Alers-Hankey","91":"Gianmaria Bruni","92":"Kevin Estre","95":"Nicki Thiim","97":"Alexander Lynn","98":"Pedro Lamy"},"wec-silverstone-2019":{"1":"Bruno Senna","3":"Loïc Duval","5":"Ben Hanley","6":"Michael Simpson","7":"Mike Conway","8":"Sébastien Buemi","29":"Giedo van der Garde","33":"Kenta Yamashita","36":"Thomas Laurent","37":"Ho-Pin Tung","38":"Felix da Costa","42":"Nicolas Lapierre","47":"Giorgio Sernagiotto","51":"James Calado","54":"Giancarlo Fisichella","56":"Matteo Cairoli","57":"Felipe Fraga","62":"Johnny Mowlem","70":"Kei Cozzolino","71":"Davide Rigon","77":"Matt Campbell","83":"Nicklas Nielsen","86":"Benjamin Barker","88":"Thomas Preining","90":"Charles Eastwood","91":"Richard Lietz","92":"Kevin Estre","95":"Marco Sørensen","97":"Alexander Lynn","98":"Ross Gunn"}};
function repairRace(r){
  const fixes=r&&FILLS[r.id];
  if(!fixes || !Array.isArray(r.entries)) return false;
  let any=false;
  Object.entries(fixes).forEach(([no,correctName])=>{
    const e=r.entries.find(e=>String(e.no)===no);
    if(e && !e.bestLapDriver){ e.bestLapDriver=correctName; any=true; }
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
