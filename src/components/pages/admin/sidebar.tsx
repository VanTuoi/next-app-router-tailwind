"use client";

import { usePathname, useRouter } from "next/navigation";

import { BookA, ChartBarStacked } from "lucide-react";

import { Logo } from "~/components/logo";

import { cn } from "~/lib/utils";

interface MenuItemType {
    url: string;
    label: string;
    icon: React.ReactNode;
}

const menuItems: MenuItemType[] = [
    {
        url: "categories",
        label: "Danh mục",
        icon: <ChartBarStacked size={18} />
    },
    {
        url: "courses",
        label: "Khoá học",
        icon: <BookA size={18} />
    }
];

export const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <aside className="flex min-h-screen w-full flex-col border-r border-gray-200 bg-white p-1 pt-2 sm:p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="pb-6">
                <Logo />
            </div>
            <nav className="flex flex-col items-center gap-2">
                {menuItems.map((item) => {
                    const itemPath = `/admin/${item.url}`;
                    const isActive = pathname === itemPath;
                    return (
                        <div
                            key={item.url}
                            role="button"
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => router.push(itemPath)}
                            className={cn(
                                "flex cursor-pointer items-center rounded transition-colors text-sm",
                                "px-2 py-2 md:px-4 md:py-4",
                                "hover:bg-gray-100 dark:hover:bg-gray-800",
                                "gap-0 md:gap-3",
                                "justify-center md:justify-start",
                                "w-10 md:w-full ",
                                isActive
                                    ? "bg-gray-200 text-primary dark:bg-gray-800"
                                    : "text-gray-600 dark:text-gray-300"
                            )}
                        >
                            <span className="text-[20px]">{item.icon}</span>
                            <span className="hidden md:inline">{item.label}</span>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};
