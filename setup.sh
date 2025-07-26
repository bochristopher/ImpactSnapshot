#!/bin/bash

# 🚀 Impact Snapshot - Complete Setup Script
# This script sets up the entire project for development

set -e  # Exit on any error

echo "🚀 Setting up Impact Snapshot..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v18 or higher."
    print_status "Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node --version)"
    exit 1
fi

print_success "Node.js $(node --version) ✓"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi

print_success "npm $(npm --version) ✓"

# Check Python
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
print_success "Python $PYTHON_VERSION ✓"

# Check Git
if ! command -v git &> /dev/null; then
    print_warning "Git is not installed. Some features may not work properly."
else
    print_success "Git $(git --version | cut -d' ' -f3) ✓"
fi

print_status "Setting up backend..."

# Backend setup
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
    print_success "Virtual environment created ✓"
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
print_success "Python dependencies installed ✓"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating .env file from template..."
    cp env.example .env
    print_success ".env file created ✓"
fi

cd ..

print_status "Setting up frontend..."

# Frontend setup
cd impact-frontend

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
npm install
print_success "Node.js dependencies installed ✓"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating frontend .env file..."
    cat > .env << EOF
# Environment Variables for Impact Snapshot
VITE_BACKEND=http://localhost:8000
VITE_DEMO_URL=http://localhost:5173
VITE_ARCADE_URL=
VITE_VERCEL_ENV=
EOF
    print_success "Frontend .env file created ✓"
fi

cd ..

print_success "🎉 Setup complete!"

echo ""
echo "📋 Next Steps:"
echo "1. Start the backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python -m uvicorn main:app --host 0.0.0.0 --port 8000"
echo ""
echo "2. Start the frontend (in a new terminal):"
echo "   cd impact-frontend"
echo "   npm run dev"
echo ""
echo "3. Access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Complete project overview"
echo "   - DEMO_GUIDE.md - Demo instructions"
echo "   - CHAT_HISTORY.md - Development history"
echo ""
echo "🧪 Testing:"
echo "   - Backend: Test endpoints with curl or browser"
echo "   - Frontend: Use the provided test plans"
echo ""
print_success "Happy coding! 🚀" 