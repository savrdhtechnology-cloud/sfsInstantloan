import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SAVRDH Instant Personal Loan | ₹5,000 to ₹3,00,000",
    template: "%s | SAVRDH Instant Loan",
  },
  description: "Apply online for personal loan assistance from ₹5,000 to ₹3,00,000 for salaried professionals and business owners. A brand of Savrdh Financial Services Private Limited. Support: 8109995906.",
  icons:{icon:"/icon.svg"},
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><MotionProvider>{children}</MotionProvider></body></html>;
}
