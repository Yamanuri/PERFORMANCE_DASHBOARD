'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { DataPoint, FilterOptions, TimeRange } from '@/lib/types';
import { filterData, aggregateData } from '@/lib/dataGenerator';
import { AGGREGATION_PERIODS } from '@/lib/types';

interface DataContextValue {
  data: DataPoint[];
  filteredData: DataPoint[];
  aggregatedData: DataPoint[];
  filters: FilterOptions;
  timeRange: TimeRange | null;
  aggregationPeriod: number | null;
  setData: (data: DataPoint[]) => void;
  addDataPoint: (point: DataPoint) => void;
  setFilters: (filters: FilterOptions) => void;
  setTimeRange: (range: TimeRange | null) => void;
  setAggregationPeriod: (period: number | null) => void;
  clearData: () => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({
  children,
  initialData = [],
}: {
  children: ReactNode;
  initialData?: DataPoint[];
}) {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
  });
  const [timeRange, setTimeRange] = useState<TimeRange | null>(null);
  const [aggregationPeriod, setAggregationPeriod] = useState<number | null>(null);

  const addDataPoint = useCallback((point: DataPoint) => {
    setData((prev) => [...prev, point]);
  }, []);

  const clearData = useCallback(() => {
    setData([]);
  }, []);

  // Memoize filtered data
  const filteredData = useMemo(() => {
    return filterData(data, {
      categories: filters.categories.length > 0 ? filters.categories : undefined,
      minValue: filters.minValue,
      maxValue: filters.maxValue,
      timeRange: timeRange || undefined,
    });
  }, [data, filters, timeRange]);

  // Memoize aggregated data
  const aggregatedData = useMemo(() => {
    if (!aggregationPeriod) return filteredData;
    return aggregateData(filteredData, aggregationPeriod);
  }, [filteredData, aggregationPeriod]);

  const value = useMemo(
    () => ({
      data,
      filteredData,
      aggregatedData,
      filters,
      timeRange,
      aggregationPeriod,
      setData,
      addDataPoint,
      setFilters,
      setTimeRange,
      setAggregationPeriod,
      clearData,
    }),
    [
      data,
      filteredData,
      aggregatedData,
      filters,
      timeRange,
      aggregationPeriod,
      addDataPoint,
      clearData,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}


