export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }
  if (currentPage >= totalPages -2) {
    return [1, 2, '...', totalPages - 2, totalPages -1, totalPages]
  }
  if (currentPage <= 3) {
    return [1,2,3, '...', totalPages]
  }
  return [
    1, '...', currentPage -1, currentPage, currentPage, currentPage +1, '...', totalPages
  ]
}