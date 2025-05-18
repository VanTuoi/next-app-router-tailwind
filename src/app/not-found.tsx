import Link from "next/link";

import { Home } from "lucide-react";

const Custom404 = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">404</h1>
                <p className="mb-4 text-2xl text-gray-700 dark:text-gray-300">
                    Oops! The page you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link href="/">
                    <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white transition duration-300 hover:bg-blue-700">
                        <Home className="h-5 w-5" />
                        Go Back Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Custom404;
