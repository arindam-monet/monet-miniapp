"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useState } from "react";

const Settings = () => {
  const theme = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>(
    theme.theme || "light"
  );
  return (
    <div className="container my-16">
      <h2 className="text-2xl">Settings</h2>

      <div className="flex items-center space-x-2 mt-4">
        <Switch
          id="app-theme"
          defaultChecked={currentTheme === "dark"}
          onChange={(e: React.FormEvent<HTMLButtonElement>) => {
            console.log(e, "e");
          }}
          onCheckedChange={(checked) => {
            setCurrentTheme(checked ? "dark" : "light");
            theme.setTheme(checked ? "dark" : "light");
          }}
        />
        <Label htmlFor="app-theme">Dark Mode</Label>
      </div>
    </div>
  );
};

export default Settings;
