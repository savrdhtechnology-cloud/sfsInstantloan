"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Phone, ArrowRight } from "lucide-react";
import { Brand } from "./brand";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Brand />
        <nav
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <Link href="/#solutions" onClick={() => setOpen(false)}>
            Loan solutions
          </Link>
          <Link href="/#how-it-works" onClick={() => setOpen(false)}>
            How it works
          </Link>
          <Link href="/#calculator" onClick={() => setOpen(false)}>
            EMI calculator
          </Link>
          <Link href="/track" onClick={() => setOpen(false)}>
            Track application
          </Link>
        </nav>
        <div className="nav-actions">
          <a className="nav-phone" href="tel:+918109995906">
            <Phone size={15} />
            8109995906
          </a>
          <Link href="/apply" className="button button-dark button-small">
            Get started <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle icon-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand light />
            <p>
              A little momentum.
              <br />A world of possibilities.
            </p>
            <small>A brand of Savrdh Financial Services Private Limited.</small>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/#solutions">Loan solutions</Link>
            <Link href="/#calculator">EMI calculator</Link>
            <Link href="/apply">Apply for a loan</Link>
            <Link href="/track">Track application</Link>
          </div>
          <div>
            <h4>Let’s talk</h4>
            <a className="footer-phone" href="tel:+918109995906">
              +91 8109995906 <ArrowUpRight size={18} />
            </a>
            <a
              href="https://wa.me/918109995906"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp <ArrowRight size={15} />
            </a>
            <Link href="/login">Team CRM login</Link>
          </div>
        </div>
        <div className="footer-disclosure">
          Savrdh Instant Loan assists with loan applications and credit
          facilitation. Approval, pricing, eligibility and disbursement are
          determined by the lending institution after assessment. “Instant”
          refers to starting your request online, not guaranteed instant
          approval or funding. No lender affiliation is claimed.
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Savrdh Financial Services Private
            Limited.
          </span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms of use</Link>
          </div>
          <span>
            Made for your next move <span className="gold">↗</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
