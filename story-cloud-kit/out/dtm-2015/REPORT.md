# REPORT – DTM 2015 (cloud session)

## Souhrn
- **18/18 závodů má příběh** (9 víkendů × Race 1 + Race 2). DTM nemá třídní příběhy.
- `node tools/check.js dtm-2015` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky: Race 1 **4 594–5 811** znaků (Nürburgring 4 594, Hockenheim-finále 4 628, Red Bull Ring 4 747, Hockenheim-květen 4 815, Oschersleben 4 949, Moskva 5 087, Zandvoort 5 176, Lausitzring 5 457, Norisring 5 811). Race 2 **5 112–6 503**. Aftermath **1 400–2 158** (vše v limitu 1 100–2 900; Hockenheim-květen 1 400 nejtenčí).
- Formát ověřený ve zdrojích 2015: dva závody na víkend (návrat poprvé od roku 2002 – v QUEUE.md je „první rok se dvěma závody“, což zdroje nepotvrzují; v textech opraveno), sobota bez povinné zastávky, neděle s jednou zastávkou; DRS; výkonové váhy; od Zandvoortu „slow zone“ (80 km/h). **Bez bodů za kvalifikaci.**
- **Body šampionátu** z archivu (25-18-15-12-10-8-6-4-2-1) po každém závodě; sedí přesně na konečné pořadí (Wehrlein 169, Green 150, Ekström 147, Mortara 143, Spengler 123, Wittmann 112). Všechna čísla bodů a titulové hypotézy v textech jsou přepočítané z této tabulky.
- Zdroje: DSC/S365 dumpy prakticky prázdné. Hlavní zdroje: motorsport.com (+ mutace), autosport.com, motorsport-total.com, motorsport-magazin.com (tickery), touringcartimes.com, sport1.de, autobild.de, speedweek.com, speed-magazin.de, motorline.cc, spox.com, gtspirit.com, thecheckeredflag.co.uk, formularapida.net, mbpassion.de, bimmertoday.de, bmwblog.com, motorsport-xl.de, crash.net, racefans.net, autoevolution.com aj. motorsport.com + autosport.com + motorsport-total.com = jedna skupina. Všechny URL v sources/facts vracejí HTTP 200.
- Postup: autoři (sonnet, 1 agent/víkend) → samostatný audit každého víkendu (věta po větě proti dossieru, tabulce bodů a staženým stránkám) → moje kontrola hlášených změn, statusů RET/DSQ a titulků.

## Hlavní opravy po auditech (výběr)
- Fakta z jiných ročníků pryč: Wehrleinova výhra na Lausitzringu 2014, Wittmannova „první výhra od Nürburgringu 2014“, Glockova výhra 2013, Rockenfellerova „druhá výhra v Moskvě“, série Mercedesu na Norisringu „od 2003“ (zdroje si navíc odporují: 13 vs. 14 výher), Paffett jako předchozí nejmladší mistr.
- Jednozdrojová „Nth“: Greenova 10. výhra (Lausitzring), Rockenfellerova 5. pole (Moskva), „první pódium tří značek“ (Nürburgring), Schnitzer „po více než dvou letech“ (Zandvoort), Wickensův drive-through (finále R1), zdržování Wehrleina (finále R1), Audi „zdrželo“ Wittmannovo kolo (Oschersleben).
- Aritmetika: finále R1 „Mortara musel vyhrát“ → „potřeboval velké výsledky“ (výhra nebyla matematicky nutná); body Audi „55 za den“ (dopočet bez zdroje) pryč.
- „Team-mate“ u jiných týmů (Wickens/Green, Martin RMG vs. RBM, Glock MTEK vs. RBM) opraveno; klasifikovaní Auer, Tambay (Lausitzring R2), Auer (Zandvoort R2) už „neodstupují“.
- Wickensův trest na Oscherslebenu R2: 13 míst = 3 za kolizi + 10 za rychlost v boxech (dříve celé za kolizi).
- „První sezóna se dvěma závody na víkend“ (Norisring R1, finále R1/R2) přepsáno.

