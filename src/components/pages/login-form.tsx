"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";

import { path } from "~/constants/path";
import { useLogin } from "~/hooks";
import { TypeUserSchema, userSchema } from "~/types";

import { Logo } from "../logo";
import { Button, Card, CardContent, Input, InputPassword, Label } from "../ui";

const loginSchema = userSchema.pick({ email: true, password: true });
type LoginFormData = Pick<TypeUserSchema, "email" | "password">;

const initDefaultValuesLogin = {
    email: "jone@example.com",
    password: "12345678"
};

export const LoginForm = memo(() => {
    const router = useRouter();
    const { login, loading, error } = useLogin(() => router.push("/"));

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isValid }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: initDefaultValuesLogin
    });

    const handleLogin = async (data: LoginFormData) => {
        login(data);
    };

    useEffect(() => {
        if (error?.errors) {
            Object.entries(error.errors).forEach(([field, messages]) => {
                messages.forEach((message) => {
                    setError(field as keyof LoginFormData, {
                        type: "server",
                        message
                    });
                });
            });
        } else {
            clearErrors();
        }
    }, [error, setError, clearErrors]);

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-lg py-6 shadow-lg">
                <CardContent className="space-y-4 px-8">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <p className="text-xl font-semibold">Đăng nhập</p>

                    <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <Label htmlFor="email" className="py-2">
                                Email
                            </Label>
                            <Input
                                autoComplete="email"
                                id="email"
                                placeholder="Email của bạn"
                                className="h-12"
                                {...register("email")}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password" className="py-2">
                                Password
                            </Label>
                            <InputPassword
                                autoComplete="password"
                                id="password"
                                placeholder="Mật khẩu của bạn"
                                className="h-12"
                                {...register("password")}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" className="h-12 w-full" disabled={loading || !isValid}>
                            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                    </form>

                    <div className="text-right text-sm">
                        <span className="mr-1">Bạn chưa có tài khoản?</span>
                        <span
                            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-800"
                            onClick={() => router.push(path.REGISTER)}
                        >
                            Đăng ký ngay
                        </span>
                    </div>

                    <div className="my-4 flex items-center gap-4">
                        <div className="flex-grow border-t border-gray-600 " />
                        <span className="whitespace-nowrap text-center text-sm font-semibold ">Hoặc đăng nhập với</span>
                        <div className="flex-grow border-t border-gray-600" />
                    </div>

                    <div className="flex justify-center gap-4 text-xl">
                        <p className="cursor-pointer hover:text-primary">Google</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});
