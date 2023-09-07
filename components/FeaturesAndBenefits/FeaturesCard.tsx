import Image from 'next/image'
import arrow from '../../assets/icons/arrow-full-right.svg'

import {
  getTextAlign,
  getWidth,
  getFeaturesCardStyle,
} from '../../utils/attributesToClassNames'
import Link from 'next/link'

export const FeaturesCard = ({
  size,
  heading,
  content,
  alignment,
  cardStyle,
  optionalLink = null,
  bgColor,
}) => {
  const cardFinalStyle =
    cardStyle == 'black' ? getFeaturesCardStyle(cardStyle) : bgColor

  return (
    <div
      className={`${getWidth(size)} ${getTextAlign(
        alignment
      )}  ${cardFinalStyle} p-[40px] md:w-full sm:p-[32px]`}
    >
      <h4 className={`${getFeaturesCardStyle(cardStyle)} mb-[20px]`}>
        {heading}
      </h4>
      <div
        className={`body-regular text-gmt-500 ${getFeaturesCardStyle(
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
            <Link href={optionalLink}>
              <Image alt="" src={arrow} width={24} height={11} />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
