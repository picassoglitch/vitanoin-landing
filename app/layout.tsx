import type { Metadata } from "next";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

// Used for the handwritten annotations in the approved design.
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: "The Vitanoin Collective | Panalab",
  description: "Convocatoria para 500 creadoras de contenido de skincare y belleza.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${jakarta.variable} ${caveat.variable} font-sans`}>{children}</body>
    </html>
  );
}
