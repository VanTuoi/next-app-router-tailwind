"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

import { path } from "~/constants/path";
import { authApi } from "~/services";
import { ResponseData, UserData } from "~/types";

interface LoginCredentials {
    email: string;
    password: string;
}

export const useLogin = (onSuccessCallback?: () => void) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const login = async (credentials: LoginCredentials) => {
        setLoading(true);
        setErrorMessage(null);

        const res = await signIn("credentials", {
            ...credentials,
            redirect: false
        });

        setLoading(false);

        if (res?.ok) {
            onSuccessCallback?.();
        } else {
            setErrorMessage("Sai tài khoản hoặc mật khẩu");
        }
    };

    return {
        login,
        loading,
        errorMessage
    };
};

export const useRegister = (onSuccessCallback?: () => void) => {
    const {
        mutate: register,
        isPending,
        data: mutationData,
        error
    } = useMutation({
        mutationFn: async (userData: Pick<UserData, "name" | "email" | "password">): Promise<UserData | null> => {
            const res = await authApi("public").register(userData);
            return res.data.data;
        },
        onSuccess: () => {
            onSuccessCallback?.();
        }
    });

    return {
        data: mutationData,
        register,
        loading: isPending,
        error: error as unknown as ResponseData<null> | null
    };
};

export const useLogout = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: path.HOME });
    };
    return { handleLogout };
};
