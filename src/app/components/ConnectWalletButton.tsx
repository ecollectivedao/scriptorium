"use client";

import { useState, useEffect } from "react";
import { ethers, Signer } from "ethers";
import IdentityManagement from "../contracts/IdentityManagement.json";

interface ConnectWalletButtonProps {
  setSigner: (signer: Signer) => void;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ setSigner }) => {
  const [connected, setConnected] = useState(false);
  const [signer, setLocalSigner] = useState<Signer | null>(null);

  useEffect(() => {
    const registerUser = async () => {
      if (!signer) return;

      const identityManagementAddress = "0x266f2bE7076aE52bFB8f30c10AE577055c71DA63";
      const contract = new ethers.Contract(identityManagementAddress, IdentityManagement.abi, signer);

      try {
        const address = await signer.getAddress();
        console.log("Address retrieved: ", address);

        const sid = await contract.getSid(address);
        console.log("SID retrieved: ", sid);

        // Compare BigInt with BigInt 0n
        if (sid === 0n) {
          const tx = await contract.register();
          await tx.wait();
          console.log("User registered successfully!");
        } else {
          console.log("User already registered!");
        }
      } catch (err) {
        console.error("Registration failed: ", err);
      }
    };

    if (signer) {
      registerUser();
    }
  }, [signer]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        setLocalSigner(signer);
        setSigner(signer);
        setConnected(true);
      } catch (err) {
        console.error("User rejected connection request.");
      }
    } else {
      console.error("Please install MetaMask!");
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {connected ? "Wallet Connected" : "Connect Wallet"}
    </button>
  );
};

export default ConnectWalletButton;
