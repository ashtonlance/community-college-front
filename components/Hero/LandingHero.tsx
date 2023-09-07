import { HeroPropsType } from './HomeHero'
import Link from 'next/link'
import { GuideLine } from '../AnimatedLines/GuideLine'
import Image from 'next/image'

export const LandingHero = ({
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
      className={`flex h-full items-center bg-cover pb-[150px] pt-[240px] md:pb-[100px] md:pt-[180px] sm:flex sm:items-center sm:justify-center sm:pb-[60px] sm:pt-[100px] bg-${bgColor}`}
    >
      {bgImg && (
        <>
          <Image
            src={bgImg}
            alt=""
            fill
            className={`object-cover object-${bgPosition} z-0`}
            priority
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 w-full"
            style={{
              backgroundImage: `radial-gradient(13.02% 27.98% at 93.08% 79.69%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(35.95% 35.95% at 39.06% 64.05%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(84.11deg, rgba(0, 0, 0, 0.5) 2.71%, rgba(0, 0, 0, 0) 58.68%)`,
            }}
          ></div>
        </>
      )}
      <div className="landing-hero-text ml-[15%] mr-[35%] flex w-[50%] flex-col md:mx-[100px] md:w-full sm:mx-[40px]">
        {subheading && (
          <div className="mb-[32px] flex items-center gap-[15px]">
            <GuideLine />
            <h2 className="text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}
        <h1 className="mb-[32px] text-white">{heading}</h1>
        {description && <p className="body-large text-white">{description}</p>}
        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
            className="primary-btn text-emerald mt-[60px] flex w-fit bg-white md:mt-[50px] sm:mt-[40px]"
          >
            {ctaLabel}
          </Link>
        )}
        d
      </div>
    </div>
  )
}
