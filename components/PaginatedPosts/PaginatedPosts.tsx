import { Pagination } from '@/components/Pagination'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import {
  CollegesCard,
  NumberedMemos,
  NumberedMemosHeading,
  ProgramCard,
  AnnualReports,
  AnnualReportsHeading,
  StaffCards,
  StaffCardsHeading,
  NewsCard,
  BoardMemberCard,
  EventCard,
  SchoolCard,
  OpportunitiesCard,
  OfficerCard,
  BoardMeetingCard,
  BoardMeetingHeading,
  DataDashboardCard,
} from '@/components/Cards'

const PAGE_SIZE = 9

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

  const offset = (props.currentPage - 1) * PAGE_SIZE
  const items = (posts && posts.slice(offset, offset + PAGE_SIZE)) || []

  const handlePageClick = (pageNumber: number) => {
    router.push(`${router.asPath?.split('?')?.[0]}?page=${pageNumber}`, null, {
      shallow: true,
    })
  }

  return (
    <>
      {props.postType === 'numberedMemo' && <NumberedMemosHeading />}
      {props.postType === 'staff' && <StaffCardsHeading />}
      {props.postType === 'annualReports' && <AnnualReportsHeading />}
      {props.postType === 'boardMeeting' && <BoardMeetingHeading />}

      {items.map((item, index) =>
        postType === 'colleges' ? (
          <CollegesCard key={index} card={item} />
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
        ) : postType === 'boardMembers' ? (
          <BoardMemberCard key={index} card={item} />
        ) : postType === 'events' ? (
          <EventCard key={index} card={item} />
        ) : postType === 'schools' ? (
          <SchoolCard key={index} card={item} />
        ) : postType === 'oppurtunities' ? (
          <OpportunitiesCard key={index} card={item} />
        ) : postType === 'officers' ? (
          <OfficerCard key={index} card={item} />
        ) : postType === 'boardMeeting' ? (
          <BoardMeetingCard key={index} card={item} />
        ) : postType === 'dataDashboards' ? (
          <DataDashboardCard key={index} card={item} />
        ) : (
          <></>
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
