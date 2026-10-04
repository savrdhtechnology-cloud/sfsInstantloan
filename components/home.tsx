"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Clock3,
  Sparkles,
  BriefcaseBusiness,
  UserRound,
  Building2,
  Stethoscope,
  Check,
  Plus,
  Minus,
  Phone,
  Headphones,
  FileCheck2,
} from "lucide-react";
import { useState } from "react";
import { m, Reveal, useReducedMotion } from "./motion";
import { Header, Footer } from "./site-shell";
import { Calculator } from "./calculator";
const loans = [
  {
    name: "Personal Loan",
    tag: "FOR LIFE’S WHAT’S NEXT",
    description:
      "A celebration, an important expense, or a fresh start. Explore finance for your personal goals.",
    icon: UserRound,
    number: "01",
    className: "personal",
  },
  {
    name: "Business Loan",
    tag: "FOR YOUR NEXT CHAPTER",
    description:
      "Working capital, new equipment, or your next big opportunity. Give your ambition room to grow.",
    icon: BriefcaseBusiness,
    number: "02",
    className: "business",
  },
  {
    name: "Professional Loan",
    tag: "FOR WHAT YOU DO BEST",
    description:
      "Build your practice and invest in your expertise with guided credit assistance.",
    icon: Stethoscope,
    number: "03",
    className: "professional",
  },
  {
    name: "Loan Against Property",
    tag: "FOR BIGGER POSSIBILITIES",
    description:
      "Explore how your property can support long-term plans, subject to lender assessment.",
    icon: Building2,
    number: "04",
    className: "property",
  },
];
const faqs = [
  [
    "Does “Instant Loan” mean guaranteed approval?",
    "No. You can start your application instantly online. Eligibility, approval, interest rates and disbursement timelines depend on the lending institution and verification of your application.",
  ],
  [
    "What information do I need to get started?",
    "Start with your name, contact details, city, employment type, monthly income and the amount you need. Our team will explain the documents required for your selected loan. Please never share OTPs or banking passwords.",
  ],
  [
    "Will I know the interest rate before I accept?",
    "The lending institution determines your rate and terms. Review the offer, all fees, annual percentage rate where applicable, repayment schedule and lender documentation before accepting. The website EMI calculator is an illustration, not an offer.",
  ],
  [
    "How can I check my application status?",
    "After a successful submission, save your application reference and private tracking code. Open Track Application and enter both to see your status. You can also call 8109995906 for assistance.",
  ],
  [
    "Who operates Savrdh Instant Loan?",
    "Savrdh Instant Loan is a brand product of Savrdh Financial Services Private Limited, providing loan application and credit facilitation assistance.",
  ],
];
export function Home() {
  const [faq, setFaq] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-grain" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <Reveal>
                <span className="hero-pill">
                  <span /> A LITTLE MOMENTUM. A BIGGER TOMORROW.
                </span>
                <h1>
                  Your next move.
                  <br />
                  <em>Made possible.</em>
                </h1>
                <p>
                  For the life you’re building and the business you believe in.
                  A simpler way to explore your loan possibilities.
                </p>
                <div className="hero-buttons">
                  <Link href="/apply" className="button button-gold">
                    Let’s get you started <ArrowUpRight size={20} />
                  </Link>
                  <a className="text-link" href="#calculator">
                    Calculate your EMI <ArrowRight size={16} />
                  </a>
                </div>
                <div className="hero-assurance">
                  <span>
                    <Check size={14} />
                    Simple online request
                  </span>
                  <span>
                    <Check size={14} />
                    Personal guidance
                  </span>
                </div>
              </Reveal>
              <div className="hero-bottom-note">
                <span className="tiny-logo">S</span>
                <span>
                  BACKED BY EXPERIENCE. BUILT AROUND YOU.
                  <br />
                  <strong>Savrdh Financial Services Private Limited</strong>
                </span>
              </div>
            </div>
            <div
              className="hero-visual"
              aria-label="A visual illustration of your loan journey"
            >
              <div className="orbital orbital-one" />
              <div className="orbital orbital-two" />
              <div className="hero-glow" />
              <m.div
                className="credit-card credit-card-back"
                initial={{ opacity: 0, rotate: 5, y: 35 }}
                animate={{ opacity: 1, rotate: 10, y: 0 }}
                transition={{ duration: 0.9 }}
              />
              <m.div
                className="credit-card credit-card-main"
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                animate={{
                  opacity: 1,
                  y: reduce ? 0 : [0, -10, 0],
                  rotate: -7,
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  rotate: { duration: 0.8 },
                  y: {
                    duration: 7,
                    repeat: reduce ? 0 : Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="card-top">
                  <span>SAVRDH.</span>
                  <ArrowUpRight size={30} />
                </div>
                <div className="card-chip">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="card-title">
                  A brighter future.
                  <br />
                  <em>Starts with you.</em>
                </div>
                <div className="card-foot">
                  <span>INSTANT LOAN</span>
                  <span className="card-rings">
                    <i />
                    <i />
                  </span>
                </div>
              </m.div>
              <m.div
                className="floating-note note-top"
                animate={reduce ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <span className="note-icon">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <strong>Your goals. Our guidance.</strong>
                  <small>With you at every step</small>
                </div>
              </m.div>
              <m.div
                className="floating-note note-bottom"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="note-heading">
                  <span>
                    <Sparkles size={15} /> YOUR NEXT CHAPTER
                  </span>
                  <ArrowUpRight size={18} />
                </div>
                <div className="note-progress">
                  <span className="done">
                    <Check size={11} />
                  </span>
                  <i />
                  <span>2</span>
                  <i />
                  <span>3</span>
                </div>
                <div className="note-steps">
                  <span>Apply</span>
                  <span>Review</span>
                  <span>Move forward</span>
                </div>
              </m.div>
              <span className="visual-caption">
                BIG POSSIBILITIES. ONE SIMPLE BEGINNING.
              </span>
              <span className="spark spark-one">✧</span>
              <span className="spark spark-two">✧</span>
            </div>
          </div>
          <div className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <span>↓</span>
          </div>
        </section>
        <div className="trust-strip">
          <div className="container">
            <span>
              <FileCheck2 />
              Easy digital application
            </span>
            <span>
              <Headphones />A real team, by your side
            </span>
            <span>
              <ShieldCheck />
              Clear next steps
            </span>
            <span>
              <Clock3 />
              Track your progress
            </span>
          </div>
        </div>
        <section id="solutions" className="section solutions">
          <div className="container">
            <Reveal className="section-heading heading-split">
              <div>
                <span className="eyebrow">POSSIBILITIES, PERSONALISED</span>
                <h2>
                  A loan for your
                  <br />
                  <em>kind of ambition.</em>
                </h2>
              </div>
              <p>
                Different dreams need different solutions.
                <br />
                Find the right place to begin.
              </p>
            </Reveal>
            <div className="loan-grid">
              {loans.map((loan, i) => (
                <Reveal key={loan.name} delay={i * 0.06}>
                  <Link
                    href={`/apply?product=${encodeURIComponent(loan.name)}`}
                    className={`loan-card ${loan.className}`}
                  >
                    <div className="loan-card-top">
                      <span className="loan-icon">
                        <loan.icon size={26} strokeWidth={1.4} />
                      </span>
                      <span className="loan-number">{loan.number}</span>
                    </div>
                    <span className="eyebrow">{loan.tag}</span>
                    <h3>{loan.name}</h3>
                    <p>{loan.description}</p>
                    <span className="loan-cta">
                      Explore this loan{" "}
                      <span>
                        <ArrowUpRight size={20} />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <p className="section-fineprint">
              Availability, eligibility and final terms are subject to lending
              institution assessment.
            </p>
          </div>
        </section>
        <section id="how-it-works" className="journey section">
          <div className="container journey-grid">
            <Reveal>
              <span className="eyebrow">LESS FRICTION. MORE FORWARD.</span>
              <h2>
                From “what if”
                <br />
                to <em>“what’s next”.</em>
              </h2>
              <p>
                A clear path, with someone to guide you.
                <br />
                That’s how borrowing should begin.
              </p>
              <Link href="/apply" className="button button-dark">
                Start your application <ArrowUpRight size={18} />
              </Link>
              <div className="journey-art" aria-hidden="true">
                <span className="journey-stair s1" />
                <span className="journey-stair s2" />
                <span className="journey-stair s3" />
                <span className="journey-stair s4" />
                <ArrowUpRight size={90} strokeWidth={1} />
              </div>
            </Reveal>
            <div className="journey-steps">
              {[
                [
                  "01",
                  "Tell us what you have in mind.",
                  "Share a few details and your loan requirement. Your journey starts with a simple online application.",
                ],
                [
                  "02",
                  "We help you find the way.",
                  "Our team reviews your request, discusses suitable options and guides you through required documents.",
                ],
                [
                  "03",
                  "Take your next step with clarity.",
                  "Review lender terms, complete verification and track your application through to its outcome.",
                ],
              ].map(([n, title, desc], i) => (
                <Reveal className="journey-step" key={n} delay={i * 0.08}>
                  <span>{n}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <Calculator />
        <section className="care-section section">
          <div className="container care-grid">
            <Reveal className="care-art">
              <div className="care-orbit" />
              <div className="care-shield">
                <ShieldCheck size={92} strokeWidth={1} />
              </div>
              <span className="care-label">
                <BadgeCheck size={18} />
                Human guidance. Always.
              </span>
              <span className="care-mini">
                More than an application.
                <br />
                <em>A conversation.</em>
              </span>
            </Reveal>
            <Reveal>
              <span className="eyebrow">THE SAVRDH DIFFERENCE</span>
              <h2>
                Finance is personal.
                <br />
                <em>So is our approach.</em>
              </h2>
              <p className="care-intro">
                Behind every application is a real ambition. We make space to
                understand yours.
              </p>
              <div className="care-points">
                <div>
                  <ShieldCheck />
                  <span>
                    <strong>Clarity at every step</strong>
                    <p>Understand the process before moving forward.</p>
                  </span>
                </div>
                <div>
                  <UserRound />
                  <span>
                    <strong>People, not just a process</strong>
                    <p>Talk to a team that helps you navigate your options.</p>
                  </span>
                </div>
                <div>
                  <FileCheck2 />
                  <span>
                    <strong>Your progress, in view</strong>
                    <p>A dedicated reference to follow your application.</p>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="section faq-section">
          <div className="container faq-grid">
            <Reveal>
              <span className="eyebrow">A LITTLE MORE CLARITY</span>
              <h2>
                Good questions.
                <br />
                <em>Straight answers.</em>
              </h2>
              <p>Still have something on your mind?</p>
              <a className="text-link" href="tel:+918109995906">
                <Phone size={17} />
                Talk to us: 8109995906
              </a>
            </Reveal>
            <div className="faq-list">
              {faqs.map(([q, a], i) => (
                <div
                  className={`faq-item ${faq === i ? "active" : ""}`}
                  key={q}
                >
                  <button
                    aria-expanded={faq === i}
                    aria-controls={`faq-${i}`}
                    onClick={() => setFaq(faq === i ? null : i)}
                  >
                    {q}
                    {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                  <div id={`faq-${i}`} hidden={faq !== i}>
                    <p>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="closing-section">
          <div className="container">
            <Reveal>
              <span className="eyebrow">YOUR NEXT CHAPTER IS CALLING</span>
              <h2>
                Make room for
                <br />
                <em>what’s possible.</em>
              </h2>
              <Link href="/apply" className="button button-gold">
                Start your journey <ArrowUpRight size={20} />
              </Link>
              <a href="tel:+918109995906" className="closing-call">
                Or call us on +91 8109995906
              </a>
            </Reveal>
            <div className="closing-rings" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
