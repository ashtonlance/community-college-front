import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { formatDate } from '../../utils/dates'
import { getLabelFromCategory } from 'utils/getButtonLabels'

const GET_RESOURCE = gql`
  query GetResource($resourceId: ID!) {
    resource(id: $resourceId, idType: DATABASE_ID) {
      id
      date
      link
      title
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          slug
          sourceUrl
        }
      }
    }
  }
`

type ResourcePresentationalType = {
  imgUrl: string
  category: string
  date: string
  title: string
  sourceUrl: string
  readMoreLabel: string
}

export const ResourcePresentational = (props: ResourcePresentationalType) => {
  const imgUrl = props.imgUrl
  const category = props.category
  const date = props.date
  const title = props.title
  const resourceURL = props.sourceUrl
  const readMoreLabel = props.readMoreLabel

  return (
    <div className="flex flex-col bg-gmt-100 w-full">
      <div
        className="h-[200px] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
      <div className="flex flex-col gap-[10px] items-start justify-center p-[40px] sm:p-[32px]">
        <div className="flex justify-center items-center gap-[10px] text-gmt-400">
          <p className="body-regular font-bold text-gmt-400">{category}</p>•
          <p className="body-regular font-bold text-gmt-400">{date}</p>
        </div>
        <h4 className="text-black mb-[20px] sm:mb-0">{title}</h4>
        <Link
          href={resourceURL}
          className="secondary-btn border-[1.5px] border-solid border-gmt-500 text-gmt-500"
        >
          {readMoreLabel}
        </Link>
      </div>
    </div>
  )
}

export const Resource = ({ resourceId }) => {
  const { loading, error, data } = useQuery(GET_RESOURCE, {
    variables: { resourceId },
  })

  const imgUrl = data?.resource?.featuredImage?.node?.sourceUrl || ''
  const category = data?.resource?.categories?.nodes?.[0]?.name || 'Resource'
  const date = formatDate(data?.resource?.date)

  const title = data?.resource?.title
  const resourceURL = data?.resource?.link || ''
  const readMoreLabel = getLabelFromCategory(category)

  return (
    <ResourcePresentational
      imgUrl={imgUrl}
      category={category}
      date={date}
      title={title}
      sourceUrl={resourceURL}
      readMoreLabel={readMoreLabel}
    />
  )
}
