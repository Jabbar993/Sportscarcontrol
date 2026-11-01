# Vzory: k čemu jsou a kde se od pravidel liší

Vzory jsou skutečné schválené příběhy z appky. Ber z nich **tvar JSON, tón, hustotu faktů a strukturu kapitol**. Kde se liší od `RULES.md`, platí RULES:

- `_raceId` je jen popisek vzoru. Ve výstupu ho **nepiš**.
- `EXAMPLE_overall_elms_spa2020.json`: Aftermath (≈1 700 znaků) je kratší než cíl 2 000–2 700 a zmiňuje výsledek jiné třídy (Richard Mille Racing), což je nově zakázané. Tvůj overall Aftermath je delší, výsledky jiných tříd vynechá a naopak obsahuje boj o 2.–3. místo a šampionát LMP2.
- `EXAMPLE_classes_elms_spa2020.json`: obsahuje jen LMP3 a LMGTE. LMP2 jako top třída třídní příběh nemá (pravidlo majitele z 1. 11. 2026). Třídní Aftermathy (~500–600 znaků) jsou pod cílem 700–1 200.
- `EXAMPLE_dtm_race1.json` / `EXAMPLE_dtm_race2.json` jsou z DTM 2021 (GT3: povinná zastávka, Push-to-pass atd.). **Formát závodu nepřebírej** pro DTM 2012–2019 (Class 1 / DTM vozy), vše ověř ve zdrojích daného roku. Aftermath Race 2 (≈1 400) je pod cílem 2 000–2 700.
