# Pravidla race stories SCC (zkopírováno z paměti lokálních sessions, stav 2026-11-01)

Cloud nemá přístup k paměti ani k appce, takže tady je všechno, co platí. Při rozporu má tento soubor přednost před vzorovými příběhy v `examples/`.

## 1. Co je race story
- Příběh jednoho ročníku závodu na webu SCC (Sportscar Control). SCC je archiv výsledků sportovních vozů a **bude veřejný**, takže texty musí být vlastními slovy (žádná kopírka článků) a jen o sportu.
- **Jazyk textu: angličtina** (britský novinářský styl, konkrétní a plný údajů, bez klišé). Popisky pro majitele (REPORT.md) piš česky.
- Overall příběh = `{title, dek, chapters, facts, sources}`. Multi-class série (ELMS) mají navíc **třídní příběhy** se stejnou strukturou pro každou třídu z archivu **kromě top třídy**.
- ⚠⚠ **Top třída (ta, která je celkovým pořadím; v ELMS = LMP2) NEMÁ vlastní třídní příběh** (majitel 2026-11-01). Její souboje (2.–3. místo, pole, šampionát LMP2) patří do OVERALL příběhu, bez duplikátů. Seznam tříd s příběhem = `storyClasses` v `season.json`.
- Čísla, která počítá appka sama (pole, start vítěze, náskok, RET/DSQ, neutralizace, déšť, FL, vítězové tříd), se zobrazují v pruhu nad textem. Text je vypráví **kvalitativně a v souvislostech**, ale klidně uvede čas pole nebo marži, pokud je to součást příběhu a archiv/zdroj ji potvrzuje.

## 2. Struktura kapitol (schválená majitelem, platí pro všechny nové příběhy)
Kapitola = `{"k": "before"|"turn"|"after", "phase": "...", "title": "...", "text": ["odstavec", ...], "cars": ["7","22"]}`

1. `k:"before"`, `phase:"Build-up"`: stav šampionátu před závodem, příběh víkendu, změny v poli a posádkách, BoP, tréninky, předzávodní příběhy (≈1 500–2 200 znaků, 1–3 odstavce).
2. `k:"before"`, `phase:"Qualifying"`: pole, časy, rozdíly, penalizace, nehody, mřížka (≈1 200–2 000 znaků).
3. `k:"turn"`, závod v časových oknech:
   - Vytrvalostní závody (ELMS 4h/6h): `"Hour 1"`, `"Hour 2"`… Kde zdroje hodinu nepokrývají, okna **SLOUČ** (`"Hours 2–3"`). Nic nevymýšlej. Hodinové kapitoly 400–900 znaků.
   - Sprinty (DTM): 2–3 kapitoly podle skutečného průběhu (`"Opening laps"`, `"Pit stops"`, `"Safety car"`, `"Rain"`, `"Closing laps"`…), každá 450–900 znaků. Když zdroje popisují průběh jen hrubě, stačí 2.
4. `k:"turn"`, `phase:"The finish"`: poslední fáze, vítěz, marže, boj o stupně (≈600–1 100 znaků).
5. `k:"after"`, `phase:"Aftermath"`: **jen u posledního závodu víkendu** (DTM Race 1 končí kapitolou „The finish“, Race 2 má Aftermath; víkend s jediným závodem má Aftermath). Štítek vždy přesně `Aftermath` (ne „The finish“ ani „The Pro-Am finish“).
   - Overall Aftermath = post-race: reakce vítězů i poražených, tresty, protesty a DSQ, komentáře k BoP, **dopad na šampionát** (pořadí a body jen z materiálu), rekordy a prvenství, návštěvnost, další kolo (místo, datum). 4 odstavce ≈2 000–2 700 znaků.
   - ⚠ Overall Aftermath **NEOBSAHUJE výsledky ostatních tříd** (vítězové LMP3/GTE/GTC/LMPC patří do třídních příběhů). Výsledky a šampionát **top třídy** (LMP2: 2.–3. místo, body) do overall Aftermath naopak patří.
   - Třídní Aftermath = výsledky třídy (vítěz, 2.–3., významné další; příčina odstoupení jen ze zdroje), reakce, tresty, body třídy, další kolo. 2–4 odstavce ≈700–1 200 znaků.
   - Kromě citací přidávej i obecné post-race zprávy: rekordy, počty výher značky nebo týmu, dopad na šampionát. Hledej nejdřív post-race notebooky, tiskovky a race reporty s citacemi.
- Třídní příběh má stejná okna jako overall (mirror), hodinové kapitoly tříd 250–600 znaků; overall události zmiň jen když mění třídu (SC, červená, déšť).
- Druhý závod víkendu (DTM Race 2): Build-up **stručně** ≈500–900 znaků (co se stalo v sobotu, body po Race 1, co čekat), vlastní Qualifying ≈900–1 500 znaků.

