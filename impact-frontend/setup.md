# Impact Frontend Setup

## Prerequisites

You need Node.js installed to run this Vite-React project. Here are the installation options:

### Option 1: Install Node.js via Homebrew (Recommended)
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

### Option 2: Install Node.js directly
```bash
# Download and install from https://nodejs.org/
# Or use nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
nvm use node
```

## Project Setup

Once Node.js is installed:

```bash
# Navigate to the project directory
cd impact-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Verification Steps

1. **Check Tailwind v4**: Open `src/index.css` and confirm you see `@import "tailwindcss";`
2. **Test Tailwind**: In `src/pages/Home.jsx`, the heading should render large and bold
3. **Check React Router**: Confirm `main.jsx` has `<BrowserRouter>` and routes work

## Expected Output

- **URL**: http://localhost:5173/
- **Page**: Shows "Impact Snapshot" heading with a styled card
- **Tailwind**: Text should be large and bold (text-4xl font-bold)
- **Router**: Should work without console errors

## File Structure

```
impact-frontend/
├── src/
│   ├── components/
│   │   ├── SnapshotCard.jsx
│   │   └── ErrorChart.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Next Steps

After setup is complete, you can:
1. Edit `src/pages/Home.jsx` to customize the main page
2. Edit `src/components/SnapshotCard.jsx` to modify the card design
3. Add real data fetching in `src/pages/Home.jsx`
4. Implement the ErrorChart component 