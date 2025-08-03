'use client';
import { useEffect } from 'react';

interface AnalyticsEvent {
  name: string;
  parameters?: Record<string, any>;
}

interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_path: string;
}

class Analytics {
  private static instance: Analytics;
  private isInitialized = false;
  private queue: AnalyticsEvent[] = [];

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  initialize() {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Google Analytics 4 initialization
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    
    if (GA_MEASUREMENT_ID) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      (window as any).dataLayer = (window as any).dataLayer || [];
      const gtag = (...args: any[]) => {
        (window as any).dataLayer.push(args);
      };
      
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });

      // Make gtag available globally
      (window as any).gtag = gtag;
    }

    this.isInitialized = true;
    this.flushQueue();
  }

  private flushQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        this.trackEvent(event.name, event.parameters);
      }
    }
  }

  trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (!this.isInitialized) {
      this.queue.push({ name: eventName, parameters });
      return;
    }

    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, {
          ...parameters,
          timestamp: new Date().toISOString(),
        });
      }

      // Console log en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics Event:', eventName, parameters);
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  trackPageView(pageData: PageViewEvent) {
    this.trackEvent('page_view', pageData);
  }

  trackUserEngagement(engagementData: Record<string, any>) {
    this.trackEvent('user_engagement', engagementData);
  }

  trackPerformance(perfData: Record<string, any>) {
    this.trackEvent('web_vitals', perfData);
  }

  trackError(error: Error, context?: string) {
    this.trackEvent('exception', {
      description: error.message,
      fatal: false,
      context: context || 'unknown',
      stack: error.stack,
    });
  }
}

export function useAnalytics() {
  const analytics = Analytics.getInstance();

  useEffect(() => {
    analytics.initialize();
  }, [analytics]);

  return {
    trackEvent: (name: string, parameters?: Record<string, any>) => 
      analytics.trackEvent(name, parameters),
    
    trackPageView: (page: string, title?: string) => 
      analytics.trackPageView({
        page_title: title || document.title,
        page_location: window.location.href,
        page_path: page,
      }),
    
    trackClick: (element: string, location?: string) =>
      analytics.trackEvent('click', {
        element_id: element,
        location: location || window.location.pathname,
      }),
    
    trackFormSubmit: (formName: string, success: boolean) =>
      analytics.trackEvent('form_submit', {
        form_name: formName,
        success,
      }),
    
    trackDownload: (fileName: string, fileType: string) =>
      analytics.trackEvent('file_download', {
        file_name: fileName,
        file_extension: fileType,
        link_url: window.location.href,
      }),
    
    trackSocialShare: (platform: string, url: string) =>
      analytics.trackEvent('share', {
        method: platform,
        content_type: 'portfolio',
        item_id: url,
      }),
    
    trackSearch: (searchTerm: string, results?: number) =>
      analytics.trackEvent('search', {
        search_term: searchTerm,
        results_count: results,
      }),
    
    trackError: (error: Error, context?: string) =>
      analytics.trackError(error, context),
    
    trackTiming: (category: string, variable: string, value: number) =>
      analytics.trackEvent('timing_complete', {
        name: variable,
        value: Math.round(value),
        event_category: category,
      }),
  };
}

// Hook para tracking automático de eventos comunes
export function useAutoTracking() {
  const { trackClick, trackError, trackTiming } = useAnalytics();

  useEffect(() => {
    // Track clicks en elementos importantes
    const trackClickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickableElement = target.closest('a, button, [role="button"]');
      
      if (clickableElement) {
        const elementInfo = {
          tag: clickableElement.tagName.toLowerCase(),
          id: clickableElement.id || '',
          class: clickableElement.className || '',
          text: clickableElement.textContent?.slice(0, 50) || '',
        };
        
        trackClick(JSON.stringify(elementInfo));
      }
    };

    // Track errores no capturados
    const trackErrorHandler = (event: ErrorEvent) => {
      trackError(new Error(event.message), 'global_error_handler');
    };

    // Track tiempo de carga
    const trackLoadTiming = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const startTime = navigation.fetchStart || 0;
          trackTiming('page_load', 'dom_content_loaded', navigation.domContentLoadedEventEnd - startTime);
          trackTiming('page_load', 'load_complete', navigation.loadEventEnd - startTime);
        }
      }
    };

    document.addEventListener('click', trackClickHandler);
    window.addEventListener('error', trackErrorHandler);
    window.addEventListener('load', trackLoadTiming);

    return () => {
      document.removeEventListener('click', trackClickHandler);
      window.removeEventListener('error', trackErrorHandler);
      window.removeEventListener('load', trackLoadTiming);
    };
  }, [trackClick, trackError, trackTiming]);
}

export default useAnalytics;
