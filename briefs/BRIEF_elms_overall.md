# Úkol: napiš OVERALL příběh závodu <ID> (European Le Mans Series <ROK>), anglicky, styl webu SCC

KIT = cesta ke složce story-cloud-kit v repu. Sezóna = <SEASON>.

Přečti:
1. KIT/RULES.md: všechna pravidla. Jsou závazná a mají přednost před vzorem.
2. KIT/seasons/<SEASON>/dossier/<ID>.md: archiv (hlavička, kvalifikace, rychlá kola, výsledky po třídách). **ARCHIV VYHRÁVÁ nad zdroji.** Pole ověř z gridu g1 + zdrojů (řádek PERF poles u ELMS lže).
3. KIT/seasons/<SEASON>/season.json: pořadí kol sezóny (předchozí a další závod pro Build-up/Aftermath).
4. Vzor tvaru, tónu a hustoty faktů: KIT/examples/EXAMPLE_overall_elms_spa2020.json.
5. Zdroje: KIT/seasons/<SEASON>/wp/<ID>_dsc.txt, <ID>_s365.txt (víkend) a <ID>_dsc_pre.txt, <ID>_s365_pre.txt (týden před: preview, BoP, posádky → Build-up). Grepuj (`grep -n -i "hour\|pole\|safety\|penalt\|notebook"`). Použij jen články o TOMTO závodě ELMS <ROK> (WEC/Le Mans/jiné série ignoruj).
6. Další zdroje si stáhni podle RULES.md kap. 7 (curl s User-Agent a -m 40; jinak WebSearch/WebFetch). Hledej hodinové reporty, kvalifikační report, post-race notebook, tiskovky týmů.

Struktura (RULES kap. 2): Build-up → Qualifying → "Hour 1"… / sloučená okna → The finish → Aftermath. Celkem ≈6 500–9 000 znaků, min. 5 000.
⚠ LMP2 je top třída a NEMÁ vlastní třídní příběh, takže její souboje (pole, boj o 2.–3. místo, pořadí a body šampionátu LMP2) patří SEM. Výsledky ostatních tříd (LMP3/GTE/GTC/LMPC) do overall Aftermath nepiš.

<SEASON_NOTES>

VÝSTUP: zapiš KIT/out/<SEASON>/<ID>_overall.json = {"title","dek","chapters":[…],"facts":[…],"sources":[…]}.
Pak spusť `node KIT/tools/check.js <SEASON> <ID>` a oprav vše, co hlásí (u „SHORT“ hledej další zdroje, nevatuj).
Nic jiného nepřepisuj. Pomocné skripty pojmenuj `tmp_<ID>_*.js` v KIT/tmp/ (gitignored).
Odpověz 3 větami: hotovo/nehotovo, co zdroje nepokryly a co jsi vynechal, a **rozpory archiv vs. zdroje** (= datové vlajky).
