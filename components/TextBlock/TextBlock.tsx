import Link from 'next/link'
import { getHeadingTag } from '../../utils/headingType'
import Stroke from 'assets/icons/long-stroke.svg'

export const TextBlock = ({ attributes }) => {
  const ctaLabel = attributes.data?.button_button_text
  const ctaURL = attributes.data?.button_button_link
  const headingContent = attributes.data?.heading
  const headingSize = attributes.data?.heading_size
  const heading = getHeadingTag(headingSize, headingContent)
  const description = attributes.data?.body_copy
  const tags = attributes.data?.above_header_content_tags
  const aboveHeading = attributes.data?.above_header_content_headline
  const colorModule = attributes.data?.background_color
  const bottomSpacing = attributes.data?.component_spacing_bottom_spacing
  const topSpacing = attributes.data?.component_spacing_top_spacing

  return (
    <div
      className={`h-fit w-full module-color-${colorModule} module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}
    >
      <div
        className={`mx-auto flex max-w-[1030px] flex-col items-center justify-center py-[80px] md:px-[100px] sm:p-[40px]`}
      >
        <div className="flex flex-wrap justify-center gap-[10px]">
          {aboveHeading ? (
            <h5 className="mb-0">{aboveHeading}</h5>
          ) : (
            tags > 0 &&
            [...Array(tags).keys()].map(val => (
              <div
                key={val}
                className="flex items-center justify-center gap-[10px]"
              >
                <small className="text-[16px] font-bold leading-[150%] text-black sm:text-[14px]">
                  {attributes.data[`above_header_content_tags_${val}_tag`]}
                </small>
                {val + 1 < tags && <span>•</span>}
              </div>
            ))
          )}
        </div>
        <span className="mt-[32px] text-center text-black sm:mt-[24px]">
          {heading}
        </span>
        <Stroke className="my-6 h-[15px] max-w-full text-gold" />
        {description && (
          <div
            className="body-large max-w-[800px] text-center text-darkGrey"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
            className="primary-btn mt-[40px] flex w-fit bg-black text-white sm:mt-[24px]"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  )
}

TextBlock.displayName = 'nextword/text'
