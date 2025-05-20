"use client";

import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode;
}

const EmptyLayout = ({ children }: RootLayoutProps) => {
    return <div className="bg-paper text-foreground dark:bg-paper">{children}</div>;
};

export default EmptyLayout;
