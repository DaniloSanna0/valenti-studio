import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marco Valenti — Fashion & Editorial Photographer, Milano",
  description:
    "Fotografo fashion ed editoriale a Milano. Shooting per modelle, agenzie e brand. Portfolio, beauty, backstage e produzioni su commissione.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
