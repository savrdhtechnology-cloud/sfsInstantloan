"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Header, Footer } from "./site-shell";
import { m, Reveal } from "./motion";
import { money, products } from "@/lib/finance";
type Details = {
  full_name: string;
  phone: string;
  email: string;
  city: string;
  employment: string;
  monthly_income: string;
  product: string;
  amount: string;
  tenure: string;
  purpose: string;
  website: string;
};
export function ApplicationForm({
  connected,
  initialProduct,
  initialAmount,
  initialTenure,
}: {
  connected: boolean;
  initialProduct: string;
  initialAmount: number;
  initialTenure: number;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Details>({
    full_name: "",
    phone: "",
    email: "",
    city: "",
    employment: "Salaried",
    monthly_income: "",
    product: initialProduct,
    amount: String(initialAmount),
    tenure: String(initialTenure),
    purpose: "",
    website: "",
  });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<{
    reference: string;
    tracking_code: string;
  } | null>(null);
  const requestId = useRef("");
  const update = (key: keyof Details, value: string) =>
    setData((old) => ({ ...old, [key]: value }));
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    if (!consent) {
      setError("Please accept the consent to proceed.");
      return;
    }
    if (!connected) {
      setError(
        "Online applications are being connected. Please call 8109995906.",
      );
      return;
    }
    setBusy(true);
    requestId.current ||= crypto.randomUUID();
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent,
          request_id: requestId.current,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setReceipt(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  function download() {
    if (!receipt) return;
    const body = `SAVRDH INSTANT LOAN\nA brand of Savrdh Financial Services Private Limited\n\nApplication reference: ${receipt.reference}\nPrivate tracking code: ${receipt.tracking_code}\nTrack at: ${window.location.origin}/track\n\nSave this code privately. It grants access to your application status.\nApplication received; this is not a loan approval.\nAssistance: +91 8109995906\n`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = receipt.reference + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <Header />
      <main className="container">
        <Reveal className="page-intro">
          <Link href="/" className="back-link">
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <span className="eyebrow">ONE STEP CLOSER TO YOUR NEXT CHAPTER</span>
          <h1>
            Let’s make a <em>beginning.</em>
          </h1>
          <p>
            Tell us a little about yourself. We’ll help you explore the
            possibilities.
          </p>
        </Reveal>
        <div className="application-grid">
          <div className="form-card">
            {receipt ? (
              <div role="status">
                <span className="success-icon">
                  <CheckCircle2 size={30} />
                </span>
                <h2 className="form-title">Your next chapter has started.</h2>
                <p className="form-subtitle">
                  Your request was saved successfully. Keep these details to
                  track your progress.
                </p>
                <p>
                  <strong>{receipt.reference}</strong>
                </p>
                <div className="tracking-secret">
                  <small>PRIVATE TRACKING CODE</small>
                  <br />
                  {receipt.tracking_code}
                </div>
                <p className="micro-note">
                  Save this code now. It will not be emailed automatically. Your
                  request is subject to assessment and is not a loan approval.
                </p>
                <div className="form-actions">
                  <button className="button button-dark" onClick={download}>
                    <Download size={16} />
                    Save receipt
                  </button>
                  <Link className="button button-outline" href="/track">
                    Track application <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="step-indicator">
                  {["About you", "Your plans", "Review"].map((label, i) => (
                    <span className={step >= i ? "current" : ""} key={label}>
                      <i>{step > i ? <Check size={11} /> : i + 1}</i>
                      {label}
                      {i < 2 ? <b /> : null}
                    </span>
                  ))}
                </div>
                {!connected ? (
                  <div className="notice">
                    Online applications are opening soon. You can explore the
                    form or call{" "}
                    <a href="tel:+918109995906">
                      <strong>8109995906</strong>
                    </a>{" "}
                    for assistance.
                  </div>
                ) : null}
                <form onSubmit={submit}>
                  <m.div
                    key={step}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 0 ? (
                      <>
                        <h2 className="form-title">
                          First, a little about you.
                        </h2>
                        <p className="form-subtitle">
                          Your details help our team get in touch.
                        </p>
                        <div className="form-grid">
                          <label className="field">
                            Full name
                            <input
                              autoComplete="name"
                              required
                              minLength={2}
                              maxLength={100}
                              value={data.full_name}
                              onChange={(e) =>
                                update("full_name", e.target.value)
                              }
                              placeholder="Your full name"
                            />
                          </label>
                          <label className="field">
                            Mobile number
                            <input
                              type="tel"
                              autoComplete="tel-national"
                              inputMode="numeric"
                              required
                              pattern="[6-9][0-9]{9}"
                              maxLength={10}
                              value={data.phone}
                              onChange={(e) =>
                                update(
                                  "phone",
                                  e.target.value.replace(/\D/g, ""),
                                )
                              }
                              placeholder="10-digit mobile number"
                            />
                          </label>
                          <label className="field">
                            Email address
                            <input
                              type="email"
                              autoComplete="email"
                              required
                              maxLength={254}
                              value={data.email}
                              onChange={(e) => update("email", e.target.value)}
                              placeholder="you@example.com"
                            />
                          </label>
                          <label className="field">
                            City
                            <input
                              autoComplete="address-level2"
                              required
                              minLength={2}
                              maxLength={100}
                              value={data.city}
                              onChange={(e) => update("city", e.target.value)}
                              placeholder="Your city"
                            />
                          </label>
                          <label className="field">
                            Employment type
                            <select
                              value={data.employment}
                              onChange={(e) =>
                                update("employment", e.target.value)
                              }
                            >
                              {[
                                "Salaried",
                                "Self-employed",
                                "Business owner",
                                "Professional",
                                "Other",
                              ].map((v) => (
                                <option key={v}>{v}</option>
                              ))}
                            </select>
                          </label>
                          <label className="field">
                            Monthly income (₹)
                            <input
                              type="number"
                              inputMode="numeric"
                              min={0}
                              max={100000000}
                              required
                              value={data.monthly_income}
                              onChange={(e) =>
                                update("monthly_income", e.target.value)
                              }
                              placeholder="e.g. 40,000"
                            />
                          </label>
                        </div>
                      </>
                    ) : step === 1 ? (
                      <>
                        <h2 className="form-title">
                          What do you have in mind?
                        </h2>
                        <p className="form-subtitle">
                          Share your requirement. Final availability and terms
                          depend on assessment.
                        </p>
                        <div className="form-grid">
                          <label className="field full">
                            Loan solution
                            <select
                              value={data.product}
                              onChange={(e) =>
                                update("product", e.target.value)
                              }
                            >
                              {products.map((p) => (
                                <option key={p}>{p}</option>
                              ))}
                            </select>
                          </label>
                          <label className="field">
                            Loan amount (₹)
                            <input
                              type="number"
                              min={25000}
                              max={100000000}
                              required
                              value={data.amount}
                              onChange={(e) => update("amount", e.target.value)}
                            />
                          </label>
                          <label className="field">
                            Preferred tenure (months)
                            <input
                              type="number"
                              min={6}
                              max={240}
                              step={1}
                              required
                              value={data.tenure}
                              onChange={(e) => update("tenure", e.target.value)}
                            />
                          </label>
                          <label className="field full">
                            Anything you’d like us to know?{" "}
                            <textarea
                              maxLength={1000}
                              value={data.purpose}
                              onChange={(e) =>
                                update("purpose", e.target.value)
                              }
                              placeholder="Tell us about your plans (optional)"
                            />
                            <small>
                              Please do not enter Aadhaar, PAN, bank details,
                              passwords or OTPs here.
                            </small>
                          </label>
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="form-title">One last look.</h2>
                        <p className="form-subtitle">
                          Check your details before sending your request.
                        </p>
                        <dl className="review-grid">
                          {[
                            ["Applicant", data.full_name],
                            ["Mobile", data.phone],
                            ["Email", data.email],
                            ["City", data.city],
                            ["Loan", data.product],
                            ["Requested amount", money(+data.amount)],
                            ["Preferred tenure", data.tenure + " months"],
                            ["Monthly income", money(+data.monthly_income)],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <dt>{k}</dt>
                              <dd>{v}</dd>
                            </div>
                          ))}
                        </dl>
                        <label className="check-label">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            required
                          />
                          <span>
                            I confirm the information is accurate and consent to
                            Savrdh Financial Services Private Limited processing
                            these details and contacting me about this loan
                            request. I accept the{" "}
                            <Link href="/privacy" target="_blank">
                              Privacy Notice
                            </Link>{" "}
                            and{" "}
                            <Link href="/terms" target="_blank">
                              Terms of Use
                            </Link>
                            . I understand approval and funding are subject to
                            lender assessment.
                            <br />
                            <span lang="hi">
                              मैं दी गई जानकारी के उपयोग और इस ऋण अनुरोध के
                              संबंध में संपर्क करने की सहमति देता/देती हूँ। ऋण
                              स्वीकृति ऋणदाता के मूल्यांकन पर निर्भर है।
                            </span>
                          </span>
                        </label>
                      </>
                    )}
                  </m.div>
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-10000px" }}
                  >
                    <label>
                      Website
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        value={data.website}
                        onChange={(e) => update("website", e.target.value)}
                      />
                    </label>
                  </div>
                  {error ? (
                    <div
                      className="notice error"
                      role="alert"
                      style={{ marginTop: 20 }}
                    >
                      {error}
                    </div>
                  ) : null}
                  <div className="form-actions">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="button button-outline"
                        disabled={busy}
                        onClick={() => {
                          setStep(step - 1);
                          setError("");
                        }}
                      >
                        <ArrowLeft size={15} />
                        Back
                      </button>
                    ) : (
                      <span className="micro-note">
                        <ShieldCheck size={15} />
                        Your details stay private.
                      </span>
                    )}
                    <button
                      className="button button-dark"
                      disabled={busy || (step === 2 && !connected)}
                    >
                      {busy
                        ? "Submitting…"
                        : step === 2
                          ? "Submit application"
                          : "Continue"}
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
          <aside className="application-aside">
            <div className="support-card">
              <span className="eyebrow">
                A REAL PERSON. A REAL CONVERSATION.
              </span>
              <h3>
                A little guidance
                <br />
                goes a long way.
              </h3>
              <p>
                Have a question before you begin? We’re here to help you take
                the next step.
              </p>
              <a href="tel:+918109995906">
                <Phone size={19} />
                8109995906
              </a>
              <small>
                Loan assistance by Savrdh Financial Services Private Limited.
              </small>
            </div>
            <div className="side-checklist">
              <div>
                <CheckCircle2 />
                Simple, guided application
              </div>
              <div>
                <CheckCircle2 />
                Dedicated application reference
              </div>
              <div>
                <CheckCircle2 />
                Clear status updates
              </div>
              <div>
                <ShieldCheck />
                Never share your OTP or bank password.
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
