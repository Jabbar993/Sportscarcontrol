// Builds out/<season>/preview.html with 4 stories for the owner: strongest + weakest overall,
// strongest + weakest class story (DTM: strongest + weakest Race 1 and Race 2 / single race).
// Usage: node story-cloud-kit/tools/preview.js <season>
'use strict';
const fs = require('fs'), path = require('path');
const { checkSeason, seasonInfo, KIT } = require('./check.js');
const season = process.argv[2];
if (!season) { console.log('usage: node story-cloud-kit/tools/preview.js <season>'); process.exit(2); }
const S = seasonInfo(season); const res = checkSeason(season).filter((x) => x.data);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const len = (st) => st.chapters.reduce((a, c) => a + c.text.join('').length, 0);
const score = (st) => len(st) + 150 * (st.facts || []).length + st.chapters[st.chapters.length - 1].text.join('').length / 2;

const items = [];
for (const x of res) {
  if (x.kind === 'overall') items.push({ id: x.id, cls: 'Overall', st: x.data, r2: (S.races.find((r) => r.id === x.id) || {}).lastOfWeekend });
  else for (const k of Object.keys(x.data)) items.push({ id: x.id, cls: k, st: x.data[k] });
}
const pickPair = (arr, why) => {
  if (!arr.length) return [];
  const s = arr.slice().sort((a, b) => score(b.st) - score(a.st));
  return s.length === 1 ? [Object.assign(s[0], { why: why + ' (jediný)' })] : [Object.assign(s[0], { why: why + ': nejsilnější' }), Object.assign(s[s.length - 1], { why: why + ': nejslabší' })];
};
const pick = S.kind === 'elms'
  ? pickPair(items.filter((i) => i.cls === 'Overall'), 'Overall').concat(pickPair(items.filter((i) => i.cls !== 'Overall'), 'Třída'))
  : pickPair(items.filter((i) => i.r2), 'Poslední závod víkendu').concat(pickPair(items.filter((i) => !i.r2), 'Race 1'));

const card = (p) => {
  const st = p.st; const aft = st.chapters[st.chapters.length - 1];
  return `<article><div class="meta">${esc(p.why)} · <b>${esc(p.id)}</b> · ${esc(p.cls)} · ${len(st)} znaků · Aftermath ${aft.phase === 'Aftermath' ? aft.text.join('').length : 0} · fakta ${(st.facts || []).length}</div>
<h2>${esc(st.title)}</h2><p class="dek">${esc(st.dek)}</p>
${st.chapters.map((c) => `<section><div class="ph">${esc(c.phase)}${c.cars.length ? ' · ' + c.cars.map((n) => '<span class="chip">#' + esc(n) + '</span>').join(' ') : ''}</div><h3>${esc(c.title)}</h3>${c.text.map((t) => '<p>' + esc(t) + '</p>').join('')}</section>`).join('\n')}
<h4>Did you know?</h4><ul>${(st.facts || []).map((f) => `<li>${esc(f.i)} <b>${esc(f.t)}</b>: ${esc(f.v)} <a href="${esc(f.one && f.one.url)}">${esc(f.one && f.one.label)}</a></li>`).join('')}</ul>
<h4>Sources</h4><ul class="src">${(st.sources || []).map((s) => `<li><a href="${esc(s.url)}">${esc(s.label)}</a></li>`).join('')}</ul></article>`;
};
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Story preview ${esc(season)}</title>
<style>:root{--bg:#f6f5f2;--fg:#1d1d1f;--mut:#6b6b70;--card:#fff;--ac:#c0392b;--line:#e3e1dc}
@media (prefers-color-scheme:dark){:root{--bg:#141416;--fg:#ececee;--mut:#9a9aa0;--card:#1e1e22;--ac:#ff6b5a;--line:#2e2e33}}
body{background:var(--bg);color:var(--fg);font:16px/1.6 Georgia,serif;margin:0;padding:24px 16px}main{max-width:760px;margin:auto}
article{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:20px 24px;margin:0 0 32px}
.meta{font:12px/1.4 system-ui,sans-serif;color:var(--mut)}.dek{font-style:italic;color:var(--mut)}h2{margin:.3em 0}
.ph{font:11px system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--ac);margin-top:18px}h3{margin:.2em 0 .4em;font-size:18px}
.chip{background:var(--line);border-radius:4px;padding:0 5px;color:var(--fg)}h4{font:13px system-ui,sans-serif;text-transform:uppercase;color:var(--mut)}
li{font-size:14px}a{color:var(--ac)}.src li{font-size:12px}</style></head><body><main>
<h1>Story preview: ${esc(season)}</h1><p class="meta">${res.length} souborů · vygenerováno ${new Date().toISOString().slice(0, 10)}</p>
${pick.map(card).join('\n')}</main></body></html>`;
const f = path.join(KIT, 'out', season, 'preview.html');
fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html);
console.log('written', f); pick.forEach((p) => console.log(' ', p.why, p.id, p.cls, len(p.st)));
