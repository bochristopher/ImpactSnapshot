# 🚀 Vercel Deployment Checklist

## ✅ **Pre-Deployment Setup**

### **1. Git Repository**
```bash
# Initialize git (if not already done)
git init
git add -A
git commit -m "feat: production config, env, and Arcade embed"

# Push to GitHub
git remote add origin <your-github-repo-url>
git push -u origin main
```

### **2. Backend Deployment**
- ✅ Backend deployed to cloud (Fly.io, Railway, etc.)
- ✅ Backend URL accessible and responding
- ✅ WebSocket endpoint working (`/ws`)
- ✅ CORS configured for production domain

## 🎯 **Vercel Deployment Steps**

### **Step 1: Create Vercel Project**
1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Framework preset: **Vite** (auto-detected)
5. Click "Deploy"

### **Step 2: Configure Environment Variables**
In Vercel Project Settings → Environment Variables:

```
VITE_BACKEND=https://your-backend-url.com
VITE_DEMO_URL=https://your-vercel-app.vercel.app
VITE_ARCADE_URL=https://your-arcade-walkthrough-url
```

### **Step 3: Redeploy**
- After setting environment variables, redeploy
- QR code will point to production URL
- WebSocket will connect to production backend

## 🧪 **Post-Deployment Verification**

### **✅ Environment Banner Check**
- [ ] Load deployed site
- [ ] Banner shows `BACKEND: https://your-backend-url.com`
- [ ] Environment label shows `PRODUCTION` or `PREVIEW`

### **✅ Real-time Features Check**
- [ ] Status pill shows "Live" (green)
- [ ] Card displays real data from backend
- [ ] WebSocket connection established
- [ ] Real-time updates work (no 6s polling delay)

### **✅ QR Code Check**
- [ ] QR code renders sharply
- [ ] QR points to production URL (not localhost)
- [ ] PNG download works and produces high-quality file
- [ ] QR scans successfully on mobile devices

### **✅ Arcade Embed Check**
- [ ] Arcade walkthrough loads in iframe (if URL set)
- [ ] Iframe is responsive and clickable
- [ ] Fallback link opens walkthrough in new tab
- [ ] No console errors related to iframe

### **✅ Mobile Experience Check**
- [ ] Site loads properly on mobile devices
- [ ] QR code scans and opens the same site
- [ ] Touch targets are appropriately sized
- [ ] No horizontal scrolling issues

### **✅ Error Handling Check**
- [ ] Stop backend, verify status pill shows "Reconnecting…"
- [ ] Restart backend, verify status returns to "Live"
- [ ] Error alerts display properly
- [ ] Polling fallback works when WebSocket is down

## 🔧 **Troubleshooting**

### **Environment Variables Not Working**
- [ ] Check variable names start with `VITE_`
- [ ] Redeploy after setting variables
- [ ] Clear browser cache
- [ ] Check Vercel build logs

### **WebSocket Connection Issues**
- [ ] Verify backend CORS allows production domain
- [ ] Check backend WebSocket endpoint is working
- [ ] Ensure `VITE_BACKEND` points to correct URL
- [ ] Test backend health endpoint

### **QR Code Issues**
- [ ] Verify `VITE_DEMO_URL` is set correctly
- [ ] Check QR code points to production URL
- [ ] Test scanning from different distances
- [ ] Ensure high contrast (black on white)

### **Arcade Embed Issues**
- [ ] Verify `VITE_ARCADE_URL` is set
- [ ] Check iframe loads without errors
- [ ] Test fallback link functionality
- [ ] Ensure responsive sizing works

## 🎉 **Success Indicators**

- ✅ **Page loads** on Vercel without errors
- ✅ **Environment banner** shows production backend
- ✅ **Real-time updates** work via WebSocket
- ✅ **QR code** scans to production URL
- ✅ **Arcade embed** loads (if configured)
- ✅ **Mobile experience** is smooth
- ✅ **Error handling** works properly

## 🚀 **Next Steps**

Once deployment is verified:
1. **Share the production URL** with stakeholders
2. **Test the complete demo flow** end-to-end
3. **Add final polish** (error toasts, mobile refinements)
4. **Document the deployment process** for team

The deployment is successful when all checks pass and the demo works seamlessly! 🎉 