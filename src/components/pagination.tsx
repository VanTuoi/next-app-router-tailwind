"use client";

import { useRouter } from "next/navigation";

import { path } from "~/constants/path";
import { QueryConfig } from "~/hooks";
import { createSearchString } from "~/utils";

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui";

import { cn } from "~/lib/utils";

interface Props {
    queryConfig: QueryConfig;
    pageSize: number;
}

const RANGE = 2;

export const Pagination = ({ queryConfig, pageSize = 1 }: Props) => {
    const router = useRouter();
    const page = Number(queryConfig.page);

    const renderPagination = () => {
        let dotAfter = false;
        let dotBefore = false;

        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true;
                return (
                    <span key={`before-${index}`} className="mx-2 rounded bg-white px-3 py-2">
                        ...
                    </span>
                );
            }
            return null;
        };

        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true;
                return (
                    <span key={`after-${index}`} className="mx-2 rounded bg-white px-3 py-2">
                        ...
                    </span>
                );
            }
            return null;
        };

        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1;

                if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
                    return renderDotAfter(index);
                } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
                    if (pageNumber < page - RANGE && pageNumber > RANGE) return renderDotBefore(index);
                    if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) return renderDotAfter(index);
                } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
                    return renderDotBefore(index);
                }

                const href = path.HOME + createSearchString({ ...queryConfig, page: pageNumber.toString() });

                return (
                    <Button
                        className={cn(
                            "mx-1 px-3 py-1 border-primary hover:bg-primary/10",
                            pageNumber === page
                                ? "border-primary bg-primary text-white"
                                : "border-transparent text-gray-600 bg-white"
                        )}
                        onClick={() => router.push(href)}
                        key={index}
                    >
                        {pageNumber}
                    </Button>
                );
            });
    };

    const handlePageChange = (newPage: number) => {
        const newQuery = { ...queryConfig, page: newPage.toString() };
        router.push(path.HOME + createSearchString(newQuery));
    };

    const handleLimitChange = (newLimit: string) => {
        const newQuery = { ...queryConfig, page: "1", limit: newLimit };
        router.push(path.HOME + createSearchString(newQuery));
    };

    return (
        <div className="mb-4 mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center">
                <Select value={queryConfig.limit || "10"} onValueChange={handleLimitChange}>
                    <SelectTrigger className="w-[55px] bg-white">
                        <SelectValue placeholder="Số lượng" />
                    </SelectTrigger>
                    <SelectContent className="w-[55px] bg-white">
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center">
                {page === 1 ? (
                    <Button disabled className="text-muted-foreground bg-white">
                        Trang trước
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(page - 1)}
                        className="border-none bg-white text-primary hover:bg-primary/10"
                    >
                        Trang trước
                    </Button>
                )}

                {renderPagination()}

                {page === pageSize ? (
                    <Button disabled className="text-muted-foreground bg-white">
                        Trang kế
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(page + 1)}
                        className="border-none bg-white text-primary hover:bg-primary/10"
                    >
                        Trang kế
                    </Button>
                )}
            </div>
        </div>
    );
};
