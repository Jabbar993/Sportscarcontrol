# REPORT – DTM 2017 (cloud session)

## Souhrn
- **18/18 závodů má příběh** (9 víkendů × Race 1 + Race 2). DTM nemá třídní příběhy.
- `node tools/check.js dtm-2017` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky: Race 1 **4 351–6 844** znaků (Hockenheim-květen 4 351, Nürburgring 4 371, Zandvoort 4 782, Red Bull Ring 4 860, Lausitzring 5 047, Moskva 5 127, Hockenheim-finále 5 183, Norisring 5 710, Hungaroring 6 844). Race 2 **5 411–6 468**. Aftermath **1 367–2 134** (vše v limitu 1 100–2 900; většina pod cílem 2 000–2 700, protože jednozdrojové reakce, tresty a příčiny jsem škrtal).
- Formát ověřený ve zdrojích: 55 min + 1 kolo, jedna povinná zastávka s volným oknem (nový Hankook, bez ohřívacích dek), omezené rádio, DRS s omezeným počtem použití, body za kvalifikaci 3-2-1, restarty po SC ve dvojřadu („Indy“). Výkonové váhy (performance weights) se od Hungaroringu počítaly z tempa v závodě, od Red Bull Ringu zrušeny (všichni 1 115 kg). Systém varování (3. varování = −5 míst, 5. = −10 míst na startu).
- **Body šampionátu** jsem spočítal z archivu (25-18-15-12-10-8-6-4-2-1 + kvalifikace 3-2-1) po každém závodě; sedí na konečné pořadí (Rast 179, Ekström 176, Green 173, Rockenfeller 167). Všechna čísla bodů v textech jsou s touto tabulkou v souladu (zdroje se místy lišily – např. Auer po Moskvě 97 vs. 99, Auer po Lausitzringu R1 65 vs. 68).
- Zdroje: DSC/S365 dumpy prakticky prázdné (DSC přes curl + několik dávek kvůli 429; použitý jen 1 článek DSC o Super GT demu). Hlavní zdroje: motorsport.com (+ de/es/au/ch mutace), autosport.com, motorsport-total.com, motorsport-magazin.com (reporty, live-tickery, „Strafregister 2017“), touringcartimes.com, sport1.de, autobild.de, speedweek.com, racingblog.de, thecheckeredflag.co.uk, racefans.net, motorsportweek.com, bmwblog.com, bimmertoday.de, mbpassion.de, motorline.cc, motorsport-xl.de, racing24-7.net, gtspirit.com, racecar.com, Hankook mediacenter, laola1.at a další. **Všechny URL mimo dumpy vracejí HTTP 200.** motorsport.com + autosport.com + motorsport-total.com beru jako jednu skupinu zdrojů.

## Slabá místa
- Průběh po kolech (kola zastávek) je často jen z jednoho zdroje → v textu rozsahy nebo bez čísla.
- Nejkratší jsou Hockenheim-květen R1 (4 351) a Nürburgring R1 (4 371) – nad minimem; Aftermath Hockenheim-květen R2 (1 367) a Zandvoort R2 (1 472) jsou nejtenčí.

## Moje opravy po agentech (kontrola proti dossieru a staženým stránkám)
- **Lausitzring R1:** Rastovo předjetí Glocka „v 13. kole“ (jen 1 zdroj, jiný píše o kolo později) → bez kola.
- **Lausitzring R2:** „Ekströmův vůz zastavil po cíli“ (bez zdroje) pryč; „Wickens získal první body“ → „bez bodů v Hockenheimu“ (body měl už z kvalifikace).
- **Hockenheim (květen) R2:** „Mercedes vede šampionát jezdců, týmů i značek“ (1 zdroj) pryč; Farfusovo odstoupení „v chaosu restartu“ (příčina bez zdroje) → jen nedojel.
- **Hungaroring R1:** Blomqvist (archiv klasifikuje, 9 kol ztráty) „zajel naposledy do boxů“ → „dojel devět kol za vedoucím“.
- **Hungaroring R2:** přesné +5/−5 kg (zdroje si odporují) → rozdíl 10 kg (2 zdroje); Auer „odstoupil jako první, v 24. kole“ → jediný odstoupivší, po 23 kolech (archiv).
- **Moskva R2:** nařčení, že Müller záměrně brzdil pole pro Ekströma (Wittmann, Fritz – jen skupina motorsport-total) pryč, zůstal neutrální popis.
- **Norisring R1:** „Ekström jen pár bodů za Rastem“ → přesně osm (tabulka).
- **Zandvoort R1:** body značek 421/341/308 a „BMW se posunulo na 2. místo mezi značkami“ (1 zdroj) pryč; „Rockenfeller pustil Greena a v posledním kole si místo vzal zpět“ (stájová režie, 1 zdroj) pryč.
- **Nürburgring R1:** Paffett „jediný na slicích v cíli“ → „jeden z mála“ (zdroje).
- **Nürburgring R2:** „čtyři Audi“ → Audi bylo šest; „čtyři kola (rounds) zbývají“ → čtyři závody.
- **Red Bull Ring R2:** příkaz komisařů Ekströmovi vrátit pozici Wittmannovi (jen TCT) pryč. Müllerovo uhnutí Rockenfellerovi v posledním kole ponecháno (autosport + motorsportweek).
- **Hockenheim-finále R2:** chybná aritmetika „Ekström by byl mistrem o bod, kdyby Rast dojel pátý“ → „kdyby sám dojel šestý“ (ověřeno výpočtem).
- **Hockenheim-květen R1:** překlep „,,“.

