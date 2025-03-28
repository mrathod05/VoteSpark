// components/Navbar.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FiMenu, FiX } from "react-icons/fi";
import { applicationData } from "@/lib/data";
import PhantomWalletButton from "../PhantomWalletButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-950/90 backdrop-blur-sm border-b border-indigo-800/50 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              {`${applicationData.app.name}`}
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <div className="ml-4">
              <PhantomWalletButton title="Connect wallet" />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-950 border-b border-indigo-800/50">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="pt-2">
              <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !transition !rounded-md" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
