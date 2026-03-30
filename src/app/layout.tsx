import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/app-header";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-var",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-var",
});

export const metadata: Metadata = {
  title: "Cuartel general — identidades musicales",
  description:
    "Panel personal para tus proyectos, plataformas y recursos digitales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <AppHeader />
        <div className="relative z-[1] flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
