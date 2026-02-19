import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const poppins = Poppins({
    subsets: ["latin"],
    variable: '--font-poppins',
    weight: ['400', '600', '700'],
});

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spring Rain Lawn Sprinkler Inc.",
  description: "Professional irrigation installation and maintenance in the Chicago area.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans bg-[--bg] text-[--fg]">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
