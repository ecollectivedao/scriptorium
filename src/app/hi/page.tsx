"use client";

import { useState, useEffect } from "react";
import ScribeLogo from "../components/ScribeLogo";

export default function LandingPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

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
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : isRegistered ? (
          <p>Welcome back!</p> // Replace this with the component/page you want to show if the user is registered
        ) : (
          <p>Connect your wallet and start your journey today</p>
        )}
      </section>
    </main>
  );
}