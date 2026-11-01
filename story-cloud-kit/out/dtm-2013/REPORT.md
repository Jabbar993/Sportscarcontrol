# REPORT – DTM 2013 (cloud session)

## Souhrn
- **10/10 závodů má příběh** (jeden závod na víkend, každý příběh má Build-up v plné délce a Aftermath). DTM nemá třídní příběhy.
- `node tools/check.js dtm-2013` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky: **5 878–7 617** znaků (Brands Hatch 5 878, Moskva 6 216, Oschersleben 6 220, Lausitzring 6 265, Nürburgring 6 406, Norisring 6 489, Red Bull Ring 6 714, Hockenheim-finále 7 065, Zandvoort 7 278, Hockenheim-květen 7 617). Aftermath **1 616–2 117** (vše v limitu 1 100–2 900).
- Formát ověřený ve zdrojích 2013: jeden závod na víkend (časový limit, např. 75 min na Nürburgringu), dvě povinné zastávky, pneumatiky option/prime, DRS, kvalifikace Q1–Q4 (16/8/4 vozy). **Bez bodů za kvalifikaci.**
- **Body šampionátu** z archivu (25-18-15-12-10-8-6-4-2-1 podle archivní pozice) po každém závodě; sedí přesně na konečné pořadí (Rockenfeller 142, Farfus 116, Spengler 82, Vietoris 77). Pozor: na Norisringu se po Ekströmově DSQ pozice neposouvaly – archiv nemá pozici 1, Wickens je 2. (18 bodů). Tabulka počítaná s posunutím by dala 144/116/84/80, což nesedí.
- Zdroje: DSC/S365 dumpy prázdné. Hlavní: autosport.com, motorsport.com, touringcartimes.com, speed-magazin.de, speedweek.com, motorline.cc, motorsport-xl.de, mbpassion.de, gtspirit.com, bmwblog.com, bimmertoday.de, autobild.de, racecar.com, auto123.com, autofacil.es, girlracer, germancarscene aj. Všechny URL v sources/facts vracejí HTTP 200.
- Postup: autoři (sonnet, 1 agent na 2 závody) → samostatný audit každého závodu → moje kontrola statusů RET/DSQ, titulků a hlášených změn.

## Hlavní opravy po auditech (výběr)
- Fakta z jiných ročníků pryč: BMW „druhá sezóna po návratu“, Spengler „obhájce titulu“, Scheiderovy „dvě těžké sezóny“, „bývalý jezdec F1“ (Glock), Paffett „mistr 2005“, Mortara „loňský vítěz v Rakousku“, Tomczyk „vyhrál Brands Hatch z pole 2012“, Paffettovy statistiky na Lausitzringu, Aiello 2002 (Norisring), BMW M4 2014, „druhý titul značek v řadě“.
- Nepravdivé: „první titul Rockenfellerovy kariéry“ a „první titul Audi od Spenglera 2012“ (Zandvoort); „Werner, týmový kolega Farfuse u Schnitzeru“ (Farfus jezdí za RBM); „top-ten shoot-out“ (2013 = Q1–Q4); „druhá výhra sezóny“ přisouzená Greenovi (Oschersleben); Mercedes druhý mezi značkami (byl třetí za Audi).
- Jednozdrojová tvrzení: zrušený čas Wickense (Hockenheim), příčina Ekströmova odstoupení, Phoenix „sídlí v Meuspath“, „první pole Wickense v 2013“, „nejvíc výher sezóny“ (Farfus), „domácí závod Mercedesu“, 51. výhra BMW, Abtův výrok o Ekströmovi v Moskvě (mohl naznačovat stájovou režii).
- Stájová režie HWA na Brands Hatch (Wickens držen za Paffettem) ponechána – 2 nezávislé skupiny (motorline + speed-magazin, Reuterův výrok); článek speed-magazinu jsem doplnil do sources.

