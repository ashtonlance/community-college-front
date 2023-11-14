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
  const socialLinks = data?.footer?.prefooter || []

  const numberedMemos = useMemo(
    () => data?.numberedMemos?.nodes || [],
    [data?.numberedMemos?.nodes]
  )

  const [filters, setFilters] = useState({
    category: '',
    year: '',
    keyword: '',
    orderBy: { field: 'DATE', order: 'DESC' },
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
    let result = [...numberedMemos]
    if (debouncedFilters.category) {
      result = result.filter(memo =>
        memo.numberedMemoCategories.nodes.find(
          category =>
            category.name.toLowerCase() ===
            debouncedFilters.category.toLowerCase()
        )
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
          .includes(debouncedFilters.keyword.toLowerCase()) ||
        memo.numberedMemo.memoFrom
          .toLowerCase()
          .includes(debouncedFilters.keyword.toLowerCase())
      )
    }

    if (debouncedFilters.orderBy.order === 'DESC') {
      result = result.sort((a, b) => {
        const a_date = a.numberedMemo?.date
          ?.split('/')
          .reverse()
          .toString()
          .replaceAll(',', '-')
        const b_date = b.numberedMemo?.date
          ?.split('/')
          .reverse()
          .toString()
          .replaceAll(',', '-')
        return new Date(b_date).getTime() - new Date(a_date).getTime()
      })
    } else {
      result = result.sort((a, b) => {
        const a_date = a.numberedMemo?.date
          ?.split('/')
          .reverse()
          .toString()
          .replaceAll(',', '-')
        const b_date = b.numberedMemo?.date
          ?.split('/')
          .reverse()
          .toString()
          .replaceAll(',', '-')
        return new Date(a_date).getTime() - new Date(b_date).getTime()
      })
    }
    setFilteredMemos([...result])
  }, [numberedMemos, debouncedFilters])

  useEffect(() => {
    filterNumberedMemos()
  }, [debouncedFilters, filterNumberedMemos])

  if (loading) {
    return <>Loading...</>
  }

  const filtersToGenerateDropdown = [
    // {
    //   name: 'category',
    //   options: categories,
    //   type: 'select',
    // },
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
      first: 1200
      where: { orderby: { field: DATE, order: DESC } }
    ) {
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
