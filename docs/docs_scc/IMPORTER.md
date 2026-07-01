# ACO Importer

## Purpose

The ACO Importer creates complete SCC race objects from official Al Kamel Systems PDFs.

The goal is to minimise manual work while keeping the generated race fully compatible with the SCC archive.

Race Control remains manual by design.

## Supported championships

The importer is designed for every championship using Al Kamel Systems timing.

Current targets:

- FIA WEC
- European Le Mans Series (ELMS)
- Asian Le Mans Series (AsLMS)
- Michelin Le Mans Cup
- IMSA, where document formats are compatible

The parser should never rely on hardcoded race names.

## Import workflow

The intended workflow is:

1. Metadata
2. Race Classification
3. Fastest Laps, optional
4. Qualifying / Hyperpole, one or more PDFs
5. Preview
6. Import into archive

## Metadata

Metadata is entered manually.

Required:

- series
- season
- round
- race id
- event name
- circuit
- country
- date
- scheduled duration
- official duration
- scheduled laps
- official laps

The metadata object becomes part of the generated race.

Changing metadata must immediately update Preview.

## Race Classification PDF

Exactly one PDF.

Creates:

- entries
- finishing order
- laps
- gap
- status
- class winners

If Fastest Laps PDF is missing, classification may provide fallback fastest laps where available.

## Fastest Laps PDF

Optional.

Preferred source for:

- `performance.fastestLaps`

If unavailable, the importer should fall back to Race Classification data whenever possible.

## Qualifying / Hyperpole

Supports one or more PDFs.

Examples:

### WEC

- Hypercar Hyperpole
- LMGT3 Hyperpole

### ELMS

- LMP2
- LMP3
- LMGT3

### IMSA

- GTP
- LMP2
- GTD PRO
- GTD

All qualifying PDFs must be merged automatically.

The user must never select classes manually.

Class detection should come from the document.

## Race Control

Race Control is intentionally excluded.

Race Control is entered manually.

Do not attempt to parse message logs unless explicitly requested.

## Preview

Preview should resemble SCC itself.

Preferred preview:

- Order cards
- Winner label
- Classes
- Drivers
- Gaps
- Int
- Winning Margin

JSON should be considered an advanced view.

## Validation

Before import, check:

- metadata complete
- classification loaded
- car count
- PP found
- FL found
- classes detected

Warnings should not prevent import.

Errors should.

## Generated data

Importer generates:

```js
replaceRace({
  // race object
})
```

The output must be compatible with existing SCC data structure.

No manual edits should be required afterwards.

## Automatic values

These should not be manually hardcoded.

The application calculates:

- Winner label
- Int
- Winning Margin
- Class Winners

Importer should only provide source data.

## Performance object

Importer fills `performance`, including:

- fastest laps
- pole positions

Race Control is excluded.

## Archive

Importing a race should:

1. validate
2. preview
3. create race object
4. insert into archive

No unrelated races should ever be modified.

## UI philosophy

The importer should feel like a wizard.

Recommended flow:

1. Metadata
2. Classification
3. FL / PP
4. Preview
5. Import

The user should never need to scroll through multiple unrelated import sections.

Old importer UI should be removed once the new workflow replaces it.

## Future extensions

Possible future support:

- Drag and drop PDFs
- Batch import
- Auto-fill metadata from PDF
- Driver database matching
- Constructor matching
- Race Control parser
- CSV support

These should remain optional modules.

The core importer must stay simple and reliable.

## Guiding principle

The importer exists to eliminate repetitive manual work.

Generated races should require zero or minimal manual correction while remaining fully compatible with SCC.
