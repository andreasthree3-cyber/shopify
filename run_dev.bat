@echo off
title Shopify Local Theme Dev Server
echo ====================================================
echo   Starting Shopify Theme Development Server...
echo   (Make sure you have Node.js and Shopify CLI)
echo ====================================================
echo.
echo Executing: npx shopify theme dev
echo.
npx shopify theme dev
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Shopify CLI failed to start.
    echo Trying fallback command: shopify theme dev
    echo.
    shopify theme dev
)
echo.
pause
