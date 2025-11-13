'use client';

import React, { useMemo } from 'react';
import { DataPoint } from '@/lib/types';
import { useChartRenderer } from '@/hooks/useChartRenderer';

interface LineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  category?: string;
}

export default React.memo(function LineChart({
  data,
  width = 800,
  height = 400,
  color = '#3b82f6',
  category,
}: LineChartProps) {
  // Filter data by category if specified
  const filteredData = useMemo(() => {
    if (!category) return data;
    return data.filter((point) => point.category === category);
  }, [data, category]);

  const { canvasRef } = useChartRenderer(filteredData, {
    width,
    height,
    color,
    showAxes: true,
  });

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

