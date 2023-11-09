import { DefaultHero } from '@/components/Hero/DefaultHero'
import { INSTANT_SEARCH_INDEX_NAME, searchClient } from '@/components/Search'
import { PlainHit } from '@/components/Search/Hit'
import { gql, useQuery } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { useRouter } from 'next/router'
import { Hits, InstantSearch, Pagination, SearchBox } from 'react-instantsearch'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

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

export default function Search() {
  const { loading, error, data } = useQuery(GET_SEARCH, {
    context: {
      fetchOptions: {
        method: 'GET',
      },
    },
  })
  const menuItems = data?.menu?.menuItems || []
  const utilityNavigation = data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = data?.settings?.siteSettings || []
  const socialMedia = data?.footer?.prefooter || []
  const seo = {
    metaDesc: '',
    canonical: '',
    title: 'Search Results',
    schema: data?.resources?.pageInfo?.seo?.schema,
  }

  const router = useRouter()
  const searchQuery = router?.query?.query

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
      socialLinks={socialMedia}
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
              insights
              initialUiState={{
                wp_searchable_posts: {
                  query: searchQuery as any,
                },
              }}
            >
              <SearchBox placeholder="Search" autoFocus />

              <Hits hitComponent={PlainHit} />
              <Pagination />
            </InstantSearch>
          </div>
        </div>
      </div>
    </Layout>
  )
}
