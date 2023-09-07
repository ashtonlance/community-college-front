import { gql, useQuery } from '@apollo/client'
import { ResourceCard } from './ResourceCard'
import { Pagination } from 'components/Pagination'
import { useRouter } from 'next/router'
const PAGE_SIZE = 3

const GET_PAGINATED_RESOURCES = gql`
  query GetPaginatedResources($offset: Int!, $category: String, $tag: String, $size: Int = ${PAGE_SIZE}) {
    resources(where: {categoryName: $category, tag: $tag , offsetPagination: { offset: $offset, size: $size } }) {
      nodes {
        categories {
          nodes {
            id
            name
          }
        }
        id
        date
        excerpt
        link
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`

type PaginatedResourcesProps = {
  currentPage: number
  categoryName?: string
  tagName?: string
}

export const PaginatedResources = (props: PaginatedResourcesProps) => {
  const router = useRouter()

  const offset = (props.currentPage - 1) * PAGE_SIZE
  const category = props.categoryName
  const tag = props.tagName

  const { loading, error, data } = useQuery(GET_PAGINATED_RESOURCES, {
    variables: { offset, category, tag },
  })

  const itemsTotal = data?.resources?.pageInfo?.offsetPagination.total
  const items = data?.resources?.nodes

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }

  const handlePageClick = (page: number) => {
    router.push(`${router.asPath?.split('?')?.[0]}?page=${page}`, null, {
      shallow: true,
    })
  }

  return (
    <>
      {items?.map(item => <ResourceCard key={item.id} resource={item} />)}
      {items.length > 0 && (
        <Pagination
          currentPage={props.currentPage}
          totalItems={itemsTotal}
          pageSize={PAGE_SIZE}
          onPageClick={handlePageClick}
        />
      )}
    </>
  )
}
