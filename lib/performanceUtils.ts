/**
 * Performance monitoring and optimization utilities
 */

export interface FrameMetrics {
  timestamp: number;
  renderTime: number;
  frameCount: number;
}

export class PerformanceMonitor {
  private frameCount: number = 0;
  private lastFrameTime: number = performance.now();
  private fpsHistory: number[] = [];
  private renderTimeHistory: number[] = [];
  private readonly historySize: number = 60; // Keep last 60 frames

  /**
   * Measures frame performance
   */
  measureFrame(renderTime: number): void {
    this.frameCount++;
    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    const fps = deltaTime > 0 ? 1000 / deltaTime : 0;
    this.fpsHistory.push(fps);
    this.renderTimeHistory.push(renderTime);

    // Keep history size limited
    if (this.fpsHistory.length > this.historySize) {
      this.fpsHistory.shift();
      this.renderTimeHistory.shift();
    }
  }

  /**
   * Gets current FPS (average over recent frames)
   */
  getFPS(): number {
    if (this.fpsHistory.length === 0) return 0;
    const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.fpsHistory.length);
  }

  /**
   * Gets average render time
   */
  getAverageRenderTime(): number {
    if (this.renderTimeHistory.length === 0) return 0;
    const sum = this.renderTimeHistory.reduce((a, b) => a + b, 0);
    return sum / this.renderTimeHistory.length;
  }

  /**
   * Gets memory usage (if available)
   */
  getMemoryUsage(): number {
    if ('memory' in performance) {
      const mem = (performance as any).memory;
      return mem.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }

  /**
   * Resets metrics
   */
  reset(): void {
    this.frameCount = 0;
    this.fpsHistory = [];
    this.renderTimeHistory = [];
    this.lastFrameTime = performance.now();
  }
}

/**
 * Throttles function calls using requestAnimationFrame
 */
export function throttleRAF<T extends (...args: any[]) => void>(
  fn: T
): T {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  const throttled = ((...args: Parameters<T>) => {
    lastArgs = args;
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          fn(...lastArgs);
        }
        rafId = null;
        lastArgs = null;
      });
    }
  }) as T;

  return throttled;
}

/**
 * Debounces function calls
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T {
  let timeoutId: NodeJS.Timeout | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  }) as T;

  return debounced;
}


