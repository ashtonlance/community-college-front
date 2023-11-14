import Image from 'next/image'
import Link from 'next/link'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import { getYouTubeId } from 'utils/embed'
import { getHeadingTag } from '../../utils/headingType'
import { FadeIn } from '../FadeIn'

export const TextAndImageBlock = ({ attributes }) => {
  const title = attributes.data.title
  const headingContent = attributes.data.heading
  const headingSize = attributes.data.heading_size
  const heading = getHeadingTag(headingSize, headingContent)
  const text = attributes.data.body_copy
  const imgPosition = attributes.data.image_position
  const bottomSpacing = attributes.data.component_spacing_bottom_spacing
  const topSpacing = attributes.data.component_spacing_top_spacing
  const linkTitle = attributes?.data?.link?.title
  const linkUrl = attributes?.data?.link?.url
  const bgColor = attributes?.data?.background_color
  const image = attributes?.data?.image || ''
  const video = attributes?.data?.video || ''
  const videoOrImage = attributes?.data?.video_or_image || 'image'
  const id = getYouTubeId(video)

  return (
    <FadeIn>
      <div
        className={`px-[100px] md:px-[60px] bg-${bgColor} sm:px-[40px] module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1220px] gap-[80px] ${
            imgPosition.includes('right') && 'flex-row-reverse'
          } md:h-fit md:flex-col md:gap-[60px]`}
        >
          {videoOrImage === 'image' ? (
            <div className="relative h-[440px] w-[50%] self-center rounded-[12px] md:h-[400px] md:w-full sm:h-[300px]">
              <Image
                src={image.url}
                alt=""
                className="rounded-[12px] object-cover"
                fill
              />
            </div>
          ) : (
            <div className="h-full w-[50%] self-center rounded-[12px] md:w-full">
              <LiteYouTubeEmbed
                id={id}
                title={'video'}
                noCookie={true}
                playlist={false}
              />
            </div>
          )}

          <div className="wysiwyg flex w-[50%] flex-col justify-center md:mx-auto md:w-[90%] sm:w-full">
            {title ? (
              <p className="body-large mb-[32px] font-bold text-navy">
                {title}
              </p>
            ) : null}
            {headingContent ? (
              <span className="mb-[32px]">{heading}</span>
            ) : null}
            <div
              className="body-regular text-darkGrey"
              dangerouslySetInnerHTML={{ __html: text }}
            />
            {linkUrl && linkTitle ? (
              <Link
                target="_blank"
                className="secondary-btn outline-btn navy mt-[40px]"
                href={linkUrl ?? ''}
              >
                {linkTitle}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

TextAndImageBlock.displayName = 'nextword/textandimage'
