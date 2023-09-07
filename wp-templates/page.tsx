import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { getHeroType } from '../utils/heroBlockHelper'
import { flatListToHierarchical } from 'utils/flatListToHierarchical'

export default function Page(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.page
  const preFooterContent = props.data?.menus.nodes[0]
  const blocks = pageData && [...pageData.blocks]
  const utilityNavigation = props.data?.menu?.utilityNavigation?.navigationItems
  const hierarchicalMenuItems = flatListToHierarchical(menuItems as any) || []

  if (props.loading) {
    return <>Loading...</>
  }

  const heroType = getHeroType(blocks)
  return (
    <Layout
      menuItems={hierarchicalMenuItems}
      seo={pageData?.seo}
      headerVariant={heroType === 'default' ? 'default' : 'transparent'}
      utilityNavigation={utilityNavigation}
    >
      {blocks && (
        <WordPressBlocksViewer fallbackBlock={[] as any} blocks={blocks} />
      )}
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  )
}

Page.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

Page.query = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
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
