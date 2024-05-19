@echo off

echo You have a Vite React project on desktop

:UserPrompt
set "userInput="
set /P "userInput=Enter the name for the folder: "
if not defined userInput goto UserPrompt

set "desktopPath=C:\Users\%username%\Desktop"

REM List folders in the current directory. show only folders without files
REM Do not show subfolders and exclude folders starting with "."
dir /b /a:d | find /v "."

:get_number
set /p "number=> "

if not defined number (
  goto get_number
)

if "%number%"=="1" (
  copy "%~dp0\select\main.tsx" "%desktopPath%\%userInput%\src"
) else if "%number%"=="2" (
  copy "%~dp0\memo\main.tsx" "%desktopPath%\%userInput%\src"
) else (
  set number=
  goto get_number
)

set number=

goto get_number

REM TODO из папки artefacts брать файлы и вставлять их в проект по нажатию на 1 2 3 
REM prettiertc.json brand.svg custom.d.ts vite.config.ts
REM eshe rtk query базовый пример доработать

REM это чтото вроде пульта - оттуда можно все делать, создать проект
REM наполнить артефактами вставить в src чтото