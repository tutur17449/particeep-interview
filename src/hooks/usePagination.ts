import { useState } from 'react'

export const usePagination = (initialPage = 1, defaultItemsPerPage = 4) => {
  const [page, setPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)

  const nextPage = () => setPage(currentPage => currentPage + 1)
  const previousPage = () => setPage(currentPage => currentPage - 1)
  const resetPage = () => setPage(initialPage)
  const updateItemsPerPage = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage)
    resetPage()
  }

  return {
    page,
    nextPage,
    previousPage,
    itemsPerPage,
    updateItemsPerPage,
    resetPage,
  }
}
