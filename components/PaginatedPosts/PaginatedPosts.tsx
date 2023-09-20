import { Pagination } from '@/components/Pagination'
import { useRouter } from 'next/router'
import { GeneralCard } from '@/components/Cards'
const PAGE_SIZE = 3

type PaginatedPostsProps = {
  currentPage: number
  categoryName?: string
  tagName?: string
  colleges?: any[]
}

export const PaginatedPosts = (props: PaginatedPostsProps) => {
  const router = useRouter()

  const offset = (props.currentPage - 1) * PAGE_SIZE
  const items = props.colleges.slice(offset, offset + PAGE_SIZE)
  console.log(items, 'items')

  const handlePageClick = (page: number) => {
    router.push(`${router.asPath?.split('?')?.[0]}?page=${page}`, null, {
      shallow: true,
    })
  }

  return (
    <>
      {items.map((item, index) => {
        return <GeneralCard key={index} card={item} />
      })}
      {items?.length > 0 && (
        <Pagination
          currentPage={props.currentPage}
          totalItems={props.colleges.length}
          pageSize={PAGE_SIZE}
          onPageClick={handlePageClick}
        />
      )}
    </>
  )
}
