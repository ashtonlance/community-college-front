import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useRouter } from 'next/router'
import bg from '../../assets/imgs/angled-bg-defaultHero.png'
import Phone from 'assets/icons/phone.svg'
import Mail from 'assets/icons/mail.svg'
import generateBreadcrumbs from '../../utils/breadcrumbs'
import Location from 'assets/icons/location.svg'

interface ApprenticeshipHeroProps {
  bgImg?: string
  subheading?: string
  description: string
  heading: string
  ctaLabel?: string
  ctaURL?: string
  bgPosition?: string
  phone?: string
  email: string
  location: string
  category: string
}

export const ApprenticeshipHero = ({
  bgImg,
  subheading,
  heading,
  ctaLabel,
  ctaURL,
  bgPosition,
  phone,
  email,
  location,
  category,
}: ApprenticeshipHeroProps) => {
  const router = useRouter()
  const breadcrumbs = generateBreadcrumbs(router)
  const cleanLocation = location.replace(/>br \/>/g, '')

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
            <h2 className="text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}

        <Breadcrumbs items={breadcrumbs} />
        <h1 className="default-hero-headline">{heading}</h1>

        {ctaURL && ctaLabel && (
          <Link href={ctaURL} className={`secondary-btn navy`}>
            {ctaLabel}
          </Link>
        )}
      </div>
      <div className="wrapper-default-inner-pages flex w-[40%] flex-col items-baseline justify-center pl-0 md:w-full md:pl-[60px] md:pt-0 sm:pl-[40px]">
        <p className="body-large mb-7 mt-10 font-bold text-darkGrey md:mb-[20px]">
          {category}
        </p>

        {location ? (
          <div className="mb-6 flex w-fit items-center gap-x-2">
            <Location className="mr-2 h-[18px] w-[18px] text-gold" />
            <address className="body-regular font-bold not-italic leading-[140%] text-darkGrey">
              {cleanLocation}
            </address>
          </div>
        ) : null}

        {phone || email ? (
          <div className="mb-16 flex w-fit items-center gap-x-5">
            {phone && (
              <div className="group flex items-center">
                <Phone className="mr-2 h-[18px] w-[18px] text-gold group-hover:text-navy" />
                <a
                  href={`tel:${phone}`}
                  className="body-regular font-bold text-darkGrey hover:text-navy"
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
                  className="body-regular font-bold text-darkGrey hover:text-navy"
                >
                  Send An Email
                </a>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
