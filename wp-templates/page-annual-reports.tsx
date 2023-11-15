import { PaginatedPosts } from '@/components/PaginatedPosts'
import { PostFilter } from '@/components/PostFilter'
import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { useDebounce } from '@uidotdev/usehooks'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatDate } from 'utils/dates'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function AnnualReportsPage({ data, loading, error }) {
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

  const annualReports = useMemo(
    () => data?.annualReportingPlans?.nodes || [],
    [data?.annualReportingPlans?.nodes]
  )

  const [filters, setFilters] = useState({
    category: '',
    year: '',
    keyword: '',
    orderBy: { field: 'DATE', order: 'DESC' },
  })

  const years = useMemo(
    () => [
      ...new Set(
        annualReports.map(report => report.annualReport?.dueDate?.split('/')[2])
      ),
    ],
    [annualReports]
  )

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredAnnualReports, setFilteredAnnualReports] =
    useState(annualReports)

  const filterAnnualReports = useCallback(() => {
    let result = [...annualReports]

    if (debouncedFilters.category) {
      result = result.filter(memo =>
        memo.numberedMemoCategories.nodes.name
          .toLowerCase()
          .includes(debouncedFilters.category.toLowerCase())
      )
    }

    if (debouncedFilters.year) {
      result = result.filter(annualReport =>
        annualReport.annualReport.dueDate.includes(debouncedFilters.year)
      )
    }

    if (debouncedFilters.keyword) {
      result = result.filter(annualReport =>
        annualReport.annualReport.title
          .toLowerCase()
          .includes(debouncedFilters.keyword.toLowerCase())
      )
    }

    if (debouncedFilters.orderBy.order === 'DESC') {
      result = result.sort(
        (a, b) =>
          new Date(b.annualReport.dueDate).getTime() -
          new Date(formatDate(a.annualReport.dueDate)).getTime()
      )
    } else {
      result = result.sort(
        (a, b) =>
          new Date(a.annualReport.dueDate).getTime() -
          new Date(formatDate(b.annualReport.dueDate)).getTime()
      )
    }

    setFilteredAnnualReports([...result])
  }, [
    debouncedFilters.category,
    debouncedFilters.keyword,
    debouncedFilters.orderBy.order,
    debouncedFilters.year,
    annualReports,
  ])

  useEffect(() => {
    filterAnnualReports()
  }, [debouncedFilters, annualReports, filterAnnualReports])

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
            postType="annualReports"
            posts={filteredAnnualReports}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

AnnualReportsPage.variables = ({ uri, id }) => {
  return { uri, id }
}

AnnualReportsPage.query = gql`
  query AnnualReports($id: ID!) {
    page(id: $id, idType: ID) {
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

    annualReportingPlans(
      first: 200
      where: { orderby: { field: DUE_DATE, order: DESC } }
    ) {
      nodes {
        annualReport {
          additionalInformation
          dueDate
          title
          updatedDate
        }
        annualReportingPlanId
        uri
        date
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
