import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Content Section */}
      <section className="text-center">
        <Image
          className="display inline-block"
          src="/scribe_logo_white.png" // Make sure to replace this with the path to your actual logo
          alt="Scribe Logo"
          width={200}
          height={200}
          priority
        />
        <h1 className="text-4xl font-bold my-6">Welcome to Scribe</h1>
        <p className="text-lg mb-6">
          The ultimate platform for connecting your ideas with the world.
          <br />
          Connect your wallet and start your journey today.
        </p>
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Connect Wallet
        </button>
      </section>
    </main>
  );
}
