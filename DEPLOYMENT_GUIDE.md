# 🚀 Impact Snapshot - Deployment Guide

This guide provides step-by-step instructions for deploying the Impact Snapshot project to production.

## 📋 Prerequisites

### Required Accounts
- **GitHub**: For source code repository
- **Vercel**: For frontend deployment
- **Fly.io**: For backend deployment (or alternative)
- **Arcade**: For walkthrough embedding (optional)

### Required Tools
- **Git**: For version control
- **Node.js**: v18 or higher
- **Python**: v3.8 or higher
- **Docker**: For containerized deployment (optional)

## 🏗️ Deployment Architecture

```
Production Environment
├── Frontend (Vercel)
│   ├── React application
│   ├── Static assets
│   └── CDN distribution
├── Backend (Fly.io)
│   ├── FastAPI application
│   ├── WebSocket support
│   └── API endpoints
└── External Services
    ├── Arcade (optional)
    └── Monitoring (optional)
```

## 🚀 Step-by-Step Deployment

### Step 1: Prepare the Repository

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Impact Snapshot project"
   ```

2. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Name it `impact-snapshot`
   - Make it public or private as needed

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/your-username/impact-snapshot.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy Backend (Fly.io)

1. **Install Fly CLI**
   ```bash
   # macOS
   brew install flyctl
   
   # Windows
   # Download from https://fly.io/docs/hands-on/install-flyctl/
   
   # Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly**
   ```bash
   fly auth login
   ```

3. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

4. **Create Fly App**
   ```bash
   fly launch
   # Follow the prompts:
   # - App name: impact-snapshot-backend
   # - Region: Choose closest to your users
   # - Postgres: No (for this demo)
   # - Deploy: Yes
   ```

5. **Configure Environment Variables**
   ```bash
   fly secrets set BACKEND_URL=https://impact-snapshot-backend.fly.dev
   ```

6. **Deploy**
   ```bash
   fly deploy
   ```

7. **Verify Deployment**
   ```bash
   # Check health endpoint
   curl https://impact-snapshot-backend.fly.dev/health
   
   # Check API docs
   open https://impact-snapshot-backend.fly.dev/docs
   ```

### Step 3: Deploy Frontend (Vercel)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"

2. **Import Repository**
   - Select your `impact-snapshot` repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: impact-frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Set Environment Variables**
   ```
   VITE_BACKEND=https://impact-snapshot-backend.fly.dev
   VITE_DEMO_URL=https://your-vercel-app.vercel.app
   VITE_ARCADE_URL=https://your-arcade-url.com
   VITE_VERCEL_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Note the deployment URL

6. **Update Demo URL**
   - Go to Project Settings → Environment Variables
   - Update `VITE_DEMO_URL` with your actual Vercel URL
   - Redeploy

### Step 4: Configure Arcade (Optional)

1. **Create Arcade Walkthrough**
   - Go to [arcade.software](https://arcade.software)
   - Create a new walkthrough for your application
   - Record the demo flow

2. **Get Share URL**
   - Copy the share URL from Arcade
   - Update `VITE_ARCADE_URL` in Vercel environment variables

3. **Redeploy Frontend**
   - Trigger a new deployment in Vercel

## 🔧 Environment Configuration

### Backend Environment Variables
```bash
# .env file in backend/
BACKEND_URL=https://impact-snapshot-backend.fly.dev
```

### Frontend Environment Variables (Vercel)
```bash
VITE_BACKEND=https://impact-snapshot-backend.fly.dev
VITE_DEMO_URL=https://your-vercel-app.vercel.app
VITE_ARCADE_URL=https://your-arcade-url.com
VITE_VERCEL_ENV=production
```

## 🧪 Post-Deployment Testing

### 1. Frontend Testing
- ✅ **Load the application**: Check if it loads without errors
- ✅ **WebSocket connection**: Verify real-time updates work
- ✅ **Dark mode toggle**: Test theme switching
- ✅ **QR code generation**: Test mobile access
- ✅ **Toast notifications**: Verify user feedback
- ✅ **Responsive design**: Test on mobile devices

### 2. Backend Testing
- ✅ **Health check**: `GET /health`
- ✅ **Snapshot endpoint**: `GET /snapshot`
- ✅ **Error injection**: `POST /inject-error`
- ✅ **Rollback**: `POST /rollback`
- ✅ **WebSocket**: `WS /ws`

### 3. Integration Testing
- ✅ **Frontend-backend communication**: Verify API calls work
- ✅ **WebSocket real-time updates**: Test live data flow
- ✅ **Error handling**: Test network failures
- ✅ **Performance**: Check load times

## 📊 Monitoring & Analytics

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor page views and performance
- Track user interactions

### Fly.io Monitoring
- Use Fly.io dashboard for backend monitoring
- Monitor API response times
- Check error rates

### Custom Monitoring
```bash
# Health check script
curl -f https://impact-snapshot-backend.fly.dev/health || echo "Backend down"
curl -f https://your-vercel-app.vercel.app || echo "Frontend down"
```

## 🔒 Security Considerations

### CORS Configuration
- Backend is configured to allow frontend domain
- Update CORS settings if needed

### Environment Variables
- Never commit `.env` files to Git
- Use secure environment variable management
- Rotate secrets regularly

### HTTPS
- Vercel provides automatic HTTPS
- Fly.io provides automatic HTTPS
- No additional configuration needed

## 🚀 Performance Optimization

### Frontend Optimization
- Vite builds are optimized by default
- Static assets are served via CDN
- Code splitting is automatic

### Backend Optimization
- FastAPI is performant by default
- Consider adding caching for static data
- Monitor database performance if added

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      # Add deployment steps
```

### Automatic Deployments
- Vercel: Automatic deployment on push to main
- Fly.io: Manual deployment or GitHub Actions

## 🆘 Troubleshooting

### Common Issues

1. **Frontend not connecting to backend**
   - Check `VITE_BACKEND` environment variable
   - Verify backend is running
   - Check CORS configuration

2. **WebSocket connection failing**
   - Verify backend WebSocket endpoint
   - Check firewall settings
   - Test with WebSocket client

3. **Build failures**
   - Check Node.js version (v18+)
   - Verify all dependencies installed
   - Check for TypeScript errors

4. **Environment variables not working**
   - Redeploy after setting variables
   - Check variable names (must start with `VITE_`)
   - Verify no typos in URLs

### Debug Commands
```bash
# Check backend status
fly status

# View backend logs
fly logs

# Check frontend build
npm run build

# Test local development
npm run dev
```

## 📚 Additional Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Fly.io Documentation](https://fly.io/docs/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vite Documentation](https://vitejs.dev/)

### Support
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Fly.io Support: [fly.io/docs/support](https://fly.io/docs/support)
- GitHub Issues: Create issues in your repository

## ✅ Deployment Checklist

- [ ] Repository created and pushed to GitHub
- [ ] Backend deployed to Fly.io
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] Arcade walkthrough created (optional)
- [ ] Post-deployment testing completed
- [ ] Monitoring configured
- [ ] Documentation updated
- [ ] Team access granted
- [ ] Backup strategy implemented

---

**Deployment Status: READY** 🚀  
**Production Environment: CONFIGURED** ✅  
**Monitoring: ACTIVE** 📊 