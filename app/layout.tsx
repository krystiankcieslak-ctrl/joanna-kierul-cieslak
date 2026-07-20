import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Joanna Kierul-Cieślak | Ekspert edukacyjny",
    template: "%s | Joanna Kierul-Cieślak",
  },
  description:
    "Joanna Kierul-Cieślak — ekspert edukacyjny z 35-letnim doświadczeniem. Wsparcie dla rodziców, uczniów i nauczycieli: egzaminator, doradca metodyczny.",
  keywords: [
    "Joanna Kierul-Cieślak",
    "ekspert edukacyjny",
    "korepetycje",
    "egzaminator",
    "doradca metodyczny",
    "nauka języka polskiego",
  ],
  openGraph: {
    title: "Joanna Kierul-Cieślak | Ekspert edukacyjny",
    description:
      "Profesjonalne wsparcie edukacyjne oparte na 35 latach doświadczenia.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
