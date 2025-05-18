export interface UserData {
    id: string;
    name: string;
    avatar: string;
    email: string;
    password?: string;
    phone?: string;
    gender?: "male" | "female" | "other";
    date_of_birth?: string;
    address?: string;
    roles?: ("admin" | "user")[];
    status: "active" | "inactive";
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface ExtendedUser extends UserData {
    accessToken: string;
    expiredAt?: number;
}

export interface LoginData {
    user: UserData;
    accessToken: string;
    expiredAt?: number;
}

export interface Category {
    id: string;
    name: string;
    created_at: string;
    updated_at?: string;
}

export interface Course {
    id: string;
    image?: string;
    images?: string[];
    course_code: string;
    name: string;
    description?: string;
    year: number;
    credit: number;
    price: string;
    price_before_discount: string;
    rating: number;
    quantity: number;
    sold: number;
    view: number;
    category: Category;
    created_at: string;
    updated_at?: string;
}

export type CourseInput = Omit<Course, "id" | "created_at" | "updated_at">;

export interface CourseQueryParams {
    page?: number | string;
    limit?: number | string;
    sort_by?: "created_at" | "view" | "sold" | "price";
    order?: "asc" | "desc";
    exclude?: string;
    rating_filter?: number | string;
    price_max?: number | string;
    price_min?: number | string;
    name?: string;
    category?: string;
}
