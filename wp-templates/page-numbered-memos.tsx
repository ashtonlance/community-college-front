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

export default function NumberedMemosPage({ data, loading, error }) {
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

  const numberedMemos = useMemo(
    () => data?.numberedMemos?.nodes || [],
    [data?.numberedMemos?.nodes]
  )

  const [filters, setFilters] = useState({
    category: '',
    year: '',
    keyword: '',
    orderBy: { field: 'DATE', order: 'ASC' },
  })

  const categories = useMemo(
    () => [
      ...new Set(
        numberedMemos.flatMap(memo =>
          memo.numberedMemoCategories.nodes.map(category => category.name)
        )
      ),
    ],
    [numberedMemos]
  )

  const years = useMemo(
    () => [
      ...new Set(
        numberedMemos.map(memo => memo.numberedMemo?.date?.split('/')[2])
      ),
    ],
    [numberedMemos]
  )

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredMemos, setFilteredMemos] = useState(numberedMemos)

  const filterNumberedMemos = useCallback(() => {
    let result = numberedMemos
    if (debouncedFilters.category) {
      result = result.filter(memo =>
        memo.numberedMemoCategories.nodes.find(category => category.name.toLowerCase() === debouncedFilters.category.toLowerCase())
              )
    }

    if (debouncedFilters.year) {
      result = result.filter(memo =>
        memo.numberedMemo.date.includes(debouncedFilters.year)
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
      result = result.sort(
        (a, b) => b.numberedMemo?.date?.localeCompare(a.numberedMemo?.date)
      )
    } else {
      result = result.sort(
        (a, b) => a.numberedMemo?.date?.localeCompare(b.numberedMem?.date)
      )
    }

    setFilteredMemos(result)
  }, [
    debouncedFilters.category,
    debouncedFilters.keyword,
    debouncedFilters.orderBy.order,
    debouncedFilters.year,
    numberedMemos,
  ])

  useEffect(() => {
    filterNumberedMemos()
  }, [debouncedFilters, filterNumberedMemos])

  if (loading) {
    return <>Loading...</>
  }

  const filtersToGenerateDropdown = [
    {
      name: 'category',
      options: categories,
      type: 'select',
    },
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
            postType="numberedMemo"
            posts={filteredMemos}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

NumberedMemosPage.variables = ({ uri }) => {
  return { uri }
}

NumberedMemosPage.query = gql`
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

    numberedMemos(
      first: 1000
      where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        numberedMemo {
          body
          date
          memoFrom
          number
          subject
          memoTo
        }
        numberedMemoCategories {
          nodes {
            name
          }
        }
        numberedMemoId
        uri
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
