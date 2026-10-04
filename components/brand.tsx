"use client";
import Link from "next/link";
import { m, useReducedMotion } from "./motion";

export function Brand({ light = false }: { light?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <Link
      href="/"
      className={`brand animated-brand ${light ? "brand-light" : ""}`}
      aria-label="Savrdh Instant Loan home"
    >
      <m.span
        className="brand-mark animated-brand-mark"
        initial={reduce ? false : { opacity: 0, scale: .75, rotate: -8 }}
        animate={reduce ? {} : { opacity: 1, scale: 1, rotate: 0 }}
        whileHover={reduce ? {} : { rotate: [0, -4, 4, 0], scale: 1.04 }}
        transition={{ duration: .6, ease: [0.2, .7, .2, 1] }}
      >
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <m.path
            d="M33 12H21c-12 0-12 12-2 12h10c10 0 10 12-2 12H15"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={reduce ? {} : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: .12, ease: "easeInOut" }}
          />
          <m.path
            d="m29 7 7 5-7 5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={reduce ? {} : { pathLength: 1, opacity: 1 }}
            transition={{ duration: .7, delay: .7 }}
          />
        </svg>
        <m.i
          className="brand-shine"
          aria-hidden="true"
          animate={reduce ? {} : { x: ["-160%", "190%"] }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
        />
      </m.span>
      <span className="brand-copy">
        <m.strong
          initial={reduce ? false : { opacity: 0, x: -8 }}
          animate={reduce ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: .5, delay: .25 }}
        >
          SAVRDH<span className="brand-dot">.</span>
        </m.strong>
        <m.small
          initial={reduce ? false : { opacity: 0, letterSpacing: ".42em" }}
          animate={reduce ? {} : { opacity: 1, letterSpacing: ".3em" }}
          transition={{ duration: .7, delay: .4 }}
        >
          INSTANT LOAN
        </m.small>
      </span>
    </Link>
  );
}
