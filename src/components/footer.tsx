"use client";

import { memo } from "react";

export const Footer = memo(() => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-blue-400 p-2 dark:bg-gray-700">
            <p className="p-1 text-center text-lg font-semibold text-white">&copy;{currentYear} F2 elearning</p>
        </footer>
    );
});
