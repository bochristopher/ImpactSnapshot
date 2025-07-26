# 🚀 Impact Snapshot - Real-time Dashboard

A real-time dashboard for detecting error spikes, calculating lost revenue, and offering one-click rollback functionality.

## 📋 Project Overview

**Impact Snapshot** is a full-stack application that provides:
- Real-time error spike detection
- Revenue impact calculation
- One-click rollback functionality
- Mobile QR code access
- Dark mode support
- Toast notifications
- WebSocket live updates

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v4
- **Real-time**: WebSocket with auto-reconnect
- **Notifications**: react-hot-toast
- **QR Code**: qrcode.react
- **Theme**: Dark mode with system preference detection

### Backend (FastAPI)
- **Framework**: FastAPI with uvicorn
- **Real-time**: WebSocket support
- **Mock Data**: Simulated error states and revenue calculations
- **CORS**: Configured for frontend communication

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Git**

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Impact
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup
```bash
# Open new terminal and navigate to frontend
cd impact-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📁 Project Structure

```
Impact/
├── README.md                           # This file
├── CHAT_HISTORY.md                     # Complete conversation history
├── backend/                            # FastAPI backend
│   ├── main.py                        # Main FastAPI application
│   ├── requirements.txt               # Python dependencies
│   ├── env.example                   # Environment variables template
│   └── venv/                         # Python virtual environment
├── impact-frontend/                   # React frontend
│   ├── src/                          # Source code
│   │   ├── components/               # React components
│   │   ├── lib/                      # Utility functions
│   │   ├── pages/                    # Page components
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── package.json                  # Node.js dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── index.html                    # HTML template
│   └── README.md                     # Frontend-specific docs
├── frontend-simple/                   # Vanilla JS fallback (legacy)
├── DEMO_GUIDE.md                     # Demo instructions
├── SETUP_COMPLETE.md                 # Setup verification
└── *.md                              # Implementation summaries
```

## 🎯 Features

### Real-time Dashboard
- Live error spike detection
- Revenue impact calculation
- Connection status indicators
- Toast notifications for events

### WebSocket Integration
- Real-time updates from backend
- Auto-reconnect with exponential backoff
- Heartbeat mechanism
- Fallback to polling

### Dark Mode
- System preference detection
- Manual override with localStorage
- No flash on page load
- Reduced motion support

### Mobile Access
- QR code generation
- PNG download capability
- Responsive design
- Touch-friendly interface

### Accessibility
- Keyboard navigation
- Screen reader support
- ARIA labels and states
- Reduced motion preferences

## 🧪 Testing

### Backend Testing
```bash
cd backend
source venv/bin/activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Test endpoints:
- `GET /health` - Health check
- `GET /snapshot` - Current system status
- `POST /inject-error` - Simulate error spike
- `POST /rollback` - Trigger rollback
- `WS /ws` - WebSocket connection

### Frontend Testing
```bash
cd impact-frontend
npm run dev
```

Test features:
- WebSocket connection status
- Theme toggle functionality
- QR code generation and download
- Toast notifications
- Dark mode persistence

## 🚀 Deployment

### Backend Deployment (Fly.io)
```bash
cd backend
fly launch
fly deploy
```

### Frontend Deployment (Vercel)
```bash
cd impact-frontend
npm run build
# Deploy to Vercel with environment variables
```

### Environment Variables
```bash
# Backend (.env)
BACKEND_URL=https://your-backend-url.com

# Frontend (Vercel)
VITE_BACKEND=https://your-backend-url.com
VITE_DEMO_URL=https://your-frontend-url.com
VITE_ARCADE_URL=https://your-arcade-url.com
```

## 📚 Documentation

- [DEMO_GUIDE.md](./DEMO_GUIDE.md) - Demo instructions
- [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) - Setup verification
- [CHAT_HISTORY.md](./CHAT_HISTORY.md) - Complete development history

## 🛠️ Development

### Adding New Features
1. Backend: Add endpoints in `backend/main.py`
2. Frontend: Add components in `impact-frontend/src/components/`
3. Test: Use the provided test plans
4. Document: Update relevant README files

### Code Style
- **Python**: PEP 8 with type hints
- **JavaScript**: ESLint with React hooks
- **CSS**: Tailwind utility classes
- **Git**: Conventional commits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
1. Check the documentation files
2. Review the chat history for implementation details
3. Test with the provided test plans
4. Create an issue with detailed information

---

**Built with ❤️ using React, FastAPI, and Tailwind CSS** 