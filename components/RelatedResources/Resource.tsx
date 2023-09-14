import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { formatDate } from '../../utils/dates'
import { getLabelFromCategory } from 'utils/getButtonLabels'
import Image from 'next/image'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'

const GET_POST = gql`
  query GetPost($resourceId: ID!) {
    post(id: $resourceId, idType: DATABASE_ID) {
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
  backgroundColor?: string
}

export const ResourcePresentational = (props: ResourcePresentationalType) => {
  const imgUrl = props.imgUrl
  const category = props.category
  const date = props.date
  const title = props.title
  const resourceURL = props.sourceUrl
  const readMoreLabel = props.readMoreLabel
  const backgroundColor = props.backgroundColor

  return (
    <div
      className={`flex w-full ${backgroundColor} overflow-hidden rounded-xl`}
    >
      <Image src={imgUrl} alt={title} height={191} width={210} />
      <div className="flex flex-col items-start justify-center gap-[10px] p-[40px] sm:p-[32px]">
        <div className="flex items-center justify-center gap-[10px] text-darkGrey">
          <p className="body-regular font-bold text-darkGrey">{category}</p>•
          <p className="body-regular font-bold text-darkGrey">{date}</p>
        </div>
        <h4 className="mb-[24px] sm:mb-0">{title}</h4>

        <Link
          className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
          href={resourceURL}
        >
          {readMoreLabel}
          <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
        </Link>
      </div>
    </div>
  )
}

export const Resource = ({ resourceId, backgroundColor = 'bg-white' }) => {
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { resourceId },
  })

  const imgUrl = data?.post?.featuredImage?.node?.sourceUrl || ''
  const category = data?.post?.categories?.nodes?.[0]?.name || 'Resource'
  const date = formatDate(data?.post?.date)

  const title = data?.post?.title
  const resourceURL = data?.post?.link || ''
  const readMoreLabel = getLabelFromCategory(category)
  console.log(data, 'data')

  return (
    <ResourcePresentational
      imgUrl={imgUrl}
      category={category}
      date={date}
      title={title}
      sourceUrl={resourceURL}
      readMoreLabel={readMoreLabel}
      backgroundColor={backgroundColor}
    />
  )
}
