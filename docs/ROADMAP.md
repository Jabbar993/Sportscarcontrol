# SCC Roadmap

## Done

- Core SCC UI
- Dashboard
- Order view
- Summary view
- Winner label
- Int calculation
- Winning Margin calculation
- WEC 2026 reference races
- WEC 2025 archive work
- ACO Importer v2 preview
- GitHub repository structure

## Current focus

- Improve driver database (DOB/nationality auto-fill on import, win/podium/PP/FL split
  overall vs class)
- Keep Race Control manual

## Recently done

- Stabilised ACO Importer: consolidated 6 layered patch files into one js/importer.js,
  verified against a real WEC Fuji 2025 PDF set (36/36 cars, correct classes/laps/drivers,
  correct FL/PP per class)

## Near-term tasks

- Finish and verify WEC 2025
- Add Qatar 2024 as historical test race
- Improve metadata refresh in importer
- Improve graphical importer preview
- Hide generated code under Advanced
- Remove old redundant importer UI

## Medium-term tasks

- WEC 2024 full season
- WEC 2023 full season
- WEC 2012–2022 archive
- ELMS support
- Asian Le Mans Series support
- Michelin Le Mans Cup support

## Future ideas

- IMSA support
- GTWC support
- Driver statistics
- Team statistics
- Constructor statistics
- Circuit database
- Race Control analytics
- Safety Car / FCY statistics
- Automated validation tests

## Series expansion plan (agreed 2026-11-04)

Baseline: 18 197 races, 149 series (brochure, 28 Oct 2026). Order follows source
ecosystems, so each importer adaptation is reused across a whole block. Race counts
are rough estimates for 2004–2026. Archived copies of official series/promoter pages
and official manufacturer/team press releases are acceptable sources; motorsportstats,
driverdb, forix and Wikipedia are orientation only. Lineage merges (e.g. WTCC → TCR World
Tour, Eurocup → FRECA, STCC → TCR Scandinavia) and guest/junior classifications are
decided in the importer when a series is imported. Out of scope: rallycross, karting,
trucks, off-road, ice racing, hillclimbs, drift, NASCAR (except NASCAR Euro Series).
As of 2026-11-04 the Dutch Supercar Challenge (block 10) is already being imported.

