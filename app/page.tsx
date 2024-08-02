import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16">
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        <div className="w-full items-end text-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          Welcome to
          <span className="text-4xl font-bold block">Monet Test Bot</span>
        </div>
        <p className="text-center mt-8 text-2xl text-yellow-400">Revolutionizing loyalty with decentralized rewards.</p>

        <p className="text-center mt-4">Something awesome is coming soon!</p>
      </div>
    </main>
  );
}
