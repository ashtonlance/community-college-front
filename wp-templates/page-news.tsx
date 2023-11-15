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

export default function NewsPage({ data, loading, error }) {
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

  const newsItems = useMemo(
    () => data?.newsItems?.nodes || [],
    [data?.newsItems?.nodes]
  )

  const [filters, setFilters] = useState({
    category: '',
    year: '',
    tag: '',
    orderBy: { field: 'DATE', order: 'DESC' },
  })

  const categories = useMemo(
    () =>
      [
        ...new Set(
          newsItems.flatMap(news =>
            news.newsCategories.nodes.map(category => category.name)
          )
        ),
      ].sort(),
    [newsItems]
  )

  const tags = useMemo(
    () =>
      Array.from(
        new Set(
          newsItems.flatMap(news => news.newsTags.nodes.map(tag => tag.name))
        )
      ).sort(),
    [newsItems]
  )

  const debouncedFilters = useDebounce(filters, 500)
  const [filteredNewsItems, setFilteredNewsItems] = useState(newsItems)

  const filterNumberedMemos = useCallback(() => {
    let result = [...newsItems]

    if (debouncedFilters.category) {
      result = result.filter(item => {
        return item?.newsCategories?.nodes[0]?.name
          ?.toLowerCase()
          ?.includes(debouncedFilters.category.toLowerCase())
      })
    }

    if (debouncedFilters.year) {
      result = result.filter(memo =>
        memo.numberedMemo.date.includes(debouncedFilters.year)
      )
    }

    if (debouncedFilters.tag) {
      result = result.filter(item => {
        return item?.newsTags?.nodes.some(tag => {
          return tag?.name
            ?.toLowerCase()
            ?.includes(debouncedFilters.tag.toLowerCase())
        })
      })
    }

    if (debouncedFilters.orderBy.order === 'DESC') {
      result = result.sort(
        (a, b) => new Date(b?.date).getTime() - new Date(a?.date).getTime()
      )
    } else {
      result = result.sort(
        (a, b) => new Date(a?.date).getTime() - new Date(b?.date).getTime()
      )
    }

    setFilteredNewsItems([...result])
  }, [
    debouncedFilters.category,
    debouncedFilters.tag,
    debouncedFilters.orderBy.order,
    debouncedFilters.year,
    newsItems,
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
      name: 'tag',
      options: tags,
      type: 'select',
    },
    {
      name: 'sort by',
      options: 'Sort by Date',
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
            postType="news"
            posts={filteredNewsItems}
          />
        </div>
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </div>
    </Layout>
  )
}

NewsPage.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

NewsPage.query = gql`
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
    newsItems(first: 500, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        slug
        date
        newsDetail {
          excerpt
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        newsCategories {
          nodes {
            name
          }
        }
        newsTags {
          nodes {
            name
          }
        }
        newsItemId
        uri
      }
    }
    menu(id: "students", idType: SLUG) {
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
