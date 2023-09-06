import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { WordPressBlocksViewer } from '@faustwp/blocks'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { EventCards } from 'components/EventCards'
import { getHeroType } from '../utils/heroBlockHelper'

export default function PageEvents(props) {
  const menuItems = props.data?.menu?.menuItems || []
  const pageData = props.data?.page
  const preFooterContent = props.data?.menus.nodes[0]
  const blocks = pageData && [...pageData.blocks]
  const events = props.data?.events

  if (props.loading) {
    return <>Loading...</>
  }

  const heroType = getHeroType(blocks)
  return (
    <Layout
      menuItems={menuItems}
      seo={pageData?.seo}
      headerVariant={heroType === 'default' ? 'default' : 'transparent'}
    >
      {blocks && (
        <WordPressBlocksViewer fallbackBlock={[] as any} blocks={blocks} />
      )}
      {events && <EventCards events={events} />}
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  )
}

PageEvents.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

PageEvents.query = gql`
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
    }
    menus(where: { slug: "footer" }) {
      nodes {
        ...PreFooterFragment
      }
    }
    events {
      nodes {
        blocks
      }
    }
  }
`
