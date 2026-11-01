# Fronta ročníků pro cloud

**Pravidlo majitele: 1 ročník = 1 session.** Vezmi první ročník shora, který ještě nemá `out/<sezóna>/REPORT.md`.
Ročníky ELMS 2019+, DTM 2020+ a celé WEC dělají lokální sessions, proto je NEDĚLEJ. Závody, které už příběh mají, export vynechal (`season.json` → `"skip"`).

| # | sezóna | závodů | poznámky pro briefy (`<SEASON_NOTES>`) |
|---|---|---|---|
| 1 | elms-2018 | 6 | ELMS 2018: třídy LMP2 (top), LMP3, LMGTE (jedna GTE třída; Pro/Am archiv nerozlišuje, nehádej). 4h závody (Spa, Portimão ověř v dossieru). |
| 2 | elms-2017 | 6 | ELMS 2017: první rok nové generace LMP2 (Oreca 07, Ligier JS P217, Dallara P217, Riley; ověř), třídy LMP2, LMP3, LMGTE. |
| 3 | elms-2016 | 6 | ELMS 2016: třídy LMP2, LMP3, LMGTE (GTC už není). |
| 4 | elms-2015 | 5 | ELMS 2015: třídy LMP2, LMGTE, GTC, LMP3 (první rok LMP3). |
| 5 | elms-2014 | 5 | ELMS 2014: třídy LMP2, LMGTE, GTC. |
| 6 | elms-2013 | 5 | ELMS 2013: třídy LMP2, LMPC, LMGTE, GTC (Silverstone bez LMPC). Ověř délku závodů ze `Scheduled` v dossieru. Zdroje řidší, víc Wayback. |
| 7 | dtm-2019 | 18 | DTM 2019: první rok Class 1 (2.0 turbo), Audi, BMW, Aston Martin Vantage DTM (R-Motorsport); jeden jezdec na vůz; 2 závody na víkend. Ověř formát zastávek a push-to-pass/DRS ve zdrojích. |
| 8 | dtm-2018 | 20 | DTM 2018: Audi, BMW, Mercedes (poslední rok Mercedesu); 2 závody na víkend; Misano noční závody. |
| 9 | dtm-2017 | 18 | DTM 2017: Audi, BMW, Mercedes; 2 závody na víkend. |
| 10 | dtm-2016 | 18 | DTM 2016: Audi, BMW, Mercedes; 2 závody na víkend. |
| 11 | dtm-2015 | 18 | DTM 2015: první rok se dvěma závody na víkend; Audi, BMW, Mercedes. |
| 12 | dtm-2014 | 10 | DTM 2014: jeden závod na víkend (každý závod má Aftermath). |
| 13 | dtm-2013 | 10 | DTM 2013: jeden závod na víkend (každý závod má Aftermath). |
| 14 | dtm-2012 | 10 | DTM 2012: jeden závod na víkend; návrat BMW. |

Poznámky jsou orientační. Všechno ověř ve zdrojích; když se poznámka s dossierem nebo zdroji neshoduje, platí dossier a zdroje.

Celkem: 33 závodů ELMS (overall + třídy) + 122 závodů DTM = **155 závodů**.
Další ročníky přidá majitel lokálně: `node tools/build-story-cloud-kit.js <sezóna>` (seznam `SEASONS` v tom skriptu) + `node story-cloud-kit/tools/wpfetch.js <sezóna>`.
