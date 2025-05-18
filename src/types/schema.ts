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

export const courseSchema = z.object({
    name: z.string().trim().min(1, "Tên khoá học là bắt buộc"),
    price_min: z.string().optional().default(""),
    price_max: z.string().optional().default(""),
    rating: z.string().optional().default("1")
});

export type TypeCourseSchema = z.infer<typeof courseSchema>;
