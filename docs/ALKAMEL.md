# Al Kamel Reference

This document describes Al Kamel Systems documents used by SCC.

The goal is to help the importer identify which PDF is useful and what data should be extracted from it.

## Race Classification

Typical names:

- `03_Classification_Race_Hour 6.pdf`
- `03_Classification_Race.pdf`
- `Classification Race`

Purpose:

- primary source for race result
- creates `entries[]`

Extract:

- position
- class
- car number
- team
- constructor / car model if available
- drivers
- laps
- total time or gap
- status

Required:

- Yes

## Classification by Category

Typical names:

- `05_ClassificationByCategory_Race_Hour 6.pdf`

Purpose:

- validation source
- can help verify class winners and class order

Importer use:

- optional validation
- not required if Race Classification is complete

## Fastest Laps

Typical names:

- `07_FastestLapAfter_Race_Hour 6.pdf`
- `FastestLapAfter Race`

Purpose:

- source for `performance.fastestLaps`

Extract:

- class
- car number
- team
- driver
- lap
- lap time

Required:

- Optional but recommended

## Hyperpole / Qualifying Classification

Typical names:

- `03_Classification_Hyperpole HYPERCAR.pdf`
- `03_Classification_Hyperpole LMGT3.pdf`
- `Classification Qualifying LMP2.pdf`
- `Classification Qualifying LMP3.pdf`
- `Classification Qualifying LMGT3.pdf`

Purpose:

- source for `performance.poles`

Extract:

- class
- car number
- team
- driver
- best time

Important:

- SCC importer must support one or more qualifying PDFs.
- Multiple PDFs must be merged.
- Class should be detected from document name or heading.

Required:

- Optional but recommended

## Starting Grid

Typical names:

- `Starting Grid`

Purpose:

- future validation or grid feature

Current importer use:

- ignored unless explicitly implemented

## Race Control

Typical names:

- `Race Control Messages`
- `Race Director Decisions`

Purpose:

- safety car, FCY, penalties, notes

Current SCC rule:

- manual only
- not parsed by importer

## Practice / Free Practice

Purpose:

- ignored by SCC archive importer

Current importer use:

- ignored

## Warm Up

Purpose:

- ignored by SCC archive importer

Current importer use:

- ignored

## Document detection rules

Importer should detect document type from:

1. file name
2. PDF heading
3. repeated keywords inside the document

Examples:

- `Race Classification` means results source.
- `Fastest Lap` means FL source.
- `Hyperpole` or `Qualifying Classification` means PP source.

## Wrong-document handling

If the user uploads the wrong document into a field, importer should show a warning but not crash.

Example:

- Race Classification uploaded as Pole Position source should warn:
  `This looks like Race Classification, not a qualifying document.`

## Guiding principle

Al Kamel documents are structured enough to automate Results, Fastest Laps and Pole Positions.

Race Control remains manual.
