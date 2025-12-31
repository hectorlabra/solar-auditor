import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Solar Auditor | Calcula tu Ahorro Solar en Chile",
  description:
    "Descubre cuánto puedes ahorrar con energía solar. Calculadora gratuita de ahorro solar para hogares y negocios en Chile. Análisis personalizado en 2 minutos.",
  keywords: [
    "energía solar",
    "paneles solares",
    "Chile",
    "ahorro",
    "calculadora solar",
  ],
  openGraph: {
    title: "Solar Auditor | Calcula tu Ahorro Solar",
    description: "Análisis gratuito de ahorro solar para tu hogar o negocio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
