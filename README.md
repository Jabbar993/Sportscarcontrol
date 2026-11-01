# SCC story cloud kit

Tahle složka stačí cloudové session Claude Code k tomu, aby psala **příběhy závodů (race stories)** pro offline appku SCC (Sportscar Control), aniž by měla appku nebo 500MB archiv `js/data.js`. Cloud píše jen JSON soubory do `out/`. Do appky je zapíše majitel lokálně (viz `IMPORT.md`).

## Co je ve složce
| cesta | co to je |
|---|---|
| `RULES.md` | **všechna pravidla** stories (struktura, délky, pravdivost, zakázané formulace, výzkum). Přečti celé. |
| `QUEUE.md` | fronta ročníků + poznámky k formátu každého ročníku |
| `seasons/<sezóna>/season.json` | seznam závodů ročníku (id, datum, okruh, třídy, `lastOfWeekend`, čísla vozů); `skip` = příběh už existuje |
| `seasons/<sezóna>/dossier/<id>.md` | **fakta z archivu** pro každý závod: hlavička, kvalifikace, pole, rychlá kola, kompletní výsledky po třídách (posádky, grid, kola, status) |
| `seasons/<sezóna>/wp/` | vznikne po `tools/wpfetch.js`: články DailySportsCar + Sportscar365 (víkend + `_pre` = týden předtím) |
| `briefs/` | šablony zadání pro subagenty (ELMS overall, ELMS třídy, DTM) |
| `examples/` | hotové schválené příběhy jako vzor tvaru a tónu (ELMS Spa 2020 overall + třídy, DTM 2021 Race 1 + Race 2); **přečti `examples/NOTE.md`**, kde se liší od pravidel |
| `tools/check.js` | validátor (stejný kód běží i při lokálním importu) |
| `tools/wpfetch.js` | znovu nebo dodatečně stáhne články z WP API DSC/S365 |
| `tools/preview.js` | vyrobí `out/<sezóna>/preview.html` se 4 ukázkovými příběhy pro majitele |
| `out/<sezóna>/` | **SEM píšeš výstup** |

## Úkol jedné session = jeden ročník
1. Otevři `QUEUE.md` a vezmi **první ročník bez `out/<sezóna>/REPORT.md`**. Jeden ročník = jedna session. Další ročník nezačínej.
2. Přečti `RULES.md`, `seasons/<sezóna>/season.json` a jeden-dva dossiery. Pak stáhni zdroje: `node story-cloud-kit/tools/wpfetch.js <sezóna>` (WP API DSC + S365, bez AI, pár minut).
3. **Spusť subagenty** (Agent tool, model **sonnet**, ne haiku, protože haiku vymýšlí křestní jména a URL). Pošli je najednou ve vlnách po ~6:
   - **ELMS:** pro každý závod 1 agent na overall (`briefs/BRIEF_elms_overall.md`) + 1 agent na třídy (`briefs/BRIEF_elms_class.md`).
   - **DTM:** 1 agent na víkend. Do jeho promptu vlož **dvě vyplněné kopie** `briefs/BRIEF_dtm.md` (Race 1, pak Race 2) s pokynem „napiš nejdřív první, pak druhý“, protože Build-up Race 2 navazuje na Race 1. U ročníků s jedním závodem na víkend (2012–2014) dej agentovi 2 víkendy, tedy 2 kopie.
   - V briefu nahraď:
     - `<ID>` (id závodu ze `season.json`), `<ROK>`, `<SEASON>` (např. `elms-2018`);
     - `<CLASSES>` = čárkami oddělený seznam `storyClasses` ze `season.json` (např. `LMP3, LMGTE`; LMP2 = top třída bez třídního příběhu);
     - `<SEASON_NOTES>` = text řádku ročníku z `QUEUE.md`;
     - jen DTM: `<RACE_ROLE>` („Race 1 víkendu“ / „Race 2 = poslední závod víkendu“ / „jediný závod víkendu“) a `<AFTERMATH_RULE>` („Aftermath se NEPÍŠE, poslední kapitola je The finish“ / „Na konci kapitola k:after phase:Aftermath (4 odstavce ≈2 000–2 700 znaků)“), obojí podle `lastOfWeekend` v `season.json`;
     - `KIT` = absolutní cesta k této složce (`echo "$(git rev-parse --show-toplevel)/story-cloud-kit"`).
4. Když agent vrátí „thin“ nebo jen výsledky, **hned spusť 2. a 3. kolo výzkumu** (RULES.md kap. 7) pro tenké části (Build-up, hodiny, Aftermath) a příběh doplň.
5. `node story-cloud-kit/tools/check.js <sezóna>` → oprav, dokud není **0 FAIL** a „0 missing“. Výjimka: když je závod po 2.–3. kole výzkumu opravdu tenký (staré ročníky), smíš mu prominout **jen délku** zápisem do `out/<sezóna>/waivers.json` = `{"<raceId>": "důvod"}`. Ostatní chyby (struktura, čipy, zakázané formulace, fakta) se neprominou. Každý waiver uveď v REPORT.md.
6. **Vlastní kontrola každého příběhu proti dossieru** (check.js to neumí): vítěz a posádka, pole (grid g1), kdo odstoupil, počet kol, křestní jména (jen z dossieru nebo zdroje), URL ve `sources` a `facts` jsou skutečně přečtené (`curl -sI` nebo pohled do dumpu), žádný fakt z jiného ročníku.
7. `node story-cloud-kit/tools/preview.js <sezóna>` → `out/<sezóna>/preview.html` (nejsilnější a nejslabší overall + nejsilnější a nejslabší třída).
8. Napiš `out/<sezóna>/REPORT.md` (česky):
   - kolik závodů má příběh, rozsah délek overall/třídy/Aftermath;
   - slabá místa (tenké zdroje, sloučená okna, kratší příběhy a proč);
   - **datové vlajky** = rozpory archiv vs. zdroje (pole, posádky, pořadí, DSQ), které má majitel ověřit v archivu;
   - co bylo vynecháno jako sporné;
   - které 4 příběhy jsou v preview a proč.
9. Commitni `story-cloud-kit/out/<sezóna>/` (`wp/` je v .gitignore) a **pushni na svou větev**. V závěrečné zprávě napiš název větve a 2–3 věty shrnutí.

## Co NEDĚLAT
- Nevymýšlej (čísla, časy, kola, citáty, příčiny, křestní jména, URL). Když si nejsi jistý, vynech.
- Jednozdrojový fakt, který archiv nepotvrzuje, nepiš do textu (nanejvýš do `facts` s `one`).
- Zdroje v textu nejmenuj; žádné „reportedly / according to / is recorded“.
- Neměň `seasons/`, `briefs/`, `RULES.md`, `examples/`, `tools/` (kromě doplnění `wp/`). Jiné ročníky nepiš.
- Nepřidávej do repa velké soubory ani appku (`.gitignore`).
- Neopravuj archiv. Rozpory jen zapiš do REPORT.md.

## Formát výstupu (přesně tohle bere lokální import)
- `out/<sezóna>/<raceId>_overall.json` = `{"title","dek","chapters":[{"k","phase","title","text":[…],"cars":[…]}],"facts":[{"i","t","v","one":{"label","url"}}],"sources":[{"label","url"}]}`
- ELMS navíc `out/<sezóna>/<raceId>_classes.json` = `{"<TŘÍDA>": {title,dek,chapters,facts,sources}, …}` pro všechny třídy ze `storyClasses` v `season.json` (bez LMP2).
- UTF-8, platný JSON (ověř `node -e "JSON.parse(require('fs').readFileSync('soubor','utf8'))"`).
