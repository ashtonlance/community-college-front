import { gql } from '@apollo/client'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { Page, RootQuery } from 'generated/graphql'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

type FrontPageProps = {
  data: Pick<RootQuery, 'nodeByUri' | 'menu' | 'menus' | any>
}

export default function FrontPage(props: FrontPageProps) {
  const menuItems = props.data?.menu?.menuItems || []
  const homePageData = props.data?.nodeByUri as Page
  const preFooterContent = props.data?.menus?.nodes[0]
  const blocks = homePageData && [...homePageData?.blocks]
  const utilityNavigation =
    props.data?.settings?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []
  const footerMenuItems = props.data?.footer?.menuItems || []
  const hierarchicalFooterMenuItems =
    flatListToHierarchical(footerMenuItems as any) || []
  const settings = props.data?.settings?.siteSettings || []
  const socialLinks = props.data?.footer?.prefooter || []
  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      seo={homePageData?.seo}
      utilityNavigation={utilityNavigation}
      footerNavigation={hierarchicalFooterMenuItems}
      settings={settings}
      socialLinks={socialLinks}
    >
      {blocks && <WordPressBlocksViewer blocks={blocks} />}
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  )
}

FrontPage.query = gql`
  ${Header.fragments.entry}
  query HomePage {
    nodeByUri(uri: "/") {
      ... on Page {
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
