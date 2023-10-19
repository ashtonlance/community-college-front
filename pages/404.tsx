import Link from 'next/link'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { Header } from 'components/Header'
import { gql, useQuery } from '@apollo/client'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

const NOT_FOUND = gql`
  ${Header.fragments.entry}
  query NotFound {
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

export default function Custom404() {
  const { loading, error, data } = useQuery(NOT_FOUND)

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }

  const menuItems = data?.menu?.menuItems || []
  const utilityNavigation = data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = data?.settings?.siteSettings || []
  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
    >
      <div className="flex h-screen flex-col items-center justify-center gap-[20px]">
        <h1>404</h1>
        <h2>This page could not be found.</h2>
        <Link className="primary-btn grey outline" href="/">
          Return to the homepage
        </Link>
      </div>
    </Layout>
  )
}
