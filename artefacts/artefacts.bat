@echo off

:UserPrompt
set "userInput="
set /P "userInput=Enter the name for the folder: "
if not defined userInput goto UserPrompt
set "userInput=%userInput:"=%" ; Remove any surrounding quotes
if not defined userInput goto UserPrompt

set "desktopPath=C:\Users\%username%\Desktop"


if exist "%desktopPath%\%userInput%" (
 echo Folder "%userInput%" already exists
) else (
 echo Creating folder "%userInput%"...
 mkdir "%desktopPath%\%userInput%" 2>nul
)

copy "C:\Users\BX5\Desktop\scaffold\vite.config.ts" "%desktopPath%\%userInput%"

copy "C:\Users\BX5\Desktop\scaffold\custom.d.ts" "%desktopPath%\%userInput%\src"

copy "C:\Users\BX5\Desktop\scaffold\vite.svg" "%desktopPath%\%userInput%\public"

copy "C:\Users\BX5\Desktop\scaffold\.prettierrc.json" "%desktopPath%\%userInput%"


echo Finished

cmd /k