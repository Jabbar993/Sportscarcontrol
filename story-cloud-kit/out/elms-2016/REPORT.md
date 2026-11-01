# REPORT – ELMS 2016 (cloud session)

## Souhrn
- **6/6 závodů má příběh**: 6× overall + 6× třídy LMP3 a LMGTE. LMP2 = top třída, třídní příběh nemá.
- `node tools/check.js elms-2016` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky overall: **7 045–8 845** znaků (Castellet 7 045, Imola 7 349, Silverstone 7 891, Red Bull Ring 8 297, Spa 8 653, Estoril 8 845).
- Overall Aftermath: **1 332–2 034** znaků (v limitu check.js, většinou pod cílem 2 000–2 700).
- Délky tříd: **3 090–4 389** znaků (LMP3 3 529–4 389, LMGTE 3 090–3 858). Třídní Aftermath 451–1 195.
- Zdroje: dumpy DSC + Sportscar365 (DSC staženo curlem, Node fetch vrací 403), k tomu europeanlemansseries.com (oficiální reporty Silverstone, Imola, finále) a dodatečné DSC články z Estorilu (hodinové reporty, kvalifikace, pre-race notes, post-race quotes). Všech 114 URL je buď v dumpech, nebo vrací HTTP 200.

## Slabá místa
- Hodinové reporty existují jen pro Estoril; jinde jsou okna částečně sloučená (Hours 2–3, Hours 1–3 apod.) a průběh je složený ze závěrečných reportů a poločasových zpráv.
- Body šampionátu LMP2 jsou jen tam, kde je zdroje uvádějí (Imola: G-Drive +13 nad SMP; RBR: TDS 8 bodů za G-Drive; Estoril: před závodem 92:78). Jinde jen kvalitativně (kdo vede).
- U řady NC vozů chybí ve zdrojích příčina, v textu je jen „not classified“.

## Moje opravy po agentech (vlastní kontrola proti dossieru)
- Imola overall: titulek „rain-shortened“ → závod jel plné 4 h (opraveno); vyškrtnuto neověřené „first pole for DragonSpeed“, „vyhráli i loni“ a součet bodů 43:30; #44 (v Imole není v archivu) přeformulováno.
- Silverstone overall: vyškrtnuto chybné „LMP3 poprvé v ELMS“ (LMP3 je od 2015) a „G-Drive vyhrál při debutu“; drive-through Giermaziaka (jen DSC) z textu pryč; čipy opraveny.
- Castellet overall: drive-through Coletti (jen DSC) z textu pryč (zůstává ve facts s `one`), neověřené „Lapierre čerstvý vítěz Le Mans“ pryč, sjednoceno jméno Pu Junjin.
- Spa overall: neověřený úvod „závod neměl existovat / kalendář natažen“ a Sebring 4. místo pryč; facts s formulací „one report says“ přepsány/odstraněny.
- Estoril overall: věta o LMP3 šampionovi United v overall Aftermath pryč (jiná třída); trest Panis Barthez za výměnu motoru (jen S365) z textu pryč; neověřené „Gibson pět sezón“ a přesné datum Portimão pryč.
- Třídy: Castellet LMP3 ztráta #3 přepočtena vůči vítězi třídy (3 kola, ne 10); Estoril GTE „#60 with none“ → „not classified“, neověřené „first class title since 2012“ pryč, Ben → Benjamin Barker (dle dossieru); Silverstone GTE „Mike“ → Michael Hedlund; Imola GTE „led every lap“ (neověřeno) → „won from pole“, #60 (v Imole není v archivu) bez čísla; RBR LMP3 „Duqueine first ELMS win“ přeformulováno, #4 (LMP3) z GTE textu bez čísla.

## Datové vlajky (stručně, řeší se lokálně)
- Vozy s **0 koly v archivu**, které podle zdrojů závodily: Silverstone LMP2 #46 a #33 (havarovaly v 1. hodině); Castellet GTE #88; Spa LMP2 #33 (ztratila kolo v 1. kole) a GTE #56; Estoril GTE #60.
- Imola: #99 Aston má `g?`. Čas GTE pole v S365 (1:43.440) nesedí s archivem 1:41.269 (DSC a archiv se shodují).
- Imola LMP3: DSC uvádí na 3. místě #19 Duqueine, archiv #16 Panis Barthez (platí archiv).
- RBR LMP3: #19 Duqueine projel cílem první, po 4s trestu za minimální čas zastávky 2. (archiv sedí s revizí).
- Spa: #47 WRT má v archivu gap „—“ jako vítěz (stejné kolo, náskok chybí); DSC píše, že #47 startoval 7., archiv g8. DSC řadí LMP3 #18 na 12. místo, archiv NC.
- Estoril: S365 má #46 TDS na 30. místě, archiv 28.; S365 píše o ztrátě kola #21, archiv má #21 na 145 kolech jako vítěz. LMP3 #6 posádka v pre-race DSC (Costa/Fuster) se liší od archivu (Woodward/Kaiser/Swift).
- Castellet: #33 Eurasia jen dva jezdci (Pu zraněn v Bronze testu) – archiv sedí.
- Poles (PERF) letos ve všech závodech sedí s gridem g1.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty uvedené jen jedním zdrojem (Silverstone Giermaziak, Castellet Coletti, Spa DragonSpeed 5 s, Estoril Panis Barthez, třídní tresty v Castelletu/Spa/Estorilu) jsou jen ve `facts` s `one` nebo vynechané.
- Příčina DSQ Pegasus v Estorilu (fuel analysis) jen ve facts; překročení jízdní doby Beche na Spa vynecháno úplně.
- Výsledky jiných tříd v overall Aftermath (Estoril LMP3 titul United).

## Preview (`preview.html`)
- Overall nejsilnější: **Estoril** (8 845) – finále, titul G-Drive, elektrika TDS.
- Overall nejslabší: **Castellet** (7 045) – bez hodinových reportů.
- Třída nejsilnější: **Spa LMP3** (4 315) – titul United s předstihem.
- Třída nejslabší: **Red Bull Ring LMGTE** (3 090).
