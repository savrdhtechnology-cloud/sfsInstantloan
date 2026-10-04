"use client";
import {
  LazyMotion,
  domAnimation,
  MotionConfig,
  m,
  useReducedMotion,
} from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
export { m, useReducedMotion };

type MotionStyle = "rise" | "fade" | "zoom" | "slide" | "none";
type MotionIntensity = "low" | "medium" | "high";

type MotionPrefs = {
  style: MotionStyle;
  intensity: MotionIntensity;
};

const defaults: MotionPrefs = { style: "rise", intensity: "medium" };
const MotionPrefsContext = createContext<MotionPrefs>(defaults);

function readPrefs(): MotionPrefs {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem("savrdh-motion-prefs");
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) } as MotionPrefs;
  } catch {
    return defaults;
  }
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<MotionPrefs>(defaults);

  useEffect(() => {
    const sync = () => setPrefs(readPrefs());
    sync();
    window.addEventListener("savrdh-customizer-update", sync);
    return () => window.removeEventListener("savrdh-customizer-update", sync);
  }, []);

  const transition = useMemo(() => {
    const duration = prefs.intensity === "low" ? 0.35 : prefs.intensity === "high" ? 0.85 : 0.55;
    return { duration, ease: [0.2, 0.65, 0.3, 1] as [number, number, number, number] };
  }, [prefs.intensity]);

  return (
    <MotionPrefsContext.Provider value={prefs}>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion={prefs.style === "none" ? "always" : "user"} transition={transition}>
          {children}
        </MotionConfig>
      </LazyMotion>
    </MotionPrefsContext.Provider>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const prefs = useContext(MotionPrefsContext);

  const distance = prefs.intensity === "low" ? 12 : prefs.intensity === "high" ? 42 : 24;
  const scale = prefs.intensity === "low" ? 0.98 : prefs.intensity === "high" ? 0.90 : 0.95;

  const initial = useMemo(() => {
    if (reduce || prefs.style === "none") return false as const;
    if (prefs.style === "fade") return { opacity: 0 };
    if (prefs.style === "zoom") return { opacity: 0, scale };
    if (prefs.style === "slide") return { opacity: 0, x: -distance };
    return { opacity: 0, y: distance };
  }, [reduce, prefs.style, distance, scale]);

  const duration = prefs.intensity === "low" ? 0.35 : prefs.intensity === "high" ? 0.85 : 0.55;

  return (
    <m.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration, delay, ease: [0.2, 0.65, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
