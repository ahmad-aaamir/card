import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Pinyon_Script, Montserrat, Amiri } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vowelle.com"),
  title: "Ayla & Zayan — The Romantic Bloom | Vowelle",
  description:
    "In the name of Allah, the Most Gracious, the Most Merciful. Wedding & Nikkah celebrations of Ayla Noor & Zayan Ahmed in Lahore, Pakistan.",
  openGraph: {
    title: "Ayla & Zayan — The Romantic Bloom | Vowelle",
    description: "Every love story deserves an entrance.",
    images: ["/images/cover-blooms.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${pinyon.variable} ${montserrat.variable} ${amiri.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#240B10] text-[#45151F] selection:bg-[#C5A05B]/30 selection:text-[#45151F] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
