'use client';

import { useEffect, useState, useRef } from 'react';
import { PerformanceMetrics } from '@/lib/types';
import { PerformanceMonitor } from '@/lib/performanceUtils';

/**
 * Custom hook for monitoring dashboard performance
 */
export function usePerformanceMonitor(
  enabled: boolean = true
): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    dataProcessingTime: 0,
    frameCount: 0,
  });

  const monitorRef = useRef(new PerformanceMonitor());
  const frameCountRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    frameCountRef.current = 0;

    const updateMetrics = () => {
      frameCountRef.current++;
      const monitor = monitorRef.current;

      setMetrics({
        fps: monitor.getFPS(),
        memoryUsage: monitor.getMemoryUsage(),
        renderTime: monitor.getAverageRenderTime(),
        dataProcessingTime: 0, // Can be measured separately
        frameCount: frameCountRef.current,
      });
    };

    // Update metrics every second
    intervalRef.current = setInterval(updateMetrics, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled]);

  return metrics;
}


