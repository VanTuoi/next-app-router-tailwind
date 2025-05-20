"use client";

import { ReactNode } from "react";

import { AdminHeader } from "~/components/header/admin-header";
import { Sidebar } from "~/components/pages/admin/sidebar";

interface RootLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: RootLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 text-foreground dark:bg-gray-900 dark:text-foreground">
            <main className="flex-1">
                <div className="grid grid-cols-6">
                    <div className="col-span-1 flex flex-row shadow-sm">
                        <Sidebar />
                    </div>
                    <div className="col-span-5">
                        <div className="flex flex-col">
                            <AdminHeader />
                            <div className="px-4 pt-6">{children}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
