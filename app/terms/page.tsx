import { LegalPage } from "@/components/legal-page";
export const metadata={title:"Terms of use"};

export default function Terms(){
  return <LegalPage
    eyebrow="CLEAR EXPECTATIONS"
    title="Terms of use"
    subtitle="For SAVRDH Instant Loan, a brand product of Savrdh Financial Services Private Limited. Updated 4 October 2026."
    sections={[
      {title:"Our service",body:<p>This website provides loan application and credit facilitation assistance. It does not itself issue a binding loan offer. “Instant” describes starting a digital request and does not promise instant approval or funding.</p>},
      {title:"Eligibility and lending decisions",body:<p>You must be able to enter into a valid agreement to submit a request. Lending institutions decide eligibility, interest rates, charges, tenure, approval and disbursement. No outcome is guaranteed by this website.</p>},
      {title:"Illustrative calculations",body:<p>The EMI calculator is indicative and may exclude fees and taxes. Review the actual lender offer, total cost, repayment schedule and applicable documentation before accepting.</p>},
      {title:"Your information and consent",body:<p>Provide accurate information and submit requests only for yourself or with valid authority. Never provide bank passwords, payment PINs or OTPs.</p>},
      {title:"Fees and payments",body:<p>The current website does not collect payments. Any service charge should be separately explained and agreed before payment. A processing or service fee does not guarantee loan approval.</p>},
      {title:"Tracking and communications",body:<p>Keep your application reference and private tracking code secure. Statuses show recorded application progress and are not a substitute for official lender documentation.</p>},
      {title:"Contact and concerns",body:<p>Call Savrdh Financial Services Private Limited on <a href="tel:+918109995906">+91 8109995906</a> for support or to raise a concern.</p>},
    ]}
  />;
}
