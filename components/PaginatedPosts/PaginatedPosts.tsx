import { gql, useQuery } from '@apollo/client'
import { ResourceCard } from './PostCard'
import { Pagination } from 'components/Pagination'
import { useRouter } from 'next/router'
import { GeneralCard } from '../Cards'
const PAGE_SIZE = 3

const GET_PAGINATED_RESOURCES = gql`
  query GetPaginatedPosts($offset: Int!, $size: Int = ${PAGE_SIZE}) {
    colleges(where: {offsetPagination: {offset: $offset, size: $size}, orderby: {field: DATE, order: ASC}}) {
      nodes {
        title
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          fullHead
        }
        collegeDetails {
          name
          phoneNumber
          map {
            city
            latitude
            longitude
            postCode
            stateShort
            streetName
            streetNumber
            streetAddress
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

type PaginatedPostsProps = {
  currentPage: number
  categoryName?: string
  tagName?: string
}

export const PaginatedPosts = (props: PaginatedPostsProps) => {
  const router = useRouter()

  const offset = (props.currentPage - 1) * PAGE_SIZE
  const category = props.categoryName
  const tag = props.tagName

  const { loading, error, data } = useQuery(GET_PAGINATED_RESOURCES, {
    variables: { offset, category, tag },
  })

  const itemsTotal = data?.colleges?.pageInfo?.offsetPagination.total
  const items = data?.colleges?.nodes

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
      {/* {items?.map(item => <ResourceCard key={item.id} resource={item} />)} */}
      {items.map((item, index) => {
        // console.log(
        //   parseDMS(
        //     `${college.collegeDetails.coordinates.lat} ${college.collegeDetails.coordinates.lng}`
        //   )

        return <GeneralCard key={index} card={item} />
      })}
      {items?.length > 0 && (
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
