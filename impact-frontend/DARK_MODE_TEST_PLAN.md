# 🧪 Dark Mode Test Plan

## ✅ **Setup Verification**

### **1. Check Implementation**
```bash
npm run dev
```

### **2. Verify Files**
- ✅ `src/index.css` - Tailwind v4 dark variant
- ✅ `src/lib/theme.js` - Theme helper functions
- ✅ `index.html` - Inline script to prevent flash
- ✅ `src/components/ThemeToggle.jsx` - Toggle component
- ✅ `src/pages/Home.jsx` - Theme toggle in header

## 🎯 **Test Scenarios**

### **Test 1: System Preference Detection**
1. **Set OS to light mode**: System Preferences → General → Appearance → Light
2. **Clear localStorage**: DevTools → Application → Local Storage → Clear
3. **Reload page**: Should show light theme
4. **Switch OS to dark mode**: System Preferences → General → Appearance → Dark
5. **Reload page**: Should show dark theme
6. **Verify no flash**: Theme should apply instantly

### **Test 2: Manual Override**
1. **Click theme toggle**: Should switch between light/dark
2. **Check localStorage**: DevTools → Application → Local Storage → Should see `theme: "dark"` or `theme: "light"`
3. **Reload page**: Should maintain manual choice
4. **Switch OS theme**: Should ignore OS preference when manual choice is set
5. **Clear localStorage**: Should return to following OS preference

### **Test 3: Theme Toggle Functionality**
1. **Click toggle button**: Should show sun icon in dark mode, moon in light mode
2. **Check accessibility**: Should have proper `aria-pressed` and `aria-label`
3. **Test keyboard**: Tab to button, Space/Enter to toggle
4. **Test focus ring**: Should show blue focus ring when tabbed to
5. **Verify positioning**: Should be in top-right of header

### **Test 4: Dark Mode Styling**
1. **Switch to dark mode**: Click toggle or set OS preference
2. **Check page background**: Should be `bg-neutral-950` (very dark)
3. **Check cards**: Should be `bg-neutral-900` with proper borders
4. **Check text**: Should be `text-neutral-100` for headings, `text-neutral-400` for secondary
5. **Check buttons**: Should have proper dark hover states
6. **Check QR code**: Should remain black on white for scanning

### **Test 5: Reduced Motion Support**
1. **Enable reduced motion**: System Preferences → Accessibility → Motion → Reduce motion
2. **Reload page**: Animations should be nearly instant
3. **Test theme toggle**: Should have minimal animation
4. **Test toast notifications**: Should have reduced duration
5. **Test loading states**: Should have minimal pulse animation

### **Test 6: Cross-Tab Persistence**
1. **Open multiple tabs** to the same site
2. **Toggle theme** in one tab
3. **Check other tabs**: Should update automatically
4. **Reload all tabs**: Should maintain theme choice

## 🔍 **Debugging Tips**

### **Check Theme State**
```javascript
// In browser console
console.log('Current theme:', document.documentElement.dataset.theme)
console.log('Stored theme:', localStorage.getItem('theme'))
console.log('System preference:', window.matchMedia('(prefers-color-scheme: dark)').matches)
```

### **Test Theme Functions**
```javascript
// In browser console
import { toggleTheme, getSystemPref } from './src/lib/theme.js'
toggleTheme() // Should switch theme
getSystemPref() // Should return 'dark' or 'light'
```

### **Check Reduced Motion**
```javascript
// In browser console
console.log('Reduced motion:', window.matchMedia('(prefers-reduced-motion: reduce)').matches)
```

### **Common Issues**
1. **Flash of wrong theme**: Check inline script in index.html
2. **Theme not persisting**: Check localStorage implementation
3. **OS preference not detected**: Check matchMedia implementation
4. **Styles not applying**: Check Tailwind v4 dark variant
5. **Animations not reduced**: Check CSS media query

## ✅ **Success Criteria**

- ✅ **System preference** detection works correctly
- ✅ **Manual override** persists in localStorage
- ✅ **No flash** of wrong theme on page load
- ✅ **Theme toggle** is accessible and functional
- ✅ **Dark mode styles** apply to all components
- ✅ **Reduced motion** support works properly
- ✅ **Cross-tab persistence** works correctly
- ✅ **OS preference changes** are detected (when no manual choice)

## 🎯 **Manual Test Steps**

### **1. System Preference Flow**
1. **Set OS to light mode** and clear localStorage
2. **Reload page** - should show light theme
3. **Switch OS to dark mode** and reload
4. **Verify** - should show dark theme
5. **Check no flash** - theme should apply instantly

### **2. Manual Override Flow**
1. **Click theme toggle** - should switch themes
2. **Check localStorage** - should contain theme choice
3. **Reload page** - should maintain choice
4. **Switch OS theme** - should ignore OS preference
5. **Clear localStorage** - should return to OS preference

### **3. Accessibility Test**
1. **Tab to theme toggle** - should show focus ring
2. **Press Space/Enter** - should toggle theme
3. **Check screen reader** - should announce current state
4. **Test reduced motion** - animations should be minimal

### **4. Visual Test**
1. **Switch to dark mode** - verify all components
2. **Check contrast** - text should be readable
3. **Check QR code** - should remain scannable
4. **Check buttons** - should have proper hover states

## 🚀 **Next Steps**

Once dark mode is working:
1. **Test on mobile devices** for touch interactions
2. **Verify in production** deployment
3. **Add final polish** (compact mobile layout, aria-live)
4. **Final testing** with real backend integration

The dark mode implementation is successful when all themes work correctly and provide a smooth user experience! 🎉 