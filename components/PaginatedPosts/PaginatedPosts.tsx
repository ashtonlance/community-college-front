import { Pagination } from '@/components/Pagination'
import { useRouter } from 'next/router'
import {
  GeneralCard,
  NumberedMemos,
  NumberedMemosHeading,
  ProgramCard,
} from '@/components/Cards'
const PAGE_SIZE = 9

type PostType = 'numberedMemo' | 'colleges' | 'programFinder'

type PaginatedPostsProps = {
  currentPage: number
  categoryName?: string
  tagName?: string
  posts?: any[]
  postType?: PostType
}

export const PaginatedPosts = (props: PaginatedPostsProps) => {
  const { postType } = props
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
        postType === 'colleges' ? (
          <GeneralCard key={index} card={item} />
        ) : postType === 'numberedMemo' ? (
          <NumberedMemos key={index} card={item} />
        ) : postType === 'programFinder' ? (
          <ProgramCard key={index} card={item} />
        ) : null
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
