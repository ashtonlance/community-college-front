import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useRouter } from 'next/router'
import bg from '../../assets/imgs/angled-bg-defaultHero.png'
import Location from 'assets/icons/location.svg'
import generateBreadcrumbs from '../../utils/breadcrumbs'
import { formatDate } from 'utils/dates'

type EventHeroProps = {
  heading: string
  bgImg: string
  ctaLabel: string
  ctaURL: string
  subheading?: string
  description?: string
  bgPosition?: string
  phone?: string
  email?: string
  location?: string
  date?: string
  endDate?: string
  time?: string
}

export const EventHero: React.FC<EventHeroProps> = ({
  bgImg,
  subheading,
  description,
  heading,
  ctaLabel,
  ctaURL,
  bgPosition,
  phone,
  email,
  location,
  date,
  endDate,
  time,
}) => {
  const router = useRouter()
  const breadcrumbs = generateBreadcrumbs(router)
  return (
    <div
      className={`relative flex h-fit md:h-fit md:flex-col sm:items-center sm:justify-center`}
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="wrapper-default-inner-pages flex w-[60%] flex-col
      items-baseline justify-center bg-cover pb-[80px] md:w-full md:pb-0"
      >
        {subheading && (
          <div className="mb-[32px] flex items-center gap-[15px]">
            <h2 className="text-[16px] leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}

        <Breadcrumbs items={breadcrumbs} />
        <h1 className="default-hero-headline sm:text-[42px] text-[48px]">{heading}</h1>

        {description && bgImg && (
          <p className="body-large mb-[40px] text-darkGrey sm:mb-[32px]">
            {description}
          </p>
        )}
        {date || time ? (
          <div className="mb-6 flex w-fit flex-col gap-y-5">
            {date && (
              <div className="group flex items-center gap-x-1 text-darkGrey">
                <span className="font-bold text-darkGrey">Date{endDate ? 's' : ''}:</span>
                {formatDate(date)}{endDate ? ` - ${formatDate(endDate)}` : ''}
              </div>
            )}
            {time && (
              <div className="group flex gap-x-1 text-darkGrey">
                <span className="font-bold text-darkGrey">Time:</span>
                <span className="whitespace-pre">{time}</span>
              </div>
            )}
          </div>
        ) : null}

        {location && (
          <div className="mb-10 flex w-fit items-center gap-x-2">
            <Location className="mr-2 h-[18px] w-[18px] text-gold" />
            <span className="body-regular font-bold text-darkGrey">
              {location}
            </span>
          </div>
        )}

        {ctaURL && ctaLabel && (
          <Link href={ctaURL} className={`secondary-btn navy`}>
            {ctaLabel}
          </Link>
        )}
      </div>
      {bgImg ? (
        <div
          className="wrapper-default-inner-pages relative flex min-h-[400px]
         w-[40%] flex-col items-baseline justify-center rounded-bl-xl bg-cover pl-0 md:w-full
         md:pl-[60px] md:pt-0 sm:pl-[40px]"
        >
          <Image
            src={bgImg}
            alt=""
            fill
            className={`object-cover rounded-bl-xl object-${bgPosition} z-0`}
            priority
          />
        </div>
      ) : (
        description && (
          <div className="wrapper-default-inner-pages flex w-[40%] flex-col items-baseline justify-center pl-0 md:w-full md:pl-[60px] md:pt-0 sm:pl-[40px]">
            <p className="body-large text-darkGrey md:mb-[20px]">
              {description}
            </p>
          </div>
        )
      )}
    </div>
  )
}
