import MockAdapter from "axios-mock-adapter";
import { v4 as uuidv4 } from "uuid";

import { Course } from "~/types";

import { categoriesData } from "./categories";

const imageUrls = [
    "https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/Javascript-co-ban__2__be74112f409f47e9874f0da758c1d7cb.png",
    "https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/python-co-ban_b80bca9b238b4615b94541de28af00ae.png",
    "https://raw.githubusercontent.com/llanojs/Readme_template/master/react-logo.jpg",
    "https://cloud.z.com/vn/wp-content/uploads/2023/04/Screenshot_2-1.png",
    "https://blog.openreplay.com/images/zustand-state-management-for-react/images/hero.png",
    "https://caodang.fpt.edu.vn/wp-content/uploads/2024/12/FPT-Polytechnic-hcm-1.jpg"
];

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

const coursesData: Course[] = Array.from({ length: 25 }, (_, i) => {
    const category = getRandomItem(categoriesData);
    const image = getRandomItem(imageUrls);

    return {
        id: uuidv4(),
        image,
        images: [image],
        course_code: `COURSE${(i + 1).toString().padStart(3, "0")}`,
        name: `Khóa học số ${i + 1}`,
        description: `Mô tả cho khóa học số ${i + 1}.`,
        year: 2025,
        credit: 3,
        price: (1000000 + i * 100000).toFixed(2),
        price_before_discount: Math.random() < 0.5 ? undefined : (2000000 + i * 100000).toFixed(2) + 500000,
        rating: (Math.random() * 4 + 1).toFixed(2),
        quantity: 100 - i,
        sold: i * 2,
        view: 100 + i,
        category_id: category.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category
    };
});

export function courses(mock: MockAdapter) {
    mock.onGet(new RegExp(`^/courses/[^/]+$`)).reply((config) => {
        const id = config.url?.split("/").pop();
        const course = coursesData.find((course) => course.id === id);
        if (!course) {
            return [
                404,
                {
                    success: false,
                    message: "Course not found",
                    errors: []
                }
            ];
        } else {
            return [
                200,
                {
                    success: true,
                    message: "Get all courses success",
                    data: course
                }
            ];
        }
    });

    mock.onGet(/\/courses.*/).reply((config) => {
        const query = config.params;

        if (!query) {
            return [400, { success: false, message: "Invalid query parameters" }];
        }

        const page = parseInt((query.page as string) || "1");
        const limit = parseInt((query.limit as string) || "10");
        const sortBy = (query.sort_by as string) || "created_at";
        const order = (query.order as string) || "desc";
        const category = query.category as string;
        const priceMin = parseFloat(query.price_min as string);
        const priceMax = parseFloat(query.price_max as string);
        const rating = parseFloat(query.rating_filter as string);
        const name = query.name as string;

        let filtered = [...coursesData];

        if (category) {
            filtered = filtered.filter((c) => c.category?.name === category);
        }

        if (!isNaN(priceMin)) {
            filtered = filtered.filter((c) => parseFloat(c.price) >= priceMin);
        }

        if (!isNaN(priceMax)) {
            filtered = filtered.filter((c) => parseFloat(c.price) <= priceMax);
        }

        if (!isNaN(rating) && rating > 0) {
            filtered = filtered.filter((c) => {
                const courseRating = c.rating ? parseFloat(c.rating) : 0;
                const result = courseRating >= rating;
                return result;
            });
        }

        if (name) {
            filtered = filtered.filter((c) => c.name.includes(name) || c.course_code.includes(name));
        }

        const allowedSortFields: (keyof Course)[] = [
            "name",
            "year",
            "view",
            "price",
            "course_code",
            "created_at",
            "credit",
            "sold",
            "rating"
        ];

        if (allowedSortFields.includes(sortBy as keyof Course)) {
            filtered.sort((a, b) => {
                const valA = a[sortBy as keyof Course];
                const valB = b[sortBy as keyof Course];

                if (typeof valA === "number" && typeof valB === "number") {
                    return order === "asc" ? valA - valB : valB - valA;
                }

                return order === "asc"
                    ? String(valA).localeCompare(String(valB))
                    : String(valB).localeCompare(String(valA));
            });
        }

        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / limit);
        const paginated = filtered.slice((page - 1) * limit, page * limit);

        return [
            200,
            {
                success: true,
                message: "Get all courses success",
                data: paginated,
                meta: {
                    page,
                    limit,
                    total_items: totalItems,
                    total_pages: totalPages
                }
            }
        ];
    });

    mock.onPost("/courses").reply((config) => {
        const newCourseData = JSON.parse(config.data) as Omit<Course, "id" | "created_at" | "updated_at">;
        const newId = uuidv4();
        const courseWithId: Course = {
            ...newCourseData,
            id: newId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            image: newCourseData.image || "https://cloud.z.com/vn/wp-content/uploads/2023/04/Screenshot_2-1.png",
            images: newCourseData.images || ["https://cloud.z.com/vn/wp-content/uploads/2023/04/Screenshot_2-1.png"],
            price_before_discount: undefined,
            rating: newCourseData.rating || "0.00",
            category_id: newCourseData.category_id || "46c0ec3c-bad7-4e6b-8830-bd3790f56621",
            description: newCourseData.description || "",
            name: newCourseData.name || `Khóa học số ${courses.length + 1}`,
            course_code: newCourseData.course_code || `COURSE${(courses.length + 1).toString().padStart(3, "0")}`,
            category: newCourseData.category || {
                id: "46c0ec3c-bad7-4e6b-8830-bd3790f56621",
                name: "JavaScript",
                created_at: "2025-05-20T03:15:39.000000Z",
                updated_at: "2025-05-20T03:15:39.000000Z"
            }
        };

        coursesData.push(courseWithId);

        return [201, { success: true, message: "Course created", data: courseWithId }];
    });

    mock.onPut(new RegExp(`^/courses/[^/]+$`)).reply((config) => {
        const id = config.url?.split("/").pop();
        const courseIndex = coursesData.findIndex((course) => course.id === id);

        if (courseIndex === -1) {
            return [
                404,
                {
                    success: false,
                    message: "Course not found",
                    errors: []
                }
            ];
        }

        const updatedCourseData = JSON.parse(config.data) as Partial<Omit<Course, "id" | "created_at" | "updated_at">>;
        const existingCourse = coursesData[courseIndex];

        const updatedCourse: Course = {
            ...existingCourse,
            ...updatedCourseData,
            updated_at: new Date().toISOString(),
            image: updatedCourseData.image || existingCourse.image,
            images: updatedCourseData.images || existingCourse.images,
            price_before_discount: updatedCourseData.price_before_discount ?? existingCourse.price_before_discount,
            rating: updatedCourseData.rating || existingCourse.rating || "0.00",
            category_id: updatedCourseData.category_id || existingCourse.category_id,
            description: updatedCourseData.description || existingCourse.description || "",
            name: updatedCourseData.name || existingCourse.name || `Khóa học số ${courseIndex + 1}`,
            course_code:
                updatedCourseData.course_code ||
                existingCourse.course_code ||
                `COURSE${(courseIndex + 1).toString().padStart(3, "0")}`,
            category: updatedCourseData.category || existingCourse.category
        };

        coursesData[courseIndex] = updatedCourse;

        return [
            200,
            {
                success: true,
                message: "Course updated successfully",
                data: updatedCourse
            }
        ];
    });
}
