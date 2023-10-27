import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'
import { PostFilter } from '@/components/PostFilter'
import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useRouter } from 'next/router'
import { PaginatedPosts } from '@/components/PaginatedPosts'

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

  const staffIndex = useMemo(
    () => data?.allStaff?.nodes || [],
    [data?.allStaff?.nodes]
  )

  // Set filters and add to URL
  const handleSetFilters = useCallback(
    newFilters => {
      setFilters(newFilters)

      // const { page, wordpressNode, ...rest } = router.query
      // const newQuery = {
      //   ...rest,
      //   ...newFilters,
      // }

      // const queryString = new URLSearchParams(newQuery)
      // if (queryString) {
      //   console.log("newquery string added")
      //   window.history.replaceState(null, '', `?${queryString.toString()}`)
      // }
    },
    [router.query]
  )

  const [filters, setFilters] = useState({
    organization: '',
    department: '',
    orderBy: { field: 'STAFF_NAME', order: 'ASC' },
  })

  const inputValuesRef = useRef(filters)

  useEffect(() => {
    inputValuesRef.current = filters
  }, [filters])

  // useEffect(() => {
  //   const { organization, department, orderBy } = router.query
  //   const newValues = {
  //     organization: organization,
  //     department: department,
  //     orderBy: orderBy
  //   }
  //   setFilters(newValues)
  // }, [router.query])

  const organizations = useMemo(
    () => [
      ...new Set(
        staffIndex?.flatMap(staff =>
          staff.staffDetails.organizations.flatMap(org => org.name)
        )
      ),
    ],
    [staffIndex]
  )
  const departments = useMemo(
    () => [...new Set(staffIndex.map(staff => staff.staffDetails.location))],
    [staffIndex]
  )

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredStaff, setFilteredStaff] = useState(staffIndex)

  const filterNumberedMemos = useCallback(() => {
    let result = staffIndex

    if (debouncedFilters.organization) {
      result = result.filter(memo => {
        return memo.staffDetails.organizations.find(organization => organization.name.toLowerCase() === debouncedFilters.organization.toLowerCase())

      })
    }

    if (debouncedFilters.department) {
      result = result.filter(memo => {
        return memo.staffDetails.location.toLowerCase() === debouncedFilters.department.toLowerCase()
      })
    }

    if (debouncedFilters.orderBy.order === 'DESC') {
      result = result.sort(
        (a, b) =>
          b.staffDetails?.staffName?.slice(
            b.staffDetails.staffName.lastIndexOf(' ') + 1
        ).localeCompare(a.staffDetails?.staffName?.slice(
          a.staffDetails.staffName.lastIndexOf(' ') + 1
      ))
      )
    } else {
      result = result.sort(
        (a, b) =>
          a.staffDetails?.staffName?.slice(
            a.staffDetails.staffName.lastIndexOf(' ') + 1
        ).localeCompare(b.staffDetails?.staffName?.slice(
            b.staffDetails.staffName.lastIndexOf(' ') + 1
        ))
      )
    }
    setFilteredStaff(result)
  }, [
    debouncedFilters.organization,
    debouncedFilters.department, 
    debouncedFilters.orderBy, 
    staffIndex,
  ])

  useEffect(() => {
    filterNumberedMemos()
  }, [debouncedFilters, filterNumberedMemos])


  if (loading) {
    return <>Loading...</>
  }

  const filtersToGenerateDropdown = [
    {
      name: 'organization',
      options: organizations,
      type: 'select',
    },
    {
      name: 'department',
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
    >
      <div className="h-full bg-grey">
        {blocks && (
          <WordPressBlocksViewer fallbackBlock={[] as any} blocks={blocks} />
        )}
        <PostFilter
          filters={filters}
          setFilters={handleSetFilters}
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
      first: 200
      where: { orderby: { field: STAFF_NAME, order: ASC } }
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