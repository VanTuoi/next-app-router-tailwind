import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    DEFAULT: "100%",
                    xl: "1180px"
                }
            },
            colors: {
                primary: "hsl(var(--primary))",
                "primary-foreground": "hsl(var(--primary-foreground))",
                secondary: "hsl(var(--secondary))",
                "secondary-foreground": "hsl(var(--secondary-foreground))",
                success: "hsl(var(--success))",
                error: "hsl(var(--error))",
                muted: "hsl(var(--muted))",
                foreground: "hsl(var(--foreground))",
                "foreground-muted": "hsl(var(--muted-foreground))",
                paper: "hsl(var(--background))"
            },
            fontFamily: {
                Outfit: ["Signika Negative", "sans-serif"]
            }
        }
    },
    plugins: [forms, animate]
};

export default config;
