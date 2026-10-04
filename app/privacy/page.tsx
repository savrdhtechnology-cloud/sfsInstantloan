import { LegalPage } from "@/components/legal-page";
export const metadata={title:"Privacy notice"};

export default function Privacy(){
  return <LegalPage
    eyebrow="YOUR INFORMATION, EXPLAINED"
    title="Privacy notice"
    subtitle="For SAVRDH Instant Loan, a brand product of Savrdh Financial Services Private Limited. Updated 4 October 2026."
    sections={[
      {title:"What we collect",body:<p>When you submit a loan request, we collect the contact, location, employment, income and loan requirement details you provide. We record consent, application history and timestamps. The initial form does not ask for banking passwords or OTPs.</p>},
      {title:"How we use your details",body:<p>We use your information to review the request, contact you about it, assist with the application process, maintain status and follow-up records, and protect the service against misuse.</p>},
      {title:"Access and sharing",body:<p>Authorized team members access information according to their role. Hosting and database providers may process information to operate the service. Sharing with a lending institution should be explained as part of the application process where applicable.</p>},
      {title:"Security and tracking",body:<p>Your application status is protected by a private tracking code. Keep it secure. Never send banking passwords, payment PINs or OTPs through free-text fields.</p>},
      {title:"Retention and your choices",body:<p>Information is retained for application processing, follow-up and applicable record-keeping. For access, correction, deletion, withdrawal of consent or concerns, call <a href="tel:+918109995906">8109995906</a>.</p>},
      {title:"Cookies",body:<p>The staff workspace uses essential authentication cookies. Fonts are served with the website. Advertising trackers are not part of the current implementation.</p>},
      {title:"Questions",body:<p>Contact Savrdh Financial Services Private Limited on <a href="tel:+918109995906">+91 8109995906</a> for privacy or application assistance.</p>},
    ]}
  />;
}
