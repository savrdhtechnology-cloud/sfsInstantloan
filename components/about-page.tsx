"use client";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Building2,
  Check, FileChartColumn, Handshake, Landmark, ShieldCheck, Sparkles,
  Target, Users, WalletCards
} from "lucide-react";
import { Header, Footer } from "./site-shell";
import { Brand } from "./brand";
import { Reveal, m, useReducedMotion } from "./motion";

const pillars = [
  [ShieldCheck,"Transparent Process","Clear communication, documented steps and customer visibility throughout the financial journey."],
  [Users,"Customer First Approach","Solutions are shaped around the applicant's requirement, profile and stage of the journey."],
  [BadgeCheck,"Expert Advisory","Financial and credit professionals support assessment, documentation and coordination."],
  [Landmark,"Pan India Presence","A growing service reach designed to support individuals and businesses across India."],
];

const services = [
  [ShieldCheck,"Credit Resolution","Support for credit-reporting issues, credit-health improvement and financial resolution."],
  [WalletCards,"Funding Solutions","Business funding and working-capital assistance for eligible businesses."],
  [Building2,"Project Finance","Project funding support with DPR, CMA, projections and bank coordination."],
  [Handshake,"Debt Advisory","Assistance around settlement, restructuring and OTS-related financial resolution."],
  [FileChartColumn,"DPR & Consultancy","DPR, CMA, financial projections and bank-ready proposal support."],
  [Users,"End-to-End Support","Dedicated coordination from initial assessment through the relevant financial process."],
];

