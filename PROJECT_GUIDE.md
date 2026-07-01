# Sportscar Control – Project Guide

Sportscar Control (SCC) is a local web app for archiving endurance racing results.

## Current scope

Main focus:
- FIA WEC
- ACO-based championships
- future support for ELMS, Asian Le Mans Series, IMSA and GTWC

## Important principle

Do not rebuild the architecture unless explicitly requested.

Most new work should be data-only or importer-only.

## Main files

- `index.html` – main application shell
- `js/app.js` – shared app logic and rendering
- `js/data.js` – race archive data
- `css/` – styling
- `assets/` – images, logos and UI assets
- `database/` – database-related resources

## Race data

Races are added through data objects, usually via `replaceRace(...)`.

A race contains:
- id
- season
- round
- series
- event
- circuit
- country
- date
- scheduledDuration
- officialDuration
- scheduledLaps
- officialLaps
- entries
- performance
- race control data if available

## Entries

Race entries contain:
- position
- class
- car number
- constructor
- model
- team
- gap
- laps
- drivers
- status

The app calculates:
- Winner label
- Int
- Winning margin
- Class winners

These should not be hard-coded manually unless absolutely necessary.

## Reference races

These must remain working after every change:

### Imola 2026
- 35 cars
- correct PP and FL
- correct drivers
- no 007/7 merge
- dashboard works

### Spa 2026
- 35 cars
- correct PP and FL
- correct drivers
- dashboard works

### Qatar 2025
- 36 cars
- correct order
- PP and FL present
- dashboard works

### Imola 2025
- 36 cars
- PP and FL present
- dashboard works

## Importer

Race Control remains manual.

Importer should focus on:
- Race Classification PDF
- Fastest Laps PDF
- Qualifying / Hyperpole PDFs
- Preview
- generated `replaceRace(...)`

## Do not use runtime patch hacks

Avoid:
- monkey-patching `loadRace()`
- monkey-patching `render()`
- `setTimeout()` fixes
- event-specific patches that overwrite races on load

Those caused older bugs with wrong car counts, broken dashboards and reverted race data.

## Preferred workflow

1. Make one logical change.
2. Check reference races.
3. Commit.
4. Continue.

Do not bundle unrelated changes together.