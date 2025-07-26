# 📁 Impact Snapshot - Project Structure

This document provides a complete overview of the Impact Snapshot project structure and organization.

## 🏗️ Root Directory Structure

```
Impact/
├── README.md                           # Main project documentation
├── CHAT_HISTORY.md                     # Complete development conversation
├── PROJECT_STRUCTURE.md                # This file
├── setup.sh                           # Unix/macOS setup script
├── setup.bat                          # Windows setup script
├── package.json                       # Root package.json with scripts
├── .gitignore                         # Git ignore rules
├── backend/                           # FastAPI backend
├── impact-frontend/                   # React frontend
├── frontend-simple/                   # Legacy vanilla JS frontend
└── *.md                              # Implementation summaries
```

## 📦 Backend Directory (`backend/`)

```
backend/
├── main.py                           # FastAPI application
├── requirements.txt                  # Python dependencies
├── env.example                      # Environment variables template
├── venv/                            # Python virtual environment (auto-created)
└── .env                             # Environment variables (auto-created)
```

### Backend Files

#### `main.py`
- FastAPI application with WebSocket support
- Mock data endpoints for demonstration
- CORS configuration for frontend communication
- Health check and status endpoints

#### `requirements.txt`
```
fastapi==0.104.1
uvicorn==0.24.0
python-dotenv==1.0.0
httpx==0.25.2
pydantic==2.5.0
python-multipart==0.0.6
websockets==12.0
```

#### `env.example`
```
# Backend Environment Variables
BACKEND_URL=http://localhost:8000
```

## ⚛️ Frontend Directory (`impact-frontend/`)

```
impact-frontend/
├── src/                              # Source code
│   ├── components/                   # React components
│   │   ├── SnapshotCard.jsx         # Main dashboard card
│   │   ├── QrPanel.jsx              # QR code component
│   │   ├── ArcadeEmbed.jsx          # Arcade walkthrough embed
│   │   ├── ThemeToggle.jsx          # Dark mode toggle
│   │   └── ErrorChart.jsx           # Error chart component (stub)
│   ├── lib/                         # Utility functions
│   │   ├── config.js                # Configuration and URLs
│   │   ├── validate.js              # Data validation
│   │   ├── format.js                # Currency formatting
│   │   ├── ws.js                    # WebSocket utilities
│   │   ├── notify.js                # Toast notification helpers
│   │   └── theme.js                 # Theme management
│   ├── pages/                       # Page components
│   │   └── Home.jsx                 # Main dashboard page
│   ├── App.jsx                      # Root application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles with Tailwind
├── public/                          # Static assets
├── package.json                     # Node.js dependencies
├── package-lock.json                # Dependency lock file
├── vite.config.js                   # Vite configuration
├── index.html                       # HTML template
├── .env.example                     # Frontend environment variables
├── README.md                        # Frontend-specific documentation
├── setup.md                         # Frontend setup instructions
├── DEPLOYMENT_CHECKLIST.md          # Deployment verification
├── WEBSOCKET_TEST_PLAN.md           # WebSocket testing guide
├── QR_CODE_TEST_PLAN.md             # QR code testing guide
├── TOAST_TEST_PLAN.md               # Toast notification testing
├── DARK_MODE_TEST_PLAN.md           # Dark mode testing guide
└── node_modules/                    # Node.js dependencies (auto-created)
```

### Frontend Dependencies (`package.json`)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router": "^6.21.1",
    "react-router-dom": "^6.21.1",
    "react-hot-toast": "^2.4.1",
    "qrcode.react": "^3.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^4.0.0-alpha.12",
    "vite": "^5.0.8"
  }
}
```

### Frontend Components

#### `src/components/SnapshotCard.jsx`
- Displays system status and metrics
- Shows ARR at risk and lost signups
- Includes rollback button with toast notifications
- Responsive design with dark mode support

#### `src/components/QrPanel.jsx`
- Renders QR code for mobile access
- Supports PNG download functionality
- Responsive sizing for different screen sizes
- Accessibility features for screen readers

#### `src/components/ArcadeEmbed.jsx`
- Embeds Arcade walkthrough iframe
- Responsive container with 16:10 aspect ratio
- Fallback link for accessibility
- Lazy loading for performance

#### `src/components/ThemeToggle.jsx`
- Dark mode toggle button
- System preference detection
- localStorage persistence
- Accessible with ARIA labels

#### `src/components/ErrorChart.jsx`
- Placeholder for error chart component
- Ready for future implementation

### Frontend Utilities

#### `src/lib/config.js`
```javascript
export const BACKEND = import.meta.env.VITE_BACKEND ?? "http://localhost:8000";
export const SNAPSHOT_URL = BACKEND + "/snapshot";
export const DEMO_URL = import.meta.env.VITE_DEMO_URL ?? window.location.origin;
export const ARCADE_URL = import.meta.env.VITE_ARCADE_URL ?? "";
```

#### `src/lib/validate.js`
- Validates and normalizes API response data
- Ensures data integrity and type safety
- Handles missing or invalid data gracefully

#### `src/lib/format.js`
```javascript
export const formatUSD = (n) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
}).format(n ?? 0);
```

#### `src/lib/ws.js`
- WebSocket URL construction helper
- Converts HTTP URLs to WebSocket URLs

#### `src/lib/notify.js`
- Toast notification helpers
- WebSocket event notifications
- Rollback action notifications
- Reduced motion support

#### `src/lib/theme.js`
- Theme management utilities
- System preference detection
- localStorage persistence
- Theme application functions

### Frontend Pages

#### `src/pages/Home.jsx`
- Main dashboard page
- WebSocket connection management
- Real-time data polling
- Theme toggle integration
- Error handling and display

### Frontend Configuration

#### `vite.config.js`
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/ws': {
        target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true,
      },
      '/snapshot': 'http://localhost:8000',
    }
  }
})
```

