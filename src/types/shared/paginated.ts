export interface Paginated<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
}

export enum SortDirectionType {
    ASC = 'asc',
    DESC = 'desc'
}