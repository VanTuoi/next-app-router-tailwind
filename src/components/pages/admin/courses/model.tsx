import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { useCreateCourse, useGetCategories, useUpdateCourse } from "~/hooks";
import { Course, courseSchema } from "~/types";

import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea
} from "~/components/ui";

const courseFormSchema = courseSchema.omit({ price_min: true, price_max: true }).extend({
    image: z.string().trim().optional(),
    images: z.array(z.string().trim()).optional()
});

export type CourseFormData = z.infer<typeof courseFormSchema>;

interface CourseModelProps {
    course?: Course | null;
    isCreate: boolean;
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
}

export const CourseModel = ({ isOpen, setIsOpen, course, isCreate }: CourseModelProps) => {
    const { createCourse, loading: isCreating, error: errorCreate } = useCreateCourse(() => handleCreateSuccess());
    const { updateCourse, loading: isUpdating, error: errorUpdate } = useUpdateCourse(() => handleUpdateSuccess());
    const { data: dataCategories } = useGetCategories();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        control,
        formState: { errors, isValid, isSubmitted, touchedFields }
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {},
        mode: "onChange"
    });

    const error = errorUpdate || errorCreate;

    useEffect(() => {
        if (error?.errors) {
            Object.entries(error.errors).forEach(([field, messages]) => {
                messages.forEach((message) => {
                    setError(field as keyof CourseFormData, {
                        type: "server",
                        message
                    });
                });
            });
        } else {
            clearErrors();
        }
    }, [error, setError, clearErrors]);

    const handleCreateSuccess = () => {
        toast.success("Tạo mới khóa học thành công");
        setIsOpen(false);
    };

    const handleUpdateSuccess = () => {
        toast.success("Cập nhật khóa học thành công");
        setIsOpen(false);
    };

    const handleSubmitForm = (formData: CourseFormData) => {
        if (isCreate) {
            createCourse(formData);
        } else {
            if (!course?.id) {
                toast.error("Không tìm thấy ID khóa học để cập nhật");
                return;
            }
            updateCourse({ id: course.id, courseData: formData });
        }
    };

    useEffect(() => {
        if (isOpen) {
            if (isCreate) {
                reset({
                    name: "",
                    course_code: "",
                    credit: 0,
                    price: "",
                    year: new Date().getFullYear(),
                    description: "",
                    price_before_discount: "",
                    rating: "1",
                    quantity: 0,
                    sold: 0,
                    view: 0,
                    category: undefined,
                    image: undefined,
                    images: []
                });
            } else if (course) {
                reset({
                    name: course.name,
                    course_code: course.course_code,
                    credit: course.credit,
                    price: course.price,
                    year: course.year,
                    description: course.description || "",
                    price_before_discount: course.price_before_discount || "",
                    rating: course.rating || "1",
                    quantity: course.quantity || 0,
                    sold: course.sold || 0,
                    view: course.view || 0,
                    category: course.category_id || undefined,
                    image: course.image || undefined,
                    images: course.images || []
                });
            }
        }
    }, [isOpen, isCreate, course, reset]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[90vh] min-w-[64rem] overflow-y-auto bg-paper text-foreground/90">
                <DialogHeader>
                    <DialogTitle>{isCreate ? "Tạo mới" : "Cập nhật"} khóa học</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="id" className="py-2">
                                ID khóa học
                            </Label>
                            <Input
                                disabled
                                id="id"
                                placeholder="ID"
                                className="h-12"
                                value={course?.id ?? "Tự động tạo"}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label htmlFor="name" className="py-2">
                                Tên khóa học
                            </Label>
                            <Input id="name" placeholder="Tên khóa học" className="h-12" {...register("name")} />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="course_code" className="py-2">
                                Mã khóa học
                            </Label>
                            <Input
                                id="course_code"
                                placeholder="Mã khóa học"
                                className="h-12"
                                {...register("course_code")}
                            />
                            {errors.course_code && (
                                <p className="mt-1 text-sm text-red-500">{errors.course_code.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="credit" className="py-2">
                                Số tín chỉ
                            </Label>
                            <Input
                                type="number"
                                id="credit"
                                placeholder="Số tín chỉ"
                                className="h-12"
                                {...register("credit", { valueAsNumber: true })}
                            />
                            {errors.credit && <p className="mt-1 text-sm text-red-500">{errors.credit.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="price" className="py-2">
                                Giá
                            </Label>
                            <Input id="price" placeholder="Giá" className="h-12" {...register("price")} />
                            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="price_before_discount" className="py-2">
                                Giá trước giảm giá
                            </Label>
                            <Input
                                id="price_before_discount"
                                placeholder="Giá trước giảm giá"
                                className="h-12"
                                {...register("price_before_discount")}
                            />
                            {errors.price_before_discount && (
                                <p className="mt-1 text-sm text-red-500">{errors.price_before_discount.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="year" className="py-2">
                                Năm học
                            </Label>
                            <Input
                                type="number"
                                id="year"
                                placeholder="Năm học"
                                className="h-12"
                                {...register("year", { valueAsNumber: true })}
                            />
                            {errors.year && <p className="mt-1 text-sm text-red-500">{errors.year.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="rating" className="py-2">
                                Đánh giá
                            </Label>
                            <Input
                                id="rating"
                                type="text"
                                placeholder="Đánh giá (1-5)"
                                className="h-12"
                                {...register("rating")}
                            />
                            {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="quantity" className="py-2">
                                Số lượng
                            </Label>
                            <Input
                                type="number"
                                id="quantity"
                                placeholder="Số lượng"
                                className="h-12"
                                {...register("quantity", { valueAsNumber: true })}
                            />
                            {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="sold" className="py-2">
                                Đã bán
                            </Label>
                            <Input
                                type="number"
                                id="sold"
                                placeholder="Đã bán"
                                className="h-12"
                                {...register("sold", { valueAsNumber: true })}
                            />
                            {errors.sold && <p className="mt-1 text-sm text-red-500">{errors.sold.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="view" className="py-2">
                                Lượt xem
                            </Label>
                            <Input
                                type="number"
                                id="view"
                                placeholder="Lượt xem"
                                className="h-12"
                                {...register("view", { valueAsNumber: true })}
                            />
                            {errors.view && <p className="mt-1 text-sm text-red-500">{errors.view.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="image" className="py-2">
                                Hình ảnh
                            </Label>
                            <Input id="image" placeholder="URL hình ảnh" className="h-12" {...register("image")} />
                            {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="images" className="py-2">
                                Nhiều hình ảnh
                            </Label>
                            <Controller
                                name="images"
                                control={control}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <Input
                                        id="images"
                                        placeholder="URL hình ảnh (cách nhau bằng dấu phẩy)"
                                        className="h-12"
                                        ref={ref}
                                        value={Array.isArray(value) ? value.join(", ") : (value ?? "")}
                                        onChange={(e) => {
                                            onChange(e.target.value);
                                        }}
                                        onBlur={(e) => {
                                            const raw = e.target.value;
                                            const parsed = raw
                                                .split(",")
                                                .map((item) => item.trim())
                                                .filter(Boolean);
                                            onChange(parsed);
                                            onBlur();
                                        }}
                                    />
                                )}
                            />

                            {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="category" className="py-2">
                                Danh mục
                            </Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value || ""}
                                        disabled={!dataCategories || dataCategories.length === 0}
                                    >
                                        <SelectTrigger className="!h-12 w-full border-gray-500">
                                            <SelectValue placeholder="Chọn danh mục" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[400px] bg-paper text-foreground">
                                            {dataCategories?.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="description" className="py-2">
                                Mô tả
                            </Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        id="description"
                                        placeholder="Mô tả khóa học"
                                        className="h-24"
                                        {...field}
                                    />
                                )}
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end py-3">
                        <Button
                            type="submit"
                            disabled={
                                (!isValid && (isSubmitted || Object.keys(touchedFields).length > 0)) ||
                                isCreating ||
                                isUpdating
                            }
                        >
                            {isCreate
                                ? isCreating
                                    ? "Đang tạo mới..."
                                    : "Tạo mới"
                                : isUpdating
                                  ? "Đang cập nhật..."
                                  : "Cập nhật"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
