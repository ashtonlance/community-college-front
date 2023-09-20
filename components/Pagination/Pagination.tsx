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
    <div className="col-span-3 flex w-full items-center justify-between pb-[100px] pt-[60px] md:pb-[60px] md:pt-[40px] sm:pb-10 sm:pt-8">
      <span
        className={`${
          currentPage <= 1 && 'inactive-arrow'
        } flex cursor-pointer items-center justify-center rounded-full bg-white p-4`}
        onClick={() => {
          onPageClick(currentPage - 1)
        }}
      >
        <Arrow className="h-5 w-5 rotate-180 text-darkBeige" />
      </span>
      <div className="flex gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <p
            key={i}
            className={`pagination-item ${
              currentPage === i + 1 && 'bg-white text-navy'
            }`}
            onClick={() => {
              onPageClick(i + 1)
            }}
          >
            {i + 1}
          </p>
        ))}
      </div>

      <span
        className={`${
          currentPage >= totalPages && 'inactive-arrow'
        } flex cursor-pointer items-center justify-center rounded-full bg-white p-4`}
        onClick={() => {
          onPageClick(currentPage + 1)
        }}
      >
        <Arrow className="h-5 w-5 text-darkBeige" />
      </span>
    </div>
  )
}
