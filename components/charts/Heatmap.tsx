'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { DataPoint } from '@/lib/types';
import {
  CanvasConfig,
  calculateValueRange,
  calculateTimeRange,
  dataToCanvas,
  clearCanvas,
} from '@/lib/canvasUtils';

interface HeatmapProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

export default React.memo(function Heatmap({
  data,
  width = 800,
  height = 400,
}: HeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const config: CanvasConfig = useMemo(
    () => ({
      width,
      height,
      padding: { top: 20, right: 20, bottom: 40, left: 60 },
    }),
    [width, height]
  );

  // Color interpolation function
  const getColor = (value: number, min: number, max: number): string => {
    const normalized = (value - min) / (max - min);
    const r = Math.floor(255 * normalized);
    const b = Math.floor(255 * (1 - normalized));
    return `rgb(${r}, 0, ${b})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const render = () => {
      clearCanvas(ctx, width, height);

      if (data.length === 0) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const timeRange = calculateTimeRange(data);
      const valueRange = calculateValueRange(data);

      // Create grid for heatmap
      const gridSize = 20;
      const cellWidth = (width - config.padding.left - config.padding.right) / gridSize;
      const cellHeight = (height - config.padding.top - config.padding.bottom) / gridSize;

      // Count data points in each cell
      const grid: number[][] = Array(gridSize)
        .fill(0)
        .map(() => Array(gridSize).fill(0));

      data.forEach((point) => {
        const canvasPoint = dataToCanvas(point, config, timeRange, valueRange);
        const x = Math.floor((canvasPoint.x - config.padding.left) / cellWidth);
        const y = Math.floor((canvasPoint.y - config.padding.top) / cellHeight);

        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          grid[y][x]++;
        }
      });

      // Find max count for normalization
      const maxCount = Math.max(...grid.flat());

      // Draw heatmap cells
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const count = grid[y][x];
          if (count > 0) {
            const intensity = count / maxCount;
            ctx.fillStyle = getColor(intensity, 0, 1);
            ctx.fillRect(
              config.padding.left + x * cellWidth,
              config.padding.top + y * cellHeight,
              cellWidth,
              cellHeight
            );
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [data, config, width, height]);

  return (
    <div className="chart-container">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
});

