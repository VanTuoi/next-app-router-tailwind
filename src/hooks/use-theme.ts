"use client";

import { useEffect, useState } from "react";

export const useTheme = () => {
    const getInitialTheme = (): "light" | "dark" => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme");
            if (stored === "light" || stored === "dark") return stored;
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            return prefersDark ? "dark" : "light";
        }
        return "light";
    };

    const [type, setType] = useState<"light" | "dark">(getInitialTheme);

    useEffect(() => {
        if (type === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [type]);

    const toggleTheme = () => {
        setType(type === "light" ? "dark" : "light");
    };

    return { type, toggleTheme };
};
