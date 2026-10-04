"use client";
import { useState, type FormEvent } from "react";
import { Search, Check, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Header, Footer } from "./site-shell";
import { statuses, money, type LoanStatus } from "@/lib/finance";
type Tracked = {
  reference: string;
  status: LoanStatus;
  product: string;
  amount: number;
  updated_at: string;
};
export function TrackForm() {
  const [app, setApp] = useState<Tracked | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setApp(null);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: String(form.get("reference")).trim().toUpperCase(),
          code: String(form.get("code")).trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setApp(data.application);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to check status.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Header />
      <main className="track-container">
        <Link href="/" className="back-link">
          <ArrowLeft size={14} />
          Back to home
        </Link>
        <div className="form-card">
          <span className="eyebrow">YOUR NEXT STEP, IN VIEW</span>
          <h1 className="form-title" style={{ fontSize: 32 }}>
            Follow your <em>progress.</em>
          </h1>
          <p className="form-subtitle">
            Use the reference and private code from your application receipt.
          </p>
          <form onSubmit={submit}>
            <div className="form-grid">
              <label className="field full">
                Application reference
                <input
                  name="reference"
                  required
                  maxLength={30}
                  placeholder="SIL-2026-XXXXXXXXXX"
                  autoComplete="off"
                />
              </label>
              <label className="field full">
                Private tracking code
                <input
                  name="code"
                  type="password"
                  required
                  minLength={64}
                  maxLength={64}
                  placeholder="The code saved with your receipt"
                  autoComplete="off"
                />
                <small>
                  This protects your status from unauthorized access.
                </small>
              </label>
            </div>
            <button
              className="button button-dark"
              style={{ marginTop: 23, width: "100%" }}
              disabled={busy}
            >
              {busy ? "Checking…" : "Check application status"}
              <Search size={16} />
            </button>
          </form>
          {error ? (
            <div
              className="notice error"
              role="alert"
              style={{ marginTop: 20, marginBottom: 0 }}
            >
              {error}
            </div>
          ) : null}
          {app ? (
            <div aria-live="polite">
              <div className="track-status">
                <strong>{app.status}</strong>
                <span className="status-badge">{app.reference}</span>
              </div>
              <p className="form-subtitle">
                {app.product} · {money(app.amount)} requested
              </p>
              {app.status === "Closed" ? (
                <p className="notice">
                  This application is closed. Contact the team for details.
                </p>
              ) : (
                <div className="status-timeline">
                  {statuses
                    .filter((s) => s !== "Closed")
                    .map((s, i) => (
                      <div
                        key={s}
                        className={
                          i <= statuses.indexOf(app.status) ? "complete" : ""
                        }
                      >
                        <i>
                          {i <= statuses.indexOf(app.status) ? (
                            <Check size={12} />
                          ) : (
                            i + 1
                          )}
                        </i>
                        <span>{s}</span>
                      </div>
                    ))}
                </div>
              )}
              <small className="muted">
                Updated{" "}
                {new Date(app.updated_at).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </small>
            </div>
          ) : null}
          <p className="micro-note" style={{ marginTop: 25 }}>
            Lost your code? Call 8109995906. The team will verify your identity
            before discussing an application.
          </p>
        </div>
        <Link href="/apply" className="text-link" style={{ marginTop: 20 }}>
          Starting something new? Apply here <ArrowRight size={15} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
