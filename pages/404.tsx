import Link from 'next/link'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { Header } from 'components/Header'
import { gql, useQuery } from '@apollo/client'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

const NOT_FOUND = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
  query NotFound {
    menu(id: "primary", idType: SLUG) {
      menuItems {
        nodes {
          ...NavigationMenuFragment
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
    menus(where: { slug: "footer" }) {
      nodes {
        ...PreFooterFragment
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
  const utilityNavigation = data?.menu?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      utilityNavigation={utilityNavigation}
    >
      <div className="flex h-screen flex-col items-center justify-center gap-[20px]">
        <h1>404</h1>
        <h2>This page could not be found.</h2>
        <Link
          className="primary-btn border-[1.5px] border-solid border-black"
          href="/"
        >
          Return to the homepage
        </Link>
      </div>
    </Layout>
  )
}
