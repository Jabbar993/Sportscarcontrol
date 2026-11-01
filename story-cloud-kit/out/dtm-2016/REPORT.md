# REPORT – DTM 2016 (cloud session)

## Souhrn
- **18/18 závodů má příběh** (9 víkendů × Race 1 + Race 2). DTM nemá třídní příběhy.
- `node tools/check.js dtm-2016` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky: Race 1 **4 371–5 672** znaků (Hungaroring 4 371, Moskva 4 433, Zandvoort 4 612, Hockenheim-květen 4 916, Nürburgring 4 939, Hockenheim-finále 4 941, Norisring 5 340, Lausitzring 5 415, Red Bull Ring 5 672). Race 2 **5 376–6 863**. Aftermath **1 507–2 028** (vše v limitu 1 100–2 900; Norisring 1 507, Hockenheim-finále 1 623 a Moskva 1 667 pod cílem, protože jednozdrojové reakce, tresty a příčiny jsem škrtal).
- Formát ověřený ve zdrojích 2016: sobota 40 min + 1 kolo bez povinné zastávky, neděle 60 min + 1 kolo s jednou povinnou zastávkou (výměna pneumatik), DRS, výkonové váhy (max. ±5 kg najednou), koncese pro BMW (nižší základní hmotnost, širší křídlo). **Body za kvalifikaci 2016 neexistovaly.**
- **Body šampionátu** jsem spočítal z archivu (25-18-15-12-10-8-6-4-2-1, bez kvalifikačních bodů) po každém závodě; sedí přesně na konečné pořadí (Wittmann 206, Mortara 202, Green 145, Wickens 124). Všechna čísla bodů v textech jsou s touto tabulkou v souladu (zdroje se místy lišily – Wickens po Hockenheimu-R2 26 vs. 28, Wickens po Lausitzringu-R1 42 vs. 43, Wittmann po Hungaroringu-R2 188 vs. 176 = pořadí na trati před vyloučením, Green po Hungaroringu-R1 49 vs. 39).
- Zdroje: DSC/S365 dumpy prakticky prázdné (DSC jen přes curl, několik dávek kvůli 429; nic o DTM 2016 použito). Hlavní zdroje: motorsport.com (+ de/es/au/us/nl mutace), autosport.com, motorsport-total.com (vč. live-tickerů a „Stimmen“), touringcartimes.com, sport1.de, autobild.de, speedweek.com, speed-magazin.de, motorline.cc, racingblog.de, gtspirit.com, racecar.com, formularapida.net, mbpassion.de, bimmertoday.de, bmwblog.com, motorsport-xl.de, mercedes-fans.de, grandprixweekly.com, crash.net, press.bmwgroup.com (detail tiskových zpráv), 7-forum.com aj. motorsport.com + autosport.com + motorsport-total.com beru jako jednu skupinu zdrojů; sport1 a autobild často přebírají stejnou agenturní zprávu.
- Postup kontroly: po agentech-autorech prošel každý víkend ještě samostatný audit (věta po větě proti dossieru, tabulce bodů a staženým stránkám; ≥2 skupiny zdrojů pro tresty, příčiny, rekordy a „stájovou režii“) a já jsem pak ověřil hlášené změny a sporná místa.

## Slabá místa
- Průběh po kolech (kola zastávek, kola předjetí) je často jen z jednoho zdroje → v textu rozsahy nebo bez čísla.
- Nejkratší Race 1: Hungaroring (4 371) a Moskva (4 433) – nad minimem. Nejtenčí Aftermath: Norisring R2 (1 507).

