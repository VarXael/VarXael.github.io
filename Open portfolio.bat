@echo off
rem Opens the Frames portfolio from this folder: starts a small local server and the browser.
cd /d "%~dp0"
start "" "http://localhost:8731/frames.html"
python -m http.server 8731
