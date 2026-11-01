# REPORT – DTM 2012 (cloud session)

## Souhrn
- **10/10 závodů má příběh** (jeden závod na víkend, každý příběh má Build-up v plné délce a Aftermath; návrat BMW). DTM nemá třídní příběhy.
- `node tools/check.js dtm-2012` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky: **5 771–7 525** znaků (Norisring 5 771, Nürburgring 5 961, Red Bull Ring 6 240, Valencia 6 558, Brands Hatch 6 753, Lausitzring 6 803, Oschersleben 6 846, Hockenheim-finále 6 879, Hockenheim-duben 7 303, Zandvoort 7 525). Aftermath **1 784–2 072** (vše v limitu 1 100–2 900).
- Formát ve zdrojích 2012: jeden závod na víkend (časový limit), dvě povinné zastávky bez tankování, pneumatiky Hankook. **Bez bodů za kvalifikaci.**
- **Body šampionátu** z archivu (25-18-15-12-10-8-6-4-2-1 podle archivní pozice) po každém závodě; sedí na konečné pořadí (Spengler 149, Paffett 145, Green 121). Titulové hypotézy přepočítané z tabulky: před Valencií mohli vyhrát jen Paffett, Spengler a Green; před finále Paffett 127, Spengler 124, Green 109 (Green jen s výhrou a výpadkem obou), při prohozeném pořadí v cíli by Paffett vyhrál 152:142.
- Zdroje: DSC/S365 dumpy prázdné, Audi MediaCenter 404. Hlavní: autosport.com, motorsport.com (vč. přetištěných tiskových zpráv výrobců), touringcartimes.com, auto123.com, autobild.de (dpa), bmwblog.com, bimmertoday.de, transmission-one.com, racingblog.de, ORF, racecar.com (Hankook), leblogauto aj. Všechny URL v sources/facts vracejí HTTP 200.
- Postup: autoři (sonnet, 1 agent na 2 závody) → samostatný audit každé dvojice (opravy zapsané v souborech; u 4 z 5 auditů se nevrátila závěrečná zpráva, kontrolu jsem proto dokončil sám: statusy RET proti archivu, body proti tabulce, titulky, titulová matematika, URL).

## Hlavní opravy (výběr, audit Zandvoort/Oschersleben)
- „Team-mate“ Paffett/Green → jiné týmy (HWA Team vs. Mercedes AMG podle dossieru).
- Fakta z jiných ročníků pryč: Mortarova první pole na Zandvoortu 2003, Paffett „na mokru v Oscherslebenu loni“, Greenova dřívější pódia, Lammovy roky ve WTCC, Spenglerova pódia v Oscherslebenu.
- Vietoris (Zandvoort) RET po 1 kole, ostatní tři po 0 – opraveno podle archivu; Albuquerque a Priaulx klasifikováni.
- „Nejvíc bodů BMW v sezóně“ (Oschersleben) → „víc než v kterémkoli dřívějším závodě 2012“ (ve finále mělo BMW víc); body značky jen z BMW PR pryč.

## Datové vlajky (stručně, řeší se lokálně)
- **Hockenheim-duben:** Merhi klasifikován 18. (38 kol), Mercedes „retired“; Werner a Mortara bez času v Q (smazané časy); Tomczyk RET 4L (bimmertoday 5).
- **Lausitzring:** Wickens klasifikován 22. (47 kol), zdroje závada/výlet v 48. kole; grid Schumacher g16, Merhi g17, Vietoris g18 vs. Mercedes Q16/Q17.
- **Brands Hatch:** odstup vítěze 5.065 (archiv) vs. 2.7 s (BMW); Le Blog Auto 98 kol, archiv 97; Wolff klasifikována 20. (−16 kol) bez vysvětlení.
- **Red Bull Ring:** návštěvnost 25 000 (ORF) vs. 48 500 (Audi, víkend) – v textu není.
- **Norisring:** plánovaná délka 82 vs. 83 kol; archiv 1:15:00.005 (časový limit). Q časy v dossieru odrážejí startovní pořadí (Ekström g4 49.369, Schumacher g5 49.023).
- **Nürburgring:** Tomczyk g5 (auto123 6.).
- **Zandvoort:** 42 (dpa) vs. 43 kol; Scheider RET 6L (dpa 7. kolo); Albuquerque klasifikován 15. (Audi „forced to park“).
- **Oschersleben:** Priaulx klasifikován 17. (BMW „retired“); Tomczyk start z 11. místa po posunu o 5 míst (sedí).
- **Valencia:** Mortara (16., 38 kol) a Hand (15., 42 kol) klasifikováni, zdroje odstoupení; Paffett RET 27L (zdroje 27/28).
- **Hockenheim-finále:** Scheider g22 (podle jednoho zdroje podváha), Priaulx g13 (BMW 14.).

## Vynecháno jako sporné nebo jednozdrojové
- Tresty z jedné skupiny: Mortarův drive-through a smazané časy Wernera/Mortary (Hockenheim-duben), Freyin drive-through (Red Bull Ring); detaily Greenova a Paffettova trestu ve Valencii (zdroje se liší – v textu jen obecně).
- Příčiny odstoupení bez dvou zdrojů: Coulthard, Molina, Scheider (Red Bull Ring, Zandvoort), Mortara a Frey (Oschersleben), Wickens (Valencia), Tambay a Rockenfeller (finále).
- Rekordy s 1 zdrojem: „100. double Mercedesu“, „první pole BMW od 1992“, Spenglerova 12. pole, Farfusova „první pole a první Brazilec v DTM“, „první pódium všech tří značek“, „BMW poprvé na Norisringu po 20 letech“, Spenglerovo „7. pódium v řadě na Norisringu“, „20. výhra Schnitzeru“, „první výhra týmu Rosberg“, „první pětice BMW v top 10“, body značek a týmů.

## Preview (`preview.html`)
- Nejsilnější a nejslabší závod podle délky (vybírá `tools/preview.js`).