## Moje opravy po agentech a auditech (výběr)
- **Hockenheim (květen) R1:** Greenův drive-through (jen formularapida) z textu pryč (zůstal ve facts s `one`); Rockenfellerův kontakt se Spenglerem jako příčina (1 skupina) → „poškozené zavěšení, odstoupil po 4 kolech“; Müllerova pole z Monaka 2013 (jiný ročník) pryč; „váhy poprvé, z teoretických kol“ (1 zdroj) pryč.
- **Hockenheim (květen) R2:** „váhy se resetují po každé kvalifikaci“ (bez zdroje) pryč; di Restova poznámka o loňském Red Bull Ringu (jiný ročník) pryč.
- **Red Bull Ring R1:** klasifikovaný Juncadella „zůstal stát ve výjezdové zóně“ → jen poškození a žluté vlajky. **R2:** klasifikovaný Mortara „auto zůstalo stát“ → „klasifikován 23., 18 kol ztráty“.
- **Moskva R1:** „Götzův nejlepší výsledek kariéry“ (1 zdroj) pryč z textu; Ocon „odešel do F1“ (bez zdroje) pryč; hypotéza „výhra Wickensovi stačí na vedení“ zjemněna. **R2:** Juncadella „chránil Wickense před pelotonem“ (stájová režie, 1 zdroj) pryč.
- **Hungaroring R2:** dek „vyloučení snížilo náskok na 14 bodů“ → náskok zůstal 14 (před i po závodě); pořadí v cíli přepsáno podle archivu (bez Wittmanna/Juncadelly); Wickensův start zezadu (archiv g8) pryč; fact „26 bodů na trati“ přepsán.
- **Hockenheim-finále R2:** chybná aritmetika „Mortara musel vyhrát“ → „potřeboval aspoň 2. místo; i výhra stačila jen při Wittmannovi na 7. místě nebo hůř“ (6. místo = rovnost 202:202, rozstřel jsem pro 2016 neověřil); Mortarův start „7. nebo 8.“ → podle archivu z 6. místa. **R1:** „zbývá jeden závod“ → dva; Wickens 121 → 122; Blomqvist „týmový kolega“ Wittmanna → jiný tým (RBM vs. RMG).
- **Norisring R1/R2:** statistiky z jiných ročníků (18 výher Mercedesu, Aiello 2002, Ekströmova DSQ 2013, Wickensova pódia od 2013, safety cary od 2009) pryč; ponecháno jen „první porážka Mercedesu na Norisringu od 2002“ (≥2 skupiny). Kolo 43 vedení (1 zdroj) pryč.
- **Nürburgring R1:** di Resta 100 → 92 bodů a „zbývá 5 závodů“ → 6 (tabulka).
- **Lausitzring R1:** Molinova výhra 2015 a „6. pole v kariéře“ (jiný ročník / 1 skupina) pryč; Oconův drive-through (1 skupina) jen ve facts. **R2:** Wickens a Auer „týmoví kolegové“ → nejsou (HWA vs. Mücke).
- **Zandvoort R1:** „Audi ztratilo dvě bodované pozice“ (Müller na bodech nebyl) a důvod Mortarova trestu (zdroje se liší) přepsány. **R2:** GPS vysvětlení trestu (1 zdroj) pryč, ponecháno „trest udělen omylem, body nevráceny“ (≥2 skupiny + archiv).

