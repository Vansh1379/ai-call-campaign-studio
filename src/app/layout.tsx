import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Paradigm Outreach - AI Call Campaign Studio",
  description:
    "AI-powered phone calls that sell for you. Create and manage automated outbound call campaigns with intelligent voice agents.",
  keywords: [
    "AI calls",
    "outbound calls",
    "sales automation",
    "voice AI",
    "call campaigns",
  ],
  authors: [{ name: "Paradigm Outreach" }],
  openGraph: {
    title: "Paradigm Outreach - AI Call Campaign Studio",
    description: "AI-powered phone calls that sell for you",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
