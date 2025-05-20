"use client";

import { useRouter } from "next/navigation";

import { QueryConfig } from "~/hooks";
import { createSearchString } from "~/utils";

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui";

import { cn } from "~/lib/utils";

interface Props {
    path: string;
    queryConfig: QueryConfig;
    pageSize: number;
}

const RANGE = 2;

export const Pagination = ({ path = "/", queryConfig, pageSize = 1 }: Props) => {
    const router = useRouter();
    const page = Number(queryConfig.page);

    const renderPagination = () => {
        let dotAfter = false;
        let dotBefore = false;

        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true;
                return (
                    <span key={`before-${index}`} className="mx-2 rounded px-3 py-2">
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
                    <span key={`after-${index}`} className="mx-2 rounded px-3 py-2">
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

                const href = path + createSearchString({ ...queryConfig, page: pageNumber.toString() });

                return (
                    <Button
                        variant={"ghost"}
                        className={cn(
                            "mx-1 px-3 py-1 border-primary ",
                            pageNumber === page
                                ? "border-primary bg-primary hover:bg-primary/80"
                                : "border-transparent hover:bg-primary/10 "
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
        router.push(path + createSearchString(newQuery));
    };

    const handleLimitChange = (newLimit: string) => {
        const newQuery = { ...queryConfig, page: "1", limit: newLimit };
        router.push(path + createSearchString(newQuery));
    };

    return (
        <div className="mb-4 mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center">
                <Select value={queryConfig.limit || "10"} onValueChange={handleLimitChange}>
                    <SelectTrigger className="w-[55px] bg-paper">
                        <SelectValue placeholder="Số lượng" />
                    </SelectTrigger>
                    <SelectContent className="w-[55px] bg-paper text-foreground">
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
                    <Button disabled variant="ghost" className="text-foreground-muted">
                        Trang trước
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        onClick={() => handlePageChange(page - 1)}
                        className="text-primary hover:bg-primary/10"
                    >
                        Trang trước
                    </Button>
                )}

                {renderPagination()}

                {page === pageSize ? (
                    <Button disabled variant="ghost" className="text-foreground-muted">
                        Trang kế
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        onClick={() => handlePageChange(page + 1)}
                        className="text-primary hover:bg-primary/10"
                    >
                        Trang kế
                    </Button>
                )}
            </div>
        </div>
    );
};