export function AboutPage(){
  const reduce=useReducedMotion();
  return <>
    <Header/>
    <main className="about-page">
      <section className="about-hero">
        <div className="about-grid-bg"/>
        <div className="container about-hero-grid">
          <Reveal className="about-hero-copy">
            <span className="subpage-eyebrow"><Sparkles size={13}/> ABOUT SAVRDH FINANCIAL SERVICES</span>
            <h1>Your financial resolution &amp; <em>funding partner.</em></h1>
            <p>
              Savrdh Financial Services Private Limited is a financial advisory and credit-resolution company focused on helping individuals and businesses move toward financial stability, funding readiness and growth.
            </p>
            <div className="about-hero-actions">
              <Link href="/apply" className="nova-btn nova-btn-primary">Explore Instant Loan <ArrowUpRight size={17}/></Link>
              <a href="https://www.savrdhfinancialservices.com/" target="_blank" rel="noopener noreferrer" className="nova-btn nova-btn-ghost">Visit main website <ArrowRight size={17}/></a>
            </div>
            <div className="about-hero-points">
              <span><Check/> Transparent process</span>
              <span><Check/> Customer-first approach</span>
              <span><Check/> Expert advisory</span>
              <span><Check/> Pan-India focus</span>
            </div>
          </Reveal>

          <div className="about-hero-visual">
            <m.div className="about-orbit ao1" animate={reduce?{}:{rotate:360}} transition={{duration:26,repeat:Infinity,ease:"linear"}}/>
            <m.div className="about-orbit ao2" animate={reduce?{}:{rotate:-360}} transition={{duration:34,repeat:Infinity,ease:"linear"}}/>
            <m.div className="about-brand-card" animate={reduce?{}:{y:[0,-12,0],rotate:[-1,1,-1]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}>
              <Brand light/>
              <span className="about-card-label">SAVRDH FINANCIAL SERVICES PRIVATE LIMITED</span>
              <h3>Financial guidance.<br/>Built around clarity.</h3>
              <div className="about-card-line"><i/><i/><i/></div>
              <div className="about-card-footer"><ShieldCheck/><span>ADVISORY • FUNDING • RESOLUTION</span></div>
            </m.div>
            <m.div className="about-float-card afc-one" animate={reduce?{}:{y:[0,8,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}>
              <Target/><div><small>MISSION</small><strong>Transparent financial solutions</strong></div>
            </m.div>
            <m.div className="about-float-card afc-two" animate={reduce?{}:{y:[0,-8,0]}} transition={{duration:5.8,repeat:Infinity,ease:"easeInOut"}}>
              <Landmark/><div><small>VISION</small><strong>A trusted financial partner</strong></div>
            </m.div>
          </div>
        </div>
      </section>

      <section className="about-intro-section">
        <div className="container about-intro-grid">
          <Reveal>
            <span className="nova-kicker dark">WHO WE ARE</span>
            <h2>A company built around <em>financial progress.</em></h2>
          </Reveal>
          <Reveal>
            <p className="about-large-copy">
              SAVRDH Financial Services brings together financial advisory, credit resolution, funding support, project finance and documentation expertise under one service platform.
            </p>
            <p className="about-body-copy">
              The goal is straightforward: make complex financial processes easier to understand, better organized and more transparent for customers and businesses.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-pillars-section">
        <div className="container">
          <Reveal className="about-section-heading">
            <span className="nova-kicker">WHAT DEFINES US</span>
            <h2>Professional support with a <em>customer-first mindset.</em></h2>
          </Reveal>
          <div className="about-pillar-grid">
            {pillars.map(([Icon,title,desc],i)=>{
              const C=Icon as typeof ShieldCheck;
              return <m.article
                className="about-pillar-card"
                key={String(title)}
                initial={{opacity:0,y:28}}
                whileInView={{opacity:1,y:0}}
                viewport={{once:true,amount:.35}}
                transition={{duration:.55,delay:i*.08}}
              >
                <span className="about-pillar-icon"><C/></span>
                <span className="about-pillar-no">0{i+1}</span>
                <h3>{String(title)}</h3>
                <p>{String(desc)}</p>
              </m.article>
            })}
          </div>
        </div>
      </section>

      <section className="about-mission-section">
        <div className="container about-mission-grid">
          <Reveal className="about-mission-card mission">
            <span><Target/></span>
            <small>OUR MISSION</small>
            <h2>Empower people and businesses with <em>transparent, ethical and effective</em> financial solutions.</h2>
          </Reveal>
          <Reveal className="about-mission-card vision">
            <span><Sparkles/></span>
            <small>OUR VISION</small>
            <h2>Build SAVRDH into one of India&apos;s most trusted financial resolution and funding partners.</h2>
          </Reveal>
        </div>
      </section>

      <section className="about-services-section">
        <div className="container">
          <Reveal className="about-services-head">
            <div>
              <span className="nova-kicker dark">WHAT WE DO</span>
              <h2>One financial-services company. <em>Multiple capabilities.</em></h2>
            </div>
            <p>These are the broader capabilities of Savrdh Financial Services Private Limited beyond the Instant Loan product.</p>
          </Reveal>
          <div className="about-services-grid">
            {services.map(([Icon,title,desc],i)=>{
              const C=Icon as typeof ShieldCheck;
              return <Reveal className="about-service-card" key={String(title)} delay={i*.05}>
                <C/>
                <span>{String(i+1).padStart(2,"0")}</span>
                <h3>{String(title)}</h3>
                <p>{String(desc)}</p>
              </Reveal>
            })}
          </div>
        </div>
      </section>

      <section className="about-product-section">
        <div className="container about-product-grid">
          <Reveal>
            <span className="nova-kicker">SAVRDH INSTANT LOAN</span>
            <h2>A focused digital product inside the <em>SAVRDH ecosystem.</em></h2>
            <p>
              Savrdh Instant Loan is a digital loan-assistance product of Savrdh Financial Services Private Limited, focused on small-ticket personal loan requests from ₹5,000 to ₹3,00,000 for salaried professionals and eligible business owners.
            </p>
            <p>
              SAVRDH facilitates the application journey and lender coordination; final eligibility, approval, pricing, tenure and disbursal are decided by the relevant lending institution.
            </p>
            <div className="about-product-actions">
              <Link href="/personal-loan" className="nova-btn nova-btn-white">Explore product <ArrowRight size={16}/></Link>
              <Link href="/apply" className="nova-btn nova-btn-outline">Apply now <ArrowUpRight size={16}/></Link>
            </div>
          </Reveal>
          <Reveal className="about-product-visual">
            <div className="about-product-stack">
              <span><BriefcaseBusiness/> BUSINESS OWNER</span>
              <strong>₹5K — ₹3L</strong>
              <small>Personal loan assistance</small>
            </div>
            <div className="about-product-stack second">
              <span><Users/> SALARIED</span>
              <strong>Digital journey</strong>
              <small>Apply • Track • Stay informed</small>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-closing">
        <div className="container about-closing-inner">
          <div>
            <span className="nova-kicker">SAVRDH FINANCIAL SERVICES PRIVATE LIMITED</span>
            <h2>Financial journeys deserve <em>clarity.</em></h2>
            <p>Explore the main company website or start with the SAVRDH Instant Loan product.</p>
          </div>
          <div className="closing-actions">
            <a href="https://www.savrdhfinancialservices.com/" target="_blank" rel="noopener noreferrer" className="nova-btn nova-btn-white">Main website <ArrowUpRight size={17}/></a>
            <Link href="/apply" className="nova-btn nova-btn-outline">Apply now <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
