import { AxiosError } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { path } from "~/constants/path";
import { authApi } from "~/services";
import { ExtendedUser, ResponseData, UserData } from "~/types";

import type { JWT } from "next-auth/jwt";

type ExtendedToken = Omit<JWT, "email"> &
    UserData & {
        accessToken: string;
    };

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials): Promise<ExtendedUser | null> => {
                try {
                    const { data } = await authApi("public").login({
                        email: credentials?.email,
                        password: credentials?.password
                    });

                    if (data?.data?.accessToken && data?.data?.user) {
                        return { accessToken: data.data.accessToken, ...data.data.user };
                    }

                    return null;
                } catch (error) {
                    const err = error as AxiosError<ResponseData<null>>;
                    throw new Error(err.response?.data?.message || err.message || "Login failed");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return user ? { ...token, ...user } : token;
        },
        async session({ session, token }) {
            const typedToken = token as ExtendedToken;
            session.accessToken = typedToken.accessToken;
            session.user = { ...typedToken };
            return session;
        }
    },
    pages: {
        signIn: path.LOGIN
    },
    secret: process.env.NEXT_AUTH_SECRET
});

export { handler as GET, handler as POST };
