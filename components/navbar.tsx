"use client";
import {  useInitData } from "@telegram-apps/sdk-react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { user } = useInitData() || {};
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Land of Monet</h1>
      <div className="flex items-center space-x-4">
        <span>Hey {user?.firstName}!</span>
        <Button onClick={toggleTheme} variant="outline" size="icon">
          {theme === "dark" ? (
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>
    </nav>
  );
};


export default Navbar;