// Validates race-story drafts in out/<season>/ against the season's archive (season.json).
// The SAME checks run in the cloud (before commit) and locally in tools/import-cloud-stories.js.
// Usage: node story-cloud-kit/tools/check.js <season> [raceId ...]
'use strict';
const fs = require('fs'), path = require('path');
const KIT = path.join(__dirname, '..');

const BANNED = /reportedly|allegedly|it is said|is said to|accounts differ|in one account|Sportscar365|DailySportsCar|dailysportscar|\bAutosport\b|Motorsport\.com|Pit de Brief|Speedweek|Wikipedia|according to|is recorded|are recorded|is listed|the archive/i;
// length problems that out/<season>/waivers.json ({"raceId": "reason, e.g. thin sources"}) may waive
const LENGTH_RE = /SHORT |Aftermath \d+ chars/;
const LIMITS = {
  elms: { aftMin: 1100, aftMax: 3200, classAftMin: 300, classAftMax: 1600, overallMin: 5000, overallMax: 11000, classMin: 1300, classMax: 4500, factsMin: 3, factsMax: 5, classFactsMin: 2, classFactsMax: 4 },
  dtm: { r1Min: 3800, r2Min: 4200, max: 8000, aftMin: 1100, aftMax: 2900, factsMin: 3, factsMax: 5 },
};

