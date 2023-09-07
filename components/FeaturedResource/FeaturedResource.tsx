import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'
import border from '../../assets/imgs/white-border.svg'
import {
  getLabelFromCategory,
  getCategoryForResource,
} from 'utils/getButtonLabels'
import { formatDate } from 'utils/dates'

// Instead of letting the editor choose the article manually, we are getting the one flagged as featured
const GET_FEATURED_RESOURCE = gql`
  query GetResource {
    resources(where: { categoryName: "featured" }, first: 1) {
      nodes {
        date
        link
        excerpt
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`

const GET_FEATURED_RESOURCE_BY_CATEGORY = gql`
  query GetResource($category: String) {
    resources(where: { categoryName: $category }, first: 1) {
      nodes {
        date
        link
        excerpt
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`

export const FeaturedResource = () => {
  const { loading, error, data } = useQuery(GET_FEATURED_RESOURCE)

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }
  if (data) {
    return <FeaturedResourceInternal dataInfo={data} />
  }
}

export const FeaturedResourceByCategory = ({ categoryName }) => {
  let category = 'featured+' + categoryName
  const { loading, error, data } = useQuery(GET_FEATURED_RESOURCE_BY_CATEGORY, {
    variables: { category },
  })

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }
  if (data) {
    return <FeaturedResourceInternal dataInfo={data} />
  }
}

const FeaturedResourceInternal = ({ dataInfo }) => {
  const imgUrl =
    dataInfo?.resources?.nodes[0]?.featuredImage?.node?.sourceUrl || ''
  const excerpt = dataInfo?.resources?.nodes[0]?.excerpt || ''
  const category = getCategoryForResource(dataInfo?.resources?.nodes[0]?.name)
  const date = formatDate(dataInfo?.resources?.nodes[0]?.date)
  const title = dataInfo?.resources?.nodes[0]?.title
  const resourceURL = dataInfo?.resources?.nodes[0]?.link || ''
  const readMoreLabel = getLabelFromCategory(category)

  return (
    <div
      className="relative mx-auto min-h-[600px] p-[60px] sm:p-[32px]"
      style={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 22.92%, rgba(0, 0, 0, 0.7) 75.52%), linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url(${imgUrl})`,
      }}
    >
      <p className="tag absolute right-[40px] top-[40px] bg-white text-black">
        Featured
      </p>
      <div className="absolute bottom-[60px] left-[60px] max-w-[65%] md:max-w-[80%] sm:bottom-[32px] sm:left-[32px] sm:max-w-[80%]">
        <div className="mb-[12px] flex items-center gap-[15px]">
          <Image alt="" src={border} width={40} height={1.5} />
          <p className="body-large font-bold text-white">{category}</p>
          <span className="text-white"> • </span>
          <p className="body-large font-bold text-white">{date}</p>
        </div>
        <h3 className="mb-[24px] text-white">{title}</h3>

        <p
          className="featured-resource-content mb-[32px]"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <div className="secondary-btn w-fit border-[1.5px] border-white">
          <Link className="text-white" href={resourceURL}>
            {readMoreLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}

FeaturedResource.displayName = 'nextword/resourcefeaturedcard'
