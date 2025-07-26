# 🧪 QR Code Test Plan

## ✅ **Setup Verification**

### **1. Install Dependencies**
```bash
cd impact-frontend
npm install qrcode.react
npm run dev
```

### **2. Check Package.json**
Verify `qrcode.react` is in dependencies:
```json
{
  "dependencies": {
    "qrcode.react": "^3.1.0"
  }
}
```

## 🎯 **Test Scenarios**

### **Test 1: QR Code Rendering**
1. **Load page**: http://localhost:5173/
2. **Scroll down**: Should see "Scan to open live demo" section
3. **Verify QR code**: Sharp, black-on-white QR code
4. **Check URL text**: Shows current domain (e.g., http://localhost:5173/)
5. **Test responsive size**: 
   - Mobile (< 640px): 128px QR
   - Desktop (≥ 640px): 192px QR

### **Test 2: PNG Download**
1. **Click "Download PNG"** button
2. **Check download**: File named `impact-snapshot-qr.png`
3. **Open file**: Should be high-resolution (512px), not blurry
4. **Verify quality**: Crisp edges, good contrast

### **Test 3: QR Code Scanning**
1. **Use phone camera** or QR scanner app
2. **Scan the QR code** from ~6-8 feet away
3. **Expected result**: Opens the same URL in browser
4. **Test different distances**: Should work from various ranges

### **Test 4: Accessibility**
1. **Check screen reader**: Should announce "QR code for [URL]"
2. **Verify role**: `role="img"` on QR container
3. **Check aria-label**: Contains descriptive text
4. **URL visibility**: Plain text URL visible for screen readers

### **Test 5: Mobile Layout**
1. **Open DevTools** → Device toolbar
2. **Test mobile viewport**: iPhone, Android sizes
3. **Verify QR size**: 128px on small screens
4. **Check responsive design**: No horizontal scrolling
5. **Test touch targets**: Download button should be easy to tap

### **Test 6: Environment Variables**
1. **Check current URL**: Should use `window.location.origin`
2. **Test with env var**: 
   ```bash
   # In terminal
   export VITE_DEMO_URL="https://impact-snapshot.vercel.app"
   npm run dev
   ```
3. **Verify QR updates**: Should show production URL
4. **Reset for local testing**: Remove env var

## 🔍 **Debugging Tips**

### **Check QR Code Quality**
```javascript
// In browser console
// Should show QR code element
console.log('QR Code:', document.querySelector('[role="img"]'))
```

### **Test PNG Download**
```javascript
// In browser console
// Should trigger download
document.querySelector('button').click()
```

### **Verify SVG to PNG Conversion**
- Check Network tab for blob URLs
- Verify canvas element creation
- Confirm 512px resolution output

### **Common Issues**
1. **Blurry PNG**: Check canvas size (should be 512px)
2. **Download blocked**: Ensure click is user-initiated
3. **QR not scanning**: Check contrast and quiet zone
4. **Mobile layout issues**: Verify viewport meta tag

## ✅ **Success Criteria**

- ✅ **QR code renders** sharply on page
- ✅ **PNG download works** and produces high-quality image
- ✅ **QR code scans** successfully on mobile devices
- ✅ **Responsive design** works on all screen sizes
- ✅ **Accessibility features** are properly implemented
- ✅ **Environment variables** work for production URLs

## 🚀 **Production Deployment**

### **Set Production URL**
After deploying to Vercel:
1. **Add environment variable**: `VITE_DEMO_URL=https://your-app.vercel.app`
2. **Redeploy**: QR code will point to production URL
3. **Test scanning**: Verify QR opens production site

### **QR Code Best Practices**
- **High contrast**: Black on white for best scanning
- **Adequate size**: 128px minimum for reliable scanning
- **Quiet zone**: Margin around QR code
- **Error correction**: Level "M" for good balance

## 📱 **Mobile Testing**

### **Test on Real Devices**
1. **iPhone**: Use Camera app to scan
2. **Android**: Use Google Lens or QR scanner
3. **Tablet**: Test responsive layout
4. **Different lighting**: Test in various conditions

### **Scanning Distance**
- **Close range**: 1-2 feet (should work)
- **Medium range**: 3-6 feet (optimal)
- **Long range**: 6-10 feet (may need larger QR)

## 🎯 **Next Steps**

Once QR code is working:
1. **Deploy to Vercel** with production URL
2. **Add Arcade walkthrough** integration
3. **Mobile polish** and responsive refinements
4. **Final testing** on multiple devices

The QR code implementation is complete when you can scan it with your phone and it opens the correct URL! 🎉 