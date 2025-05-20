export interface Errors {
    [field: string]: string[];
}

export interface PaginationMeta {
    total_pages: number;
    total_items: number;
    page: number;
    limit: string;
}

export interface ResponseData<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: PaginationMeta;
    errors?: Errors;
}
