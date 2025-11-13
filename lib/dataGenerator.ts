import { DataPoint } from './types';

const CATEGORIES = ['CPU', 'Memory', 'Network', 'Disk', 'API'];

/**
 * Generates realistic time-series data points
 */
export function generateDataPoint(
  timestamp: number,
  category: string,
  baseValue: number = 50
): DataPoint {
  // Generate realistic values with some randomness
  const variation = Math.sin(timestamp / 10000) * 20 + Math.random() * 10;
  const value = Math.max(0, Math.min(100, baseValue + variation));

  return {
    timestamp,
    value,
    category,
    metadata: {
      source: 'sensor',
      quality: Math.random() > 0.1 ? 'good' : 'degraded',
    },
  };
}

/**
 * Generates initial dataset for the dashboard
 */
export function generateInitialDataset(count: number = 1000): DataPoint[] {
  const now = Date.now();
  const data: DataPoint[] = [];
  const baseValues: Record<string, number> = {
    CPU: 45,
    Memory: 60,
    Network: 30,
    Disk: 25,
    API: 40,
  };

  for (let i = count; i > 0; i--) {
    const timestamp = now - i * 100; // 100ms intervals
    const category = CATEGORIES[i % CATEGORIES.length];
    data.push(generateDataPoint(timestamp, category, baseValues[category]));
  }

  return data;
}

/**
 * Generates a new data point for real-time updates
 */
export function generateNewDataPoint(): DataPoint {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  return generateDataPoint(Date.now(), category);
}

/**
 * Aggregates data points by time period
 */
export function aggregateData(
  data: DataPoint[],
  periodMs: number
): DataPoint[] {
  if (data.length === 0) return [];

  const aggregated: DataPoint[] = [];
  const buckets = new Map<number, DataPoint[]>();

  // Group data into time buckets
  data.forEach((point) => {
    const bucketTime = Math.floor(point.timestamp / periodMs) * periodMs;
    if (!buckets.has(bucketTime)) {
      buckets.set(bucketTime, []);
    }
    buckets.get(bucketTime)!.push(point);
  });

  // Aggregate each bucket (average value)
  buckets.forEach((points, bucketTime) => {
    const avgValue =
      points.reduce((sum, p) => sum + p.value, 0) / points.length;
    const category = points[0].category; // Use first category

    aggregated.push({
      timestamp: bucketTime,
      value: avgValue,
      category,
      metadata: { aggregated: true, pointCount: points.length },
    });
  });

  return aggregated.sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Filters data based on criteria
 */
export function filterData(
  data: DataPoint[],
  filters: {
    categories?: string[];
    minValue?: number;
    maxValue?: number;
    timeRange?: { start: number; end: number };
  }
): DataPoint[] {
  return data.filter((point) => {
    if (filters.categories && !filters.categories.includes(point.category)) {
      return false;
    }
    if (filters.minValue !== undefined && point.value < filters.minValue) {
      return false;
    }
    if (filters.maxValue !== undefined && point.value > filters.maxValue) {
      return false;
    }
    if (filters.timeRange) {
      if (
        point.timestamp < filters.timeRange.start ||
        point.timestamp > filters.timeRange.end
      ) {
        return false;
      }
    }
    return true;
  });
}


