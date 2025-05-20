import { useRouter } from "next/navigation";

import { path } from "~/constants";

import { Button } from "~/components/ui";

export const EmptyState = () => {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
            <p className="text-lg text-gray-600">Không tìm thấy khoá học.</p>
            <Button variant="default" className="mt-4" onClick={() => router.push(path.HOME)}>
                Xem tất cả khóa học
            </Button>
        </div>
    );
};
