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

export default function PageDataDashboards(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.page
  const preFooterContent = props.data?.menus?.nodes[0]
  const blocks = pageData && [...pageData.blocks]
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const router = useRouter()
  const { page } = router.query
  const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')
  const socialLinks = props.data?.footer?.prefooter || []

  const [filters, setFilters] = useState({
    category: router.query.category || '',
    keyword: router.query.keyword || '',
    orderBy: router.query.orderBy || { field: 'TITLE', order: 'DESC' },
  })

  const handleFilterChange = useCallback(
    newFilters => {
      // Update the state
      setFilters(newFilters)

      // Update the URL without causing a navigation
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, ...newFilters },
        },
        undefined,
        { shallow: true }
      )
    },
    [router, setFilters]
  )

  const opportunities = useMemo(
    () => props?.data?.apprenticeshipOpportunities?.nodes || [],
    [props?.data?.apprenticeshipOpportunities?.nodes]
  )

  const dataDashboards = useMemo(
    () => props?.data?.dataDashboards?.nodes || [],
    [props?.data?.dataDashboards?.nodes]
  )

  const categories = useMemo(() => {
    const categories = dataDashboards
      .map(dataDashboard => dataDashboard.dataDashboardsCategories?.nodes)
      .filter(Boolean)
      .flat()
      .map(category => category.name)
      .filter(Boolean) // This will remove any undefined values

    // Create a Set to remove duplicates and then convert it back to an array
    const uniqueCategories = Array.from(new Set(categories))

    // Sort the array in alphabetical order
    uniqueCategories.sort()

    return uniqueCategories
  }, [dataDashboards])

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredDataDashboards, setFilteredDataDashboards] =
    useState(dataDashboards)

  const filterDataDashboards = useCallback(() => {
    let result = [...dataDashboards]

    if (debouncedFilters.keyword) {
      result = result.filter(dashboard => {
        return dashboard?.dataDashboardDetails?.title
          ?.toLowerCase()
          ?.includes(debouncedFilters.keyword.toLowerCase())
      })
    }

    if (debouncedFilters.category) {
      result = result.filter(dashboard => {
        const categories = dashboard.dataDashboardsCategories?.nodes?.map(
          node => node.name
        )
        return categories?.includes(debouncedFilters.category)
      })
    }

    if (debouncedFilters.orderBy.order === 'ASC') {
      result = result.sort(
        (a, b) =>
          b?.dataDashboardDetails?.title?.localeCompare(
            a.dataDashboardDetails?.title
          )
      )
    } else {
      result = result.sort(
        (a, b) =>
          a.dataDashboardDetails?.title?.localeCompare(
            b.dataDashboardDetails?.title
          )
      )
    }

    setFilteredDataDashboards([...result])
  }, [
    debouncedFilters.orderBy.order,
    debouncedFilters.keyword,
    debouncedFilters.category,
    dataDashboards,
  ])

  useEffect(() => {
    filterDataDashboards()
  }, [debouncedFilters, filterDataDashboards])

  const filtersToGenerateDropdown = [
    {
      name: 'category',
      options: categories,
      type: 'select',
    },

    {
      name: 'keyword',
      type: 'input',
    },
    {
      name: 'sort by',
      options: 'Sort by Name',
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
            postType="dataDashboards"
            posts={filteredDataDashboards}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

PageDataDashboards.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

PageDataDashboards.query = gql`
  ${Header.fragments.entry}
  query Page($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
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
    menu(id: "System Office", idType: NAME) {
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

    dataDashboards(
      first: 150
      where: { orderby: { field: TITLE, order: DESC } }
    ) {
      nodes {
        date
        uri
        dataDashboardDetails {
          title
        }
        dataDashboardsCategories {
          nodes {
            name
            link
          }
        }
      }
    }
  }
`