## Datové vlajky (stručně, řeší se lokálně)
- **Norisring R2:** Blomqvist DSQ (pos 20), zdroje 16. na trati a vyloučen; Green archiv 18., Autosport 19.
- **Red Bull Ring R2:** Scheider DSQ (sedí). Wehrlein a Wickens klasifikováni 20./21. (−1 kolo), zdroje „odstoupili“. Green archiv 17., zdroje 18. (pořadí před DSQ).
- **Red Bull Ring R1:** Green RET 3L, zdroje stál ve 2. kole.
- **Hockenheim-květen R2:** Auer DNS; grid vs. zdroje (Green g17 / zdroje 19., Wehrlein g15 / 18., di Resta g10 / 12.) – archivní „Q“ zřejmě odráží startovní pořadí po trestech.
- **Hockenheim-květen R1:** Juncadella RET 10L, zdroje SC ve 12. kole po jeho nehodě.
- **Lausitzring R1:** zdroje 33 kol, archiv 32; náskok 4.251 (Autosport) vs. 4.261. **R2:** Spengler Q13 → g18 bez vysvětlení; Wehrlein/Wittmann 13./17. vs. zdroje 14./18.
- **Zandvoort R1:** Tomczyk RET 5L (zdroje 6 kol). **R2:** Wickens a Müller klasifikováni, zdroje „Ausfall/odstavil“.
- **Moskva R2:** Ekström g5 (Autosport 4.), Tomczyk g23 (zdroje poslední; poslední Giovinazzi g24).
- **Oschersleben R1:** Mortara klasifikován 19. (22 kol), Autosport „všech šest z kolize odstoupilo“; Ekström Q24 → g23, Auer g24 (trest za blokování, 1 zdroj).
- **Nürburgring R1:** Tomczyk DNS s `g?`; Spengler klasifikován 19. (−7 kol), zdroje odstoupení s defektem. **R2:** 23 kvalifikačních časů (Paffett bez času, g23; Tomczyk g24 trest).
- **Hockenheim-finále R1:** Spengler (19.) a Glock (18.) klasifikováni, zdroje „retired/DNF“.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty z jedné skupiny: Molinův drive-through (Norisring R1), Auerových 5 s (Norisring R2), Tambayův drive-through (Zandvoort R1), Auerův posun (Zandvoort R2), Molinův posun o 3 místa, Farfus/Blomqvist −5 míst, Tambayovo vyloučení z kvalifikace (Hockenheim-květen R2), Wickensův a da Costův trest (Moskva R2), Wehrleinova pokuta za pásy (finále), Müllerův a Blomqvistův drive-through (finále).
- Příčiny odstoupení bez dvou zdrojů: Molina/Blomqvist (Hockenheim R1), Farfus/Paffett (Lausitzring), Wickens/Tomczyk (Red Bull Ring R1), Wittmann (finále R2), Mortara/Molina (Zandvoort R1).
- Stájová režie z jedné skupiny: Vietoris jako „wingman“ a Götz pouští Wehrleina (finále), Rockenfeller pouští Ekströma (Nürburgring R1), Wittmann/da Costa (Zandvoort R1). Ponecháno (≥2 skupiny): Juncadella a Götz pouští Wehrleina (Nürburgring R2), Wickensovo zdržování Scheidera a Ullrichův povel „push him out“ (Red Bull Ring R2).
- Rekordy s 1 zdrojem: Blomqvist „nejmladší vítěz BMW“, „první double RBM“, Ekströmova 21. výhra, Götzovy první body, Paffettova 11. pole, návštěvnost (60 000, 66 000, 135 000), body značek a týmů z jednoho zdroje.

## Preview (`preview.html`)
- Poslední závod víkendu, nejsilnější: **Zandvoort R2** (6 503) – Félix da Costa z pole k první výhře, BMW obsadilo prvních pět míst.
- Poslední závod víkendu, nejslabší: **Hockenheim (květen) R2** (5 112) – mokrý závod, Ekström vyhrává, Paffett třetí.
- Race 1, nejsilnější: **Norisring R1** (5 811) – Wehrlein vyhrává mokro-suchý závod, Mercedes na prvních čtyřech místech.
- Race 1, nejslabší: **Nürburgring R1** (4 594) – Martin vyhrává závod s červenou vlajkou.
