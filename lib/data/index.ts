import { Cluster } from "@solana/web3.js";

export const ENV = {
  SOLANA_NETWORK: process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster,
  RPC_ENDPOINT: process.env.NEXT_PUBLIC_RPC_ENDPOINT,
};

export const MAX_PROGRAM_CONNECTION_RETRY = 2;

export const applicationData = {
  app: {
    name: "VoteSpark",
    link: "https://votespark.netlify.app/",
  },
  developer: {
    name: "Meet Rathod",
    link: "https://meetrathoddeveloper.netlify.app/",
  },
};

const { app, developer } = applicationData;

export const METADATA = {
  title: {
    default: `${app.name} - Decentralized Polling Platform`,
    template: "%s | VoteSpark",
  },
  description:
    "Create, manage, and participate in transparent, blockchain-powered polls. Leverage Solana's speed and security for truly decentralized voting.",
  keywords: [
    "solana",
    "blockchain",
    "polling",
    "decentralized voting",
    "web3 polls",
    "cryptocurrency voting",
    "transparent elections",
  ],
  openGraph: {
    title: `${app.name} - Decentralized Polling Platform`,
    description:
      "Create and vote on secure, transparent polls powered by Solana blockchain",
    url: `${app.link}`,
    siteName: `${app.name}`,
    images: [
      {
        url: "/vote_spark_og.webp",
        width: 1200,
        height: 630,
        alt: `${app.name} - Decentralized Polling Platform`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${app.name} - Decentralized Polling Platform`,
    description:
      "Create and vote on secure, transparent polls powered by Solana blockchain",
    images: ["/vote_spark_twitter.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: `${developer.link}`,
  },
  applicationName: `${app.name}`,
  creator: `${developer.name}`,
};

// Page-specific metadata examples
export const pageMetadata = {
  home: {
    title: `${app.name} - Decentralized Polling Platform`,
    description:
      "Create and participate in transparent, secure blockchain polls",
  },
  createPoll: {
    title: `Create a Poll | ${app.name}`,
    description:
      "Design your decentralized poll with secure Solana blockchain technology",
  },
  activePoll: {
    title: `Active Polls | ${app.name}`,
    description:
      "Browse and vote on current community polls powered by blockchain",
  },
};
