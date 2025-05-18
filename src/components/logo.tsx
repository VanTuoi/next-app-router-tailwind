"use client";

import { useRouter } from "next/navigation";

import { memo } from "react";

export const Logo = memo(() => {
    const router = useRouter();

    return (
        <div
            className="flex cursor-pointer flex-row items-center justify-center"
            onClick={() => {
                router.push("/");
            }}
        >
            <div className="rounded-lg bg-primary px-2 py-1 text-2xl font-bold text-white dark:text-black">F2</div>
            <div className="px-2 py-1 text-lg font-semibold text-primary">Fast and Free</div>
        </div>
    );
});
