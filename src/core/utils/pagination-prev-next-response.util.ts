export const getPrevNextPagination = (
  skip: number,
  take: number,
  totalElements: number,
) => {
  const currentPageBD = Math.floor(skip / take);
  const currentPage = currentPageBD + 1;
  const hasNextPage = (currentPageBD + 1) * take < totalElements;
  const hasPrevPage = skip - 1 > 1;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const prevPage = hasPrevPage ? currentPage - 1 : null;
  return {
    nextPage,
    prevPage,
  };
};
