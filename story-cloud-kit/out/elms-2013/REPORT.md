# REPORT – ELMS 2013 (cloud session)

## Souhrn
- **5/5 závodů má příběh**: 5× overall + třídy (Silverstone LMGTE, GTC; Imola, Red Bull Ring, Castellet LMPC, LMGTE, GTC; Hungaroring LMGTE, LMPC, GTC). LMP2 = top třída, třídní příběh nemá.
- `node tools/check.js elms-2013` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Všechny závody 3h (`Scheduled 03:00:00`). Silverstone zkrácen deštěm na 2:15:22 a 48 kol (75 % distance, plné body).
- Délky overall: **6 788–7 966** znaků (Castellet 6 788, Silverstone 7 061, Imola 7 269, Red Bull Ring 7 941, Hungaroring 7 966). Overall Aftermath 1 185–1 741 (v limitu, pod cílem 2 000–2 700; post-race materiál je u 2013 řídký).
- Délky tříd: **2 357–4 333** znaků (LMPC 2 357–3 049, LMGTE 3 211–4 333, GTC 2 531–3 599). Třídní Aftermath 318–785.
- Zdroje: dumpy DSC (všechny závody) + Sportscar365 (jen RBR, Hungaroring, Castellet; Silverstone a Imola S365 nemá). Doplněno: motorsport.com, autosport.com, 24h-lemans.com, europeanlemansseries.com, DSC race reporty mimo okno dumpu, Kent Sports News, racingsportscars.com, gtspirit.com, johnnymowlem.com, toomuchracing.com, auto123.com. Všechny URL mimo dumpy vracejí HTTP 200.

## Slabá místa
- Hodinový průběh zdroje skoro nepokrývají: většinou Hour 1 + Hours 2–3 (RBR overall má Hour 1/2/3, Hungaroring LMGTE také).
- Hungaroring LMPC (2 357) a RBR GTC (2 531) jsou nejkratší třídy – málo materiálu, ale nad minimem.
- V dossieru mají **všechny** závody grid `g?`; pole a start vycházejí z kvalifikačních časů a zdrojů.

