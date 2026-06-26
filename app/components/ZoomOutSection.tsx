import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type ZoomOutSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ZoomOutSection({
  children,
  className = "",
  delay = 0,
}: ZoomOutSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(1.08)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}