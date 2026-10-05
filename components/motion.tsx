"use client";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  MotionConfig,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
export { m, useReducedMotion, AnimatePresence };

type MotionStyle = "rise" | "fade" | "zoom" | "slide" | "none";
type MotionIntensity = "low" | "medium" | "high";

type MotionPrefs = {
  style: MotionStyle;
  intensity: MotionIntensity;
};

const defaults: MotionPrefs = { style: "rise", intensity: "high" };
const MotionPrefsContext = createContext<MotionPrefs>(defaults);

function readPrefs(): MotionPrefs {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem("savrdh-motion-prefs");
    if (!raw) return defaults;
    const saved = JSON.parse(raw) as Partial<MotionPrefs>;
    return {
      style: saved.style ?? defaults.style,
      intensity: saved.intensity ?? defaults.intensity,
    };
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
    const duration = prefs.intensity === "low" ? 0.4 : prefs.intensity === "high" ? 0.82 : 0.6;
    return { duration, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };
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

export function SiteMotionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 24, mass: 0.16 });
  const leftY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const routeRotate = useTransform(scrollYProgress, [0, 1], [0, 42]);

  return (
    <div className="site-motion-root">
      {!reduce && (
        <>
          <m.div className="site-scroll-progress" style={{ scaleX }} />
          <div className="global-motion-layer" aria-hidden="true">
            <m.i
              className="global-motion-orb global-motion-orb-a"
              animate={{ x: [0, 90, -30, 0], y: [0, -46, 65, 0], scale: [1, 1.18, .94, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <m.i
              className="global-motion-orb global-motion-orb-b"
              animate={{ x: [0, -75, 34, 0], y: [0, 55, -42, 0], scale: [1, .9, 1.14, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <m.i
              className="global-motion-line global-motion-line-a"
              animate={{ x: ["-18%", "118%"], opacity: [0, .8, .8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
            />
            <m.i className="global-motion-coin global-motion-coin-left" style={{ y: leftY, rotate: routeRotate }} animate={{ rotateY: [0,180,360] }} transition={{duration:7,repeat:Infinity,ease:"linear"}} />
            <m.i className="global-motion-coin global-motion-coin-right" style={{ y: rightY }} animate={{ rotateX: [0,180,360], rotateZ:[0,20,0] }} transition={{duration:8.5,repeat:Infinity,ease:"linear"}} />
          </div>
        </>
      )}

      <AnimatePresence mode="wait" initial>
        <m.div
          key={pathname}
          className="route-motion-stage"
          initial={reduce ? false : { opacity: 0, y: 28, scale: .992, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={reduce ? undefined : { opacity: 0, y: -18, scale: .994, filter: "blur(8px)" }}
          transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </div>
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

  const distance = prefs.intensity === "low" ? 18 : prefs.intensity === "high" ? 60 : 34;
  const scale = prefs.intensity === "low" ? 0.99 : prefs.intensity === "high" ? 0.92 : 0.96;

  const initial = useMemo(() => {
    if (reduce || prefs.style === "none") return false as const;
    if (prefs.style === "fade") return { opacity: 0, filter: "blur(12px)" };
    if (prefs.style === "zoom") return { opacity: 0, scale, filter: "blur(10px)" };
    if (prefs.style === "slide") return { opacity: 0, x: -distance, filter: "blur(10px)" };
    return { opacity: 0, y: distance, scale: .985, filter: "blur(10px)" };
  }, [reduce, prefs.style, distance, scale]);

  const duration = prefs.intensity === "low" ? 0.46 : prefs.intensity === "high" ? 0.9 : 0.64;

  return (
    <m.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.18, margin: "-7% 0px -7% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
