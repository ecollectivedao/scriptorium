"use client";
import ScribeLogo from "../components/ScribeLogo";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Content Section */}
      <section className="flex flex-col items-center text-center">
        <div className="w-60 h-60">
          <ScribeLogo fill="#FFFFFF" />
        </div>
        <h1 className="text-4xl font-bold my-6">Welcome to Scribe</h1>
        <p className="text-lg mb-6">
          Build your digital self
        </p>

        <Button onClick={() => router.push("/signup")}>Get Started</Button>
      </section>
    </main>
  );
}