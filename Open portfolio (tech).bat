@echo off
rem Opens the Frames portfolio in the tech look (test) from this folder: starts a small local server and the browser.
cd /d "%~dp0"
start "" "http://localhost:8731/frames-tech.html"
python -m http.server 8731
