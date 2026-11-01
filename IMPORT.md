# Předání: cloud → git → lokální appka

## A. Jednorázově: nahrát kit na git
1. Založ na GitHubu repo (např. `scc-stories-cloud`, raději soukromé). Články si cloud stahuje sám do `seasons/*/wp/`; ty se necommitují.
2. Nahraj do něj **obsah** složky `story-cloud-kit/` tak, aby v kořeni repa ležela složka `story-cloud-kit/` (cesty v README a nástrojích s tím počítají):
   ```bash
   cd /c/Users/jabba/Downloads && mkdir scc-stories-cloud && cp -r Sportscarcontrol-main/Sportscarcontrol-main/story-cloud-kit scc-stories-cloud/ && cd scc-stories-cloud && git init -b main && git add . && git commit -m "story cloud kit" && git remote add origin https://github.com/<ty>/scc-stories-cloud.git && git push -u origin main
   ```
   (Git Bash. `<ty>` = tvoje GitHub jméno; repo nejdřív založ prázdné na webu.)
3. Appka ani `js/data.js` do repa **nepatří** (hlídá to `.gitignore`).

## B. Cloudová session (claude.ai/code, repo scc-stories-cloud)
Prompt:
> Přečti `story-cloud-kit/README.md` a `story-cloud-kit/RULES.md` a zpracuj další ročník z `story-cloud-kit/QUEUE.md` přesně podle postupu v README (subagenti sonnet, check.js bez chyb, preview.html, REPORT.md). Výsledek commitni a pushni na svou větev a napiš mi její název.

Prostředí cloudu: pokud má přístup k síti omezený, nastav **Network access: Full** (nebo aspoň povol dailysportscar.com, sportscar365.com, motorsport.com, autosport.com, dtm.com, web.archive.org). Bez přístupu k síti zbývá jen WebSearch/WebFetch (pomalejší a dražší).

## C. Stáhnout a zapsat do appky (lokálně; `tools/import-cloud-stories.js` a `tools/build-story-cloud-kit.js` jsou v appce, ne v kitu)
1. V repu: `git fetch && git merge origin/<větev-z-cloudu>` (nebo PR → merge do main a `git pull`).
2. Zkopíruj `scc-stories-cloud/story-cloud-kit/out/<sezóna>/` do `Sportscarcontrol-main/story-cloud-kit/out/<sezóna>/`:
   ```bash
   cp -r /c/Users/jabba/Downloads/scc-stories-cloud/story-cloud-kit/out/elms-2018 /c/Users/jabba/Downloads/Sportscarcontrol-main/Sportscarcontrol-main/story-cloud-kit/out/
   ```
3. V kořeni appky (`Sportscarcontrol-main/Sportscarcontrol-main`) spusť suchý běh (jen kontrola, nic nezapíše):
   ```bash
   node tools/import-cloud-stories.js elms-2018
   ```
4. Zápis (záloha obou datových souborů `*.bak-before-cloud-…`, bump `?v=rs…`/`?v=rc…` v index.html Node regexem):
   ```bash
   node tools/import-cloud-stories.js elms-2018 --write
   node --check js/data-race-stories.js && node --check js/data-race-story-classes.js
   ```
   - Závod, který už příběh má (třeba ho mezitím napsala lokální session), se přeskočí. Přepsat jde jen s `--force`.
   - Závod s chybou se nikdy nezapíše; ostatní ano. Opravu stačí udělat v JSON a pustit import znovu.
   - `--only <raceId>` = jen jeden závod.
5. Přečti `out/<sezóna>/REPORT.md` (datové vlajky = rozpory archivu), otevři `out/<sezóna>/preview.html` a v appce zkontroluj záložku Story u 1–2 závodů.

## D. Další ročníky do fronty
```bash
node tools/build-story-cloud-kit.js dtm-2011        # přidej sezónu do SEASONS v tom skriptu
node story-cloud-kit/tools/wpfetch.js dtm-2011
```
Pak zkopíruj `story-cloud-kit/seasons/<sezóna>/` do git repa, doplň řádek do QUEUE.md a pushni.
