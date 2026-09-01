import { useEffect, useRef, useState } from "react";

/** Fades an element in once it scrolls into view. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

/** Tracks which tone-tagged section owns the viewport, for background shifts. */
export function useActiveTone(defaultTone: string) {
  const [tone, setTone] = useState(defaultTone);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const next = (best?.target as HTMLElement | undefined)?.dataset["tone"];
        if (next) setTone(next);
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: "-30% 0px -30% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return tone;
}
