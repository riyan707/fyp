import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Talentlink",
  description:
    "Talentlink connects university students seeking internships or placements with startups and small businesses in need of short-term project talent. Our app offers a seamless platform to match aspiring professionals with real-world opportunities, empowering students to gain experience and startups to find the right skills. Key features include profile creation, a smart matching algorithm, job listings, messaging, and ratings—all designed to build meaningful connections. Currently in development, Talentlink is set to redefine how students and startups collaborate for mutual growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${albertSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
