import { Resource, ResourcePresentational } from './Resource'
import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'
import { gql, useQuery } from '@apollo/client'
import { formatDate } from '../../utils/dates'
import { getLabelFromCategory } from 'utils/getButtonLabels'
import { MarginSizesType } from 'components/TestimonialSlider'
import { cn } from 'utils'

type RelatedResourcesProps = {
  attributes?: {
    data: {
      related_resources: number
      component_spacing_bottom_spacing: MarginSizesType
      component_spacing_top_spacing: MarginSizesType
      heading: string
      background_color: string
    }
  }
}

type RelatedResourcesByTaxonomyProps = {
  tags: string[]
  categories: string[]
  backgroundColor: string
}

const GET_RESOURCES_BY_TAXONOMY = gql`
  query GetRelatedResources($resourceIDs: [ID]) {
    resources(first: 2, where: { categoryIn: $resourceIDs }) {
      nodes {
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
            sourceUrl
            slug
          }
        }
      }
    }
  }
`

export const RelatedResourcesByTaxonomy = (
  props: RelatedResourcesByTaxonomyProps
) => {
  const resourceIDs = props.categories
  const { loading, error, data } = useQuery(GET_RESOURCES_BY_TAXONOMY, {
    variables: { resourceIDs },
  })

  if (loading) {
    return
  }
  if (error) {
    console.log(error)
  }
  const items = data?.resources?.nodes
  return (
    <div className="wrapper-default-inner-pages mx-auto flex max-w-[2000px] flex-col justify-between bg-white">
      <div className="mb-[40px] flex flex-col items-center justify-center sm:mb-[32px]">
        <h5>Related resources</h5>
        <Image
          alt=""
          src={separator}
          width={40}
          height={1.5}
          className="mt-[24px]"
        />
      </div>
      <div className="flex w-full justify-between gap-[20px] sm:flex-col">
        {items?.map(item => (
          <ResourcePresentational
            key={item.id}
            imgUrl={item.featuredImage?.node?.sourceUrl}
            category={item.categories?.nodes?.[0]?.name}
            date={formatDate(item?.date)}
            title={item.title}
            sourceUrl={item.link}
            readMoreLabel={getLabelFromCategory(
              item.categories?.nodes?.[0]?.name
            )}
          />
        ))}
      </div>
    </div>
  )
}

export const RelatedResources = (props: RelatedResourcesProps) => {
  const items = props?.attributes?.data?.related_resources
  const bottomSpacing =
    props?.attributes?.data?.component_spacing_bottom_spacing
  const topSpacing = props?.attributes?.data?.component_spacing_top_spacing
  const heading = props?.attributes?.data?.heading
  const background = props?.attributes?.data?.background_color
  const postIds = [...Array(items).keys()].map(
    num =>
      props?.attributes?.data[`related_resources_${num}_resource_item`]?.['ID']
  )
  const cardColor = background === 'grey' ? 'bg-white' : 'bg-grey'

  return (
    <div className={`bg-${background}`}>
      <div
        className={`mx-auto flex w-[90%] max-w-[1220px] flex-col items-center module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing} `}
      >
        <div className="my-[40px] flex flex-col items-center sm:my-[32px]">
          <h5>{heading}</h5>
        </div>

        <div
          className={cn(
            `grid gap-[20px] ${items == 1 && 'grid-cols-1'} ${
              items == 2 && 'grid-cols-2'
            } ${
              items > 2 && 'grid-cols-3'
            } w-full grid-flow-row md:grid-cols-2 sm:grid-cols-1`
          )}
        >
          {postIds.map((id, i) => (
            <Resource
              key={`${id}-${i}`}
              resourceId={id}
              backgroundColor={cardColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

RelatedResources.displayName = 'nextword/relatedresourcesblock'
