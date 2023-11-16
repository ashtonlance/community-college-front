import { PaginatedPosts } from '@/components/PaginatedPosts'
import { PostFilter } from '@/components/PostFilter'
import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { useDebounce } from '@uidotdev/usehooks'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
export default function PageEvents(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.page
  const preFooterContent = props.data?.menus?.nodes[0]
  const blocks = pageData && [...pageData.blocks]
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const router = useRouter()
  const { page } = router.query
  const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')
  const footerMenuItems = props.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const socialLinks = props.data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

  const [filters, setFilters] = useState({
    audience: '',
    type: '',
    orderBy: { field: 'DATE', order: 'ASC' },
  })

  const events = useMemo(
    () => props?.data?.events?.nodes || [],
    [props?.data?.events?.nodes]
  )

  const categories = useMemo(
    () => [
      ...new Set(
        events.flatMap(
          event => event?.eventsCategories?.nodes.map(category => category.name)
        )
      ),
    ],
    [events]
  )

  const tags = useMemo(
    () => [
      ...new Set(
        events.flatMap(event => event?.eventsTags?.nodes.map(tag => tag.name))
      ),
    ],
    [events]
  )

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredEvents, setFilteredEvents] = useState(events)

  const filterEvents = useCallback(() => {
    let result = [...events]

    if (debouncedFilters.audience) {
      result = result.filter(event => {
        return event?.eventsTags?.nodes?.some(node => {
          return node.name
            ?.toLowerCase()
            ?.includes(debouncedFilters.audience.toLowerCase())
        })
      })
    }

    if (debouncedFilters.type) {
      result = result.filter(event => {
        return event?.eventsCategories?.nodes?.some(node => {
          return node.name
            ?.toLowerCase()
            ?.includes(debouncedFilters.type.toLowerCase())
        })
      })
    }

    if (debouncedFilters.orderBy.order === 'ASC') {
      result = result.sort(
        (a, b) => b.eventDetails?.date?.localeCompare(a.eventDetails?.date)
      )
    } else {
      result = result.sort(
        (a, b) => a.eventDetails?.date?.localeCompare(b.eventDetails?.date)
      )
    }

    setFilteredEvents([...result])
  }, [
    debouncedFilters.audience,
    debouncedFilters.orderBy.order,
    debouncedFilters.type,
    events,
  ])

  useEffect(() => {
    filterEvents()
  }, [debouncedFilters, filterEvents])

  const filtersToGenerateDropdown = [
    {
      name: 'audience',
      options: tags,
      type: 'select',
    },
    {
      name: 'type',
      options: categories,
      type: 'select',
    },
    {
      name: 'sort by',
      options: 'Sort by Year',
      type: 'select',
    },
  ]

  if (props.loading) {
    return <>Loading...</>
  }

  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
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
            postType="events"
            posts={filteredEvents}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

PageEvents.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

PageEvents.query = gql`
  ${Header.fragments.entry}
  query Page($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      databaseId
      title
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
    menu(id: "students", idType: SLUG) {
      menuItems(first: 200) {
        nodes {
          ...NavigationMenuFragment
        }
      }
    }
    footer: menu(id: "Footer", idType: SLUG) {
      menuItems(first: 200) {
        nodes {
          ...NavigationMenuFragment
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
    events(first: 500, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        uri
        blocks
        featuredImage {
          node {
            sourceUrl
          }
        }
        eventDetails {
          location
          date
        }
        eventsCategories {
          nodes {
            name
          }
        }
        eventsTags {
          nodes {
            name
          }
        }
      }
    }
  }
`
