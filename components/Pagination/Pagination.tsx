import Arrow from 'assets/icons/arrow-forward-sharp-reverse.svg'

type PaginationProps = {
  totalItems: number
  pageSize: number
  currentPage: number
  onPageClick: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
  const total = props.totalItems
  const pageSize = props.pageSize
  const onPageClick = props.onPageClick
  const currentPage = props.currentPage
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="pagination col-span-3 flex w-full flex-wrap items-center justify-between pb-[100px] pt-[60px] md:pb-[60px] md:pt-[40px] sm:pb-10 sm:pt-8">
      <span
        className={`${
          currentPage <= 1 && 'inactive-arrow'
        } flex cursor-pointer items-center justify-center rounded-full bg-white p-4 md:order-1`}
        onClick={() => {
          onPageClick(currentPage - 1)
        }}
      >
        <Arrow className="h-8 w-8 rotate-180 text-navy" />
      </span>
      <div className="flex max-w-[85%] flex-wrap gap-3 md:order-3 md:max-w-full md:pt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`pagination-item ${
              currentPage === i + 1 && 'bg-white text-navy'
            }`}
            onClick={() => {
              onPageClick(i + 1)
            }}
          >
            {i + 1}
          </span>
        ))}
      </div>

      <span
        className={`${
          currentPage >= totalPages && 'inactive-arrow'
        } flex cursor-pointer items-center justify-center rounded-full bg-white p-4 md:order-2`}
        onClick={() => {
          onPageClick(currentPage + 1)
        }}
      >
        <Arrow className="h-8 w-8 text-navy" />
      </span>
    </div>
  )
}
