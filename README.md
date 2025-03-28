# 🗳️ VoteSpark - Decentralized Polling Platform

## Overview

VoteSpark is a cutting-edge decentralized polling platform built on the Solana blockchain, enabling transparent, secure, and verifiable voting experiences.

![VoteSpark Banner](/public/vote_spark_og.webp)

## 🚀 Features

- **Decentralized Polling**: Create and participate in polls secured by Solana blockchain

- **Wallet Integration**: Connect using Solana wallets (Phantom)

- **Real-time Results**: Instant, transparent vote tracking

- **No Central Authority**: Completely decentralized voting mechanism

- **Low-Cost Transactions**: Leveraging Solana's efficient blockchain

## 🛠 Tech Stack

- **Framework**: Next.js 15

- **Blockchain**: Solana

- **Web3 Libraries**:

- `@solana/web3.js`

- `@project-serum/anchor`

- **Wallet Adapters**: `@solana/wallet-adapter-react`

- **State Management**: React Hooks

- **Styling**: Tailwind CSS

- **Authentication**: Solana Wallet Connect

## 📦 Prerequisites

- Node.js 20+

- Solana Wallet (Phantom/Solflare)

- Solana CLI

- Anchor Framework

## 🔧 Local Setup

1. Clone the repository

```bash
git  clone  https://github.com/mrathod05/VoteSpark.git

cd  VoteSpark
```

2. Install dependencies

```bash
npm  install
# or
yarn  install
# or
pnpm  install
```

3. Configure Solana Network

```bash
# Choose network (devnet/mainnet/testnet)

solana  config  set  --url  devnet
```

4. Deploy Smart Contract

```bash
anchor  build
anchor  deploy
```

5 Run the development server

```bash
npm  run  dev
# or
yarn  dev
# or
pnpm  dev
```

## 🌐 Environment Variables

Create a `.env` file with:

```
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_ENDPOINT=https://api.devnet.solana.com
```

## 🚢 Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmrathod05%2Fvotespark)

### Solana Deployment

```bash
anchor  build
anchor  deploy  --provider.cluster  devnet
```

## 🔒 Smart Contract

- Location: `/programs/votespark`

- Primary Functions:

- `initialize_poll`

- `vote_poll`

- `remove_poll`

## 📊 Supported Wallets

- Phantom

## 🤝 Contributing

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙌 Acknowledgements

- Solana
- Anchor Framework
- Next.js
- Netlify
- Web3 Community
- ChatGpt
- Claude

---

## 🧑‍💻 Developer

**Made with ❤️ by the MeetRathod**
Developer: ![VoteSpark Banner](public/developer.jpg)
🔗 Contact Me: [https://meetrathoddeveloper.netlify.app/contact]
