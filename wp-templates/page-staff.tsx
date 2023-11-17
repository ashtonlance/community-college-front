import { PaginatedPosts } from '@/components/PaginatedPosts'
import { PostFilter } from '@/components/PostFilter'
import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { useDebounce } from '@uidotdev/usehooks'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function StaffIndexPage({ data, loading, error }) {
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

  const staffIndex = useMemo(
    () => data?.allStaff?.nodes || [],
    [data?.allStaff?.nodes]
  )

  const [filters, setFilters] = useState({
    department: '',
    location: '',
    orderBy: { field: 'STAFF_NAME', order: 'DESC' },
  })

  const organizations = useMemo(
    () =>
      [
        ...new Set(
          staffIndex?.flatMap(staff =>
            staff.staffDetails.organizations.flatMap(org => org.name)
          )
        ),
      ].sort(),
    [staffIndex]
  )
  const departments = useMemo(
    () =>
      [...new Set(staffIndex.map(staff => staff.staffDetails.location))].sort(),
    [staffIndex]
  )

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredStaff, setFilteredStaff] = useState(staffIndex)

  const filterNumberedMemos = useCallback(() => {
    let result = [...staffIndex]

    if (debouncedFilters?.department) {
      result = result.filter(memo => {
        return memo.staffDetails.organizations.find(
          organization =>
            organization?.name?.toLowerCase() ===
            debouncedFilters.department.toLowerCase()
        )
      })
    }

    if (debouncedFilters?.location) {
      result = result.filter(memo => {
        return (
          memo?.staffDetails?.location?.toLowerCase() ===
          debouncedFilters.location.toLowerCase()
        )
      })
    }

    if (debouncedFilters?.orderBy?.order === 'ASC') {
      result = result.sort((a, b) => {
        const aName = a.staffDetails?.staffName?.split(',')[0]
        const bName = b.staffDetails?.staffName?.split(',')[0]
        return bName
          ?.slice(bName.lastIndexOf(' ') + 1)
          .localeCompare(aName?.slice(aName.lastIndexOf(' ') + 1))
      })
    } else {
      result = result.sort((a, b) => {
        const aName = a.staffDetails?.staffName?.split(',')[0]
        const bName = b.staffDetails?.staffName?.split(',')[0]
        return aName
          ?.slice(aName.lastIndexOf(' ') + 1)
          .localeCompare(bName?.slice(bName.lastIndexOf(' ') + 1))
      })
    }
    setFilteredStaff([...result])
  }, [debouncedFilters, staffIndex])

  useEffect(() => {
    filterNumberedMemos()
  }, [debouncedFilters, filterNumberedMemos])

  if (loading) {
    return <>Loading...</>
  }

  const filtersToGenerateDropdown = [
    {
      name: 'department',
      options: organizations,
      type: 'select',
    },
    {
      name: 'location',
      options: departments,
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
            postType="staff"
            posts={filteredStaff}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

StaffIndexPage.variables = ({ uri }) => {
  return { uri }
}

StaffIndexPage.query = gql`
  query staffIndex($uri: ID!) {
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

    allStaff(
      first: 500
      where: { orderby: { field: STAFF_NAME, order: DESC } }
    ) {
      nodes {
        id
        staffDetails {
          email
          fieldGroupName
          jobTitle
          location
          staffName
          phone
          location
          organizations {
            name
            link
          }
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