| # | Block | Contents | ≈ races |
|---|---|---|---|
| 0 | Gaps in existing series (parallel to block 1) | Italian GT 2004–11, GT4 European Cup 2007–12, Ferrari Challenge Europe/NA 2004–11, Lamborghini ST Europe 2009–11, Porsche GT3 Cup Challenge Middle East 2009–23, Mazda MX-5 Cup 2006–11, TCR Italy/Europe 2015–16, VdeV Endurance 2004–08, optional Bathurst 12 h 2007–10 and Gulf 12 h 2011; audit of all Porsche/Ferrari/Lamborghini national cups (e.g. Porsche Sprint Challenge Australia, Southern Europe, Suisse, Japan; Carrera Cup Poland, Turkey, Korea; South Africa); check 24h Nürburgring Qualifiers | 600–1 100 |
| 1 | TSL Timing (UK) | British F3 2004–21 (in progress, joined with GB3), British F4, Formula Ford UK, Formula Palmer Audi, BTCC, TCR UK, Clio Cup UK, Mini Challenge UK | 2 050 |
| 2 | FIA and official PDFs | Macau GP F3, Masters of F3, WTCC → WTCR → TCR World Tour, ETCC / ETC Cup, FIA ETCR, Jaguar I-PACE eTROPHY, FIA Motorsport Games (F4, GT and Touring Cups) | 730 |
| 3 | Renault (archived official sites) | Formula Renault 3.5 / WSR 2005–15, Formula V8 3.5 2016–17, Eurocup Formula Renault 2.0 2004–20, national Formula Renault 2.0 (NEC 2006–18, Alps/Italia 2004–15, UK 2004–11, France), Clio Cup Europe | 1 200 |
| 4 | Japan | Super Formula / Formula Nippon, Japanese F3 + Super Formula Lights, Japanese F4, Formula Regional Japanese, Formula Challenge Japan 2006–13, TCR Japan, Inter Proto | 1 050 |
| 5 | Americas | Indy NXT / Indy Lights, USF Pro 2000 / Star Mazda, USF2000, USF Juniors, Champ Car Atlantic, US F4, Trans Am, Canadian Touring Car Championship | 1 400 |
| 6 | South America (Brazil first: same ecosystem as Porsche Brasil) | Brazil: Stock Car Pro Series, Stock Car Light, GT Brasil, Endurance Brasil, Mil Milhas, Mercedes-Benz Challenge, Sprint Race, F3 Sudamericana / Brasil, F4 Brazil. Argentina: Súper TC2000 / TC2000, Turismo Carretera (+ TC Pista), Top Race, Turismo Nacional, Formula Renault Argentina, Argentine F4. TCR South America; smaller Chilean/Uruguayan series by driver overlap | 2 600 |
| 7 | Australia and New Zealand | Supercars, Super2/Super3, Toyota 86 / GR86, TCR Australia, Australian F3/F4, Australian Formula Ford, Australian Prototype Series, Bathurst 6 h, Trans Am Australia, NZ Touring Cars | 1 900 |
| 8 | China and Asia | China GT, China Endurance Championship, Audi R8 LMS Cup, Thailand Super Series (incl. Super Car classes), Malaysia Championship Series, Sepang 1000 km, Korea Superrace Championship, CTCC, TCR China/Asia, Asian F3, Asian Formula Renault, Formula Masters China, Formula V6 Asia, MRF Challenge, Indian Racing League, Formula Regional India, Chinese and SEA F4 | 2 000 |
| 9 | Germany and Italy (ADAC, ACI Sport) | German F3 / ATS F3 Cup, ADAC Formel Masters 2008–14, ADAC F4, Formula BMW (ADAC, UK, Europe, USA, Asia/Pacific, World Final 2004–13), Italian F3/F4, Formula Abarth 2010–13, ADAC Procar, Italian touring, DMV GTC, Italian Prototype Championship, Audi Sport TT Cup, VW Scirocco R-Cup, BMW M2 Cup | 2 000 |
| 10 | Benelux, France, Spain | Belcar + 24 h Zolder, Supercar Challenge (in progress), Spanish GT, GT Winter Series, Prototype Winter Series, Speed Euroseries, Fun Cup, TCR Benelux/Spain | 850 |
| 11 | Scandinavia, Central and Eastern Europe | STCC → TCR Scandinavia, Danish Touring Car, Danish and NEZ/SMP F4, ESET V4 Cup, Russian Circuit Racing Series 2013–21 | 900 |
| 12 | NASCAR Euro and European one-makes | Racecar Euro Series 2009–11 / EuroNASCAR 2012–, Maserati Trofeo, Lotus Cup Europe | 600 |
| 13 | Remaining regional TCR | TCR Middle East, Denmark | 250 |
| 14 | Defunct and one-off series | A1 Grand Prix, Superleague Formula, Auto GP / Euroseries 3000, Formula Acceleration 1, Grand Prix Masters, Speedcar Series, International Formula Master | 380 |
| 15 | Remainder | W Series, smaller F3, remaining F4 (Spanish, UAE, French, Winter Series, Euro 4, Mexican/NACAM, Indian, Saudi, CEZ …), South African Endurance, South African Global Touring Cars, BOSS GP, touring one-make cups (incl. Toyota Yaris Cup), Race of Champions | 1 900 |
| 16 | Top level | IndyCar (+ Champ Car 2004–07), F1 | 870 |
| 17 | Historic | Masters Historic, Peter Auto, HSR | ? |

Total without historic series: ≈ 21 000 races (archive more than doubles).

Open decision before F4 (first in block 1): what the public archive shows for minors
(e.g. no date of birth).

## Guiding principle

Add features only when they do not endanger existing archive stability.

Reference races must remain working after every major change.
