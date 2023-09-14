import type {SortDirectionType} from "./paginated";

export interface Pagination {
    page?: number;
    pageSize?: number | null;
    sort?: string | null;
    sortDirection?: SortDirectionType | null;
}