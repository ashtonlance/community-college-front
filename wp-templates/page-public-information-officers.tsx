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

export default function PagePublicInformationOfficers(props) {
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
  const databaseId = pageData?.databaseId

  const [filters, setFilters] = useState({
    college: '',
    keyword: '',
    orderBy: { field: 'TITLE', order: 'DESC' },
  })

  const officers = useMemo(
    () => props?.data?.page?.publicInformationOfficers?.officers || [],
    [props?.data?.page?.publicInformationOfficers?.officers]
  )

  const colleges = useMemo(() => {
    const colleges = officers.map(officer => officer.college).filter(Boolean)
    return [...new Set(colleges)]
  }, [officers])

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredOfficers, setFilteredOfficers] = useState(officers)

  const filterOfficers = useCallback(() => {
    let result = [...officers]

    if (debouncedFilters.college) {
      result = result.filter(
        officer => officer?.college === debouncedFilters.college
      )
    }

    if (debouncedFilters.keyword) {
      result = result.filter(officer => {
        return officer.name
          ?.toLowerCase()
          ?.includes(debouncedFilters.keyword.toLowerCase())
      })
    }

    if (debouncedFilters.orderBy.order === 'ASC') {
      result = result.sort((a, b) => b.name?.localeCompare(a.name))
    } else {
      result = result.sort((a, b) => a.name?.localeCompare(b.name))
    }

    setFilteredOfficers([...result])
  }, [
    debouncedFilters.college,
    debouncedFilters.orderBy.order,
    debouncedFilters.keyword,
    officers,
  ])

  useEffect(() => {
    filterOfficers()
  }, [debouncedFilters, filterOfficers, router.query])

  const filtersToGenerateDropdown = [
    {
      name: 'college',
      options: colleges,
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
            postType="officers"
            posts={filteredOfficers}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

function getFirstPathPart(slug: string | undefined): string {
  if (!slug) {
    return 'students'
  }

  const parts = slug.split('/')

  if (parts.length > 0 && parts[1] === 'about-us') {
    return 'system-office'
  }

  return parts.length > 0 ? parts[1] : 'students'
}

PagePublicInformationOfficers.variables = (props, ctx) => {
  const { databaseId } = props
  let { uri } = props
  let slug = getFirstPathPart(uri)
  return {
    databaseId,
    slug,
    asPreview: ctx?.asPreview,
  }
}

PagePublicInformationOfficers.query = gql`
  ${Header.fragments.entry}
  query PagePublicInformationOfficers(
    $databaseId: ID!
    $asPreview: Boolean = false
    $slug: ID!
  ) {
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
      publicInformationOfficers {
        officers {
          college
          title
          email
          name
        }
      }
    }
    menu(id: $slug, idType: SLUG) {
      menuItems(first: 200) {
        nodes {
          ...NavigationMenuFragment
        }
      }
    }
    footer: menu(id: "Footer", idType: NAME) {
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
  }
`
