import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Savrdh Instant Loan — Your next move, made possible.",
    template: "%s | Savrdh Instant Loan",
  },
  description:
    "Explore personal and business loan assistance with Savrdh Instant Loan, a brand of Savrdh Financial Services Private Limited. Call 8109995906.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
