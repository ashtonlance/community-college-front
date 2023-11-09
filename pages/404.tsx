import { gql, useQuery } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

const NOT_FOUND = gql`
  ${Header.fragments.entry}
  query NotFound($slug: ID!) {
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

function getFirstPathPart(slug: string | undefined): string {
  if (!slug) {
    return 'students'
  }
  const parts = slug.split('/')

  if (parts.length > 0 && parts[1] === 'about-us') {
    return 'system-office'
  }

  if (parts.length > 0 && parts[1] === 'college-faculty-staff') {
    return 'college-faculty-and-staff'
  }

  return parts.length > 0 ? parts[1] : 'students'
}

export default function Custom404() {
  const router = useRouter()
  const slug = getFirstPathPart(router.asPath)

  const { loading, error, data } = useQuery(NOT_FOUND, {
    variables: { slug },
    context: {
      fetchOptions: {
        method: 'GET',
      },
    },
  })

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
  const socialLinks = data?.footer?.prefooter || []

  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
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
