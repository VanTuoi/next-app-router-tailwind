"use client";

import { useRouter } from "next/navigation";

import { LogOut as LogOutIcon, User as UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { memo } from "react";

import { useLogout } from "~/hooks";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "~/components/ui";

export const User = memo(() => {
    const { data: session, status } = useSession();
    const { handleLogout } = useLogout();
    const router = useRouter();

    const userData = session?.user;
    const loading = status === "loading";

    if (loading) {
        return <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" />;
    }

    if (!userData) {
        return <Button onClick={() => router.push("/login")}>Đăng nhập</Button>;
    }

    return (
        <div className="relative flex items-center space-x-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="rounded-full bg-transparent outline-none">
                        <Avatar className="h-[40px] w-[40px]">
                            <AvatarImage src={userData.avatar} />
                            <AvatarFallback>{userData.name}</AvatarFallback>
                        </Avatar>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="center"
                    className="z-[1000] w-48 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800"
                >
                    <DropdownMenuItem
                        onClick={() => router.push("/profile")}
                        className="flex cursor-pointer items-center space-x-2 border-none px-4 py-2 text-gray-800 outline-none hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                    >
                        <UserIcon className="h-5 w-5" />
                        <span>Cài đặt</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex cursor-pointer items-center space-x-2 border-none px-4 py-2 text-gray-800 outline-none hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
                    >
                        <LogOutIcon className="h-5 w-5" />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
});
