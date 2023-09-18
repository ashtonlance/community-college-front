import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { ResourcesTypeHero } from 'components/ResourcesHero/ResourcesTypeHero'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { ResourcesSidebar } from 'components/ResourcesSidebar/ResourcesSidebar'
import { PaginatedResources } from 'components/PaginatedResources/PaginatedResources'
import { FeaturedResource } from 'components/FeaturedResource'
import { useRouter } from 'next/router'

type CollegesIndexProps = {
  data: {
    nodeByUri: {
      seo: {}
    }
    menus: {
      nodes: {}
    }
    menu: {
      menuItems: {}
      utilityNavigation: {
        navigationItems: {}
      }
    }
  }
  loading: boolean
}

export default function CollegesArchive(props: CollegesIndexProps) {
  const router = useRouter()

  if (props.loading) {
    return <>Loading...</>
  } else {
    const menuItems = props.data?.menu?.menuItems || []
    const collegesIndex = props.data?.nodeByUri
    const preFooterContent = props.data?.menus.nodes[0]
    const { page } = router.query
    const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')
    const utilityNavigation =
      props.data?.menu?.utilityNavigation?.navigationItems
    return (
      <Layout
        menuItems={menuItems}
        seo={collegesIndex?.seo}
        utilityNavigation={utilityNavigation}
      >
        <div className="flex justify-end border-t-[1.5px] border-t-gmt-200 md:flex-col md:overflow-hidden">
          <div className="wrapper-default-inner-pages w-[70%] md:w-full">
            <ResourcesTypeHero
              title="All Resources"
              breadcrumbPosition="root"
            />
            <div className="top-[-1.5px] mx-[-100px] mb-[60px] hidden md:block">
              <ResourcesSidebar />
            </div>
            {currentPage === 1 && <FeaturedResource />}
            <PaginatedResources currentPage={currentPage} />
          </div>
          <div className="relative right-0 top-[-1.5px] w-[30%] max-w-[600px] md:hidden">
            <ResourcesSidebar />
          </div>
        </div>

        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </Layout>
    )
  }
}

CollegesArchive.variables = ({ uri }) => {
  return { uri }
}

CollegesArchive.query = gql`
  ${Header.fragments.entry}
  query CollegesArchive($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on ContentType {
        label
        description
        contentNodes {
          nodes {
            databaseId
            uri
            ... on NodeWithTitle {
              title
            }
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
        }
      }
    }
  }
`
