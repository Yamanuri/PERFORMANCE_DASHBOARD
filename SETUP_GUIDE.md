# 🚀 Complete Setup Guide - How to Run the Project

## Step 1: Install Node.js (Required)

This project requires **Node.js 18 or higher** to run.

### Option A: Download and Install (Recommended)

1. **Visit**: [https://nodejs.org/](https://nodejs.org/)
2. **Download**: The LTS (Long Term Support) version (recommended)
3. **Install**: Run the installer and follow the setup wizard
4. **Verify**: Open a new terminal and run:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers (e.g., `v20.10.0` and `10.2.3`)

### Option B: Using Chocolatey (Windows)

If you have Chocolatey installed:
```bash
choco install nodejs-lts
```

### Option C: Using Winget (Windows 11)

```bash
winget install OpenJS.NodeJS.LTS
```

---

## Step 2: Install Project Dependencies

Once Node.js is installed:

1. **Open a terminal** (PowerShell, Command Prompt, or Git Bash)
2. **Navigate to the project folder**:
   ```bash
   cd C:\Users\PC\Desktop\PLACEMENTS\assignment
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
   
   This will:
   - Install Next.js 14+
   - Install React 18
   - Install TypeScript
   - Install all required dependencies
   - Create a `node_modules` folder

**Expected output**: You should see packages being installed. Wait for it to complete (may take 1-2 minutes).

---

## Step 3: Run the Development Server

After dependencies are installed:

```bash
npm run dev
```

**Expected output**:
```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
- Ready in 2.3s
```

---

## Step 4: Open in Browser

1. **Open your web browser** (Chrome, Edge, Firefox, etc.)
2. **Navigate to**: [http://localhost:3000](http://localhost:3000)
3. **You should see**: The Performance Dashboard

---

## 🎮 Using the Dashboard

### Controls:

1. **Start Stream**: Click to begin real-time data updates (100ms intervals)
2. **Stop Stream**: Pause data updates
3. **Clear Data**: Reset all data points
4. **Data Point Count**: Select 1k, 5k, 10k, or 50k points from dropdown
5. **Filters Panel**: Filter by category and value range
6. **Time Range**: Select quick time ranges or aggregation periods

### Performance Monitor:

Watch the right sidebar for:
- **FPS**: Should show 60fps with 10k points
- **Render Time**: Should be < 16ms
- **Memory**: JavaScript heap size
- **Frames**: Total frames rendered

---

## 🛠️ Troubleshooting

### Issue: "npm is not recognized"

**Solution**: 
- Node.js is not installed or not in PATH
- Install Node.js from [nodejs.org](https://nodejs.org/)
- **Restart your terminal** after installation
- Verify with: `node --version`

### Issue: "Port 3000 already in use"

**Solution**: 
```bash
# Use a different port
npm run dev -- -p 3001
```
Then open: http://localhost:3001

### Issue: "Cannot find module" errors

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: TypeScript errors

**Solution**:
- Make sure you ran `npm install`
- Check that `node_modules` folder exists
- Restart your development server

### Issue: Build errors

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## 📋 Available Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🎯 Quick Start (Once Node.js is Installed)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3000
```

---

## ✅ Verification Checklist

Before running, make sure:

- [ ] Node.js 18+ is installed (`node --version`)
- [ ] npm is available (`npm --version`)
- [ ] You're in the project directory
- [ ] Dependencies are installed (`node_modules` folder exists)
- [ ] Port 3000 is available (or use different port)

---

## 📚 Next Steps

Once the dashboard is running:

1. **Click "Start Stream"** to see real-time updates
2. **Monitor Performance** in the right sidebar
3. **Try different data point counts** (1k, 5k, 10k, 50k)
4. **Use filters** to filter data by category
5. **Test aggregation** with time periods

---

## 🆘 Still Having Issues?

1. **Check Node.js version**: Must be 18 or higher
2. **Restart terminal**: After installing Node.js
3. **Check internet connection**: npm needs internet to download packages
4. **Try clearing cache**: `npm cache clean --force`
5. **Check for errors**: Look at the terminal output for specific error messages

---

**Need Help?** Check the main [README.md](./README.md) for more details.


