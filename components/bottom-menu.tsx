"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Zap, Users, Wallet } from "lucide-react";
import Link from "next/link";

interface BottomMenuItem {
  icon: React.ReactNode;
  label: string;
  id: string;
  link: string;
}

const BottomMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("tasks");

  const menuItems: BottomMenuItem[] = [
    {
      icon: <Gamepad2 size={24} />,
      label: "Tasks",
      id: "tasks",
      link: "/game/tasks",
    },
    {
      icon: <Zap size={24} />,
      label: "Daily Check",
      id: "daily",
      link: "/game/daily-check",
    },
    {
      icon: <Users size={24} />,
      label: "Refer friends",
      id: "refer",
      link: "/game/refer",
    },
    {
      icon: <Wallet size={24} />,
      label: "Wallet",
      id: "wallet",
      link: "/game/wallet-connect",
    },
  ];

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    // Add your navigation or state management logic here
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 p-2 rounded-t-3xl shadow-lg">
      <div className="flex justify-around items-center">
        {menuItems.map((item) => (
          <Link href={item.link} key={item.id}>
            <Button
              variant="ghost"
              className={`flex flex-col items-center p-2 transition-all duration-300 ease-in-out
                        ${
                          activeItem === item.id
                            ? "bg-opacity-0 transform hover:bg-transparent"
                            : "hover:bg-transparent"
                        }`}
              onClick={() => handleItemClick(item.id)}
            >
              <div
                className={`transition-colors duration-300 ${
                  activeItem === item.id ? "text-blue-400" : "text-gray-500"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-xs mt-1 transition-all duration-300 
                              ${
                                activeItem === item.id
                                  ? "text-blue-400"
                                  : "text-gray-500"
                              }`}
              >
                {item.label}
              </span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;
