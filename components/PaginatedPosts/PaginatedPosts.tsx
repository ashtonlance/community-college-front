import { Pagination } from '@/components/Pagination'
import { useRouter } from 'next/router'
import { GeneralCard } from '@/components/Cards'
import { NumberedMemos, NumberedMemosHeading } from '../Cards/NumberedMemos'
const PAGE_SIZE = 9

type PostType = 'numberedMemo' | 'colleges'

type PaginatedPostsProps = {
  currentPage: number
  categoryName?: string
  tagName?: string
  posts?: any[]
  postType?: PostType
}

export const PaginatedPosts = (props: PaginatedPostsProps) => {
  const router = useRouter()

  const offset = (props.currentPage - 1) * PAGE_SIZE
  const items = props.posts.slice(offset, offset + PAGE_SIZE)

  const handlePageClick = (page: number) => {
    router.push(`${router.asPath?.split('?')?.[0]}?page=${page}`, null, {
      shallow: true,
    })
  }

  return (
    <>
      {props.postType == 'numberedMemo' && <NumberedMemosHeading />}

      {items.map((item, index) =>
        props.postType === 'colleges' ? (
          <GeneralCard key={index} card={item} />
        ) : (
          <NumberedMemos key={index} card={item} />
        )
      )}
      {items?.length > 0 && (
        <Pagination
          currentPage={props.currentPage}
          totalItems={props.posts.length}
          pageSize={PAGE_SIZE}
          onPageClick={handlePageClick}
        />
      )}
    </>
  )
}
