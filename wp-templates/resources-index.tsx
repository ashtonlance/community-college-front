import { gql } from '@apollo/client'
import { Header } from 'components/Header'
import { ResourcesTypeHero } from 'components/ResourcesHero/ResourcesTypeHero'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { ResourcesSidebar } from 'components/ResourcesSidebar/ResourcesSidebar'
import { PaginatedPosts } from 'components/PaginatedPosts/PaginatedPosts'
import { useRouter } from 'next/router'

type ResourceIndexProps = {
  data: {
    nodeByUri: {
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

export default function ResourcesIndex(props: ResourceIndexProps) {
  const router = useRouter()

  if (props.loading) {
    return <>Loading...</>
  } else {
    const menuItems = props.data?.menu?.menuItems || []
    const resourcesIndex = props.data?.nodeByUri
    const preFooterContent = props.data?.menus.nodes[0]
    const { page } = router.query
    const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')

    return (
      <Layout menuItems={menuItems} seo={resourcesIndex?.seo}>
        <div className="flex justify-end border-t-[1.5px] border-t-gmt-200 md:flex-col md:overflow-hidden">
          <div className="wrapper-default-inner-pages w-[70%] md:w-full">
            <ResourcesTypeHero
              title="All Resources"
              breadcrumbPosition="root"
            />
            <div className="top-[-1.5px] mx-[-100px] mb-[60px] hidden md:block">
              <ResourcesSidebar />
            </div>
            {/* <PaginatedPosts currentPage={currentPage} /> */}
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

ResourcesIndex.query = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
`
