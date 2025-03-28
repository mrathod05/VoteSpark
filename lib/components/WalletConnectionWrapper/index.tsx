// components/WalletConnectionWrapper.js
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FiWifi, FiLink, FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { applicationData } from "@/lib/data";

export default function WalletConnectionWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { connected, connecting } = useWallet();

  if (connected) {
    return children;
  }

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-indigo-800/40 backdrop-blur-sm rounded-xl border border-indigo-700/50 p-8 text-center"
      >
        <div className="mb-6">
          <FiAlertTriangle className="mx-auto text-yellow-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold mb-3 text-white">
            Wallet Connection Required
          </h2>
          <p className="text-indigo-200 mb-6">
            {`Please connect your Solana wallet to interact with ${applicationData.app.name}`}
          </p>
        </div>

        <AnimatePresence>
          {connecting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center space-x-3 text-indigo-300"
            >
              <FiWifi className="animate-pulse" size={24} />
              <span>Connecting to wallet...</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <WalletMultiButton className="!w-full !justify-center !py-3 !bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 !transition-all !duration-200 !rounded-md flex items-center justify-center">
                <FiLink className="mr-2" />
                Connect Wallet
              </WalletMultiButton>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 text-center">
          <p className="text-indigo-300 text-sm">
            Need a Solana wallet?
            <a
              href="https://phantom.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-purple-400 hover:text-purple-300 transition"
            >
              Get Phantom Wallet
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