## 3. Délky (kontroluje `tools/check.js`)
| příběh | minimum | cíl | strop |
|---|---|---|---|
| ELMS overall | 5 000 | 6 500–9 000 | 11 000 |
| ELMS třída | 1 300 | 2 400–3 400 | 4 500 |
| DTM Race 1 | 3 800 | 4 500–6 000 | 8 000 |
| DTM Race 2 / jediný závod víkendu | 4 200 | 5 000–6 500 | 8 000 |
| DTM Aftermath | 1 100 | 2 000–2 700 | 2 900 |
- Pod minimum se nechodí vatou, ale **dalším kolem výzkumu** (viz kap. 7). Když zdroje opravdu nejsou (starší ročníky), napiš kratší, zapiš závod do `out/<sezóna>/waivers.json` (`{"raceId": "důvod"}`, promíjí jen délku) a do REPORT.md uveď proč. Nikdy plošně.
- Aftermath kontrola: ELMS overall 1 100–3 200 znaků, třída 300–1 600, DTM 1 100–2 900 (cíle viz kap. 2).
- Velké závody (24h, finále, Spa/Le Mans) smí být u horní hranice, když jde o fakta, ne vatu.

## 4. Titulek, dek, čipy, fakta, zdroje
- `title`: krátký a věcný (ne slovní hříčky na sílu).
- `dek`: **jedna věta ≤ 35 slov**: kdo a jak vyhrál (pole, marže, vůz) + jedna hlavní zápletka. Jen ověřená fakta. Žádné výčty.
- `cars`: max **3** čísla vozů na kapitolu, jako řetězce. Číslo musí být v archivu (dossieru), u třídního příběhu ve **stejné třídě**. Žádné číslo se nesmí opakovat ve dvou kapitolách téhož příběhu. Když čísla dojdou, `cars: []`.
- `facts`: overall 3–5, třída 2–4 položky `{"i": emoji, "t": "krátký titulek", "v": "věta s údajem", "one": {"label": "Zdroj: titulek", "url": "https://…"}}`. URL musí být **skutečně přečtená**.
  - ⚠ Nepoužívej vlajková emoji (🇬🇧 se na Windows kreslí jako „GB“) ani keycap emoji (4️⃣). Vhodné jsou 🏁 ⏱ 🔧 🌧 🏆 📈 🚩 🛞 ⛽ 🔁 🥇 ⚠ 🧭 📸 🎯.
- `sources`: `[{"label": "Sportscar365: <titulek článku>", "url": "…"}]` = jen URL, ze kterých jsi opravdu čerpal. **Nikdy nevymýšlej URL.** Haiku agenti URL vymýšlejí, proto nové zdroje ber jen z hlaviček dumpů (`=== datum | titulek` + link) nebo ze stránek, které jsi opravdu stáhl.
- Wikipedia nepatří do `sources` (jen pro orientaci).

## 5. Pravdivost (nejdůležitější)
- **ARCHIV VYHRÁVÁ nad zdroji**: pořadí, počet kol, odstoupení, čísla vozů, posádky a start. Dossier je oficiální výstup archivu SCC. Když článek tvrdí „#40 startoval vzadu“ a archiv má g3, platí archiv.
  - Výjimka: **pole position v ELMS** = archivní řádek `Poles (PERF)` je u ELMS prokazatelně často špatně (bere 2. místo). Pole ověř z gridu `g1` v dossieru a ze zdrojů. Rozpor zapiš do REPORT.md jako datovou vlajku.
  - `qualifying` u multi-class sérií bývá řazené **po třídách** (Q1 = nejlepší vůz nějaké třídy, ne overall pole).
  - Vítěz třídy = nejnižší `pos` ve třídě (pos je celkové pořadí). `NC` = neklasifikován.
  - Rychlé kolo: u rozporu dej přednost archivu (řádek `Fastest laps`), nebo ho v textu netvrď.
- **Nevymýšlej** čísla, časy, kola, hodiny, příčiny, citáty, počasí. Při rozporu zdrojů a nejistotě fakt **vynech**, případně ho zaokrouhli na rozsah, který platí podle obou zdrojů („roughly five to six seconds“).
- **Jednozdrojová fakta:** pokud fakt podporuje jen jeden zdroj, ale archiv ho potvrzuje (grid, pořadí, RET a kola, vítěz, pole) a na první pohled to není nesmysl, napiš ho normálně. Pokud archiv chybí nebo nesedí, buď ho úplně vynech, nebo ho dej jen do `facts` s pilulkou `one` (nikdy jako tvrzení v textu).
- Fakta z jiného ročníku vyřaď. Snippety vyhledávačů míchají ročníky (typicky „pád 2016“, který byl 2015). Do briefů agentům nepiš domněnky.
- **Jména:** jezdce piš jen **příjmením**, pokud křestní jméno není přímo v archivu (dossier má plná jména posádek) nebo ve zdroji. Nehádej křestní jména ani národnosti. Haiku agenti křestní jména vymýšlejí, proto je kontroluj proti dossieru.
- Citace: jen přesné a krátké (max ~15 slov, max 2 na příběh), jinak nepřímá parafráze („he said the car felt…“).
- Soukromý život jen tehdy, když se týká závodu (zranění, které ukončilo sezónu, rodinná posádka, loučení).

