import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { PreFooter } from 'components/PreFooter'
import { Layout } from 'components/Layout'
import { Header } from 'components/Header'
import { GravityForm } from 'components/GravityForm/GravityForm'
import Image from 'next/image'
import separator from '../assets/imgs/separator.svg'
import { ResourceCard } from 'components/PaginatedResources/ResourceCard'
import { Pagination } from 'components/Pagination'

const PAGE_SIZE = 3

const GET_SEARCH = gql`
  ${Header.fragments.entry}
  ${PreFooter.fragments.entry}
  ${GravityForm.fragments.entry}
  query SearchQuery($offset: Int!, $searchedTerm: String!, $size: Int = ${PAGE_SIZE}) {
    resources(where: { search: $searchedTerm, offsetPagination: { offset: $offset, size: $size }}) {
      pageInfo {
        seo {
          schema {
            raw
          }
        }
        offsetPagination {
          total
        }
      }
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
    gfForm(id: "3", idType: DATABASE_ID) {
      ...GravityFormFragment
    }
  }
`

export default function Search() {
  const router = useRouter()
  const { page } = router.query
  const currentPage = parseInt((Array.isArray(page) ? page[0] : page) || '1')
  const offset = (currentPage - 1) * PAGE_SIZE

  const searchedTerm = router.query['searchedTerm']
  const { loading, error, data } = useQuery(GET_SEARCH, {
    variables: { offset, searchedTerm },
  })

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }

  const menuItems = data?.menu?.menuItems || []
  const preFooterContent = data?.menus.nodes[0]
  const eventRegistrationForm = data?.gfForm
  const itemsTotal = data?.resources?.pageInfo?.offsetPagination?.total
  const seo = {
    metaDesc: '',
    canonical: '',
    title: 'Search Results',
    schema: data?.resources?.pageInfo?.seo?.schema,
  }
  const items = data?.resources?.nodes

  const handlePageClick = (page: number) => {
    router.push(`${router.asPath?.split('&')?.[0]}&page=${page}`, null, {
      shallow: true,
    })
  }

  return (
    <Layout menuItems={menuItems} form={eventRegistrationForm} seo={seo}>
      <div className="flex justify-center border-t-[1.5px] border-t-gmt-200 md:flex-col md:overflow-hidden">
        <div className="wrapper-default-inner-pages w-[90%] md:w-full">
          <div>
            <p>Search Results for</p>
            <h1 className="mb-[40px] sm:mb-[32px]">{searchedTerm}</h1>
            <Image
              alt=""
              src={separator}
              width={40}
              height={1.5}
              className="mb-[60px] sm:mb-[50px]"
            />
          </div>
          <>
            {items?.length > 0 ? (
              <div>
                {items?.map(item => (
                  <ResourceCard key={item.id} resource={item} />
                ))}
                <Pagination
                  currentPage={currentPage}
                  totalItems={itemsTotal}
                  pageSize={PAGE_SIZE}
                  onPageClick={handlePageClick}
                />{' '}
              </div>
            ) : (
              <h3> No results were found for your searched term.</h3>
            )}
          </>
        </div>
      </div>
      {preFooterContent && <PreFooter preFooterContent={preFooterContent} />}
    </Layout>
  )
}
