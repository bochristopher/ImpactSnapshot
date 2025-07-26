# 🧪 WebSocket Test Plan

## ✅ **Setup Verification**

### **1. Restart Servers**
```bash
# Stop current servers (Ctrl+C in both terminals)
# Restart backend
cd backend
source venv/bin/activate
python -m uvicorn main:app --host 0.0.0.0 --port 8000

# Restart frontend (in new terminal)
cd impact-frontend
npm run dev
```

### **2. Check Vite Proxy**
- Open browser to http://localhost:5173/
- Check Network tab in DevTools
- Should see WebSocket connection to `ws://localhost:5173/ws`
- Status pill should show "Live" within 1-2 seconds

## 🎯 **Test Scenarios**

### **Test 1: Initial Connection**
1. **Load page**: http://localhost:5173/
2. **Expected**: Status pill shows "Live" (green)
3. **Check console**: Should see "WebSocket connected"
4. **Verify data**: Card shows real data from backend

### **Test 2: Real-time Updates**
1. **Keep page open** and watch the card
2. **Trigger error spike**: 
   ```bash
   curl -X POST http://localhost:8000/inject-error \
     -H "Content-Type: application/json" \
     -d '{"error_type": "critical"}'
   ```
3. **Expected**: Card updates immediately (no 6-second wait)
4. **Check console**: Should see WebSocket message received

### **Test 3: Backend Disconnection**
1. **Stop backend**: Ctrl+C in backend terminal
2. **Wait 1-2 seconds**: Status pill should show "Reconnecting…" (amber)
3. **Wait 10+ seconds**: Status pill should show "Offline" (amber/red)
4. **Verify polling continues**: Data still updates every 6 seconds
5. **Restart backend**: Status pill should return to "Live"

### **Test 4: Auto-reconnect**
1. **Stop backend** (while page is open)
2. **Wait for "Reconnecting…"** status
3. **Restart backend**: 
   ```bash
   cd backend
   source venv/bin/activate
   python -m uvicorn main:app --host 0.0.0.0 --port 8000
   ```
4. **Expected**: Status pill returns to "Live" within 1-2 seconds
5. **Verify data**: Card updates with fresh data

### **Test 5: Heartbeat**
1. **Open DevTools** → Network tab
2. **Filter by WS** (WebSocket)
3. **Wait 25+ seconds**
4. **Expected**: Should see "ping" messages sent every 25s
5. **Verify**: Connection stays alive

### **Test 6: Error Handling**
1. **Stop backend**
2. **Wait for "Offline"** status
3. **Check console**: Should see exponential backoff delays
4. **Restart backend**: Should reconnect with 1s delay (reset backoff)

### **Test 7: Multiple Tabs**
1. **Open 2+ browser tabs** to http://localhost:5173/
2. **Trigger error spike** (curl command above)
3. **Expected**: All tabs update simultaneously
4. **Stop backend**: All tabs show "Reconnecting…"
5. **Restart backend**: All tabs return to "Live"

## 🔍 **Debugging Tips**

### **Check WebSocket Connection**
```javascript
// In browser console
// Should show WebSocket object
console.log('WebSocket readyState:', wsRef.current?.readyState)
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED
```

### **Check Network Tab**
- **WS filter**: Shows WebSocket frames
- **Headers**: Should see upgrade to WebSocket
- **Messages**: Should see ping/pong and data frames

### **Common Issues**
1. **"Reconnecting…" stuck**: Check backend logs for errors
2. **No real-time updates**: Verify WebSocket endpoint in backend
3. **CORS errors**: Check vite.config.js proxy settings
4. **Multiple connections**: Check for React StrictMode double-mounting

## ✅ **Success Criteria**

- ✅ **Status pill shows "Live"** on page load
- ✅ **Real-time updates** when triggering errors
- ✅ **Auto-reconnect** with exponential backoff
- ✅ **Polling fallback** when WebSocket is down
- ✅ **Heartbeat** keeps connection alive
- ✅ **Clean shutdown** on page unload
- ✅ **Error handling** for invalid messages

## 🚀 **Next Steps**

Once all tests pass:
1. **Add QR code** for mobile access
2. **Mobile polish** and responsive design
3. **Deploy to production** (Vercel/Netlify)
4. **Add Arcade integration** for walkthrough

The WebSocket implementation is working when you see real-time updates without the 6-second polling delay! 🎉 