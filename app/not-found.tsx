import Link from "next/link";
import { Brand } from "@/components/brand";
export default function NotFound() {
  return (
    <main className="track-container form-card">
      <Brand />
      <h1 style={{ fontSize: 40, marginTop: 40 }}>A different direction?</h1>
      <p className="form-subtitle" style={{ marginTop: 20 }}>
        The page you’re looking for isn’t here.
      </p>
      <Link href="/" className="button button-dark">
        Back to home →
      </Link>
    </main>
  );
}
