@echo off

:UserPrompt
set "userInput="
set /P "userInput=Enter the name for the folder on your desktop: "
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
call npm.cmd create vite@latest . -- --template react-ts

if not exist "%desktopPath%\%userInput%\src" (
  mkdir "%desktopPath%\%userInput%\src"
  echo Folder "%userInput%\src" created successfully on your desktop.
  pushd "%desktopPath%\%userInput%\src"
  echo Folder entered
  git clone https://gist.github.com/mapledrive/006620730e7d43ee3a4534dde9ec2415 .
  echo Cloned
) else (
  echo Folder "%userInput%\src" already exists on your desktop.
  rd /s /q "%desktopPath%\%userInput%\src"
  mkdir "%desktopPath%\%userInput%\src"
  echo Folder "%userInput%\src" created successfully on your desktop.
  pushd "%desktopPath%\%userInput%\src"
  echo Folder entered
  git clone https://gist.github.com/mapledrive/006620730e7d43ee3a4534dde9ec2415 .
)


pushd "%desktopPath%\%userInput%"

call npm.cmd install
call npm.cmd install react-router-dom @reduxjs/toolkit react-redux styled-components axios redux-saga


echo Finished

cmd /k