# REPORT – DTM 2019 (cloud session)

## Souhrn
- **18/18 závodů má příběh** (9 víkendů × Race 1 + Race 2). DTM nemá třídní příběhy.
- `node tools/check.js dtm-2019` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky: Race 1 **4 583–6 284** znaků (Assen 4 583, Zolder 4 777, Misano 4 880, Hockenheim 5 197, Norisring 5 232, Nürburgring 5 432, Brands Hatch 5 497, Hockenheim-finále 6 004, Lausitzring 6 284). Race 2 **4 807–6 399**. Aftermath **1 283–2 063** (vše v limitu 1 100–2 900; většinou pod cílem 2 000–2 700, protože body a post-race detaily z jediného zdroje jsem škrtal).
- Formát ověřený ve zdrojích: 55 min + 1 kolo, jedna povinná zastávka se 4 pneumatikami (bez tankování), zastávka pod Safety Carem se nepočítá jako povinná, Hankook pneumatiky, DRS a push-to-pass u Class 1 (hosté ze Super GT ve finále bez nich). Standing/IndyCar restarty podle zdrojů.
- Zdroje: dumpy DSC/S365 jsou u DTM 2019 skoro jen šum (roundupy, Super GT, WEC). DSC vracelo přes Node 403 a pak 429, doběhlo přes curl. Hlavní zdroje: motorsport.com, autosport.com, touringcartimes.com, motorsport-total.com, motorsport-magazin.com (reporty i live-tickery), sport1.de, autobild.de, speedweek.com, Hankook mediacenter, BMW PressClub (Norisring), tiskovky Audi zrcadlené na rosberg.de, thecheckeredflag.co.uk, prescottmotorsport.co.uk, motorsport-xl.de, bmwblog.com. Audi MediaCenter vracelo 404, dtm.com nebylo použitelné. **Všechny URL mimo dumpy vracejí HTTP 200.**
- Pro účel „≥2 nezávislé zdroje“ beru motorsport.com + autosport.com jako jeden zdroj (stejná skupina).

## Slabá místa
- Průběh závodů zdroje pokrývají dobře (2–3 kapitoly + The finish). Slabší jsou Aftermathy: body šampionátu a pořadí po závodě se mezi zdroji často liší nebo je má jen jeden web. V textu nechávám jen čísla potvrzená dvakrát.
- Zolder Race 2 (4 807, Aftermath 1 283) a Assen Race 1 (4 583) jsou nejkratší, ale nad minimem.
- Hockenheim-finále Race 2 (27 kol za 1:04:45): v 1. kole Cassidy (Lexus) skončil ve zdi po kontaktu s Aberdeinem (SC), pak hořel Aston Martin Juncadelly → červená vlajka (asi 10–13 min) a restart za SC. Zkrácení na „49 min + 1 kolo“ kvůli dvěma formačním kolům má jen Motorsport-Magazin, proto jen ve facts.

## Moje opravy po agentech (kontrola proti dossieru a staženým stránkám)
- **Hockenheim R1:** „12th DTM win“ Wittmanna (jen skupina motorsport.com) z textu i z faktu pryč.
- **Hockenheim R2:** dlouhý seznam bodů 6.–11. místa (jen MM ticker) zkrácen na top 4; chybná věta „Audi took five of the remaining six podium places“ → „kromě Wittmannovy sobotní výhry všechna pódia víkendu Audi“ (ověřeno z archivu).
- **Zolder R1:** neověřené „Eng in his second season“ pryč; ve facts odstraněno „according to BMW’s race release“ (zakázaný styl).
- **Zolder R2:** „Rast podruhé ze tří sobot odstoupil“ – archiv má Rasta v Hockenheimu R1 klasifikovaného (16.), přeformulováno.
- **Misano R1:** „first two DTM starts“ → „events“ (podle citace Gasse).
- **Norisring R1:** trest Enga za blokování (zdroje: −3 místa → start 5., archiv ho má na g2) z textu pryč; příčina Fittipaldiho odstoupení (melee, jen Autosport) pryč; „best result for R-Motorsport“ → „equalling“ (Dennis byl 6. už v Zolderu R2).
- **Norisring R2:** start 13:30, Best Pit Stop Award (jen Hankook) a „Juncadella fastest in every session“ (jen R-Motorsport) pryč.
- **Assen R2:** „Rast close to a fourth win“ (bez zdroje) a „Rockenfeller up to fifth in the standings“ (jeden zdroj) pryč.
- **Brands Hatch R1:** Build-up vypočítával jen část vítězů (vynechal 3 výhry Rasta a 2 Wittmanna) → přepsáno podle archivu (6 vítězů, Rast a Wittmann po 3). Pryč: drive-through Juncadelly (jen TCT), „Wittmann 32 behind“ (jen TCT), zákaz ohřívačů pneumatik (jen Prescott), „tři britští jezdci“ (bez zdroje), příčina Habsburgova problému (jen skupina motorsport.com).
- **Brands Hatch R2:** „32 clear of Wittmann“ pryč, zdvojené „fourth win“ v Aftermathu pryč.
- **Lausitzring R1:** příčina Glockova odstoupení (jen 1 zdroj) pryč.
- **Lausitzring R2:** „Müllerův bod za kvalifikaci → 13 bodů“ (jen 1 zdroj), „Engův 13. čas“ (archiv bez času, g18), body Enga a Rockenfellera, Best Pit Stop Award a zdvojená věta o Habsburgovi/Glockovi pryč.
- **Nürburgring R1:** Rastova pokuta 50 € za rychlost v boxech (jen Speedweek), černobílé vlajky Duvala a Müllera (jen motorsport.com), „needs nine points on Sunday“ a zmínka o bulletinu DMSB pryč.
- **Nürburgring R2:** „Müller finished 16th“ → „last of the classified runners“ (archiv 15.); tie-break na počet výher a stažení R-Motorsportu z Fuji (jeden zdroj) pryč; „poslední výhra Greena na 2. Hockenheimu 2017“ z textu pryč (zůstalo „téměř dva roky“, které mají 2 zdroje).
- **Hockenheim-finále R1:** důvod stažení Habsburga, černobílá vlajka Rockenfellera, „Eng lost power“ a „Wittmann had less DRS and push-to-pass“ pryč (jeden nebo žádný zdroj).
- **Hockenheim-finále R2:** důvod Rockenfellerova trestu zjednodušen na „třetí varování“ (zdroje se liší: track limits vs. vytlačení Wittmanna); důvod Fittipaldiho startu zezadu (parc fermé, jen Autosport), příčina di Restova DNS, „Phoenix předstihl RMG v týmech“ a „Aberdein nejlepší nováček, 10. v šampionátu“ pryč.

