import { Pagination } from '@/components/Pagination'
import { useRouter } from 'next/router'
import {
  GeneralCard,
  NumberedMemos,
  NumberedMemosHeading,
  ProgramCard,
  AnnualReports,
  AnnualReportsHeading,
  StaffCards,
  StaffCardsHeading,
  NewsCard,
} from '@/components/Cards'

const PAGE_SIZE = 9

type PostType =
  | 'numberedMemo'
  | 'colleges'
  | 'programFinder'
  | 'staff'
  | 'annualReports'
  | 'news'

type PaginatedPostsProps = {
  currentPage: number
  categoryName?: string
  tagName?: string
  posts?: any[]
  postType?: PostType
}

export const PaginatedPosts = (props: PaginatedPostsProps) => {
  const { postType, posts } = props
  const router = useRouter()

  const offset = (props.currentPage - 1) * PAGE_SIZE
  const items = (posts && posts.slice(offset, offset + PAGE_SIZE)) || []

  const handlePageClick = (page: number) => {
    router.push(`${router.asPath?.split('?')?.[0]}?page=${page}`, null, {
      shallow: false,
    })
  }

  return (
    <>
      {props.postType === 'numberedMemo' && <NumberedMemosHeading />}
      {props.postType === 'staff' && <StaffCardsHeading />}
      {props.postType === 'annualReports' && <AnnualReportsHeading />}

      {items.map((item, index) =>
        postType === 'colleges' ? (
          <GeneralCard key={index} card={item} />
        ) : postType === 'numberedMemo' ? (
          <NumberedMemos key={index} card={item} />
        ) : postType === 'staff' ? (
          <StaffCards key={index} card={item} />
        ) : postType === 'programFinder' ? (
          <ProgramCard key={index} card={item} index={index} />
        ) : postType === 'annualReports' ? (
          <AnnualReports key={index} card={item} />
        ) : postType === 'news' ? (
          <NewsCard
            key={index}
            card={item}
            currentPage={props.currentPage}
            index={index}
          />
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
