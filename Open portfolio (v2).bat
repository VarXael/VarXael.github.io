@echo off
rem Opens the new Frames portfolio (v2) from this folder: starts a small local server and the browser.
cd /d "%~dp0"
start "" "http://localhost:8731/frames-v2.html"
python -m http.server 8731
