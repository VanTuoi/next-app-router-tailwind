import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { auth } from "./auth";
import { categories } from "./categories";
import { courses } from "./courses";

export default function applyMockAdapter(axiosInstance: AxiosInstance) {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 10 });

    auth(mock);
    categories(mock);
    courses(mock);

    mock.onAny().reply(404, {
        success: false,
        message: "API route not found",
        errors: []
    });
}
