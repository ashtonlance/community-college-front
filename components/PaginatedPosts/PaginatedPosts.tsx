import {
  AnnualReports,
  AnnualReportsHeading,
  BoardMeetingCard,
  BoardMeetingHeading,
  BoardMemberCard,
  CollegesCard,
  DataDashboardCard,
  EventCard,
  NewsCard,
  NumberedMemos,
  NumberedMemosHeading,
  OfficerCard,
  OpportunitiesCard,
  ProgramCard,
  SchoolCard,
  StaffCards,
  StaffCardsHeading,
} from '@/components/Cards'
import { Pagination } from '@/components/Pagination'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'

type PostType =
  | 'numberedMemo'
  | 'colleges'
  | 'programFinder'
  | 'staff'
  | 'annualReports'
  | 'news'
  | 'boardMembers'
  | 'events'
  | 'schools'
  | 'oppurtunities'
  | 'officers'
  | 'boardMeeting'
  | 'dataDashboards'

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
  const [currentPage, setCurrentPage] = useState(props.currentPage)
  const prevPostsLength = useRef(posts?.length)
  const PAGE_SIZE = postType === 'boardMembers' ? 12 : 9
  useEffect(() => {
    setCurrentPage(props.currentPage)
  }, [props.currentPage])

  useEffect(() => {
    if (prevPostsLength.current !== posts?.length) {
      setCurrentPage(1)

      // Create a URL object with the current full URL
      const url = new URL(window.location.href)

      // Get the current query parameters
      const params = new URLSearchParams(url.search)

      // Update the 'page' parameter
      params.set('page', String(currentPage))

      // Generate the new URL
      const newUrl = `${url.pathname}?${params.toString()}`

      router.push(newUrl, null, {
        shallow: true,
      })
    }

    prevPostsLength.current = posts?.length
  }, [posts?.length])

  const items = useMemo(() => {
    const offset = (currentPage - 1) * PAGE_SIZE
    return (posts && posts.slice(offset, offset + PAGE_SIZE)) || []
  }, [posts, currentPage, PAGE_SIZE])

  const resetFilters = () => {
    const { wordpressNode, ...rest } = router.query
    router.push(
      {
        pathname: router.pathname,
        query: { wordpressNode: wordpressNode },
      },
      undefined,
      {
        shallow: true,
      }
    )
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)

    // Create a URL object with the current full URL
    const url = new URL(window.location.href)

    // Get the current query parameters
    const params = new URLSearchParams(url.search)
    // Update the 'page' parameter
    params.set('page', String(pageNumber))

    // Generate the new URL
    const newUrl = `${url.pathname}?${params.toString()}`
    router.replace(newUrl, null, {
      shallow: true,
    })
  }

  return (
    <>
      {props.postType === 'numberedMemo' && <NumberedMemosHeading />}
      {props.postType === 'staff' && <StaffCardsHeading />}
      {props.postType === 'annualReports' && <AnnualReportsHeading />}
      {props.postType === 'boardMeeting' && <BoardMeetingHeading />}

      {items.length === 0 && postType !== 'programFinder' ? (
        <div className="col-span-12 flex min-h-[25vh] w-full flex-col items-center justify-center gap-4 pb-12 pt-4 text-center">
          <p className="h4">No results found.</p>
          <button className="primary-btn gold" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        items.map((item, index) => {
          return postType === 'colleges' ? (
            <CollegesCard key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'numberedMemo' ? (
            <NumberedMemos key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'staff' ? (
            <StaffCards key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'programFinder' ? (
            <ProgramCard
              key={`${item.uri}-${index}`}
              card={item}
              index={index}
            />
          ) : postType === 'annualReports' ? (
            <AnnualReports key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'news' ? (
            <NewsCard
              key={`${item.uri}-${index}`}
              card={item}
              currentPage={props.currentPage}
              index={index}
            />
          ) : postType === 'boardMembers' ? (
            <BoardMemberCard key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'events' ? (
            <EventCard key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'schools' ? (
            <SchoolCard key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'oppurtunities' ? (
            <OpportunitiesCard key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'officers' ? (
            <OfficerCard key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'boardMeeting' ? (
            <BoardMeetingCard key={`${item.uri}-${index}`} card={item} />
          ) : postType === 'dataDashboards' ? (
            <DataDashboardCard key={`${item.uri}-${index}`} card={item} />
          ) : (
            <></>
          )
        })
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
