import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGameState } from '@/hooks/useGameState';
import { Coins, Sword, HardHat, Wheat } from 'lucide-react';

const roles = [
  { name: 'Trader', icon: Coins },
  { name: 'Soldier', icon: Sword },
  { name: 'Builder', icon: HardHat },
  { name: 'Farmer', icon: Wheat },
];

const RoleSelector = () => {
  const { setRole } = useGameState();

  return (
    <Card className="w-full mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <CardHeader>
        <CardTitle>Choose Your Role</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {roles.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            onClick={() => setRole(name)}
            className="h-24 flex flex-col items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30"
          >
            <Icon className="h-8 w-8 mb-2" />
            <span>{name}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default RoleSelector;