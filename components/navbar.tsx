"use client";
import { useInitData } from "@telegram-apps/sdk-react";
import { Button } from "./ui/button";

'use client';

import { CogIcon } from "lucide-react";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/settings");
  };
  return (
    <div className="fixed top-0 right-0 p-4">
      <CogIcon onClick={handleClick} />
    </div>
  );
};

export default Navbar;
