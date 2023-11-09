import { gql, useQuery } from '@apollo/client'
import { NewsletterInput } from 'components/NewsletterBanner'
import { Resource } from 'components/ResourcesSidebar/Resource'
import { ResourcesSidebarMobile } from './ResourceSidebarMobile'

const GET_RESOURCE = gql`
  query GetResources {
    tags {
      nodes {
        id
        name
        link
      }
    }
    categories {
      nodes {
        id
        name
        link
      }
    }
    popularPosts(first: 5) {
      nodes {
        id
        title
        date
      }
    }
    resources(first: 5) {
      nodes {
        id
        link
        title
      }
    }
  }
`

type ResourcesSidebarProps = {
  selectedTaxonomy?: string
}

export const ResourcesSidebar = (props: ResourcesSidebarProps) => {
  const { loading, error, data } = useQuery(GET_RESOURCE, {
    context: {
      fetchOptions: {
        method: 'GET',
      },
    },
  })
  const tags = data?.tags?.nodes
  const categories = data?.categories?.nodes
  const popularResources = data?.popularPosts?.nodes
  const latestResources = data?.resources?.nodes

  return (
    <>
      <div className="sidebar-module flex w-full flex-col border-l-[1.5px] border-l-gmt-200 bg-gmt-100 md:hidden">
        <Resource
          classList="body-large font-bold"
          title="Filter by Resource Type"
          linkList={categories}
          selectedTaxonomy={props.selectedTaxonomy}
          category={true}
        />
        <Resource
          classList="sub-nav"
          title="Resources by Topic"
          linkList={tags}
          selectedTaxonomy={props.selectedTaxonomy}
          tag={true}
        />
        <Resource
          classList="sub-nav"
          title="Popular Resources"
          linkList={popularResources ? popularResources : latestResources}
        />
        <div className="border-t-[1.5px] border-t-gmt-200 p-[40px]">
          <h5 className="mb-[40px]">Get our Newsletter</h5>
          <NewsletterInput customClasses="submit-button-as-arrow relative" />
        </div>
      </div>

      <ResourcesSidebarMobile tags={tags} categories={categories} />
    </>
  )
}
