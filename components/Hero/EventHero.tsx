import Link from 'next/link'
import border from '../../assets/imgs/white-border.svg'
import Image from 'next/image'

export const EventHero = ({ attributes }) => {
  const bgColor = attributes.data.background_color
  const bgImg = attributes.data.background_image
  const ctaLabel = attributes.data.cta_button_label
  const ctaURL = attributes.data.cta_button_link
  const heading = attributes.data.heading
  const subheading = attributes.data['sub-heading']
  const description = attributes.data.description
  const location = attributes.data.location || ''
  const dateRange = attributes.data.date
  const booth = attributes.data.booth_no || ''

  return (
    <div
      className={`relative flex h-auto md:h-fit md:flex-col sm:items-center sm:justify-center `}
    >
      <div
        className={`wrapper-default-inner-pages flex w-[50%] flex-col items-baseline justify-center md:w-full bg-${bgColor}`}
      >
        {subheading && (
          <div className="mb-[32px] flex gap-[15px]">
            <Image alt="" src={border} width={40} height={1.5} />
            <h2 className="text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}
        <h1 className="mb-[32px] text-white">{heading}</h1>
        <div className="body-large text-white">
          <span>{dateRange}</span> • <span> {location}</span>
          <div> {booth} </div>
        </div>
        {description && bgImg && (
          <p className="body-large mb-[60px] text-white md:mb-[20px]">
            {description}
          </p>
        )}

        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
            className="primary-btn hover:bg-stone text-emerald flex w-fit bg-white"
            suppressHydrationWarning
          >
            {ctaLabel}
          </Link>
        )}
      </div>
      {bgImg ? (
        <div className="relative flex w-[50%] flex-col items-baseline justify-center md:w-full">
          <Image
            src={bgImg}
            alt=""
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        description && (
          <div className="wrapper-default-inner-pages flex w-[40%] flex-col items-baseline justify-center pl-0 md:w-full md:pl-[60px] md:pt-0 sm:pl-[40px]">
            <p className="body-large text-white md:mb-[20px]">{description}</p>
          </div>
        )
      )}
    </div>
  )
}

EventHero.displayName = 'nextword/heroevent'
