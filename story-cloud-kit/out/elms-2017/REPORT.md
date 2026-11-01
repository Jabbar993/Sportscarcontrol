# REPORT – ELMS 2017 (cloud session)

## Souhrn
- **6/6 závodů má příběh**: 6× overall + 6× třídy LMP3 a LMGTE. LMP2 = top třída, třídní příběh nemá.
- `node tools/check.js elms-2017` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky overall: **5 823–8 082** znaků (Silverstone 5 823, Red Bull Ring 5 995, Castellet 6 179, Spa 6 656, Monza 7 913, Portimão 8 082).
- Overall Aftermath: **1 103–1 736** znaků (v limitu check.js, pod cílem 2 000–2 700).
- Délky tříd: **2 808–4 407** znaků (LMP3 3 734–4 407, LMGTE 2 808–3 917). Třídní Aftermath 468–920.
- Zdroje: dumpy DSC + Sportscar365, k tomu europeanlemansseries.com, 24h-lemans.com, motorsport.com, enduranceandgt.co.uk. Všech 108 URL je buď v dumpech, nebo vrací HTTP 200.

## Slabá místa
- Hodinové reporty ani post-race notebooky pro 2017 neexistují, takže okna jsou všude sloučená. Průběh je rekonstruovaný ze závěrečných reportů.
- **Silverstone** (5 823, Aftermath 1 103) a **Red Bull Ring** (5 995) jsou nejkratší overall. Zdroje k průběhu jsou tenké, a navíc jsem ze Silverstonu vyškrtl větu o vítězi LMP3 (výsledek jiné třídy do overall Aftermath nepatří).
- Body šampionátu po kolech jsou jen tam, kde je zdroje uvádějí (Monza, Castellet, Spa, Portimão).
- U řady NC vozů chybí ve zdrojích příčina odstoupení, takže v textu je jen „not classified“.

## Datové vlajky (stručně, řeší se lokálně)
- Vozy s **0 koly v archivu**, které podle zdrojů závodily: RBR LMP3 #3, #6, #16 a LMP2 #28; Castellet LMP3 #3, #9; Spa LMP2 #25 (Roda havaroval v 1. hodině); Silverstone LMP3 #11; Portimão LMP3 #12, #13, #16 a GTE #51.
- Castellet: JMW #66 je v archivu „Ferrari 458 Italia“, ale tým od Red Bull Ringu jezdil s 488 GTE. LMP3 #5 má `g?`.
- Monza: gap #32 v archivu 11.587 vs motorsport.com 1:06.385.
- Silverstone: #40 podle zdrojů startoval 29., archiv g28. LMP3 pořadí #17/#6 se ve zdrojích liší od archivu (platí archiv).
- Red Bull Ring: SMP #27 je ve zdrojích na 5. místě (před revizí), archiv 6. (po trestu). LMP3 vítěz #11 až po 25s trestu pro #2.
- Castellet: United #32 dojel 3., po 30s trestu 5. (archiv sedí s revidovanou klasifikací).
- Poles (PERF) letos ve všech závodech sedí s gridem g1.

## Vynecháno jako sporné nebo jednozdrojové
- Tresty uvedené jen jedním zdrojem (Silverstone #32 příčina, Spa G-Drive drive-through, RBR SMP, LMP3 tresty) jsou jen ve `facts` s `one`.
- Příčiny odstoupení s rozpory, přesné časy neutralizací, „first/record“ tvrzení bez ověření.
- Výsledky jiných tříd v overall Aftermath (Silverstone LMP3, Portimão LMP3 titul United).

## Preview (`preview.html`)
- Overall nejsilnější: **Portimão** (8 082) – finále, titul G-Drive, trest United.
- Overall nejslabší: **Silverstone** (5 823) – nejtenčí zdroje.
- Třída nejsilnější: **Castellet LMP3** (4 398).
- Třída nejslabší: **Red Bull Ring LMGTE** (2 808).
