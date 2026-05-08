"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  return (
    <div ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0"
          style={{ lineHeight: "inherit" }}
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            style={{ lineHeight: "inherit" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{
              duration: 1.05,
              ease: [0.2, 0.7, 0.2, 1],
              delay: delay + i * stagger,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
