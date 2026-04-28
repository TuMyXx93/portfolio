'use client';
import { useEffect, useState, useRef } from 'react';

interface Vitals {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  isGood: boolean;
  score: number;
}

interface UseWebVitalsReturn extends Vitals {}

function useWebVitals(): UseWebVitalsReturn | null {
  const vitalsRef = useRef<Vitals | null>(null);
  const [vitals, setVitals] = useState<Vitals | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialMetrics = {
      fcp: 0,
      lcp: 0,
      fid: 0,
      cls: 0,
      isGood: false,
      score: 0,
    };

    const calculateScore = (
      metrics: Omit<Vitals, 'isGood' | 'score'>
    ): number => {
      let score = 0;

      // FCP scoring (Good: < 1800ms, Needs Improvement: 1800ms - 3000ms, Poor: > 3000ms)
      if (metrics.fcp < 1800) score += 25;
      else if (metrics.fcp < 3000) score += 15;

      // LCP scoring (Good: < 2500ms, Needs Improvement: 2500ms - 4000ms, Poor: > 4000ms)
      if (metrics.lcp < 2500) score += 25;
      else if (metrics.lcp < 4000) score += 15;

      // FID scoring (Good: < 100ms, Needs Improvement: 100ms - 300ms, Poor: > 300ms)
      if (metrics.fid < 100) score += 25;
      else if (metrics.fid < 300) score += 15;

      // CLS scoring (Good: < 0.1, Needs Improvement: 0.1 - 0.25, Poor: > 0.25)
      if (metrics.cls < 0.1) score += 25;
      else if (metrics.cls < 0.25) score += 15;

      return score;
    };

    vitalsRef.current = {
      ...initialMetrics,
      isGood: true,
      score: calculateScore(initialMetrics),
    };

    // Use requestAnimationFrame to avoid synchronous state update
    const updateVitals = () => {
      if (vitalsRef.current) {
        setVitals(vitalsRef.current);
      }
    };

    requestAnimationFrame(updateVitals);

    // LCP observer
    const lcpObserver = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries() as PerformanceEntry[];
      const lastEntry = entries[entries.length - 1] as PerformancePaintTiming;
      if (vitalsRef.current) {
        vitalsRef.current.lcp = lastEntry.startTime;
        vitalsRef.current.score = calculateScore(vitalsRef.current);
        requestAnimationFrame(updateVitals);
      }
    });

    // FID observer
    const fidObserver = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries() as PerformanceEntry[];
      const firstEntry = entries[0] as PerformanceEventTiming;
      if (vitalsRef.current && firstEntry.processingStart !== undefined) {
        const fid = firstEntry.processingStart - firstEntry.startTime;
        vitalsRef.current.fid = fid;
        vitalsRef.current.score = calculateScore(vitalsRef.current);
        requestAnimationFrame(updateVitals);
      }
    });

    // CLS observer
    const clsObserver = new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries() as PerformanceEntry[]) {
        if (
          'hadRecentInput' in entry &&
          !(entry as any).hadRecentInput &&
          vitalsRef.current
        ) {
          vitalsRef.current.cls += (entry as any).value;
          vitalsRef.current.score = calculateScore(vitalsRef.current);
        }
      }
      requestAnimationFrame(updateVitals);
    });

    // FCP observer
    const fcpObserver = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries() as PerformanceEntry[];
      const firstEntry = entries[0] as PerformancePaintTiming;
      if (vitalsRef.current) {
        vitalsRef.current.fcp = firstEntry.startTime;
        vitalsRef.current.score = calculateScore(vitalsRef.current);
        requestAnimationFrame(updateVitals);
      }
    });

    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      fidObserver.observe({ type: 'first-input', buffered: true });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch {
      // Observers might not be supported
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return vitals;
}

interface PerformanceMonitorProps {
  showInDevelopment?: boolean;
}

export const PerformanceMonitor = ({
  showInDevelopment = false,
}: PerformanceMonitorProps) => {
  const vitals = useWebVitals();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && showInDevelopment) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [showInDevelopment]);

  if (!isVisible || !vitals) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMetricColor = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return 'text-green-500';
    if (value < thresholds[1]) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-xs backdrop-blur-sm">
      <div className="mb-2 font-bold">
        Performance Score:{' '}
        <span className={getScoreColor(vitals.score)}>{vitals.score}/100</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getMetricColor(vitals.fcp, [1800, 3000])}>
            {Math.round(vitals.fcp)}ms
          </span>
        </div>

        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getMetricColor(vitals.lcp, [2500, 4000])}>
            {Math.round(vitals.lcp)}ms
          </span>
        </div>

        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getMetricColor(vitals.fid, [100, 300])}>
            {Math.round(vitals.fid)}ms
          </span>
        </div>

        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getMetricColor(vitals.cls, [0.1, 0.25])}>
            {vitals.cls.toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
