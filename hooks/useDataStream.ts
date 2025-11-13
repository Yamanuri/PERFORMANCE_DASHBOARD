'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { DataPoint } from '@/lib/types';
import { generateNewDataPoint } from '@/lib/dataGenerator';

interface UseDataStreamOptions {
  interval?: number; // milliseconds
  maxDataPoints?: number;
  enabled?: boolean;
}

/**
 * Custom hook for real-time data streaming
 * Generates new data points at specified intervals
 */
export function useDataStream(
  options: UseDataStreamOptions = {}
): {
  data: DataPoint[];
  addDataPoint: (point: DataPoint) => void;
  clearData: () => void;
  isStreaming: boolean;
  startStream: () => void;
  stopStream: () => void;
} {
  const {
    interval = 100,
    maxDataPoints = 10000,
    enabled = true,
  } = options;

  const [data, setData] = useState<DataPoint[]>([]);
  const [isStreaming, setIsStreaming] = useState(enabled);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addDataPoint = useCallback((point: DataPoint) => {
    setData((prev) => {
      const newData = [...prev, point];
      // Keep only the most recent N points to prevent memory issues
      if (newData.length > maxDataPoints) {
        return newData.slice(-maxDataPoints);
      }
      return newData;
    });
  }, [maxDataPoints]);

  const clearData = useCallback(() => {
    setData([]);
  }, []);

  const startStream = useCallback(() => {
    setIsStreaming(true);
  }, []);

  const stopStream = useCallback(() => {
    setIsStreaming(false);
  }, []);

  useEffect(() => {
    if (!isStreaming) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const newPoint = generateNewDataPoint();
      addDataPoint(newPoint);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isStreaming, interval, addDataPoint]);

  return {
    data,
    addDataPoint,
    clearData,
    isStreaming,
    startStream,
    stopStream,
  };
}


