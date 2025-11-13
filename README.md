# Performance-Critical Data Visualization Dashboard

A high-performance real-time dashboard built with Next.js 14+ App Router and TypeScript that can smoothly render and update 10,000+ data points at 60fps.

## 🚀 Features

- **Multiple Chart Types**: Line chart, bar chart, scatter plot, and heatmap
- **Real-time Updates**: New data arrives every 100ms (simulated)
- **Interactive Controls**: Zoom, pan, data filtering, and time range selection
- **Data Aggregation**: Group by time periods (1min, 5min, 1hour)
- **Virtual Scrolling**: Handle large datasets in data tables efficiently
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Performance Monitoring**: Built-in FPS counter and memory usage tracking

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🎯 Performance Testing

### Testing Performance Metrics

1. **Start the dashboard** and click "Start Stream" to begin real-time data updates
2. **Monitor the Performance Metrics panel** on the right sidebar:
   - **FPS**: Should maintain 60fps with 10k+ data points
   - **Render Time**: Should be < 16ms for 60fps
   - **Memory Usage**: Should remain stable over time
3. **Stress Test**: Use the dropdown to increase data points to 50,000 and monitor performance

### Browser Compatibility

- **Chrome/Edge**: Full support, optimal performance
- **Firefox**: Full support
- **Safari**: Full support (may have slight performance differences)
- **Mobile Browsers**: Responsive design works, but performance may vary on lower-end devices

### Performance Benchmarks

The dashboard is designed to meet these targets:

- ✅ **10,000 data points**: 60fps steady
- ✅ **Real-time updates**: No frame drops
- ✅ **Memory growth**: < 1MB per hour
- ✅ **Interaction latency**: < 100ms
- ⚡ **50,000 data points**: 30fps minimum (stretch goal)
- ⚡ **100,000 data points**: Usable (15fps+)

## 🏗️ Architecture

### Next.js App Router Structure

```
app/
├── dashboard/
│   ├── page.tsx          # Server Component - generates initial data
│   └── layout.tsx
├── api/
│   └── data/
│       └── route.ts      # API route for data generation
├── globals.css
└── layout.tsx
```

### Component Structure

```
components/
├── charts/               # Chart components (Canvas-based)
│   ├── LineChart.tsx
│   ├── BarChart.tsx
│   ├── ScatterPlot.tsx
│   └── Heatmap.tsx
├── controls/             # Interactive controls
│   ├── FilterPanel.tsx
│   └── TimeRangeSelector.tsx
├── ui/                   # UI components
│   ├── DataTable.tsx
│   └── PerformanceMonitor.tsx
└── providers/
    └── DataProvider.tsx  # React Context for state management
```

### Custom Hooks

- `useDataStream`: Manages real-time data streaming
- `useChartRenderer`: Handles efficient canvas rendering
- `usePerformanceMonitor`: Tracks FPS and memory usage
- `useVirtualization`: Implements virtual scrolling for large lists

## 🎨 Key Features Explained

### Real-time Data Streaming

The dashboard uses a custom `useDataStream` hook that generates new data points every 100ms. Data is automatically limited to prevent memory issues (default: 10,000 points).

### Canvas Rendering

All charts use HTML5 Canvas for high-performance rendering:
- **Line Chart**: Optimized line drawing with point decimation
- **Bar Chart**: Efficient bar rendering
- **Scatter Plot**: Point-based visualization
- **Heatmap**: Grid-based density visualization

### Virtual Scrolling

The data table uses virtual scrolling to only render visible rows, allowing it to handle thousands of data points without performance degradation.

### Data Aggregation

Data can be aggregated by time periods (1min, 5min, 1hour) to reduce the number of points rendered while maintaining visual accuracy.

## 🔧 Next.js Optimizations Used

1. **Server Components**: Initial data generation happens on the server
2. **Client Components**: Interactive visualizations are client-side
3. **Route Handlers**: API endpoints for data generation
4. **React.memo**: Prevents unnecessary re-renders
5. **useMemo/useCallback**: Optimizes expensive calculations
6. **Concurrent Rendering**: Uses React 18 concurrent features

## 📊 Performance Optimizations

1. **Canvas Rendering**: Direct canvas manipulation for 60fps
2. **Data Decimation**: Reduces points when zoomed out
3. **RequestAnimationFrame**: Smooth animation loop
4. **Memoization**: Cached calculations and filtered data
5. **Virtual Scrolling**: Only renders visible table rows
6. **Sliding Window**: Limits data points to prevent memory leaks

## 🚫 What's NOT Included

- ❌ Chart.js or D3.js (built from scratch)
- ❌ External state management libraries (uses React Context)
- ❌ Heavy UI component libraries
- ❌ Server-side rendering for charts (client-side only for interactivity)

## 📝 Development

### Project Structure

```
performance-dashboard/
├── app/                  # Next.js App Router
├── components/           # React components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and types
├── public/               # Static assets
└── package.json
```

### TypeScript

The project is fully typed with TypeScript. Type definitions are in `lib/types.ts`.

## 🐛 Troubleshooting

### Low FPS

- Reduce the number of data points using the dropdown
- Check browser DevTools Performance tab for bottlenecks
- Ensure hardware acceleration is enabled in browser

### Memory Issues

- The dashboard automatically limits data points (default: 10,000)
- Use the "Clear Data" button to reset
- Check for memory leaks using Chrome DevTools Memory profiler

### Build Issues

- Ensure Node.js 18+ is installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## 📈 Future Enhancements

- [ ] Web Workers for data processing
- [ ] OffscreenCanvas for background rendering
- [ ] WebGL implementation for ultimate performance
- [ ] Service Worker for data caching
- [ ] PWA features (offline capability)
- [ ] Real-time collaboration features

## 📄 License

This project is created for educational/assignment purposes.

## 👤 Author

Built as a performance-critical assignment demonstrating Next.js 14+ App Router and React optimization techniques.

---

**Note**: This dashboard is designed to handle production-level performance requirements while maintaining clean, maintainable code. All rendering is done from scratch without external charting libraries to demonstrate deep understanding of web performance optimization.

