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
      className={`relative h-fit flex md:flex-col md:h-fit sm:justify-center sm:items-center bg-${bgColor}`}
    >
      <div className="w-[60%] md:w-full wrapper-default-inner-pages md:pb-0 flex flex-col justify-center items-baseline">
        {subheading && (
          <div className="flex gap-[15px] mb-[32px] items-center">
            <GuideLine />
            <h2 className="text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}
        <h1 className="text-white mb-[32px]">{heading}</h1>

        {description && bgImg && (
          <p className="body-large text-white mb-[60px] md:mb-[20px]">
            {description}
          </p>
        )}

        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
            className="primary-btn bg-white flex text-black w-fit"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
      {bgImg ? (
        <div className="relative w-[40%] md:w-full wrapper-default-inner-pages pl-0 md:pl-[60px] sm:pl-[40px] md:pt-0 flex flex-col justify-center items-baseline bg-cover min-h-[400px]">
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
          <div className="w-[40%] md:w-full wrapper-default-inner-pages pl-0 md:pl-[60px] sm:pl-[40px] md:pt-0 flex flex-col justify-center items-baseline">
            <p className="body-large text-white md:mb-[20px]">{description}</p>
          </div>
        )
      )}
    </div>
  )
}
