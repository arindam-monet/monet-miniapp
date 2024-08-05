"use client";

import Tapper from "@/components/tapper";
import { TvIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [points, setPoints] = useState(0);
  return (
    <main className="flex flex-col items-center justify-between py-16">
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        <div className="text-center">
          <span className="text-4xl font-bold block">Monet Test Bot</span>
        </div>
        <p className="text-center mt-8 text-2xl text-primary">
          Tap to earn points!
        </p>

        <p className="text-2xl mx-auto mt-4 text-center">Your points: {points}</p>

        <Tapper
          icon={<TvIcon className="w-24 h-24" />}
          className="mx-auto mt-16 w-64 h-64 border-8 border-primary-foreground rounded-full"
          onTap={(points) => setPoints(points)}
        />
      </div>
    </main>
  );
}
