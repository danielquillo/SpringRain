import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import Script from "next/script";
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
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var t = localStorage.getItem('theme');
              if (!t) { t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
              document.documentElement.setAttribute('data-theme', t);
            } catch (e) {}
          `}
        </Script>
      </head>

      <body className="font-sans bg-[--bg] text-[--fg]">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
