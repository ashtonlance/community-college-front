import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { ResourcesTypeHero } from 'components/ResourcesHero/ResourcesTypeHero'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { ResourcesSidebar } from 'components/ResourcesSidebar/ResourcesSidebar'
import { PaginatedResources } from 'components/PaginatedResources/PaginatedResources'
import { FeaturedResourceByCategory } from 'components/FeaturedResource'
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
    const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')
    const categoryName = props.data?.nodeByUri?.name

    return (
      <Layout menuItems={menuItems} seo={seo}>
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
            {currentPage === 1 && (
              <FeaturedResourceByCategory categoryName={categoryName} />
            )}
            <PaginatedResources
              categoryName={categoryName}
              currentPage={currentPage}
            />
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
  ${PreFooter.fragments.entry}
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
    menu(id: "primary", idType: SLUG) {
      menuItems(first: 200) {
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
  }
`
