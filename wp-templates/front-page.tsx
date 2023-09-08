import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { Page, RootQuery } from 'generated/graphql'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

type FrontPageProps = {
  data: Pick<RootQuery, 'nodeByUri' | 'menu' | 'menus'>
}

export default function FrontPage(props: FrontPageProps) {
  const menuItems = props.data?.menu?.menuItems || []
  const homePageData = props.data?.nodeByUri as Page
  const preFooterContent = props.data?.menus.nodes[0]
  const blocks = homePageData && [...homePageData?.blocks]
  const utilityNavigation = props.data?.menu?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []

  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      seo={homePageData?.seo}
      utilityNavigation={utilityNavigation}
    >
      {blocks && <WordPressBlocksViewer blocks={blocks} />}
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  )
}

FrontPage.query = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
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
    menu(id: "primary", idType: SLUG) {
      menuItems(first: 200) {
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
