import { useRouter } from "next/navigation";

import { path } from "~/constants";

import { Button } from "~/components/ui";

export const EmptyState = () => {
    const router = useRouter();

    return (
        <div className="col-span-full py-20 text-center">
            <p className="text-lg text-gray-600">Không tìm thấy khoá học nào.</p>
            <Button variant="ghost" className="mt-4 text-primary" onClick={() => router.push(path.HOME)}>
                Xem tất cả khóa học
            </Button>
        </div>
    );
};
