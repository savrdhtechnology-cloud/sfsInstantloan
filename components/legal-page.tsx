"use client";
import { ArrowLeft, ArrowUpRight, FileText, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Header, Footer } from "./site-shell";
import { Reveal, m, useReducedMotion } from "./motion";

export type LegalSection={title:string;body:React.ReactNode};

export function LegalPage({
  eyebrow,title,subtitle,sections
}:{
  eyebrow:string;title:string;subtitle:string;sections:LegalSection[]
}){
  const reduce=useReducedMotion();
  return <>
    <Header/>
    <main className="legal-page-shell">
      <section className="legal-hero">
        <div className="legal-grid-bg"/>
        <div className="container legal-hero-grid">
          <Reveal>
            <Link href="/" className="track-back"><ArrowLeft size={14}/> Back to home</Link>
            <span className="subpage-eyebrow"><Sparkles size={13}/>{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </Reveal>
          <div className="legal-visual">
            <m.div
              className="legal-doc"
              animate={reduce?{}:{y:[0,-10,0],rotate:[-2,1,-2]}}
              transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
            >
              <FileText/>
              <strong>SAVRDH</strong>
              <span>{title}</span>
              <i/><i/><i/>
            </m.div>
            <m.div className="legal-shield" animate={reduce?{}:{scale:[1,1.07,1]}} transition={{duration:3.5,repeat:Infinity}}>
              <ShieldCheck/>
            </m.div>
          </div>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="container legal-content-grid">
          <aside className="legal-side">
            <span className="nova-kicker dark">CLEAR INFORMATION</span>
            <h2>Important details, <em>easy to review.</em></h2>
            <p>Read these terms carefully before using the service or submitting an application.</p>
            <Link href="/apply" className="nova-btn nova-btn-primary">Start application <ArrowUpRight size={16}/></Link>
          </aside>
          <div className="legal-sections">
            {sections.map((section,i)=>(
              <m.article
                key={section.title}
                className="legal-section-card"
                initial={{opacity:0,y:24}}
                whileInView={{opacity:1,y:0}}
                viewport={{once:true,amount:.25}}
                transition={{duration:.5,delay:i*.045}}
              >
                <span>{String(i+1).padStart(2,"0")}</span>
                <div><h2>{section.title}</h2><div className="legal-body">{section.body}</div></div>
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
