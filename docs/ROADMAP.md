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

## Guiding principle

Add features only when they do not endanger existing archive stability.

Reference races must remain working after every major change.
