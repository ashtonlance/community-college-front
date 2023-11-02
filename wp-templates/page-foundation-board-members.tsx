import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { PostFilter } from '@/components/PostFilter'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useRouter } from 'next/router'
import { PaginatedPosts } from '@/components/PaginatedPosts'

export default function FoundationBoardMembersPage({ data, loading, error }) {
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

  const boardMembers = useMemo(
    () => data?.boardMembers?.nodes || [],
    [data?.boardMembers?.nodes]
  )

  const [filters, setFilters] = useState({
    appointment: '',
    orderBy: { field: 'TITLE', order: 'DESC' },
  })

  const appointments = useMemo(() => {
    const appointmentsSet = new Set(
      boardMembers.map(memo => memo.boardMember?.appointment).filter(Boolean)
    )
    return Array.from(appointmentsSet).sort()
  }, [boardMembers])

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredBoardMembers, setFilteredBoardMembers] = useState(boardMembers)

  const filterBoardMembers = useCallback(() => {
    let result = [...boardMembers]

    if (debouncedFilters.appointment) {
      result = result.filter(boardMember =>
        boardMember.boardMember.appointment.includes(
          debouncedFilters.appointment
        )
      )
    }

    if (debouncedFilters.expiration) {
      result = result.filter(
        boardMember =>
          boardMember.boardMember?.termExpiration.includes(
            debouncedFilters.expiration
          )
      )
    }

    if (debouncedFilters.orderBy.order === 'ASC') {
      result = result.sort((a, b) => {
        const aLastName = a.boardMember.name.split(' ').pop() || ''
        const bLastName = b.boardMember.name.split(' ').pop() || ''
        return bLastName.localeCompare(aLastName)
      })
    } else {
      result = result.sort((a, b) => {
        const aLastName = a.boardMember.name.split(' ').pop() || ''
        const bLastName = b.boardMember.name.split(' ').pop() || ''
        return aLastName.localeCompare(bLastName)
      })
    }

    setFilteredBoardMembers([...result])
  }, [
    debouncedFilters.expiration,
    debouncedFilters.appointment,
    debouncedFilters.orderBy.order,
    boardMembers,
  ])

  useEffect(() => {
    filterBoardMembers()
  }, [debouncedFilters, filterBoardMembers])

  if (loading) {
    return <>Loading...</>
  }

  const filtersToGenerateDropdown = [
    {
      name: 'appointment',
      options: appointments,
      type: 'select',
    },
    {
      name: 'sort by',
      options: 'Sort by Last Name',
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
            postType="boardMembers"
            posts={filteredBoardMembers}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

FoundationBoardMembersPage.variables = ({ uri }) => {
  return { uri }
}

FoundationBoardMembersPage.query = gql`
  query boardMembers($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
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

    boardMembers(
      first: 200
      where: {
        taxQuery: {
          taxArray: {
            operator: EXISTS
            taxonomy: BOARDMEMBERSCATEGORY
            terms: "Foundation"
          }
        }
        orderby: { field: TITLE, order: ASC }
      }
    ) {
      nodes {
        featuredImage {
          node {
            sourceUrl
          }
        }
        title
        uri
        boardMember {
          name
          committeeAssignments
          role
          appointment
          termExpiration
        }
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
