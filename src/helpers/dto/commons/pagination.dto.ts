export type PaginationDto = {
    page?: number;
    limit?: number;
    offset?: number;
    sortBy?: string;
    order?: string;
    categoryIds?: string;
    subCategoryIds?: string;
    inStock?: string;
};