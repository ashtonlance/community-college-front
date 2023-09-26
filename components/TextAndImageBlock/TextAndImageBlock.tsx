import Image from 'next/image'
import { getHeadingTag } from '../../utils/headingType'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'

const GET_MEDIA_FILE = gql`
  query GetMediaURLFromID($mediaID: ID!) {
    mediaItem(id: $mediaID, idType: DATABASE_ID) {
      id
      sourceUrl
      link
    }
  }
`

export const TextAndImageBlock = ({ attributes }) => {
  const title = attributes.data.title
  const headingContent = attributes.data.heading
  const headingSize = attributes.data.heading_size
  const heading = getHeadingTag(headingSize, headingContent)
  const text = attributes.data.body_copy
  const imgPosition = attributes.data.image_position
  const bottomSpacing = attributes.data.component_spacing_bottom_spacing
  const topSpacing = attributes.data.component_spacing_top_spacing
  const mediaID = attributes.data.media
  const linkTitle = attributes?.data?.link?.title
  const linkUrl = attributes?.data?.link?.url
  const bgColor = attributes?.data?.background_color

  const { loading, error, data } = useQuery(GET_MEDIA_FILE, {
    variables: { mediaID },
  })

  if (loading) {
    return
  }
  if (error) {
    console.log({ error })
  }

  return (
    <div
      className={`px-[100px] md:px-[60px] bg-${bgColor} sm:px-[40px] module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1220px] gap-[80px] ${
          imgPosition.includes('right') && 'flex-row-reverse'
        } md:h-fit md:flex-col md:gap-[60px]`}
      >
        {data?.mediaItem?.link ? (
          <video className='w-[50%] md:w-full' controls>
            <source src={data?.mediaItem?.link} ></source>
          </video>
        ) : (
          data?.mediaItem?.sourceUrl && (
            <Image
              unoptimized={true}
              className="w-[50%] self-center rounded-[12px] md:w-full"
              src={data?.mediaItem?.sourceUrl}
              alt=""
              width={620}
              height={441}
            />
          )
        )}

        <div className="flex w-[50%] flex-col justify-center md:mx-auto md:w-[90%] sm:w-full">
          <p className="body-large mb-[32px] font-bold text-navy">{title}</p>
          <span className="mb-[32px]">{heading}</span>
          <div
            className="body-regular whitespace-pre-wrap text-darkGrey"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <Link target='_blank' className='secondary-btn outline-btn navy mt-[40px]' href={linkUrl}>{linkTitle}</Link>
        </div>
      </div>
    </div>
  )
}

TextAndImageBlock.displayName = 'nextword/textandimage'
