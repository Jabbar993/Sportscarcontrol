SCC v0.8.6.12 - ACO importer pass

SCC v0.8.6 Database polish

- Better driver detail stat tiles (wins/podiums count + percentage in same tile).
- Added more DOB seed data, including Thomas Preining.
- Better flags fallback, including circuits.
- Circuit cards show uppercase series badges and recent events.

## v0.8.6.1 database foundations

- Database patch version bumped to v0.8.6.1.
- Drivers view now includes `Years active`; active drivers use open-ended format such as `2018–`.
- Driver metrics now show Overall/Class counts and percentages separately for Wins, Podiums, PP and FL.
- Driver and circuit views keep flag rendering through the existing SCC flag system.
- Driver detail now shows Years active in the profile header.


## v0.8.6.11
- Driver detail opens centered and wider.
- Detail metrics grouped into Starts/Finishes, Wins/Podiums, PP/FL.
- Main driver table groups Starts + finishes and splits Overall/Class for wins, podiums, PP and FL.
- Constructor names display in title case with logos in race history.
- Added/extended DOB seed for 50+ drivers, including Luca Stolz, Alex Quinn and Lorenzo Patrese.


## v0.8.6.11
- Driver database detail opens as a wider centered modal.
- Main driver table highlights Overall figures above Class figures; PP/FL use overall counts in the overview.
- Driver detail KPI rows: starts/finishes, wins/podiums, PP/FL.
- Race history shows full car model, constructor logo, and Pxx(total) for overall/class results.
- Added static DOB/nationality enrichment for 70+ endurance/GT drivers, including Stolz, Quinn, Patrese, Dane Cameron and Markus Winkelhock.
- Added initial Save to database helper in the import checklist for session commits.
