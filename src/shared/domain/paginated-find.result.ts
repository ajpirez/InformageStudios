/**
 * Generic paginatedFind payload with pagination included.
 *
 * @export
 * @type PaginatedFindResult
 * @template T
 */
export type PaginatedFindResult<T> = {
  items: T[] | any[];
  limit: number;
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
};

export const getDefaultPaginatedFindResult = <T>(): PaginatedFindResult<T> => {
  return {
    items: [],
    limit: 0,
    currentPage: 0,
    totalPages: 0,
    totalDocuments: 0
  };
};
