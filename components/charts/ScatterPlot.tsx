'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { DataPoint } from '@/lib/types';
import {
  CanvasConfig,
  calculateValueRange,
  calculateTimeRange,
  dataToCanvas,
  clearCanvas,
  drawAxes,
} from '@/lib/canvasUtils';

interface ScatterPlotProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  pointSize?: number;
}

export default React.memo(function ScatterPlot({
  data,
  width = 800,
  height = 400,
  color = '#f59e0b',
  pointSize = 4,
}: ScatterPlotProps) {
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

      drawAxes(ctx, config, timeRange, valueRange);

      // Draw scatter points
      ctx.fillStyle = color;
      data.forEach((point) => {
        const canvasPoint = dataToCanvas(point, config, timeRange, valueRange);
        ctx.beginPath();
        ctx.arc(canvasPoint.x, canvasPoint.y, pointSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [data, config, width, height, color, pointSize]);

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

