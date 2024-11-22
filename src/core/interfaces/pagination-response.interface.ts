export interface PaginationResponse {
  totalPages?: number;
  totalElements: number;
  [key: string]: any;
  nextPage?: number | null;
  prevPage?: number | null;
}
