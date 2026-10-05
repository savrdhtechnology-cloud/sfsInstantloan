"use client";
import { useState, type FormEvent } from "react";
import {
  Search, Check, ArrowRight, ArrowLeft, ShieldCheck, Clock3,
  FileCheck2, Landmark, BadgeCheck, CircleDollarSign, Sparkles, type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { Header, Footer } from "./site-shell";
import { statuses, money, type LoanStatus } from "@/lib/finance";
import { Reveal, m, useReducedMotion } from "./motion";

type Tracked = {
  reference: string;
  status: LoanStatus;
  product: string;
  amount: number;
  updated_at: string;
};

const statusMeta: Record<string,{icon:LucideIcon;title:string;desc:string}> = {
  New:{icon:Sparkles,title:"Application received",desc:"Your request has been recorded in the system."},
  Contacted:{icon:Clock3,title:"Contact initiated",desc:"Our team has started the next communication step."},
  "Documents Pending":{icon:FileCheck2,title:"Documents pending",desc:"Some verification information or documents may still be required."},
  "Under Review":{icon:Landmark,title:"Under review",desc:"Your details are being reviewed against the relevant assessment process."},
  Approved:{icon:BadgeCheck,title:"Approved",desc:"Your application has reached an approved status. Review final terms carefully."},
  Disbursed:{icon:CircleDollarSign,title:"Disbursed",desc:"The application has reached the disbursed stage."},
};

export function TrackForm() {
  const [app,setApp]=useState<Tracked|null>(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const reduce=useReducedMotion();

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setBusy(true);setError("");setApp(null);
    const form=new FormData(e.currentTarget);
    try{
      const res=await fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        reference:String(form.get("reference")).trim().toUpperCase(),
        code:String(form.get("code")).trim(),
      })});
      const data=await res.json();
      if(!res.ok)throw new Error(data.error);
      setApp(data.application);
    }catch(err){
      setError(err instanceof Error?err.message:"Unable to check status.");
    }finally{setBusy(false)}
  }

  const visibleStatuses=statuses.filter(s=>s!=="Closed");
  const currentIndex=app?visibleStatuses.indexOf(app.status as Exclude<LoanStatus,"Closed">):-1;

  return (
    <>
      <Header/>
      <main className="track-page">
        <section className="track-hero">
          <div className="track-grid-bg"/>
          <div className="container track-hero-grid">
            <Reveal className="track-copy">
              <Link href="/" className="track-back"><ArrowLeft size={14}/> Back to home</Link>
              <span className="subpage-eyebrow"><Sparkles size={13}/> LIVE APPLICATION JOURNEY</span>
              <h1>Track every <em>next step.</em></h1>
              <p>Use your application reference and private tracking code to see the latest status of your SAVRDH Instant Loan request.</p>
              <div className="track-assurance">
                <span><ShieldCheck/> Private status access</span>
                <span><Clock3/> Latest recorded update</span>
              </div>
            </Reveal>

            <div className="track-visual">
              <m.div className="track-orbit t1" animate={reduce?{}:{rotate:360}} transition={{duration:24,repeat:Infinity,ease:"linear"}}/>
              <m.div className="track-orbit t2" animate={reduce?{}:{rotate:-360}} transition={{duration:30,repeat:Infinity,ease:"linear"}}/>
              <m.div className="track-phone" animate={reduce?{}:{y:[0,-12,0],rotate:[2,0,2]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}>
                <span>APPLICATION STATUS</span>
                <strong>{app?.status ?? "Ready to track"}</strong>
                <div className="track-mini-line"><i/><i/><i/></div>
                <small>{app?.reference ?? "Enter your reference below"}</small>
              </m.div>
            </div>
          </div>
        </section>

        <section className="track-search-section">
          <div className="container track-search-grid">
            <Reveal className="track-search-card">
              <span className="nova-kicker dark">SECURE STATUS LOOKUP</span>
              <h2>Find your <em>application.</em></h2>
              <p>Enter the reference and private tracking code created after application submission.</p>
              <form onSubmit={submit}>
                <label className="track-field">
                  <span>Application reference</span>
                  <input name="reference" required maxLength={30} placeholder="SIL-2026-XXXXXXXXXX" autoComplete="off"/>
                </label>
                <label className="track-field">
                  <span>Private tracking code</span>
                  <input name="code" type="password" required minLength={64} maxLength={64} placeholder="Your private 64-character code" autoComplete="off"/>
                  <small>This code protects your application status from unauthorized access.</small>
                </label>
                <button className="track-search-btn" disabled={busy}>
                  {busy?"Checking application…":"Track application"} <Search size={17}/>
                </button>
              </form>
              {error?<m.div className="track-error" initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} role="alert">{error}</m.div>:null}
            </Reveal>

            <Reveal className="track-help-card">
              <ShieldCheck/>
              <h3>Keep your tracking code private.</h3>
              <p>Never share your OTP, PIN, CVV or banking password with anyone. Lost your tracking code? Call <strong>8109995906</strong> for identity-verified assistance.</p>
              <a href="tel:+918109995906">Call support <ArrowRight size={15}/></a>
            </Reveal>
          </div>
        </section>

        <section className="track-status-section">
          <div className="container">
            <Reveal className="track-status-heading">
              <div>
                <span className="nova-kicker dark">{app?"CURRENT APPLICATION":"HOW STATUS PROGRESSES"}</span>
                <h2>{app?<>Your journey is <em>{app.status}.</em></>:<>A clear path from <em>start to finish.</em></>}</h2>
                {app?<p>{app.product} · {money(app.amount)} requested · Reference {app.reference}</p>:<p>Once you track an application, this timeline highlights the latest completed stage.</p>}
              </div>
              {app&&<span className="track-updated">Updated {new Date(app.updated_at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})}</span>}
            </Reveal>

            {app?.status==="Closed"?(
              <Reveal className="closed-application"><ShieldCheck/><div><strong>Application closed</strong><p>Contact our team for application-specific details.</p></div></Reveal>
            ):(
              <div className="track-journey">
                <div className="track-journey-rail">
                  <m.i
                    initial={{scaleX:0}}
                    animate={{scaleX: app ? Math.max(0,(currentIndex)/(visibleStatuses.length-1)) : 0}}
                    transition={{duration:1.1,ease:[.2,.7,.2,1]}}
                    style={{transformOrigin:"left center"}}
                  />
                </div>
                {visibleStatuses.map((s,i)=>{
                  const meta=statusMeta[s];
                  const Icon=meta.icon;
                  const complete=app?i<=currentIndex:false;
                  const current=app?i===currentIndex:false;
                  return (
                    <m.div
                      className={`track-stage ${complete?"complete":""} ${current?"current":""}`}
                      key={s}
                      initial={{opacity:0,y:20}}
                      whileInView={{opacity:1,y:0}}
                      viewport={{once:true,amount:.4}}
                      transition={{duration:.45,delay:i*.08}}
                    >
                      <m.div className="track-stage-dot" animate={current&&!reduce?{scale:[1,1.12,1]}:{}} transition={{duration:2,repeat:Infinity}}>
                        {complete?<Check size={15}/>:<span>{i+1}</span>}
                      </m.div>
                      <div className="track-stage-card">
                        <Icon/>
                        <span>{s}</span>
                        <h3>{meta.title}</h3>
                        <p>{meta.desc}</p>
                      </div>
                    </m.div>
                  )
                })}
              </div>
            )}

            <Reveal className="track-new-cta">
              <div><strong>Need another loan request?</strong><span>Start a new personal loan application from ₹5,000 to ₹3,00,000.</span></div>
              <Link href="/apply" className="nova-btn nova-btn-primary">Apply now <ArrowRight size={16}/></Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
