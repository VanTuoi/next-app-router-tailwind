import { memo } from "react";

import { ThemeToggle } from "./theme-toggle";
import { User } from "./user";

export const AdminHeader = memo(() => {
    return (
        <header className="mt-auto h-[70px] w-full border-b shadow-sm">
            <div className="flex h-full items-center justify-end px-4">
                <div className="flex items-center gap-5">
                    <ThemeToggle />
                    <User />
                </div>
            </div>
        </header>
    );
});
