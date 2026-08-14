import { useEffect, useRef, useState } from "react";

/**
 * Fades and slides children into view the first time they cross the
 * viewport threshold. Built on IntersectionObserver so it costs nothing
 * on scroll (no scroll-event listeners) and only fires once per element.
 *
 * @param {"up"|"down"|"left"|"right"|"none"} direction - entry direction
 * @param {number} delay - ms to wait before starting the transition
 * @param {number} threshold - fraction of the element visible before firing (0–1)
 * @param {string} className - extra classes merged onto the wrapper
 */
export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  threshold = 0.15,
  className = "",
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const offset = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  }[direction];

  return (
    <div
      ref={ref}
      style={{ willChange: "transform, opacity", transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${offset}`
      } ${className}`}
    >
      {children}
    </div>
  );
}