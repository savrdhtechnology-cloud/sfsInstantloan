import { Header, Footer } from "@/components/site-shell";
export const metadata = { title: "Terms of use" };
export default function Terms() {
  return (
    <>
      <Header />
      <main className="legal">
        <span className="eyebrow">CLEAR EXPECTATIONS</span>
        <h1>Terms of use</h1>
        <p>
          For Savrdh Instant Loan, a brand of Savrdh Financial Services Private
          Limited. Updated 4 October 2026.
        </p>
        <h2>Our service</h2>
        <p>
          This website provides loan application and credit facilitation
          assistance. It does not itself issue a binding loan offer. “Instant”
          describes starting a request online and does not promise instant
          approval or funding.
        </p>
        <h2>Eligibility and lending decisions</h2>
        <p>
          You must be at least 18 and able to enter into a valid agreement to
          submit a request. Lending institutions decide eligibility, interest
          rates, charges, tenure, security requirements, approval and
          disbursement. No rate, amount or outcome is guaranteed by this
          website.
        </p>
        <h2>Illustrative calculations</h2>
        <p>
          The EMI calculator uses reducing-balance calculations with your chosen
          inputs. Results are indicative, exclude fees and taxes, and are not an
          offer. Review the actual lender offer, total cost, repayment schedule
          and all applicable documentation before accepting.
        </p>
        <h2>Your information and consent</h2>
        <p>
          Provide accurate details and submit requests only for yourself or with
          valid authority. Do not provide bank passwords, payment PINs or OTPs.
          By submitting the consent form, you request contact and assistance
          concerning that application.
        </p>
        <h2>Fees and payments</h2>
        <p>
          This version of the website does not collect payments. Any service
          charge must be separately explained and agreed before payment. A
          payment or processing fee does not guarantee loan approval.
        </p>
        <h2>Tracking and communications</h2>
        <p>
          Keep your application reference and private tracking code secure.
          Statuses show the team’s recorded progress and are not a substitute
          for official lender documentation.
        </p>
        <h2>Contact and concerns</h2>
        <p>
          Contact Savrdh Financial Services Private Limited on{" "}
          <a href="tel:+918109995906">+91 8109995906</a> for support or to raise
          a concern. Nothing in these terms excludes rights that cannot be
          excluded by applicable law.
        </p>
      </main>
      <Footer />
    </>
  );
}
