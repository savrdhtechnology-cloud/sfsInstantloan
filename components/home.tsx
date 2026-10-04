"use client";
import Link from "next/link";
import {
  ArrowUpRight, ArrowRight, BadgeCheck, ShieldCheck, Clock3, Sparkles,
  BriefcaseBusiness, UserRound, Check, Plus, Minus, Phone, FileCheck2,
  Zap, WalletCards, Landmark, Smartphone, LockKeyhole, IndianRupee
} from "lucide-react";
import { useState } from "react";
import { m, Reveal, useReducedMotion } from "./motion";
import { Header, Footer } from "./site-shell";
import { Calculator } from "./calculator";

const faqs = [
  ["Who can apply for a SAVRDH instant personal loan?",
   "Salaried professionals and eligible self-employed or business owners can apply. Final eligibility depends on the lending institution's policy, income, credit profile and verification."],
  ["How much can I apply for?",
   "You can request a small-ticket personal loan from ₹5,000 to ₹3,00,000. The final sanctioned amount is decided by the lending institution after assessment."],
  ["Is approval guaranteed or instant?",
   "No. SAVRDH lets you start the application instantly and helps coordinate the process. Approval, pricing and disbursement are always subject to lender assessment and successful verification."],
  ["What documents may be required?",
   "Typically PAN, Aadhaar or other KYC, income proof, bank statement and employment or business proof may be requested. Exact requirements vary by lender and profile."],
  ["Can I track my application?",
   "Yes. After submission, use Track Application with your application reference. You can also call 8109995906 for assistance."]
];

const segments = [
  {
    icon: UserRound,
    title: "Salaried professionals",
    subtitle: "For the moments that cannot wait.",
    points: ["Monthly salary income", "Digital KYC & verification", "Flexible repayment options"],
    className: "segment-violet",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business owners",
    subtitle: "Small finance for your next move.",
    points: ["Self-employed / proprietors", "Business income assessment", "Fast digital application"],
    className: "segment-coral",
  },
];

function AnimatedHeroTitle() {
  const words = [
    { text: "Money", accent: false },
    { text: "for", accent: false },
    { text: "right", accent: true },
    { text: "now.", accent: true },
  ];
  return (
    <h1 className="animated-hero-title" aria-label="Money for right now. Plans for what's next.">
      <span className="hero-line hero-line-one">
        {words.map((word, i) => (
          <m.span
            key={word.text}
            className={word.accent ? "hero-word hero-word-accent" : "hero-word"}
            initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: .7, delay: .12 + i * .1, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {word.text}&nbsp;
          </m.span>
        ))}
      </span>
      <m.span
        className="hero-line"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8, delay: .58, ease: [0.2, 0.7, 0.2, 1] }}
      >
        Plans for what&apos;s next.
      </m.span>
      <m.span
        className="hero-title-sheen"
        aria-hidden="true"
        animate={{ x: ["-120%", "150%"] }}
        transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2.3, ease: "easeInOut" }}
      />
    </h1>
  );
}


const lenderNetwork = [
  { name: "HDFC Bank", logo: "https://www.google.com/s2/favicons?domain=hdfcbank.com&sz=128" },
  { name: "ICICI Bank", logo: "https://www.google.com/s2/favicons?domain=icicibank.com&sz=128" },
  { name: "Axis Bank", logo: "https://www.google.com/s2/favicons?domain=axisbank.com&sz=128" },
  { name: "IDFC FIRST Bank", logo: "https://www.google.com/s2/favicons?domain=idfcfirstbank.com&sz=128" },
  { name: "Kotak Mahindra Bank", logo: "https://www.google.com/s2/favicons?domain=kotak.com&sz=128" },
  { name: "Tata Capital", logo: "https://www.google.com/s2/favicons?domain=tatacapital.com&sz=128" },
  { name: "Bajaj Finserv", logo: "https://www.google.com/s2/favicons?domain=bajajfinserv.in&sz=128" },
  { name: "Aditya Birla Finance", logo: "https://www.google.com/s2/favicons?domain=adityabirlacapital.com&sz=128" },
  { name: "Hero FinCorp", logo: "https://www.google.com/s2/favicons?domain=herofincorp.com&sz=128" },
  { name: "Poonawalla Fincorp", logo: "https://www.google.com/s2/favicons?domain=poonawallafincorp.com&sz=128" },
];

