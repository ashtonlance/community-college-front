import Link from 'next/link'
import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'
import { BackgroundColorType } from 'components/TestimonialSlider'

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
  location,
  title,
  description,
  btnLink,
  btnText,
  image,
  boothTime,
  boothNumber,
  color,
  tag,
}: EventCardType) => {
  return (
    <div className={`flex flex-col module-color-${color}`}>
      <div
        className="h-[300px] md:h-[250px] bg-cover bg-no-repeat relative"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute top-[20px] right-[20px] bg-white text-black tag">
          {tag}
        </div>
      </div>
      <div className="flex flex-col gap-[10px] items-center justify-center p-[40px] sm:p-[32px]">
        <div className="flex justify-center items-center gap-[15px] text-gmt-500 mb-[24px] sm:flex-col">
          <p className="body-large font-bold text-gmt-500">{location}</p>
          <Image alt="Event banner" src={separator} width={40} height={1.5} />
          <p className="body-large font-bold text-gmt-500">{date}</p>
        </div>
        <h3 className="text-black mb-[20px] sm:mb-0">{title}</h3>
        <div
          className="body-large text-center text-gmt-500 mb-[24px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <span className="flex gap-2">
          {boothNumber && (
            <p className="body-regular font-bold text-gmt-500 mb-[24px]">
              {' '}
              {boothNumber}
            </p>
          )}
          {boothTime && boothNumber && (
            <span className="text-gmt-500"> • </span>
          )}
          {boothTime && (
            <p className="body-regular font-bold text-gmt-500 mb-[24px]">
              {' '}
              {boothTime}
            </p>
          )}
        </span>
        <Link
          href={btnLink || ''}
          className="primary-btn bg-gmt-500 text-white"
        >
          {btnText}
        </Link>
      </div>
    </div>
  )
}
