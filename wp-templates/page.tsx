import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function Page(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.page
  const preFooterContent = props.data?.menus?.nodes[0]
  const blocks = pageData && [...pageData.blocks]
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const socialLinks = props.data?.footer?.prefooter || []
  const databaseId = pageData?.databaseId

  if (props.loading) {
    return <>Loading...</>
  }

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
      <>
        {blocks && (
          <WordPressBlocksViewer fallbackBlock={[] as any} blocks={blocks} />
        )}
        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </>
    </Layout>
  )
}

function getFirstPathPart(slug: string | undefined): string {
  if (!slug) {
    return 'students'
  }
  console.log({ slug })
  const parts = slug.split('/')

  if (parts.length > 0 && parts[1] === 'about-us') {
    return 'system-office'
  }

  if (parts.length > 0 && parts[1] === 'college-faculty-staff') {
    return 'college-faculty-and-staff'
  }

  return parts.length > 0 ? parts[1] : 'students'
}

Page.variables = (props, ctx) => {
  const { databaseId } = props
  let { uri } = props
  let slug = getFirstPathPart(uri)
  return {
    databaseId,
    slug,
    asPreview: ctx?.asPreview,
  }
}

Page.query = gql`
  ${Header.fragments.entry}
  query Page($databaseId: ID!, $asPreview: Boolean = false, $slug: ID!) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      databaseId
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
    menu(id: $slug, idType: SLUG) {
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
