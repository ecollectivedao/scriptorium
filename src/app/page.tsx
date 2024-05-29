import ConnectWalletButton from "./components/ConnectWalletButton";
import ScribeLogo from "./components/ScribeLogo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Content Section */}
      <section className="flex flex-col items-center text-center">
        <div className="w-72 h-72">
          <ScribeLogo fill="#FFFFFF"/>
        </div>
        <h1 className="text-4xl font-bold my-6">Welcome to Scriptorium</h1>
        <p className="text-lg mb-6">
          The ultimate platform for content collaboration
          <br />
          Connect your wallet and start your journey today
        </p>
        <ConnectWalletButton />
      </section>
    </main>
  );
}
