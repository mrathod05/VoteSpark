"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaOpencart as PieChart,
  FaUsers as Users,
  FaChartLine as TrendingUp,
  FaShieldAlt as ShieldCheck,
  FaFlask as DevnetIcon, // Added a science flask icon to represent devnet
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E16] to-[#1A2238] text-white">
      {/* Devnet Warning Banner */}
      <div className="bg-yellow-600/20 text-yellow-300 text-center py-2 px-4">
        <div className="flex items-center justify-center">
          <DevnetIcon className="mr-2" />
          <span>Devnet Version - For Testing Purposes Only</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <div className="flex items-center mb-4">
            <Image
              src="/logo.png"
              alt="VoteSpark Logo"
              width={60}
              height={60}
              className="mr-4"
            />
            <h1 className="text-4xl font-bold text-purple-300">VoteSpark</h1>
            <span className="ml-2 bg-yellow-600 text-white px-2 py-1 rounded-full text-xs">
              Devnet
            </span>
          </div>
          <h2 className="text-2xl text-purple-200 mb-6">
            Decentralized Polling Testnet on Solana
          </h2>
          <p className="text-purple-300 mb-8">
            {`Explore and test our blockchain polling platform on Solana's Devnet.
            Create mock polls, experiment with features, and provide feedback.`}
          </p>
          <div className="flex space-x-4">
            <Link
              href="/create"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Create Test Poll
            </Link>
            <Link
              href="/active-polls"
              className="border border-purple-500 text-purple-300 hover:bg-purple-900/30 px-6 py-3 rounded-lg transition-colors"
            >
              Explore Polls
            </Link>
          </div>
        </div>

        {/* Right Content - Animated Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full">
            <Image
              src="/vote_spark_hero.webp"
              alt="Blockchain Polling Illustration"
              width={1000}
              height={1000}
              className="animate-float"
            />
          </div>
        </div>
      </div>

      {/* Devnet Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl text-center text-purple-300 mb-12">
          Devnet Features
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              Icon: ShieldCheck,
              title: "Safe Testing",
              description:
                "Simulate polls without real financial consequences.",
            },
            {
              Icon: TrendingUp,
              title: "Experimental",
              description:
                "Test new polling mechanisms and blockchain interactions.",
            },
            {
              Icon: Users,
              title: "Community Feedback",
              description:
                "Help improve the platform by reporting issues and suggesting features.",
            },
            {
              Icon: PieChart,
              title: "Performance Analysis",
              description:
                "Evaluate blockchain polling infrastructure and scalability.",
            },
          ].map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-[#1A2238]/50 p-6 rounded-lg border border-purple-900/30 hover:bg-purple-900/20 transition-all group"
            >
              <div className="mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
                <Icon size={40} />
              </div>
              <h4 className="text-xl text-purple-300 mb-2">{title}</h4>
              <p className="text-purple-400 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl text-purple-300 mb-6">
          Join Our Devnet Testing Community
        </h3>
        <p className="text-purple-400 max-w-2xl mx-auto mb-8">
          Connect your Solana Devnet wallet to start creating test polls,
          experimenting with features, and providing valuable feedback for our
          blockchain polling platform.
        </p>
        <p className="text-yellow-400 mt-4 text-sm">
          {`Note: Ensure you're using a Devnet wallet with test SOL`}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
