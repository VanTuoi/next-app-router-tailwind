"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";

import { path } from "~/constants";
import { authApi } from "~/services";
import { LoginData, ResponseData, TypeUserSchema, UserData } from "~/types";

type LoginFormData = Pick<TypeUserSchema, "email" | "password">;

export const useLogin = (onSuccessCallback?: () => void) => {
    const {
        mutate: login,
        isPending: loading,
        error
    } = useMutation<LoginData, ResponseData<null> | undefined, LoginFormData>({
        mutationFn: async (credentials: LoginFormData): Promise<LoginData> => {
            const { data } = await authApi("public").login(credentials);

            if (!data?.data?.accessToken || !data?.data?.user) {
                throw new Error("Invalid login response");
            }

            const signInResponse = await signIn("credentials", {
                email: credentials.email,
                password: credentials.password,
                accessToken: data.data.accessToken,
                user: JSON.stringify(data.data.user),
                redirect: false
            });

            if (!signInResponse?.ok) {
                throw new Error(signInResponse?.error || "Failed to sign in");
            }

            return data.data;
        },
        onSuccess: () => {
            onSuccessCallback?.();
        }
    });

    return {
        login,
        loading,
        error
    };
};

export const useRegister = (onSuccessCallback?: () => void) => {
    const {
        mutate: register,
        isPending: loading,
        error
    } = useMutation<UserData | null, ResponseData<null> | undefined, Pick<UserData, "name" | "email" | "password">>({
        mutationFn: async (userData: Pick<UserData, "name" | "email" | "password">): Promise<UserData | null> => {
            const { data } = await authApi("public").register(userData);
            return data.data;
        },
        onSuccess: (data) => {
            if (data) {
                onSuccessCallback?.();
            }
        }
    });

    return {
        register,
        loading,
        error
    };
};

export const useLogout = (onSuccessCallback?: () => void) => {
    const {
        mutate: logout,
        isPending: loading,
        error
    } = useMutation({
        mutationFn: async (): Promise<void> => {
            await signOut({ callbackUrl: path.HOME });
        },
        onSuccess: () => {
            onSuccessCallback?.();
        }
    });

    return {
        logout,
        loading,
        error: error as Error | null
    };
};
