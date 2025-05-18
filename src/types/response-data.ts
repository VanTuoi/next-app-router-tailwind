export interface Errors {
    [field: string]: string[];
}

export interface PaginationMeta {
    total_pages: number;
    total_items: number;
    page: number;
    limit: number;
}

export interface ResponseData<T> {
    success: boolean;
    message: string;
    data: T | null;
    meta?: PaginationMeta;
    errors?: Errors;
}