## Datové vlajky (stručně, řeší se lokálně)
- **Norisring:** archiv bez pozice 1; Ekström DSQ (pos 21, voda v kombinéze před vážením), odvolací soud DMSB (30. 7.) vyloučení potvrdil a nikoho neposunul → závod bez vítěze. Green a Wehrlein klasifikováni (65 kol), Paffett a Mortara 17./18. (81 kol) – zdroje odstoupení. Tomczyk RET 11L (BMW 16 kol). Rockenfeller Q19 → g21, Merhi g20 (Mercedes 21.).
- **Hockenheim-finále:** Wittmann **DSQ** po 37 kolech, zdroje (BMW, motorsport.com) ho mají 21. v cíli a o DSQ nepíšou → ověřit. Zdroje 42 kol, archiv 41.
- **Hockenheim-květen:** kola odstoupení o 1 vyšší ve zdrojích (Wickens, Glock, Ekström); Q vs. grid Werner/Merhi/Wittmann (Q22/20/21 → g20/21/22).
- **Brands Hatch:** Mortara klasifikován 21. (87 kol), zdroje odstoupení; Tomczyk Q1 → bez pole (podváha), grid posunutý; Wickens g13 (speed-magazin 19.).
- **Red Bull Ring:** Hand RET 9L (BMW 11. kolo), Tomczyk RET 29L (zdroje 30. kolo).
- **Lausitzring:** Glock Q14 → g17 (trest 3 místa, sedí); Molina g14 (autosport 16.).
- **Moskva:** Spengler klasifikován 19., bimmertoday 18.; Mortara RET 31L (TCT 33).
- **Nürburgring:** Hand RET 0L (kolize v 1. zatáčce, sedí); závod ukončen časovým limitem po 47 z plánovaných 49 kol.
- **Oschersleben:** Q1 Spengler, ale g6 (trest 5 míst za pneumatiku) a pole g1 Green – archivní řádek „Poles“ uvádí Spenglera; Tomczyk klasifikován 20. (BMW „retired“); Paffett Q7 → g12, Juncadella g22 (posun za pneumatiky, jen Mercedes).
- **Zandvoort:** Werner klasifikován 21. (37 kol), BMW „retired“; Spengler Q16 → g18 (trest 2 místa z Oscherslebenu, sedí); Wickens g21 (autosport poslední).

## Vynecháno jako sporné nebo jednozdrojové
- Tresty z jedné skupiny: Tomczyk/Tambay předčasný start, Albuquerque rychlost v boxech, Green (Hockenheim-květen), Merhi/Tambay/Priaulx (Brands Hatch), Paffettův „třetí trest za tři závody“, Spenglerova pokuta 1 000 € za gesto (Lausitzring), Paffett/Mortara posun o 5 míst (Norisring), Glockův zrušený čas (finále), Wernerovo/Paffettovo varování.
- Příčiny odstoupení bez dvou zdrojů: Merhi (Zandvoort), Scheider a Juncadella (Nürburgring), Ekström (Hockenheim-květen), Farfus (Brands Hatch – jen „technická závada“).
- Stájová režie z jedné skupiny: Mortara pouští Ekströma (Norisring), Ekström pouští Rockenfellera (Moskva).
- Rekordy s 1 zdrojem: 29 let bez vítěze (Norisring), 50. výhra M3, „první pole MTEK“, Scheiderovo „první pódium od 2011“, „první dvojvítězství BMW od návratu“, „první dva Kanaďané na pódiu“, Rockenfellerova „druhá/třetí výhra kariéry“, Rockenfellerův rekord v kvalifikaci (Oschersleben), body týmů z jednoho zdroje.

## Preview (`preview.html`)
- Nejsilnější: **Hockenheim-květen** (7 617) – Farfus vyhrává zahájení, Werner ze 20. místa na druhé, Glockův debut.
- Nejslabší: **Brands Hatch** (5 878) – Rockenfeller vyhrává ze zděděného pole (Tomczyk ztratil pole kvůli podváze), Farfus odstoupil z druhého místa.
