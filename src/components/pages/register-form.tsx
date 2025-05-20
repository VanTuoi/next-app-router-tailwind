"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { path } from "~/constants/path";
import { useRegister } from "~/hooks";
import { TypeUserSchema, userSchema } from "~/types";

import { Logo } from "../logo";
import { Button, Card, CardContent, Input, InputPassword, Label } from "../ui";

const registerSchema = userSchema
    .extend({
        password_confirmation: z
            .string({ required_error: "Vui lòng nhập lại mật khẩu" })
            .min(8, { message: "Xác nhận mật khẩu không được để trống" })
            .max(50, { message: "Xác nhận mật khẩu không được vượt quá 50 ký tự" })
    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: "Mật khẩu xác nhận không khớp"
    });

const initDefaultValueRegister = {
    name: "JONE",
    email: "jone2@example.com",
    password: "12345678",
    password_confirmation: "12345678"
};

export const RegisterForm = memo(() => {
    const router = useRouter();

    const {
        loading,
        error,
        register: handleRegister
    } = useRegister(() => {
        router.push("/login");
        toast.success("Đã tạo tài khoản thành công");
    });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isValid }
    } = useForm<TypeUserSchema>({
        mode: "onChange",
        resolver: zodResolver(registerSchema),
        defaultValues: initDefaultValueRegister
    });

    useEffect(() => {
        if (error?.errors) {
            Object.entries(error.errors).forEach(([field, messages]) => {
                messages.forEach((message) => {
                    setError(field as keyof TypeUserSchema, {
                        type: "server",
                        message
                    });
                });
            });
        } else {
            clearErrors();
        }
    }, [error, setError, clearErrors]);

    const onSubmit = (data: TypeUserSchema) => {
        handleRegister(data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-lg py-6 shadow-lg">
                <CardContent className="space-y-4 px-8">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <p className="text-xl font-semibold">Đăng ký</p>

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label htmlFor="name" className="py-2">
                                Tên
                            </Label>
                            <Input
                                id="name"
                                placeholder="Tên của bạn"
                                autoComplete="name"
                                className="h-12"
                                {...register("name")}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email" className="py-2">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="Email của bạn"
                                autoComplete="email"
                                className="h-12"
                                {...register("email")}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password" className="py-2">
                                Mật khẩu
                            </Label>
                            <InputPassword
                                id="password"
                                placeholder="Mật khẩu của bạn"
                                autoComplete="new-password"
                                className="h-12"
                                {...register("password")}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation" className="py-2">
                                Xác nhận mật khẩu
                            </Label>
                            <InputPassword
                                id="password_confirmation"
                                placeholder="Nhập lại mật khẩu"
                                autoComplete="new-password"
                                className="h-12"
                                {...register("password_confirmation")}
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-500">{errors.password_confirmation.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="h-12 w-full" disabled={loading || !isValid}>
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </Button>
                    </form>

                    <div className="text-right text-sm">
                        <span className="mr-1">Bạn đã có tài khoản?</span>
                        <span
                            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-800"
                            onClick={() => router.push(path.LOGIN)}
                        >
                            Đăng nhập ngay
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});
