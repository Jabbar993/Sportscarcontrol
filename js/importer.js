/* SCC Importer — single Al Kamel Systems PDF importer.
   Replaces patch-v08612/13/15/17/21. Scope: Race Classification, Fastest Laps,
   Qualifying/Hyperpole PDFs -> replaceRace(). Race Control stays manual (project rule).
   Row parsing is structural (position/car-number/class token pattern), not dependent on
   an exact heading phrase, and supports the full class vocabulary from SERIES in data.js
   so WEC, ELMS, Asian LMS, MLMC and IMSA-style documents are all in scope, not just
   WEC Hypercar/LMGT3.
*/
(function(){
  if(window.__SCC_IMPORTER__) return;
  window.__SCC_IMPORTER__=true;

  const $=id=>document.getElementById(id);
  const E=window.esc||(s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));

  // ---------- persistence ----------
  // RACES resets to the js/data.js seed on every page load - nothing survives a refresh
  // unless it's separately written somewhere. localStorage is the only storage available to
  // a static, backend-less app, so imported races are saved there automatically (no extra
  // "Save" button/step) and merged back in as early as possible - at script-parse time,
  // before app.js's own DOMContentLoaded/init() clones RACES[0] into state.race, so the very
  // first render already reflects anything imported in an earlier session.
  const RACE_STORAGE_KEY='scc_imported_races_v1';
  const OLD_RACE_STORAGE_KEY='scc_saved_races_v081'; // migrate any races saved by the old (now-disabled) button
  function persistRace(race){
    try{
      const saved=JSON.parse(localStorage.getItem(RACE_STORAGE_KEY)||'{}');
      saved[race.id]=race;
      localStorage.setItem(RACE_STORAGE_KEY,JSON.stringify(saved));
    }catch(e){ console.warn('SCC importer: could not persist race to localStorage',e); }
  }
  // One-time cleanup for races imported under an id that got renamed later in js/data.js
  // (imsa-lagunaseca-2026 was an early stopgap id for the 2026 Laguna Seca round; the
  // permanent skeleton slot is imsa-laguna-2026, so real imports are moved onto it here
  // to avoid a duplicate/orphaned dropdown entry).
  const LEGACY_ID_RENAMES={'imsa-lagunaseca-2026':'imsa-laguna-2026'};
  function migrateLegacyRaceIds(){
    try{
      const saved=JSON.parse(localStorage.getItem(RACE_STORAGE_KEY)||'{}');
      let changed=false;
      Object.keys(LEGACY_ID_RENAMES).forEach(oldId=>{
        if(saved[oldId]){
          const newId=LEGACY_ID_RENAMES[oldId];
          const race=saved[oldId];
          race.id=newId;
          delete saved[oldId];
          saved[newId]=race;
          changed=true;
        }
      });
      if(saved['imsa-laguna-2026'] && saved['imsa-laguna-2026'].event==='WeatherTech Raceway Laguna Seca'){
        saved['imsa-laguna-2026'].event='Monterey SportsCar Championship';
        changed=true;
      }
      if(changed) localStorage.setItem(RACE_STORAGE_KEY,JSON.stringify(saved));
    }catch(e){ console.warn('SCC importer: could not migrate legacy race ids',e); }
  }
  function loadPersistedRaces(){
    migrateLegacyRaceIds();
    const merge=race=>{
      if(!race||!race.id) return;
      if(typeof window.replaceRace==='function') window.replaceRace(race);
      else { const i=RACES.findIndex(x=>x.id===race.id); if(i>=0) RACES[i]=race; else RACES.push(race); }
    };
    try{ Object.values(JSON.parse(localStorage.getItem(RACE_STORAGE_KEY)||'{}')).forEach(merge); }catch(e){}
    try{ (JSON.parse(localStorage.getItem(OLD_RACE_STORAGE_KEY)||'[]')||[]).forEach(merge); }catch(e){}
  }
  loadPersistedRaces();
  const clean=s=>String(s||'').replace(/ /g,' ').replace(/\s+/g,' ').trim();
  const normCls=v=>typeof window.normClass==='function' ? window.normClass(v) : String(v||'').trim();
  const ctorFromVehicle=v=>typeof window.constructorFromVehicle==='function' ? window.constructorFromVehicle(v) : '';
  const lookupCountry=n=>typeof window.lookupDriverCountry==='function' ? (window.lookupDriverCountry(n)||'') : '';

  // ---------- document classification (which PDF is this) ----------
  // A Classification doc's footer routinely annotates its own pole/fastest lap ("Fastest Lap
  // Lap 8"), so scanning the WHOLE text for "fastest lap" misclassified plain Classification
  // docs as Fastest-Lap-by-Driver ones. The filename always follows Al Kamel's own consistent
  // naming (03_Classification_..., 07_FastestLapByDriver_..., 01_Grid_...) and is far more
  // reliable than any in-body text, so check it first; only fall back to a narrow text scan
  // (title/header area, not the whole document) when the filename itself is inconclusive.
  function classifyDoc(name,text){
    const n=String(name||'').toLowerCase();
    if(/fastestlapbydriver|fastest\s*lap\s*by\s*driver|best\s*lap\s*after/.test(n)) return 'fastest';
    if(/hyperpole|qualifying|qualification|starting\s*grid|\bgrid\b/.test(n)) return 'pole';
    if(/classification|race\s+hour/.test(n)) return 'results';
    const s=(n+'\n'+String(text||'').slice(0,300)).toLowerCase();
    if(/fastest\s*lap|best\s*lap\s*after/.test(s)) return 'fastest';
    if(/hyperpole|qualifying|qualification|starting\s*grid/.test(s)) return 'pole';
    if(/classification|race\s+hour|race\s+classification/.test(s)) return 'results';
    return 'unknown';
  }

  // ---------- class detection: find the raw class text, then normalise via app.js normClass ----------
  // Two tiers: a VEHICLE class (HYP/LMP2/LMP3/LMGT3/GTE/GTD/GTP...) names the car itself, while
  // a QUALIFIER (Pro/Am, Bronze, Silver, Gold, Am) is a driver-category suffix that some series
  // print after the vehicle class ("LMP3 Pro/Am") without that being a distinct class in this
  // app's data model (only WEC/ELMS's "LMP2 Pro/Am" is - it has its own dedicated pattern and
  // normClass id). A qualifier-only pattern must never outrank a vehicle-class match just because
  // it happens to sit later in the same row (a GTWC-style series with no vehicle prefix at all,
  // e.g. a row whose whole class really is just "Bronze", is the only case the fallback tier
  // is for).
  const CLASS_PATTERNS_VEHICLE=[
    // 2014-2016 WEC LMP1 split into Hybrid/Light sub-classes, printed in period Al Kamel
    // docs literally as "LMP1 - H" / "LMP1 - L" (spaces around the hyphen). Must come before
    // the bare LMP1 pattern below so the more specific H/L suffix isn't discarded - matching
    // the same most-specific-first convention as the LMP2/LMP3 Pro-Am patterns.
    /\bLM\s?P1\s*-\s*H\b/i,
    /\bLM\s?P1\s*-\s*L\b/i,
    /LM\s?P2\s*(?:PRO\/AM|P\/A|PA\b|PRO-?AM)/i,
    /LM\s?P3\s*(?:PRO\/AM|P\/A|PA\b|PRO-?AM)/i,
    /HYPERCAR|\bHYP\b/i,
    /LM\s*GTE\s*-?\s*PRO|GTE\s*-?\s*PRO/i,
    /LM\s*GTE\s*-?\s*AM|GTE\s*-?\s*AM/i,
    // LMGT3 and bare GT3 must stay separate patterns, not alternatives inside one regex - a
    // model name can legitimately contain BOTH within itself ("Porsche 911 GT3 R LMGT3": the
    // homologation number "GT3" earlier, the class suffix "LMGT3" later). One combined
    // alternation regex can only ever report its single leftmost match across ALL of its
    // alternatives, which would always be the earlier bare "GT3" - discarding it as a separate
    // candidate entirely and never letting the later, real "LMGT3" win via the rightmost-match
    // rule below.
    /LMGT3|LMP2GT3/i,
    /\bGT3\b/i,
    /GTD\s*-?\s*PRO|GTDPRO/i,
    /\bGTD\b/i,
    /\bGTP\b/i,
    // 2012-2017 era WEC/ELMS documents print these with a space after "LM" ("LM P1", "LM
    // P2") - modern documents print them with no space ("LMP1") - \s? tolerates both.
    /\bLM\s?P1\b/i,
    /\bLM\s?P2\b/i,
    /\bLM\s?P3\b/i,
    /LM\s*GTE\b|\bGTE\b/i
  ];
  const CLASS_PATTERNS_QUALIFIER=[
    /PRO-?AM/i,
    /\bBRONZE\b/i,
    /\bSILVER\b/i,
    /\bGOLD\b/i,
    /\bAM\b/i
  ];
  const CLASS_PATTERNS=[...CLASS_PATTERNS_VEHICLE,...CLASS_PATTERNS_QUALIFIER];
  function matchClassPatterns(s,patterns){
    const matches=[];
    for(const re of patterns){
      re.lastIndex=0;
      const m=re.exec(s);
      if(m) matches.push({index:m.index,end:m.index+m[0].length,text:m[0]});
    }
    return matches;
  }
  // Every Al Kamel row prints the vehicle/model name BEFORE its own class column ("Porsche
  // 911 GT3 R  ...  LMGT3"), and some model names contain a shorter class name as a bare
  // substring (a GT3-based car's model literally contains "GT3", which also happens to be one
  // of the class patterns). Picking the first/leftmost pattern match picked up "GT3" from the
  // model name instead of the row's real "LMGT3" class column further right - taking the
  // rightmost match across all patterns instead always prefers the actual class column.
  function classFromText(s){
    let matches=matchClassPatterns(s,CLASS_PATTERNS_VEHICLE);
    if(!matches.length) matches=matchClassPatterns(s,CLASS_PATTERNS_QUALIFIER);
    // A more specific pattern's own match ("LMGTE Am") always contains a more generic
    // pattern's match too (bare "AM" matches inside the "Am" it ends with) - without
    // discarding the contained one, its later start position would wrongly "win" over the
    // real, more specific class name that it's actually just a substring of.
    const kept=matches.filter(a=>!matches.some(b=>b!==a && b.index<=a.index && b.end>=a.end && (b.end-b.index)>(a.end-a.index)));
    let best=null;
    for(const m of kept){ if(!best || m.index>best.index) best=m; }
    return best?normCls(best.text):'';
  }
  // Le Mans (and any other combined-class Hyperpole/Qualifying document, e.g. "LMP2-LMGT3")
  // names multiple classes at once - classFromText's "first pattern that matches" behaviour
  // would silently pick ONE of them as the class for every row in the whole file, mislabelling
  // every other class's rows. Only treat a doc-level guess as safe when exactly one class name
  // appears; otherwise return '' so each row falls back to per-line/per-entry class detection.
  function singleClassFromText(s){
    const found=new Set();
    const ranges=[];
    // Same vehicle-first tiering as classFromText: a plain qualifier word ("Am") elsewhere in
    // the doc name/header text must not turn an otherwise-unambiguous single-vehicle-class doc
    // ("LMP3 Pro/Am") into a falsely-ambiguous one.
    let matches=matchClassPatterns(s,CLASS_PATTERNS_VEHICLE);
    if(!matches.length) matches=matchClassPatterns(s,CLASS_PATTERNS_QUALIFIER);
    for(const {index:start,end,text} of matches){
      // A more specific pattern ("LMP2 PRO/AM") and a more generic one ("LMP2") both match the
      // SAME text ("LMP2 Pro/Am" literally starts with "LMP2") - without this, that one real
      // class was being counted as two different ones, making an unambiguous single-class doc
      // look ambiguous. Only count a match that doesn't overlap an already-claimed range, since
      // CLASS_PATTERNS is ordered most-specific-first, so the first (specific) match wins.
      if(ranges.some(r=>start<r.end&&end>r.start)) continue;
      ranges.push({start,end});
      found.add(normCls(text));
    }
    return found.size===1 ? [...found][0] : '';
  }

  // ---------- shared low-level parsing helpers ----------
  function timeToSeconds(t){
    const s=String(t||'').trim().replace(',', '.');
    if(!s) return Infinity;
    const p=s.split(':').map(Number);
    if(p.length===3) return p[0]*3600+p[1]*60+p[2];
    if(p.length===2) return p[0]*60+p[1];
    const n=Number(s); return Number.isFinite(n)?n:Infinity;
  }
  function isCarNoToken(t){ return /^(?:00[0-9]|0[0-9]{2}|\d{1,3})$/.test(String(t||'').trim()); }
  // Al Kamel's classic (roughly pre-2018) documents write lap/segment times with an
  // apostrophe standing in for the final minute-to-second separator ("1'47.534",
  // "12:00'15.243") instead of the modern all-colon format ("1:47.534", "12:00:15.243").
  // Every time-matching regex below accepts both via [:'] and this normalises whatever was
  // captured back to a plain colon before it's stored, so timeToSeconds/parseTime and every
  // other downstream consumer never has to know the era-specific source format existed.
  const toColonTime=t=>String(t||'').replace(/'/g,':');
  // Score candidate (position, car number) token pairs in a whitespace-tokenised line.
  // Prefers pairs at the start of the line, followed by a driver-initial pattern, near a class keyword.
  function findPosNo(tokens){
    const cand=[];
    for(let i=0;i<tokens.length-1;i++){
      // A 24-hour race's Fastest Lap by Driver document ranks every recorded lap, not one row
      // per car, so the rank number in column 1 regularly runs past 99 (Le Mans: up to ~200+).
      // Capping this at 2 digits disqualified the real (rank, car-no) pair at index 0 entirely,
      // letting a later coincidental digit-digit pair (e.g. the lap-count columns) win instead.
      if(!/^\d{1,3}$/.test(tokens[i]) || !isCarNoToken(tokens[i+1])) continue;
      const pos=+tokens[i]; if(pos<1||pos>300) continue;
      let score=0;
      if(i===0) score+=10;
      const next=tokens.slice(i+2,i+9).join(' ');
      const prev=tokens.slice(Math.max(0,i-4),i).join(' ');
      if(/[A-ZÀ-Ý]\.\s*[A-ZÀ-Ý]/.test(next)) score+=7;
      if(classFromText(prev)) score+=3;
      if(classFromText(next)) score+=2;
      if(/^[A-Za-z]$/.test(tokens[i-1]||'')) score-=6;
      cand.push({i,pos,no:tokens[i+1],score});
    }
    cand.sort((a,b)=>b.score-a.score || a.i-b.i);
    return cand[0]||null;
  }
  // Al Kamel documents print driver names in one of two ways:
  //  - Race Classification: initials, e.g. "P. CHATIN / F. HABSBURG / C. MILESI"
  //  - Fastest-lap-by-driver: full first name + ALL-CAPS surname, e.g. "Will STEVENS"
  // Surname connector words (DI, DE, VAN...) can be a PREFIX of the surname itself
  // ("DI RESTA", "VAN DER LINDE", "PIER GUIDI"), not just a joiner after a base word.
  // A trailing all-caps word with no recognised connector ("HASSE CLOT") is only absorbed
  // when immediately followed by "/" or end-of-string, i.e. still inside the driver-list
  // context - never when followed by more text, which is what a model name after the last
  // driver (e.g. "...LINDE BMW M Hybrid V8") would look like, avoiding swallowing it.
  const DRIVER_NAME_RE=/\b([A-ZÀ-Ý])\.\s*((?:(?:VAN\s+DER|VAN|DER|DE|DA|DI|DEL|DU|LE|LA|VON|PIER|AL|FÉLIX\s+DA)\s+)?[A-ZÀ-Ý][A-Za-zÀ-ÿ'’-]*(?:\s+[A-ZÀ-Ý]{2,}(?=\s*(?:\/|$)))?)/g;
  // Connector group is repeated (VAN DER, DE LA, ...) - some surnames stack two joiner words
  // ("VAN DER LINDE"), and a single-word-only connector left the real surname unmatched.
  // The first-name alternative also accepts a bare 2-3 letter ALL-CAPS token ("PJ", "TJ") for
  // drivers whose real first name already IS a pair of initials ("PJ Hyett") - Al Kamel prints
  // it in full-name documents exactly like a normal Titlecase first name, just without the
  // lowercase tail, and it would otherwise never satisfy either name-matching regex at all.
  // The trailing optional all-caps word covers a two-word surname with no recognised connector
  // ("SETTE CAMARA", "HASSE CLOT") - DRIVER_NAME_RE already absorbs this case (see its own
  // comment above) but only when at end-of-string/before "/"; this format's driver name is
  // always immediately followed by the numeric time column, never more letters, so there's no
  // real ambiguity to guard against here the way DRIVER_NAME_RE's classification-doc format has.
  const FULL_NAME_RE=/\b([A-ZÀ-Ý][a-zà-ÿ'’-]+(?:-[A-ZÀ-Ý][a-zà-ÿ'’-]+)?|[A-Z]{2,3})\s+((?:(?:DE|DI|DA|DU|DEL|VAN|VON|DER|LA|LE|PIER|AL)\s+)*)([A-ZÀ-Ý]{2,}(?:['’-][A-ZÀ-Ý]{2,})?(?:\s+[A-ZÀ-Ý]{2,})?)\b(?!\.)/g;
  // Some drivers race under more than one spelling of their own name across different PDFs
  // ("Ben Barker" vs "Benjamin Barker") - fixing on one canonical spelling here means the
  // imported race is stored under it regardless of which one this particular results sheet used.
  const NAME_ALIASES={'ben barker':'Benjamin Barker','tom fleming':'Thomas Fleming','maria lopez':'Jose Maria Lopez'};
  // Al Kamel Race Classification docs only ever print initials ("B. Barker"), so the alias
  // also needs to match on first-initial + surname, not just the exact full spelling.
  const NAME_ALIASES_BY_INITIAL={};
  Object.values(NAME_ALIASES).forEach(canon=>{
    const cp=canon.split(/\s+/);
    NAME_ALIASES_BY_INITIAL[cp[0][0].toUpperCase()+'|'+cp.slice(1).join(' ').toLowerCase()]=canon;
  });
  function titleName(raw,keepFirstAllCaps){
    const firstToken=clean(raw).split(' ')[0];
    let s=clean(raw).toLowerCase().replace(/(^|[\s.'-])([a-zà-ÿ])/g,(m,a,b)=>a+b.toUpperCase());
    // Trailing \b is not enough here: JS's \w excludes accented Latin-1 letters, so it
    // treats the boundary between an ASCII connector prefix and an accented letter right
    // after it (e.g. "Del" + "é" in "Delétraz") as a word boundary too - lowercasing "Del"
    // inside a surname that merely STARTS with those letters, not an actual "Del " token.
    // Requiring real whitespace after the word restricts this to genuine standalone connectors.
    s=s.replace(/\bVan(?=\s)/g,'van').replace(/\bDer(?=\s)/g,'der').replace(/\bDe(?=\s)/g,'de').replace(/\bDi(?=\s)/g,'di').replace(/\bDa(?=\s)/g,'da').replace(/\bDu(?=\s)/g,'du').replace(/\bDel(?=\s)/g,'del').replace(/\bVon(?=\s)/g,'von').replace(/\bLoup(?=\s)/g,'Loup').replace(/\bPier(?=\s)/g,'Pier');
    // A first name that's genuinely a pair of initials ("PJ Hyett") loses its second capital
    // to the lowercase-then-titlecase pass above ("PJ" -> "Pj") - restore the original token
    // verbatim instead of the mangled one, only for the FULL_NAME_RE all-caps-initials match.
    if(keepFirstAllCaps){ const parts=s.split(' '); parts[0]=firstToken; s=parts.join(' '); }
    if(NAME_ALIASES[s.toLowerCase()]) return NAME_ALIASES[s.toLowerCase()];
    const m=s.match(/^([A-ZÀ-Ý])\.\s*(.+)$/);
    if(m){
      const key=m[1].toUpperCase()+'|'+m[2].toLowerCase();
      if(NAME_ALIASES_BY_INITIAL[key]) return NAME_ALIASES_BY_INITIAL[key];
    }
    return s;
  }
  // 2012-2017 era WEC "Fastest Lap by Driver" documents print the one driver who set that
  // lap as an ordinary "Firstname Surname" cell (both Title-Case, neither an initial nor
  // all-caps) - a shape neither DRIVER_NAME_RE ("X. Surname") nor FULL_NAME_RE ("Firstname
  // SURNAME") recognises at all. Free-text scanning for "any two Title-Case words" is unsafe
  // here: a model/class fragment on the same line ("Ferrari F458 Italia LM GTE Pro") can
  // itself accidentally satisfy that shape ("Italia" + "LM"). Since these documents keep
  // genuine tab-separated columns, locating the Driver cell by its structural position -
  // immediately after the Class cell, before any time/lap value - sidesteps that risk
  // entirely instead of trying to out-guess free text. Returns null (not []) when the tab
  // structure isn't there or the class cell can't be found, so callers know to fall back to
  // driverPairsFromLine's free-text scan rather than treating "no driver" as a real answer.
  function driverCellAfterClass(raw,cls){
    if(!raw || !raw.includes('\t') || !cls) return null;
    const cols=raw.split(/\t+/).map(clean).filter(Boolean);
    const clsIdx=cols.findIndex(c=>classFromText(c)===cls);
    if(clsIdx<0 || clsIdx+1>=cols.length) return null;
    const cell=cols[clsIdx+1];
    if(!cell || /\d/.test(cell)) return null; // a time/lap/kph value is never the driver cell
    const m=cell.match(/^([A-ZÀ-Ý])\.\s*(.+)$/);
    const name=titleName(m ? `${m[1]}. ${m[2]}` : cell);
    return [[name, lookupCountry(name)]];
  }
  function driverPairsFromLine(line){
    const out=[]; let m;
    DRIVER_NAME_RE.lastIndex=0;
    while((m=DRIVER_NAME_RE.exec(line))){
      const name=titleName(`${m[1]}. ${m[2]}`);
      if(!out.some(d=>d[0]===name)) out.push([name, lookupCountry(name)]);
    }
    if(out.length) return out;
    FULL_NAME_RE.lastIndex=0;
    while((m=FULL_NAME_RE.exec(line))){
      // A driver-category qualifier word right before an all-caps-initials name (e.g. "Pro/Am
      // PJ HYETT") can itself satisfy group1's Titlecase-word shape ("Am") followed by
      // mandatory whitespace, then group3's 2+-char-all-caps shape ("PJ") - swallowing the
      // qualifier as a fake first name and truncating the real surname ("HYETT") entirely.
      // These category words are never themselves a driver's first name, so reject them here.
      // Resuming the search right after the rejected word (not past the whole bad match, which
      // already consumed "PJ" as a fake surname) gives the real "PJ HYETT" pair its own shot.
      if(/^(am|pro|bronze|silver|gold|platinum)$/i.test(m[1])){ FULL_NAME_RE.lastIndex=m.index+m[1].length; continue; }
      const allCapsFirst=/^[A-Z]{2,3}$/.test(m[1]);
      const name=titleName(`${m[1]} ${m[2]||''}${m[3]}`,allCapsFirst);
      if(!out.some(d=>d[0]===name)) out.push([name, lookupCountry(name)]);
    }
    return out;
  }
  // When the Drivers column is isolated (its own tab cell), splitting on "/" gives each driver's
  // text with no ambiguity - so any surname, however many words, comes through whole.
  function driversFromCell(cell){
    if(!cell) return [];
    return String(cell).split(/\s*\/\s*/).map(part=>part.trim()).filter(Boolean).map(part=>{
      const m=part.match(/^([A-ZÀ-Ý])\.\s*(.+)$/);
      const name=titleName(m ? `${m[1]}. ${m[2]}` : part);
      return [name, lookupCountry(name)];
    });
  }

  // ---------- Race Classification parser (structural, not phrase-gated) ----------
  function parseClassification(text){
    const lines=String(text||'').replace(/\r/g,'').split('\n');
    const rows=[]; let status='Classified';
    for(const raw of lines){
      const line=clean(raw);
      if(!line) continue;
      if(/^Not\s+classified/i.test(line)){ status='NC'; continue; }
      if(/^Retired/i.test(line)){ status='RET'; continue; }
      if(/^Disqualified/i.test(line)){ status='DSQ'; continue; }
      // Older (2012-era) combined multi-class documents print "Excluded" as its own
      // section header, same convention as "Not classified"/"Retired"/"Disqualified" above -
      // functionally a stewards' disqualification.
      if(/^Excluded/i.test(line)){ status='DSQ'; continue; }
      // Footer sections (circuit records, penalties, published-at, stewards) never contain
      // classification rows again once reached, so stop scanning rather than skip line-by-line.
      if(/^Circuit\s+(Best|Race)|^Published\s+at|^Stewards|^Timekeeper|^CAR\s+\d+\s+-/i.test(line)) break;
      if(/^(No\.?\s+Team|Best\s+Lap|Race$|FIA\s+WEC|TotalEnergies|Classification)$/i.test(line)) continue;

      const cls=classFromText(line);
      if(!cls) continue; // a classification row always names its class somewhere on the line

      // Al Kamel tables put Pos and No in their own tab-separated cells for classified rows,
      // and just No (no separate Pos cell) for Not classified / Retired / Disqualified rows.
      // Columns must be split from the raw (un-cleaned) line: clean() collapses tabs to spaces.
      const cols=raw.includes('\t') ? raw.split(/\t+/).map(clean).filter(Boolean) : null;
      let pos,no,rest,teamCell,driversCell,modelCell;
      // A combined multi-class document (e.g. 2012-era WEC) interleaves a "Not classified"/
      // "Excluded" sub-section INSIDE one class before the NEXT class's own classified rows
      // resume - gating this branch on a document-wide `status==='Classified'` flag meant
      // that flag, once flipped by an earlier class's NC section, never came back, so every
      // later class's genuinely-classified rows fell through to the branch below and had
      // their own Pos column wrongly read as the car number instead. The column SHAPE itself
      // (a separate pos cell, and cols[1] looking like a car number rather than a team name)
      // is sufficient on its own to recognise a classified row regardless of the stale flag -
      // and finding one here means we're back in a classified section, so reset the flag too.
      if(cols && cols.length>=3 && /^\d{1,2}$/.test(cols[0]) && isCarNoToken(cols[1])){
        // [pos, no, team, drivers, model, class, ...]
        pos=+cols[0]; no=cols[1]; rest=cols.slice(2).join(' \t ');
        teamCell=cols[2]; driversCell=cols[3]; modelCell=cols[4];
        status='Classified';
      } else if(cols && cols.length>=2 && isCarNoToken(cols[0]) && status!=='Classified'){
        // [no, team, drivers, model, class, ...] - NC/RET/DSQ rows have no separate pos cell.
        pos=rows.length+1; no=cols[0]; rest=cols.slice(1).join(' \t ');
        teamCell=cols[1]; driversCell=cols[2]; modelCell=cols[3];
      } else if(cols && cols.length>=4){
        const first=cols[0].match(/^(\d{1,2})\s+(0?\d{1,3}|0[0-9]{2})\s*(.*)$/) || cols[0].match(/^(0?\d{1,3}|0[0-9]{2})\s*(.*)$/);
        if(first && first.length===4){ pos=+first[1]; no=first[2]; rest=cols.slice(1).join(' \t '); }
        else if(first){ pos=rows.length+1; no=first[1]; rest=(first[2]?first[2]+' ':'')+cols.slice(1).join(' \t '); }
      }
      if(no===undefined){
        const tokens=line.split(/\s+/);
        const pn=findPosNo(tokens);
        if(!pn) continue;
        pos=pn.pos; no=pn.no; rest=line;
      }

      // Prefer parsing straight from the isolated Drivers/Team/Model columns when we have them:
      // splitting the Drivers cell on "/" removes all ambiguity about where one driver's name
      // ends and the next begins, so even unusual multi-word surnames (e.g. "HASSE CLOT") come
      // through whole instead of needing a connector-word whitelist.
      const drivers=driversCell!==undefined ? driversFromCell(driversCell) : driverPairsFromLine(rest||line);
      const team=teamCell!==undefined ? teamCell : teamFromLine(rest||line, cls);
      const model=modelCell!==undefined ? modelCell : modelFromLine(rest||line);
      const constructor=ctorFromVehicle(model||team);
      const totalTimes=[...(rest||line).matchAll(/\b\d{1,2}:\d{2}[:']\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      // Lap count is the bare integer immediately before the total-time column
      // (distinct from the "N Laps" wording used inside the Gap column for lapped-down cars).
      let laps=0;
      if(totalTimes.length){
        const before=(rest||line).slice(0,(rest||line).indexOf(totalTimes[0])).trim().split(/\s+/);
        const cand=before[before.length-1];
        if(/^\d{1,3}$/.test(cand||'')) laps=+cand;
      }
      const times=[...(rest||line).matchAll(/(?<!\d[:'])\b\d{1,2}[:']\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      const bestLapRaw=times.length?times[times.length-1]:'';
      const bestLap=toColonTime(bestLapRaw);
      let bestLapNo=''; if(bestLapRaw){ const idx=(rest||line).indexOf(bestLapRaw); const before=(rest||line).slice(0,idx).trim().split(/\s+/); const cand=before[before.length-1]; if(/^\d{1,3}$/.test(cand||'')) bestLapNo=cand; }
      // Al Kamel sometimes concatenates the lap-gap directly against a trailing interval time
      // with no space ("1 Lap1:05.278"), which a plain (?=\s|$) lookahead would reject
      // entirely, losing the lap-gap too. Allowing a following digit as well as whitespace/end
      // still finds "1 Lap" correctly - the interval-to-car-ahead is recomputed separately
      // from each entry's absolute total time, so this only needs to capture the gap-to-leader.
      const gapMatch=(rest||line).match(/(?:^|\s)(\+?\d+\.\d{3}|\+?\d+\s+Laps?)(?=\s|$|\d)/i);

      rows.push({
        pos, no:String(no), class:cls, status, team, model, constructor,
        drivers, laps,
        time: toColonTime(totalTimes[0]||''), gap: status==='Classified'?(gapMatch?gapMatch[1]:'—'):status,
        bestLap, bestLapNo
      });
    }
    // De-dupe by car number, keeping the row with the most driver info / best status.
    const byNo=new Map();
    rows.forEach(r=>{
      const k=r.no; const old=byNo.get(k);
      if(!old || r.drivers.length>old.drivers.length || (r.status==='Classified'&&old.status!=='Classified')) byNo.set(k,r);
    });
    return [...byNo.values()].sort((a,b)=>(a.pos||999)-(b.pos||999));
  }
  // Scans every row of a document (not just the fastest-per-class summary) for car-number +
  // driver-name pairs, so initials from Race Classification can be upgraded to full names
  // when the same car/surname appears written out in full elsewhere (e.g. Fastest Lap by
  // Driver, which lists "FirstName SURNAME" for essentially the whole field).
  function fullNameEnrichmentMap(text){
    const rawLines=String(text||'').replace(/\r/g,'').split('\n');
    const map=new Map();
    for(const raw of rawLines){
      const line=clean(raw);
      if(!line) continue;
      if(/^(No\.?\s+Team|Pos\.?\s|Car|Driver|Team|Best|Fastest|Circuit|FIA|Published|Stewards|Timekeeper)/i.test(line)) continue;
      const tokens=line.split(/\s+/);
      const pn=findPosNo(tokens);
      // A driver who never completed a single timed lap (crashed/broke down on their very
      // first flying lap) still gets their own row in a Fastest-Lap-by-Driver document - just
      // with no rank/time/lap/gap/kph at all, only [Nr, Team, Car, Class, Driver]. findPosNo
      // needs an adjacent (rank, car-no) token PAIR and comes back empty for these rows since
      // there's no separate rank column here, silently losing a real name-enrichment
      // opportunity for that driver everywhere else in the imported race. The same loose
      // "bare car-number near line start" fallback timeRecordsFromText/flClassificationFromText
      // already use elsewhere recovers the car number from just the one column that IS there.
      const no=pn ? pn.no : (line.match(/(?:^|\s)(0?\d{1,3}|0[0-9]{2})(?=\s)/)||[])[1];
      if(!no) continue;
      const pairs=driverCellAfterClass(raw,classFromText(line)) || driverPairsFromLine(line);
      if(!pairs.length) continue;
      const set=map.get(no)||new Set();
      pairs.forEach(p=>{
        const first=p[0].split(/\s+/)[0];
        // Only genuine "FirstName Surname" pairs upgrade anything - an initials-format name
        // like "P. Chatin" also contains a space, so a bare .includes(' ') check would treat
        // it as a real full name and downgrade an already-correct upgrade back to initials.
        if(p[0].includes(' ') && !/^[A-ZÀ-Ý]\.?$/.test(first)) set.add(p[0]);
      });
      if(set.size) map.set(no,set);
    }
    return map;
  }
  function enrichDriverNames(entries,nameMap){
    entries.forEach(e=>{
      const fullNames=nameMap.get(e.no);
      if(!fullNames||!fullNames.size) return;
      // Two crew members can share a surname (family teams: "S. GROVE / B. GROVE") - matching
      // on surname alone picked whichever full name came first in the Set for BOTH of them,
      // silently collapsing two different people into one duplicated name. When more than one
      // candidate full name shares this driver's surname, the initials-format entry's own first
      // initial ("S." vs "B.") disambiguates which one is actually theirs.
      const used=new Set();
      e.drivers=e.drivers.map(d=>{
        const surname=d[0].split(/\s+/).pop().toLowerCase();
        const initialMatch=d[0].match(/^([A-ZÀ-Ý])\./);
        const candidates=[...fullNames].filter(fn=>fn.split(/\s+/).pop().toLowerCase()===surname && !used.has(fn));
        let match=candidates.length>1 && initialMatch
          ? candidates.find(fn=>fn[0].toUpperCase()===initialMatch[1].toUpperCase())
          : candidates[0];
        if(!match && candidates.length) match=candidates[0];
        if(match) used.add(match);
        return match && match!==d[0] ? [match, d[1]||lookupCountry(match)] : d;
      });
    });
  }
  // Al Kamel "Final Starting Grid" documents print two cars per printed row (odd grid
  // position on the left, even on the right), anchored by a "- N -" row-number marker in
  // the middle. Anchoring on that marker (rather than a fixed column count) survives team
  // names with a different number of words on each side of the same row. Each row is also
  // preceded by its own standalone line with 1 or 2 lap times (left car first, then right
  // car - a car with no recorded time, e.g. last on the grid, just gets one), which gives a
  // real qualifying time for cars outside the Hyperpole top-10 that no other document has.
  function parseStartingGrid(text){
    const lines=String(text||'').replace(/\r/g,'').split('\n');
    const gridMap=new Map(); // no -> {grid, time}
    let pendingTimes=null;
    for(const raw of lines){
      const line=clean(raw);
      const timeLine=line.match(/^(\d{1,2}[:']\d{2}\.\d{3})(?:\s+(\d{1,2}[:']\d{2}\.\d{3}))?$/);
      if(timeLine){ pendingTimes=[toColonTime(timeLine[1]),timeLine[2]?toColonTime(timeLine[2]):null]; continue; }
      if(!raw.includes('\t')){ pendingTimes=null; continue; }
      const cols=raw.split(/\t+/).map(clean).filter(Boolean);
      const markerIdx=cols.findIndex(c=>/^-\s*\d+\s*-$/.test(c));
      if(markerIdx<1){ pendingTimes=null; continue; }
      const leftGrid=cols[markerIdx-1], leftNo=cols[markerIdx-2];
      const rightGrid=cols[markerIdx+1], rightNo=cols[markerIdx+2];
      if(/^\d{1,3}$/.test(leftGrid) && isCarNoToken(leftNo)) gridMap.set(leftNo,{grid:+leftGrid,time:pendingTimes?pendingTimes[0]:null});
      if(rightGrid && /^\d{1,3}$/.test(rightGrid) && isCarNoToken(rightNo)) gridMap.set(rightNo,{grid:+rightGrid,time:pendingTimes&&pendingTimes[1]?pendingTimes[1]:null});
      pendingTimes=null;
    }
    return gridMap;
  }
  // Starting Grid rows print full "FirstName SURNAME" names too (one per car), always as the
  // very first and very last tab-cell of the row regardless of how many words the team names
  // in between have - a further name source beyond the Fastest Laps document, which doesn't
  // necessarily cover every driver (e.g. one who never set a qualifying-relevant lap).
  function driverNamesFromStartingGrid(text){
    const lines=String(text||'').replace(/\r/g,'').split('\n');
    const nameMap=new Map(); // no -> Set(names)
    const add=(no,raw)=>{
      if(!no||!raw||!/^[A-ZÀ-Ý][a-zà-ÿ'’-]+\s/.test(raw)) return;
      const set=nameMap.get(no)||new Set(); set.add(titleName(raw)); nameMap.set(no,set);
    };
    for(const raw of lines){
      if(!raw.includes('\t')) continue;
      const cols=raw.split(/\t+/).map(clean).filter(Boolean);
      const markerIdx=cols.findIndex(c=>/^-\s*\d+\s*-$/.test(c));
      if(markerIdx<1) continue;
      add(cols[markerIdx-2],cols[0]);
      if(cols.length>markerIdx+2) add(cols[markerIdx+2],cols[cols.length-1]);
    }
    return nameMap;
  }
  function applyStartingGrid(entries,gridMap){
    if(!gridMap||!gridMap.size) return;
    entries.forEach(e=>{
      const g=gridMap.get(e.no); if(!g) return;
      e.grid=g.grid;
      if(g.time) e.gridTime=g.time;
    });
  }
  const KNOWN_VEHICLES=['BMW M Hybrid V8','Ferrari 499P','Aston Martin Valkyrie','Toyota GR010 HYBRID','Toyota GR010','Cadillac V-Series.R','Alpine A424','Peugeot 9X8','Genesis GMR-001 Hypercar','Genesis GMR-001','Porsche 963','McLaren 720S LMGT3 Evo','Aston Martin Vantage AMR LMGT3','Porsche 911 GT3 R (992)','Porsche 911 GT3 R','Ferrari 296 LMGT3','Lexus RC F LMGT3','Corvette Z06 LMGT3.R','Mercedes-AMG LMGT3','BMW M4 LMGT3','Ford Mustang LMGT3','Oreca 07','Ligier JS P2','Duqueine D08','Ligier JS P320','Oreca LMP3',
    // IMSA-specific: shares several GTP cars with WEC's Hypercar (already listed above), but its
    // GTD/GTD PRO cars are printed as plain "GT3" (not "LMGT3") and its LMP2 car has an extra
    // "LMP2" token inside the model text itself ("ORECA LMP2 07"), so neither matches the
    // equivalent WEC/ELMS entry above as a substring - each needs its own separate entry.
    'Acura ARX-06','ORECA LMP2 07','Chevrolet Corvette Z06 GT3.R','Chevrolet Corvette Z06','Aston Martin Vantage GT3','Aston Martin Vantage','Mercedes-AMG GT3','BMW M4 GT3','McLaren 720S GT3','Ferrari 296 GT3','Lexus RC F GT3','Lamborghini Huracan GT3','Lamborghini Huracan','Lamborghini Temerario GT3','Lamborghini Temerario','Ford Mustang GT3'];
  function modelFromLine(line){
    const s=clean(line);
    const hit=KNOWN_VEHICLES.find(m=>new RegExp(m.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(s));
    return hit||'';
  }
  function teamFromLine(line,cls){
    let s=clean(line);
    const model=modelFromLine(s); if(model) s=s.split(new RegExp(model.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'))[0];
    s=s.replace(DRIVER_NAME_RE,'').replace(/\s*\/\s*/g,' ');
    if(cls) s=s.split(new RegExp('\\b'+cls.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i'))[0];
    return clean(s).slice(0,70);
  }

  // Full qualifying/Hyperpole classification, keeping every row (not reduced to one
  // fastest-per-class record like timeRecordsFromText/bestPerClass) so Order can show a
  // real qualifying order, not just who took pole.
  function qualifyingRowsFromText(text,docClass,entries){
    const rawLines=String(text||'').replace(/\r/g,'').split('\n');
    const out=[];
    for(const raw of rawLines){
      const line=clean(raw);
      if(!line) continue;
      if(/^(No\.?\s+Team|Pos\.?\s|Car|Driver|Team|Best|Fastest|Circuit|FIA|Published|Stewards|Timekeeper)/i.test(line)) continue;
      const times=[...line.matchAll(/(?<!\d[:'])\b\d{1,2}[:']\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      if(!times.length) continue;
      // Al Kamel tables put Pos and No in their own tab-separated cells, same layout as a
      // Race Classification doc (No/Team/Drivers/Car/Cat/Ty/Time/...) - isolating those cells
      // (rather than re-tokenising the whitespace-collapsed line) gives the real Drivers cell
      // to split on "/" with no ambiguity (a two-word surname like "Hasse Clot" survives whole)
      // and the real Cat/class cell instead of a heuristic scan that a model name containing a
      // shorter class name as a substring ("Porsche 911 GT3 R" vs class "LMGT3") could fool.
      // A Fastest-Lap-by-Driver doc (No/Team/Car/Cat/Driver/...) uses a different column order -
      // its 4th cell is the Car, not Drivers - so only trust the Classification layout when that
      // cell actually looks like an initials-format driver list ("A. Surname"), not a vehicle name.
      const cols=raw.includes('\t') ? raw.split(/\t+/).map(clean).filter(Boolean) : null;
      let pos,no,rest,teamCell,driversCell,modelCell,clsCell;
      if(cols && cols.length>=4 && /^\d{1,3}$/.test(cols[0]) && isCarNoToken(cols[1]) && /[A-ZÀ-Ý]\.\s*[A-ZÀ-Ý]/.test(cols[3]||'')){
        pos=+cols[0]; no=cols[1]; teamCell=cols[2]; driversCell=cols[3]; modelCell=cols[4]; clsCell=cols[5];
        // The 2019-2022 combined-class qualifying layout (LMP1/Hypercar+LMP2, LMGTE Pro+Am)
        // prints the Pro-Am marker as its OWN tab cell right after the class ("LMP2" \t "P/A"),
        // not fused into the class text the way ELMS/MLMC print "LMP2 Pro/Am" as one string -
        // so the isolated class cell alone lost the Pro-Am distinction entirely. That extra cell
        // only exists on Pro-Am rows (shifting the tyre-compound cell after it by one), so check
        // for it by content (a short Pro-Am-shaped token) rather than by a fixed column index.
        if(cols[6] && /^P\W*A$/i.test(cols[6])) clsCell+=' '+cols[6];
      } else if(cols && cols.length>=5 && /^\d{1,3}$/.test(cols[0]) && isCarNoToken(cols[1]) && /[A-ZÀ-Ý]\.\s*[A-ZÀ-Ý]/.test(cols[2]||'')){
        // ELMS prints its qualifying result as ONE combined all-classes ranking, not one file
        // per class - a different column layout again: [pos, no, Drivers, Team, Class, times...],
        // Drivers coming BEFORE Team (the opposite order from the Classification-doc layout
        // above) and no separate Car/model column at all (never printed in this document), so
        // model/constructor fall through to the Race Classification entry for the same car
        // below instead of coming up empty.
        pos=+cols[0]; no=cols[1]; driversCell=cols[2]; teamCell=cols[3]; clsCell=cols[4];
      } else {
        const tokens=line.split(/\s+/);
        const pn=findPosNo(tokens);
        if(!pn) continue;
        pos=pn.pos; no=pn.no;
        // teamFromLine/modelFromLine expect the pos/no prefix already stripped - without it,
        // "team" ends up as "1 12 Cadillac Hertz...".
        rest=tokens.slice(0,pn.i).concat(tokens.slice(pn.i+2)).join(' ');
      }
      // A combined-class document (Le Mans "LMP2-LMGT3") has no per-row class text for cars
      // whose model name doesn't happen to contain one (an Oreca LMP2 car's row never mentions
      // "LMP2" anywhere) - the already-parsed Race Classification entry for the same car number
      // knows its real class (including the LMP2/LMP2PA split a Hyperpole doc doesn't print).
      const entry=(entries||[]).find(e=>String(e.no)===String(no));
      const cls=normCls(docClass||(clsCell&&classFromText(clsCell))||classFromText(rest||line)||(entry&&entry.class)||'');
      if(!cls) continue;
      const model=modelCell!==undefined?modelCell:(modelFromLine(rest)||(entry&&entry.model)||'');
      const team=teamCell!==undefined?teamCell:(teamFromLine(rest,cls)||(entry&&entry.team)||'');
      const drivers=driversCell!==undefined?driversFromCell(driversCell):driverPairsFromLine(rest);
      out.push({pos,no:String(no),class:cls,team,model,constructor:ctorFromVehicle(model||team)||(entry&&entry.constructor)||'',drivers,time:toColonTime(times[times.length-1])});
    }
    // A car can appear more than once per document by coincidence of the scoring heuristics;
    // keep the first (best-ranked) occurrence, which matches the document's own row order.
    const seen=new Set();
    return out.filter(r=>{ const k=r.class+'|'+r.no; if(seen.has(k)) return false; seen.add(k); return true; })
      .sort((a,b)=>a.class.localeCompare(b.class)||a.pos-b.pos);
  }
  // WEC 2013-2020 qualifying set grid position by the AVERAGE of two nominated drivers' laps,
  // not a single fastest lap - the Classification document's header literally reads "No / Team
  // / Drivers / Car / Class / Driver 1 / Driver 2 / Laps / Average / Gap" (Driver 1/2 are TIME
  // columns, not name columns - the two nominated drivers' identities come from a separate
  // Fastest-Lap-by-Driver document instead, same as qualifyingTimeDriverMap does elsewhere).
  // Hybrid Hypercar-era cars print an extra bare "H" marker cell right after the class, which
  // shifts everything after it by one column on those rows only - rather than track that,
  // the four trailing numeric columns (driver1 time, driver2 time, laps, average) are found by
  // their own shape in sequence, which stays correct regardless of that extra cell.
  function qualifyingAverageRowsFromText(text,docClass,entries){
    const rawLines=String(text||'').replace(/\r/g,'').split('\n');
    const out=[];
    // The 2018-2019 season's own Average column prints an apostrophe as the minute separator
    // ("1'54.962") instead of the usual colon every other document (this era included) uses -
    // matched here as an alternative and normalised back to colon form below, so every
    // downstream consumer (parseTime, sorting, class averages) never has to know the difference.
    const seqFull=/(\d{1,2}[:']\d{2}\.\d{3})\s+(\d{1,2}[:']\d{2}\.\d{3})\s+(\d{1,3})\s+(\d{1,2}[:']\d{2}\.\d{3})/;
    // A car whose 2nd nominated driver had their lap(s) deleted (track limits, steward
    // decision) only ever has ONE recorded time - laps drops to 1 and there is no separate
    // "average" to compute, the Average column just repeats that single time. Without this
    // fallback such a car has no 4-value sequence anywhere on its line and silently fails to
    // match at all, even though it plainly has a real recorded qualifying time.
    const seqSingle=/(\d{1,2}[:']\d{2}\.\d{3})\s+(\d{1,3})\s+(\d{1,2}[:']\d{2}\.\d{3})/;
    const toColon=t=>t.replace("'",':');
    for(const raw of rawLines){
      const line=clean(raw);
      if(!line) continue;
      if(/^(No\.?\s+Team|Pos\.?\s|Car|Driver|Team|Best|Fastest|Circuit|FIA|Published|Stewards|Timekeeper)/i.test(line)) continue;

      // Al Kamel prints this document with Team/Drivers/Car/Class in their own tab cells, same
      // layout as Race Classification and the non-average qualifying doc - isolating those cells
      // (rather than re-tokenising the whitespace-collapsed line) is what qualifyingRowsFromText
      // already does and avoids depending on modelFromLine's hardcoded Hypercar-era model list,
      // which doesn't know 2018-2019's GTE-era cars ("Ford GT", "BMW M8 GTE"...) at all - without
      // it, model/team never got isolated and the whole tail (model + class + times + laps) ended
      // up jammed into the "team" field.
      const cols=raw.includes('\t') ? raw.split(/\t+/).map(clean).filter(Boolean) : null;
      let pos,no,team,model,drivers,clsCell,tail;
      if(cols && cols.length>=6 && /^\d{1,3}$/.test(cols[0]) && isCarNoToken(cols[1]) && /[A-ZÀ-Ý]\.\s*[A-ZÀ-Ý]/.test(cols[3]||'')){
        pos=+cols[0]; no=cols[1]; team=cols[2]; drivers=driversFromCell(cols[3]); model=cols[4]; clsCell=cols[5];
        // Same Pro-Am marker-as-its-own-cell quirk qualifyingRowsFromText already handles.
        if(cols[6] && /^P\W*A$/i.test(cols[6])) clsCell+=' '+cols[6];
        tail=cols.slice(6).join(' ');
      } else {
        const tokens=line.split(/\s+/);
        const pn=findPosNo(tokens);
        no=pn ? pn.no : (line.match(/(?:^|\s)(0?\d{1,3}|0[0-9]{2})(?=\s)/)||[])[1];
        if(!no) continue;
        const rest=pn ? tokens.slice(0,pn.i).concat(tokens.slice(pn.i+2)).join(' ') : line;
        pos=pn?pn.pos:out.filter(r=>r.class===clsCell).length+1;
        model=modelFromLine(rest); team=teamFromLine(rest,classFromText(rest)); drivers=driverPairsFromLine(rest);
        clsCell=rest; tail=rest;
      }
      if(!no) continue;
      const entry=(entries||[]).find(e=>String(e.no)===String(no));
      const cls=docClass||classFromText(clsCell)||(entry&&entry.class)||'';
      if(!cls) continue;
      const mf=seqFull.exec(tail);
      const ms=!mf && seqSingle.exec(tail);
      if(!mf && !ms) continue;
      out.push({pos:pos||out.filter(r=>r.class===normCls(cls)).length+1,no:String(no),class:normCls(cls),team,model,constructor:ctorFromVehicle(model||team),drivers,
        driver1Time:toColon(mf?mf[1]:ms[1]), driver2Time:mf?toColon(mf[2]):null,
        laps:+(mf?mf[3]:ms[2]), time:toColon(mf?mf[4]:ms[3])});
    }
    const seen=new Set();
    return out.filter(r=>{ const k=r.class+'|'+r.no; if(seen.has(k)) return false; seen.add(k); return true; })
      .sort((a,b)=>a.class.localeCompare(b.class)||a.pos-b.pos);
  }
  // The two nominated drivers' names for a qualifyingAverageRowsFromText row - a Fastest Lap by
  // Driver document for the same session prints each nominated driver as their own row (one per
  // driver, not per car), same shape flClassificationFromText already reads elsewhere. Reused
  // directly rather than duplicated: this function exists purely to keep the naming clear at the
  // call site, since "average era" qualifying always needs BOTH names, not just one.
  // Some seasons (2014 confirmed) publish this as a "...FastestLapByDriverAfter..." document
  // that ranks EVERY driver's personal-best lap across the whole event weekend so far, not
  // just this qualifying session - each row's own trailing Session column says where that lap
  // actually came from ("Qualifying Practice" vs "Free Practice 3" etc). A car's 3rd crew
  // member can easily out-lap one of the two actual qualifying nominees during a practice
  // session, so without this filter their practice time wrongly displaces a real nominee here.
  // Filtering the raw lines to the qualifying session BEFORE handing off to
  // flClassificationFromText (which has no concept of this trailing column at all) keeps that
  // shared function untouched for its other, session-less callers.
  function qualifyingAverageDriversFromText(text,entries){
    const lines=String(text||'').split('\n');
    const qualLines=lines.filter(raw=>!/Free\s+Practice|Warm[\s-]?Up/i.test(raw));
    const byCarNo=new Map();
    flClassificationFromText(qualLines.join('\n'),entries).forEach(r=>{
      (byCarNo.get(r.no)||byCarNo.set(r.no,[]).get(r.no)).push(r.driver);
    });
    return byCarNo;
  }
  // bestPerClass credits a class pole to exactly one driver name - correct for every other
  // era, but the two-driver-average format's pole belongs to BOTH nominated drivers equally
  // (the grid position came from averaging them together, neither one "did it alone"). Emits
  // one pole record per nominated driver per class (plus the same doubling for the overall
  // pole's own class) so each of them gets counted in driver stats, not just whichever name
  // a single-driver picker happened to land on.
  function polesFromAverageRows(rows){
    const byClass={};
    (rows||[]).forEach(r=>{
      if(!r.time||!r.timeDrivers||!r.timeDrivers.length) return;
      const cls=r.class||'Overall';
      if(!byClass[cls]||timeToSeconds(r.time)<timeToSeconds(byClass[cls].time)) byClass[cls]=r;
    });
    const classEntries=Object.entries(byClass);
    if(!classEntries.length) return [];
    const [overallClass]=classEntries.reduce((best,cur)=>timeToSeconds(cur[1].time)<timeToSeconds(best[1].time)?cur:best);
    const out=[];
    classEntries.forEach(([cls,r])=>{
      r.timeDrivers.forEach(driver=>{
        out.push({type:'PP',class:cls,no:r.no,team:r.team,driver,time:r.time});
        if(cls===overallClass) out.push({type:'PP',class:'Overall',no:r.no,team:r.team,driver,time:r.time});
      });
    });
    return out;
  }

  // ---------- IMSA (imsa.results.alkamelcloud.com) ----------
  // A different results vendor product from the *.alkamelsystems.com sites (WEC/ELMS/MLMC),
  // with its own document shape: ONE combined all-classes ranking per session (like ELMS' 90_
  // doc), columns [Pos, Pic, Nr, Class, Drivers, Team, Car, ...trailing numeric columns...], but
  // with a real, print-width-driven wrapping problem the other vendor's docs don't have - a
  // car's Drivers and/or Car (model) text that doesn't fit the column width spills onto the next
  // physical line as a fragment with NO Pos/Pic/Nr/Class prefix of its own ("K. Frederick" alone,
  // or "GT3.R"/"Evo" continuing the model name). Every other IMSA parsing step depends on first
  // reassembling these fragments back onto their real row.
  const IMSA_CLASS_TOKEN_RE=/^(GTP|LMP2|LMP3|GTD|GTDPRO|GTD-PRO)$/i;
  // IMSA's own driver list mixes ALL-CAPS-surname rows (Race Classification-style, "P. CHATIN")
  // with genuine Title-Case surnames that include a lower-case connector before the final word
  // ("R. van der Zande", "A. Felix da Costa") - a format neither DRIVER_NAME_RE (connector words
  // must be upper-case) nor FULL_NAME_RE (needs a full first name, not just an initial) matches.
  // Case-insensitive matching on the connector (and the surname's own casing) handles the common
  // one-connector-word case; a genuinely irregular multi-word surname beyond that (documented in
  // the review notes when found) still needs the same alias-table fix every other odd name in
  // this codebase gets, rather than a ever more complex regex.
  // No unconditional optional trailing word after the surname - that would just as happily (and
  // wrongly) swallow the first word of whatever text follows a genuinely one-word surname, e.g.
  // the team name's own first word right after the last driver on a line ("D. Barrichello Heart
  // of Racing Team" reading as if "Heart" were part of Barrichello's name). The trailing group
  // below only fires when that next word is itself a recognised connector ("Felix da Costa" -
  // "da" - "Costa"), which a team name's first word never is - so a genuine two-connector
  // surname is captured whole while an ordinary one-word surname stays untouched. A non-
  // connector two-word surname ("Espirito Santo") still only captures its first word - the same
  // alias-table fix every other irregular surname in this file needs, not a regex problem.
  // The trailing group's own connector list is deliberately narrower than the leading one (just
  // "da"/"de", not "van der" etc.) - a driver whose surname itself starts with "van der" and who
  // happens to drive for a team literally named "<that same surname> Racing" (a real case: R.
  // van der Steur / "van der Steur Racing") would otherwise have the regex "helpfully" re-consume
  // the team name's own repeat of his surname as a second trailing connector-word, corrupting
  // both the driver name AND eating the real team name down to just "Racing".
  const IMSA_DRIVER_NAME_RE=/\b([A-Z])\.\s*((?:(?:van\s+der|van|der|de|da|di|del|du|le|la|von|pier|al)\s+)?[A-ZÀ-Ý][a-zà-ÿ'’-]+(?:\s+(?:da|de)\s+[A-ZÀ-Ý][a-zà-ÿ'’-]+)?)\b/gi;
  function imsaDriverPairsFromLine(line){
    const out=[]; let m;
    IMSA_DRIVER_NAME_RE.lastIndex=0;
    while((m=IMSA_DRIVER_NAME_RE.exec(line))){
      const name=titleName(`${m[1].toUpperCase()}. ${m[2]}`);
      if(!out.some(d=>d[0]===name)) out.push([name, lookupCountry(name)]);
    }
    return out;
  }
  // Reassembles the wrapped physical lines of an IMSA Results PDF into one logical line per car -
  // everything downstream (driver/team/model extraction, trailing-column parsing) then works on
  // a single complete string per row, the same as every other document shape in this file.
  function imsaMergeWrappedLines(text){
    const rawLines=String(text||'').replace(/\r/g,'').split('\n');
    const logical=[];
    let current=null;
    for(const raw of rawLines){
      const line=clean(raw);
      if(!line) continue;
      // Footer section (per-class fastest-lap/circuit-record summary) never contains a real
      // results row again once reached - stop entirely rather than risk treating its own
      // multi-column lines as more wrapped fragments of the last real row.
      if(/^Fastest\s+Laps\s+by\s+Class|^Track\s+Status:/i.test(line)) break;
      // Title/header/page-footer lines repeat on every page of a multi-page PDF and must never
      // be glued onto the previous row as if they were a wrapped fragment of it.
      if(/^(Pos\s*Pic|Best\s+Lap$|Qualifying\s+Results|Practice\s+Results|Race\s+(Official|Provisional|Unofficial)\s+Results|Not\s+Classified|Retired|Disqualified)/i.test(line)) continue;
      if(/^\d{1,2}\/\d{1,2}\/\d{2,4}\b/.test(line) || /Page\s+\d+\s*\/\s*\d+/i.test(line)) continue;
      const cols=raw.includes('\t') ? raw.split(/\t+/).map(clean).filter(Boolean) : [line];
      const isPrimary=cols.length>=4 && /^\d{1,3}$/.test(cols[0]) && /^\d{1,3}$/.test(cols[1]) && isCarNoToken(cols[2]) && IMSA_CLASS_TOKEN_RE.test(cols[3]);
      if(isPrimary){
        if(current) logical.push(current);
        current=cols.join(' ');
      } else if(current){
        current+=' '+cols.join(' ');
      }
    }
    if(current) logical.push(current);
    return logical;
  }
  // Shared row-shape extraction once a logical (already-reassembled) line is in hand. Driver
  // names are pulled out FIRST, from the WHOLE line, by content - not just from the tail past
  // the Class token - because a wrapped continuation driver can land AFTER the trailing numeric
  // columns once physical lines are joined back together (the row's own text wraps under the
  // whole table row, not strictly under the Drivers column). Removing every driver match first
  // closes that gap, so pos/pic/no/class/team/model/the trailing numbers all end up contiguous
  // again regardless of where in the original line a wrapped name happened to fall.
  function imsaRowFields(logicalLine){
    const drivers=imsaDriverPairsFromLine(logicalLine);
    // A wrapped Car/model suffix ("GT3.R", "Evo", "EVO2") can land on its own continuation
    // line too, same as a wrapped driver name - stripped the same way, since the constructor
    // is still detected fine from the model's remaining base name (e.g. "Chevrolet Corvette
    // Z06" alone still contains "corvette") and keeping it would otherwise leave stray text
    // sitting after the trailing numeric columns, breaking their end-of-string match below.
    const stripped=logicalLine.replace(IMSA_DRIVER_NAME_RE,' ').replace(/\bEVO2\b/gi,' ').replace(/\bEvo\b/gi,' ').replace(/\bGT3\.R\b/gi,' ').replace(/\s*\/\s*/g,' ').replace(/\s+/g,' ').trim();
    const tokens=stripped.split(' ');
    const pos=tokens[0], pic=tokens[1], no=tokens[2], cls=tokens[3];
    // GTD/GTD PRO rows carrying a Bronze-rated driver print a single-letter category marker
    // ("B") as its own cell right after Class - the same "extra marker column, only on some
    // rows" shape as WEC's Hybrid "H"/Pro-Am "P/A" cells elsewhere in this file - not needed
    // for anything here, so it's just skipped rather than bleeding into the team name.
    const restStart=/^[BSGP]$/.test(tokens[4]||'') ? 5 : 4;
    const rest=tokens.slice(restStart).join(' ');
    return {pos:+pos, pic:+pic, no, class:normCls(cls), rest, drivers};
  }
  // Once the trailing numeric columns are located (by shape, via the caller's own regex - the
  // qualifying and race documents don't share the same trailing shape), everything before that
  // point in `rest` is Team+Car jumbled together with no column boundary left - split the same
  // way teamFromLine/modelFromLine already do for every other combined-text document.
  function imsaTeamModel(middle){
    const model=modelFromLine(middle);
    let team=middle;
    if(model) team=team.split(new RegExp(model.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'))[0];
    return {team:clean(team), model};
  }
  // IMSA's combined qualifying doc ("03_Results_Qualifying.PDF"): trailing columns after the
  // Team/Car text are [best Time, the lap number it was set on, Total laps run, Gap, Gap-to-
  // previous, Mph] - the class leader's row prints a bare "-" (not a signed number) for both
  // Gap columns, so each optional gap slot has to accept either shape, not just [+-]digits.
  function imsaQualifyingRowsFromText(text,entries){
    const logical=imsaMergeWrappedLines(text);
    const out=[];
    for(const line of logical){
      const fields=imsaRowFields(line);
      if(!fields.no||!fields.class) continue;
      // Not anchored to end-of-string: a wrapped model-suffix fragment this file doesn't know
      // to strip out yet ("(992)", a bare "GT3" split from its own "Evo"/"R" continuation...)
      // can still land after this point once physical lines are rejoined - exec() finding the
      // first valid match from the left is enough, since real team/model text never happens to
      // look like this numeric sequence on its own.
      const m=/(\d{1,2}:\d{2}\.\d{3})\s+(\d{1,3})\s+(\d{1,3})\s+(?:(?:[+-][\d.]+|-)\s+){0,2}[\d.]+/.exec(fields.rest);
      if(!m) continue;
      const {team,model}=imsaTeamModel(fields.rest.slice(0,m.index));
      const entry=(entries||[]).find(e=>String(e.no)===String(fields.no));
      out.push({pos:fields.pic||fields.pos, no:String(fields.no), class:fields.class,
        team:team||(entry&&entry.team)||'', model:model||(entry&&entry.model)||'',
        constructor:ctorFromVehicle(model||team)||(entry&&entry.constructor)||'',
        drivers:fields.drivers.length?fields.drivers:(entry&&entry.drivers)||[], time:m[1]});
    }
    const seen=new Set();
    return out.filter(r=>{ const k=r.class+'|'+r.no; if(seen.has(k)) return false; seen.add(k); return true; })
      .sort((a,b)=>a.class.localeCompare(b.class)||a.pos-b.pos);
  }
  // IMSA's combined Race Results doc: trailing columns are [Laps completed, Total Time, Gap,
  // Gap-to-previous, best-lap number, "best-lap time speed" (fused, no separator between them)].
  // A retired/not-classified car's Gap column prints its status text instead of a number, and its
  // Total Time is blank - both still keep everything BEFORE that point (laps completed) valid.
  function imsaRaceRowsFromText(text){
    const logical=imsaMergeWrappedLines(text);
    const rows=[];
    for(const line of logical){
      const fields=imsaRowFields(line);
      if(!fields.no||!fields.class) continue;
      // A car still on the lead lap but well behind prints its Gap as a plain M:SS.mmm time
      // (not just seconds) once the gap passes a minute - the same shape as the best-lap time
      // later in the same row, so both gap slots need that alternative too, not just [\d.]+.
      // A car that stopped running before the finish but still completed enough laps to stay
      // classified prints its own extra "Not Running" status word as a genuinely separate
      // column, INSERTED between Gap and Gap-to-previous (not replacing either one). Not
      // anchored to end-of-string for the same reason as the qualifying regex above - a
      // wrapped model-suffix fragment can still trail past this point.
      // Total Time is H:MM:SS.mmm for a car that ran at least an hour, but just M:SS.mmm (one
      // colon, not two) for one that retired within the first hour - both need to be accepted.
      const m=/(\d{1,4})\s+(\d{1,2}:\d{2}:\d{2}\.\d{3}|\d{1,2}:\d{2}\.\d{3}|-)\s+(\d{1,2}:\d{2}\.\d{3}|[\d.]+|-|\d+\s+Laps?)\s+(?:Not\s+Running\s+)?(\d{1,2}:\d{2}\.\d{3}|[\d.]+|-|\d+\s+Laps?)\s+(\d{1,3})\s+(\d{1,2}:\d{2}\.\d{3})\s*([\d.]+)?/.exec(fields.rest);
      if(!m) continue;
      const {team,model}=imsaTeamModel(fields.rest.slice(0,m.index));
      const notRunning=/Not\s+Running/i.test(fields.rest);
      const status=m[2]==='-' ? (/^(retired|dns|dnf|dsq)/i.test(fields.rest)?'RET':'NC') : (notRunning?'RET':'Classified');
      rows.push({
        pos:fields.pos, no:fields.no, class:fields.class, status,
        team, model, constructor:ctorFromVehicle(model||team),
        drivers:fields.drivers, laps:+m[1], time:m[2]==='-'?'':m[2],
        gap: status==='Classified' ? m[3] : status, bestLap:m[6], bestLapNo:m[5]
      });
    }
    const byNo=new Map();
    rows.forEach(r=>{ const old=byNo.get(r.no); if(!old||r.drivers.length>old.drivers.length) byNo.set(r.no,r); });
    return [...byNo.values()].sort((a,b)=>(a.pos||999)-(b.pos||999));
  }
  // IMSA's "Results by Driver Fastest Lap" doc ranks every recorded lap, one row per driver (not
  // per car) - same purpose as flClassificationFromText for the other vendor's documents, but a
  // completely different, much simpler column layout with no line-wrapping at all: [Pos, Class,
  // "Nr Team" fused as ONE cell, Car, Driver (a real full name here, not initials), Time, Lap,
  // Total, ...Gap/Gap-to-previous only from row 2 of each class on..., Mph].
  function imsaFlByDriverRowsFromText(text,entries){
    const lines=String(text||'').replace(/\r/g,'').split('\n');
    const out=[];
    for(const raw of lines){
      if(!raw.includes('\t')) continue;
      const cols=raw.split(/\t+/).map(clean).filter(Boolean);
      if(!cols.length || !/^\d{1,3}$/.test(cols[0]) || !IMSA_CLASS_TOKEN_RE.test(cols[1]||'')) continue;
      const noTeam=/^(\d{1,3})\s+(.+)$/.exec(cols[2]||'');
      if(!noTeam) continue;
      const no=noTeam[1], team=noTeam[2], model=cols[3]||'', driver=cols[4]||'', time=cols[5]||'', lap=cols[6]||'';
      if(!driver||!time) continue;
      const entry=(entries||[]).find(e=>String(e.no)===String(no));
      out.push({class:normCls(cols[1]),no,team,model,constructor:ctorFromVehicle(model||team)||(entry&&entry.constructor)||'',driver,lap,time});
    }
    return out;
  }
  // IMSA's Starting Grid doc: [Pos, Class, Nr, Drivers (one cell, "/"-separated, no wrapping-
  // to-model issue since there's no Car/model column before it), Team, Car, Time]. Grid position
  // is just the row's own Pos - unlike the Results/Qualifying docs, nothing here needs the
  // trailing-numeric-shape matching, so a driver-name continuation fragment on its own physical
  // line (the same wrapping this vendor's other documents have) can simply be skipped instead of
  // reassembled, since only the (car number -> grid position) pair is needed from this document.
  function imsaGridRowsFromText(text){
    const rawLines=String(text||'').replace(/\r/g,'').split('\n');
    const gridMap=new Map();
    for(const raw of rawLines){
      const line=clean(raw);
      if(!line) continue;
      if(/^(Race\s+(Official|Provisional)\s+Starting\s+Grid|Pos\s+Class|Not\s+Classified|Retired|Disqualified|Car\s*#|Published\s+at|Race\s+Director)/i.test(line)) continue;
      if(/^\d{1,2}\/\d{1,2}\/\d{2,4}\b/.test(line) || /Page\s+\d+\s*\/\s*\d+/i.test(line)) continue;
      const cols=raw.includes('\t') ? raw.split(/\t+/).map(clean).filter(Boolean) : [line];
      if(cols.length<4 || !/^\d{1,3}$/.test(cols[0]) || !IMSA_CLASS_TOKEN_RE.test(cols[1])) continue;
      // Same Bronze-driver "G" marker cell as the Results/Qualifying docs (only present on
      // some rows), sitting between Class and Nr here instead of after Class+Nr - skip it by
      // content rather than assuming a fixed column count.
      const noIdx=/^[BSGP]$/.test(cols[2]||'') ? 3 : 2;
      if(isCarNoToken(cols[noIdx])) gridMap.set(cols[noIdx],+cols[0]);
    }
    return gridMap;
  }

  // The Drivers column in a Classification/ClassificationByCategory doc always lists the whole
  // crew ("A. Lynn / N. Nato / W. Stevens"), never just whoever actually drove that timed lap.
  // A "Fastest Lap by Driver" document for the same session names exactly one driver per car -
  // only the cars/rows that have a time are the one who set it; the rest of that car's crew
  // appear further down with no time and get skipped here. Cross-referencing this against a
  // qualifying row (by car number) is how the UI knows which driver in a 3-name row to
  // highlight, without having to guess from the Classification doc's crew order.
  function qualifyingTimeDriverMap(text){
    const rawLines=String(text||'').replace(/\r/g,'').split('\n');
    const map=new Map();
    for(const raw of rawLines){
      const line=clean(raw);
      if(!line) continue;
      if(/^(No\.?\s+Team|Pos\.?\s|Car|Driver|Team|Best|Fastest|Circuit|FIA|Published|Stewards|Timekeeper)/i.test(line)) continue;
      const times=[...line.matchAll(/(?<!\d[:'])\b\d{1,2}[:']\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      if(!times.length) continue;
      const tokens=line.split(/\s+/);
      const pn=findPosNo(tokens);
      // findPosNo needs an adjacent (rank, car-no) TOKEN PAIR and can come back empty on some
      // documents' layouts even though a car number is still plainly there (e.g. a rank column
      // that isn't a clean standalone token). flClassificationFromText already falls back to a
      // looser "some 1-3-digit number near line start" scan for exactly this reason - without
      // it here too, an entire document's worth of rows silently produced zero bestLapDriver
      // attributions despite flClassificationFromText parsing the very same lines just fine.
      const no=pn ? pn.no : (line.match(/(?:^|\s)(0?\d{1,3}|0[0-9]{2})(?=\s)/)||[])[1];
      if(!no) continue;
      const pairs=driverCellAfterClass(raw,classFromText(line)) || driverPairsFromLine(line);
      if(!pairs.length) continue;
      // A ClassificationByCategory row lists the whole crew in "X. Surname" initials format
      // (matched via DRIVER_NAME_RE) - it can't tell us who specifically drove the lap, so it
      // must never win here. Only a genuine "FirstName SURNAME" match (FULL_NAME_RE, or the
      // structural column lookup above) counts, which only happens on a Fastest-Lap-by-Driver-
      // style doc that prints exactly one driver per row. A team name can itself look like one
      // ("BMW M Team WRT" -> "Team Wrt") and get picked up alongside the real driver, so take
      // the LAST full-name match on the line, not the first - the fixed column order (No/Team/
      // Car/Category/Tyre/Driver/Time) puts the real driver after the team name, never before.
      const full=[...pairs].reverse().find(p=>!/^[A-ZÀ-Ý]\.\s/.test(p[0]));
      // A race's Fastest-Lap-by-Driver document is sorted fastest-to-slowest and prints ONE ROW
      // PER DRIVER, so a multi-driver car appears once per crew member who set their own
      // personal-best lap - the earliest (fastest) row for that car number must win. Without
      // this guard, map.set() below kept overwriting on every later row, so whichever driver on
      // that car happened to have the WORST personal best (always the last-appearing row for
      // that car number, since the document is globally time-sorted) silently won instead.
      if(full && !map.has(String(no))) map.set(String(no), full[0]);
    }
    return map;
  }

  // ---------- Fastest Lap / Pole Position parser (shared shape) ----------
  function bestPerClass(records,type){
    const out={};
    records.forEach(r=>{
      if(!r.time) return;
      const cls=r.class||'Overall';
      if(!out[cls] || timeToSeconds(r.time)<timeToSeconds(out[cls].time)) out[cls]={...r,type,class:cls};
      if(!out.Overall || timeToSeconds(r.time)<timeToSeconds(out.Overall.time)) out.Overall={...r,type,class:'Overall'};
    });
    const order=['Overall','HYP','GTP','LMP2','LMP2PA','LMP3','LMGT3','GTDPRO','GTD','PROAM','GOLD','SILVER','BRONZE'];
    return Object.values(out).sort((a,b)=>order.indexOf(a.class)-order.indexOf(b.class));
  }
  function timeRecordsFromText(text,docClass,entries,type){
    const rawLines=String(text||'').replace(/\r/g,'').split('\n');
    const out=[];
    for(const raw of rawLines){
      const line=clean(raw);
      if(!line) continue;
      if(/^(No\.?\s+Team|Pos\.?\s|Car|Driver|Team|Best|Fastest|Circuit|FIA|Published|Stewards|Timekeeper|Free\s+Practice|Warm|Weather)/i.test(line)) continue;
      const times=[...line.matchAll(/(?<!\d[:'])\b\d{1,2}[:']\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      if(!times.length) continue;
      const tokens=line.split(/\s+/);
      const pn=findPosNo(tokens);
      const no=pn ? pn.no : (line.match(/(?:^|\s)(0?\d{1,3}|0[0-9]{2})(?=\s)/)||[])[1];
      if(!no) continue;
      const entry=(entries||[]).find(e=>String(e.no)===String(no));
      const cls=docClass || classFromText(line) || (entry&&entry.class) || 'Overall';
      // Prefer the driver named directly on this line (Hyperpole/FL-by-driver docs often
      // name one specific driver); fall back to matching against the classification entry.
      let driver='';
      const pairs=driverCellAfterClass(raw,cls) || driverPairsFromLine(line);
      if(pairs.length===1){
        driver=pairs[0][0];
      } else if(entry && entry.drivers && entry.drivers.length){
        const surnames=pairs.map(d=>d[0].split(/\s+/).pop().toLowerCase());
        const hit=entry.drivers.find(d=>surnames.includes(String(d[0]).split(/\s+/).pop().toLowerCase()));
        driver=(hit||entry.drivers[0])[0];
      } else if(pairs.length){
        driver=pairs[0][0];
      }
      const lapMatch=line.match(/\bLap\s*(\d+)\b/i);
      out.push({type, class:normCls(cls), no:String(no), team:(entry&&entry.team)||'', driver, lap:lapMatch?lapMatch[1]:'', time:toColonTime(times[times.length-1])});
    }
    return bestPerClass(out,type);
  }
  // A Fastest Lap by Driver document ranks every recorded lap, so the SAME car can appear
  // several times - once per driver who set a personal-best lap during the race, not once
  // per car. timeRecordsFromText already reduces this down to a single best-per-class record
  // for the Dashboard's Fastest Lap panel; a driver-level classification instead needs the
  // whole thing kept, one row per (car, driver).
  function flClassificationFromText(text,entries){
    const rawLines=String(text||'').replace(/\r/g,'').split('\n');
    const out=[];
    for(const raw of rawLines){
      const line=clean(raw);
      if(!line) continue;
      if(/^(No\.?\s+Team|Pos\.?\s|Car|Driver|Team|Best|Fastest|Circuit|FIA|Published|Stewards|Timekeeper|Free\s+Practice|Warm|Weather)/i.test(line)) continue;
      const times=[...line.matchAll(/(?<!\d[:'])\b\d{1,2}[:']\d{2}\.\d{3}\b/g)].map(m=>m[0]);
      if(!times.length) continue;
      const tokens=line.split(/\s+/);
      const pn=findPosNo(tokens);
      const no=pn ? pn.no : (line.match(/(?:^|\s)(0?\d{1,3}|0[0-9]{2})(?=\s)/)||[])[1];
      if(!no) continue;
      const entry=(entries||[]).find(e=>String(e.no)===String(no));
      const cls=classFromText(line)||(entry&&entry.class)||'';
      if(!cls) continue;
      const pairs=driverCellAfterClass(raw,normCls(cls)) || driverPairsFromLine(line);
      let driver='';
      if(pairs.length===1){ driver=pairs[0][0]; }
      else if(entry && entry.drivers && entry.drivers.length){
        const surnames=pairs.map(d=>d[0].split(/\s+/).pop().toLowerCase());
        const hit=entry.drivers.find(d=>surnames.includes(String(d[0]).split(/\s+/).pop().toLowerCase()));
        driver=(hit||entry.drivers[0])[0];
      } else if(pairs.length){ driver=pairs[0][0]; }
      if(!driver) continue;
      out.push({class:normCls(cls),no:String(no),team:(entry&&entry.team)||'',model:(entry&&entry.model)||'',constructor:(entry&&entry.constructor)||'',driver,time:toColonTime(times[times.length-1])});
    }
    return out;
  }

  // ---------- entries / race object assembly ----------
  function entriesFromClassificationText(text,entriesLog){
    const rows=parseClassification(text);
    entriesLog.rows=rows.length;
    return rows.map((r,i)=>({
      pos:r.pos||i+1, class:r.class, no:r.no, constructor:r.constructor||'', model:r.model||'',
      team:r.team||'', gap:r.gap||'—', laps:r.laps||0, time:r.time||'', status:r.status||'Classified',
      drivers:r.drivers||[], bestLap:r.bestLap||'', bestLapNo:r.bestLapNo||''
    })).filter(e=>e.no);
  }
  function defaultSegments(officialDuration,officialLaps){
    const dur=typeof parseTime==='function' ? parseTime(officialDuration||'06:00:00') : 21600;
    return [{id:'g0',phase:'GREEN',start:0,end:dur,startLap:0,endLap:Number(officialLaps)||0,reason:'Race',notes:'Race Control pending manual entry.'}];
  }
  function makeRaceId(meta){
    const slug=String(meta.event||'imported-race').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    return `${meta.series||'wec'}-${slug}-${meta.season||new Date().getFullYear()}`;
  }
  function buildRaceObject(meta,entries,fl,poles,sourceNames,qualifying,flClassification){
    const officialLaps=Math.max(0,...entries.map(e=>Number(e.laps)||0));
    const officialDuration=meta.officialDuration||meta.scheduledDuration||'06:00:00';
    return {
      id: meta.id || makeRaceId(meta),
      season:Number(meta.season)||new Date(meta.date||Date.now()).getFullYear(),
      round:Number(meta.round)||0,
      series:meta.series||'wec',
      event:meta.event||'', circuit:meta.circuit||'', country:meta.country||'', date:meta.date||'',
      scheduledDuration:meta.scheduledDuration||officialDuration, officialDuration,
      scheduledLaps:Number(meta.scheduledLaps)||officialLaps, officialLaps:Number(meta.officialLaps)||officialLaps,
      segments:defaultSegments(officialDuration,Number(meta.officialLaps)||officialLaps),
      entries:entries.slice().sort((a,b)=>(Number(a.pos)||9999)-(Number(b.pos)||9999)),
      performance:{fastestLaps:fl||[],poles:poles||[]},
      qualifying:qualifying||[],
      flClassification:flClassification||[],
      completeness:{metadata:!!(meta.id&&meta.event&&meta.circuit),results:!!entries.length,fastestLaps:!!(fl&&fl.length),poles:!!(poles&&poles.length),raceControl:false},
      sources:sourceNames||[]
    };
  }
  function toCode(r){ return `replaceRace(${JSON.stringify(r,null,2)});`; }

  // ---------- Wizard UI ----------
  async function fileText(file){
    const ext=(file.name.split('.').pop()||'').toLowerCase();
    if(ext==='pdf' || /pdf/i.test(file.type||'')) return await readPdfText(file);
    return await file.text();
  }
  function normalizeDateInput(v){
    const raw=String(v||'').trim(); if(!raw) return '';
    if(/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    const m=raw.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})$/);
    return m ? `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}` : raw;
  }
  function readMeta(){
    return {
      id:$('impId')?.value.trim(), series:$('impSeries')?.value||'wec', season:$('impSeason')?.value, round:$('impRound')?.value,
      event:$('impEvent')?.value.trim(), circuit:$('impCircuit')?.value.trim(), country:$('impCountry')?.value.trim(),
      date:normalizeDateInput($('impDate')?.value), scheduledDuration:$('impScheduled')?.value.trim(),
      officialDuration:$('impOfficial')?.value.trim(), scheduledLaps:$('impLaps')?.value, officialLaps:$('impLaps')?.value
    };
  }
  function seriesOptionsHtml(){
    const ids=(typeof SERIES==='object'&&SERIES) ? Object.keys(SERIES) : ['wec','elms','aslms','mlmc','imsa'];
    return ids.map(id=>`<option value="${E(id)}">${E((SERIES[id]&&SERIES[id].short)||id.toUpperCase())}</option>`).join('');
  }
  function setMetaDefaultsFromCurrentRace(){
    // Pre-fill from whichever race is currently selected in the calendar, so importing
    // results for that slot doesn't require retyping event/circuit/country/date by hand.
    const r=(typeof state!=='undefined'&&state.race)||{};
    // Pre-filling the exact Race ID means the import overwrites this same calendar slot
    // instead of generating a differently-slugged id and leaving an orphaned duplicate.
    const values={impSeries:r.series||'wec',impSeason:r.season||new Date().getFullYear(),impRound:r.round||'',impId:r.id||'',impEvent:r.event||'',impCircuit:r.circuit||'',impCountry:r.country||'',impDate:r.date||'',impScheduled:r.scheduledDuration||'06:00:00',impOfficial:'',impLaps:r.scheduledLaps||''};
    // Only skip fields the user has actually typed into (dataset.dirty) - not just "has a
    // value", since a prior auto-fill (e.g. from page load, before a different race was
    // selected) would otherwise permanently block this from ever refreshing that field.
    Object.entries(values).forEach(([id,val])=>{ const el=$(id); if(el && !el.dataset.dirty) el.value=val; });
  }
  async function readInputFiles(inputId,role,required){
    const input=$(inputId); const files=input&&input.files ? Array.from(input.files) : [];
    if(required && !files.length) throw new Error(role+' file is required.');
    const docs=[];
    for(const f of files){
      try{ docs.push({name:f.name,role,text:await fileText(f)}); }
      catch(e){ docs.push({name:f.name,role,text:'',error:e.message||String(e)}); }
    }
    return docs;
  }
  function mergePerf(a,b){
    const map={}; [...(a||[]),...(b||[])].forEach(p=>{ const k=p.class||'Overall'; if(!map[k] || timeToSeconds(p.time)<timeToSeconds(map[k].time)) map[k]=p; });
    return Object.values(map);
  }
  let session=null;
  // IMSA (imsa.results.alkamelcloud.com) is a different vendor product with its own document
  // shapes end to end (see the imsa* functions above) - none of the Al Kamel-oriented parsing
  // below (entriesFromClassificationText, timeRecordsFromText, qualifyingRowsFromText...) can
  // read its files at all, so a race with series=IMSA gets routed through this separate,
  // simpler pipeline instead. Grid/starting-position isn't handled yet (no imsa grid-doc parser
  // exists) - a Starting Grid file uploaded here is just ignored, not an error.
  async function analyzeImsa(){
    const out=$('impOutput'); out.innerHTML='<div class="empty-state">Reading files…</div>';
    let resultsDocs=[],fastestDocs=[],qualDocs=[],gridDocs=[];
    try{
      resultsDocs=await readInputFiles('impResultsFile','Race Results',true);
      fastestDocs=await readInputFiles('impFastestFile','Fastest Lap by Driver',false);
      qualDocs=await readInputFiles('impQualFiles','Qualifying Results',false);
      gridDocs=await readInputFiles('impGridFile','Starting Grid',false);
    }catch(e){ out.innerHTML=`<div class="validation-row warn"><div>⚠</div><div><strong>Could not read files</strong><span>${E(e.message||String(e))}</span></div></div>`; return; }

    const docs=[...resultsDocs,...fastestDocs,...qualDocs,...gridDocs];
    const notes=[];
    docs.forEach(d=>notes.push(d.error?`ERR ${d.role}: ${d.name}: ${d.error}`:`${d.role}: ${d.name}`));

    let entries=[];
    for(const d of resultsDocs){
      if(d.error) continue;
      const parsed=imsaRaceRowsFromText(d.text);
      notes.push(`  results rows from ${d.name}: ${parsed.length}`);
      if(parsed.length){ entries=parsed; break; }
    }

    for(const d of gridDocs){
      if(d.error) continue;
      const gridMap=imsaGridRowsFromText(d.text);
      notes.push(`  grid positions from ${d.name}: ${gridMap.size}`);
      entries.forEach(e=>{ const g=gridMap.get(String(e.no)); if(g) e.grid=g; });
    }

    let flClassification=[];
    for(const d of fastestDocs){
      if(d.error) continue;
      const parsed=imsaFlByDriverRowsFromText(d.text,entries);
      notes.push(`  FL by driver rows from ${d.name}: ${parsed.length}`);
      flClassification=flClassification.concat(parsed);
    }
    const fl=flClassification.length?bestPerClass(flClassification,'FL'):[];
    // Race Classification's own bestLap/bestLapNo is per-CAR only (never says which of the 2-4
    // drivers actually drove it) - the per-driver Fastest Lap rows above let each entry point at
    // whichever of its own drivers set that car's overall best lap, the same "bestLapDriver"
    // highlight the Al Kamel-format pipeline gives Race Order elsewhere in this file.
    const bestLapDriverByNo=new Map();
    flClassification.forEach(r=>{
      const old=bestLapDriverByNo.get(r.no);
      if(!old||timeToSeconds(r.time)<timeToSeconds(old.time)) bestLapDriverByNo.set(r.no,r);
    });
    entries.forEach(e=>{ const bd=bestLapDriverByNo.get(e.no); if(bd) e.bestLapDriver=bd.driver; });

    let qualifying=[];
    for(const d of qualDocs){
      if(d.error) continue;
      const qrows=imsaQualifyingRowsFromText(d.text,entries);
      notes.push(`  qualifying rows from ${d.name}: ${qrows.length}`);
      qualifying=qualifying.concat(qrows);
    }
    const poles=qualifying.length?bestPerClass(qualifying.map(r=>({class:r.class,no:r.no,team:r.team,driver:(r.drivers[0]||[])[0]||'',time:r.time})),'PP'):[];

    if(typeof learnDriverCountries==='function'){ learnDriverCountries(entries); learnDriverCountries(qualifying); }

    session={docs,notes,entries,fl,poles,qualifying,flClassification,groups:{resultsDocs,fastestDocs,qualDocs,gridDocs}};
    const race=buildRaceObject({...readMeta()},entries,fl,poles,docs.map(d=>`${d.role}: ${d.name}`),qualifying,flClassification);
    session.race=race;
    renderPreview(race,notes,session.groups);
  }
  async function analyze(){
    if((readMeta().series||'')==='imsa') return analyzeImsa();
    const out=$('impOutput'); out.innerHTML='<div class="empty-state">Reading files…</div>';
    let resultsDocs=[],fastestDocs=[],qualDocs=[],gridDocs=[];
    try{
      resultsDocs=await readInputFiles('impResultsFile','Race Classification',true);
      fastestDocs=await readInputFiles('impFastestFile','Fastest Laps',false);
      qualDocs=await readInputFiles('impQualFiles','Qualifying / Hyperpole',false);
      gridDocs=await readInputFiles('impGridFile','Starting Grid',false);
    }catch(e){ out.innerHTML=`<div class="validation-row warn"><div>⚠</div><div><strong>Could not read files</strong><span>${E(e.message||String(e))}</span></div></div>`; return; }

    const docs=[...resultsDocs,...fastestDocs,...qualDocs,...gridDocs];
    const notes=[];
    docs.forEach(d=>notes.push(d.error?`ERR ${d.role}: ${d.name}: ${d.error}`:`${d.role}: ${d.name}`));

    let entries=[];
    for(const d of resultsDocs){
      if(d.error) continue;
      const log={};
      const parsed=entriesFromClassificationText(d.text,log);
      notes.push(`  results rows from ${d.name}: ${parsed.length} (raw parsed ${log.rows||0})`);
      if(parsed.length){ entries=parsed; break; }
    }
    // Race Classification only prints driver initials ("A. Lynn"), which can't match a
    // full-name-keyed driver database or the archive's own history for the same person
    // (they'd become a second, near-empty "A. Lynn" record next to "Alex Lynn"). The
    // Fastest Laps / Qualifying documents often print full names ("Will Stevens") for the
    // same cars, so use those to upgrade initials to full names before anything else runs.
    for(const d of [...fastestDocs,...qualDocs]){
      if(d.error) continue;
      enrichDriverNames(entries, fullNameEnrichmentMap(d.text));
    }
    // Starting Grid names one driver per car too, and isn't limited to whoever set a
    // qualifying-relevant lap the way Fastest Laps is - catches names FL/Qualifying missed.
    for(const d of gridDocs){
      if(d.error) continue;
      enrichDriverNames(entries, driverNamesFromStartingGrid(d.text));
    }
    if(typeof learnDriverCountries==='function') learnDriverCountries(entries);

    // Cars that didn't make the Hyperpole cutoff have no Hyperpole-doc-based timeDriver at all -
    // the Starting Grid is the only document that still names who set THEIR grid-qualifying lap,
    // so record it per car here too, for the render-time "beyond Hyperpole" rows to pick up.
    const gridDriverByNo=new Map();
    for(const d of gridDocs){
      if(d.error) continue;
      driverNamesFromStartingGrid(d.text).forEach((names,no)=>{ if(!gridDriverByNo.has(no) && names.size) gridDriverByNo.set(no,[...names][0]); });
    }
    entries.forEach(e=>{ const gd=gridDriverByNo.get(String(e.no)); if(gd) e.gridDriver=gd; });

    for(const d of gridDocs){
      if(d.error) continue;
      const gridMap=parseStartingGrid(d.text);
      notes.push(`  grid positions from ${d.name}: ${gridMap.size}`);
      applyStartingGrid(entries,gridMap);
    }

    let fl=[];
    for(const d of fastestDocs){
      if(d.error) continue;
      const parsed=timeRecordsFromText(d.text,'',entries,'FL');
      notes.push(`  FL from ${d.name}: ${parsed.length}`);
      if(parsed.length) fl=mergePerf(fl,parsed);
    }
    if(!fl.length){
      for(const d of resultsDocs){
        if(d.error) continue;
        const fromResults=entriesFromClassificationText(d.text,{}).filter(e=>e.bestLap).map(e=>({type:'FL',class:e.class,no:e.no,team:e.team,driver:(e.drivers[0]||[])[0]||'',lap:e.bestLapNo,time:e.bestLap}));
        if(fromResults.length){ fl=mergePerf(fl,bestPerClass(fromResults,'FL')); notes.push(`  FL fallback from ${d.name}: ${fromResults.length}`); }
      }
    }
    // Race Classification's own bestLap/bestLapNo is per-CAR only (it never says which of the
    // 2-3 drivers actually drove that lap) - the Fastest Lap by Driver document names exactly
    // one driver per car (same shape qualifyingTimeDriverMap already reads for Hyperpole/
    // qualifying), so reuse it here to attribute each entry's own best race lap, for every car
    // that has one - not just the fastest-per-class cars already covered by fl[].
    const bestLapDriverByNo=new Map();
    for(const d of fastestDocs){
      if(d.error) continue;
      qualifyingTimeDriverMap(d.text).forEach((name,no)=>{ if(!bestLapDriverByNo.has(no)) bestLapDriverByNo.set(no,name); });
    }
    entries.forEach(e=>{ const bd=bestLapDriverByNo.get(String(e.no)); if(bd) e.bestLapDriver=bd; });

    // Every individual driver's own fastest race lap, not reduced to one row per class (fl[]
    // above) or one row per car (entries[].bestLapDriver above) - a full driver-level
    // classification, same source document, kept whole this time.
    let flClassification=[];
    for(const d of fastestDocs){
      if(d.error) continue;
      flClassification=flClassification.concat(flClassificationFromText(d.text,entries));
    }
    if(flClassification.length){
      // Multi-hour/session Fastest Lap documents (24h races split by hour) can repeat the same
      // (car, driver) pair - keep only that driver's own quickest recorded lap.
      const byKey=new Map();
      flClassification.forEach(r=>{
        const k=r.class+'|'+r.no+'|'+r.driver.toLowerCase();
        const old=byKey.get(k);
        if(!old || timeToSeconds(r.time)<timeToSeconds(old.time)) byKey.set(k,r);
      });
      flClassification=[...byKey.values()].sort((a,b)=>timeToSeconds(a.time)-timeToSeconds(b.time));
    }

    let poles=[], qualifying=[];
    const timeDriverByNo=new Map();
    for(const d of qualDocs){
      if(d.error) continue;
      const docClass=classifyDoc(d.name,d.text)==='pole' ? singleClassFromText(d.name+' '+d.text.slice(0,400)) : '';
      const parsed=timeRecordsFromText(d.text,docClass,entries,'PP');
      notes.push(`  PP from ${d.name}: ${parsed.length}`);
      if(parsed.length) poles=mergePerf(poles,parsed);
      const qrows=qualifyingRowsFromText(d.text,docClass,entries);
      notes.push(`  qualifying order from ${d.name}: ${qrows.length}`);
      if(qrows.length){
        // A car already captured (better-ranked) from an earlier qualifying document wins -
        // e.g. don't let a class's own file override rows already placed by a combined file.
        const known=new Set(qualifying.map(r=>r.class+'|'+r.no));
        qualifying=qualifying.concat(qrows.filter(r=>!known.has(r.class+'|'+r.no)));
      }
      // A "Fastest Lap by Driver" doc for the same Hyperpole/Qualifying session (uploaded
      // alongside the Classification one, in the same Qualifying/Hyperpole file picker) names
      // exactly one driver per car - remember it per car number regardless of which qualDoc it
      // came from.
      qualifyingTimeDriverMap(d.text).forEach((name,no)=>{ if(!timeDriverByNo.has(no)) timeDriverByNo.set(no,name); });
    }
    qualifying.forEach(r=>{ const td=timeDriverByNo.get(String(r.no)); if(td) r.timeDriver=td; });
    qualifying.sort((a,b)=>a.class.localeCompare(b.class)||a.pos-b.pos);
    // Same initials-vs-full-name upgrade as entries, so the Qualifying view also shows full
    // names/flags instead of "A. Lynn" with no country.
    for(const d of [...fastestDocs,...qualDocs]){
      if(d.error) continue;
      enrichDriverNames(qualifying, fullNameEnrichmentMap(d.text));
    }
    for(const d of gridDocs){
      if(d.error) continue;
      enrichDriverNames(qualifying, driverNamesFromStartingGrid(d.text));
    }
    if(typeof learnDriverCountries==='function') learnDriverCountries(qualifying);

    session={docs,notes,entries,fl,poles,qualifying,flClassification,groups:{resultsDocs,fastestDocs,qualDocs}};
    const race=buildRaceObject({...readMeta()},entries,fl,poles,docs.map(d=>`${d.role}: ${d.name}`),qualifying,flClassification);
    session.race=race;
    renderPreview(race,notes,session.groups);
  }
  function applyMetadataToPreview(){
    if(!session) return;
    const race=buildRaceObject({...readMeta()},session.entries,session.fl,session.poles,session.docs.map(d=>`${d.role}: ${d.name}`),session.qualifying,session.flClassification);
    session.race=race;
    renderPreview(race,session.notes,session.groups);
  }
  function fileListHtml(docs,empty){
    if(!docs.length) return `<span class="muted">${E(empty||'none')}</span>`;
    return docs.map(d=>`<span class="import-chip ${d.error?'warn':''}">${d.error?'⚠':'✓'} ${E(d.name)}</span>`).join(' ');
  }
  function perfRowsHtml(items){
    if(!items||!items.length) return '<div class="empty-state">No records parsed.</div>';
    return `<div class="import-mini-table">${items.map(p=>`<div><strong>${E(p.class||'Overall')}</strong><span>#${E(p.no)} ${E(p.team||'')}</span><em>${E(p.driver||'')} ${E(p.lap?('Lap '+p.lap):'')} · ${E(p.time||'')}</em></div>`).join('')}</div>`;
  }
  function orderPreviewHtml(race){
    if(!race.entries.length) return '<div class="empty-state">No entries parsed.</div>';
    try{
      if(typeof orderRowsHtml==='function' && typeof state!=='undefined'){
        const oldRace=state.race, oldFilter=state.classFilter;
        state.race=race; state.classFilter=null;
        const rows=orderRowsHtml(race.entries,15,false);
        state.race=oldRace; state.classFilter=oldFilter;
        return `<div class="order-header"><span>Pos</span><span>Class</span><span>#</span><span></span><span>Team / Car</span><span>Drivers</span><span>Gap</span></div><div class="entry-table">${rows}</div>`;
      }
    }catch(e){}
    return `<div class="import-mini-table">${race.entries.slice(0,15).map(e=>`<div><strong>${E(e.pos)}. #${E(e.no)} ${E(e.class)}</strong><span>${E(e.team)} · ${E(e.model||e.constructor||'')}</span><em>${E((e.drivers||[]).map(d=>d[0]).join(' / '))} · ${E(e.gap||e.time||'')}</em></div>`).join('')}</div>`;
  }
  function classWinnersHtml(race){
    const groups={}; (race.entries||[]).forEach(e=>{(groups[e.class]??=[]).push(e)});
    const winners=Object.entries(groups).map(([cls,arr])=>{arr.sort((a,b)=>(Number(a.pos)||9999)-(Number(b.pos)||9999)); return [cls,arr[0]];});
    if(!winners.length) return '<div class="empty-state">No class winners.</div>';
    return `<div class="import-detected">${winners.map(([cls,e])=>`<span>✓ ${E(cls)} #${E(e.no)} ${E(e.team||'')}</span>`).join('')}</div>`;
  }
  function validate(race){
    const errors=[],warnings=[];
    if(!race.event || !race.circuit) errors.push('Missing required metadata: Event and Circuit must be filled in.');
    if(!race.entries.length) errors.push('No entries were parsed from the Race Classification PDF.');
    const seen=new Set(); const dupes=new Set();
    race.entries.forEach(e=>{ if(seen.has(e.no)) dupes.add(e.no); seen.add(e.no); });
    if(dupes.size) errors.push('Duplicate car numbers: '+[...dupes].join(', '));
    const noDrivers=race.entries.filter(e=>!e.drivers||!e.drivers.length).length;
    if(noDrivers) warnings.push(`${noDrivers} car(s) have no drivers detected — check the source PDF.`);
    if(!(race.performance.fastestLaps||[]).length) warnings.push('No fastest laps parsed.');
    if(!(race.performance.poles||[]).length) warnings.push('No pole positions parsed.');
    return {errors,warnings};
  }
  function renderPreview(race,notes,groups){
    const {errors,warnings}=validate(race);
    const classes=[...new Set((race.entries||[]).map(e=>e.class))];
    const out=$('impOutput'); if(!out) return;
    out.innerHTML=`
      <div class="import-format"><strong>SCC Importer preview</strong><span class="muted">Review before importing to the archive.</span></div>
      <div class="import-detected"><span>${race.entries.length} cars</span><span>${classes.length} classes</span><span>${classes.map(E).join(', ')||'no classes'}</span><span>${race.performance.fastestLaps.length} FL</span><span>${race.performance.poles.length} PP</span></div>
      <div class="import-detected"><strong>Results</strong> ${fileListHtml(groups.resultsDocs,'missing')}<br><strong>Fastest Laps</strong> ${fileListHtml(groups.fastestDocs,'optional / fallback from results')}<br><strong>Qualifying / Hyperpole</strong> ${fileListHtml(groups.qualDocs,'optional')}</div>
      ${errors.length?`<div class="validation-row warn"><div>⛔</div><div><strong>Cannot import</strong><span>${errors.map(E).join('<br>')}</span></div></div>`:'<div class="validation-row ok"><div>✓</div><div><strong>Ready to import</strong><span>Review Order, PP and FL below.</span></div></div>'}
      ${warnings.length?`<div class="validation-row warn"><div>⚠</div><div><strong>Warnings</strong><span>${warnings.map(E).join('<br>')}</span></div></div>`:''}
      <div class="wizard-card preview-card"><h3>Dashboard preview</h3><div class="import-detected"><span>${E((race.series||'').toUpperCase())}</span><span>R${E(race.round||'—')}</span><span>${E(race.event||'—')}</span><span>${E(race.circuit||'—')}</span><span>${E(race.date||'—')}</span><span>${E(race.officialDuration||race.scheduledDuration||'—')}</span><span>${E(race.officialLaps||race.scheduledLaps||'—')} laps</span></div></div>
      <div class="wizard-card preview-card"><h3>Order preview</h3>${orderPreviewHtml(race)}</div>
      <div class="wizard-card preview-card"><h3>Class winners</h3>${classWinnersHtml(race)}</div>
      <div class="wizard-card preview-card"><h3>Fastest Laps</h3>${perfRowsHtml(race.performance.fastestLaps)}</div>
      <div class="wizard-card preview-card"><h3>Pole Positions</h3>${perfRowsHtml(race.performance.poles)}</div>
      <details class="wizard-card"><summary>Advanced · parser log and generated replaceRace() code</summary><pre>${E(notes.join('\n'))}</pre><label class="full">Generated replaceRace() code<textarea id="impCode" class="import-textarea" rows="12"></textarea></label><div class="form-actions"><button id="impCopyBtn" class="secondary">Select generated code</button></div></details>
      <div class="form-actions sticky-import-actions"><button id="impAddBtn" ${errors.length?'disabled':''}>Import race to archive</button><button id="impRefreshBtn" class="secondary">Refresh preview from metadata</button></div>`;
    $('impCode').value=toCode(race);
    if(!errors.length) $('impAddBtn').onclick=()=>addToArchive(race);
    $('impRefreshBtn').onclick=applyMetadataToPreview;
    $('impCopyBtn').onclick=()=>{ $('impCode').focus(); $('impCode').select(); };
    renderSidePanel(race,errors,warnings,groups);
  }
  function renderSidePanel(race,errors,warnings,groups){
    const box=$('impSide'); if(!box) return;
    box.innerHTML=`<h2>Import Session</h2>
      <div class="stat-grid"><div class="stat"><strong>${race.entries.length}</strong><span>RESULTS CARS</span></div><div class="stat"><strong>${race.performance.fastestLaps.length}</strong><span>FL ROWS</span></div><div class="stat"><strong>${race.performance.poles.length}</strong><span>PP ROWS</span></div></div>
      <div class="validation-list">${errors.map(w=>`<div class="validation-row warn"><div>⛔</div><div><strong>Blocked</strong><span>${E(w)}</span></div></div>`).join('')}${warnings.map(w=>`<div class="validation-row warn"><div>⚠</div><div><strong>Warning</strong><span>${E(w)}</span></div></div>`).join('')}${(!errors.length&&!warnings.length)?'<div class="validation-row ok"><div>✓</div><div><strong>Ready</strong><span>Preview can be imported.</span></div></div>':''}</div>
      <p class="muted">Race Control remains manual. "Import race to archive" saves automatically to this browser (localStorage) - no extra save step. It won't follow you to a different browser/computer; use the generated code to update js/data.js for that.</p>`;
  }
  function addToArchive(race){
    // No blocking alert() here: it freezes the whole page until dismissed, which made it
    // easy to lose track of whether the import actually happened. Switching to Dashboard
    // and showing the imported race is the confirmation.
    // `state` is declared with `let` in app.js, so it never becomes `window.state` - it must
    // be assigned as the bare identifier, not through a (always-undefined) window.state check.
    if(typeof window.replaceRace==='function') window.replaceRace(race);
    else { const i=RACES.findIndex(x=>x.id===race.id); if(i>=0) RACES[i]=race; else RACES.push(race); }
    persistRace(race);
    if(typeof state!=='undefined'){ state.race=JSON.parse(JSON.stringify(race)); state.selectedSegment=null; state.classFilter=null; }
    if(typeof window.recalculateClassPositions==='function') window.recalculateClassPositions();
    if(typeof window.renderImportChecklist==='function') window.renderImportChecklist();
    if(typeof window.render==='function') window.render();
    if(typeof window.switchTab==='function') window.switchTab('dashboard');
  }
  function clearSession(){
    session=null;
    ['impResultsFile','impFastestFile','impQualFiles','impGridFile'].forEach(id=>{ const el=$(id); if(el) el.value=''; });
    if($('impOutput')) $('impOutput').innerHTML='<div class="empty-state">No PDFs loaded in this session.</div>';
    if($('impSide')) $('impSide').innerHTML='<h2>Import Session</h2><div class="empty-state">No PDFs loaded yet.</div>';
  }

  function installStyles(){
    if($('scc-importer-styles')) return;
    const st=document.createElement('style'); st.id='scc-importer-styles';
    st.textContent=`.preview-card{margin-top:14px}.import-mini-table{display:grid;gap:8px}.import-mini-table>div{border:1px solid rgba(148,163,184,.22);border-radius:12px;padding:10px;background:rgba(15,23,42,.35)}.import-mini-table strong{display:block}.import-mini-table span{display:block;color:var(--muted)}.import-mini-table em{display:block;font-style:normal;color:#cbd5e1}.sticky-import-actions{position:sticky;bottom:0;background:rgba(2,6,23,.92);padding:12px;border-top:1px solid rgba(148,163,184,.18);z-index:2}#tab-import details summary{cursor:pointer;font-weight:800}.stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.stat-grid .stat{padding:9px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);text-align:center}.stat-grid .stat strong{display:block;font-size:20px;line-height:1.2}.stat-grid .stat span{font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:800}.import-chip{display:inline-block;padding:3px 8px;margin:2px 4px 2px 0;border-radius:999px;border:1px solid rgba(148,163,184,.3);font-size:12px}.import-chip.warn{border-color:rgba(245,158,11,.5);color:#f5b942}`;
    document.head.appendChild(st);
  }
  function installUI(){
    installStyles();
    const tab=$('tab-import'); if(!tab) return;
    tab.innerHTML=`
      <div class="import-layout">
        <section class="panel import-panel">
          <div id="importerCard" class="wizard-card">
            <h2>SCC Importer</h2>
            <p class="muted">Preview-first importer for Al Kamel PDFs (WEC, ELMS, Asian LMS, MLMC, IMSA-style documents). One Race Classification PDF, optional Fastest Laps, and 1..N Qualifying/Hyperpole PDFs (merged automatically). Race Control stays manual.</p>
            <div class="wizard-steps">
              <span class="wizard-step active">1 Metadata</span>
              <span class="wizard-step">2 Classification</span>
              <span class="wizard-step">3 FL / PP</span>
              <span class="wizard-step">4 Preview</span>
              <span class="wizard-step">5 Import</span>
            </div>
            <h3>1 · Metadata</h3>
            <div class="form-grid import-meta-grid">
              <label>Series<select id="impSeries">${seriesOptionsHtml()}</select></label>
              <label>Season<input id="impSeason" type="number" /></label>
              <label>Round<input id="impRound" type="number" /></label>
              <label>Race ID<input id="impId" placeholder="auto from event/season if left blank" /></label>
              <label class="full">Event<input id="impEvent" placeholder="6 Hours of Fuji" /></label>
              <label>Circuit<input id="impCircuit" placeholder="Fuji Speedway" /></label>
              <label>Country<input id="impCountry" placeholder="Japan" /></label>
              <label>Date<input id="impDate" placeholder="YYYY-MM-DD or DD.MM.YYYY" /></label>
              <label>Scheduled<input id="impScheduled" placeholder="06:00:00" /></label>
              <label>Official<input id="impOfficial" placeholder="optional" /></label>
              <label>Laps<input id="impLaps" type="number" /></label>
            </div>
            <h3>2 · Race Classification</h3>
            <label class="full">Race Classification PDF<input id="impResultsFile" type="file" accept=".pdf,.txt,application/pdf,text/plain" /></label>
            <h3>3 · Fastest Laps and Qualifying / Hyperpole</h3>
            <label class="full">Fastest Laps PDF <small class="muted">optional, falls back to Race Classification</small><input id="impFastestFile" type="file" accept=".pdf,.txt,application/pdf,text/plain" /></label>
            <label class="full">Qualifying / Hyperpole PDFs <small class="muted">1..N files, e.g. one per class</small><input id="impQualFiles" type="file" accept=".pdf,.txt,application/pdf,text/plain" multiple /></label>
            <h3>4 · Starting Grid</h3>
            <label class="full">Starting Grid PDF <small class="muted">optional - enables the grid-to-finish position change arrows in Order</small><input id="impGridFile" type="file" accept=".pdf,.txt,application/pdf,text/plain" /></label>
            <div class="form-actions"><button id="impAnalyzeBtn">Generate preview</button><button id="impClearBtn" class="secondary">Start new import / clear PDFs</button></div>
          </div>
          <div id="importChecklist" class="import-preview"></div>
          <div id="impOutput" class="import-preview"><div class="empty-state">No PDFs loaded in this session.</div></div>
        </section>
        <aside id="impSide" class="panel import-help"><h2>Import Session</h2><div class="empty-state">No PDFs loaded yet.</div></aside>
      </div>`;
    setMetaDefaultsFromCurrentRace();
    // Re-apply whenever the Import tab is (re)opened, not just once at page load: installUI()
    // only runs a single time, but the user picks a different calendar race afterwards and
    // then clicks Import expecting that race's metadata to be there. addEventListener (not
    // .onclick=) so this doesn't clobber app.js's own tab-switching handler on the same button.
    const importNavBtn=document.querySelector('.tabs button[data-tab="import"]');
    if(importNavBtn && !importNavBtn.dataset.impBound){
      importNavBtn.dataset.impBound='1';
      // Gating this on "no session yet" (as opposed to "different race than last time")
      // meant that starting a second import in the same browser tab without first clicking
      // "Start new import / clear PDFs" left the metadata form on the PREVIOUS race - so the
      // freshly uploaded PDFs for race B got analyzed but saved under race A's id, silently
      // overwriting it. Comparing the calendar's current race to what the form already has
      // catches every case that actually needs a refresh, session or not.
      importNavBtn.addEventListener('click',()=>{
        const currentId=(typeof state!=='undefined'&&state.race&&state.race.id)||'';
        if(!session || $('impId')?.value!==currentId) setMetaDefaultsFromCurrentRace();
      });
    }
    $('impAnalyzeBtn').onclick=analyze;
    $('impClearBtn').onclick=clearSession;
    ['impSeries','impSeason','impRound','impId','impEvent','impCircuit','impCountry','impDate','impScheduled','impOfficial','impLaps'].forEach(id=>{
      const el=$(id); if(el) el.addEventListener('input',()=>{ el.dataset.dirty='1'; if(session) applyMetadataToPreview(); });
    });
    // installUI can run before init()'s async loadAssets() resolves and sets state.race
    // (DOMContentLoaded listeners all fire synchronously regardless of earlier awaits),
    // so only populate the checklist if there's already a race to describe; the app's own
    // render() cycle will call renderImportChecklist() again once state.race is ready.
    if(typeof state!=='undefined' && state.race && typeof window.renderImportChecklist==='function') window.renderImportChecklist();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installUI); else installUI();

  // Test hook (no UI impact): lets an offline Node harness exercise the pure parsing
  // functions against real extracted PDF text without a browser.
  window.__SCC_IMPORTER_INTERNAL__={classFromText,singleClassFromText,classifyDoc,driverPairsFromLine,parseClassification,entriesFromClassificationText,timeRecordsFromText,bestPerClass,findPosNo,fullNameEnrichmentMap,enrichDriverNames,qualifyingRowsFromText,qualifyingTimeDriverMap,normCls,driverNamesFromStartingGrid,parseStartingGrid,flClassificationFromText,buildRaceObject,mergePerf,applyStartingGrid,qualifyingAverageRowsFromText,qualifyingAverageDriversFromText,polesFromAverageRows,imsaMergeWrappedLines,imsaRowFields,imsaQualifyingRowsFromText,imsaRaceRowsFromText,imsaDriverPairsFromLine,imsaTeamModel,imsaFlByDriverRowsFromText,imsaGridRowsFromText};
})();
