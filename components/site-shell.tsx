"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight, Menu, X, Phone, ArrowRight, SlidersHorizontal, RotateCcw,
  Palette, WandSparkles, Type, Check
} from "lucide-react";
import { Brand } from "./brand";

type ThemeState = {
  primary: string;
  accent: string;
  hero: string;
  personal: string;
  process: string;
  benefits: string;
  calculator: string;
  safety: string;
  faq: string;
  closing: string;
  footer: string;
};

type MotionStyle = "rise" | "fade" | "zoom" | "slide" | "none";
type MotionIntensity = "low" | "medium" | "high";
type TextEffect = "none" | "gradient" | "glow" | "outline" | "shadow";

const defaultTheme: ThemeState = {
  primary: "#5d56f1",
  accent: "#ff6b5f",
  hero: "#0d1025",
  personal: "#f8f5ef",
  process: "#10142d",
  benefits: "#f3f0fa",
  calculator: "#f8f5ef",
  safety: "#ffffff",
  faq: "#f4f1f8",
  closing: "#5d56f1",
  footer: "#0b0e21",
};

const sectionFields: Array<{key:keyof ThemeState; label:string}> = [
  {key:"hero",label:"Hero"},
  {key:"personal",label:"Personal Loan"},
  {key:"process",label:"How It Works"},
  {key:"benefits",label:"Benefits"},
  {key:"calculator",label:"EMI Calculator"},
  {key:"safety",label:"Safety"},
  {key:"faq",label:"FAQ"},
  {key:"closing",label:"Bottom CTA"},
  {key:"footer",label:"Footer"},
];

const presets = [
  { name:"Indigo Coral", primary:"#5d56f1", accent:"#ff6b5f", hero:"#0d1025" },
  { name:"Royal Blue", primary:"#2563eb", accent:"#22d3ee", hero:"#07152f" },
  { name:"Emerald Amber", primary:"#059669", accent:"#f59e0b", hero:"#06251f" },
  { name:"Black Gold", primary:"#d4a94f", accent:"#f0c96a", hero:"#101010" },
];

function applyTheme(theme: ThemeState) {
  const root=document.documentElement;
  Object.entries(theme).forEach(([key,value])=>{
    root.style.setProperty(`--theme-${key}`,value);
  });
}

function applyTextEffect(effect: TextEffect) {
  document.documentElement.dataset.textEffect=effect;
}

