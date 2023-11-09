import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import { BackgroundColorType } from 'components/TestimonialSlider'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from 'utils/dates'

type EventCardType = {
  date?: string
  location?: string
  title?: string
  description?: string
  btnLink?: string
  btnText?: string
  image?: string
  boothTime?: string
  boothNumber?: string
  color?: BackgroundColorType
  tag?: string
}

export const Card = ({
  date,
  title,
  btnLink,
  btnText,
  image,
}: EventCardType) => {
  return (
    <div className={`flex w-full overflow-hidden rounded-xl bg-grey`}>
      {image ? (
        <Image
          src={image}
          alt={title}
          height={191}
          width={210}
          className="object-cover object-center"
        />
      ) : null}
      <div className="flex flex-col items-start justify-center gap-[10px] p-[40px] sm:p-[32px]">
        <div className="flex items-center justify-center gap-[10px] text-darkGrey">
          <p className="body-regular font-bold text-darkGrey">
            {formatDate(date)}
          </p>
        </div>
        <h4 className="mb-[24px] sm:mb-0">{title}</h4>

        <Link
          aria-label={'Read article about ' + title}
          className="group flex items-center gap-x-2 font-condensed text-lg font-bold tracking-[-0.18px] text-darkGrey hover:text-navy"
          href={btnLink || ''}
        >
          {btnText}
          <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
        </Link>
      </div>
    </div>
  )
}
