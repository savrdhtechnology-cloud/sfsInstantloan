import { Header, Footer } from "@/components/site-shell";
export const metadata = { title: "Privacy notice" };
export default function Privacy() {
  return (
    <>
      <Header />
      <main className="legal">
        <span className="eyebrow">YOUR INFORMATION, EXPLAINED</span>
        <h1>Privacy notice</h1>
        <p>
          For Savrdh Instant Loan, a brand of Savrdh Financial Services Private
          Limited. Updated 4 October 2026.
        </p>
        <h2>What we collect</h2>
        <p>
          When you submit a loan request, we collect the contact, location,
          employment, income and loan requirement details you provide. We record
          your consent, application history, timestamps and a hashed network
          identifier to limit abuse. This initial form does not request Aadhaar,
          PAN, banking passwords or OTPs.
        </p>
        <h2>How we use your details</h2>
        <p>
          We use your information to review your request, contact you about it,
          assist with the application process, maintain status and follow-up
          records, and protect the service against misuse. Submitting a request
          does not authorize unrelated marketing.
        </p>
        <h2>Access and sharing</h2>
        <p>
          Authorized team members access information according to their role.
          Hosting and database providers process information to operate the
          service. Any proposed sharing with a lending institution should be
          explained to you as part of your application process, with additional
          consent where required.
        </p>
        <h2>Security and tracking</h2>
        <p>
          Your application status is protected by a private tracking code. Keep
          this code secure. Staff use an authenticated CRM. Do not send
          sensitive identity documents, financial credentials or OTPs through
          free-text fields.
        </p>
        <h2>Retention and your choices</h2>
        <p>
          Information is retained for application processing, follow-up and
          applicable record-keeping requirements. To request access, correction,
          deletion, withdrawal of consent or to raise a concern, contact the
          company on <a href="tel:+918109995906">8109995906</a>. Withdrawal may
          limit further assistance; records may need to be retained where
          required.
        </p>
        <h2>Cookies</h2>
        <p>
          The staff workspace uses essential authentication cookies. This
          version does not implement advertising trackers. Fonts are served
          directly with the website.
        </p>
        <h2>Questions</h2>
        <p>
          Contact Savrdh Financial Services Private Limited on{" "}
          <a href="tel:+918109995906">+91 8109995906</a> for privacy or
          application assistance.
        </p>
      </main>
      <Footer />
    </>
  );
}
