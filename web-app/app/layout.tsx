import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const crimson = Crimson_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DetCo News Hub — The Case Never Closes",
  description: "Your ultimate destination for all things Meitantei Conan — from the latest chapter breakdowns to case theory deep-dives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${crimson.variable} ${spaceMono.variable}`}>
      <body className="antialiased bg-ink text-white font-body selection:bg-gold selection:text-ink">
        {children}
      </body>
    </html>
  );
}
