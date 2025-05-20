import MockAdapter from "axios-mock-adapter";

export function auth(mock: MockAdapter) {
    mock.onPost(`/login`).reply(200, {
        success: true,
        message: "Login successfully",
        data: {
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXIiOiJtb3JfMjMxNCIsImlhdCI6MTcyODcxODk3MH0.lq4mo5IOr9ml5RFT42Wg7jSpMkDwWI-3Ss0Hu3TfNXQ",
            user: {
                id: "d538daad-03c6-4479-ad10-2d95d0048244",
                name: "Admin Jone",
                avatar: "https://tft.edu.vn/public/upload/2024/09/duolingo-meme-31.webp",
                email: "jone@example.com",
                phone: "0123456789",
                gender: "male",
                date_of_birth: "1990-01-01T00:00:00.000000Z",
                address: "123 Admin Street",
                enrollment_date: "2025-05-20T00:00:00.000000Z",
                status: "active",
                email_verified_at: "2025-05-20T03:15:39.000000Z",
                created_at: "2025-05-20T03:15:39.000000Z",
                updated_at: "2025-05-20T03:15:39.000000Z",
                roles: ["admin"]
            }
        }
    });

    mock.onPost(`/register`).reply(200, {
        success: true,
        message: "Register successfully",
        data: {
            user: {
                id: "d538daad-03c6-4479-ad10-2d95d0048244",
                name: "User Jone",
                avatar: "https://tft.edu.vn/public/upload/2024/09/duolingo-meme-31.webp",
                email: "jone@example.com",
                phone: "0123456789",
                gender: "male",
                date_of_birth: "1990-01-01T00:00:00.000000Z",
                address: "123 User Street",
                enrollment_date: "2025-05-20T00:00:00.000000Z",
                status: "active",
                email_verified_at: "2025-05-20T03:15:39.000000Z",
                created_at: "2025-05-20T03:15:39.000000Z",
                updated_at: "2025-05-20T03:15:39.000000Z",
                roles: ["user"]
            }
        }
    });
}
