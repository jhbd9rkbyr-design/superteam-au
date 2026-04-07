import type { Metadata } from "next";
import { inter, satoshi } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superteam Australia | Solana's Builder Network",
  description:
    "Australia's most active community of builders, designers, and operators on Solana. Join us to build, earn, and connect.",
  openGraph: {
    title: "Superteam Australia",
    description: "Australia's most active builder community on Solana",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-inter)] overflow-x-hidden">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
