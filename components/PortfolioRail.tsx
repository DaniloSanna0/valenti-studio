"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Item = { tag: string; title: string; img: string };

const STEP_INTERVAL = 3800; // ms tra uno scatto e l'altro
const STEP_DURATION = 1100; // ms di animazione di scorrimento

// easing morbido (easeInOutCubic) — accompagna senza scattare
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function PortfolioRail({ items }: { items: Item[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Duplichiamo le immagini per loop seamless
  const loop = [...items, ...items];

  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const animRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  /* ------- helpers ------- */
  const cancelAnim = () => {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  };

  const animateTo = (target: number) => {
    const el = railRef.current;
    if (!el) return;
    cancelAnim();
    const start = el.scrollLeft;
    const delta = target - start;
    const startTime = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / STEP_DURATION);
      const eased = easeInOutCubic(p);
      el.scrollLeft = start + delta * eased;
      if (p < 1 && !draggingRef.current) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        animRef.current = null;
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const stepNext = () => {
    const el = railRef.current;
    if (!el) return;

    const half = el.scrollWidth / 2;
    // Loop seamless: se siamo oltre metà, torniamo indietro istantaneamente
    if (el.scrollLeft >= half - 2) {
      el.scrollLeft = el.scrollLeft - half;
    }

    const current = el.scrollLeft;
    const next = itemRefs.current.find(
      (li) => li && li.offsetLeft > current + 4
    );
    if (next) animateTo(next.offsetLeft);
  };

  /* ------- TIMER AUTO ------- */
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current && !draggingRef.current) stepNext();
    }, STEP_INTERVAL);
    return () => {
      window.clearInterval(id);
      cancelAnim();
    };
  }, []);

  /* ------- VISIBILITY PAUSE ------- */
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { pausedRef.current = !entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ------- DRAG (mouse / pen) ------- */
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      cancelAnim();
      draggingRef.current = true;
      setIsDragging(true);
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startX;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setIsDragging(false);
      try { el.releasePointerCapture(e.pointerId); } catch {}
      // dopo il drag, snap all'item più vicino
      const current = el.scrollLeft;
      const nearest = itemRefs.current.reduce<HTMLLIElement | null>((best, li) => {
        if (!li) return best;
        if (!best) return li;
        return Math.abs(li.offsetLeft - current) < Math.abs(best.offsetLeft - current)
          ? li
          : best;
      }, null);
      if (nearest) animateTo(nearest.offsetLeft);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, []);

  /* ------- HOVER PAUSE ------- */
  const onEnter = () => { pausedRef.current = true; };
  const onLeave = () => { pausedRef.current = false; };

  return (
    <div
      ref={railRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`no-scrollbar overflow-x-auto overflow-y-hidden select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ scrollBehavior: "auto" }}
    >
      <ul className="flex gap-6 md:gap-10 pl-6 md:pl-10 lg:pl-16 pr-6">
        {loop.map((p, i) => (
          <li
            key={`${p.title}-${i}`}
            ref={(el) => { itemRefs.current[i] = el; }}
            className={`shrink-0 ${i % 2 === 0 ? "md:mt-0" : "md:mt-24"}`}
          >
            <a
              href="#"
              draggable={false}
              onClick={(e) => { if (isDragging) e.preventDefault(); }}
              className="block group"
            >
              <figure className="hover-img relative overflow-hidden bg-line w-[78vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] aspect-[4/5]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  draggable={false}
                  quality={100}
                  sizes="(min-width:1536px) 30vw, (min-width:1024px) 32vw, (min-width:768px) 42vw, 78vw"
                  className="object-cover pointer-events-none"
                />
              </figure>
              <figcaption className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-editorial text-ash">
                <span>
                  {String((i % items.length) + 1).padStart(2, "0")} · {p.tag}
                </span>
                <span className="font-serif normal-case tracking-normal text-bone text-base">
                  {p.title}
                </span>
              </figcaption>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
