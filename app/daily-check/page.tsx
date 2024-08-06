"use client";

import Tapper from "@/components/tapper";
import { useInitData } from "@telegram-apps/sdk-react";
import { HammerIcon } from "lucide-react";
import { useState } from "react";

const DailyCheck = () => {
  const [points, setPoints] = useState(0);
  const { user } = useInitData() || {};

  return (
    <div className="flex justify-center items-center h-screen flex-col p-4 text-center">
      <h1 className="text-4xl">Daily Check</h1>
      <h3 className="text-2xl mt-2">Hey {user?.firstName}</h3>
      <p className="mt-4">Tap the hammer to get points</p>

     

      <Tapper
        icon={<HammerIcon className="w-24 h-24" />}
        className="mx-auto mt-16 w-64 h-64 border-8 border-primary-foreground rounded-full"
        onTap={(points) => setPoints(points)}
      />
       <p className="mt-4">You have {points} points</p>
    </div>
  );
};

export default DailyCheck;
