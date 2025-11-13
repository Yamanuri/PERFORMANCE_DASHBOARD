'use client';

import React, { useState, useEffect } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

export default function PerformanceMonitor() {
  const [isMounted, setIsMounted] = useState(false);
  const metrics = usePerformanceMonitor(isMounted);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getFPSColor = (fps: number): string => {
    if (fps >= 55) return '#10b981'; // green
    if (fps >= 30) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  if (!isMounted) {
    return (
      <div className="performance-monitor">
        <h3 className="monitor-title">Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">FPS</span>
            <span className="metric-value">--</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Render Time</span>
            <span className="metric-value">--</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Memory</span>
            <span className="metric-value">--</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Frames</span>
            <span className="metric-value">--</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="performance-monitor">
      <h3 className="monitor-title">Performance Metrics</h3>
      <div className="metrics-grid">
        <div className="metric-item">
          <span className="metric-label">FPS</span>
          <span
            className="metric-value"
            style={{ color: getFPSColor(metrics.fps) }}
          >
            {metrics.fps}
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Render Time</span>
          <span className="metric-value">
            {metrics.renderTime.toFixed(2)}ms
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Memory</span>
          <span className="metric-value">
            {metrics.memoryUsage.toFixed(2)} MB
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Frames</span>
          <span className="metric-value">{metrics.frameCount}</span>
        </div>
      </div>
    </div>
  );
}

