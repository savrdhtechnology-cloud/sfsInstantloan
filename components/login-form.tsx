"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { Brand } from "./brand";
import { Reveal } from "./motion";
import { signIn, resetPassword } from "@/app/login/actions";
export function LoginForm({
  configured,
  expired,
}: {
  configured: boolean;
  expired: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(
    expired ? "This sign-in link has expired. Request a new one." : "",
  );
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const result = await signIn(new FormData(e.currentTarget));
      if (result?.error) {
        setMessage(result.error);
        setError(true);
      }
    } finally {
      setBusy(false);
    }
  }
  async function reset(form: FormData) {
    setBusy(true);
    setMessage("");
    try {
      const result = await resetPassword(form);
      setMessage(result.error || result.message || "");
      setError(Boolean(result.error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="auth-layout">
      <div className="auth-art">
        <Brand light />
        <Reveal>
          <span className="eyebrow">
            THE WORKSPACE BEHIND EVERY POSSIBILITY
          </span>
          <h1>
            Great service.
            <br />
            <em>Starts here.</em>
          </h1>
          <p>
            One thoughtful workspace. Every application, conversation and next
            step.
          </p>
        </Reveal>
        <small>Savrdh Financial Services Private Limited</small>
        <div className="closing-rings">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="auth-content">
        <Reveal>
          <Link href="/" className="back-link">
            <ArrowLeft size={14} />
            Back to website
          </Link>
          <span className="success-icon">
            <LockKeyhole size={25} />
          </span>
          <h2>Welcome back.</h2>
          <p>Sign in to the Savrdh Instant Loan workspace.</p>
          {!configured ? (
            <div className="notice">
              CRM sign-in is awaiting the dedicated Financial Services database
              connection.{" "}
              <Link href="/crm">
                <strong>Explore the workspace →</strong>
              </Link>
            </div>
          ) : null}
          <form onSubmit={submit}>
            <label className="field">
              Work email
              <input
                name="email"
                type="email"
                required
                autoComplete="username"
                placeholder="Your registered email"
              />
            </label>
            <label className="field">
              Password
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  style={{ paddingRight: 45 }}
                />
                <button
                  type="button"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow(!show)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 13,
                    background: "none",
                    border: 0,
                  }}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>
            <div className="auth-links">
              <span>Authorized team members only</span>
              <button
                type="button"
                onClick={(e) => {
                  const form = e.currentTarget.closest("form");
                  if (form) void reset(new FormData(form));
                }}
                disabled={busy || !configured}
              >
                Forgot password?
              </button>
            </div>
            {message ? (
              <div
                className={`notice ${error ? "error" : "success"}`}
                role="status"
              >
                {message}
              </div>
            ) : null}
            <button
              type="submit"
              className="button button-dark"
              disabled={busy || !configured}
            >
              {busy ? "Please wait…" : "Sign in to workspace"}
              <ArrowRight size={17} />
            </button>
          </form>
          <p className="auth-foot">
            Need access? Contact your administrator.
            <br />
            Assistance: <a href="tel:+918109995906">8109995906</a>
          </p>
        </Reveal>
      </div>
    </main>
  );
}
