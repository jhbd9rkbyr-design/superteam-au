"use client"

import { useState, useEffect, useCallback } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export function useDimensions(ref: React.RefObject<HTMLElement | null>): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions(prev => {
        if (prev.width === width && prev.height === height) return prev;
        return { width, height };
      });
    }
  }, [ref]);

  useEffect(() => {
    // Measure after mount
    updateDimensions();

    // Also measure on next frame to catch late layouts
    const raf = requestAnimationFrame(updateDimensions);

    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      cancelAnimationFrame(raf);
      clearTimeout(timeoutId);
    };
  }, [updateDimensions]);

  return dimensions;
}
