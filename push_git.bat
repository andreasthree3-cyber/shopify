@echo off
title Push Shopify Theme Updates to GitHub
echo ====================================================
echo   Preparing to push updates to GitHub...
echo   Target Repo: https://github.com/andreasthree3-cyber/shopify
echo ====================================================
echo.

:: Ensure we are in the correct directory
cd /d "%~dp0"

:: Initialize Git if not already done
if not exist .git (
    echo [INFO] Initializing Git repository...
    git init
)

:: Set remote origin URL (checks if origin already exists)
git remote | findstr /i "origin" >nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Updating existing remote origin to target repository...
    git remote set-url origin https://github.com/andreasthree3-cyber/shopify
) else (
    echo [INFO] Adding remote origin to target repository...
    git remote add origin https://github.com/andreasthree3-cyber/shopify
)

echo.
echo [INFO] Staging all files...
git add -A

echo.
echo [INFO] Committing changes...
git commit -m "Rebuild Shopify theme to match fleckenxperte.lovable.app exactly with animations"

echo.
echo [INFO] Setting branch name to main...
git branch -M main

echo.
echo ====================================================
echo   Pushing to GitHub (origin main)...
echo   (You may be prompted to sign in to GitHub in a popup)
echo ====================================================
echo.
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ====================================================
    echo   [SUCCESS] Theme successfully pushed to GitHub!
    echo ====================================================
) else (
    echo ====================================================
    echo   [ERROR] Push failed. 
    echo   Please check your GitHub credentials or permissions.
    echo ====================================================
)
echo.
pause
