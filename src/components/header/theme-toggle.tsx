"use client";

import { Moon, Sun } from "lucide-react";
import { memo } from "react";

import { useTheme } from "~/hooks";

export const ThemeToggle = memo(() => {
    const { type, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 outline-none transition-colors duration-200 focus:ring-0 focus-visible:ring-0 dark:bg-gray-600"
            aria-label="Toggle Theme"
        >
            <span
                className={`inline-block flex h-6 w-6 transform items-center justify-center rounded-full bg-white transition-transform duration-200 ${
                    type === "light" ? "translate-x-1" : "translate-x-7"
                }`}
            >
                {type === "light" ? (
                    <Moon className="h-5 w-5 text-orange-300 animate-in fade-in" />
                ) : (
                    <Sun className="h-5 w-5 text-black animate-in fade-in" />
                )}
            </span>
        </button>
    );
});
