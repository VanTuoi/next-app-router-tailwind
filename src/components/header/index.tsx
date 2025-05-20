import { memo } from "react";

import { Logo } from "../logo";

import { SearchComponent } from "./search";
import { ThemeToggle } from "./theme-toggle";
import { User } from "./user";

export const Header = memo(() => {
    return (
        <header className="mt-auto h-[50px] w-full border-b shadow-sm sm:h-[70px]">
            <div className="container flex h-full items-center justify-between px-1 md:px-4">
                <Logo />
                <SearchComponent />
                <div className="flex items-center gap-1 md:gap-2 lg:gap-5">
                    <ThemeToggle />
                    <User />
                </div>
            </div>
        </header>
    );
});