const journeySteps = [
  ["01", "Check your fit", "Choose salaried or business-owner profile and the amount you need."],
  ["02", "Apply online", "Share basic contact, income and requirement details through the digital application."],
  ["03", "Complete verification", "Provide KYC and profile documents requested for assessment."],
  ["04", "Lender review", "Your application is assessed against the lending institution's eligibility and credit policy."],
  ["05", "Decision & next step", "Review the lender's final terms and, if approved and accepted, proceed toward disbursal."],
];

export function Home() {
  const [faq, setFaq] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <>
      <Header />
      <main className="nova-site">
        <section className="nova-hero">
          <div className="nova-grid-bg" />
          <div className="nova-blob blob-a" />
          <div className="nova-blob blob-b" />
          <div className="container nova-hero-grid">
            <div className="nova-copy">
              <Reveal>
                <span className="nova-kicker"><Zap size={14}/> SMALL LOAN. BIG MOMENTUM.</span>
                <AnimatedHeroTitle />
                <p className="nova-lead">
                  Instant personal loan assistance from <strong>₹5,000 to ₹3,00,000</strong>
                  for salaried professionals and business owners — digital, guided and built for speed.
                </p>
                <div className="nova-actions">
                  <Link href="/apply" className="nova-btn nova-btn-primary">
                    Apply now <ArrowUpRight size={18}/>
                  </Link>
                  <a href="#calculator" className="nova-btn nova-btn-ghost">
                    Calculate EMI <ArrowRight size={18}/>
                  </a>
                </div>
                <div className="nova-trust-row">
                  <span><Check/> 100% online request</span>
                  <span><Check/> Guided process</span>
                  <span><Check/> Track application</span>
                </div>
              </Reveal>
            </div>

            <div className="nova-stage" aria-label="Interactive loan amount illustration">
              <m.div
                className="nova-orbit orbit-one"
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              />
              <m.div
                className="nova-orbit orbit-two"
                animate={reduce ? {} : { rotate: -360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              />

              <m.div
                className="nova-phone"
                initial={{ opacity: 0, y: 35, rotate: 6 }}
                animate={{ opacity: 1, y: reduce ? 0 : [0,-12,0], rotate: 3 }}
                transition={{ opacity:{duration:.7}, y:{duration:6,repeat:reduce?0:Infinity,ease:"easeInOut"} }}
              >
                <div className="phone-island"/>
                <span className="phone-mini">SAVRDH INSTANT</span>
                <div className="phone-amount">₹75,000</div>
                <p>Example request amount</p>
                <div className="phone-line"><span/><span/><span/></div>
                <div className="phone-cta">Continue application <ArrowRight size={16}/></div>
              </m.div>

              <m.div
                className="nova-card nova-card-top"
                animate={reduce ? {} : { y:[0,10,0], rotate:[-4,-1,-4] }}
                transition={{ duration:7, repeat:Infinity, ease:"easeInOut" }}
              >
                <span className="mini-icon"><Zap size={18}/></span>
                <div><small>LOAN RANGE</small><strong>₹5K — ₹3L</strong></div>
              </m.div>

              <m.div
                className="nova-card nova-card-bottom"
                animate={reduce ? {} : { y:[0,-9,0], rotate:[5,2,5] }}
                transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }}
              >
                <span className="mini-icon coral"><Clock3 size={18}/></span>
                <div><small>START ONLINE</small><strong>In a few minutes</strong></div>
              </m.div>

              <div className="nova-ring-label label-one">SALARIED</div>
              <div className="nova-ring-label label-two">BUSINESS</div>
            </div>
          </div>

          <div className="container nova-hero-bottom">
            <div><Zap/><strong>Fast start</strong><span>Begin your request online</span></div>
            <div><FileCheck2/><strong>Minimal friction</strong><span>Simple guided documentation</span></div>
            <div><ShieldCheck/><strong>Safer journey</strong><span>Never share OTPs or passwords</span></div>
            <div><Smartphone/><strong>Stay updated</strong><span>Track your application status</span></div>
          </div>
        </section>


        <section className="lender-network-section" aria-label="Corporate channel partner network">
          <div className="container lender-network-head">
            <Reveal>
              <span className="nova-kicker dark"><Landmark size={14}/> CORPORATE CHANNEL PARTNER NETWORK</span>
              <h2>Connected with leading <em>Banks &amp; NBFCs.</em></h2>
              <p>
                SAVRDH Financial Services works through corporate channel / referral arrangements with lending institutions.
                Product availability, lender selection and active empanelment vary by profile, geography and program.
              </p>
            </Reveal>
            <Reveal className="network-badge">
              <BadgeCheck size={20}/>
              <div><strong>Multi-lender access</strong><span>Bank &amp; NBFC options</span></div>
            </Reveal>
          </div>

          <div className="lender-marquee" role="presentation">
            <m.div
              className="lender-marquee-track"
              animate={reduce ? {} : { x: ["0%", "-50%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              {[...lenderNetwork, ...lenderNetwork].map((lender,i)=>(
                <div className="lender-chip" key={`${lender.name}-${i}`}>
                  <span className="lender-logo-wrap">
                    <img src={lender.logo} alt="" className="lender-logo" loading="lazy" />
                  </span>
                  <span>{lender.name}</span>
                </div>
              ))}
            </m.div>
          </div>

          <div className="container lender-disclaimer">
            <ShieldCheck size={15}/>
            <span>
              Institution names are shown as lender-network references. Loan offers, eligibility, approval, pricing and disbursal remain subject to the relevant institution&apos;s policy and active channel availability.
            </span>
          </div>
        </section>

        <section className="customer-journey-section" aria-label="Customer loan journey">
          <div className="container">
            <Reveal className="journey-heading-v2">
              <span className="nova-kicker dark"><Sparkles size={14}/> YOUR LOAN JOURNEY</span>
              <h2>One clear path. <em>Every step in view.</em></h2>
              <p>From your first eligibility check to the lender's final decision, follow the journey without losing track of what happens next.</p>
            </Reveal>

            <div className="journey-timeline-v2">
              <div className="journey-rail" aria-hidden="true">
                <m.div
                  className="journey-fill"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: .35 }}
                  transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
                />
              </div>

              {journeySteps.map(([no,title,desc],i)=>(
                <m.div
                  className="journey-node"
                  key={no}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: .45 }}
                  transition={{ duration: .55, delay: i * .13 }}
                >
                  <m.div
                    className="journey-dot"
                    initial={{ scale: .6 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 18, delay: .18 + i * .13 }}
                  >
                    <span>{no}</span>
                  </m.div>
                  <div className="journey-card-v2">
                    <span className="journey-status">{i===0?"START HERE":i===4?"FINAL STEP":"IN PROGRESS"}</span>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </m.div>
              ))}
            </div>

            <Reveal className="journey-track-cta">
              <div>
                <strong>Already applied?</strong>
                <span>Use your application reference to see the latest status.</span>
              </div>
              <Link href="/track" className="nova-btn journey-track-btn">Track application <ArrowRight size={17}/></Link>
            </Reveal>
          </div>
        </section>

        <section id="personal-loan" className="nova-section nova-light">
          <div className="container">
            <Reveal className="nova-heading">
              <span className="nova-kicker dark"><Sparkles size={14}/> ONE PRODUCT. TWO PROFILES.</span>
              <h2>Instant personal loans, <em>made simpler.</em></h2>
              <p>Focused only on small-ticket personal finance for working people and business owners.</p>
            </Reveal>

            <div className="segment-grid">
              {segments.map((item, i) => (
                <Reveal key={item.title} delay={i*.08} className={`segment-card ${item.className}`}>
                  <div className="segment-icon"><item.icon/></div>
                  <span className="segment-index">0{i+1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <ul>{item.points.map(p => <li key={p}><Check/>{p}</li>)}</ul>
                  <Link href="/apply" className="segment-link">Check your fit <ArrowUpRight size={18}/></Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="nova-section nova-ink">
          <div className="container">
            <Reveal className="nova-heading inverse">
              <span className="nova-kicker"><Clock3 size={14}/> THREE CLEAR MOVES</span>
              <h2>From application to <em>decision.</em></h2>
              <p>No confusing maze. A straightforward digital flow with human assistance when you need it.</p>
            </Reveal>

            <div className="process-line">
              {[
                [Smartphone,"01","Apply online","Share basic details, profile type and the loan amount you need."],
                [FileCheck2,"02","Verify details","Complete KYC and provide the documents requested for assessment."],
                [Landmark,"03","Lender decision","Review the lender's final offer, terms and repayment details before accepting."]
              ].map(([Icon,n,t,d],i) => {
                const C = Icon as typeof Smartphone;
                return <Reveal className="process-step" key={String(n)} delay={i*.08}>
                  <span className="process-no">{String(n)}</span>
                  <div className="process-icon"><C/></div>
                  <h3>{String(t)}</h3>
                  <p>{String(d)}</p>
                  {i < 2 && <span className="process-arrow"><ArrowRight/></span>}
                </Reveal>
              })}
            </div>
          </div>
        </section>

        <section className="nova-section benefits-section">
          <div className="container benefits-grid">
            <Reveal className="benefit-feature">
              <span className="nova-kicker dark"><WalletCards size={14}/> BUILT FOR SMALL-TICKET NEEDS</span>
              <h2>Borrow only what <em>you need.</em></h2>
              <p>Start from ₹5,000 and request up to ₹3,00,000. Choose a practical amount and compare the lender's final repayment terms carefully.</p>
              <Link href="/apply" className="nova-btn nova-btn-primary">Start application <ArrowUpRight size={18}/></Link>
            </Reveal>
            <div className="benefit-cards">
              {[
                [IndianRupee,"₹5K – ₹3L","Personal loan request range"],
                [Zap,"Digital first","Start from your phone"],
                [Clock3,"Flexible tenure","As offered by lender"],
                [ShieldCheck,"Transparent","Review charges before accepting"],
                [BadgeCheck,"Two profiles","Salaried + business owners"],
                [LockKeyhole,"Privacy aware","Secure handling practices"]
              ].map(([Icon,title,desc],i)=>{
                const C = Icon as typeof Zap;
                return <Reveal className="benefit-mini" key={String(title)} delay={i*.04}>
                  <C/><strong>{String(title)}</strong><span>{String(desc)}</span>
                </Reveal>
              })}
            </div>
          </div>
        </section>

        <Calculator />

        <section className="nova-section safety-section">
          <div className="container safety-grid">
            <Reveal className="safety-visual">
              <m.div className="security-core" animate={reduce?{}:{scale:[1,1.04,1]}} transition={{duration:4,repeat:Infinity}}>
                <ShieldCheck/>
              </m.div>
              <div className="security-ring r1"/><div className="security-ring r2"/><div className="security-ring r3"/>
              <span className="security-chip chip-a">NO OTP SHARING</span>
              <span className="security-chip chip-b">CHECK FINAL TERMS</span>
            </Reveal>
            <Reveal>
              <span className="nova-kicker dark"><ShieldCheck size={14}/> BORROW WITH CLARITY</span>
              <h2>Fast should still feel <em>responsible.</em></h2>
              <p className="safety-copy">Savrdh Instant Loan is a loan application and credit facilitation service. We do not guarantee approval, interest rate or disbursement timing. The lending institution makes the final credit decision.</p>
              <div className="safety-list">
                <div><Check/><span><strong>Read the lender offer</strong>Check rate, fees, tenure and total repayment before accepting.</span></div>
                <div><Check/><span><strong>Protect your credentials</strong>Never share OTP, PIN, CVV or banking password with anyone.</span></div>
                <div><Check/><span><strong>Borrow within your capacity</strong>Choose an EMI that fits your monthly cash flow.</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="nova-section faq-section-v2">
          <div className="container faq-grid-v2">
            <Reveal>
              <span className="nova-kicker dark"><Sparkles size={14}/> QUICK ANSWERS</span>
              <h2>Before you apply, <em>know this.</em></h2>
              <p>Need help? Our team can explain the application flow without asking for your confidential banking credentials.</p>
              <a className="support-pill" href="tel:+918109995906"><Phone/> 8109995906</a>
            </Reveal>
            <div className="faq-list nova-faq">
              {faqs.map(([q,a],i)=>(
                <div className={`faq-item-v2 ${faq===i?"active":""}`} key={q}>
                  <button onClick={()=>setFaq(faq===i?null:i)} aria-expanded={faq===i}>
                    {q}{faq===i?<Minus/>:<Plus/>}
                  </button>
                  <div hidden={faq!==i}><p>{a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="nova-closing">
          <div className="container nova-closing-inner">
            <div>
              <span className="nova-kicker"><Zap size={14}/> YOUR NEXT STEP</span>
              <h2>Need ₹5,000 to ₹3,00,000?</h2>
              <p>Start your personal loan request online and track every step.</p>
            </div>
            <div className="closing-actions">
              <Link href="/apply" className="nova-btn nova-btn-white">Apply now <ArrowUpRight size={18}/></Link>
              <Link href="/track" className="nova-btn nova-btn-outline">Track application <ArrowRight size={18}/></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
