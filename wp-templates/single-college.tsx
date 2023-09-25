import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function SingleCollege(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.college
  // const preFooterContent = props.data?.menus.nodes[0]
  const blocks = pageData && [...pageData.blocks]
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props?.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []

  if (props.loading) {
    return <>Loading...</>
  }
  return (
    <Layout
      pageClassName="college-single-page"
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
    >
      <h1 className="mt-28">{pageData.title}</h1>
      {blocks && (
        <WordPressBlocksViewer fallbackBlock={[] as any} blocks={blocks} />
      )}
      {/* {preFooterContent && <PreFooter preFooterContent={preFooterContent} />} */}
    </Layout>
  )
}

SingleCollege.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

SingleCollege.query = gql`
  ${Header.fragments.entry}
  query GetCollege($databaseId: ID!) {
    college(id: $databaseId, idType: DATABASE_ID) {
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
