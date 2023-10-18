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

export default function BoardMembersPage({ data, loading, error }) {
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
    expiration: '',
    orderBy: { field: 'TITLE', order: 'ASC' },
  })

  const appointments = useMemo(
    () => [
      ...new Set(
        boardMembers
          .map(memo => memo.boardMember?.appointment?.split('/')[2])
          .filter(Boolean)
      ),
    ],
    [boardMembers]
  )

  const expirations = useMemo(
    () => [
      ...new Set(
        boardMembers
          .map(memo => memo.boardMember?.termExpiration?.split('/')[2])
          .filter(Boolean)
      ),
    ],
    [boardMembers]
  )

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredBoardMembers, setFilteredBoardMembers] = useState(boardMembers)

  const filterBoardMembers = useCallback(() => {
    let result = boardMembers

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

    if (debouncedFilters.keyword) {
      result = result.filter(memo =>
        memo.numberedMemo.subject
          .toLowerCase()
          .includes(debouncedFilters.keyword.toLowerCase())
      )
    }

    if (debouncedFilters.orderBy.order === 'DESC') {
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

    setFilteredBoardMembers(result)
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
      name: 'expiration',
      options: expirations,
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

BoardMembersPage.variables = ({ uri }) => {
  return { uri }
}

BoardMembersPage.query = gql`
  query numberedMemos($uri: ID!) {
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

    boardMembers(first: 200, where: { orderby: { field: TITLE, order: ASC } }) {
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
