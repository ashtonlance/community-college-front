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

export default function PagePropSchools(props) {
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

  const [filters, setFilters] = useState({
    zipCode: '',
    keyword: '',
    orderBy: { field: 'TITLE', order: 'ASC' },
  })

  const schools = useMemo(
    () => props?.data?.proprietarySchools?.nodes || [],
    [props?.data?.proprietarySchools?.nodes]
  )

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredSchools, setFilteredSchools] = useState(schools)

  const filterSchools = useCallback(() => {
    let result = [...schools]
    if (
      debouncedFilters.zipCode &&
      (debouncedFilters.zipCode.length === 5 ||
        debouncedFilters.zipCode.length === 0)
    ) {
      result = result.filter(school => {
        return (
          school?.schoolDetails?.location?.postCode === debouncedFilters.zipCode
        )
      })
    }

    if (debouncedFilters.keyword) {
      result = result.filter(school => {
        return school.title
          ?.toLowerCase()
          ?.includes(debouncedFilters.keyword.toLowerCase())
      })
    }

    if (debouncedFilters.orderBy.order === 'DESC') {
      result = result.sort((a, b) => b.title?.localeCompare(a.title))
    } else {
      result = result.sort((a, b) => a.title?.localeCompare(b.title))
    }

    setFilteredSchools([...result])
  }, [
    debouncedFilters.zipCode,
    debouncedFilters.orderBy.order,
    debouncedFilters.keyword,
    schools,
  ])

  useEffect(() => {
    filterSchools()
  }, [debouncedFilters, filterSchools])

  const filtersToGenerateDropdown = [
    {
      name: 'zipCode',
      type: 'input',
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
            postType="schools"
            posts={filteredSchools}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

PagePropSchools.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

PagePropSchools.query = gql`
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
    proprietarySchools(
      first: 200
      where: { orderby: { field: TITLE, order: ASC } }
    ) {
      nodes {
        title
        schoolDetails {
          details
          phone
          website {
            title
            url
            target
          }
          location {
            streetAddress
            postCode
          }
        }
      }
    }
  }
`
