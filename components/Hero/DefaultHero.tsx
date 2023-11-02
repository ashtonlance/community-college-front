import { HeroPropsType } from './LandingHero'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useRouter } from 'next/router'
import { unslugify } from 'utils/unslugify'
import bg from '../../assets/imgs/angled-bg-defaultHero.png'
import Phone from 'assets/icons/phone.svg'
import Mail from 'assets/icons/mail.svg'
import generateBreadcrumbs from '../../utils/breadcrumbs'
import { cn } from 'utils'

export const DefaultHero = ({
  bgImg,
  subheading,
  description,
  heading,
  ctaLabel,
  ctaURL,
  bgPosition,
  phone,
  email,
  isCollegeSingle,
}: HeroPropsType) => {
  console.log("isCollegeSingle", isCollegeSingle)
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
        className={cn(
          `wrapper-default-inner-pages flex w-[60%] flex-col items-baseline justify-center bg-cover md:w-full  
          ${isCollegeSingle ? 'pb-[80px] md:pb-[60px] sm:pb-[40px]' : 'pb-[80px] md:pb-0'}
          `
        )}
      >
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="default-hero-headline">{heading}</h1>

        {description && bgImg && (
          <p 
            className={cn(
              `body-large text-darkGrey  
              ${isCollegeSingle ? 'font-bold mb-[24px]' : 'sm:mb-[32px] mb-[40px]'}
              `
            )}
          >
            {description}
          </p>
        )}

        {subheading && (
          <div className="mb-[32px] flex items-center gap-[15px]">
            <h2 className="font-sans text-[16px] font-bold leading-[150%] text-darkGrey sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}
        {phone || email ? (
          <div className="md:mb-8 mb-10 flex w-fit items-center gap-x-5">
            {phone && (
              <div className="group flex items-center">
                <Phone className="mr-2 h-[18px] w-[18px] text-gold group-hover:text-navy" />
                <a
                  href={`tel:${phone}`}
                  className="body-regular md:text-base text-lg font-bold text-darkGrey hover:text-navy tracking-[-0.16px]"
                >
                  {phone}
                </a>
              </div>
            )}
            {email && (
              <div className="group flex items-center">
                <Mail className="mr-2 h-[18px] w-[18px] text-gold group-hover:text-navy" />
                <a
                  href={`mailto:${email}`}
                  className="body-regular md:text-base text-lg font-bold text-darkGrey hover:text-navy tracking-[-0.16px]"
                >
                  Send An Email
                </a>
              </div>
            )}
          </div>
        ) : null}

        {ctaURL && ctaLabel && (
          <Link href={ctaURL} 
            className={cn(
              `secondary-btn navy  
              ${isCollegeSingle ? 'mb-0' : 'mb-6'}
              `
            )}
          >
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
            className={`object-cover md:rounded-none rounded-bl-xl object-${bgPosition} z-0`}
            priority
          />
        </div>
      ) : (
        description && (
          <div className="wrapper-default-inner-pages flex w-[40%] flex-col items-baseline justify-center pl-0 md:w-full md:pl-[60px] md:pt-0 sm:pl-[40px] lg:h-auto h-full">
            <p className="body-large text-darkGrey md:mb-[20px] lg:mt-0 mt-[56px]">
              {description}
            </p>
          </div>
        )
      )}
    </div>
  )
}
