import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { formatDate } from '../../utils/dates'
import { getLabelFromCategory } from 'utils/getButtonLabels'
import Image from 'next/image'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'

const GET_POST = gql`
  query GetPost($resourceId: ID!) {
    contentNode(id: $resourceId, idType: DATABASE_ID) {
      id
      date
      link
      contentTypeName
      ... on ApprenticeshipOpportunity {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on DataDashboard {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on BoardMeeting {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on Event {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on BoardMember {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on Staff {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on NumberedMemo {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on AnnualReportingPlan {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on Program {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on ProgramArea {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on College {
        id
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      ... on NewsItem {
        id
        title
        newsCategories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
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
  const postUrl = props.sourceUrl
  const readMoreLabel = props.readMoreLabel
  const backgroundColor = props.backgroundColor

  return (
    <div
      className={`flex w-full ${backgroundColor} overflow-hidden rounded-xl`}
    >
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={title}
          height={191}
          width={210}
          className="object-cover object-center"
        />
      ) : null}
      <div className="flex flex-col items-start justify-center gap-[10px] p-[40px] sm:p-[32px]">
        <div className="flex items-center justify-center gap-[10px] text-darkGrey">
          <p className="body-regular font-bold capitalize text-darkGrey">
            {category}
          </p>
          •<p className="body-regular font-bold text-darkGrey">{date}</p>
        </div>
        <h4 className="mb-[24px] sm:mb-0">{title}</h4>

        <Link
          className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
          href={postUrl}
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
  if (loading) {
    return
  }
  if (error) {
    console.log(error)
  }

  const imgUrl = data?.contentNode?.featuredImage?.node?.sourceUrl || ''
  const category = data?.contentNode?.contentTypeName
  const date = formatDate(data?.contentNode?.date)

  const title = data?.contentNode?.title
  const postUrl = data?.contentNode?.link || ''
  const readMoreLabel = getLabelFromCategory(category)

  return (
    <ResourcePresentational
      imgUrl={imgUrl}
      category={category}
      date={date}
      title={title}
      sourceUrl={postUrl}
      readMoreLabel={readMoreLabel}
      backgroundColor={backgroundColor}
    />
  )
}
