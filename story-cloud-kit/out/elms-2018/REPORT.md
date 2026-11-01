# REPORT – ELMS 2018 (cloud session)

## Souhrn
- **6/6 závodů má příběh**: 6× overall (`<id>_overall.json`) + 6× třídy LMP3 a LMGTE (`<id>_classes.json`). LMP2 = top třída, třídní příběh nemá.
- `node tools/check.js elms-2018` → **0 FAIL, 0 missing**. **Žádné waivers** (`waivers.json` neexistuje).
- Délky overall: **6 926–9 198** znaků (Spa 6 926, Silverstone 6 942, Portimão 7 484, Castellet 7 469, Red Bull Ring 7 881, Monza 9 198).
- Overall Aftermath: **1 370–1 999** znaků (Silverstone 1 370 … Red Bull Ring 1 999). Všechny jsou v limitu check.js (1 100–3 200), ale **pod cílem 2 000–2 700**.
- Délky tříd: **2 560–4 475** znaků (LMP3 3 281–4 382, LMGTE 2 560–4 475). Třídní Aftermath 439–815 znaků.
- Zdroje: WP dumpy DSC + Sportscar365 (DSC přes curl, Node fetch z wpfetch.js dostával 403), plus europeanlemansseries.com, 24h-lemans.com, motorsport.com, autosport.com. Všech 107 URL ve `sources`/`facts` je buď v dumpech, nebo vrací HTTP 200.

## Slabá místa
- **Hodinový průběh:** pro žádný závod nebyly hodinové reporty (DSC ani S365 je pro ELMS 2018 nemají), proto jsou okna sloučená („Hours 2–3“, „Hours 2–4“ apod.). Průběh je rekonstruovaný ze závěrečných reportů.
- **Spa:** závod zastaven červenou vlajkou po ~2 h (oficiální délka 2:01:20, 40 kol), poloviční body. Overall má jen Hour 1, Hour 2 a The finish; LMGTE jen „Hours 1–2“.
- **Aftermathy overall** jsou kratší než cíl, protože body šampionátu po jednotlivých kolech zdroje většinou neuvádějí (Castellet, Monza: jen kvalitativně). Portimão má konečné pořadí LMP2 z motorsport.com + ELMS webu.
- **Třídy Monza LMGTE (2 667), Spa LMGTE (2 726), Portimão LMGTE (2 560)** jsou pod cílem 2 400–3 400 jen těsně nebo na jeho spodku. GTE bylo malé pole (6 vozů) s minimem reportáže.
- Post-race notebook existuje jen pro Silverstone (S365).

