# Úkol: napiš TŘÍDNÍ příběhy závodu <ID> (European Le Mans Series <ROK>), anglicky, styl webu SCC

KIT = cesta ke složce story-cloud-kit v repu. Sezóna = <SEASON>. Třídy (klíče PŘESNĚ takto, = `storyClasses` ze season.json): <CLASSES>.
⚠ LMP2 = top třída = overall závod → třídní příběh pro LMP2 NEPIŠ (patří do overall příběhu).

Přečti:
1. KIT/RULES.md: všechna pravidla, závazná.
2. KIT/seasons/<SEASON>/dossier/<ID>.md: archiv po třídách (`== <třída>`; pos = celkové pořadí; vítěz třídy = nejnižší pos). **ARCHIV VYHRÁVÁ.** Pole třídy ověř z gridu (nejnižší g ve třídě) + zdrojů.
3. Vzor: KIT/examples/EXAMPLE_classes_elms_spa2020.json.
4. Zdroje: KIT/seasons/<SEASON>/wp/<ID>_dsc.txt, <ID>_s365.txt, <ID>_dsc_pre.txt, <ID>_s365_pre.txt. Grepuj podle tříd a týmů z dossieru (`grep -n -i "lmp3\|gte\|gtc\|lmpc\|<tým>"`). Další zdroje podle RULES.md kap. 7.

Pro KAŽDOU třídu: Build-up → Qualifying → okna závodu (zrcadlí overall: "Hour N"/"Hours N–M"; kde zdroje třídu nepokrývají, slouč) → The finish → Aftermath (TADY jsou výsledky třídy). Délka třídy ≈2 400–3 400 znaků, min. 1 300. Čipy `cars` jen z vozů TÉ třídy, bez opakování.

<SEASON_NOTES>

VÝSTUP: zapiš KIT/out/<SEASON>/<ID>_classes.json = {"<TŘÍDA>": {"title","dek","chapters","facts","sources"}, …} pro všechny třídy <CLASSES>.
Pak spusť `node KIT/tools/check.js <SEASON> <ID>` a oprav vše, co hlásí. Nic jiného nepřepisuj; pomocné skripty `KIT/tmp/tmp_<ID>_*.js`.
Odpověz 3 větami: hotovo/nehotovo, co zdroje nepokryly a co jsi vynechal, a rozpory archiv vs. zdroje.
