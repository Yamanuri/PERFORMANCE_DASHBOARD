/**
 * Canvas utility functions for efficient rendering
 */

export interface CanvasConfig {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
}

export interface Point {
  x: number;
  y: number;
}

/**
 * Converts data point to canvas coordinates
 */
export function dataToCanvas(
  point: { timestamp: number; value: number },
  config: CanvasConfig,
  timeRange: { start: number; end: number },
  valueRange: { min: number; max: number }
): Point {
  const { width, height, padding } = config;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const x =
    padding.left +
    ((point.timestamp - timeRange.start) /
      (timeRange.end - timeRange.start)) *
      plotWidth;
  const y =
    padding.top +
    plotHeight -
    ((point.value - valueRange.min) / (valueRange.max - valueRange.min)) *
      plotHeight;

  return { x, y };
}

/**
 * Calculates value range from data
 */
export function calculateValueRange(
  data: { value: number }[],
  padding: number = 0.1
): { min: number; max: number } {
  if (data.length === 0) {
    return { min: 0, max: 100 };
  }

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  return {
    min: Math.max(0, min - range * padding),
    max: max + range * padding,
  };
}

/**
 * Calculates time range from data
 */
export function calculateTimeRange(
  data: { timestamp: number }[]
): { start: number; end: number } {
  if (data.length === 0) {
    const now = Date.now();
    return { start: now - 60000, end: now };
  }

  const timestamps = data.map((d) => d.timestamp);
  return {
    start: Math.min(...timestamps),
    end: Math.max(...timestamps),
  };
}

/**
 * Draws a line path on canvas
 */
export function drawLine(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  color: string,
  lineWidth: number = 2
): void {
  if (points.length === 0) return;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.stroke();
}

/**
 * Draws axes on canvas
 */
export function drawAxes(
  ctx: CanvasRenderingContext2D,
  config: CanvasConfig,
  timeRange: { start: number; end: number },
  valueRange: { min: number; max: number }
): void {
  const { width, height, padding } = config;

  ctx.strokeStyle = '#666';
  ctx.lineWidth = 1;

  // X-axis
  ctx.beginPath();
  ctx.moveTo(padding.left, height - padding.bottom);
  ctx.lineTo(width - padding.right, height - padding.bottom);
  ctx.stroke();

  // Y-axis
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, height - padding.bottom);
  ctx.stroke();

  // Y-axis labels
  ctx.fillStyle = '#666';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const value =
      valueRange.min +
      ((valueRange.max - valueRange.min) * i) / ySteps;
    const y = padding.top + ((height - padding.top - padding.bottom) * (ySteps - i)) / ySteps;
    ctx.fillText(value.toFixed(1), padding.left - 5, y);
  }

  // X-axis labels (time)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const xSteps = 5;
  for (let i = 0; i <= xSteps; i++) {
    const time =
      timeRange.start +
      ((timeRange.end - timeRange.start) * i) / xSteps;
    const x =
      padding.left +
      ((width - padding.left - padding.right) * i) / xSteps;
    const date = new Date(time);
    ctx.fillText(
      date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      x,
      height - padding.bottom + 5
    );
  }
}

/**
 * Clears canvas
 */
export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.clearRect(0, 0, width, height);
}

/**
 * Optimizes data points for rendering (reduces points when zoomed out)
 */
export function optimizeDataPoints(
  points: Point[],
  maxPoints: number = 2000
): Point[] {
  if (points.length <= maxPoints) return points;

  // Simple decimation: keep every Nth point
  const step = Math.ceil(points.length / maxPoints);
  const optimized: Point[] = [];

  for (let i = 0; i < points.length; i += step) {
    optimized.push(points[i]);
  }

  // Always include the last point
  if (optimized[optimized.length - 1] !== points[points.length - 1]) {
    optimized.push(points[points.length - 1]);
  }

  return optimized;
}


