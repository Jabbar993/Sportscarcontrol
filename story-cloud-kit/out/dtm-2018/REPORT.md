# REPORT – DTM 2018 (cloud session)

## Souhrn
- **20/20 závodů má příběh** (10 víkendů × Race 1 + Race 2). DTM nemá třídní příběhy.
- `node tools/check.js dtm-2018` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky: Race 1 **4 405–6 174** znaků (Zandvoort 4 405, Norisring 4 583, Red Bull Ring 4 746, Nürburgring 4 831, Hockenheim-finále 5 195, Lausitzring 5 248, Hockenheim 5 320, Brands Hatch 5 516, Misano 5 818, Hungaroring 6 174). Race 2 **5 250–7 310**. Aftermath **1 715–2 247** (vše v limitu 1 100–2 900; část pod cílem 2 000–2 700, protože jednozdrojové body a reakce jsem škrtal).
- Formát ověřený ve zdrojích: 55 min + 1 kolo, jedna povinná zastávka s výměnou pneumatik (Hankook), DRS, body za kvalifikaci 3-2-1, restarty po SC ve dvojřadu (kromě mokra). Od Nürburgringu závazný minimální tlak v pneumatikách. Misano = první noční závody DTM (start 22:30). Poslední rok Mercedesu (tituly jezdců, značek i týmů).
- Zdroje: dumpy DSC/S365 skoro jen šum (DSC přes Node 403, pak přes curl s 429 – několik dávek). Hlavní zdroje: motorsport.com, autosport.com, touringcartimes.com, motorsport-total.com, motorsport-magazin.com (reporty i live-tickery), sport1.de, autobild.de, speedweek.com, Hankook mediacenter, crash.net, racingblog.de, bmwblog.com, bimmertoday.de, mbpassion.de, thecheckeredflag.co.uk, motorline.cc, speed-magazin.de, prescottmotorsport.co.uk, girlracer.co.uk, nl/de.motorsport.com. **Všechny URL mimo dumpy vracejí HTTP 200.**
- motorsport.com + autosport.com (+ motorsport-total.com, sesterský web) beru jako jednu skupinu zdrojů.

## Slabá místa
- Průběh závodů je dobře pokrytý (2–4 kapitoly + The finish). Nejkratší jsou Zandvoort R1 (4 405) a Norisring R1 (4 583) – nad minimem.
- Body šampionátu se mezi zdroji občas liší o 1 (Paffett 206/207 po Red Bull Ring R1); v textu jen čísla potvrzená dvakrát.

## Moje opravy po agentech (kontrola proti dossieru a staženým stránkám)
- **Norisring R1:** pryč „Wittmann bydlí ve Fürthu“ (soukromé), „Audi – úřadující šampion značek“; Frijnsova zastávka „na úplném konci“ → „dlouhý první stint, zastávka pozdě“ (zdroje se rozcházejí: kolo 40 vs. předposlední kolo).
- **Norisring R2:** čas startu 13:30 pryč.
- **Brands Hatch R1:** „v 67. závodě“ Juncadelly (jen Motorsport-Magazin) z textu pryč.
- **Lausitzring R1:** nedoložené tvrzení, že pneumatiky se v boxech nesmějí předehřívat → obecná věta o povinné zastávce a studených pneumatikách.
- **Lausitzring R2:** „první pódium Wittmanna na Lausitzringu“ (jen výrok v tickeru) a „Rast se vrátí v Maďarsku“ (bez zdroje) pryč.
- **Zandvoort R1:** příčina Müllerovy nehody (defekt, jen jeden zdroj) a „vyrovnal Ekströma 23 výhrami“ (jen 1 zdroj) pryč.
- **Zandvoort R2:** příčina Frijnsova odstoupení (jen MM) pryč; body Glocka/Wittmanna/Mortary/Wehrleina a „Rast devátý“ pryč (nedoložené dvakrát), zůstalo 148/121 a Rastových 49 (odvoditelné z archivu).
- **Hungaroring R1:** „Paffett nikdy na pódiu v Maďarsku“ (jen preview) a „Auer bez odporu pustil di Restu“ (nařčení ze stájové režie) pryč.
- **Nürburgring R1:** Frijns „na konec roštu“ → „posunut o 5 míst“ (podle 2 zdrojů).
- **Nürburgring R2:** zmínka o titulu Rasta 2017 (jiný ročník) pryč.
- **Misano R1:** „HWA team-mate“ → „Mercedes team-mate“ (Paffett a di Resta jezdili za různé týmy), oprava zdvojené věty ve faktu.
- **Misano R2:** příčina Farfusova odstoupení (kontakt s Müllerem – zdroje se rozcházejí) pryč.
- **Red Bull Ring R1:** statistiky výher značek ve Spielbergu 2011–2017 a výrok o Mercedesu bez pódia v minulých letech (jiné ročníky, 1 zdroj) pryč; „Glock zaparkoval“ → „zastavil v zatáčce 9“ (archiv ho klasifikuje).
- **Red Bull Ring R2:** čas startu 13:30 pryč.
- **Hockenheim-finále R1:** „Auer uhnul Paffettovi“ (jen skupina motorsport.com) → Paffett převzal vedení; „pět výher v řadě nikdo v DTM nedokázal“ (jen 1 zdroj) z textu pryč.
- **Hockenheim-finále R2:** nepodložené „Paffettovi stačí 4. místo“ nahrazeno obecnou větou.

