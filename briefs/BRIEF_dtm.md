# Úkol: napiš příběh závodu <ID> (DTM <ROK>), anglicky, styl webu SCC

KIT = cesta ke složce story-cloud-kit v repu. Sezóna = <SEASON>.
Tento závod je <RACE_ROLE>.

Přečti:
1. KIT/RULES.md: všechna pravidla, závazná.
2. KIT/seasons/<SEASON>/dossier/<ID>.md: archiv (hlavička, kvalifikace, výsledky; jeden jezdec na vůz). **ARCHIV VYHRÁVÁ nad zdroji.**
3. KIT/seasons/<SEASON>/season.json: pořadí závodů sezóny (předchozí a další kolo).
4. Vzor: KIT/examples/EXAMPLE_dtm_race1.json a EXAMPLE_dtm_race2.json (GT3 éra 2021: ber z nich tvar, tón a hustotu faktů, ne formát závodu).
5. Zdroje: KIT/seasons/<SEASON>/wp/<ID>_dsc.txt, <ID>_s365.txt, *_pre.txt (DSC/S365 psaly o DTM před 2021 málo, takže dumpy mohou být prázdné). **Hlavní zdroje si dohledej sám** (RULES.md kap. 7): dtm.com, motorsport.com, autosport.com, speedweek.com, motorsport-total.com, motorsport-magazin.com, touringcartimes.com, Audi MediaCenter, BMW PressClub, Mercedes-AMG, Aston Martin R-Motorsport (2019). Hledej report kvalifikace, průběh po kolech (start, okno zastávek, SC, déšť), závěr, výroky jezdců, tresty, body po závodě, předzávodní příběhy. Jen články o DTM <ROK> tohoto kola.

Struktura (RULES kap. 2):
- Build-up (Race 1 ≈1 500–2 200 zn.; Race 2 stručně ≈500–900 zn.) → Qualifying (vlastní pole každého závodu) → 2–3 kapitoly závodu podle skutečného průběhu → The finish.
- <AFTERMATH_RULE>

<SEASON_NOTES>

VÝSTUP: zapiš KIT/out/<SEASON>/<ID>_overall.json = {"title","dek","chapters":[…],"facts":[…],"sources":[…]} (DTM nemá třídní příběhy).
Pak spusť `node KIT/tools/check.js <SEASON> <ID>` a oprav vše, co hlásí. Nic jiného nepřepisuj; pomocné skripty `KIT/tmp/tmp_<ID>_*.js`.
Odpověz 3 větami: hotovo/nehotovo, co zdroje nepokryly a co jsi vynechal, a rozpory archiv vs. zdroje.
