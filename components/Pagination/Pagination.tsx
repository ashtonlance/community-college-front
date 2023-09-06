import Image from 'next/image'
import arrow from '../../assets/icons/arrow-full-right.svg'
import Link from 'next/link'

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
    <div className="w-full flex items-center justify-between">
      <span
        className={`${currentPage <= 1 && 'inactive-arrow'}`}
        onClick={() => {
          onPageClick(currentPage - 1)
        }}
      >
        <Image
          className="rotate-180"
          alt=""
          src={arrow}
          width={24}
          height={11}
        />
      </span>
      <div className="flex">
        {Array.from({ length: totalPages }).map((_, i) => (
          <p
            key={i}
            className={`pagination-item ${
              currentPage === i + 1 && 'bg-gmt-200 text-black'
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
        className={`${currentPage >= totalPages && 'inactive-arrow'}`}
        onClick={() => {
          onPageClick(currentPage + 1)
        }}
      >
        <Image alt="" src={arrow} width={24} height={11} />
      </span>
    </div>
  )
}
