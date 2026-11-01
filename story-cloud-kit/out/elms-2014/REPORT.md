# REPORT – ELMS 2014 (cloud session)

## Souhrn
- **5/5 závodů má příběh**: 5× overall + 5× třídy LMGTE a GTC. LMP2 = top třída, třídní příběh nemá. LMP3 v roce 2014 neexistuje.
- `node tools/check.js elms-2014` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky overall: **6 601–9 168** znaků (Castellet 6 601, Estoril 6 839, Imola 6 989, Red Bull Ring 7 334, Silverstone 9 168).
- Overall Aftermath: **1 432–1 753** znaků (v limitu check.js, pod cílem 2 000–2 700; post-race citace LMP2 jsou ve zdrojích řídké).
- Délky tříd: **2 594–3 983** znaků (LMGTE 2 940–3 983, GTC 2 594–3 732). Třídní Aftermath 544–885.
- Zdroje: dumpy DSC + Sportscar365 (DSC staženo curlem, Node fetch vrací 403), navíc Autosport a automotivpress.fr (RBR, tabulka bodů). Všechny URL jsou v dumpech, nebo vracejí HTTP 200.

## Slabá místa
- Hodinový průběh pokrývají zdroje jen u Silverstonu (DSC live). Jinde jsou okna sloučená (Hours 2–3, Hours 1–2/3–4, Hours 1–3 u Imola GTC).
- Castellet overall je nejkratší (6 601): jen dva race reporty, Hour 1 je krátká.
- V dossieru mají všechny závody kromě Silverstonu grid `g?`, takže start vychází z kvalifikačních časů a zdrojů.

## Moje opravy po agentech (vlastní kontrola proti dossieru a dumpům)
- Křestní jména podle dossieru: Nathanaël → Nathanael Berthon (Castellet; dossier je bez „ë“), Matt → Matthew McMurry (Castellet, Silverstone), Ben → Benjamin Barker (Castellet LMGTE). Příjmení „Palttala“ (Estoril GTC) ponecháno podle zdrojů, viz vlajky.
- Imola overall: „Tincknell in his first ELMS race“ (jen DSC) pryč; neověřené „oba týmy přesto přijely do Itálie“ pryč.
- Silverstone overall: „McMurry in his first European race“ a „former series champions … dark horse“ přeformulováno podle zdroje (2012 champion team, chance on the international scene). Stop-and-go #48 za předčasný start ponechán (DSC i S365).
- Silverstone třídy: neověřené „stretched from three hours to four“ pryč; čas a příčina odstoupení #71 (olej, jen DSC) pryč, zůstává jen „missed the start“ (archiv RET 0 kol).
- Imola třídy: soukromé „and his family“ pryč, neověřené výsledky ART na Silverstonu pryč, #71 „failed to start“ → „retired after taking pole“.
- RBR overall: „fresh from a class win at Le Mans“ (není v dumpech) pryč; odkaz na příčinu Klienova odstoupení v Imole (olejová pumpa, jen domněnka) přeformulován.
- Castellet overall: „Race Performance stayed fourth in the standings“ (neověřeno) pryč.
- Castellet LMGTE: jednozdrojový pozdní trest Gulf Porsche pryč, zmatečné „fastest-lap point“ u pole pryč, bodový náskok 21 b. jen ve facts.
- Estoril overall: „Eriksson first drove an LMP2 in Saturday practice“ (neověřeno) → „GP3 race winner making his sports car debut“ (S365).
- Ověřeno ve zdrojích (ponecháno): Signatech stop-go + tříminutový stop-and-hold v Estorilu (DSC i S365), kontakt #55 s ART #99 v Estorilu (DSC i S365), Thiriet RBR brzdový disk + náprava (DSC i S365), Murphy trest za tankování s běžícím motorem v Castelletu (DSC i S365), BoP RBR (DSC + DSC preview + S365), Panciatici suspendované vyloučení (DSC i S365), Jota 2013 vítěz Silverstonu a déšť 2013 (S365).

## Datové vlajky (stručně, řeší se lokálně)
- **Grid:** Imola, RBR, Castellet a Estoril mají u všech vozů `g?`. Pole overall podle časů a zdrojů: Imola #38, RBR #38, Castellet #48, Estoril #38; řádek PERF poles u nich sedí.
- **Silverstone:** DSC kvalifikační report uvádí pole 1:48.912 (to je čas #48), archiv i S365 #38 1:47.702. DSC dává v GTE kvalifikaci #55 druhé, archiv #66 druhé. DSC má u #76 Pasqualiho, archiv Hallydaye.
- **Imola:** S365 píše, že Newblood #43 „classified seventh“, archiv NC 136 kol. DSC má u #81 Broniszewského, archiv Kemenater/Cressoni. DSC řadí Crubile Porsche #82 do GTC, archiv do LMGTE. DSC dává #55 šesté ve třídě, archiv sedmé. Gommendyho kvalifikační čas DSC 1:34.685 vs. archiv 1:34.658.
- **RBR:** jméno Prospeed #75 „Paul“ (DSC) vs. „Max“ van Splunteren (archiv; v Imole má archiv „Paul“). DSC dává BMW #78 2 kola, archiv 0. Posádka #38: některé zdroje uvádějí i Turveyho, archiv ne.
- **Castellet:** gap v dossieru u 3. a 5. místa LMP2 (18.856 a 37.358) a „—“ u 4. místa vypadají jako mezery k předchozímu vozu, ne k vítězi. DSC má #99 GTC devátý, archiv osmý.
- **Estoril:** archiv „Markus Paltalla“, zdroje „Palttala“. S365 jmenuje Picciniho „Andrea“, archiv „Giacomo“ (#80). DSC píše, že #46 odstoupil ve 3. hodině, archiv má 62 ze 146 kol.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty jen z jednoho zdroje: Silverstone stop-go #66/#58/#98 a 15s #81; Imola stop-go Murphy; RBR fuel stop Greaves pod SC; Castellet tresty SMP #72/#71 za start, #85/#99; Estoril kvalifikační trest Race Performance, stop-go Greaves #41.
- Příčiny odstoupení bez dvou zdrojů: Pegasus #29 (Silverstone, RBR, Castellet), Thiriet #46 (Castellet, Estoril), Newblood #43 Imola (jen „suspected oil pump“), #99/#75/#58 Estoril.
- Výsledky jiných tříd v overall Aftermath nejsou.

## Preview (`preview.html`)
- Overall nejsilnější: **Silverstone** (9 168) – Dolanova nehoda z vedení, Gommendy předjíždí Freye v 22minutovém sprintu.
- Overall nejslabší: **Castellet** (6 601) – první výhra Newblood, trest Murphy za tankování.
- Třída nejsilnější: **Silverstone LMGTE** (3 983) – Rugolo předjíždí Bertoliniho v závěru.
- Třída nejslabší: **Red Bull Ring GTC** (2 594) – double SMP, tenké zdroje.
