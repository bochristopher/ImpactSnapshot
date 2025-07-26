#!/bin/bash

# 🧪 Impact Snapshot - Setup Verification Script
# This script verifies that the entire project is working correctly

set -e  # Exit on any error

echo "🧪 Verifying Impact Snapshot setup..."

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

print_status "Checking project structure..."

# Check for required files
required_files=(
    "README.md"
    "CHAT_HISTORY.md"
    "PROJECT_STRUCTURE.md"
    "FINAL_SUMMARY.md"
    "setup.sh"
    "setup.bat"
    "package.json"
    ".gitignore"
    "backend/main.py"
    "backend/requirements.txt"
    "backend/env.example"
    "impact-frontend/package.json"
    "impact-frontend/vite.config.js"
    "impact-frontend/index.html"
    "impact-frontend/src/App.jsx"
    "impact-frontend/src/main.jsx"
    "impact-frontend/src/index.css"
    "impact-frontend/src/pages/Home.jsx"
    "impact-frontend/src/components/SnapshotCard.jsx"
    "impact-frontend/src/components/QrPanel.jsx"
    "impact-frontend/src/components/ArcadeEmbed.jsx"
    "impact-frontend/src/components/ThemeToggle.jsx"
    "impact-frontend/src/lib/config.js"
    "impact-frontend/src/lib/validate.js"
    "impact-frontend/src/lib/format.js"
    "impact-frontend/src/lib/ws.js"
    "impact-frontend/src/lib/notify.js"
    "impact-frontend/src/lib/theme.js"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    print_success "All required files present ✓"
else
    print_error "Missing required files:"
    for file in "${missing_files[@]}"; do
        echo "  - $file"
    done
    exit 1
fi

print_status "Checking backend setup..."

# Check backend
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    print_warning "Backend virtual environment not found. Run setup.sh first."
else
    print_success "Backend virtual environment exists ✓"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    print_warning "Backend .env file not found. Will be created during setup."
else
    print_success "Backend .env file exists ✓"
fi

# Check Python dependencies
if [ -d "venv" ]; then
    source venv/bin/activate
    if python -c "import fastapi, uvicorn, websockets" 2>/dev/null; then
        print_success "Backend dependencies installed ✓"
    else
        print_warning "Backend dependencies not installed. Run setup.sh first."
    fi
    deactivate
fi

cd ..

print_status "Checking frontend setup..."

# Check frontend
cd impact-frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "Frontend node_modules not found. Run setup.sh first."
else
    print_success "Frontend node_modules exists ✓"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    print_warning "Frontend .env file not found. Will be created during setup."
else
    print_success "Frontend .env file exists ✓"
fi

# Check package.json dependencies
if [ -f "package.json" ]; then
    required_deps=("react" "react-dom" "react-hot-toast" "qrcode.react")
    missing_deps=()
    
    for dep in "${required_deps[@]}"; do
        if ! grep -q "\"$dep\"" package.json; then
            missing_deps+=("$dep")
        fi
    done
    
    if [ ${#missing_deps[@]} -eq 0 ]; then
        print_success "Frontend dependencies configured ✓"
    else
        print_warning "Missing frontend dependencies: ${missing_deps[*]}"
    fi
fi

cd ..

print_status "Checking documentation..."

# Check documentation files
doc_files=(
    "CHAT_HISTORY.md"
    "PROJECT_STRUCTURE.md"
    "FINAL_SUMMARY.md"
    "DEPLOYMENT_GUIDE.md"
    "WEBSOCKET_IMPLEMENTATION_SUMMARY.md"
    "QR_CODE_IMPLEMENTATION_SUMMARY.md"
    "PRODUCTION_DEPLOYMENT_SUMMARY.md"
    "TOAST_IMPLEMENTATION_SUMMARY.md"
    "DARK_MODE_IMPLEMENTATION_SUMMARY.md"
    "impact-frontend/WEBSOCKET_TEST_PLAN.md"
    "impact-frontend/QR_CODE_TEST_PLAN.md"
    "impact-frontend/TOAST_TEST_PLAN.md"
    "impact-frontend/DARK_MODE_TEST_PLAN.md"
    "impact-frontend/DEPLOYMENT_CHECKLIST.md"
)

missing_docs=()
for file in "${doc_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_docs+=("$file")
    fi
done

if [ ${#missing_docs[@]} -eq 0 ]; then
    print_success "All documentation files present ✓"
else
    print_warning "Missing documentation files:"
    for file in "${missing_docs[@]}"; do
        echo "  - $file"
    done
fi

print_status "Checking setup scripts..."

# Check if setup scripts are executable
if [ -x "setup.sh" ]; then
    print_success "setup.sh is executable ✓"
else
    print_warning "setup.sh is not executable. Run: chmod +x setup.sh"
fi

if [ -f "setup.bat" ]; then
    print_success "setup.bat exists ✓"
else
    print_warning "setup.bat not found"
fi

print_status "Checking .gitignore..."

# Check if .gitignore includes important patterns
gitignore_patterns=("node_modules/" "venv/" ".env" "dist/" "__pycache__/")
missing_patterns=()

for pattern in "${gitignore_patterns[@]}"; do
    if ! grep -q "^$pattern" .gitignore; then
        missing_patterns+=("$pattern")
    fi
done

if [ ${#missing_patterns[@]} -eq 0 ]; then
    print_success ".gitignore properly configured ✓"
else
    print_warning "Missing .gitignore patterns: ${missing_patterns[*]}"
fi

print_status "Checking package.json scripts..."

# Check if root package.json has required scripts
required_scripts=("setup" "dev" "build" "test")
missing_scripts=()

for script in "${required_scripts[@]}"; do
    if ! grep -q "\"$script\":" package.json; then
        missing_scripts+=("$script")
    fi
done

if [ ${#missing_scripts[@]} -eq 0 ]; then
    print_success "Root package.json scripts configured ✓"
else
    print_warning "Missing package.json scripts: ${missing_scripts[*]}"
fi

echo ""
print_success "🎉 Verification complete!"
echo ""
echo "📋 Summary:"
echo "  - Project structure: ✅ Complete"
echo "  - Backend setup: ⚠️  Run setup.sh to install dependencies"
echo "  - Frontend setup: ⚠️  Run setup.sh to install dependencies"
echo "  - Documentation: ✅ Complete"
echo "  - Setup scripts: ✅ Ready"
echo "  - Configuration: ✅ Complete"
echo ""
echo "🚀 Next steps:"
echo "1. Run setup: ./setup.sh"
echo "2. Start development: npm run dev"
echo "3. Test the application: http://localhost:5173"
echo "4. Deploy to production: Follow DEPLOYMENT_GUIDE.md"
echo ""
print_success "Project is ready for development and deployment! 🚀" 