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
        className="relative h-[300px] bg-cover bg-no-repeat md:h-[250px]"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="tag absolute right-[20px] top-[20px] bg-white text-black">
          {tag}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[10px] p-[40px] sm:p-[32px]">
        <div className="mb-[24px] flex items-center justify-center gap-[15px] text-gmt-500 sm:flex-col">
          <p className="body-large font-bold text-gmt-500">{location}</p>
          <Image alt="Event banner" src={separator} width={40} height={1.5} />
          <p className="body-large font-bold text-gmt-500">{date}</p>
        </div>
        <h3 className="mb-[20px] text-black sm:mb-0">{title}</h3>
        <div
          className="body-large mb-[24px] text-center text-gmt-500"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <span className="flex gap-2">
          {boothNumber && (
            <p className="body-regular mb-[24px] font-bold text-gmt-500">
              {' '}
              {boothNumber}
            </p>
          )}
          {boothTime && boothNumber && (
            <span className="text-gmt-500"> • </span>
          )}
          {boothTime && (
            <p className="body-regular mb-[24px] font-bold text-gmt-500">
              {' '}
              {boothTime}
            </p>
          )}
        </span>
        <Link
          href={btnLink || ''}
          className="primary-btn grey"
        >
          {btnText}
        </Link>
      </div>
    </div>
  )
}
