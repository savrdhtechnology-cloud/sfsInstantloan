"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Check,
  CircleDollarSign, FileCheck2, IndianRupee, Menu, ShieldCheck,
  Sparkles, UserRound, X
} from "lucide-react";
import { emi, money } from "@/lib/finance";
import { FinancialScene } from "./3d/FinancialScene";
import styles from "./experimental-home.module.css";

const journey = [
  ["01", "APPLY", "Share your basic profile, contact details and loan requirement."],
  ["02", "VERIFY", "Complete KYC and provide documents requested for assessment."],
  ["03", "REVIEW", "Your information is reviewed against the relevant eligibility criteria."],
  ["04", "DECISION", "The lending institution makes the final credit decision."],
  ["05", "NEXT STEP", "If eligible, review the final terms before you proceed."],
];

const trust = [
  [FileCheck2, "Transparent Process", "Clear steps from request to lender decision."],
  [CircleDollarSign, "Digital Journey", "Start, estimate and track online."],
  [BadgeCheck, "Guided Assistance", "Human support when you need clarity."],
  [ShieldCheck, "Secure Information", "Never share OTPs, PINs or banking passwords."],
];

function useDesktop3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const sync = () => setOk(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return ok;
}

export function ExperimentalHome() {
  const reduce = useReducedMotion();
  const desktop3D = useDesktop3D();
  const [menu, setMenu] = useState(false);
  const [amount, setAmount] = useState(75000);
  const [rate, setRate] = useState(16);
  const [months, setMonths] = useState(18);
  const [journeyStep, setJourneyStep] = useState(0);

  const payment = useMemo(() => emi(amount, rate, months), [amount, rate, months]);
  const total = payment * months;
  const interest = total - amount;
  const amountProgress = ((amount - 5000) / (300000 - 5000)) * 100;

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setJourneyStep((v) => (v + 1) % journey.length), 2200);
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <main className={styles.page}>
      <header className={styles.navbar}>
        <Link href="/" className={styles.brand}><span>SAVRDH</span><small>INSTANT LOAN</small></Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <a href="#loan">Loans</a><a href="#journey">How It Works</a><a href="#calculator">EMI Calculator</a><Link href="/about">About</Link><a href="#contact">Contact</a>
        </nav>
        <Link href="/apply" className={styles.navCta}>APPLY NOW <ArrowUpRight size={15}/></Link>
        <button className={styles.menuButton} onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>{menu ? <X/> : <Menu/>}</button>
        <AnimatePresence>
          {menu && (
            <motion.nav className={styles.mobileNav} initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
              <a href="#loan" onClick={()=>setMenu(false)}>Loans</a><a href="#journey" onClick={()=>setMenu(false)}>How It Works</a><a href="#calculator" onClick={()=>setMenu(false)}>EMI Calculator</a><Link href="/about" onClick={()=>setMenu(false)}>About</Link><Link href="/track" onClick={()=>setMenu(false)}>Track Application</Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className={styles.hero}>
        <div className={styles.grid}/><div className={styles.glow}/>
        <div className={styles.heroInner}>
          <motion.div className={styles.heroCopy} initial={reduce?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
            <span className={styles.pill}><Sparkles size={14}/> DIGITAL FINANCE, GUIDED CLEARLY</span>
            <h1>FAST FINANCE.<br/><em>SMARTER DECISIONS.</em></h1>
            <p>Simple, transparent and digitally guided loan solutions for individuals and businesses.</p>
            <div className={styles.actions}><Link href="/apply" className={styles.primary}>APPLY NOW <ArrowUpRight size={17}/></Link><a href="#calculator" className={styles.secondary}>CALCULATE EMI <ArrowRight size={17}/></a></div>
            <div className={styles.heroNotes}><span><Check/> Application assistance</span><span><Check/> Subject to eligibility</span><span><Check/> Lender terms apply</span></div>
          </motion.div>

          <div className={styles.sceneWrap} aria-label="Interactive 3D financial card">
            {!reduce && desktop3D ? <FinancialScene/> : <div className={styles.sceneFallback}/>}
            <motion.div className={styles.glassCard} animate={reduce?{}:{y:[0,-8,0],rotate:[-1,1,-1]}} transition={{duration:5.8,repeat:Infinity,ease:"easeInOut"}}>
              <div className={styles.cardTop}><span>SAVRDH</span><i>ESTIMATE</i></div>
              <strong>{money(amount)}</strong><p>Selected loan amount</p>
              <div className={styles.cardGrid}><span><small>EMI</small>{money(payment)}</span><span><small>TENURE</small>{months} months</span></div>
              <div className={styles.cardStatus}><span/> ESTIMATE READY</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="loan" className={styles.amountSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}><span>01 / LOAN AMOUNT</span><h2>HOW MUCH DO <em>YOU NEED?</em></h2><p>Adjust the request amount. Current application flow supports personal loan requests from ₹5,000 to ₹3,00,000.</p></div>
          <div className={styles.amountPanel}>
            <div><span className={styles.label}>SELECTED AMOUNT</span><motion.strong key={amount}>{money(amount)}</motion.strong><input aria-label="Loan amount" type="range" min={5000} max={300000} step={5000} value={amount} onChange={e=>setAmount(+e.target.value)}/><div className={styles.rangeLabels}><span>₹5K</span><span>₹3L</span></div></div>
            <div className={styles.amountVisual}>
              <div className={styles.progressRing} style={{"--progress":(amountProgress*3.6)+"deg"} as React.CSSProperties}><span>{Math.round(amountProgress)}%</span><small>of range</small></div>
              <div><small>ILLUSTRATIVE EMI</small><strong>{money(payment)}</strong><span>/ month</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="journey" className={styles.journeySection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}><span>02 / LOAN JOURNEY</span><h2>ONE CLEAR PATH.<br/><em>EVERY STEP IN VIEW.</em></h2></div>
          <div className={styles.journeyTrack}><div className={styles.journeyLine}/>
            {journey.map(([no,title,desc],i)=><button key={no} onClick={()=>setJourneyStep(i)} className={i===journeyStep?styles.journeyActive:styles.journeyItem}><span className={styles.journeyDot}>{no}</span><strong>{title}</strong><p>{desc}</p></button>)}
          </div>
        </div>
      </section>

      <section className={styles.productsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}><span>03 / LOAN PRODUCT</span><h2>FOCUSED FINANCE.<br/><em>NO PRODUCT CLUTTER.</em></h2><p>The current customer application is configured for Personal Loan. Other internal CRM product labels are not presented here as live customer products.</p></div>
          <div className={styles.productCard}><div><IndianRupee/><span>PERSONAL LOAN</span></div><h3>For planned or urgent personal needs.</h3><p>Digital request journey for salaried professionals and eligible self-employed or business-owner applicants.</p><Link href="/personal-loan">EXPLORE PRODUCT <ArrowUpRight/></Link></div>
        </div>
      </section>

      <section id="calculator" className={styles.calculatorSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}><span>04 / EMI CALCULATOR</span><h2>PLAN THE NUMBER.<br/><em>BEFORE THE DECISION.</em></h2><p>Uses the existing EMI calculation logic. Values are illustrative, not a loan offer.</p></div>
          <div className={styles.calculatorGrid}>
            <div className={styles.controls}>
              <label>Loan Amount <strong>{money(amount)}</strong><input type="range" min={5000} max={300000} step={5000} value={amount} onChange={e=>setAmount(+e.target.value)}/></label>
              <label>Interest Rate <strong>{rate}% p.a.</strong><input type="range" min={10} max={36} step={0.5} value={rate} onChange={e=>setRate(+e.target.value)}/></label>
              <label>Tenure <strong>{months} months</strong><input type="range" min={3} max={60} step={3} value={months} onChange={e=>setMonths(+e.target.value)}/></label>
              <p>Actual rate, fees, taxes and tenure depend on lender assessment and final terms.</p>
            </div>
            <motion.div className={styles.emiCard} animate={reduce?{}:{y:[0,-7,0]}} transition={{duration:5,repeat:Infinity}}>
              <span>MONTHLY EMI</span><strong>{money(payment)}</strong>
              <div><span>Total Interest<b>{money(interest)}</b></span><span>Total Amount<b>{money(total)}</b></span></div>
              <Link href={"/apply?amount="+amount+"&tenure="+months}>APPLY FOR THIS AMOUNT <ArrowUpRight/></Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.customerSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}><span>05 / CUSTOMER TYPES</span><h2>TWO PROFILES.<br/><em>ONE GUIDED EXPERIENCE.</em></h2></div>
          <div className={styles.customerGrid}>
            {[[UserRound,"SALARIED PROFESSIONAL","Salary income, digital KYC and profile-based assessment."],[BriefcaseBusiness,"BUSINESS OWNER","Eligible self-employed and business-owner profiles with income assessment."]].map(([Icon,title,copy])=>{const C=Icon as typeof UserRound;return <div className={styles.tiltCard} key={String(title)}><C/><span>PROFILE</span><h3>{String(title)}</h3><p>{String(copy)}</p><Link href="/apply">CHECK YOUR FIT <ArrowRight/></Link></div>})}
          </div>
        </div>
      </section>

      <section className={styles.networkSection}>
        <div className={styles.sectionInner}>
          <div className={styles.networkGrid}>
            <div className={styles.sectionHeading}><span>06 / FINANCIAL OPTIONS</span><h2>ONE GUIDED JOURNEY<br/><em>ACROSS FINANCIAL OPTIONS.</em></h2><p>We avoid implying a guaranteed lender match or approval. Availability depends on active channel arrangements, profile and lender policy.</p></div>
            <div className={styles.networkVisual}><div className={styles.centerNode}>SAVRDH<small>GUIDED JOURNEY</small></div>{["BANK","NBFC","CREDIT","OPTIONS"].map((x,i)=><span key={x} className={styles["node"+(i+1)]}>{x}</span>)}<i className={styles.orbit1}/><i className={styles.orbit2}/></div>
          </div>
        </div>
      </section>

      <section className={styles.trustSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}><span>07 / TRUST</span><h2>FINANCE SHOULD<br/><em>FEEL SIMPLE.</em></h2></div>
          <div className={styles.trustGrid}>{trust.map(([Icon,title,copy])=>{const C=Icon as typeof ShieldCheck;return <div key={String(title)}><C/><h3>{String(title)}</h3><p>{String(copy)}</p></div>})}</div>
        </div>
      </section>

      <section className={styles.finalCta}><div className={styles.finalGlow}/><div className={styles.sectionInner}><span>READY WHEN YOU ARE</span><h2>READY TO<br/><em>MOVE FORWARD?</em></h2><div className={styles.actions}><Link href="/apply" className={styles.primary}>APPLY NOW <ArrowUpRight/></Link><Link href="/eligibility" className={styles.secondary}>CHECK YOUR OPTIONS <ArrowRight/></Link></div></div></section>

      <footer id="contact" className={styles.footer}><div className={styles.sectionInner}><div><strong>SAVRDH</strong><span>INSTANT LOAN</span></div><p>A brand product of Savrdh Financial Services Private Limited. Loan approval, sanctioned amount, pricing, tenure and disbursement are determined by the lending institution after assessment.</p><nav><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/track">Track Application</Link><a href="tel:+918109995906">8109995906</a></nav></div></footer>
    </main>
  );
}
