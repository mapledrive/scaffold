@echo off

:UserPrompt
set "userInput="
set /P "userInput=Enter the name: "
if not defined userInput goto UserPrompt
set "userInput=%userInput:"=%" ; Remove any surrounding quotes
if not defined userInput goto UserPrompt

set "desktopPath=C:\Users\%username%\Desktop"


if exist "%desktopPath%\%userInput%" (
 echo Folder "%userInput%" already exists
) else (
 echo Creating folder "%userInput%"...
 mkdir "%desktopPath%\%userInput%" 2>nul
 if not exist "%userInput%\" (
   echo ERROR: Failed to create directory! Please check permissions.
   exit /b 1
 )
)

pushd "%desktopPath%\%userInput%"

cmd /c npx create-next-app ./ --typescript --eslint --no-tailwind --no-src-dir --app

echo Finished installing Next.js

cmd /k
