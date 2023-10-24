import { INSTANT_SEARCH_INDEX_NAME, searchClient } from '@/components/Search'
import { gql, useQuery } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'

import { PlainHit } from '@/components/Search/Hit'
import { Hits, InstantSearch, Pagination, SearchBox } from 'react-instantsearch'
import { DefaultHero } from '@/components/Hero/DefaultHero'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

const PAGE_SIZE = 3

const GET_SEARCH = gql`
  ${Header.fragments.entry}

  query SearchQuery {
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
  }
`

export default function Search() {
  const { loading, error, data } = useQuery(GET_SEARCH)
  const menuItems = data?.menu?.menuItems || []
  const preFooterContent = data?.menus?.nodes[0]
  const utilityNavigation = data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = data?.settings?.siteSettings || []
  const seo = {
    metaDesc: '',
    canonical: '',
    title: 'Search Results',
    schema: data?.resources?.pageInfo?.seo?.schema,
  }

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }

  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      seo={seo}
      headerVariant={'default'}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
    >
      <DefaultHero heading="Search Results" />
      <div className="flex justify-center border-t-[1.5px] border-t-gmt-200 md:flex-col md:overflow-hidden">
        <div className="wrapper-default-inner-pages w-[90%] md:w-full">
          <div>
            <InstantSearch
              searchClient={searchClient}
              indexName={INSTANT_SEARCH_INDEX_NAME}
              future={{
                preserveSharedStateOnUnmount: true,
              }}
            >
              <SearchBox placeholder="Search" autoFocus />

              <Hits hitComponent={PlainHit} />
              <Pagination />
            </InstantSearch>
          </div>
        </div>
      </div>
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  )
}
