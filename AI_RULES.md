## Repository first

This repository is the single source of truth.

Do not work with ZIP archives unless explicitly requested.

Prefer Git commits over ZIP versions.

Never generate versioned documentation files if an existing document can be updated.

# AI Rules for Sportscar Control

These rules are mandatory for AI assistants working on this repository.

## Golden rule

Do not break existing working races.

Reference races:
- Imola 2026
- Spa 2026
- Qatar 2025
- Imola 2025

After every change, verify that these still work.

## Do not edit app logic unless requested

Do not edit:
- `js/app.js`

unless the user explicitly asks for an app-wide logic change.

Adding a race should usually only touch data files.

## Do not use patches

Do not create event-specific runtime patches.

Avoid:
- replacing races when loaded
- overriding `loadRace()`
- overriding `render()`
- using `setTimeout()` to repair data
- adding special cases for one race

## Race Control is manual

Do not implement automatic Race Control parsing unless explicitly requested.

Importer scope:
- Race Classification
- Fastest Laps
- Qualifying / Hyperpole
- Preview
- generated race object

Race Control stays manual.

## Winner / Int / Winning Margin

Do not hard-code these per race.

They are calculated by shared logic:
- Winner label for first car
- Int from previous classified car
- Winning Margin from class winner vs second in class

## Car numbers

Preserve car numbers exactly.

Important:
- `007` and `7` are different cars.
- Do not convert car numbers to numbers.
- Treat car numbers as strings.

## Drivers

Drivers may change cars between races.

Do not globally assume that one driver belongs to only one car.

Duplicate-driver warnings must be race-specific, not season-global.

## Adding races

When adding a new race:
1. Add only the race data.
2. Do not modify unrelated races.
3. Do not modify app logic.
4. Check car count.
5. Check PP.
6. Check FL.
7. Check class winners.
8. Check dashboard.
9. Check reference races.

## Importer rules

Importer must support:
- one Race Classification PDF
- one optional Fastest Laps PDF
- one or more Qualifying / Hyperpole PDFs

Multiple qualifying PDFs must be merged.

Example:
- Hypercar Hyperpole PDF
- LMGT3 Hyperpole PDF

The importer should produce:
- Preview
- generated `replaceRace(...)`
- optional Add to Archive

## UI rules

Importer preview should be graphical where possible.

Generated JSON/code should be hidden under an advanced section, not be the main user-facing preview.

## Commit style

Use small commits.

Good:
- `Add Fuji 2025`
- `Importer v2.2 preview cleanup`
- `Fix multiple qualifying PDF merge`

Bad:
- `misc fixes`
- `update`
- `final`