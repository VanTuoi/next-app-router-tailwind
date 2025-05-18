import { isUndefined, omitBy } from "lodash";

import { CourseQueryParams } from "~/types";

import { useQueryParams } from "./use-query-params";

export type QueryConfig = {
    [key in keyof CourseQueryParams]: string;
};

export const useQueryConfig = () => {
    const queryParams: QueryConfig = useQueryParams();
    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || "1",
            limit: queryParams.limit || "10",
            sort_by: queryParams.sort_by,
            exclude: queryParams.exclude,
            name: queryParams.name,
            order: queryParams.order,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            rating_filter: queryParams.rating_filter,
            category: queryParams.category
        },
        isUndefined
    );
    return queryConfig;
};
