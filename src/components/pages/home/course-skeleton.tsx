type Props = {
    count?: number;
};

export const CourseSkeleton = ({ count = 6 }: Props) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-xl border border-gray-100 bg-white dark:border-gray-600 dark:bg-gray-800"
                >
                    <div className="h-40 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-2 p-4">
                        <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                </div>
            ))}
        </>
    );
};
