# REPORT – ELMS 2015 (cloud session)

## Souhrn
- **5/5 závodů má příběh**: 5× overall + 5× třídy LMGTE, GTC a LMP3. LMP2 = top třída, třídní příběh nemá.
- `node tools/check.js elms-2015` → **0 FAIL, 0 missing**. **Žádné waivers.**
- Délky overall: **7 684–8 642** znaků (Silverstone 7 684, Estoril 7 840, Imola 7 879, Castellet 8 555, Red Bull Ring 8 642).
- Overall Aftermath: **1 214–1 899** znaků (v limitu check.js, pod cílem 2 000–2 700, protože LMP2 reakce po závodě jsou ve zdrojích řídké).
- Délky tříd: **2 130–4 327** znaků (LMGTE 3 117–4 327, GTC 2 130–3 208, LMP3 2 591–4 026). Třídní Aftermath 348–752.
- Zdroje: dumpy DSC + Sportscar365 (DSC staženo curlem, Node fetch vrací 403), k tomu europeanlemansseries.com (Imola poločas, RBR pole a závod), 24h-lemans.com (oficiální report Castellet) a Autosport (RBR). Všechny URL jsou buď v dumpech, nebo vracejí HTTP 200.

## Slabá místa
- Hodinové reporty jsou jen částečné (hlavně Silverstone a Estoril), jinde jsou okna sloučená (Hours 2–3, Hours 1–3, Hours 3–4).
- GTC je ve zdrojích nejtenčí. Imola GTC má 2 130 znaků, nad minimem, ale pod cílem.
- Overall Aftermath bez citací vítězů u Castelletu a Estorilu (ve zdrojích nejsou).

## Moje opravy po agentech (vlastní kontrola proti dossieru)
- Jména: Nathanael → Nathanaël Berthon (Silverstone, RBR), Sam → Samuel Tordoff (Silverstone LMGTE).
- Imola overall: jednozdrojová rychlost 280 km/h z textu pryč. Imola LMGTE: číslo GTC vozu #63 v textu LMGTE nahrazeno popisem.
- RBR overall: „first podium for both the BR01 and the Russian squad“ → jen „first podium for the BR01“ (podium SMP jako týmu je neověřené).
- Castellet overall: jednozdrojové tresty v tréninku (stop/go Murphy a Ferrari), trest Algarve za kontakt (zdroj ho připisuje k AT Racing, ne Algarve), příčina NC Eurasie (jen spekulace „could have been“) a „first time at this circuit“ u Dunlopu z textu pryč nebo přeformulováno.
- Estoril overall: důvod posunu Greaves na konec gridu (žluté vlajky, jen DSC) z textu pryč, zůstává ve facts s `one`. Stop-and-go #41 ponechán, protože ho uvádějí DSC i S365.
- Ověřeno ve zdrojích (ponecháno): Oreca 05 debut na Silverstone a první výhra v Imole, Krohn „series debut“, BMW Z4 GTE evropský debut, body Jota/Greaves po trestu v Castelletu (18 → 1 bod), Hirsch LMPC titul 2013, BMW Marc VDS poslední závod v Estorilu, první pódium BMW v Castelletu (oficiální report), Paletou „first season of racing“.

## Datové vlajky (stručně, řeší se lokálně)
- **Poles (PERF):** RBR LMGTE uvádí #51, zdroje dávají nejrychlejší čas #55 Griffinovi (1:29.692), který kvůli palivovému prohřešku startoval z g29. Estoril LMP3: S365 dává pole Simpsonovi (#2), DSC i archiv #3 (čas #2 byl smazán, #2 startoval g30). Jinak overall pole sedí s g1.
- Imola: #38 má gap „—“ jako vítěz, ale je 3.; S365 má čas pole „1:34.96“ (překlep, správně 1:34.496); S365 píše o BMW jako „No. 55“ (v archivu #52). Imola LMP3: zdroje řadí #3 na 4. místo, archiv NC se 108 koly.
- Estoril: #41 má gap „—“ (stejné kolo jako vítěz, S365 uvádí 1:15). #29 Pegasus má 0 kol (NC); příčinu (motor) uvádí jen jeden zdroj. LMP3 posádky #2/#3 v DSC preview prohozené oproti archivu.
- Castellet: #68 Aston má `g?`. LMP3 pořadí #5/#15 se ve zdrojích liší od archivu. DSC uvádí za Ladygina Shaytara, archiv má u #21 všechny tři. Jméno „Alexander Talka Jr“ v archivu vs. „Talkanitsa Jr“ ve zdrojích (text drží zdroj).
- Silverstone: DSC tvrdí start obou LNT Ginett zezadu (archiv g12/g15); #34 podle DSC „terminal damage“, archiv 105 kol, klasifikován.
- RBR LMP3: ztráta kol #5 a #2 se ve zdrojích liší od archivu (platí archiv).

## Vynecháno jako sporné nebo jednozdrojové
- Tresty jen z jednoho zdroje: Silverstone stop-go BMW #52 a průjezd Gulfu za SC (jen facts), RBR tresty Greaves a #66/#56/#5, Imola tresty LMP3 #7/#11, Estoril drive-through Graff a tresty Algarve.
- Příčiny odstoupení bez dvou zdrojů (#48, #44, #32 Silverstone; #27, #29 Imola; #63/#51 Castellet; #48 Estoril).
- Počasí na Silverstone (zdroje si odporují).
- Výsledky jiných tříd v overall Aftermath nejsou (zmínka o oznámení Michelin GT3 Le Mans Cup v Estorilu je zpráva o sérii, ne výsledek třídy).

## Preview (`preview.html`)
- Overall nejsilnější: **Red Bull Ring** (8 642) – Jota vs. Thiriet, stop-go a spin v posledním kole.
- Overall nejslabší: **Silverstone** (7 684) – úvodní kolo, souboj Lancaster–Gommendy v závěru.
- Třída nejsilnější: **Castellet LMGTE** (4 327) – Formula Racing vs. AT Racing, první pódium BMW.
- Třída nejslabší: **Imola GTC** (2 130) – AF Corse trojitá výhra, tenké zdroje.