function seasonInfo(season) {
  const f = path.join(KIT, 'seasons', season, 'season.json');
  if (!fs.existsSync(f)) throw new Error('unknown season ' + season);
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}
function carsByClass(season, id) {
  const txt = fs.readFileSync(path.join(KIT, 'seasons', season, 'dossier', id + '.md'), 'utf8');
  const res = { all: new Set() }; let cur = null;
  for (const ln of txt.split('\n')) {
    const m = ln.match(/^== (.+)$/); if (m) { cur = m[1].trim(); res[cur] = new Set(); continue; }
    const n = ln.match(/^ \S+ g\S+ #(\S+) /); if (cur && n) { res[cur].add(n[1]); res.all.add(n[1]); }
  }
  return res;
}

// one story object {title,dek,chapters,facts,sources}; returns list of problems
function checkStory(d, o) {
  const P = []; const seen = new Set(); let len = 0; const txt = [];
  if (!d || typeof d !== 'object') return ['not an object'];
  if (!d.title || typeof d.title !== 'string') P.push('missing title');
  if (!d.dek || typeof d.dek !== 'string') P.push('missing dek');
  else if (d.dek.split(/\s+/).length > 38) P.push('dek too long (' + d.dek.split(/\s+/).length + ' words; aim <=35, hard limit 38)');
  if (!Array.isArray(d.chapters) || d.chapters.length < 4) return P.concat('chapters missing or fewer than 4');
  for (const c of d.chapters) {
    if (!['before', 'turn', 'after'].includes(c.k)) P.push('bad k "' + c.k + '" in ' + c.phase);
    if (!c.phase || !c.title) P.push('chapter without phase/title');
    if (!Array.isArray(c.text) || !c.text.length || c.text.some((t) => typeof t !== 'string' || !t.trim())) { P.push('bad text in ' + c.phase); continue; }
    if (!Array.isArray(c.cars)) { P.push('cars must be an array in ' + c.phase); continue; }
    len += c.text.join('').length; txt.push(c.text.join(' '), c.title);
    if (c.cars.length > 3) P.push('>3 cars in ' + c.phase);
    for (const n of c.cars) {
      if (typeof n !== 'string') P.push('car number must be a string: ' + n);
      if (!o.cars.has(String(n))) P.push('car #' + n + ' not in archive' + (o.cls ? ' class ' + o.cls : ''));
      if (seen.has(String(n))) P.push('car #' + n + ' repeated in more chapters');
      seen.add(String(n));
    }
  }
  const m = (txt.join(' ') + ' ' + d.title + ' ' + d.dek).match(BANNED); if (m) P.push('banned wording "' + m[0] + '"');
  const ph = d.chapters.map((c) => c.phase);
  if (ph[0] !== 'Build-up' || d.chapters[0].k !== 'before') P.push('first chapter must be k:before phase:Build-up');
  if (ph[1] !== 'Qualifying' || d.chapters[1].k !== 'before') P.push('second chapter must be k:before phase:Qualifying');
  const last = d.chapters[d.chapters.length - 1];
  if (o.aftermath) {
    if (last.phase !== 'Aftermath' || last.k !== 'after') P.push('last chapter must be k:after phase:Aftermath');
    if (ph[ph.length - 2] !== 'The finish') P.push('chapter before Aftermath must be "The finish"');
  } else {
    if (ph.includes('Aftermath')) P.push('Aftermath only in the LAST race of the weekend');
    if (last.phase !== 'The finish') P.push('last chapter must be "The finish"');
  }
  const turns = d.chapters.filter((c) => c.k === 'turn' && c.phase !== 'The finish').length;
  if (turns < 1) P.push('no race chapters (k:turn) before The finish');
  if (o.turnsMax && turns > o.turnsMax) P.push('too many race chapters ' + turns + ' (max ' + o.turnsMax + ')');
  if (len < o.min) P.push('SHORT ' + len + ' chars (min ' + o.min + ')');
  if (o.max && len > o.max) P.push('LONG ' + len + ' chars (max ' + o.max + ')');
  if (o.aftermath && o.aftMin) { const a = last.text.join('').length; if (a < o.aftMin || a > o.aftMax) P.push('Aftermath ' + a + ' chars (' + o.aftMin + '–' + o.aftMax + ')'); }
  const f = d.facts || [];
  if (f.length < o.factsMin || f.length > o.factsMax) P.push('facts ' + f.length + ' (' + o.factsMin + '–' + o.factsMax + ')');
  for (const x of f) {
    if (!x.i || !x.t || !x.v) P.push('fact needs i/t/v');
    if (/[\u{1F1E6}-\u{1F1FF}]|\u20E3/u.test(x.i || '')) P.push('flag/keycap emoji in fact "' + (x.t || '') + '" (renders as letters on Windows)');
    if (!x.one || !/^https?:\/\//.test(x.one.url || '') || !x.one.label) P.push('fact "' + (x.t || '') + '" needs one:{label,url}');
  }
  if (!Array.isArray(d.sources) || !d.sources.length) P.push('no sources');
  else for (const s of d.sources) if (!s.label || !/^https?:\/\//.test(s.url || '')) P.push('bad source entry');
  return { problems: P, len, aft: o.aftermath ? last.text.join('').length : 0 };
}

// returns [{id, kind:'overall'|'classes', file, problems, data, len}]
function checkSeason(season, only) {
  const S = seasonInfo(season); const out = [];
  const dir = path.join(KIT, 'out', season);
  for (const r of S.races) {
    if (r.skip) continue;
    if (only && only.length && !only.includes(r.id)) continue;
    const cars = carsByClass(season, r.id);
    const fo = path.join(dir, r.id + '_overall.json');
    if (fs.existsSync(fo)) {
      let d, res;
      try { d = JSON.parse(fs.readFileSync(fo, 'utf8')); } catch (e) { out.push({ id: r.id, kind: 'overall', file: fo, problems: ['invalid JSON: ' + e.message] }); continue; }
      if (S.kind === 'dtm') { const L = LIMITS.dtm; res = checkStory(d, { cars: cars.all, aftermath: r.lastOfWeekend, min: r.lastOfWeekend ? L.r2Min : L.r1Min, max: L.max, aftMin: L.aftMin, aftMax: L.aftMax, factsMin: L.factsMin, factsMax: L.factsMax, turnsMax: 3 }); }
      else { const L = LIMITS.elms; res = checkStory(d, { cars: cars.all, aftermath: true, aftMin: L.aftMin, aftMax: L.aftMax, min: L.overallMin, max: L.overallMax, factsMin: L.factsMin, factsMax: L.factsMax }); }
      out.push({ id: r.id, kind: 'overall', file: fo, problems: res.problems || res, len: res.len, aft: res.aft, data: d });
    }
    if (S.kind === 'elms') {
      const fc = path.join(dir, r.id + '_classes.json');
      if (fs.existsSync(fc)) {
        let d; try { d = JSON.parse(fs.readFileSync(fc, 'utf8')); } catch (e) { out.push({ id: r.id, kind: 'classes', file: fc, problems: ['invalid JSON: ' + e.message] }); continue; }
        const L = LIMITS.elms; const probs = []; let len = 0;
        // the top class (LMP2 in ELMS) is the overall race → covered by the overall story, never its own class story
        const want = r.storyClasses || r.classes.filter((c) => c !== S.topClass);
        for (const k of Object.keys(d)) if (k === S.topClass) probs.push('class "' + k + '" is the overall/top class: no class story, put its battles into the overall story'); else if (!want.includes(k)) probs.push('class key "' + k + '" not in archive (' + want.join(', ') + ')');
        for (const k of want) {
          if (!d[k]) { probs.push('class ' + k + ' missing'); continue; }
          const res = checkStory(d[k], { cars: cars[k] || new Set(), cls: k, aftermath: true, aftMin: L.classAftMin, aftMax: L.classAftMax, min: L.classMin, max: L.classMax, factsMin: L.classFactsMin, factsMax: L.classFactsMax });
          (res.problems || res).forEach((p) => probs.push(k + ': ' + p)); len += res.len || 0;
        }
        out.push({ id: r.id, kind: 'classes', file: fc, problems: probs, len, data: d });
      }
    }
  }
  const wf = path.join(dir, 'waivers.json');
  const W = fs.existsSync(wf) ? JSON.parse(fs.readFileSync(wf, 'utf8')) : {};
  for (const x of out) if (W[x.id]) { x.warnings = x.problems.filter((p) => LENGTH_RE.test(p)); x.problems = x.problems.filter((p) => !LENGTH_RE.test(p)); }
  return out;
}

module.exports = { checkSeason, seasonInfo, checkStory, KIT };

if (require.main === module) {
  const [season, ...ids] = process.argv.slice(2);
  if (!season) { console.log('usage: node story-cloud-kit/tools/check.js <season> [raceId ...]'); process.exit(2); }
  const S = seasonInfo(season); const res = checkSeason(season, ids); let bad = 0;
  for (const x of res) {
    console.log((x.problems.length ? 'FAIL ' : 'ok   ') + x.id + ' ' + x.kind + (x.len ? ' ' + x.len + ' chars' : '') + (x.aft ? ' (Aftermath ' + x.aft + ')' : ''));
    x.problems.forEach((p) => console.log('      - ' + p)); if (x.problems.length) bad++;
    (x.warnings || []).forEach((p) => console.log('      ~ waived: ' + p));
  }
  const todo = S.races.filter((r) => !r.skip);
  const missing = todo.filter((r) => !res.some((x) => x.id === r.id && x.kind === 'overall') || (S.kind === 'elms' && !res.some((x) => x.id === r.id && x.kind === 'classes')));
  console.log('\n' + season + ': ' + todo.length + ' races, ' + (todo.length - missing.length) + ' complete, ' + missing.length + ' missing, ' + bad + ' files with problems');
  process.exit(bad ? 1 : 0);
}
