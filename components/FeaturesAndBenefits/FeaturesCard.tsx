import Arrow from 'assets/icons/arrow-forward-sharp.svg'

import {
  getTextAlign,
  getWidth,
  getFeaturesCardStyle,
} from '../../utils/attributesToClassNames'
import Link from 'next/link'
import Image from 'next/image'

export const FeaturesCard = ({
  size,
  heading,
  content,
  alignment,
  cardStyle,
  optionalLink = null,
  bgColor,
  image,
}) => {
  const cardFinalStyle =
    cardStyle == 'black' ? getFeaturesCardStyle(cardStyle) : bgColor
  return (
    <div
      className={`${getWidth(size)} ${getTextAlign(
        alignment
      )}  ${cardFinalStyle} rounded-xl p-[40px] md:w-full sm:p-[32px]`}
    >
      {image?.url && (
        <div className="mb-[20px]">
          <Image src={image?.url} width={400} height={200} alt={heading} />
        </div>
      )}
      <h4 className={`${getFeaturesCardStyle(cardStyle)} mb-[20px]`}>
        {heading}
      </h4>
      <div
        className={`body-regular text-darkGrey ${getFeaturesCardStyle(
          cardStyle
        )}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {optionalLink && (
        <div className="mt-[30px]">
          {cardStyle === 'black' && (
            <Link
              className="secondary-btn border-[1.5px] border-solid border-white"
              href={optionalLink}
            >
              Contact Sales
            </Link>
          )}

          {optionalLink && (
            <Link
              className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
              href={optionalLink.url}
            >
              {optionalLink.title}
              <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
