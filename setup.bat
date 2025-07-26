@echo off
REM 🚀 Impact Snapshot - Complete Setup Script for Windows
REM This script sets up the entire project for development

echo 🚀 Setting up Impact Snapshot...

REM Check if we're in the right directory
if not exist "README.md" (
    echo [ERROR] Please run this script from the project root directory
    pause
    exit /b 1
)

echo [INFO] Checking prerequisites...

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js v18 or higher.
    echo [INFO] Visit: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [SUCCESS] Node.js %NODE_VERSION% ✓

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [SUCCESS] npm %NPM_VERSION% ✓

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo [SUCCESS] Python %PYTHON_VERSION% ✓

REM Check Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Git is not installed. Some features may not work properly.
) else (
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo [SUCCESS] Git %GIT_VERSION% ✓
)

echo [INFO] Setting up backend...

REM Backend setup
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo [INFO] Creating Python virtual environment...
    python -m venv venv
    echo [SUCCESS] Virtual environment created ✓
)

REM Activate virtual environment
echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Python dependencies
echo [INFO] Installing Python dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt
echo [SUCCESS] Python dependencies installed ✓

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo [INFO] Creating .env file from template...
    copy env.example .env
    echo [SUCCESS] .env file created ✓
)

cd ..

echo [INFO] Setting up frontend...

REM Frontend setup
cd impact-frontend

REM Install Node.js dependencies
echo [INFO] Installing Node.js dependencies...
npm install
echo [SUCCESS] Node.js dependencies installed ✓

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo [INFO] Creating frontend .env file...
    (
        echo # Environment Variables for Impact Snapshot
        echo VITE_BACKEND=http://localhost:8000
        echo VITE_DEMO_URL=http://localhost:5173
        echo VITE_ARCADE_URL=
        echo VITE_VERCEL_ENV=
    ) > .env
    echo [SUCCESS] Frontend .env file created ✓
)

cd ..

echo [SUCCESS] 🎉 Setup complete!
echo.
echo 📋 Next Steps:
echo 1. Start the backend:
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python -m uvicorn main:app --host 0.0.0.0 --port 8000
echo.
echo 2. Start the frontend ^(in a new terminal^):
echo    cd impact-frontend
echo    npm run dev
echo.
echo 3. Access the application:
echo    Frontend: http://localhost:5173
echo    Backend API: http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.
echo 📚 Documentation:
echo    - README.md - Complete project overview
echo    - DEMO_GUIDE.md - Demo instructions
echo    - CHAT_HISTORY.md - Development history
echo.
echo 🧪 Testing:
echo    - Backend: Test endpoints with curl or browser
echo    - Frontend: Use the provided test plans
echo.
echo [SUCCESS] Happy coding! 🚀
pause 