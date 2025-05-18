import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

import { path } from "./constants/path";

const PUBLIC_PATHS = [path.LOGIN, path.REGISTER];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    const isPublicPage = PUBLIC_PATHS.includes(req.nextUrl.pathname);
    const isProtectedPage = req.nextUrl.pathname.startsWith("/admin");

    if (token && isPublicPage) {
        return NextResponse.redirect(new URL(path.HOME, req.url));
    }

    if (!token && isProtectedPage) {
        return NextResponse.redirect(new URL(path.LOGIN, req.url));
    }

    if (isProtectedPage && token) {
        const roles = token.roles as ("admin" | "user")[] | undefined;
        const isAdmin = roles?.includes("admin");

        if (!isAdmin) {
            return NextResponse.redirect(new URL(path.HOME, req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/admin/:path*"]
};
