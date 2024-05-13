@echo off

:UserPrompt
set "userInput="
set /P "userInput=Enter the name for the folder: "
if not defined userInput goto UserPrompt

set "desktopPath=C:\Users\%username%\Desktop"

mkdir "%desktopPath%\%userInput%"

echo 1. Vite React project
echo 2. Vite React Typescript project
echo 3. Next.js project
echo 4. Next.js with Typescript project

:get_number
set /p "number=> "

if not defined number (
  goto get_number
)

if "%number%"=="1" (
  pushd "%desktopPath%\%userInput%"
  call npm.cmd create vite@latest . -- --template react
  pushd "%desktopPath%\%userInput%"
  call npm.cmd install
  cmd /k
) else if "%number%"=="2" (
  pushd "%desktopPath%\%userInput%"
  call npm.cmd create vite@latest . -- --template react-ts
  pushd "%desktopPath%\%userInput%"
  call npm.cmd install
  cmd /k
) else (
  set number=
  goto get_number
)

set number=

goto get_number