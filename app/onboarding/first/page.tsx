'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FirstPage = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push("/onboarding/second");
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center w-full">
      <div className="text-center">
        <div className="w-[200px] h-[200px] rounded-full bg-primary border-8 border-gray-600 mx-auto flex justify-center items-center">
          <span className="text-8xl text-white">🔨</span>
        </div>
        <h2 className="text-3xl uppercase mt-8">Tap Tap and Earn</h2>
      </div>
      <footer className="flex flex-col gap-8 p-4 fixed bottom-0 rounded-t-3xl w-full bg-gradient-to-b from-gray-700 to-black">
        <div className="flex items-center gap-4">
          <Image
            src="/svgs/dollar-coin.svg"
            width={60}
            height={60}
            alt="dollar coin"
            className="object-contain"
          />
          <div>
            <h3 className="text-2xl">Choose a Role</h3>
            <p>Tell us your calling & tap</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-accent" onClick={handleNext}>
            Next
          </Button>
        </div>
      </footer>
    </main>
  );
};

export default FirstPage;
