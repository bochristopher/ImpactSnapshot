# STEP 3 - Live Data Polling Test Guide

## ✅ **Implementation Complete**

### **Files Created/Modified**
1. **`src/config.js`** - Backend URL configuration
2. **`src/lib/validate.js`** - Data validation helper
3. **`src/pages/Home.jsx`** - Live data polling with error handling

## 🧪 **Manual Test Steps**

### **1. Basic Functionality Test**

#### **Start the Application**
```bash
cd impact-frontend
npm run dev
```

#### **Open Browser**
- Navigate to: http://localhost:5173/
- Verify the page loads without errors

#### **Check Backend Environment**
- Look for the small text showing: "Backend: http://localhost:8000/snapshot"
- This confirms the correct backend URL is being used

#### **Verify Live Data**
- The card should show real data from the backend (not placeholders)
- Check that values update every 6 seconds
- Look for:
  - Endpoint: "/checkout"
  - ARR Risk: $0 (from backend)
  - Lost Signups: 0 (from backend)
  - Error Count: 0
  - Conversion Rate: 85.0%

### **2. Error Handling Test**

#### **Simulate Backend Offline**
1. **Stop the backend server** (Ctrl+C in the backend terminal)
2. **Wait 5-10 seconds** - you should see an error alert appear
3. **Verify error message** shows connection error details
4. **Check retry behavior** - after 10 seconds, it should retry automatically

#### **Test Error Dismissal**
1. **Click the X button** on the error alert
2. **Verify the alert disappears**
3. **Check that polling continues** (will retry after 10 seconds)

#### **Restore Backend**
1. **Restart the backend server**:
   ```bash
   cd backend
   source venv/bin/activate
   python -m uvicorn main:app --host 0.0.0.0 --port 8000
   ```
2. **Wait for the next retry cycle** (up to 10 seconds)
3. **Verify data returns** and error alert disappears

### **3. Timeout Test**

#### **Simulate Slow Network**
1. **Add artificial delay** to backend (if possible)
2. **Verify 5-second timeout** works correctly
3. **Check error handling** for timeout scenarios

### **4. Data Validation Test**

#### **Test Invalid JSON**
1. **Modify backend** to return invalid JSON temporarily
2. **Verify validation error** is caught and displayed
3. **Check error message** is descriptive

#### **Test Missing Fields**
1. **Modify backend** to return incomplete data
2. **Verify default values** are applied:
   - endpoint: "/unknown"
   - lost_signups: 0
   - arr_risk: 0
   - rollback_url: "#"

### **5. Demo Loading Test**

#### **Test Loading Toggle**
1. **Click "Show Loading"** button
2. **Verify skeleton animation** appears
3. **Click "Show Data"** button
4. **Verify real data** returns

### **6. Network Tab Verification**

#### **Open Developer Tools**
1. **Open browser DevTools** (F12)
2. **Go to Network tab**
3. **Refresh the page**
4. **Verify requests** to `/snapshot` every 6 seconds
5. **Check request details**:
   - Method: GET
   - Status: 200 OK
   - Response: JSON data

## 🔧 **Technical Implementation Details**

### **Polling Logic**
```javascript
// Polling interval: 6 seconds normal, 10 seconds for retry
const delay = shouldRetry ? 10000 : 6000

// AbortController for 5-second timeout
const abortController = new AbortController()
setTimeout(() => abortController.abort(), 5000)
```

### **Error Handling**
```javascript
// Comprehensive error catching
catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request was aborted due to timeout')
  } else {
    setError(err.message)
    setLoading(false)
  }
}
```

### **Data Validation**
```javascript
// Normalized data structure
{
  endpoint: String(obj.endpoint ?? "/unknown"),
  lost_signups: Number(obj.lost_signups ?? 0),
  arr_risk: Number(obj.arr_risk ?? 0),
  rollback_url: String(obj.rollback_url ?? "#")
}
```

## 🎯 **Expected Behaviors**

### **Normal Operation**
- ✅ **Initial load**: Shows loading state, then live data
- ✅ **Polling**: Updates every 6 seconds
- ✅ **Data display**: Shows real values from backend
- ✅ **Error recovery**: Auto-retry after 10 seconds on error

### **Error Scenarios**
- ✅ **Network error**: Shows dismissible error alert
- ✅ **Timeout**: Aborts after 5 seconds
- ✅ **Invalid data**: Validates and shows defaults
- ✅ **Backend offline**: Graceful error handling

### **User Experience**
- ✅ **Loading states**: Smooth transitions
- ✅ **Error feedback**: Clear error messages
- ✅ **Recovery**: Automatic retry with longer delays
- ✅ **Dismissible errors**: User can clear error alerts

## 🚨 **Troubleshooting**

### **CORS Errors**
If you see CORS errors in the console:
1. **Check backend CORS settings** in `backend/main.py`
2. **Verify CORS middleware** is enabled
3. **Check allowed origins** include `http://localhost:5173`

### **Network Timeouts**
If requests are timing out:
1. **Check backend is running** on port 8000
2. **Verify network connectivity**
3. **Check firewall settings**

### **Data Not Updating**
If data isn't updating:
1. **Check browser console** for errors
2. **Verify polling interval** is working
3. **Check backend response** format

## ✅ **Success Criteria**

The implementation is successful when:
- ✅ **Live data loads** from backend on page load
- ✅ **Data updates** every 6 seconds automatically
- ✅ **Error handling** works for network issues
- ✅ **Timeout protection** prevents hanging requests
- ✅ **Validation** ensures data integrity
- ✅ **User feedback** is clear and actionable

## 🎉 **Ready for Next Step**

Once all tests pass, the live data polling is working correctly and ready for the next phase: **WebSocket implementation for real-time updates**. 