## Moje opravy po agentech (vlastní kontrola proti dossieru a dumpům)
- Silverstone overall: „first start in a Le Mans prototype“ → „LMP2 debut“ (Kent Sports News); „fell to eighth“ → „slipped to seventh on the opening lap“ (Turveyho citace); „GTE limited to Am-style entries“ zjednodušeno; „first retirement“, „Jota first win of the season“, „Race Performance ahead of champions at first attempt“ a neověřené „Jota na WEC ve Spa“ pryč.
- Silverstone GTC: tvrzení „the only GTC car classified“ (titulek, finish, Aftermath) pryč – zdroje ukazují, že dojelo i BMW Ecosse, které archiv nemá (viz vlajky); ponechána jen výhra #62 podle archivu.
- Imola overall: jednozdrojové poškození podlahy Joty kontaktem s Thirietem a kolize s DKR pryč (zůstává spin + alternátor, oba zdroje); Murphy startér na Silverstonu (jen DSC) pryč; „první ze tří výher TDS v Imole (2015, 2016)“ pryč (jiné ročníky). Stop-and-go Greaves ponechán (DSC i Autosport).
- RBR overall: degradace Alpine na konec LMP2 za žluté (jen DSC) z textu pryč, včetně „second from eighth on the grid“; nepravdivé „best weekend/best showing of the season“ u Race Performance pryč (na Silverstonu byli druzí). Stop-go Joty ponechán (DSC + tiskovka TDS na ELMS webu).
- Hungaroring overall: jednozdrojové vyloučení Hartshorna za nesplnění limitu (jen racingsportscars.com, archiv ho v posádce #4 má) pryč; neověřené „první návštěva od 2010“ pryč; příčina odstoupení #34 (crash, jen RSC) → jen „did not return after the opening laps“. Trest IMSA #67 (stop-and-hold) v LMGTE ponechán (DSC i S365).
- Hungaroring GTC: bodové náskoky před závodem (5 b., 1 b.) a „#69 do čela šampionátu“ (jen DSC) z textu pryč.
- Castellet overall: jednozdrojový problém s brzdami Murphy z textu pryč (jen facts); dlouhá neověřená věta o Hirschiho plánech zjednodušena. Ztracené kolo TDS ověřeno (DSC i motorsport.com).
- Castellet LMPC: „C.O. Jones“ → „Cornelius Jones“ (dossier), „Algarve Racing Team“ → „Algarve Pro Racing Team“; 24bodový náskok (jen DSC) z textu pryč. Startér #49 ponechán (DSC i motorsport.com).
- Castellet GTC: „first season in Europe“ → „first season in the series“.

## Datové vlajky (stručně, řeší se lokálně)
- **Grid:** všech 5 závodů má `g?`. Pole overall podle časů a zdrojů: Silverstone #38, Imola #38, RBR #38, Hungaroring #18, Castellet #38.
- **Silverstone GTC/LMPC:** archiv nemá LMPC vozy (#47/#48/#49, podle zdrojů startovaly; DSC: LMPC vyhráli Pons/Ayari) ani GTC #65 (Audi) a #79 (BMW Ecosse). #65 a #79 jsou v kvalifikaci vedené jako [LMP2] a ve výsledcích chybí. Zdroje (DSC, motorsport.com, ELMS) uvádějí vítězem GTC **Ecurie Ecosse #79** (Millroy/Smith/McCaig), archiv #62. PERF pole GTC #62, ale nejrychlejší GTC čas měly #65 a #79.
- **Silverstone:** #43 Morand v archivu NC 0 kol, přitom vedl závod a havaroval až koncem 1. hodiny. DSC píše vítěz GTE „Prospeed“ – chyba DSC, archiv i motorsport.com mají Proton #77.
- **Imola:** Kox #60 NC 97 kol – DSC píše o diskvalifikaci (chybně spočítaný čas Pronka), 24h-lemans.com ho má třetího. #72 nemá v archivu kvalifikační čas. Jméno Mailleux: archiv „Frank“, zdroje „Franck“.
- **RBR:** archiv nemá #36 v kvalifikačním pořadí (DSC: 1:23.737, pak degradace). Fastest laps tříd (LMPC/GTE/GTC) a overall FL Turvey 1:25.152 odpovídají tréninkovým časům, ne závodu. Kola Murphy: archiv 20 za vítězem, DSC 19.
- **Hungaroring:** fastest laps overall i GTE/GTC (Panciatici 1:37.529, Bertolini 1:45.343, Persiani 1:47.684) jsou časy z FP1 – v mokrém závodě nesmyslné. Hartshorne v posádce #4, podle racingsportscars.com závod nejel. Pole LMPC: S365 Hirsch, archiv i DSC Chatin.
- **Castellet:** FL #36 1:50.242 (FP1), GTE FL Bertolini 1:57.854 (FP1; RAM tiskovka dává Griffina). Gap #36 „—“ (Autosport +1:24.350). Posádka #4: Autosport/S365 Hartshorne/Al Mudhaf, archiv Kapadia/Kuppens/Swift. #67 Autosport 14., archiv 17.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty jen z jednoho zdroje: Greaves #3 na konec gridu (Silverstone), track-limits tresty Kox/Jeannette/Verdonck/Chatin a degradace Alpine (RBR), Ecosse pit-lane speeding (Imola), Mallegol pokuta a trest #62 (Hungaroring), #55 stop-and-go (Castellet). Jsou jen ve facts s `one`, nebo vůbec.
- Příčiny odstoupení bez dvou zdrojů: Greaves #3 (Silverstone), Boutsen #4 převodovka (RBR), Race Performance #34 a Kox #60 (Hungaroring).
- Body šampionátu s jediným zdrojem jen ve facts. Výsledky jiných tříd v overall Aftermath nejsou.

## Preview (`preview.html`)
- Overall nejsilnější: **Hungaroring** (7 966) – Alpine dominuje v mokru, TDS a Signatech srovnány na bodech.
- Overall nejslabší: **Castellet** (6 788) – první výhra Murphy, titul pro Signatech Alpine.
- Třída nejsilnější: **Silverstone LMGTE** (4 333) – Proton vyhrává zkrácený závod v dešti.
- Třída nejslabší: **Hungaroring LMPC** (2 357) – Chatin/Hirsch o 14 kol, tenké zdroje.
