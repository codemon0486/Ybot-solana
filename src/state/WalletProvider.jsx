import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { MAINNET_RPC_ENDPOINT } from "../constants";

export default function Proivders({ children }) {
  const endpoint = React.useMemo(() => MAINNET_RPC_ENDPOINT, []);
  const wallets = React.useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider >
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
