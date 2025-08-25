"use client";

import { useTheme } from "next-themes";
import { FolderClosedIcon, MoonIcon, SunIcon } from "lucide-react";
import { IconButton } from "@/components/shared/icon-button";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="container flex items-center">
      <div className="w-full p-4 flex items-center justify-between bg-card border rounded-lg">
        <div className="flex items-center gap-3">
          <FolderClosedIcon className="size-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">
            File Manager
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <IconButton
            icon={theme === "dark" ? SunIcon : MoonIcon}
            onClick={toggleTheme}
            color="primary"
            title="Toggle theme"
          />
        </div>
      </div>
    </header>
  );
};
