// Dumps DailySportsCar + Sportscar365 articles (open WordPress REST API) for every race of a season
// into seasons/<season>/wp/<raceId>_<site>.txt (race weekend) and <raceId>_<site>_pre.txt (5 days before).
// Usage: node story-cloud-kit/tools/wpfetch.js <season> [--force]
'use strict';
const fs = require('fs'), path = require('path');
const KIT = path.join(__dirname, '..');
const season = process.argv[2]; const force = process.argv.includes('--force');
if (!season) { console.log('usage: node story-cloud-kit/tools/wpfetch.js <season>'); process.exit(2); }
const S = JSON.parse(fs.readFileSync(path.join(KIT, 'seasons', season, 'season.json'), 'utf8'));
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const SITES = { dsc: 'https://www.dailysportscar.com', s365: 'https://sportscar365.com' };
const clean = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<(p|br|div|h\d|li)[^>]*>/g, '\n').replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;|&#038;/g, '&').replace(/&#8217;|&rsquo;|&#8216;/g, "'").replace(/&#8220;|&#8221;/g, '"')
  .replace(/&#8211;|&ndash;|&#8212;/g, '-').replace(/&#\d+;/g, '').split('\n').map((s) => s.trim()).filter(Boolean).join('\n');
const day = (d, n) => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const relevant = S.kind === 'dtm'
  ? (p) => /dtm/i.test(p.title.rendered + p.link) || (p.content.rendered.match(/DTM/g) || []).length >= 3
  : (p) => /elms|european le mans/i.test(p.title.rendered + p.link) || (p.content.rendered.match(/ELMS|European Le Mans/g) || []).length >= 2;

async function dump(site, after, before) {
  const all = [];
  for (let page = 1; page <= 5; page++) {
    const u = `${SITES[site]}/wp-json/wp/v2/posts?per_page=100&page=${page}&after=${after}T00:00:00&before=${before}T00:00:00&_fields=date,link,title,content`;
    try {
      const r = await fetch(u, { headers: { 'user-agent': UA } });
      if (!r.ok) { if (r.status !== 400) console.log('  http', r.status, site); break; }
      const j = await r.json(); all.push(...j); if (j.length < 100) break;
    } catch (e) { console.log('  error', site, e.message); return null; }
  }
  return all.filter(relevant).sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((p) => `=== ${p.date} | ${clean(p.title.rendered)}\n${p.link}\n${clean(p.content.rendered)}`).join('\n\n');
}

(async () => {
  const dir = path.join(KIT, 'seasons', season, 'wp'); fs.mkdirSync(dir, { recursive: true });
  const done = new Map(); // DTM: race1+race2 share a weekend → fetch once, copy
  for (const r of S.races) {
    if (r.skip) continue;
    for (const site of Object.keys(SITES)) {
      for (const [suf, a, b] of [['', day(r.date, -2), day(r.date, 3)], ['_pre', day(r.date, -7), day(r.date, -2)]]) {
        const f = path.join(dir, `${r.id}_${site}${suf}.txt`);
        if (!force && fs.existsSync(f) && fs.statSync(f).size > 0) continue; // empty = retry
        const key = site + suf + a + b;
        let txt = done.get(key);
        if (txt === undefined) { txt = await dump(site, a, b); if (txt === null) continue; done.set(key, txt); }
        fs.writeFileSync(f, txt);
        console.log(r.id, site + suf, txt.length, 'chars');
      }
    }
  }
})();