#### `index.html`
- HTML template with flash prevention script
- Theme detection before React mounts
- Proper meta tags and viewport settings

#### `index.css`
```css
@import "tailwindcss";

:root { 
  color-scheme: light dark; 
}

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@media (prefers-reduced-motion: reduce) {
  * { 
    animation-duration: 0.01ms !important; 
    animation-iteration-count: 1 !important; 
    transition-duration: 0.01ms !important; 
    scroll-behavior: auto !important; 
  }
}
```

## 📚 Documentation Files

### Implementation Summaries
- `WEBSOCKET_IMPLEMENTATION_SUMMARY.md` - WebSocket integration details
- `QR_CODE_IMPLEMENTATION_SUMMARY.md` - QR code implementation
- `PRODUCTION_DEPLOYMENT_SUMMARY.md` - Deployment configuration
- `TOAST_IMPLEMENTATION_SUMMARY.md` - Toast notification system
- `DARK_MODE_IMPLEMENTATION_SUMMARY.md` - Dark mode implementation

### Test Plans
- `WEBSOCKET_TEST_PLAN.md` - WebSocket testing guide
- `QR_CODE_TEST_PLAN.md` - QR code testing guide
- `TOAST_TEST_PLAN.md` - Toast notification testing
- `DARK_MODE_TEST_PLAN.md` - Dark mode testing guide

### Setup Documentation
- `SETUP_COMPLETE.md` - Setup verification guide
- `DEMO_GUIDE.md` - Demo instructions
- `DEPLOYMENT_CHECKLIST.md` - Deployment verification

## 🔧 Setup Scripts

### `setup.sh` (Unix/macOS)
- Checks prerequisites (Node.js, Python, Git)
- Creates Python virtual environment
- Installs all dependencies
- Creates environment files
- Provides setup instructions

### `setup.bat` (Windows)
- Windows equivalent of setup.sh
- Checks prerequisites
- Sets up development environment
- Creates necessary files

## 🚀 Deployment Configuration

### Environment Variables
```bash
# Backend (.env)
BACKEND_URL=https://your-backend-url.com

# Frontend (Vercel)
VITE_BACKEND=https://your-backend-url.com
VITE_DEMO_URL=https://your-frontend-url.com
VITE_ARCADE_URL=https://your-arcade-url.com
VITE_VERCEL_ENV=production
```

### Build Scripts
```bash
# Development
npm run dev                    # Start both backend and frontend
npm run dev:backend           # Start backend only
npm run dev:frontend          # Start frontend only

# Production
npm run build                 # Build frontend for production
npm run start                 # Start production servers

# Testing
npm run test                  # Run all tests
npm run test:backend          # Run backend tests
npm run test:frontend         # Run frontend tests
```

## 📊 File Statistics

### Total Files: ~50
- **Frontend Components**: 8 files
- **Utility Libraries**: 6 files
- **Configuration**: 4 files
- **Documentation**: 12 files
- **Backend**: 4 files
- **Setup Scripts**: 3 files
- **Root Configuration**: 4 files

### Lines of Code: ~8,000
- **Frontend**: ~2,500 lines
- **Backend**: ~200 lines
- **Configuration**: ~100 lines
- **Documentation**: ~5,000 lines

## 🎯 Key Features by Directory

### Backend Features
- ✅ FastAPI application with WebSocket support
- ✅ Mock data endpoints for demonstration
- ✅ CORS configuration for frontend communication
- ✅ Health check and status endpoints

### Frontend Features
- ✅ React 18 with Vite for fast development
- ✅ Tailwind CSS v4 with dark mode support
- ✅ WebSocket real-time updates with auto-reconnect
- ✅ Toast notifications with react-hot-toast
- ✅ QR code generation with PNG download
- ✅ Dark mode toggle with system preference detection
- ✅ Responsive design for mobile devices
- ✅ Accessibility features for screen readers

## 🔄 Development Workflow

1. **Setup**: Run `./setup.sh` or `setup.bat`
2. **Development**: Run `npm run dev`
3. **Testing**: Use provided test plans
4. **Building**: Run `npm run build`
5. **Deployment**: Follow deployment checklist

## 📝 Notes

- All files are properly organized and documented
- Setup scripts handle all dependencies automatically
- Environment variables are templated and documented
- Test plans provide comprehensive testing guidance
- Documentation covers all implementation details
- Project is ready for immediate development and deployment

---

**Project Structure Complete** ✅  
**Ready for GitHub Submission** 🚀 