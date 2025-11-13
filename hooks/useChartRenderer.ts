'use client';

import { useRef, useEffect, useCallback, useMemo } from 'react';
import { DataPoint } from '@/lib/types';
import {
  CanvasConfig,
  dataToCanvas,
  calculateValueRange,
  calculateTimeRange,
  drawLine,
  drawAxes,
  clearCanvas,
  optimizeDataPoints,
  Point,
} from '@/lib/canvasUtils';
import { PerformanceMonitor } from '@/lib/performanceUtils';

interface UseChartRendererOptions {
  width: number;
  height: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  showAxes?: boolean;
}

/**
 * Custom hook for efficient canvas-based chart rendering
 */
export function useChartRenderer(
  data: DataPoint[],
  options: UseChartRendererOptions
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const monitorRef = useRef(new PerformanceMonitor());

  const {
    width,
    height,
    padding = { top: 20, right: 20, bottom: 40, left: 60 },
    color = '#3b82f6',
    showAxes = true,
  } = options;

  const config: CanvasConfig = useMemo(
    () => ({ width, height, padding }),
    [width, height, padding]
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const startTime = performance.now();

    // Clear canvas
    clearCanvas(ctx, width, height);

    if (data.length === 0) {
      const endTime = performance.now();
      monitorRef.current.measureFrame(endTime - startTime);
      return;
    }

    // Calculate ranges
    const timeRange = calculateTimeRange(data);
    const valueRange = calculateValueRange(data);

    // Draw axes
    if (showAxes) {
      drawAxes(ctx, config, timeRange, valueRange);
    }

    // Convert data to canvas points
    const points: Point[] = data.map((point) =>
      dataToCanvas(point, config, timeRange, valueRange)
    );

    // Optimize points for performance
    const optimizedPoints = optimizeDataPoints(points, 2000);

    // Draw line
    drawLine(ctx, optimizedPoints, color, 2);

    const endTime = performance.now();
    monitorRef.current.measureFrame(endTime - startTime);
  }, [data, config, color, showAxes, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Initial render
    render();

    // Animation loop
    const animate = () => {
      render();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render, width, height]);

  const getMetrics = useCallback(() => {
    return {
      fps: monitorRef.current.getFPS(),
      renderTime: monitorRef.current.getAverageRenderTime(),
      memoryUsage: monitorRef.current.getMemoryUsage(),
    };
  }, []);

  return {
    canvasRef,
    getMetrics,
  };
}


