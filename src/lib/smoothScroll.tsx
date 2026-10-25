import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

// Lenis gives the page inertial, frame-synced scrolling so the scroll-linked
// phone explosion feels like one continuous motion rather than stepped wheel
// ticks. It is disabled automatically when the user prefers reduced motion.

const LenisCtx = createContext<{ scrollTo: (target: string | HTMLElement, offset?: number) => void }>({
  scrollTo: () => {},
});

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, offset = 0) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
      return;
    }
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return <LenisCtx.Provider value={{ scrollTo }}>{children}</LenisCtx.Provider>;
}

export const useSmoothScroll = () => useContext(LenisCtx);
