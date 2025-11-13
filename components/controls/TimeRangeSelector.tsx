'use client';

import React, { useCallback } from 'react';
import { useData } from '@/components/providers/DataProvider';
import { AGGREGATION_PERIODS } from '@/lib/types';

export default function TimeRangeSelector() {
  const { aggregationPeriod, setAggregationPeriod, setTimeRange } = useData();

  const handleAggregationChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setAggregationPeriod(value ? parseInt(value) : null);
    },
    [setAggregationPeriod]
  );

  const handleTimeRangePreset = useCallback(
    (minutes: number) => {
      const now = Date.now();
      setTimeRange({
        start: now - minutes * 60 * 1000,
        end: now,
      });
    },
    [setTimeRange]
  );

  const handleClearTimeRange = useCallback(() => {
    setTimeRange(null);
  }, [setTimeRange]);

  return (
    <div className="time-range-selector">
      <h3 className="selector-title">Time Range & Aggregation</h3>

      <div className="selector-section">
        <label className="selector-label">Aggregation Period</label>
        <select
          value={aggregationPeriod || ''}
          onChange={handleAggregationChange}
          className="select-input"
        >
          <option value="">None</option>
          {AGGREGATION_PERIODS.map((period) => (
            <option key={period.milliseconds} value={period.milliseconds}>
              {period.label}
            </option>
          ))}
        </select>
      </div>

      <div className="selector-section">
        <label className="selector-label">Quick Time Range</label>
        <div className="time-range-buttons">
          <button onClick={() => handleTimeRangePreset(5)} className="time-button">
            5 min
          </button>
          <button onClick={() => handleTimeRangePreset(15)} className="time-button">
            15 min
          </button>
          <button onClick={() => handleTimeRangePreset(30)} className="time-button">
            30 min
          </button>
          <button onClick={() => handleTimeRangePreset(60)} className="time-button">
            1 hour
          </button>
          <button onClick={handleClearTimeRange} className="time-button clear">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