## Datové vlajky (stručně, řeší se lokálně)
- **Hungaroring R2:** Wittmann a Juncadella **RET 36L**, podle zdrojů dojeli 4. a 3. a byli po závodě vyloučeni (skid pady) → mělo by být DSQ. Wickens g8, zdroje start z konce pole (pokažené postavení na roštu). Mortara klasifikován 19. (−3 kola), zdroje „odstoupil 3 kola před cílem“, 21.
- **Hungaroring R1:** archiv zřejmě před tresty – Blomqvist 13. (zdroje po 30s trestu 22.), Tomczyk 22. (zdroje 23.), Ekström 19. (zdroje 18.). Wickens Q18 → g17, da Costa Q15 → g20 bez vysvětlení.
- **Hockenheim (květen) R1:** Auer bez kvalifikačního času (g24); klasifikován 17. (20 kol), zdroje odstoupení 5 min před koncem.
- **Hockenheim (květen) R2:** Glock DSQ (víko kufru) – sedí. Pořadí v archivu je po DSQ.
- **Red Bull Ring R2:** zdroje 42 kol / 1:01:30, archiv 41 kol / 1:00:05; odstupy Ekström/Green 2.215/6.014 vs. archiv 2.976/6.255; zdroje Juncadella nejlepší Mercedes (12.), archiv Paffett 11. Mortara (23 kol) a Müller (1 kolo) klasifikováni, zdroje odstoupení. Di Resta g22, zdroje start z posledního místa.
- **Red Bull Ring R1:** Juncadella a Vietoris klasifikováni (4 a 5 kol), zdroje odstoupení.
- **Lausitzring R2:** di Resta klasifikován 21. (41 kol), zdroje odstoupení (defekt) 5 kol před koncem.
- **Norisring R2:** Green klasifikován 17. (−14 kol), zdroje odstoupení. Podle motorsport-total byli Paffett, Juncadella, da Costa, Tambay a Rockenfeller vyřazeni z hodnocení (nedostavili se k vážení), archiv RET. Paffett Q18 → g24 bez vysvětlení. Pole g1 Blomqvist (Ekström Q1 potrestán posunem).
- **Norisring R1:** kolize Ekström/Wickens: zdroje 20. kolo, archiv Wickens RET 19L, Ekström RET 22L.
- **Nürburgring R1:** Auer g5 / Juncadella g6, zdroje opačně (Juncadella po trestu 5.?); Ekström RET 23L, motorsport.com DSQ (vážení); Juncadella klasifikován 17., zdroje „vyřazen“.
- **Nürburgring R2:** zdroje mají Molinu 10. a Martina mimo body; archiv Martin 10., Molina 20. (+54.909 místo +24.909 – asi dodatečný 30s trest). Wickens/Glock/Green archiv 13./14./16., zdroje 14./15./17.
- **Moskva R2:** Martin bez gridu (`g?`), zdroje start z konce po nehodě v kvalifikaci. Mortara g17 (motorsport.com 18.), Green g19 (zdroje 20.).
- **Zandvoort R2:** Tambay DNS (`g?`). Vietoris RET 35L, crash.net klasifikuje 20. (−4 kola).
- **Zandvoort R1:** Götz Q15 → g14 (autosport „posunut na 15.“).
- **Hockenheim-finále R1:** Auer Q22 → g24 (bez času dle autosportu), Tambay Q23 → g21, Tomczyk Q19 → g23, Juncadella Q24 → g22 – posuny bez vysvětlení. **R2:** Scheider archiv 18., sport1 20.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty jen z jedné skupiny: Greenův drive-through (Hockenheim-květen R1), Ekströmova černobílá vlajka a Oconovo předvolání (Hockenheim R1), Wickensův drive-through (Red Bull Ring R2), Scheiderovo varování (RBR R1), varování Wickense/Tambaye a Oconův drive-through (Lausitzring R1, jen facts), Rockenfellerův drive-through za předčasný start (Lausitzring R2), Müllerův drive-through (Norisring R1), Farfusův stop-and-go, Rosenqvistův drive-through, Götzových 5 s (Nürburgring), Blomqvistových 30 s (Hungaroring R1), Tomczykův drive-through (Zandvoort R1), Farfusův drive-through (Zandvoort R2), Götzových 5 s (Moskva R2), Scheiderův trest (Hockenheim-finále R2).
- Příčiny odstoupení bez dvou zdrojů: Molina a Ekström (Hockenheim-květen R2), Juncadella/Götz (Lausitzring R2), da Costa/Juncadella/Paffett/Tambay/Rockenfeller (Norisring R2), Ekström a Tambay (Nürburgring), Müller a Farfus (Hungaroring R2), Martin/Götz/Scheider (Zandvoort R2), Rosenqvist a da Costa (Hockenheim-finále).
- Stájová režie z jedné skupiny: Vietoris pouští di Restu (Hockenheim R1), Paffett pouští Wickense/di Restu (Moskva R1), Auer chrání di Restu (Norisring R2), Blomqvist/da Costa pouští Wittmanna a „BMW kryje Wittmannovi záda“ (Hockenheim-finále).
- Rekordy/prvenství s 1 zdrojem: Rockenfellerův 100. start, „první kompletní Audi pódium“, „první řada 1–8 v historii“, 50. výhra Audi, Mortarova 6. výhra, 250. pódium BMW, „nejmladší dvojnásobný šampion“, „první jezdec BMW se dvěma tituly“, Rastův „druhý start v DTM“, Götzův nejlepší výsledek, „první výhra od srpna 2015“.
- Body/pořadí značek a týmů z jednoho zdroje (Hockenheim-květen, Red Bull Ring, Hungaroring, Hockenheim-finále po R1).

## Preview (`preview.html`)
- Poslední závod víkendu, nejsilnější: **Lausitzring R2** (6 863) – Lucas Auer z pole k první výhře (první výhra týmu Mücke), Mortara v boxech zranil mechanika, Wickens poprvé vede šampionát.
- Poslední závod víkendu, nejslabší: **Hockenheim-finále R2** (5 376) – Mortara vyhrává ze 6. místa, Wittmann čtvrtý a mistr o 4 body (206:202).
- Race 1, nejsilnější: **Red Bull Ring R1** (5 672) – Wittmann z pole, BMW 1-2, šest M4 v top 10, Mortara drží BMW mimo pódium.
- Race 1, nejslabší: **Hungaroring R1** (4 371) – Mortara z pole, di Resta jediný odstoupivší po kontaktu s da Costou.
