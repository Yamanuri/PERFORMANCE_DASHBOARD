'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { DataPoint } from '@/lib/types';
import { DataProvider, useData } from '@/components/providers/DataProvider';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ScatterPlot from '@/components/charts/ScatterPlot';
import Heatmap from '@/components/charts/Heatmap';
import FilterPanel from '@/components/controls/FilterPanel';
import TimeRangeSelector from '@/components/controls/TimeRangeSelector';
import DataTable from '@/components/ui/DataTable';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import { useDataStream } from '@/hooks/useDataStream';

function DashboardContent() {
  const { aggregatedData, addDataPoint, clearData } = useData();
  const [chartType, setChartType] = useState<'line' | 'bar' | 'scatter' | 'heatmap'>('line');
  const [dataPointCount, setDataPointCount] = useState(10000);

  const {
    data: streamData,
    isStreaming,
    startStream,
    stopStream,
  } = useDataStream({
    interval: 100,
    maxDataPoints: dataPointCount,
    enabled: false,
  });

  // Sync stream data to context
  React.useEffect(() => {
    if (streamData.length > 0) {
      const lastPoint = streamData[streamData.length - 1];
      addDataPoint(lastPoint);
    }
  }, [streamData, addDataPoint]);

  const handleToggleStream = useCallback(() => {
    if (isStreaming) {
      stopStream();
    } else {
      startStream();
    }
  }, [isStreaming, startStream, stopStream]);

  const handleClearData = useCallback(() => {
    clearData();
    stopStream();
  }, [clearData, stopStream]);

  const chartData = useMemo(() => aggregatedData, [aggregatedData]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Performance Dashboard</h1>
        <div className="dashboard-controls">
          <button
            onClick={handleToggleStream}
            className={`control-button ${isStreaming ? 'danger' : ''}`}
          >
            {isStreaming ? 'Stop Stream' : 'Start Stream'}
          </button>
          <button onClick={handleClearData} className="control-button danger">
            Clear Data
          </button>
          <select
            value={dataPointCount}
            onChange={(e) => setDataPointCount(parseInt(e.target.value))}
            className="select-input"
            style={{ width: '150px' }}
          >
            <option value={1000}>1,000 points</option>
            <option value={5000}>5,000 points</option>
            <option value={10000}>10,000 points</option>
            <option value={50000}>50,000 points</option>
          </select>
        </div>
      </header>

      <div className="dashboard-main">
        <div className="dashboard-charts">
          <div className="chart-card">
            <h3 className="chart-title">Line Chart</h3>
            <LineChart data={chartData} width={800} height={300} />
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Bar Chart</h3>
            <BarChart data={chartData} width={800} height={300} />
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Scatter Plot</h3>
            <ScatterPlot data={chartData} width={800} height={300} />
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Heatmap</h3>
            <Heatmap data={chartData} width={800} height={300} />
          </div>

          <DataTable data={chartData} height={300} />
        </div>

        <div className="dashboard-sidebar">
          <PerformanceMonitor />
          <FilterPanel />
          <TimeRangeSelector />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ initialData }: { initialData: DataPoint[] }) {
  return (
    <DataProvider initialData={initialData}>
      <DashboardContent />
    </DataProvider>
  );
}

