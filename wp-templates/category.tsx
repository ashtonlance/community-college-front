import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { PreFooter } from 'components/PreFooter'
import { ResourcesTypeHero } from 'components/ResourcesHero/ResourcesTypeHero'
import { ResourcesSidebar } from 'components/ResourcesSidebar/ResourcesSidebar'
import { useRouter } from 'next/router'

type CategoryProps = {
  data: {
    nodeByUri: {
      name: string
      seo: {}
    }
    menus: {
      nodes: {}
    }
    menu: {
      menuItems: {}
    }
    footer: {
      prefooter: {}
    }
  }
  loading: boolean
}

export default function Category(props: CategoryProps) {
  const router = useRouter()

  if (props.loading) {
    return <>Loading...</>
  } else {
    const menuItems = props.data?.menu?.menuItems || []
    const seo = props.data?.nodeByUri?.seo
    const preFooterContent = props.data?.menus.nodes[0]
    const { page } = router.query
    const categoryName = props.data?.nodeByUri?.name
    const socialLinks = props.data?.footer?.prefooter || []

    return (
      <Layout menuItems={menuItems} seo={seo} socialLinks={socialLinks}>
        <div className="category-page flex justify-end border-t-[1.5px] border-t-gmt-200 md:flex-col md:overflow-hidden">
          <div className="wrapper-default-inner-pages w-[70%] md:w-full">
            <ResourcesTypeHero
              title={`All ${categoryName}`}
              breadcrumbPosition="subtype"
              category={categoryName}
            />
            <div className="top-[-1.5px] mx-[-100px] mb-[60px] hidden md:block">
              <ResourcesSidebar selectedTaxonomy={categoryName} />
            </div>

            {/* <PaginatedPosts
              categoryName={categoryName}
              currentPage={currentPage}
            /> */}
          </div>
          <div className="relative right-0 top-[-1.5px] w-[30%] max-w-[600px] md:hidden">
            <ResourcesSidebar selectedTaxonomy={categoryName} />
          </div>
        </div>

        {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
      </Layout>
    )
  }
}

Category.variables = ({ uri }, ctx) => {
  return {
    uri,
    asPreview: ctx?.asPreview,
  }
}

Category.query = gql`
  ${Header.fragments.entry}
  query GetCategoryPage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Category {
        id
        name
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
  }
`
