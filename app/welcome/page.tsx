"use client";

import { useLayout } from "@/context/layout-context";
import { getRandomGradient } from "@/lib/utils";
import { useViewport } from "@telegram-apps/sdk-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Welcome = () => {
  const router = useRouter();
  const { dispatch } = useLayout();
  const viewport = useViewport();
  const [bgGradient, setBgGradient] = useState(""); 

  useEffect(() => {
    setBgGradient(getRandomGradient());
    viewport?.expand();
    dispatch({ type: "HIDE_BOTTOM_BAR" });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/onboarding/first");
      dispatch({ type: "SHOW_BOTTOM_BAR" });
    }, 3000);
    return () => {
      clearTimeout(timeout);
      dispatch({ type: "SHOW_BOTTOM_BAR" });
    };
  }, []);

  return (
    <div className="h-screen relative" style={{ backgroundImage: bgGradient }}>
      <div className="flex justify-between gap-4 w-full relative top-16 container">
        <Image
          src="/svgs/cloud.svg"
          width={100}
          height={20}
          alt=""
          className="animate-clouds object-contain"
        />
        <Image
          src="/svgs/cloud.svg"
          width={100}
          height={20}
          alt=""
          className="object-contain top-32 relative invisible"
        />
        <Image
          src="/svgs/cloud.svg"
          width={100}
          height={20}
          alt=""
          className="animate-clouds object-contain"
        />
      </div>
      <div className="flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full">
        <div className="flex flex-col space-y-2 text-white text-center">
          <p className="text-4xl">Welcome to the</p>
          <h2 className="text-6xl uppercase">Land of Monet</h2>

          <div className="relative w-64 h-4 bg-gray-700 border-4 border-gray-800 mx-auto">
            <div className="absolute h-full bg-yellow-300 animate-pixel-loading"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[100px] text-center">
        <h4 className="uppercase text-white text-3xl">Stay Tuned</h4>
      </div>
    </div>
  );
};

export default Welcome;
