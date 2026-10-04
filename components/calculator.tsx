"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { emi, money } from "@/lib/finance";
import { Reveal, m } from "./motion";
export function Calculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(36);
  const payment = emi(amount, rate, months);
  const interest = payment * months - amount;
  const percent = (amount / (amount + interest)) * 100;
  return (
    <section id="calculator" className="calculator-section section">
      <div className="container">
        <Reveal className="section-heading centered">
          <span className="eyebrow">CLARITY BEFORE COMMITMENT</span>
          <h2>
            Big plans. <em>Comfortable EMIs.</em>
          </h2>
          <p>Find the monthly number that fits your life.</p>
        </Reveal>
        <Reveal className="calculator">
          <div className="calc-controls">
            <div className="range-field">
              <label htmlFor="amount">
                How much do you need?<strong>{money(amount)}</strong>
              </label>
              <input
                id="amount"
                type="range"
                min={25000}
                max={2500000}
                step={25000}
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
              />
              <div className="range-extents">
                <span>₹25,000</span>
                <span>₹25,00,000</span>
              </div>
            </div>
            <div className="range-field">
              <label htmlFor="months">
                Repayment period<strong>{months} months</strong>
              </label>
              <input
                id="months"
                type="range"
                min={6}
                max={84}
                step={6}
                value={months}
                onChange={(e) => setMonths(+e.target.value)}
              />
              <div className="range-extents">
                <span>6 months</span>
                <span>84 months</span>
              </div>
            </div>
            <div className="range-field">
              <label htmlFor="rate">
                Annual interest rate<strong>{rate}% p.a.</strong>
              </label>
              <input
                id="rate"
                type="range"
                min={6}
                max={36}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
              />
              <div className="range-extents">
                <span>6%</span>
                <span>36%</span>
              </div>
            </div>
            <p className="micro-note">
              <Info size={15} />
              Illustrative estimate. Fees and taxes are excluded. Actual rates
              and terms depend on your lender.
            </p>
          </div>
          <div className="calc-result">
            <span className="eyebrow">YOUR ESTIMATED MONTHLY EMI</span>
            <m.div
              key={Math.round(payment)}
              initial={{ opacity: 0.7, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="emi-value"
            >
              {money(payment)}
              <small>/ month</small>
            </m.div>
            <div className="calc-breakdown">
              <div
                className="donut"
                style={{
                  background: `conic-gradient(#d9bf88 0% ${percent}%,#45605a ${percent}% 100%)`,
                }}
              >
                <span>₹</span>
              </div>
              <div>
                <p>
                  <i />
                  Principal <strong>{money(amount)}</strong>
                </p>
                <p>
                  <i className="interest-dot" />
                  Interest <strong>{money(interest)}</strong>
                </p>
                <p className="total">
                  Total payable <strong>{money(payment * months)}</strong>
                </p>
              </div>
            </div>
            <Link
              href={`/apply?amount=${amount}&tenure=${months}`}
              className="button button-gold"
            >
              Make your next move <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
