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

interface BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
}

export default React.memo(function BarChart({
  data,
  width = 800,
  height = 400,
  color = '#10b981',
}: BarChartProps) {
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
      const barWidth = Math.max(2, (width - config.padding.left - config.padding.right) / data.length / 2);

      drawAxes(ctx, config, timeRange, valueRange);

      // Draw bars
      data.forEach((point) => {
        const canvasPoint = dataToCanvas(point, config, timeRange, valueRange);
        const barHeight = config.padding.top + (config.height - config.padding.top - config.padding.bottom) - canvasPoint.y;

        ctx.fillStyle = color;
        ctx.fillRect(
          canvasPoint.x - barWidth / 2,
          canvasPoint.y,
          barWidth,
          barHeight
        );
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [data, config, width, height, color]);

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

