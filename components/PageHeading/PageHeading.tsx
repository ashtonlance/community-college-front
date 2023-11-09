import {
  BackgroundColorType,
  MarginSizesType,
} from 'components/TestimonialSlider'
import { getHeadingTag } from '../../utils/headingType'
import { getTextAlign } from '../../utils/attributesToClassNames'
import Stroke from 'assets/icons/long-stroke.svg'

export type AlignmentType = 'left' | 'center'
export type HeadingType = 'h2' | 'h3' | 'h4' | 'h5'

type PageHeadingAttributes = {
  attributes: {
    data: {
      alignment: AlignmentType
      background_color: BackgroundColorType
      heading_content: string
      underline: boolean
      heading_heading_size: HeadingType
      margins_bottom: MarginSizesType
      margins_top: MarginSizesType
    }
  }
}

export const PageHeading = ({ attributes }: PageHeadingAttributes) => {
  const alignment = getTextAlign(attributes.data.alignment)
  const bgColor = attributes.data.background_color
  const headingContent = attributes.data.heading_content
  const headingSize = attributes.data.heading_heading_size
  const underline = attributes.data.underline
  const marginBottom = attributes.data.margins_bottom
  const marginTop = attributes.data.margins_top
  const title = getHeadingTag(headingSize, headingContent)

  return (
    <div
      className={`${alignment} module-spacing-top-${marginTop} module-spacing-bottom-${marginBottom} module-color-${bgColor} px-[60px] pb-[40px] pt-[100px] md:px-[24px]`}
    >
      <div className="md:mb-5 mb-6">
        {title}
      </div>

      {underline && (
        <Stroke className={`${alignment === 'text-center' ? 'mx-auto' : ''} h-[15px] max-w-full text-gold`} />
      )}
    </div>
  )
}

PageHeading.displayName = 'nextword/pageheading'
