import { PaginatedPosts } from '@/components/PaginatedPosts'
import { PostFilter } from '@/components/PostFilter'
import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { useDebounce } from '@uidotdev/usehooks'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { convertToDate } from 'utils/dates'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function StateBoardMeetingMinutesPage({ data, loading, error }) {
  const router = useRouter()
  const { page } = router.query
  const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')

  const menuItems = data?.menu?.menuItems || []
  const pageData = data?.page
  const preFooterContent = data?.menus?.nodes[0]
  const blocks = pageData && [...pageData.blocks]
  const utilityNavigation = data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = data?.settings?.siteSettings || []
  const socialLinks = data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

  const boardMeetings = useMemo(
    () => data?.boardMeetings?.nodes || [],
    [data?.boardMeetings?.nodes]
  )

  const [filters, setFilters] = useState({
    category: '',
    year: '',
    keyword: '',
    orderBy: { field: 'DATE', order: 'DESC' },
  })

  const years = useMemo(() => {
    const yearsSet = new Set(
      boardMeetings
        .map(meeting => meeting.boardMeetingDetails?.date?.split('/')[2])
        .filter(Boolean) // remove empty or undefined values
    )

    // convert Set to Array, map to Number and sort
    return Array.from(yearsSet)
      .map(Number)
      .sort((a, b) => a - b)
  }, [boardMeetings])

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredBoardMeetings, setFilteredBoardMeetings] =
    useState(boardMeetings)

  const filterBoardMeetings = useCallback(() => {
    let result = [...boardMeetings]

    if (debouncedFilters.year) {
      result = result.filter(meeting =>
        meeting.boardMeetingDetails.date.includes(debouncedFilters.year)
      )
    }

    if (debouncedFilters.keyword) {
      result = result.filter(meeting =>
        meeting.title
          .toLowerCase()
          .includes(debouncedFilters.keyword.toLowerCase())
      )
    }

    if (debouncedFilters.orderBy.order === 'ASC') {
      result = result.sort((a, b) => {
        const aDate = new Date(convertToDate(a.boardMeetingDetails?.date) || '')
        const bDate = new Date(convertToDate(b.boardMeetingDetails?.date) || '')
        if (isNaN(aDate.getTime()) || isNaN(bDate.getTime())) {
          console.error('Invalid Date')
          return 0
        }
        return aDate.getTime() - bDate.getTime()
      })
    } else {
      result = result.sort((a, b) => {
        const aDate = new Date(convertToDate(a.boardMeetingDetails?.date) || '')
        const bDate = new Date(convertToDate(b.boardMeetingDetails?.date) || '')
        if (isNaN(aDate.getTime()) || isNaN(bDate.getTime())) {
          console.error('Invalid Date')
          return 0
        }
        return bDate.getTime() - aDate.getTime()
      })
    }

    setFilteredBoardMeetings([...result])
  }, [
    debouncedFilters.keyword,
    debouncedFilters.orderBy.order,
    debouncedFilters.year,
    boardMeetings,
  ])

  useEffect(() => {
    filterBoardMeetings()
  }, [debouncedFilters, filterBoardMeetings])

  if (loading) {
    return <>Loading...</>
  }

  const filtersToGenerateDropdown = [
    {
      name: 'year',
      options: years,
      type: 'select',
    },
    {
      name: 'keyword',
      type: 'input',
    },
    {
      name: 'sort by',
      options: 'Sort by Year',
      type: 'select',
    },
  ]

  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      headerVariant={'default'}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
      databaseId={databaseId}
    >
      <div className="h-full bg-grey">
        {blocks && (
          <WordPressBlocksViewer fallbackBlock={[] as any} blocks={blocks} />
        )}
        <PostFilter
          filters={filters}
          setFilters={setFilters}
          filtersToGenerateDropdown={filtersToGenerateDropdown}
        />
        <div className="index-page-wrapper bg-grey">
          <PaginatedPosts
            currentPage={currentPage}
            postType="boardMeeting"
            posts={filteredBoardMeetings}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

StateBoardMeetingMinutesPage.variables = ({ uri }) => {
  return { uri }
}

StateBoardMeetingMinutesPage.query = gql`
  query StateBoardMeetings($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      databaseId
      slug
      status
      title
      link
      blocks
      seo {
        metaDesc
        canonical
        title
        schema {
          raw
        }
      }
    }

    boardMeetings(
      first: 1000
      where: {
        taxQuery: {
          taxArray: {
            operator: NOT_EXISTS
            taxonomy: BOARDMEETINGCATEGORY
            terms: "Proprietary"
          }
        }
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        boardMeetingCategories {
          nodes {
            name
          }
        }
        boardMeetingDetails {
          date
          location
          title
        }
        title
        uri
      }
    }

    menu(id: "System Office", idType: NAME) {
      menuItems(first: 200) {
        nodes {
          id
          parentId
          description
          label
          url
        }
      }
    }
    footer: menu(id: "Footer", idType: NAME) {
      menuItems(first: 200) {
        nodes {
          id
          parentId
          description
          label
          url
        }
      }
      prefooter {
        facebook
        x
        youtube
        linkedin
        instagram
      }
    }

    settings {
      siteSettings {
        announcementBar {
          announcementBarText
          showAnnouncementBar
          announcementBarLink
        }
      }

      utilityNavigation {
        navigationItems {
          navItem {
            title
            url
            target
          }
        }
      }
    }
  }
`
