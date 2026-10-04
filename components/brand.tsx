import Link from "next/link";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Savrdh Instant Loan home"
    >
      <span className="brand-mark">
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M33 12H21c-12 0-12 12-2 12h10c10 0 10 12-2 12H15"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="m29 7 7 5-7 5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>
        <strong>
          SAVRDH<span className="brand-dot">.</span>
        </strong>
        <small>INSTANT LOAN</small>
      </span>
    </Link>
  );
}
