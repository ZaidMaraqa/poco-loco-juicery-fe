import type { Metadata } from "next";
import { Amiri, Outfit, Titan_One } from "next/font/google";

import "./globals.css";
import { Footer, Header } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE } from "@/data/site";

const titanOne = Titan_One({
  variable: "--font-titan-one",
  weight: "400",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${titanOne.variable} ${outfit.variable} ${amiri.variable} antialiased`}
    >
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
