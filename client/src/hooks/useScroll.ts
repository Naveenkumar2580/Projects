import { useState, useEffect, useCallback } from 'react';

interface UseScrollOptions {
  threshold?: number;
  disableOnSmallScreens?: boolean;
}

export function useScroll({
  threshold = 100,
  disableOnSmallScreens = false
}: UseScrollOptions = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [prevScroll, setPrevScroll] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determine scroll direction
    if (currentScrollY > prevScroll) {
      setDirection('down');
    } else if (currentScrollY < prevScroll) {
      setDirection('up');
    }
    
    setScrollY(currentScrollY);
    setScrolled(currentScrollY > threshold);
    setPrevScroll(currentScrollY);
  }, [prevScroll, threshold]);

  useEffect(() => {
    if (disableOnSmallScreens && window.innerWidth < 768) {
      return;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, disableOnSmallScreens]);

  return { scrolled, scrollY, direction };
}