export function Header() {
  const [open,setOpen]=useState(false);
  const [panelOpen,setPanelOpen]=useState(false);
  const [tab,setTab]=useState<"colors"|"motion"|"text">("colors");
  const [theme,setTheme]=useState<ThemeState>(defaultTheme);
  const [motionStyle,setMotionStyle]=useState<MotionStyle>("rise");
  const [motionIntensity,setMotionIntensity]=useState<MotionIntensity>("medium");
  const [textEffect,setTextEffect]=useState<TextEffect>("none");

  useEffect(()=>{
    try {
      const savedTheme=localStorage.getItem("savrdh-instant-theme");
      const savedMotion=localStorage.getItem("savrdh-motion-prefs");
      const savedText=(localStorage.getItem("savrdh-text-effect") as TextEffect | null) ?? "none";
      const nextTheme=savedTheme ? {...defaultTheme,...JSON.parse(savedTheme)} : defaultTheme;
      const motion=savedMotion ? JSON.parse(savedMotion) : {style:"rise",intensity:"medium"};
      setTheme(nextTheme);
      setMotionStyle(motion.style ?? "rise");
      setMotionIntensity(motion.intensity ?? "medium");
      setTextEffect(savedText);
      applyTheme(nextTheme);
      applyTextEffect(savedText);
    } catch {
      applyTheme(defaultTheme);
      applyTextEffect("none");
    }
  },[]);

  const saveTheme=(next:ThemeState)=>{
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("savrdh-instant-theme",JSON.stringify(next));
  };

  const setColor=(key:keyof ThemeState,value:string)=>{
    saveTheme({...theme,[key]:value});
  };

  const saveMotion=(style:MotionStyle,intensity:MotionIntensity)=>{
    setMotionStyle(style);
    setMotionIntensity(intensity);
    localStorage.setItem("savrdh-motion-prefs",JSON.stringify({style,intensity}));
    window.dispatchEvent(new Event("savrdh-customizer-update"));
    document.documentElement.dataset.motionStyle=style;
    document.documentElement.dataset.motionIntensity=intensity;
  };

  const saveText=(effect:TextEffect)=>{
    setTextEffect(effect);
    localStorage.setItem("savrdh-text-effect",effect);
    applyTextEffect(effect);
  };

  const resetAll=()=>{
    saveTheme(defaultTheme);
    saveMotion("rise","medium");
    saveText("none");
  };

  const applyPreset=(preset:{primary:string;accent:string;hero:string})=>{
    saveTheme({
      ...theme,
      primary:preset.primary,
      accent:preset.accent,
      hero:preset.hero,
      process:preset.hero,
      closing:preset.primary,
      footer:"#0b0e21",
    });
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

          <div className="site-customizer">
            <button
              type="button"
              className="customizer-toggle"
              aria-expanded={panelOpen}
              onClick={()=>setPanelOpen(!panelOpen)}
            >
              <SlidersHorizontal size={17}/>
              <span>Customize</span>
            </button>

            {panelOpen && (
              <div className="customizer-panel">
                <div className="customizer-head">
                  <div>
                    <strong>Website Customizer</strong>
                    <small>Live preview — changes save automatically</small>
                  </div>
                  <button className="customizer-reset" type="button" onClick={resetAll} title="Reset all">
                    <RotateCcw size={16}/>
                  </button>
                </div>

                <div className="customizer-tabs">
                  <button className={tab==="colors"?"active":""} onClick={()=>setTab("colors")}><Palette size={15}/> Colors</button>
                  <button className={tab==="motion"?"active":""} onClick={()=>setTab("motion")}><WandSparkles size={15}/> Motion</button>
                  <button className={tab==="text"?"active":""} onClick={()=>setTab("text")}><Type size={15}/> Text</button>
                </div>

                {tab==="colors" && (
                  <div className="customizer-body">
                    <div className="customizer-presets">
                      {presets.map(p=>(
                        <button key={p.name} type="button" onClick={()=>applyPreset(p)}>
                          <span>
                            <i style={{background:p.hero}}/>
                            <i style={{background:p.primary}}/>
                            <i style={{background:p.accent}}/>
                          </span>
                          {p.name}
                        </button>
                      ))}
                    </div>

                    <div className="customizer-divider">Brand colors</div>
                    <div className="custom-color-grid">
                      <ColorField label="Primary" value={theme.primary} onChange={v=>setColor("primary",v)}/>
                      <ColorField label="Accent" value={theme.accent} onChange={v=>setColor("accent",v)}/>
                    </div>

                    <div className="customizer-divider">Section backgrounds</div>
                    <div className="section-color-list">
                      {sectionFields.map(field=>(
                        <ColorField key={field.key} label={field.label} value={theme[field.key]} onChange={v=>setColor(field.key,v)}/>
                      ))}
                    </div>
                  </div>
                )}

                {tab==="motion" && (
                  <div className="customizer-body">
                    <div className="customizer-divider first">Reveal animation</div>
                    <div className="choice-grid">
                      {(["rise","fade","zoom","slide","none"] as MotionStyle[]).map(style=>(
                        <button
                          type="button"
                          className={motionStyle===style?"active":""}
                          key={style}
                          onClick={()=>saveMotion(style,motionIntensity)}
                        >
                          {motionStyle===style && <Check size={13}/>}
                          <span>{style==="rise"?"Rise Up":style==="none"?"No Motion":style[0].toUpperCase()+style.slice(1)}</span>
                        </button>
                      ))}
                    </div>

                    <div className="customizer-divider">Motion intensity</div>
                    <div className="choice-grid three">
                      {(["low","medium","high"] as MotionIntensity[]).map(level=>(
                        <button
                          type="button"
                          className={motionIntensity===level?"active":""}
                          key={level}
                          onClick={()=>saveMotion(motionStyle,level)}
                        >
                          {motionIntensity===level && <Check size={13}/>}
                          <span>{level[0].toUpperCase()+level.slice(1)}</span>
                        </button>
                      ))}
                    </div>

                    <div className="motion-preview-card">
                      <WandSparkles size={18}/>
                      <div>
                        <strong>Applies across all sections</strong>
                        <small>Framer Motion reveal timing and style update instantly.</small>
                      </div>
                    </div>
                  </div>
                )}

                {tab==="text" && (
                  <div className="customizer-body">
                    <div className="customizer-divider first">Heading effect</div>
                    <div className="text-effect-list">
                      {([
                        ["none","Clean"],
                        ["gradient","Gradient"],
                        ["glow","Glow"],
                        ["outline","Outline"],
                        ["shadow","Soft Shadow"],
                      ] as Array<[TextEffect,string]>).map(([value,label])=>(
                        <button
                          type="button"
                          key={value}
                          className={textEffect===value?"active":""}
                          onClick={()=>saveText(value)}
                        >
                          <span className={`effect-sample effect-${value}`}>Aa</span>
                          <span>{label}</span>
                          {textEffect===value && <Check size={14}/>}
                        </button>
                      ))}
                    </div>
                    <p className="customizer-note">Text effects apply to major headings while keeping body text readable.</p>
                  </div>
                )}
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

function ColorField({label,value,onChange}:{label:string;value:string;onChange:(value:string)=>void}) {
  return (
    <label className="color-field">
      <span>{label}</span>
      <input type="color" value={value} onChange={e=>onChange(e.target.value)}/>
      <code>{value}</code>
    </label>
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