## 6. Zakázané formulace (kontroluje `check.js`)
- **Zdroje v textu NEJMENUJ**: žádné „according to Sportscar365 / DailySportsCar / Autosport / the series / Wikipedia“. Fakta prostě tvrď, zdroje jsou bokem v `sources`.
- Ani skryté odkazy na „někoho, kdo to psal“: **žádné** „reportedly / allegedly / it is said / is said to / accounts differ / in one account…another“.
- O archivu nepiš jako o „záznamu“ a vůbec ho v textu nezmiňuj: žádné „is recorded / is listed / the archive“.
- Validátor tyto výrazy hledá i jako součást slov („Autosport“ ale ne „United Autosports“). Když chytí legitimní jméno týmu, přeformuluj větu a do REPORT.md to poznamenej.

## 7. Výzkum (2.–3. kolo, když je to tenké)
- 1. kolo: WordPress dumpy DSC + Sportscar365 ve `seasons/<sezóna>/wp/` (vytvoří `tools/wpfetch.js`) (víkend + `_pre` = 5 dní před). Hlavičky mají tvar `=== datum | titulek` a pod nimi je URL.
- Když agent vrátí „thin / jen výsledky“, **hned spusť 2. a 3. kolo**, nečekej na majitele:
  - ELMS: hodinové reporty („After 2 hours“, „Halfway“), post-race notebooky (`/wp-json/wp/v2/posts?search=post-race+notebook&after=…&before=…`), tiskové zprávy týmů (United Autosports, G-Drive, IDEC, Graff, Panis…), europeanlemansseries.com news, motorsport.com, endurance-info.com, dailysportscar.com.
  - DTM: dtm.com (news archiv), motorsport.com, autosport.com, speedweek.com, motorsport-total.com, motorsport-magazin.com, touringcartimes.com, tiskové zprávy Audi MediaCenter / BMW PressClub / Mercedes-AMG / Aston Martin R-Motorsport, gt-report.com.
  - Archivované stránky: `https://web.archive.org/web/<rok>*/<url>` (CDX API: `http://web.archive.org/cdx/search/cdx?url=<url>*&output=json&limit=50`).
- Stahování: `curl -sL -m 40 -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" URL` (bez User-Agent vrací DSC/S365/motorsport.com 403). HTML vyčisti regexem a čti jen článek. Každý curl **s `-m 40`**: bez timeoutu agenti zamrzají.
- Když síť cloudu weby blokuje (proxy/403 i s UA), použij nástroje **WebSearch / WebFetch**. Jsou pomalejší, ale fungují. U oficiálních webů renderovaných přes JS (fiawec, dtm.com novější) curl nic nevrátí, takže hledej přes WebSearch.

## 8. Postřehy z dosavadních dávek (pasti)
- ELMS 2013–2016 měly jiné třídy (LMPC, GTC; LMP3 od 2015). Piš jen třídy, které jsou v dossieru, a klíče tříd používej **přesně** podle dossieru.
- DTM před 2021 = Class 1 / „DTM“ vozy (Audi, BMW, Mercedes; 2019 + Aston Martin R-Motorsport), jeden jezdec na vůz, bez tříd. **Nepředpokládej formát GT3** (povinné zastávky, push-to-pass, DRS, gumy, váhy). Všechno ověř ve zdrojích pro daný rok. DTM 2012–2014 = jeden závod na víkend (s povinnou zastávkou a gumami option/prime podle roku: ověř).
- Hlavička dossieru může vypadat nekonzistentně (např. `Scheduled 04:00:00`, ale `Official duration` ~2 h a málo kol). Obvykle jde o zkrácený závod (červená vlajka, déšť, mlha). Zjisti důvod ve zdrojích a použij ho v příběhu; nesoulad, který zdroje nevysvětlí, zapiš jako datovou vlajku.
- WP dumpy obsahují všechny články s ELMS/DTM v okně dat, tedy i šum (kalendář příštího roku, jiné série). Čti titulky a ber jen články o tomto závodě.
- Souběžní agenti si přepisovali skripty se stejným jménem, proto pomocné skripty pojmenuj unikátně (`tmp_<raceId>_*.js`).
- Po zápisu vždy porovnej text s dossierem: vítěz, pole (g1), posádka vítěze, kdo odstoupil, kola. Chytá to věty typu „startoval zezadu“, které archiv vyvrací.
