import { useEffect, useRef, useState } from 'react';

/**
 * useIntersectionObserver — fires once when element enters viewport
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/**
 * useCountUp — animate a number from 0 to target when visible
 */
export function useCountUp(target, duration = 2000, isVisible = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

/**
 * useReveal — returns a ref and className for section reveal animations
 */
export function useReveal(delay = 0) {
  const [ref, isVisible] = useIntersectionObserver();
  const className = `reveal${isVisible ? ' visible' : ''}${delay ? ` delay-${delay}` : ''}`;
  return [ref, className];
}
