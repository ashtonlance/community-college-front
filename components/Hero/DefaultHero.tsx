import { HeroPropsType } from './HomeHero'
import Link from 'next/link'
import { GuideLine } from '../AnimatedLines/GuideLine'
import Image from 'next/image'
export const DefaultHero = ({
  bgColor,
  bgImg,
  subheading,
  description,
  heading,
  ctaLabel,
  ctaURL,
  bgPosition,
}: HeroPropsType) => {
  return (
    <div
      className={`relative flex h-fit md:h-fit md:flex-col sm:items-center sm:justify-center bg-${bgColor}`}
    >
      <div className="wrapper-default-inner-pages flex w-[60%] flex-col items-baseline justify-center md:w-full md:pb-0">
        {subheading && (
          <div className="mb-[32px] flex items-center gap-[15px]">
            <GuideLine />
            <h2 className="text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}
        <h1 className="mb-[32px] text-white">{heading}</h1>

        {description && bgImg && (
          <p className="body-large mb-[60px] text-white md:mb-[20px]">
            {description}
          </p>
        )}

        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
            className="primary-btn flex w-fit bg-white text-black"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
      {bgImg ? (
        <div className="wrapper-default-inner-pages relative flex min-h-[400px] w-[40%] flex-col items-baseline justify-center bg-cover pl-0 md:w-full md:pl-[60px] md:pt-0 sm:pl-[40px]">
          <Image
            src={bgImg}
            alt=""
            fill
            className={`object-cover object-${bgPosition} z-0`}
            priority
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
