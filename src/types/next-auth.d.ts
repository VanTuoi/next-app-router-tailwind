import "next-auth";
import { UserData } from "./type";

declare module "next-auth" {
    interface Session {
        user: UserData;
        accessToken?: string;
    }

    interface User extends UserData {
        accessToken: string;
    }

    interface JWT extends User {}
}
