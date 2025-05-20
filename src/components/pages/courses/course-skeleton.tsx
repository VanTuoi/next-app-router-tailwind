export const CourseSkeleton = () => {
    return (
        <div className="grid grid-cols-5 gap-6 p-6">
            <div className="col-span-3 space-y-4">
                <div className="animate-pulse rounded-xl border border-gray-100 bg-white dark:border-gray-600 dark:bg-gray-800">
                    <div className="h-80 w-full rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="animate-pulse space-y-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
                    <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="animate-pulse space-y-3">
                    <div className="h-24 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-10 w-32 rounded bg-gray-300 dark:bg-gray-600" />
                </div>
            </div>
            <div className="col-span-2 space-y-4">
                <div className="animate-pulse space-y-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
                    <div className="h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-6 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[50px] w-full rounded bg-gray-300 dark:bg-gray-600" />
                </div>
            </div>
        </div>
    );
};
