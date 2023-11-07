import { Breadcrumbs } from '@/components/Breadcrumbs'
import Mail from 'assets/icons/mail.svg'
import Phone from 'assets/icons/phone.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from 'utils'
import bg from '../../assets/imgs/angled-bg-defaultHero.png'
import generateBreadcrumbs from '../../utils/breadcrumbs'
import { HeroPropsType } from './LandingHero'

export const DefaultHero = ({
  bgImg,
  subheading,
  description,
  smallHeading,
  heading,
  ctaLabel,
  ctaURL,
  bgPosition,
  phone,
  email,
  isCollegeSingle,
}: HeroPropsType) => {
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
          ${
            isCollegeSingle
              ? 'pb-[80px] md:pb-[60px] sm:pb-[40px]'
              : 'pb-[80px] md:pb-0'
          }
          `
        )}
      >
        <Breadcrumbs items={breadcrumbs} />
        <h1
          className={cn(
            `default-hero-headline  
            ${
              smallHeading
                ? 'sm:text-[42px] text-[48px]'
                : 'sm:text-[42px] md:text-[48px] text-[72px]'
            }
            `
          )}
        >
          {heading}
        </h1>

        {description && bgImg && (
          <p
            className={cn(
              `body-large text-darkGrey  
              ${
                isCollegeSingle
                  ? 'mb-[24px] font-bold'
                  : 'mb-[40px] sm:mb-[32px]'
              }
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
          <div className="mb-10 flex w-fit items-center gap-x-5 md:mb-8">
            {phone && (
              <div className="group flex items-center">
                <Phone className="mr-2 h-[18px] w-[18px] text-gold group-hover:text-navy" />
                <a
                  href={`tel:${phone}`}
                  className="body-regular text-lg font-bold tracking-[-0.16px] text-darkGrey hover:text-navy md:text-base"
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
                  className="body-regular text-lg font-bold tracking-[-0.16px] text-darkGrey hover:text-navy md:text-base"
                >
                  Send An Email
                </a>
              </div>
            )}
          </div>
        ) : null}

        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
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
            className={`rounded-bl-xl object-cover md:rounded-none object-${bgPosition} z-0`}
            priority
          />
        </div>
      ) : (
        description && (
          <div className="wrapper-default-inner-pages flex h-full w-[40%] flex-col items-baseline justify-center pl-0 lg:h-auto md:w-full md:pl-[60px] md:pt-0 sm:pl-[40px]">
            <p className="body-large mt-[56px] text-darkGrey lg:mt-0 md:mb-[20px]">
              {description}
            </p>
          </div>
        )
      )}
    </div>
  )
}
