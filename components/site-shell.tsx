"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Phone, ArrowRight } from "lucide-react";
import { Brand } from "./brand";

export function Header() {
  const [open,setOpen]=useState(false);
  return (
    <header className="site-header nova-header">
      <div className="container nav-row">
        <Brand />
        <nav className={open?"main-nav is-open":"main-nav"} aria-label="Main navigation">
          <Link href="/#personal-loan" onClick={()=>setOpen(false)}>Personal loan</Link>
          <Link href="/#calculator" onClick={()=>setOpen(false)}>EMI calculator</Link>
          <Link href="/#how-it-works" onClick={()=>setOpen(false)}>How it works</Link>
          <Link href="/track" onClick={()=>setOpen(false)}>Track application</Link>
        </nav>
        <div className="nav-actions">
          <a className="nav-phone" href="tel:+918109995906"><Phone size={15}/>8109995906</a>
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
