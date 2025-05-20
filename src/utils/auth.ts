/* eslint-disable @typescript-eslint/no-unused-vars */
import { getSession } from "next-auth/react";

import { UserData } from "~/types/type";

export function filterUser(user: UserData): Omit<UserData, "password" | "refreshToken"> {
    const { password: _password } = user;
    return user;
}

export async function getNextAuthToken(): Promise<string | null> {
    const session = await getSession();
    return session?.accessToken ?? null;
}
