"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="track-container form-card">
      <h1 className="form-title">Something needs a moment.</h1>
      <p className="form-subtitle">
        Please try again. If the issue continues, call 8109995906.
      </p>
      <button className="button button-dark" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
