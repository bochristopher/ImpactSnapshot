# Impact Snapshot Frontend

Real-time dashboard for detecting error spikes, calculating lost revenue, and offering one-click rollback.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Build & Deploy

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add -A
   git commit -m "feat: production config, env, and Arcade embed"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com) → Add New Project
   - Select your GitHub repository
   - Framework preset: **Vite** (auto-detected)
   - Deploy

3. **Add Environment Variables**
   In Vercel Project Settings → Environment Variables:
   
   ```
   VITE_BACKEND=https://your-backend-url.com
   VITE_DEMO_URL=https://your-vercel-app.vercel.app
   VITE_ARCADE_URL=https://your-arcade-walkthrough-url
   ```

4. **Redeploy**
   - After setting environment variables, redeploy
   - QR code will point to production URL
   - WebSocket will connect to production backend

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BACKEND` | Backend API URL | Yes (production) |
| `VITE_DEMO_URL` | QR code target URL | No (defaults to current) |
| `VITE_ARCADE_URL` | Arcade walkthrough URL | No |

## 🎯 Features

- ✅ **Real-time updates** via WebSocket
- ✅ **QR code** for mobile access
- ✅ **PNG download** for presentations
- ✅ **Arcade walkthrough** embed
- ✅ **Responsive design** for all devices
- ✅ **Production ready** with environment config

## 📱 Mobile Access

Scan the QR code on the page to open the live demo on your mobile device.

## 🔗 Backend Integration

The frontend connects to a FastAPI backend for real-time data. Ensure your backend is deployed and the `VITE_BACKEND` environment variable is set correctly.

## 🎮 Arcade Walkthrough

Set `VITE_ARCADE_URL` to embed an interactive walkthrough in the dashboard. 