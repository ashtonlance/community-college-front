import Arrow from 'assets/icons/arrow-forward-sharp-reverse.svg'

type PaginationProps = {
  totalItems: number
  pageSize: number
  currentPage: number
  onPageClick: (page: number) => void
}

const generatePageNumbers = (currentPage: number, totalPages: number) => {
  let startPage = Math.max(currentPage - 4, 1)
  let endPage = Math.min(startPage + 5, totalPages)

  if (endPage - startPage < 5) {
    startPage = Math.max(endPage - 5, 1)
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
}

export const Pagination = (props: PaginationProps) => {
  const total = props.totalItems
  const pageSize = props.pageSize
  const onPageClick = props.onPageClick
  const currentPage = props.currentPage
  const totalPages = Math.ceil(total / pageSize)

  const showFirstPageLink = currentPage >= 6
  const showLastPageLink = currentPage <= totalPages - 6

  const pageNumbers = generatePageNumbers(currentPage, totalPages)

  return (
    <div className="pagination col-span-3 flex w-full flex-wrap items-center justify-between pb-[100px] pt-[60px] md:pb-[60px] md:pt-[40px] sm:flex-nowrap sm:pb-10 sm:pt-8">
      <span
        className={`${
          currentPage <= 1 && 'inactive-arrow'
        } group flex cursor-pointer items-center justify-center rounded-full bg-white p-4 `}
        onClick={() => {
          onPageClick(currentPage - 1)
        }}
      >
        <Arrow className="h-8 w-8 rotate-180 text-navy group-hover:text-gold" />
      </span>
      <div className="flex max-w-[85%] flex-wrap justify-center gap-3 md:max-w-full md:pt-4">
        {showFirstPageLink && currentPage !== 1 && (
          <span
            className="pagination-item"
            onClick={() => {
              onPageClick(1)
            }}
          >
            1
          </span>
        )}
        {showFirstPageLink && currentPage >= 7 && (
          <span className="pagination-item">...</span>
        )}
        {pageNumbers.map(pageNumber => (
          <span
            key={pageNumber}
            className={`pagination-item ${
              currentPage === pageNumber && 'bg-white text-navy'
            }`}
            onClick={() => {
              onPageClick(pageNumber)
            }}
          >
            {pageNumber}
          </span>
        ))}
        {showLastPageLink && currentPage <= totalPages - 5 && (
          <span className="pagination-item">...</span>
        )}
        {showLastPageLink && currentPage !== totalPages && (
          <span
            className="pagination-item"
            onClick={() => {
              onPageClick(totalPages)
            }}
          >
            {totalPages}
          </span>
        )}
      </div>
      <span
        className={`${
          currentPage >= totalPages && 'inactive-arrow'
        } group flex cursor-pointer items-center justify-center rounded-full bg-white p-4 `}
        onClick={() => {
          onPageClick(currentPage + 1)
        }}
      >
        <Arrow className="h-8 w-8 text-navy group-hover:text-gold" />
      </span>
    </div>
  )
}
