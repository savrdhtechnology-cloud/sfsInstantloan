"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { emi, money } from "@/lib/finance";
import { Reveal, m } from "./motion";

export function Calculator() {
  const [amount,setAmount]=useState(75000);
  const [rate,setRate]=useState(16);
  const [months,setMonths]=useState(18);
  const payment=emi(amount,rate,months);
  const interest=payment*months-amount;
  const percent=(amount/(amount+interest))*100;

  return (
    <section id="calculator" className="calculator-section section nova-calculator-section">
      <div className="container">
        <Reveal className="nova-heading centered dark-copy">
          <span className="nova-kicker dark">PLAN BEFORE YOU APPLY</span>
          <h2>See an <em>illustrative EMI.</em></h2>
          <p>Adjust the amount, tenure and interest rate to understand a possible monthly repayment.</p>
        </Reveal>
        <Reveal className="calculator nova-calculator">
          <div className="calc-controls">
            <div className="range-field">
              <label htmlFor="amount">Loan amount <strong>{money(amount)}</strong></label>
              <input id="amount" type="range" min={5000} max={300000} step={5000} value={amount} onChange={e=>setAmount(+e.target.value)}/>
              <div className="range-extents"><span>₹5,000</span><span>₹3,00,000</span></div>
            </div>
            <div className="range-field">
              <label htmlFor="months">Repayment period <strong>{months} months</strong></label>
              <input id="months" type="range" min={3} max={60} step={3} value={months} onChange={e=>setMonths(+e.target.value)}/>
              <div className="range-extents"><span>3 months</span><span>60 months</span></div>
            </div>
            <div className="range-field">
              <label htmlFor="rate">Illustrative annual rate <strong>{rate}% p.a.</strong></label>
              <input id="rate" type="range" min={10} max={36} step={0.5} value={rate} onChange={e=>setRate(+e.target.value)}/>
              <div className="range-extents"><span>10%</span><span>36%</span></div>
            </div>
            <p className="micro-note"><Info size={15}/>This is only an estimate. Actual rate, fees, taxes and tenure depend on the lender and your profile.</p>
          </div>
          <div className="calc-result">
            <span className="eyebrow">ESTIMATED MONTHLY EMI</span>
            <m.div key={Math.round(payment)} initial={{opacity:.6,y:4}} animate={{opacity:1,y:0}} className="emi-value">
              {money(payment)}<small>/ month</small>
            </m.div>
            <div className="calc-breakdown">
              <div className="donut" style={{background:`conic-gradient(#ff6b5f 0% ${percent}%,#5d56f1 ${percent}% 100%)`}}><span>₹</span></div>
              <div>
                <p><i/>Principal <strong>{money(amount)}</strong></p>
                <p><i className="interest-dot"/>Interest <strong>{money(interest)}</strong></p>
                <p className="total">Total payable <strong>{money(payment*months)}</strong></p>
              </div>
            </div>
            <Link href={`/apply?amount=${amount}&tenure=${months}`} className="nova-btn nova-btn-primary">Apply for this amount <ArrowUpRight size={18}/></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
