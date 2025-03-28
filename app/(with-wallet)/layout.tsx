import WalletConnectionWrapper from "@/lib/components/WalletConnectionWrapper";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <WalletConnectionWrapper>{children}</WalletConnectionWrapper>;
}
