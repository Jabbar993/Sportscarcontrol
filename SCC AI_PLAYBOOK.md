# Contributing to Sportscar Control (SCC)

Thank you for contributing to SCC.

This repository is primarily maintained as a personal project, but all changes should follow a consistent structure to keep the archive stable.

---

# Before making changes

Always read these files first:

- README.md
- PROJECT_GUIDE.md
- AI_RULES.md
- IMPORTER.md
- CHANGELOG.md

These documents describe the architecture and development rules.

---

# Main principle

Prefer data changes over application changes.

Adding a race should normally modify only race data.

Do not change application logic unless explicitly requested.

---

# Reference races

Every significant change should be verified against these races:

- WEC Imola 2026
- WEC Spa 2026
- WEC Qatar 2025
- WEC Imola 2025

These races are considered regression tests.

---

# Race Control

Race Control is entered manually.

Do not implement automatic Race Control parsing unless specifically requested.

---

# Importer

Importer responsibilities:

- Race Classification
- Fastest Laps
- Qualifying / Hyperpole
- Preview
- Generated race object

Race Control is outside importer scope.

---

# Car numbers

Treat car numbers as strings.

Correct:

007

Incorrect:

7

Never convert car numbers to integers.

---

# Drivers

Drivers may appear in different cars during the season.

Never assume a permanent driver-car relationship.

---

# Commits

Keep commits small.

Examples:

Add Fuji 2025

Importer v2.2

Fix metadata update

Avoid commits such as:

update

misc

final

changes

---

# Pull Requests

Describe:

- what changed
- why it changed
- files affected

Include screenshots for UI changes whenever possible.

---

# Testing checklist

Before committing:

□ Dashboard works

□ Order page works

□ Summary works

□ Winner label

□ Int values

□ Winning Margin

□ Pole Positions

□ Fastest Laps

□ Reference races still work

---

# Guiding philosophy

SCC prioritises:

1. Stability
2. Consistency
3. Minimal manual work
4. Readability
5. Long-term maintainability

New features should integrate naturally with the existing architecture instead of introducing temporary patches or special cases.

---

# Changelog policy

The repository must contain only one changelog.

Always update:

CHANGELOG.md

Never create files such as:

CHANGELOG_v0.8.6.md

CHANGELOG_v0.9.md

CHANGELOG_final.md

Use the Keep a Changelog format.

Git commit history stores the detailed changes.

CHANGELOG.md should only describe user-visible milestones.