"use client";

import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { useDeleteCategory, useGetCategories } from "~/hooks";
import { Category } from "~/types";

import { CategoriesModel } from "~/components/pages/admin/categories/model";
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui";

const Page = () => {
    const { data, loading } = useGetCategories();
    const { deleteCategory } = useDeleteCategory(() => handleDeleteSuccess());

    const [isCreate, setIsCreate] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [categorySelect, setCategorySelect] = useState<Category | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDeleteSuccess = () => {
        toast.success("Xoá danh mục thành công");
    };

    const handleCloseModel = (status: boolean) => {
        setIsOpen(status);
        setCategorySelect(null);
    };

    const handleEdit = (category: Category) => {
        setIsOpen(true);
        setIsCreate(false);
        setCategorySelect(category);
    };

    const handleCreate = () => {
        setIsOpen(true);
        setIsCreate(true);
        setCategorySelect(null);
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        try {
            deleteCategory(id);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <h2 className="py-2 font-bold uppercase text-primary">Quản lý danh mục</h2>
                <Button onClick={handleCreate}>Tạo mới</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[10%] text-center">STT</TableHead>
                        <TableHead className="w-[25%] text-center">Tên danh mục</TableHead>
                        <TableHead className="w-[25%] text-center">ID Danh mục</TableHead>
                        <TableHead className="w-[15%] text-center">Ngày tạo</TableHead>
                        <TableHead className="w-[15%] text-center">Ngày cập nhật</TableHead>
                        <TableHead className="w-[10%] text-center">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!loading ? (
                        data.map((item, index) => {
                            const isDeletingThis = deletingId === item.id;
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="w-[10px] text-center">{index + 1}</TableCell>
                                    <TableCell
                                        className="max-w-[150px] overflow-hidden truncate whitespace-nowrap text-center"
                                        title={item.name}
                                    >
                                        {item.name}
                                    </TableCell>
                                    <TableCell
                                        className="max-w-[150px] overflow-hidden truncate whitespace-nowrap text-center"
                                        title={item.id}
                                    >
                                        {item.id}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {dayjs(item.created_at).format("HH:mm DD/MM/YYYY")}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {dayjs(item.updated_at).format("HH:mm DD/MM/YYYY")}
                                    </TableCell>
                                    <TableCell className="flex items-center justify-center gap-2 text-center">
                                        <Button
                                            variant="ghost"
                                            className="text-primary"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="text-red-500"
                                            disabled={isDeletingThis}
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            {isDeletingThis ? <Trash2 className="animate-spin" /> : <Trash2 />}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                Đang tải...
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <CategoriesModel
                isOpen={isOpen}
                setIsOpen={(value) => handleCloseModel(value)}
                category={categorySelect}
                isCreate={isCreate}
            />
        </div>
    );
};

export default Page;
