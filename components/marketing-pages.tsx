"use client";
import Link from "next/link";
import { useMemo, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Calculator,
  Check, ChevronRight, CircleDollarSign, Clock3, FileCheck2, HelpCircle,
  IndianRupee, Landmark, ShieldCheck, Sparkles, UserRound, WalletCards, Zap
} from "lucide-react";
import { Header, Footer } from "./site-shell";
import { Reveal, m, useReducedMotion } from "./motion";
import { Calculator as EmiCalculator } from "./calculator";

const FeatureRail = ({items}:{items:Array<[ElementType,string,string]>}) => (
  <div className="subpage-feature-rail">
    {items.map(([Icon,title,text],i)=>(
      <Reveal className="subpage-feature" key={title} delay={i*.06}>
        <span><Icon size={18}/></span>
        <div><strong>{title}</strong><small>{text}</small></div>
      </Reveal>
    ))}
  </div>
);

function SubpageHero({
  eyebrow,title,accent,description,children,visual="rings"
}:{
  eyebrow:string;title:string;accent:string;description:string;children?:ReactNode;visual?:string
}) {
  const reduce=useReducedMotion();
  return (
    <section className={`subpage-hero subpage-hero-${visual}`}>
      <div className="subpage-grid-bg"/>
      <div className="container subpage-hero-grid">
        <Reveal className="subpage-copy">
          <span className="subpage-eyebrow"><Sparkles size={13}/>{eyebrow}</span>
          <h1>{title} <em>{accent}</em></h1>
          <p>{description}</p>
          <div className="subpage-actions">
            <Link href="/apply" className="nova-btn nova-btn-primary">Apply now <ArrowUpRight size={17}/></Link>
            <Link href="/track" className="nova-btn nova-btn-ghost">Track application <ArrowRight size={17}/></Link>
          </div>
        </Reveal>
        <div className="subpage-visual">
          <m.div className="visual-ring vr1" animate={reduce?{}:{rotate:360}} transition={{duration:24,repeat:Infinity,ease:"linear"}}/>
          <m.div className="visual-ring vr2" animate={reduce?{}:{rotate:-360}} transition={{duration:32,repeat:Infinity,ease:"linear"}}/>
          <m.div className="visual-orb" animate={reduce?{}:{y:[0,-14,0],rotate:[0,4,0]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}>
            {children}
          </m.div>
        </div>
      </div>
    </section>
  );
}

export function PersonalLoanPage(){
  return <>
    <Header/>
    <main className="subpage-shell">
      <SubpageHero
        eyebrow="INSTANT PERSONAL LOAN"
        title="Small loan."
        accent="Serious momentum."
        description="Apply for personal loan assistance from ₹5,000 to ₹3,00,000, designed for salaried professionals and eligible business owners."
        visual="loan"
      >
        <div className="orb-card">
          <span>REQUEST RANGE</span>
          <strong>₹5,000 — ₹3,00,000</strong>
          <div className="orb-card-tags"><i>SALARIED</i><i>BUSINESS</i></div>
        </div>
      </SubpageHero>

      <section className="subpage-section light">
        <div className="container">
          <Reveal className="subpage-heading">
            <span className="nova-kicker dark">WHO IT'S FOR</span>
            <h2>Two profiles. <em>One simple application.</em></h2>
          </Reveal>
          <div className="profile-panels">
            {[
              [UserRound,"Salaried professionals","For working professionals who need a small-ticket personal loan for planned or urgent personal needs.",["Salary income","KYC & income assessment","Digital application"]],
              [BriefcaseBusiness,"Business owners","For eligible self-employed applicants and business owners seeking a personal loan based on their profile.",["Business/self-employed profile","Income assessment","Digital application"]]
            ].map(([Icon,title,desc,points],i)=>{
              const C=Icon as ElementType;
              return <Reveal className="profile-panel" key={String(title)} delay={i*.08}>
                <div className="profile-panel-icon"><C/></div>
                <h3>{String(title)}</h3><p>{String(desc)}</p>
                <ul>{(points as string[]).map(p=><li key={p}><Check/>{p}</li>)}</ul>
                <Link href="/apply" className="profile-cta">Start application <ArrowUpRight size={17}/></Link>
              </Reveal>
            })}
          </div>
        </div>
      </section>

      <section className="subpage-section navy">
        <div className="container">
          <Reveal className="subpage-heading inverse">
            <span className="nova-kicker">LOAN SNAPSHOT</span>
            <h2>Know the basics <em>before you apply.</em></h2>
          </Reveal>
          <FeatureRail items={[
            [IndianRupee,"₹5K–₹3L","Requested loan amount range"],
            [Clock3,"Flexible tenure","Subject to lender's final offer"],
            [FileCheck2,"Digital process","Guided application and verification"],
            [ShieldCheck,"Transparent","Review final rate and charges carefully"],
          ]}/>
        </div>
      </section>

      <section className="subpage-section soft">
        <div className="container eligibility-split">
          <Reveal>
            <span className="nova-kicker dark">WHAT MAY BE REQUIRED</span>
            <h2>Keep the basics <em>ready.</em></h2>
            <p>Exact documents depend on the lending institution and your profile.</p>
          </Reveal>
          <div className="doc-list">
            {["PAN & identity/KYC","Address details","Income proof","Recent bank statement","Employment or business proof"].map((x,i)=>(
              <Reveal className="doc-row" key={x} delay={i*.04}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong><ChevronRight/></Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}

export function EmiCalculatorPage(){
  return <>
    <Header/>
    <main className="subpage-shell">
      <SubpageHero
        eyebrow="PLAN YOUR REPAYMENT"
        title="A monthly number"
        accent="you can understand."
        description="Estimate a possible EMI before applying. Adjust amount, tenure and rate to explore different repayment scenarios."
        visual="calculator"
      >
        <div className="orb-calculator">
          <Calculator size={28}/>
          <span>EXAMPLE EMI</span><strong>₹4,781</strong><small>/ month</small>
        </div>
      </SubpageHero>
      <EmiCalculator/>
      <section className="subpage-section navy">
        <div className="container">
          <Reveal className="subpage-heading inverse"><span className="nova-kicker">EMI SMART CHECK</span><h2>Choose a repayment <em>you can sustain.</em></h2></Reveal>
          <FeatureRail items={[
            [WalletCards,"Borrow only what you need","Smaller principal usually means lower monthly pressure."],
            [Clock3,"Compare tenure","Longer tenure can reduce EMI but may increase total interest."],
            [CircleDollarSign,"Compare total repayment","Look beyond the EMI and review the full repayment."],
            [ShieldCheck,"Final lender terms matter","Calculator values are illustrative, not an offer."],
          ]}/>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}

export function EligibilityPage(){
  const [profile,setProfile]=useState<"salaried"|"business">("salaried");
  const [income,setIncome]=useState(30000);
  const [age,setAge]=useState(28);
  const score=useMemo(()=>{
    let s=35;
    if(age>=21&&age<=58)s+=20;
    if(income>=15000)s+=20;
    if(income>=30000)s+=10;
    if(profile==="business")s-=2;
    return Math.min(90,s);
  },[age,income,profile]);

  return <>
    <Header/>
    <main className="subpage-shell">
      <SubpageHero eyebrow="QUICK ELIGIBILITY CHECK" title="See where you" accent="roughly stand." description="Use this simple pre-check to understand basic profile fit before starting your application. It is not a credit approval." visual="eligibility">
        <div className="eligibility-gauge"><span>{score}%</span><small>profile readiness</small></div>
      </SubpageHero>

      <section className="subpage-section light">
        <div className="container eligibility-check-grid">
          <Reveal className="eligibility-controls">
            <span className="nova-kicker dark">60-SECOND CHECK</span>
            <h2>Adjust your <em>profile.</em></h2>
            <div className="toggle-pair">
              <button className={profile==="salaried"?"active":""} onClick={()=>setProfile("salaried")}><UserRound/> Salaried</button>
              <button className={profile==="business"?"active":""} onClick={()=>setProfile("business")}><BriefcaseBusiness/> Business owner</button>
            </div>
            <label className="eligibility-range">Age <strong>{age} years</strong><input type="range" min={18} max={65} value={age} onChange={e=>setAge(+e.target.value)}/></label>
            <label className="eligibility-range">Monthly income <strong>₹{income.toLocaleString("en-IN")}</strong><input type="range" min={5000} max={150000} step={5000} value={income} onChange={e=>setIncome(+e.target.value)}/></label>
          </Reveal>
          <Reveal className="eligibility-result">
            <div className="eligibility-score-ring" style={{"--score":`${score*3.6}deg`} as CSSProperties}><span>{score}%</span></div>
            <h3>{score>=70?"Good starting profile":score>=55?"Possible starting profile":"Profile may need review"}</h3>
            <p>This quick check uses only basic age and income signals. Final eligibility depends on lender policy, credit profile, verification and other factors.</p>
            <Link href="/apply" className="nova-btn nova-btn-primary">Continue to application <ArrowUpRight size={17}/></Link>
          </Reveal>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}

export function HowItWorksPage(){
  const steps=[
    [Zap,"01","Choose your profile","Start as salaried or business owner and choose the amount you need."],
    [FileCheck2,"02","Complete application","Share basic personal, contact and income details."],
    [ShieldCheck,"03","Verify documents","Complete KYC and submit profile documents if requested."],
    [Landmark,"04","Lender assessment","The lending institution reviews your eligibility and credit profile."],
    [BadgeCheck,"05","Review decision","If approved, review amount, interest, charges, tenure and repayment details."],
  ];
  return <>
    <Header/>
    <main className="subpage-shell">
      <SubpageHero eyebrow="THE FULL JOURNEY" title="Clear steps." accent="No mystery." description="Understand the complete application journey before you start, from basic details through lender assessment and final decision." visual="process">
        <div className="process-orb"><span>01</span><i/><span>05</span><strong>5 clear steps</strong></div>
      </SubpageHero>
      <section className="subpage-section light">
        <div className="container vertical-process">
          {steps.map(([Icon,no,title,desc],i)=>{
            const C=Icon as ElementType;
            return <m.div className="vertical-step" key={String(no)} initial={{opacity:0,x:i%2?-32:32}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.4}} transition={{duration:.6,delay:i*.08}}>
              <div className="vertical-step-no">{String(no)}</div>
              <div className="vertical-step-card"><C/><div><h3>{String(title)}</h3><p>{String(desc)}</p></div></div>
            </m.div>
          })}
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}

const faqItems=[
  ["Who can apply?","Eligible salaried professionals and self-employed or business-owner applicants may apply, subject to lender criteria."],
  ["What is the loan range?","The website is focused on personal loan requests from ₹5,000 to ₹3,00,000."],
  ["Is approval guaranteed?","No. Approval, sanctioned amount, rate, fees, tenure and disbursement are determined by the lending institution after assessment."],
  ["How quickly can I apply?","The online request can be started in a few minutes. Verification and credit decision timelines vary."],
  ["What documents can be requested?","KYC, income proof, bank statement and employment or business proof may be requested depending on profile and lender."],
  ["Can I track my application?","Yes. Use the Track Application page with the reference and private tracking code created after submission."],
];

export function FaqPage(){
  const [open,setOpen]=useState(0);
  return <>
    <Header/>
    <main className="subpage-shell">
      <SubpageHero eyebrow="QUICK ANSWERS" title="Questions before" accent="your next move?" description="Understand the application, eligibility, tracking and safety basics before you proceed." visual="faq">
        <div className="faq-orb"><HelpCircle/><strong>FAQs</strong><span>Clear answers. No jargon.</span></div>
      </SubpageHero>
      <section className="subpage-section soft">
        <div className="container faq-page-grid">
          <Reveal className="faq-page-intro"><span className="nova-kicker dark">NEED CLARITY?</span><h2>Start with the <em>basics.</em></h2><p>If your question is application-specific, call 8109995906 after reviewing these general answers.</p></Reveal>
          <div className="faq-page-list">
            {faqItems.map(([q,a],i)=>(
              <Reveal className={`faq-page-item ${open===i?"active":""}`} key={q} delay={i*.04}>
                <button onClick={()=>setOpen(open===i?-1:i)}><span>{q}</span><i>{open===i?"—":"+"}</i></button>
                {open===i&&<m.p initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}}>{a}</m.p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