## Datové vlajky (stručně, řeší se lokálně)
- **Hungaroring R2:** archiv má pořadí s mezerami (pozice 7, 9, 10 chybí) a DSQ Spenglera, Auera a Mortary na 19.–21. místě. Po vyloučení zdroje uvádějí posunuté pořadí (Farfus 7., Frijns 8., Duval 9., Rast 10. – tedy body pro Frijnse, Duvala a Rasta), archiv má Farfuse 8., Frijnse 11., Duvala 12., Rasta 13., Paffetta 18. Pořadí po DSQ ověřit.
- **Red Bull Ring R2:** Frijns podle Motorsport-Magazin a tickeru MT diskvalifikován (nedostavil se k vážení), archiv ho klasifikuje 13.
- **Red Bull Ring R1:** archiv klasifikuje Glocka (17., 31 kol) a Spenglera (18., 30 kol); Glock podle zdrojů zastavil na trati (SC). Mortara: zdroje 9. místo a pak trest, archiv 16.
- **Red Bull Ring R2:** Mortara Q4 → g9 (zdroje zmiňují posun na startu, jeden zdroj), Wehrlein Q5 → g4. Rast „startoval osmý“ (motorsport.com) vs. g7.
- **Norisring R1/R2:** Motorsport-Total uvádí 67 kol v R2, archiv 68.
- **Hockenheim R1 (finále):** Wittmann (16., 27 kol) a Farfus (17., 25 kol) v archivu klasifikováni, zdroje píšou o vyjetí/ztrátě dveří; Auer RET 6 kol (zdroje 7. kolo).
- **Hockenheim R2 (úvod):** Ekström 16. (jeden zdroj 19.), motorsport.com uvádí Enga v týmu RBM (archiv RMR).
- **Lausitzring R1:** Rast RET po 6 kolech, Duval po 7; zdroje řadí Rastovu nehodu do 7. kola.
- **Misano R2:** pole Duvala 1:45.766 (archiv, TCT) vs. 1:45.983 (Autosport, MM); Eriksson g12 (MM: 15.).
- **Misano R1:** TCT 33 kol, archiv 32; pole 1:46.854 v textu motorsport.com vs. 1:46.826 (archiv).
- **Hungaroring R1:** zdroje uvádějí 33 nebo 35 kol, archiv 34.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty jen z jednoho zdroje: Frijns Lausitzring R1, Duval drive-through Norisring R2, varování Mortary/Erikssona/Rockenfellera (Lausitzring R2), Müllerova černobílá vlajka (Zandvoort R2, jen facts), Glockova černobílá vlajka (Nürburgring R1), Mortarův posun na startu (Red Bull Ring R2), Frijnsův trest za vrácení pozic (Hockenheim-finále R1), varování Enga/Ogiera/Glocka (Red Bull Ring R2).
- Příčiny odstoupení bez dvou zdrojů: Auer Hockenheim-finále R1 (plynový pedál – jen facts), Auer/Juncadella Nürburgring R2, Farfus/Auer Red Bull Ring R2, Frijns Zandvoort R2, Müller Zandvoort R1, Farfus Misano R2.
- „Prvenství/rekordy“ jen s 1 zdrojem (jen facts): 9 pole Mercedesu v řadě (Misano), Mortarova 10. výhra ve 100. závodě (Norisring), Rastových 5 výher v řadě jako rekord (Hockenheim-finále R1).

## Preview (`preview.html`)
- Poslední závod víkendu, nejsilnější: **Hungaroring R2** (7 310) – déšť, tři nehody v boxech se zraněnými, červená vlajka, Wittmann vyhrává ze 14. místa, BMW 1-2-3, tři diskvalifikace.
- Poslední závod víkendu, nejslabší: **Nürburgring R2** (5 323) – Rast jako první v historii DTM bere obě pole i obě výhry víkendu.
- Race 1, nejsilnější: **Hungaroring R1** (6 174) – di Resta vs. Auer přes zastávky, BMW bez bodů.
- Race 1, nejslabší: **Zandvoort R1** (4 405) – Mercedes 1-2-3-4, safety car zničí Rastovu strategii.
