import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window { gtag?: (...args: any[]) => void; }
}

const usePageview = (measurementId?: string) => {
  const location = useLocation();

  useEffect(() => {
    if (!import.meta.env.PROD) return;         // only in production
    if (!measurementId) return;                // need an ID

    if (typeof window.gtag === 'function') {
      window.gtag('config', measurementId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search, measurementId]);
};

export default usePageview;
