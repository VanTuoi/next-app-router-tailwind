import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email("Email không đúng định dạng").min(1, "Email không được để trống").max(50),
    name: z
        .string()
        .min(1, "Tên không được để trống")
        .max(50, "Tên không được quá 50 ký tự")
        .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Tên không được chứa ký tự đặc biệt hoặc số"),
    password: z
        .string({ required_error: "Vui lòng nhập mật khẩu" })
        .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
        .max(50, { message: "Mật khẩu không được vượt quá 50 ký tự" }),
    password_confirmation: z
        .string({ required_error: "Vui lòng nhập lại mật khẩu" })
        .min(8, { message: "Xác nhận mật khẩu không được để trống" })
        .max(50, { message: "Xác nhận mật khẩu không được vượt quá 50 ký tự" })
});

export type TypeUserSchema = z.infer<typeof userSchema>;

export const categorySchema = z.object({
    id: z.string().trim().min(1, "ID danh mục là bắt buộc"),
    name: z.string().trim().min(1, "Tên danh mục là bắt buộc")
});

export type TypeCategorySchema = z.infer<typeof categorySchema>;

export const courseSchema = z.object({
    id: z.string().trim().optional(),
    name: z.string().trim().min(1, "Tên khoá học là bắt buộc"),
    image: z.string().trim().optional(),
    images: z.array(z.string().min(1, "Không được để trống URL")).optional(),
    course_code: z.string().min(1, "Mã khóa học không được để trống"),
    description: z.string().trim().optional(),
    credit: z.number().min(1, "Tín chỉ phải lớn hơn 0"),
    year: z.number().min(2000, "Năm học không hợp lệ"),
    price: z.string().min(1, "Giá không được để trống"),
    price_before_discount: z.string().min(1, "Giá giảm không được để nhỏ hơn 0").optional(),
    rating: z.string().optional(),
    quantity: z.number().optional(),
    sold: z.number().optional(),
    view: z.number().optional(),
    category: z.string().trim().optional(),
    price_min: z.string().optional().default(""),
    price_max: z.string().optional().default("")
});

export type TypeCourseSchema = z.infer<typeof courseSchema>;

export type CourseFormData = Omit<z.infer<typeof courseSchema>, "price_min" | "price_max">;
