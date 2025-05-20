import Link from "next/link";

import { path } from "~/constants";

import { Button } from "~/components/ui";

export const EmptyState = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
            <p className="text-lg text-gray-600">Không tìm thấy khoá học.</p>
            <Link href={path.HOME}>
                <Button variant="default" className="mt-4">
                    Xem tất cả khóa học
                </Button>
            </Link>
        </div>
    );
};
