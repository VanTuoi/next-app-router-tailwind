"use client";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { omit } from "lodash";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { path } from "~/constants";
import { QueryConfig, useGetCategories } from "~/hooks";
import { courseSchema, TypeCourseSchema } from "~/types";
import { createSearchString } from "~/utils";

import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Input } from "~/components/ui";

import { cn } from "~/lib/utils";

import { RatingFilter } from "./rating-filter";

const FormData = courseSchema
    .pick({ price_min: true, price_max: true, rating: true })
    .extend({
        price_min: z.string().refine((val) => val === "" || Number(val) >= 0, {
            message: "Giá phải lớn hơn hoặc bằng 0"
        }),
        price_max: z.string().refine((val) => val === "" || Number(val) >= 0, {
            message: "Giá phải lớn hơn hoặc bằng 0"
        })
    })
    .refine(
        (data) => {
            const { price_min, price_max } = data;
            const hasPriceMin = price_min !== "";
            const hasPriceMax = price_max !== "";

            if (hasPriceMin && hasPriceMax) {
                return Number(price_max) >= Number(price_min);
            }

            return hasPriceMin || hasPriceMax;
        },
        {
            message: "Giá không phù hợp (giá tối đa phải lớn hơn hoặc bằng giá tối thiểu)",
            path: ["price_min"]
        }
    );

type FilterCourses = Pick<TypeCourseSchema, "price_max" | "price_min" | "rating">;

const initValueFilter = {
    price_min: "0",
    price_max: "10000000",
    rating: "1"
};

interface Props {
    queryConfig: QueryConfig;
}

export const Filter = ({ queryConfig }: Props) => {
    const router = useRouter();

    const { data: dataCategories = [] } = useGetCategories();

    const [isOpen, setIsOpen] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    const currentCategory = queryConfig.category;

    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors, isValid }
    } = useForm<FilterCourses>({
        resolver: zodResolver(FormData),
        defaultValues: initValueFilter,
        mode: "onChange"
    });

    const selectedRating = Number(watch("rating"));

    const onSubmit = handleSubmit((data: FilterCourses) => {
        handleFilterByRangePrice(data);
    });

    const handleFilterByChange = (filter_by?: string) => {
        const newQuery = {
            ...queryConfig,
            page: "1"
        };

        if (filter_by) newQuery.category = filter_by;
        else delete newQuery.category;

        router.push(path.HOME + createSearchString(newQuery));
    };

    const handleFilterByRangePrice = (data: FilterCourses) => {
        const newQuery = {
            ...queryConfig,
            price_min: data.price_min,
            price_max: data.price_max,
            rating_filter: data.rating
        };
        router.push(path.HOME + createSearchString(newQuery));
    };

    const handleRemoveAll = () => {
        const newQuery = omit(queryConfig, ["price_min", "price_max", "rating_filter", "category", "name"]);
        router.push(path.HOME + createSearchString(newQuery));
    };

    const renderCategoryItem = (name?: string, label?: string) => {
        const isSelected = name === currentCategory || (!name && !currentCategory);
        return (
            <div
                key={name || "all"}
                onClick={() => handleFilterByChange(name)}
                className={cn(
                    "cursor-pointer px-2 py-1 font-mono text-sm",
                    isSelected && "text-primary font-semibold border-primary"
                )}
            >
                {label || name}
            </div>
        );
    };

    return (
        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <div className="block lg:hidden">
                <CollapsibleTrigger asChild>
                    <Button variant="outline" className="mb-2 w-full">
                        {isFilterOpen ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                    <div className="flex flex-col items-start gap-1">
                        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
                            <div className="flex items-center justify-between space-x-4 rounded-md p-1">
                                <h4 className="text-sm font-semibold uppercase">Danh mục</h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        {isOpen ? <ChevronsDownUp /> : <ChevronsUpDown />}
                                    </Button>
                                </CollapsibleTrigger>
                            </div>

                            {!isOpen && (
                                <div className="cursor-pointer px-2 py-1 font-mono text-sm font-semibold text-primary">
                                    {currentCategory || "Tất cả"}
                                </div>
                            )}

                            <CollapsibleContent className="space-y-1 md:space-y-2">
                                {renderCategoryItem(undefined, "Tất cả")}
                                {dataCategories.map((item) => renderCategoryItem(item.name))}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <p>Khoảng giá</p>
                        <form onSubmit={onSubmit} noValidate>
                            <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
                                <Input
                                    {...register("price_min")}
                                    type="number"
                                    className="w-full border-gray-400 sm:h-[30px] md:w-[85px]"
                                    placeholder="Từ"
                                />
                                <span className="hidden sm:inline">{"-"}</span>
                                <span className="inline sm:hidden">{"đến"}</span>
                                <Input
                                    {...register("price_max")}
                                    type="number"
                                    className="w-full border-gray-400 sm:h-[30px] md:w-[85px]"
                                    placeholder="Đến"
                                />
                            </div>

                            {(errors.price_min || errors.root || errors.price_max) && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.price_min?.message || errors.root?.message || errors.price_max?.message}
                                </p>
                            )}

                            <div className="mt-3">
                                <p className="mb-1 text-sm">Đánh giá tối thiểu</p>
                                <RatingFilter
                                    value={selectedRating}
                                    onChange={(value) => setValue("rating", value.toString())}
                                />
                            </div>

                            <Button disabled={!isValid} type="submit" className="mt-2 w-full">
                                Áp dụng
                            </Button>
                            <Button
                                type="button"
                                onClick={() => handleRemoveAll()}
                                className="mt-2 w-full text-red-500"
                                variant="ghost"
                            >
                                Đặt lại
                            </Button>
                        </form>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};
