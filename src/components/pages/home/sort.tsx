import { useRouter } from "next/navigation";

import { path } from "~/constants";
import { QueryConfig } from "~/hooks";
import { createSearchString } from "~/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui";

interface Props {
    queryConfig: QueryConfig;
}

export const Sort = ({ queryConfig }: Props) => {
    const router = useRouter();

    const sortOptions = [
        { label: "Tên", value: "name" },
        { label: "Năm học", value: "year" },
        { label: "Đánh giá", value: "rating" },
        { label: "Mới nhất", value: "created_at" },
        { label: "Lượt xem", value: "view" },
        { label: "Bán chạy", value: "sold" },
        { label: "Giá", value: "price" }
    ];

    const handleSortByChange = (sort_by: string) => {
        const newQuery = {
            ...queryConfig,
            page: "1",
            sort_by,
            order: queryConfig.order || "desc"
        };
        router.push(path.HOME + createSearchString(newQuery));
    };

    const handleOrderChange = (order: string) => {
        const newQuery = {
            ...queryConfig,
            page: "1",
            order,
            sort_by: queryConfig.sort_by || "created_at"
        };
        router.push(path.HOME + createSearchString(newQuery));
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
                <p>Sắp xếp theo:</p>
                <Select value={queryConfig.sort_by || "created_at"} onValueChange={handleSortByChange}>
                    <SelectTrigger className="w-[120px] bg-paper">
                        <SelectValue placeholder="Trường sắp xếp" />
                    </SelectTrigger>
                    <SelectContent className="w-[120px] bg-paper text-foreground">
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <p>Thứ tự:</p>
                <Select value={queryConfig.order || "desc"} onValueChange={handleOrderChange}>
                    <SelectTrigger className="w-[120px] bg-paper">
                        <SelectValue placeholder="Thứ tự" />
                    </SelectTrigger>
                    <SelectContent className="w-[120px] bg-paper text-foreground">
                        <SelectItem value="asc">Tăng dần</SelectItem>
                        <SelectItem value="desc">Giảm dần</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
