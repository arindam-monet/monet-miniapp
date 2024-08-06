"use client";

import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

const WalletConnect = () => {
  const wallet = useTonWallet();
  return (
    <div className="container">
      <h3 className="text-2xl mt-16">
        {wallet ? "Connected" : "Connect your wallet"}
      </h3>
      <div className="flex justify-center items-center min-h-80 flex-col p-4 text-center">

      <div>{!wallet && <TonConnectButton className="mt-4" />}</div>

      <div>
        {wallet && (
          <div className="flex flex-col space-y-4 p-4 border-2 rounded-md">
            <p className="mt-4">Wallet Address: {wallet.account.address}</p>
            <p className="mt-4">Chain: {wallet.account.chain}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default WalletConnect;
