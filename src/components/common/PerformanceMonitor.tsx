'use client';
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

interface WebVitalsData extends PerformanceMetrics {
  isGood: boolean;
  score: number;
}

export function useWebVitals(): WebVitalsData | null {
  const [vitals, setVitals] = useState<WebVitalsData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      let fcp = 0;
      const fcpEntry = paint.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) fcp = fcpEntry.startTime;

      const metrics: PerformanceMetrics = {
        fcp,
        lcp: 0, // Se actualizará con el observer
        fid: 0, // Se actualizará con el observer
        cls: 0, // Se actualizará con el observer
        ttfb: navigation ? navigation.responseStart - navigation.requestStart : 0,
      };

      return metrics;
    };

    // Observador para LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry) {
        setVitals(prev => prev ? { ...prev, lcp: lastEntry.startTime } : null);
      }
    });

    // Observador para FID
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        setVitals(prev => prev ? { ...prev, fid: entry.processingStart - entry.startTime } : null);
      });
    });

    // Observador para CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setVitals(prev => prev ? { ...prev, cls: clsValue } : null);
        }
      });
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance observers not supported:', error);
    }

    // Medición inicial
    const initialMetrics = measurePerformance();
    
    const calculateScore = (metrics: PerformanceMetrics) => {
      let score = 0;
      
      // FCP scoring (Good: < 1.8s, Needs Improvement: 1.8s - 3s, Poor: > 3s)
      if (metrics.fcp < 1800) score += 25;
      else if (metrics.fcp < 3000) score += 15;
      
      // LCP scoring (Good: < 2.5s, Needs Improvement: 2.5s - 4s, Poor: > 4s)
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

    setVitals({
      ...initialMetrics,
      isGood: true,
      score: calculateScore(initialMetrics),
    });

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

export const PerformanceMonitor = ({ showInDevelopment = false }: PerformanceMonitorProps) => {
  const vitals = useWebVitals();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    setIsVisible(isDevelopment && showInDevelopment);
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
        Performance Score: <span className={getScoreColor(vitals.score)}>{vitals.score}/100</span>
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
          <span className={getMetricColor(vitals.cls * 1000, [100, 250])}>
            {vitals.cls.toFixed(3)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={getMetricColor(vitals.ttfb, [800, 1800])}>
            {Math.round(vitals.ttfb)}ms
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
