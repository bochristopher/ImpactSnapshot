# 🧪 Toast Notification Test Plan

## ✅ **Setup Verification**

### **1. Install Dependencies**
```bash
npm install react-hot-toast
npm run dev
```

### **2. Check Package.json**
Verify `react-hot-toast` is in dependencies:
```json
{
  "dependencies": {
    "react-hot-toast": "^2.4.1"
  }
}
```

## 🎯 **Test Scenarios**

### **Test 1: WebSocket Connection Toast**
1. **Load page**: http://localhost:5173/
2. **Wait 1-2 seconds**: Should see "Live updates connected" success toast
3. **Verify toast**: Green success toast at top-center
4. **Check duration**: Toast disappears after 2.5 seconds

### **Test 2: WebSocket Reconnection Toast**
1. **Stop backend**: Ctrl+C in backend terminal
2. **Wait 1-2 seconds**: Should see "Reconnecting..." loading toast
3. **Verify toast**: Blue loading toast that stays visible
4. **Restart backend**: Loading toast should be replaced with "Live updates connected"
5. **Check transition**: Smooth transition from loading to success

### **Test 3: WebSocket Error Toast**
1. **Stop backend**: Ctrl+C in backend terminal
2. **Wait for error**: Should see "Live updates offline — retrying…" error toast
3. **Verify toast**: Red error toast at top-center
4. **Check retry**: Toast should appear multiple times during reconnection attempts

### **Test 4: Rollback Toast Flow**
1. **Click "Roll Back Release"** button
2. **Verify loading**: Should see "Rolling back..." loading toast
3. **Wait for response**: Toast should update based on HTTP response
4. **Success case**: Should show "Rollback triggered" success toast
5. **Error case**: Should show "Rollback failed" error toast

### **Test 5: Reduced Motion Support**
1. **Enable reduced motion**: System Preferences → Accessibility → Motion → Reduce motion
2. **Reload page**: Toasts should have gentler animations
3. **Check duration**: Reduced motion toasts last 3 seconds instead of 2.5
4. **Verify styling**: Dark background for better contrast

### **Test 6: Multiple Toast Handling**
1. **Trigger multiple events** quickly
2. **Verify stacking**: Toasts should stack properly
3. **Check dismissal**: Each toast should dismiss independently
4. **Test overflow**: Many toasts should handle gracefully

## 🔍 **Debugging Tips**

### **Check Toast Rendering**
```javascript
// In browser console
// Should show toast container
console.log('Toaster:', document.querySelector('[data-testid="toaster"]'))
```

### **Test Toast Functions**
```javascript
// In browser console
import { notifyLive, notifyOffline } from './src/lib/notify.js'
notifyLive() // Should show success toast
notifyOffline() // Should show error toast
```

### **Verify Reduced Motion**
```javascript
// In browser console
console.log('Reduced motion:', window.matchMedia('(prefers-reduced-motion: reduce)').matches)
```

### **Common Issues**
1. **Toasts not showing**: Check if `<Toaster />` is mounted in App.jsx
2. **Import errors**: Verify react-hot-toast is installed
3. **Styling issues**: Check if Tailwind classes are applied
4. **Animation problems**: Test with reduced motion preference

## ✅ **Success Criteria**

- ✅ **WebSocket connected** shows success toast
- ✅ **WebSocket reconnecting** shows loading toast
- ✅ **WebSocket error** shows error toast
- ✅ **Rollback clicked** shows loading → success/error flow
- ✅ **Reduced motion** support works properly
- ✅ **Toast positioning** is top-center
- ✅ **Toast duration** is 2.5s (3s for reduced motion)
- ✅ **Multiple toasts** stack and dismiss properly

## 🎯 **Manual Test Steps**

### **1. Connection Flow**
1. **Load page** and wait for "Live updates connected" toast
2. **Stop backend** and verify "Reconnecting..." toast appears
3. **Restart backend** and verify "Live updates connected" toast
4. **Repeat** to test multiple connection cycles

### **2. Rollback Flow**
1. **Click "Roll Back Release"** button
2. **Watch for "Rolling back..."** loading toast
3. **Wait for response** and verify success/error toast
4. **Test multiple clicks** to ensure proper handling

### **3. Accessibility Test**
1. **Enable screen reader** and navigate through toasts
2. **Test keyboard navigation** to toast elements
3. **Verify reduced motion** preference is respected
4. **Check color contrast** for accessibility

## 🚀 **Next Steps**

Once toast notifications are working:
1. **Test on mobile devices** for touch interactions
2. **Verify in production** deployment
3. **Add dark mode toggle** (next polish task)
4. **Final testing** with real backend integration

The toast implementation is successful when all notifications appear correctly and provide clear feedback for user actions! 🎉 