import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useCreateCategory, useUpdateCategory } from "~/hooks";
import { Category, categorySchema, TypeCategorySchema } from "~/types";

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Input,
    Label
} from "~/components/ui";

interface CategoriesModelProps {
    category?: Category | null;
    isCreate: boolean;
    isOpen: boolean;
    setIsOpen: (status: boolean) => void;
}
export const CategoriesModel = ({ isOpen, setIsOpen, category, isCreate }: CategoriesModelProps) => {
    const { createCategory, loading: isCreating } = useCreateCategory(() => handleCreateSuccess());
    const { updateCategory, loading: isUpdating } = useUpdateCategory(() => handleUpdateSuccess());

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitted, touchedFields }
    } = useForm<TypeCategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {},
        mode: "onChange"
    });

    const handleCreateSuccess = () => {
        toast.success("Tạo mới danh mục thành công");
        setIsOpen(false);
    };

    const handleUpdateSuccess = () => {
        toast.success("Cập nhật danh mục thành công");
        setIsOpen(false);
    };

    const handleSubmitForm = async (formData: TypeCategorySchema) => {
        if (isCreate) {
            const res = await createCategory(formData);
            console.log("res", res);
        } else {
            if (!category?.id) {
                toast.error("Không tìm thấy ID danh mục để cập nhật");
                return;
            }
            updateCategory(formData);
        }
    };

    useEffect(() => {
        if (isOpen) {
            if (isCreate) {
                reset({ name: "" });
            } else if (category) {
                reset({ name: category.name });
            }
        }
    }, [isOpen, isCreate, category, reset]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-paper">
                <DialogHeader>
                    <DialogTitle>{isCreate ? "Tạo mới" : "Cập nhật"} danh mục</DialogTitle>
                    {isCreate ? <DialogDescription>ID danh mục sẽ được tạo tự động</DialogDescription> : ""}
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div>
                        <Label htmlFor="id" className="py-2">
                            ID Danh mục
                        </Label>
                        <Input
                            disabled
                            id="id"
                            placeholder="ID"
                            className="h-12"
                            {...register("id")}
                            value={category?.id ?? "Tự động tạo"}
                            readOnly
                        />
                    </div>
                    <div>
                        <Label htmlFor="name" className="py-2">
                            Tên danh mục
                        </Label>
                        <Input id="name" placeholder="Tên danh mục" className="h-12" {...register("name")} />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
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
