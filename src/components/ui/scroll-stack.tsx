import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './scroll-stack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  // Cache element offsets to avoid transform-induced jitter
  const offsetsCacheRef = useRef(new WeakMap());
  const resizeObserverRef = useRef(null);
  const windowScrollListenerAddedRef = useRef(false);
  const isCoarsePointerRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        const cached = offsetsCacheRef.current.get(element);
        if (typeof cached === 'number') return cached;
        const rect = element.getBoundingClientRect();
        const value = rect.top + window.scrollY;
        offsetsCacheRef.current.set(element, value);
        return value;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight, scrollContainer } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const disableHeavy = isCoarsePointerRef.current === true;
      const scale = disableHeavy ? 1 : 1 - scaleProgress * (1 - targetScale);
      const rotation = disableHeavy ? 0 : (rotationAmount ? i * rotationAmount * scaleProgress : 0);

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        // Use more stable calculation to reduce jitter
        const baseOffset = stackPositionPx + itemStackDistance * i;
        translateY = scrollTop - cardTop + baseOffset;
      } else if (scrollTop > pinEnd) {
        const baseOffset = stackPositionPx + itemStackDistance * i;
        translateY = pinEnd - cardTop + baseOffset;
      }

      const newTransform = {
        // Use whole pixels to avoid subpixel rounding jitter in some Chromium forks
        translateY: Math.round(translateY),
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1;

      if (hasChanged) {
        const transform = isCoarsePointerRef.current
          ? `translate3d(0, ${newTransform.translateY}px, 0)`
          : `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.transform = transform;
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      isCoarsePointerRef.current = isCoarse;
      // On coarse/touch devices, skip Lenis and rely on native scroll + rAF
      if (isCoarse) {
        if (!windowScrollListenerAddedRef.current) {
          window.addEventListener('scroll', handleScroll, { passive: true });
          windowScrollListenerAddedRef.current = true;
        }
        animationFrameRef.current = requestAnimationFrame(() => updateCardTransforms());
        (lenisRef.current as any) = { __native: true, destroy: () => {} } as any;
        (window as any).lenis = undefined;
        return lenisRef.current as any;
      }
      const lenis = new Lenis({
        duration: prefersReduced ? 0.6 : 1.0,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: isFinePointer,
        touchMultiplier: 1.5,
        infinite: false,
        wheelMultiplier: 0.7,
        lerp: prefersReduced ? 0.04 : 0.06,
        syncTouch: false
      });

      lenis.on('scroll', handleScroll);

      // Mobile/touch fallback: also listen to native window scroll so transforms
      // update even when smooth scrolling is disabled
      if (!isFinePointer && !windowScrollListenerAddedRef.current) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        windowScrollListenerAddedRef.current = true;
      }

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      // Expose Lenis instance globally for navigation
      (window as any).lenis = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: prefersReduced ? 0.6 : 1.0,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: isFinePointer,
        touchMultiplier: 1.5,
        infinite: false,
        gestureOrientationHandler: true,
        normalizeWheel: true,
        wheelMultiplier: 0.7,
        touchInertiaMultiplier: 28,
        lerp: prefersReduced ? 0.04 : 0.06,
        syncTouch: false,
        touchInertia: 0.55
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      // Expose Lenis instance globally for navigation
      (window as any).lenis = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
      // Strengthen isolation to reduce layout thrash in some browsers
      (card as any).style.contain = 'layout paint style';
      // Precompute and cache offsets up front for stability
      if (useWindowScroll) {
        const rect = card.getBoundingClientRect();
        offsetsCacheRef.current.set(card, rect.top + window.scrollY);
      }
    });

    // Also cache the end spacer position
    if (useWindowScroll) {
      const endEl = document.querySelector('.scroll-stack-end');
      if (endEl) {
        const rect = endEl.getBoundingClientRect();
        offsetsCacheRef.current.set(endEl, rect.top + window.scrollY);
      }
    }

    setupLenis();

    // Recalculate cached offsets on resize/orientation to avoid jitter
    const handleResize = () => {
      lastTransformsRef.current.clear();
      offsetsCacheRef.current = new WeakMap();
      // Pre-cache again after a tick
      requestAnimationFrame(() => {
        cardsRef.current.forEach((card: any) => {
          if (useWindowScroll) {
            const rect = card.getBoundingClientRect();
            offsetsCacheRef.current.set(card, rect.top + window.scrollY);
          }
        });
        const endEl = useWindowScroll ? document.querySelector('.scroll-stack-end') : scrollerRef.current?.querySelector('.scroll-stack-end');
        if (endEl && useWindowScroll) {
          const rect = (endEl as Element).getBoundingClientRect();
          offsetsCacheRef.current.set(endEl as Element, rect.top + window.scrollY);
        }
        updateCardTransforms();
      });
    };
    // Observe layout changes to invalidate cache
    if (useWindowScroll && 'ResizeObserver' in window) {
      const ro = new ResizeObserver(() => handleResize());
      resizeObserverRef.current = ro as any;
      const container = document.querySelector('.scroll-stack-inner');
      if (container) ro.observe(container);
      cards.forEach(card => ro.observe(card));
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (windowScrollListenerAddedRef.current) {
        window.removeEventListener('scroll', handleScroll as any);
        windowScrollListenerAddedRef.current = false;
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeObserverRef.current) {
        try {
          resizeObserverRef.current.disconnect();
        } catch {}
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
      offsetsCacheRef.current = new WeakMap();
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;