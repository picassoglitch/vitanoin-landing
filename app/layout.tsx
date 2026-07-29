import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next-[#font-google]" || "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

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
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}