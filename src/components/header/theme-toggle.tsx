"use client";

import { Moon, Sun } from "lucide-react";
import { memo, useEffect, useState } from "react";

import { useTheme } from "~/hooks";

export const ThemeToggle = memo(() => {
    const { type, toggleTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

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
                    <Moon className="h-5 w-5 text-orange-300 animate-in fade-in dark:text-orange-300" />
                ) : (
                    <Sun className="h-5 w-5 text-black animate-in fade-in dark:text-black" />
                )}
            </span>
        </button>
    );
});
