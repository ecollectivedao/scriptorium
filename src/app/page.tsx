"use client";

import { useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ScribeLogo from "./components/ScribeLogo";
import { checkRegistration } from "./utils/ethereumUtils";

export default function Home() {
  const [signer, setSigner] = useState<Signer | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            setSigner(signer);
            const registered = await checkRegistration(signer);
            setIsRegistered(registered);
          }
        } catch (error) {
          console.error("Failed to check registration on load:", error);
        }
      }
      setLoading(false);
    };

    checkUserRegistration();
  }, []);

  const handleWalletConnected = async (newSigner: Signer) => {
    setSigner(newSigner);
    const registered = await checkRegistration(newSigner);
    setIsRegistered(registered);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Content Section */}
      <section className="flex flex-col items-center text-center">
        <div className="w-72 h-72">
          <ScribeLogo fill="#FFFFFF" />
        </div>
        <h1 className="text-4xl font-bold my-6">Welcome to Scriptorium</h1>
        <p className="text-lg mb-6">
          The ultimate platform for content collaboration
          <br />
          Connect your wallet and start your journey today
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : isRegistered ? (
          <p>Welcome back!</p> // Replace this with the component/page you want to show if the user is registered
        ) : (
          <ConnectWalletButton setSigner={handleWalletConnected} />
        )}
      </section>
    </main>
  );
}
