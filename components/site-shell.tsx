"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Phone, ArrowRight, Palette, RotateCcw, Check } from "lucide-react";
import { Brand } from "./brand";

type ThemeState = {
  primary: string;
  accent: string;
  hero: string;
};

const defaultTheme: ThemeState = {
  primary: "#5d56f1",
  accent: "#ff6b5f",
  hero: "#0d1025",
};

const presets: Array<{name:string; primary:string; accent:string; hero:string}> = [
  { name: "Indigo", primary: "#5d56f1", accent: "#ff6b5f", hero: "#0d1025" },
  { name: "Royal Blue", primary: "#2563eb", accent: "#22d3ee", hero: "#07152f" },
  { name: "Emerald", primary: "#059669", accent: "#f59e0b", hero: "#06251f" },
  { name: "Black Gold", primary: "#d4a94f", accent: "#f0c96a", hero: "#101010" },
  { name: "Ruby", primary: "#e11d48", accent: "#fb7185", hero: "#240812" },
];

function applyTheme(theme: ThemeState) {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-accent", theme.accent);
  root.style.setProperty("--theme-hero", theme.hero);
}

export function Header() {
  const [open,setOpen]=useState(false);
  const [themeOpen,setThemeOpen]=useState(false);
  const [theme,setTheme]=useState<ThemeState>(defaultTheme);

  useEffect(()=>{
    try {
      const saved=localStorage.getItem("savrdh-instant-theme");
      if(saved){
        const parsed=JSON.parse(saved) as ThemeState;
        setTheme(parsed);
        applyTheme(parsed);
      } else {
        applyTheme(defaultTheme);
      }
    } catch {
      applyTheme(defaultTheme);
    }
  },[]);

  const updateTheme=(next:ThemeState)=>{
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("savrdh-instant-theme",JSON.stringify(next));
  };

  const updateColor=(key:keyof ThemeState,value:string)=>{
    updateTheme({...theme,[key]:value});
  };

  const resetTheme=()=>{
    updateTheme(defaultTheme);
  };

  return (
    <header className="site-header nova-header">
      <div className="container nav-row">
        <Brand light />
        <nav className={open?"main-nav is-open":"main-nav"} aria-label="Main navigation">
          <Link href="/#personal-loan" onClick={()=>setOpen(false)}>Personal loan</Link>
          <Link href="/#calculator" onClick={()=>setOpen(false)}>EMI calculator</Link>
          <Link href="/#how-it-works" onClick={()=>setOpen(false)}>How it works</Link>
          <Link href="/track" onClick={()=>setOpen(false)}>Track application</Link>
        </nav>
        <div className="nav-actions">
          <a className="nav-phone" href="tel:+918109995906"><Phone size={15}/>8109995906</a>

          <div className="theme-control">
            <button
              className="theme-toggle"
              type="button"
              aria-label="Change website colors"
              aria-expanded={themeOpen}
              onClick={()=>setThemeOpen(!themeOpen)}
            >
              <Palette size={17}/>
              <span>Colors</span>
            </button>

            {themeOpen && (
              <div className="theme-popover">
                <div className="theme-popover-head">
                  <div>
                    <strong>Website colors</strong>
                    <small>Choose any colors you like</small>
                  </div>
                  <button className="theme-reset" type="button" onClick={resetTheme} title="Reset colors">
                    <RotateCcw size={15}/>
                  </button>
                </div>

                <div className="theme-presets">
                  {presets.map((preset)=>{
                    const active=
                      theme.primary===preset.primary &&
                      theme.accent===preset.accent &&
                      theme.hero===preset.hero;
                    return (
                      <button
                        type="button"
                        className={active?"theme-preset active":"theme-preset"}
                        key={preset.name}
                        onClick={()=>updateTheme({primary:preset.primary,accent:preset.accent,hero:preset.hero})}
                      >
                        <span className="preset-dots">
                          <i style={{background:preset.hero}}/>
                          <i style={{background:preset.primary}}/>
                          <i style={{background:preset.accent}}/>
                        </span>
                        <span>{preset.name}</span>
                        {active && <Check size={14}/>}
                      </button>
                    );
                  })}
                </div>

                <div className="theme-custom">
                  <label>
                    <span>Primary</span>
                    <input type="color" value={theme.primary} onChange={e=>updateColor("primary",e.target.value)}/>
                    <code>{theme.primary}</code>
                  </label>
                  <label>
                    <span>Accent</span>
                    <input type="color" value={theme.accent} onChange={e=>updateColor("accent",e.target.value)}/>
                    <code>{theme.accent}</code>
                  </label>
                  <label>
                    <span>Hero background</span>
                    <input type="color" value={theme.hero} onChange={e=>updateColor("hero",e.target.value)}/>
                    <code>{theme.hero}</code>
                  </label>
                </div>
                <p className="theme-note">Your selected colors are saved on this browser.</p>
              </div>
            )}
          </div>

          <Link href="/apply" className="nova-nav-cta">Apply now <ArrowUpRight size={16}/></Link>
          <button className="menu-toggle icon-button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>
            {open?<X/>:<Menu/>}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer nova-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand light/>
            <p>Small-ticket personal finance assistance for salaried professionals and business owners.</p>
            <small>A brand product of Savrdh Financial Services Private Limited.</small>
          </div>
          <div>
            <h4>Instant loan</h4>
            <Link href="/#personal-loan">Personal loan</Link>
            <Link href="/#calculator">EMI calculator</Link>
            <Link href="/apply">Apply now</Link>
            <Link href="/track">Track application</Link>
          </div>
          <div>
            <h4>Support</h4>
            <a className="footer-phone" href="tel:+918109995906">+91 8109995906 <ArrowUpRight size={18}/></a>
            <a href="https://wa.me/918109995906" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <ArrowRight size={15}/></a>
            <Link href="/login">Team CRM login</Link>
          </div>
        </div>
        <div className="footer-disclosure">
          Savrdh Instant Loan provides loan application and credit facilitation assistance. Loan approval, sanctioned amount, pricing, tenure and disbursement are determined by the lending institution after assessment. “Instant” refers to the digital application experience and does not mean guaranteed approval or immediate funding.
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Savrdh Financial Services Private Limited.</span>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms of use</Link></div>
          <span>Personal loan range ₹5,000 — ₹3,00,000</span>
        </div>
      </div>
    </footer>
  );
}
