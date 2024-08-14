"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const roles = [
  {
    id: "warrior",
    icon: "🗡",
    name: "Warrior",
  },
  {
    id: "farmer",
    icon: "🌾",
    name: "Farmer",
  },
  {
    id: "trader",
    icon: "🛒",
    name: "Trader",
  },
  {
    id: "builder",
    icon: "🔨",
    name: "Builder",
  },
];

const SelectRole = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push("/game/tasks");
  };
  const [selectedRole, setSelectedRole] = useState<(typeof roles)[0] | null>(
    null
  );

  const selectRole = (role: (typeof roles)[0]) => {
    setSelectedRole(role);
  };

  return (
    <main className="h-screen flex flex-col items-center w-full container">
      <div className="text-center">
        <h2 className="text-3xl uppercase mt-12">Choose your calling</h2>
        <div className="grid grid-cols-2 gap-8 mt-16 w-2/3 mx-auto">
          {/* grid of 4 avatar depicting warrier, farmer, trader and builder */}
          {roles.map((role) => (
            <div
              key={role.id}
              className={cn(
                "border-4 border-gray-300 bg-yellow-50 rounded-xl p-4 flex justify-center items-center",
                {
                  "border-yellow-600 bg-yellow-400":
                    selectedRole?.id === role.id,
                }
              )}
              onClick={() => selectRole(role)}
            >
              <span className="text-6xl text-white">{role.icon}</span>
            </div>
          ))}
        </div>
        {selectedRole && (
          <h4 className="mt-12 text-2xl">You are a {selectedRole?.name}</h4>
        )}
      </div>
      <footer className="flex flex-col gap-8 p-4 fixed bottom-0 rounded-t-3xl w-full bg-gradient-to-b from-gray-700 to-black">
        <div className="flex items-center gap-4 text-center">
          <div className="mx-auto">
            <h3 className="text-2xl">Defend and fight for Monet!</h3>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="bg-accent w-full md:w-1/4" onClick={handleNext}>
            Start
          </Button>
        </div>
      </footer>
    </main>
  );
};

export default SelectRole;
