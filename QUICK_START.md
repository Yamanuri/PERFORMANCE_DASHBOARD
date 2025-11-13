# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 What You'll See

- **Dashboard** with 4 chart types (Line, Bar, Scatter, Heatmap)
- **Performance Monitor** showing FPS, memory usage, and render time
- **Control Panel** with filters and time range selection
- **Data Table** with virtual scrolling

## 🎮 Controls

1. **Start Stream**: Begin real-time data updates (100ms intervals)
2. **Stop Stream**: Pause data updates
3. **Clear Data**: Reset all data points
4. **Data Point Count**: Select 1k, 5k, 10k, or 50k points
5. **Filters**: Filter by category and value range
6. **Time Range**: Select quick time ranges or aggregation periods

## 🎯 Testing Performance

1. Click **"Start Stream"** to begin real-time updates
2. Watch the **Performance Monitor** on the right sidebar
3. Increase data points using the dropdown to stress test
4. Monitor FPS - should maintain 60fps with 10k points

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
# Use a different port
npm run dev -- -p 3001
```

**TypeScript errors?**
```bash
# Make sure dependencies are installed
npm install
```

**Build errors?**
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

## 📚 Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [PERFORMANCE.md](./PERFORMANCE.md) for optimization details
- Explore the code to understand the architecture

---

**Happy Coding! 🎉**

