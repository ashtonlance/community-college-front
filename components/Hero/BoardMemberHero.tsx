import { Breadcrumbs } from '@/components/Breadcrumbs'
import Mail from 'assets/icons/mail.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatDateLong } from 'utils/dates'
import bg from '../../assets/imgs/angled-bg-defaultHero.png'
import generateBreadcrumbs from '../../utils/breadcrumbs'

export const BoardMemberHero = ({
  bgImg = '',
  subheading = '',
  description = '',
  heading = '',
  ctaLabel = '',
  ctaURL = '',
  bgPosition = 'center',
  phone = '',
  email = '',
  appointment = '',
  termExpiration = '',
  role = '',
  type = '',
}) => {
  const router = useRouter()
  const slug =
    type === 'Foundation'
      ? '/about-us/foundation/foundation-board-members/'
      : '/about-us/state-board/board-members/'
  const urlToMatch =
    type === 'Foundation'
      ? '/about-us/board-members'
      : '/about-us/board-members'
  const breadcrumbs = generateBreadcrumbs(router, slug, urlToMatch)
  return (
    <div
      className={`md:pb-0 relative flex h-fit md:h-fit md:flex-col sm:items-center sm:justify-center`}
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
        <h1 className="default-hero-headline text-[48px] sm:text-[42px]">
          {heading}
        </h1>

        {description && bgImg && (
          <p className="body-large mb-[40px] text-darkGrey sm:mb-[32px]">
            {description}
          </p>
        )}
        {appointment && (
          <p className="body-large font-bold text-darkGrey ">
            Appointment: <span className="font-normal">{appointment}</span>
          </p>
        )}
        {termExpiration && (
          <p className="body-large mb-[10px] font-bold text-darkGrey">
            Term Expiration:{' '}
            <span className="font-normal">
              {formatDateLong(termExpiration)}
            </span>
          </p>
        )}
        {role && <p className="body-regular mb-6 text-darkGrey">{role}</p>}
        {email ? (
          <div className="mb-16 flex w-fit items-center gap-x-5">
            <div className="group flex items-center">
              <Mail className="mr-2 h-[18px] w-[18px] text-gold group-hover:text-navy" />
              <a
                href={`mailto:${email}`}
                className="body-regular font-bold text-darkGrey hover:text-navy"
              >
                Send An Email
              </a>
            </div>
          </div>
        ) : null}

        {ctaURL && ctaLabel && (
          <Link href={ctaURL} className={`secondary-btn navy`}>
            {ctaLabel}
          </Link>
        )}
      </div>
      {bgImg ? (
        <div
          className="wrapper-default-inner-pages relative flex min-h-[400px]
         w-[40%] flex-col items-baseline justify-center rounded-xl bg-cover pl-0 md:w-full
         md:pl-[60px] md:pt-0 sm:pl-[40px]"
        >
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
            <p className="body-large text-darkGrey md:mb-[20px]">
              {description}
            </p>
          </div>
        )
      )}
    </div>
  )
}
