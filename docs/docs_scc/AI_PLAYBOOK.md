# SCC AI Playbook

This document contains recommended prompts and workflows for AI assistants.

The preferred language for user interaction is Czech.

Project documentation can remain in English for compatibility with AI tools.

## General rules

Always read first:

- `README.md`
- `PROJECT_GUIDE.md`
- `AI_RULES.md`
- `IMPORTER.md`
- `CONTRIBUTING.md`

Then describe the implementation plan.

Only after approval modify the project.

Never modify files outside the requested scope.

Always explain what files were changed.

Never create race-specific patches unless explicitly requested.

## Universal Czech instruction

Use this sentence for larger tasks:

> Pokud si nejsi jistý, nejdříve popiš plán změn. Nezačínej upravovat projekt, dokud není plán schválen.

## Add race prompt

```text
Úkol:
Přidej závod WEC Fuji 2025.

Vstupy:
Použij oficiální PDF z Al Kamelu.

Omezení:
- neměň app.js
- neměň importer
- neměň architekturu projektu
- neměň referenční závody

Po dokončení ověř:
- počet aut
- Order
- Dashboard
- Summary
- PP
- FL
- Winner
- Int
- Winning Margin

Nakonec vytvoř commit:
Add Fuji 2025
```

## Fix importer prompt

```text
Pracuj pouze na importeru.

Neměň data závodů.
Neměň app.js.
Neměň existující ručně ověřené závody.

Nejdříve popiš plán.
Po schválení implementuj změny.

Nakonec napiš:
- které soubory byly změněny
- proč byly změněny
- co je potřeba otestovat
```

## Bug fixing prompt

```text
Najdi příčinu chyby.

Nevytvářej workaround.
Nevytvářej runtime patch.
Nevytvářej speciální podmínku pro jeden závod, pokud existuje systémové řešení.

Nejdříve vysvětli příčinu a návrh opravy.
Počkej na schválení.
```

## Driver database prompt

```text
Doplň databázi jezdců.

Použij důvěryhodné zdroje.
Neměň data závodů.
Neměň app.js.

U každého doplň, pokud je dostupné:
- datum narození
- národnost
- vlajku
- roky aktivní kariéry
```

## Review prompt

```text
Projdi změny v repozitáři.

Najdi možné chyby.
Navrhni zlepšení.
Neprováděj změny.
```

## Refactoring prompt

```text
Navrhni refactoring.

Neimplementuj ho.
Nejdříve popiš:
- problém
- rizika
- návrh
- dotčené soubory

Počkej na schválení.
```

## Importer development prompt

```text
Pracuj pouze na importeru.

Dodržuj IMPORTER.md.
Race Control zůstává ruční.
Importer musí podporovat:
- Race Classification PDF
- Fastest Laps PDF
- 1 až N Qualifying / Hyperpole PDF

Preview má být grafické.
Generated replaceRace code má být jen v Advanced sekci.
```

## Commit naming

Good examples:

- `Add Fuji 2025`
- `Importer v2.3 metadata refresh`
- `Fix multiple qualifying PDF merge`
- `Improve importer graphical preview`

Avoid:

- `Update`
- `Final`
- `Changes`
- `Misc`

## Philosophy

Prefer small, reversible commits.

Prefer architecture over hacks.

Prefer reusable parsers.

Prefer automatic calculations over manual values.

Always preserve compatibility with existing SCC races.
