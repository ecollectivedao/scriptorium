"use client";

import { BrowserProvider } from "ethers";

// Define the ConnectWalletButton as a functional component
const ConnectWalletButton = () => {
  // Function to handle connecting the wallet
  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        // Create a new BrowserProvider instance using the injected window.ethereum provider
        const browserProvider = new BrowserProvider(window.ethereum);

        // Request the user's Ethereum accounts.
        const accounts = await browserProvider.send("eth_requestAccounts", []);

        // Do something with the accounts...
        console.log("Connected accounts:", accounts);
      } else {
        console.log("Please install MetaMask!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <button
      onClick={handleConnectWallet}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
