"use client";

import { useLayout } from "@/context/layout-context";
import { useViewport } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Welcome = () => {
  const router = useRouter();
  const { dispatch } = useLayout();
  const viewport = useViewport();
  useEffect(() => {
    viewport?.expand();
    dispatch({ type: "HIDE_BOTTOM_BAR" });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/tasks");
      dispatch({ type: "SHOW_BOTTOM_BAR" });
    }, 3000);
    return () => {
      clearTimeout(timeout);
      dispatch({ type: "SHOW_BOTTOM_BAR" });
    };
  }, []);

  return (
    <div className="h-screen bg-sky-500 relative">
      <div className="flex justify-between gap-4 w-full relative top-16 container">
        <Image
          src="/svgs/cloud.svg"
          width={100}
          height={20}
          alt=""
          className="object-contain"
        />
        <Image
          src="/svgs/cloud.svg"
          width={100}
          height={20}
          alt=""
          className="object-contain top-32 relative"
        />
        <Image
          src="/svgs/cloud.svg"
          width={100}
          height={20}
          alt=""
          className="object-contain"
        />
      </div>
      <div className="flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full">
        <div className="flex flex-col space-y-2 text-white text-center">
          <p className="text-4xl">Welcome to the</p>
          <h2 className="text-6xl uppercase">Land of Monet</h2>

          <div className="text-yellow-300 py-8">
            <h3>We are launching soon on</h3>
            <h2 className="text-4xl">TON Network</h2>
          </div>

          <Spinner size={'l'} className="text-white mx-auto" />
        </div>

        
      </div>

      <div className="absolute bottom-0 w-full h-[100px]">
        <Image
          src={"/svgs/field.svg"}
          alt="field"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Welcome;
