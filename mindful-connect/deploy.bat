@echo off
REM MindfulConnect Deployment Script for Windows
REM This script helps deploy the application to various platforms

echo.
echo 🚀 MindfulConnect Deployment Script
echo ==================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm version: 
npm --version
echo.

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo ℹ️  Creating .env.local from example...
    copy .env.example .env.local
    echo ⚠️  Please edit .env.local with your API keys (optional for demo mode)
    echo.
)

echo ℹ️  Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ℹ️  Installing 3D dependencies...
call npm install three @react-three/fiber @react-three/drei
if %errorlevel% neq 0 (
    echo ❌ Failed to install 3D dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

echo ℹ️  Building the application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Application built successfully
echo.

echo ℹ️  Exporting static files...
call npm run export
if %errorlevel% neq 0 (
    echo ❌ Export failed
    pause
    exit /b 1
)

echo ✅ Static files exported successfully
echo.

echo ✅ Build completed successfully!
echo.

echo Choose deployment option:
echo 1) GitHub Pages
echo 2) Vercel
echo 3) Netlify
echo 4) Skip deployment
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo ℹ️  Deploying to GitHub Pages...
    
    REM Check if gh-pages is installed
    npm list gh-pages >nul 2>&1
    if %errorlevel% neq 0 (
        echo ℹ️  Installing gh-pages...
        call npm install --save-dev gh-pages
    )
    
    call npm run deploy
    if %errorlevel% neq 0 (
        echo ❌ GitHub Pages deployment failed
        pause
        exit /b 1
    )
    
    echo ✅ Deployed to GitHub Pages successfully
    echo ℹ️  Your site will be available at: https://yourusername.github.io/mindful-connect
    
) else if "%choice%"=="2" (
    echo.
    echo ℹ️  Setting up Vercel deployment...
    
    REM Check if Vercel CLI is installed
    vercel --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ⚠️  Vercel CLI not found. Installing...
        call npm install -g vercel
    )
    
    echo ℹ️  Run 'vercel' to deploy to Vercel
    echo ℹ️  Your site will be available at: https://mindful-connect.vercel.app
    
) else if "%choice%"=="3" (
    echo.
    echo ℹ️  Setting up Netlify deployment...
    
    REM Check if Netlify CLI is installed
    netlify --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ⚠️  Netlify CLI not found. Installing...
        call npm install -g netlify-cli
    )
    
    echo ℹ️  Run 'netlify deploy --prod --dir=out' to deploy to Netlify
    
) else if "%choice%"=="4" (
    echo ℹ️  Skipping deployment. Files are ready in 'out' directory.
    
) else (
    echo ⚠️  Invalid choice. Skipping deployment.
)

echo.
echo ✅ 🎉 Deployment process completed!
echo.
echo ℹ️  Your MindfulConnect platform is ready to help people across India!
echo ℹ️  Demo features work without any API keys.
echo ℹ️  For full functionality, add your API keys to .env.local
echo.

REM Open the output directory
if exist "out" (
    echo ℹ️  Opening output directory...
    start explorer out
)

echo Press any key to exit...
pause >nul