## Datové vlajky (stručně, řeší se lokálně)
- **Misano (R1 i R2):** Fittipaldi v archivu jako #21 WRT. Podle zdrojů (S365, Audi) nahradil v Rosbergu Jamieho Greena (akutní zánět slepého střeva) a #34 WRT jel host Dovizioso. Tým/číslo Fittipaldiho ověřit.
- **Hockenheim-finále #37 Lexus:** R1 kvalifikace v archivu „Nick Cassidy“, výsledek R1 „Ryo Hirakawa“ (podle zdrojů jel R1 Hirakawa). R2 kvalifikace „Ryo Hirakawa“, výsledek „Nick Cassidy“ (zdroje: R2 jel Cassidy). Jména v kvalifikacích jsou nejspíš prohozená. R2 grid g16–g18 (Juncadella/di Resta/Cassidy) mají zdroje v opačném pořadí.
- **Norisring R1 grid:** archiv g2 Eng, g3 Spengler, g4 Rast, g5 Eriksson. Zdroje uvádějí trest Enga (−3 místa, start 5.), Spenglera 2. a Rasta 3.
- **Klasifikace vs. odstoupení podle zdrojů:** Hockenheim R1 Rast (16., 28 kol, převodovka), Zolder R2 Glock (14., 38 kol), Misano R1 di Resta (16., 31 kol), Brands R1 di Resta (14., 39 kol) a Habsburg (15., 38 kol), Assen R2 Eriksson (16., 29 kol), Norisring R2 Wittmann (16., 64 kol). Zdroje u všech píšou o odstoupení. V textu podle archivu („classified“ nepoužívám tam, kde jezdec podle zdrojů odstoupil).
- **Drobné rozdíly gridu:** Assen R1 Aberdein g11 (zdroje 10.), Assen R2 Wittmann g18 (zdroje: start z boxů), Zolder R1 di Resta g17 (zdroje 16.) a Rockenfeller g16 (některé zdroje: poslední), Brands R1 Habsburg g15 (Autosport 16.), Brands R2 Müller g6 (Autosport/motorsport.com 8.), Lausitzring R1 Aberdein Q14 → g17 bez vysvětlení, Lausitzring R2 Eng bez kvalifikačního času (zdroje: 13. čas, start poslední).
- **Pořadí:** Hockenheim R2 Aberdein 12./Habsburg 13. (Autosport opačně), Brands R2 Fittipaldi 16. (zdroje 17.), Nürburgring R1 Duval 5./Green 6. (Autosport opačně) a Müller 15. (zdroje 16.), Hockenheim-finále R1 Müller 17. (Autosport 16.), Matsuda RET 21 kol (zdroje: dojel 17 kol pozadu).
- **Misano R1:** Frijns RET 16 kol, motorsport.com píše, že dojel 23 kol pozadu.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty jen z jednoho zdroje (ve facts s `one` nebo vůbec): Spengler drive-through Assen R1, Juncadella drive-through Brands R1, van der Linde pokuta za volant (Hockenheim), Aberdein DSQ/trest po kvalifikaci Hockenheim, Habsburg falešný start a varování (Lausitzring), Habsburg −5 míst (Nürburgring), Rast pokuta za rychlost v boxech (Nürburgring), černobílé vlajky (Nürburgring, finále).
- Příčiny odstoupení bez dvou zdrojů: Aston Martiny v Zolderu R1 (plynový aktivátor / tlak oleje – jen facts), di Resta DNS Zolder R2 (tlak oleje – jen facts), Eriksson Misano R1, Glock Lausitzring R1, Dennis Lausitzring R2, Wittmann Nürburgring R2 (jen „technical problem“), Aberdein finále R2.
- Body: Hockenheim po R1, Misano po R1, Brands Hatch před víkendem (zdroje 158 vs. 178), Zolder po R2 (59/54/43… jen facts), finále po R1 (307/223/202 jen facts).

## Preview (`preview.html`)
- Poslední závod víkendu, nejsilnější: **Hockenheim R2** (6 399) – Rast vyhrává ze 16. místa díky zastávce pod Safety Carem, Audi 1-2-3.
- Poslední závod víkendu, nejslabší: **Zolder R2** (4 807) – Rast vítězí, van der Linde bere první pole o 0,006 s, Green krade 3. místo v posledním kole.
- Race 1, nejsilnější: **Lausitzring R1** (6 284) – Rastovi selže auto ve vedení, Müller vyhrává a stahuje náskok na 14 bodů.
- Race 1, nejslabší: **Assen R1** (4 583) – první DTM závod v Assenu, start za SC v dešti a kroupách, Wittmann porazí Müllerův dlouhý stint.
