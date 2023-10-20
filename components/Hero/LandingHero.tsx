import Link from 'next/link'
import Image from 'next/image'
import { cn } from 'utils'
import angles from 'assets/imgs/bg-angles-blue.png'
import { BackgroundVideoFile, BackgroundVideoURL } from './BackgroundVideo'

export type HeroPropsType = {
  bgColor?: string
  bgImg?: string
  subheading?: string
  description?: string
  heading: string
  ctaLabel?: string
  ctaURL?: string
  bgPosition?: string
  emptyBg?: boolean
  bgVideo?: string
  videoType?: string
  phone?: string
  email?: string
  link?: string
  isCollegeSingle?: boolean
  showProgramFinder?: string
}

export const LandingHero = ({
  bgColor,
  bgImg,
  subheading,
  description,
  heading,
  ctaLabel,
  ctaURL,
  bgVideo,
  bgPosition,
  emptyBg,
  videoType,
  showProgramFinder,
}: HeroPropsType) => {
  return (
    <div
      className={cn(
        `flex relative h-full items-center bg-cover bg-no-repeat py-[150px] md:pb-[100px] md:pt-[180px] sm:flex sm:items-center sm:justify-center sm:pb-[60px] sm:pt-[100px] ${
          !bgImg && !bgVideo && `bg-${bgColor}'}`
        } ${showProgramFinder === 'true' ? 'pb-[335px]' : ''}`
      )}
      suppressHydrationWarning
    >
      {bgVideo && videoType === 'url' && <BackgroundVideoURL url={bgVideo} />}
      {bgVideo && videoType === 'file' && (
        <BackgroundVideoFile databaseId={bgVideo} />
      )}

      {bgImg && !bgVideo && (
        <Image
          src={bgImg}
          alt=""
          fill
          className={`object-cover object-${bgPosition} z-0`}
          priority
        />
      )}
      <div className="img-landing-hero absolute bottom-0 left-0 right-0 top-0 w-full">
        <Image
          src={angles.src}
          alt=""
          fill
          className={`img-landing-hero z-[2] object-fill`}
          priority
        />
      </div>
      <div className="landing-hero-text relative z-10 ml-[15%] mr-[30%] flex w-[55%] flex-col md:mx-[100px] md:w-full sm:mx-[40px] z-10">
        {subheading && (
          <div className="flex items-center gap-[15px]">
            <h2
              className={`text-[16px] font-bold leading-[150%] sm:text-[14px] ${
                emptyBg ? 'text-darkGrey' : 'text-white'
              }`}
            >
              {subheading}
            </h2>
          </div>
        )}
        <h1
          className={`landing-hero-headline my-[32px] sm:my-[20px] ${
            emptyBg ? 'text-navy' : 'text-white'
          }`}
        >
          {heading}
        </h1>

        {description && (
          <p
            className={`body-large mb-[40px] sm:mb-[32px] ${
              emptyBg ? 'text-darkGrey' : 'text-white'
            }`}
          >
            {description}
          </p>
        )}

        {ctaURL && ctaLabel && (
          <Link href={ctaURL} className="secondary-btn navy">
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
