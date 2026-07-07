@echo off
REM Starts the local SCC server and opens it in your default browser.
REM Requires Node.js to be installed (https://nodejs.org - the free "LTS" installer).
REM Works fully offline except for the PDF import feature, which loads the PDF-reading
REM library from a CDN the first time it's used in a browser session.

setlocal
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found on this PC.
  echo Install it from https://nodejs.org (choose the LTS version), then run this file again.
  pause
  exit /b 1
)

start "" http://localhost:8123/index.html
node ".claude\serve.js"
