import { Inter } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/lib/components/Providers/SolanaProvider";
import Navbar from "@/lib/components/Navbar";
import { ReactNode } from "react";
import Footer from "@/lib/components/Footer";
import { METADATA } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata = METADATA;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-purple-900 to-indigo-900 min-h-screen text-white flex flex-col`}
      >
        <SolanaProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-grow">
            {children}
          </main>
          <Footer />
        </SolanaProvider>
      </body>
    </html>
  );
}
