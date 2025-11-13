'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { DataPoint } from '@/lib/types';
import { useVirtualization } from '@/hooks/useVirtualization';

interface DataTableProps {
  data: DataPoint[];
  height?: number;
}

// Format date consistently (client-side only)
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export default function DataTable({ data, height = 400 }: DataTableProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.timestamp - a.timestamp);
  }, [data]);

  const { visibleItems: visibleSortedItems, totalHeight: sortedTotalHeight, offsetY: sortedOffsetY, handleScroll: handleSortedScroll } = useVirtualization(
    sortedData,
    {
      itemHeight: 40,
      containerHeight: height,
      overscan: 5,
    }
  );

  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <h3>Data Points ({data.length})</h3>
      </div>
      <div
        className="data-table-scroll"
        style={{ height, overflow: 'auto' }}
        onScroll={handleSortedScroll}
      >
        <div style={{ height: sortedTotalHeight, position: 'relative' }}>
          <div
            style={{
              transform: `translateY(${sortedOffsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Category</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {visibleSortedItems.map(({ item, index }) => (
                  <tr key={`${item.timestamp}-${index}`}>
                    <td>{isMounted ? formatDate(item.timestamp) : '--'}</td>
                    <td>{item.category}</td>
                    <td>{item.value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

