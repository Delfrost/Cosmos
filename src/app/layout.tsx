import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; // Import the Navbar
import Footer from "@/components/layout/Footer";

// Font Setup
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmos Agency | AI, Gaming & Tech",
  description: "Next-gen software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased bg-black`}>
        <Navbar />
        <main className="pt-20 min-h-screen"> 
          {children}
        </main>
        <Footer /> {/* Add Footer Here at the bottom */}
      </body>
    </html>
  );
}