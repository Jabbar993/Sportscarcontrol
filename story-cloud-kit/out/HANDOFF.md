# Předání cloudových příběhů do lokální appky

Balík obsahuje hotové příběhy z cloudových sessions (větev `claude/youthful-meitner-bka4cr`):

| sezóna | závodů | soubory |
|---|---|---|
| dtm-2012 | 10 | `*_overall.json` (1 závod na víkend, vše s Aftermath) |
| dtm-2013 | 10 | dtto |
| dtm-2014 | 10 | dtto |
| dtm-2015 | 18 | Race 1 + Race 2 na víkend |
| dtm-2016 | 18 | dtto |
| dtm-2017 | 18 | dtto |
| dtm-2018 | 20 | dtto |
| dtm-2019 | 18 | dtto |
| elms-2013 … elms-2018 | 5–6 / ročník | `*_overall.json` + `*_classes.json` |

Každá sezóna má `REPORT.md` (česky: délky, opravy, **datové vlajky = rozpory archiv vs. zdroje k ověření v archivu**) a `preview.html` (4, resp. 2 ukázkové příběhy). Všechny prošly `tools/check.js` s 0 FAIL / 0 missing; waivers nejsou.

## Import (lokálně, v kořeni appky `Sportscarcontrol-main/Sportscarcontrol-main`)
1. Rozbal zip tak, aby složky sezón skončily v `story-cloud-kit/out/<sezóna>/`:
   ```bash
   unzip scc-cloud-stories.zip -d story-cloud-kit/
   ```
   (zip obsahuje cestu `out/<sezóna>/…`)
2. Pro každou sezónu suchý běh, pak zápis:
   ```bash
   for s in dtm-2012 dtm-2013 dtm-2014 dtm-2015 dtm-2016 dtm-2017 dtm-2018 dtm-2019 elms-2013 elms-2014 elms-2015 elms-2016 elms-2017 elms-2018; do node tools/import-cloud-stories.js $s; done
   for s in dtm-2012 dtm-2013 dtm-2014 dtm-2015 dtm-2016 dtm-2017 dtm-2018 dtm-2019 elms-2013 elms-2014 elms-2015 elms-2016 elms-2017 elms-2018; do node tools/import-cloud-stories.js $s --write; done
   node --check js/data-race-stories.js && node --check js/data-race-story-classes.js
   ```
   Závody, které už příběh mají, se přeskočí (přepsat jen s `--force`).
3. Projdi `REPORT.md` (datové vlajky) a v appce záložku Story u 1–2 závodů.

## Poznámky pro další ročníky
- **dtm-2011 a starší** v kitu nejsou (chybí `seasons/<sezóna>/dossier`). Vyrob je lokálně: přidej sezónu do SEASONS v `tools/build-story-cloud-kit.js`, spusť `node tools/build-story-cloud-kit.js dtm-2011`, doplň řádek do `story-cloud-kit/QUEUE.md` a pošli kit do cloudu.
- Body šampionátu počítej z archivu podle **archivní pozice** (u DTM 2013 Norisring po DSQ vítěze bez posunu pozic sedí jen tak); 2017+ přidej kvalifikační body 3-2-1, 2012–2016 je nemají.
- QUEUE.md u dtm-2015 píše „první rok se dvěma závody na víkend“ – nepřesné (návrat poprvé od 2002).