## Datové vlajky (archiv vs. zdroje, majitel ověří v archivu)
1. **Monza – #39 Graff a #40 G-Drive mají v archivu 0 kol (NC 0L)**, ale zdroje shodně popisují nehody až po ~16 min (#39, Lesmo 2) a ~45 min (#40, Ascari). Počet kol v archivu je zřejmě chybný.
2. **Monza – sloupec gap LMP2 je nekonzistentní:** #21 (4.) má 48.707, #24 (5.) 34.838, #29 (6.) 2.250, #23 (7.) 13.212. Pořadí sedí se zdroji, mezery ne.
3. **Monza – posádka #26:** archiv Rusinov/Pizzitola/Vergne; DSC (FP2, výsledky) uvádí na jednom místě Imperatori místo Vergneho. Ostatní zdroje mají Vergneho.
4. **Monza – grid:** S365 píše, že #26 startoval druhý; archiv má g3 (g2 = #29 Duqueine). DSC tvrdí #31 těsně před #33; archiv #33 g17, #31 g18.
5. **Red Bull Ring – čas pole:** DSC 1:19.148, archiv a S365 1:19.246 (použit archiv; g1 #28 sedí).
6. **Red Bull Ring – LMP3 číslo Légereta:** DSC jednou #18, archiv #19. Kolo odstoupení #66 JMW: DSC kolo 50, archiv 43 kol.
7. **Spa – čas pole:** S365 2:00.937, archiv a DSC 2:00.735. LMP3 pole: S365 2:21.201, archiv a DSC 2:13.634.
8. **Spa – zastavení:** DSC uvádí červenou vlajku 1 h 52 min před koncem (tj. ~2:08), oficiální délka v archivu 2:01:20. Text proto říká jen „just after the two-hour mark“.
9. **Spa – kolize Vergne:** S365 jmenuje Proton #88, DSC #77; archiv sedí s #77 (31 kol). Použito #77.
10. **Silverstone – LMP3 vítěz:** S365 píše #2 (Wells/Grist/Bell), archiv i DSC/ELMS mají #3 Wells/Grist/Bell, #2 = Falb/Rayhall 7. Platí archiv.
11. **Silverstone – #47 Cetilar:** ELMS web „retired“, archiv klasifikován 35. s 98 koly. Vítězná marže GTE: S365 „0.126 s“, DSC 10.126 s (text: „just over ten seconds“).
12. **Castellet – #86 Gulf** má v archivu `g?` a chybí v kvalifikaci (časy smazány kvůli difuzoru, start zezadu).
13. **Castellet – #8 DKR:** archiv v kvalifikaci Miguel Toril, DSC Alexander Toril.
14. **Portimão – #80 Ebimotors:** archiv třetí jezdec Giraudi, fotky DSC Bret Curtis. DSC: odstoupení v 91. kole, archiv 82 kol. LMP3 pole S365 1:41.715 vs archiv/DSC 1:40.715. Posádka #13: S365 přidává Demarchiho, archiv jen Smiechowski/Hippe.
15. **Poles (PERF)** v ELMS 2018 tentokrát sedí s gridem g1 ve všech šesti závodech (žádný rozpor).

## Vynecháno jako sporné nebo jednozdrojové
- Castellet: drive-through pro Duqueine #29 (jen 24h-lemans), drive-through United LMP3 #2, Gulf/Hedman místo kolize (zatáčka 8/9/10).
- Red Bull Ring: drive-through pro IDEC #28 (Rojas), přesné načasování SC a deště.
- Spa: přesné časy červené vlajky (1 h 52 / 1 h 27), body 0,25 a náskok 32,25 b (jen ve `facts`), start za SC (DSC si odporuje).
- Silverstone: drive-through #23, příčina odstoupení #24 Nato, stop/go RLR #15 a fuel splash Spirit of Race (jen `facts`), prasklý výfuk RLR.
- Portimão: tresty Tereschenka a Rojase, příčiny zastavení #30 a #80, „první Ligier 1-2-3 v historii“.
- Všude: Pro/Am rozlišení GTE (archiv ho nemá), soukromé údaje mimo závod.
- Tresty v Monze (Hedman, Albuquerque) ponechány, protože je uvádí oficiální report ELMS (a Hedmana i Autosport).

## Preview (`preview.html`)
Vybráno automaticky (`tools/preview.js`, skóre = délka + fakta + Aftermath):
- **Overall nejsilnější: Monza** (9 198 zn.) – nejbohatší zdroje (TDS ztráta pole, 4× SC, United zmatek).
- **Overall nejslabší: Silverstone** (6 942 zn., Aftermath 1 370) – chybí hodinové reporty.
- **Třída nejsilnější: Castellet LMGTE** (4 475 zn.) – předjetí Moliny v posledním kole.
- **Třída nejslabší: Portimão LMGTE** (2 560 zn.) – šest vozů, málo detailů z průběhu.

## Technická poznámka
`tools/wpfetch.js` v cloudu dostával od DSC 403 (Node fetch přes proxy), DSC dumpy jsem stáhl stejnou logikou přes curl (skript mimo repo, `tools/` nezměněn). Pro další ročník doporučuji v cloudu spouštět wpfetch s `NODE_USE_ENV_PROXY=1` a DSC případně stejně dotáhnout curlem.
