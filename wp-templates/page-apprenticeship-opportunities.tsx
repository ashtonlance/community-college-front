import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { PostFilter } from '@/components/PostFilter'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { PaginatedPosts } from '@/components/PaginatedPosts'
import { useRouter } from 'next/router'
import { useDebounce } from '@uidotdev/usehooks'

export default function PageApprenticeshipOpportunities(props) {
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

  const [filters, setFilters] = useState({
    programArea: router.query.programArea || '',
    zipCode: router.query.zipCode || '',
    keyword: router.query.keyword || '',
    orderBy: router.query.orderBy || { field: 'TITLE', order: 'ASC' },
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

  const opportunityProgramAreas = useMemo(() => {
    const programAreas = opportunities
      .map(opportunity => opportunity.apprenticeshipOpportunitiesProgramAreas)
      .filter(Boolean)
      .flat()
      .map(programArea => programArea.nodes[0]?.name)
      .filter(Boolean) // This will remove any undefined values

    // Create a Set to remove duplicates and then convert it back to an array
    const uniqueProgramAreas = Array.from(new Set(programAreas))

    // Sort the array in alphabetical order
    uniqueProgramAreas.sort()

    return uniqueProgramAreas
  }, [opportunities])

  // const zipCodes = useMemo(() => {
  //   const zipCodePattern = /\b\d{5}\b/g

  //   const zipCodes = opportunities
  //     .map(opportunity => opportunity.opportunityDetails?.offeredBy?.address)
  //     .filter(Boolean)
  //     .map(address => address.match(zipCodePattern))
  //     .filter(Boolean)
  //     .flat()

  //   // Create a Set to remove duplicates and then convert it back to an array
  //   const uniqueZipCodes = Array.from(new Set(zipCodes))

  //   return uniqueZipCodes
  // }, [opportunities])

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredOpps, setFilteredOpps] = useState(opportunities)

  const filterOpps = useCallback(() => {
    let result = opportunities

    if (
      debouncedFilters.zipCode &&
      (debouncedFilters.zipCode.length === 5 ||
        debouncedFilters.zipCode.length === 0)
    ) {
      const zipCodePattern = /\b\d{5}\b/g
      result = result.filter(opportunity => {
        const address = opportunity?.opportunityDetails?.offeredBy?.address
        const zipCodesInAddress = address ? address.match(zipCodePattern) : []
        return zipCodesInAddress
          ? zipCodesInAddress.includes(debouncedFilters.zipCode)
          : false
      })
    }

    if (debouncedFilters.keyword) {
      result = result.filter(opportunity => {
        return opportunity.title
          ?.toLowerCase()
          ?.includes(debouncedFilters.keyword.toLowerCase())
      })
    }

    if (debouncedFilters.programArea) {
      result = result.filter(opportunity => {
        const programAreas =
          opportunity.apprenticeshipOpportunitiesProgramAreas?.nodes?.map(
            node => node.name
          )
        return programAreas?.includes(debouncedFilters.programArea)
      })
    }

    if (debouncedFilters.orderBy.order === 'DESC') {
      result = result.sort((a, b) => b.title?.localeCompare(a.title))
    } else {
      result = result.sort((a, b) => a.title?.localeCompare(b.title))
    }

    setFilteredOpps(result)
  }, [
    debouncedFilters.zipCode,
    debouncedFilters.orderBy.order,
    debouncedFilters.keyword,
    debouncedFilters.programArea,
    opportunities,
  ])

  useEffect(() => {
    filterOpps()
  }, [debouncedFilters, filterOpps, router.query])

  const filtersToGenerateDropdown = [
    {
      name: 'programArea',
      options: opportunityProgramAreas,
      type: 'select',
    },

    {
      name: 'keyword',
      type: 'input',
    },
    {
      name: 'zipCode',
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
            postType="oppurtunities"
            posts={filteredOpps}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

PageApprenticeshipOpportunities.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

PageApprenticeshipOpportunities.query = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
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
    menu(id: "students", idType: SLUG) {
      menuItems(first: 200) {
        nodes {
          ...NavigationMenuFragment
        }
      }
    }
    menus(where: { slug: "footer" }) {
      nodes {
        ...PreFooterFragment
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
    apprenticeshipOpportunities(
      first: 100
      where: { orderby: { field: TITLE, order: ASC } }
    ) {
      nodes {
        title
        uri
        apprenticeshipOpportunitiesProgramAreas {
          nodes {
            name
          }
        }
        opportunityDetails {
          name
          about
          offeredBy {
            address
            email
            employerName
            fieldGroupName
            phone
          }
        }
      }
    }
  }
`