## Datové vlajky (stručně, řeší se lokálně)
- **Moskva R2:** archiv má di Restu RET 0 kol (g4), přitom podle zdrojů závod krátce vedl; Motorsport-Magazin píše o jeho vyloučení po závodě. Paffett 16. (MM: 30s trest). Rockenfeller 12. po 5s trestu za DRS – archiv sedí.
- **Zandvoort R2:** Wittmann DSQ je v archivu na 15. místě (uprostřed pořadí); di Resta bez gridu (`g?`, nejel kvalifikaci); Glock (vyloučen z kvalifikace) má g5 a Paffett (časy škrtnuty kvůli pneumatice) g8 – zdroje píšou start zezadu. Rast a di Resta RET 0 kol, zdroje 10 a 12 kol.
- **Zandvoort R1:** Blomqvist „Classified 17L“ (20 kol ztráty), zdroje píšou o odstoupení.
- **Nürburgring R2:** Müller RET 0 kol, podle zdrojů vypadl po kontaktu s Glockem kolem 27. kola. **Nürburgring R1:** rychlé kolo archiv Müller (k. 18), TCT Paffett.
- **Red Bull Ring R1:** Farfus RET 0 kol, Autosport odstoupení ve 28. kole; Paffett ztráta 45.721 (Autosport 1:15.721). **Red Bull Ring R2:** Duval Q17 → g18 a Auer Q18 → g17 (Duvalův trest jen 1 zdroj).
- **Hockenheim-finále R2:** Blomqvist RET 0 kol, zdroje kolize s Wickensem kolem 25. kola. Hockenheim-finále R1: zdroje 35 kol, archiv 36.
- **Hungaroring R1:** Green DSQ (archiv 16. místo s DSQ), na trati 7.; zdroje mají po vyloučení posunuté pořadí (Farfus 12./11. atd.). Martin Hungaroring R2 g18 (z Q16 – trest, zdroje nejednotné 3 místa).
- **Hockenheim-květen R2:** Farfus RET 12 kol (BMW 14 kol).
- **Lausitzring R1/R2:** zdroje 44 kol, archiv 43.
- **Norisring R2:** fotofiniš Mortara/Ekström/Wittmann – Speedweek uvádí jiné rozdíly (0.025/0.002) než archiv (0.002/0.027).

## Vynecháno jako sporné nebo jednozdrojové
- Tresty jen z jednoho zdroje: Duval 30 s (Hungaroring R2), varování Mortary/Wittmanna/Rockenfellera (Hungaroring), Müller falešný start (Moskva R1), Paffett 30 s a di Resta DSQ (Moskva R2), Rastovo varování (Norisring R2), Engel 30 s, Duvalova černobílá vlajka (Norisring), Blomqvist drive-through (Zandvoort R2), Wickensova pokuta 700 € (RBR), Wickensovo varování (Hockenheim-finále R2), Rastova černobílá vlajka (Hockenheim-květen R1).
- Příčiny odstoupení bez dvou zdrojů: Wickens (Hungaroring R1, defekt), Wittmann (Hungaroring R2, přehřátí), Rast a di Resta (Zandvoort R2), Spenglerův defekt a Glockova pneumatika (Norisring R2), Farfus (Norisring R1), Rastův kabel (Hockenheim-finále R2).
- Rekordy/prvenství s 1 zdrojem: Mercedesův 400. závod, rekord kola, Rockenfellerovo „první pódium od 2015“, Spenglerův 150. start, Ekströmova 23. výhra, Glockovo „třetí/čtvrté pole“, „první Audi trio“, Martinovo/Blomqvistovo „první/druhé pole“.

## Preview (`preview.html`)
- Poslední závod víkendu, nejsilnější: **Norisring R2** (6 468) – červená vlajka po nehodě Paffett/Rockenfeller, Martin vyhrává ze 7. místa, fotofiniš o 3. místo o 0,002 s.
- Poslední závod víkendu, nejslabší: **Hockenheim (květen) R2** (5 444) – déšť, první „Indy“ restart, Green vyhrává přes 5s trest, Wittmann ze 17. na 3.
- Race 1, nejsilnější: **Hungaroring R1** (6 844) – di Resta vyhrává ze 13. díky SC, Audi z první pětice bez pódia, Greenova diskvalifikace po protestu.
- Race 1, nejslabší: **Hockenheim (květen) R1** (4 351) – zahájení sezóny s novými pravidly, Auer z pole.
