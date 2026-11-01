# REPORT – DTM 2014 (cloud session)

## Souhrn
- **10/10 závodů má příběh** (jeden závod na víkend, každý příběh má Build-up v plné délce a Aftermath). DTM nemá třídní příběhy.
- `node tools/check.js dtm-2014` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky: **6 340–7 730** znaků (Red Bull Ring 6 340, Norisring 6 368, Moskva 6 526, Zandvoort 6 600, Hungaroring 7 016, Oschersleben 7 144, Nürburgring 7 495, Lausitzring 7 514, Hockenheim-květen 7 577, Hockenheim-finále 7 730). Aftermath **1 688–2 175** (vše v limitu 1 100–2 900).
- Formát ověřený ve zdrojích 2014: jeden závod na víkend, povinné zastávky a dva typy pneumatik (option/prime) s povinným použitím obou, DRS. **Bez bodů za kvalifikaci.**
- **Body šampionátu** z archivu (25-18-15-12-10-8-6-4-2-1) po každém závodě; sedí na konečné pořadí (Wittmann 156, Ekström 106, Rockenfeller 72). Titulová matematika (Nürburgring: „na Lausitzringu stačí čtvrté místo“, 132 > 131; titul na Lausitzringu, soupeři max. 109) přepočítaná z tabulky.
- Zdroje: DSC/S365 dumpy prázdné. Hlavní: autosport.com, motorsport.com, motorsport-total.com, motorsport-magazin.com (tickery), touringcartimes.com, touringcars.net, speedweek.com, speed-magazin.de, autobild.de, mbpassion.de, gtspirit.com, bmwblog.com, bimmertoday.de, racecar.com, racingblog.de, crash.net, motor.es aj. Všechny URL v sources/facts vracejí HTTP 200.
- Postup: autoři (sonnet, 1 agent na 2 závody) → samostatný audit každého závodu → moje kontrola hlášených změn, statusů RET/DSQ a titulků.

## Hlavní opravy po auditech (výběr)
- Fakta z jiných ročníků pryč: „Wittmann vyhrál pole i loni“, „Rockenfeller, mistr 2013“, Ekströmovo „od Valencie 2011“ a „první výhra Abt od 2011“ (Zandvoort), Greenovy čtyři výhry na Norisringu a série Mercedesu, „Martin nikdy nejezdil formule“, „di Resta zpět v DTM po F1“, Petrov „první Rus“, Ekströmovy dřívější výhry v Hockenheimu, tituly BMW z minulých let.
- Jednozdrojová tvrzení: Glockova „nejlepší kvalifikace kariéry“, Müller „poprvé v Q3“, Greenův „rekord kola“, Wittmann „ve druhé sezóně“, Wickensův drive-through (Lausitzring), Molina „poslán na konec gridu“ (jen Audi; grid g23 zůstal), „deliberately“ u Spenglerova brzdění (Hockenheim-finále – speed-magazin převzal speedweek).
- Chyby: Mortara (Zandvoort) „vyloučen z kvalifikace“ → posunut na konec gridu; pneumatiky Tomczyka/Spenglera na Nürburgringu (prime→option, ne obráceně); špatně přiřazený citát (Reinhold vs. Marquardt); „team-mate“ u jiných týmů (Phoenix/Abt/Rosberg); klasifikovaní Mortara a da Costa (Hockenheim-květen) už „neodstupují“.

## Datové vlajky (stručně, řeší se lokálně)
- **Hockenheim-květen:** Mortara klasifikován 22. (31 kol), zdroje odstoupení s defektem; Molina bez času v Q (autosport 6. místo 1:32.787), g23.
- **Oschersleben:** Molinovo pole odebráno (zadní křídlo) – archiv g1 Wittmann, Molina g23 (sedí); Green klasifikován 18., Audi „retired“.
- **Hungaroring:** Glock (19.), Farfus (21., 31 kol), Vietoris (20., 36 kol) klasifikováni, zdroje odstoupení; Scheider RET 10L (zdroj 11).
- **Norisring:** Tambay na trati 5., archiv 9. (bez vysvětlení ve zdrojích – asi trest); Vietoris (21.) a Molina (22.) klasifikováni, zdroje odstoupení; Ekström Q7 → g12.
- **Moskva:** Rockenfeller/Tambay RET 27L, TCT restart ve 29. kole; zdroje 48 kol plánováno, archiv 46.
- **Red Bull Ring:** Wickens DSQ 34L (černá vlajka), zdroje 33 kol; da Costa RET 10L (zdroje 11–12).
- **Nürburgring:** pořadí 14.–17. archiv Green/Paffett/Glock/Hand vs. zdroje jinak (asi dodatečný trest); Q8/Q9 časy di Resta/Vietoris v obráceném pořadí; Wehrlein Q15 → g18, Glock Q16 → g15.
- **Lausitzring:** Green (17.) a Tambay (18.) klasifikováni, zdroje odstoupení; grid Farfus Q15 → g20, Tomczyk Q21 → g23, Hand Q23 → g22 bez vysvětlení.
- **Zandvoort:** Paffett (19.) a Molina (18.) klasifikováni, zdroje odstoupení; Q8 Tomczyk 1:31.904 mimo pořadí; Glock g13 (BMW „z konce pole“).
- **Hockenheim-finále:** Juncadella klasifikován 21. (36 kol), TCT odstoupení; tiskové zprávy mají pořadí před Wickensovým 30s trestem.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty z jedné skupiny: drive-through da Costy a Martina, časový trest Tambaye (Hockenheim-květen), Glockův drive-through (Norisring), Mortarova černobílá vlajka a 2s trest (Hungaroring), Tambayův drive-through za předčasný start (finále), varování za DRS/opuštění trati, Wickensův drive-through (Lausitzring), Tambayův trest (Lausitzring).
- Příčiny odstoupení bez dvou zdrojů: Scheider (Hungaroring), da Costa a Wehrlein (Red Bull Ring), Martin (finále), Juncadella (Oschersleben).
- Stájová režie z jedné skupiny: „BMW offered no resistance“ (Moskva, Red Bull Ring), Spengler pouští Wittmanna (Lausitzring).
- Rekordy s 1 zdrojem: 60./61. výhra BMW, 66. výhra Audi, „první výhra RMG“, „nejmladší (německý) mistr“, Tomczykovo „první pódium od 2012“, Spenglerův počet pole, body značek a týmů z jednoho zdroje.

## Preview (`preview.html`)
- Nejsilnější: **Hockenheim-finále** (7 730) – Ekström vede Audi 1-2-3, Spenglerův trest za brzdění před Juncadellou.
- Nejslabší: **Red Bull Ring** (6 340) – Wittmann vyhrává, Wickens diskvalifikován černou vlajkou.
- (U ročníku s jedním závodem na víkend vybírá preview.js jen dvě kategorie.)
