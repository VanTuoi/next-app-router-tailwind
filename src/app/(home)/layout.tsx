"use client";

import { ReactNode } from "react";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

interface RootLayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: RootLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 text-foreground dark:bg-gray-900 dark:text-foreground">
            <Header />
            <main className="flex-1">
                <div className="container px-4 py-1">{children}</div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
