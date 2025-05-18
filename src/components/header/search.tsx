import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

import { path } from "~/constants/path";
import { useGetCourses, useQueryConfig } from "~/hooks";
import { courseSchema, TypeCourseSchema } from "~/types";
import { createSearchString } from "~/utils";

import { Button, Input } from "../ui";

type FormData = Pick<TypeCourseSchema, "name">;

const nameSchema = courseSchema.pick({ name: true });

export const SearchComponent = () => {
    const router = useRouter();
    const queryConfig = useQueryConfig();

    const {
        register,
        handleSubmit,
        formState: {}
    } = useForm<FormData>({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            name: ""
        },
        mode: "onChange"
    });

    const {} = useGetCourses(queryConfig);

    const onSubmit = (data: FormData) => {
        const newQuery = {
            ...queryConfig,
            page: "1",
            name: data.name
        };
        router.push(path.HOME + createSearchString(newQuery));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-md items-center gap-2">
            <Input
                type="text"
                {...register("name")}
                placeholder="Nhập tên hoặc mã khoá học..."
                className="rounded-lg border-2 border-gray-300 text-base font-medium placeholder:opacity-40  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:opacity-100"
            />
            <Button type="submit" className="flex items-center gap-1 rounded-lg">
                Tìm kiếm <Search size={18} />
            </Button>
        </form>
    );
};
