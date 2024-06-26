import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useRouter } from 'next/router'
import { formatDate } from 'utils/dates'
import bg from '../../assets/imgs/angled-bg-defaultHero.png'
import generateBreadcrumbs from '../../utils/breadcrumbs'

export const AnnualReportHero = ({
  heading,
  number,
  date,
  updatedDate,
  to,
  categories,
}) => {
  const router = useRouter()
  const breadcrumbs = generateBreadcrumbs(
    router,
    '/about-us/legal-policy-support/annual-reporting-plans/',
    '/college-faculty-staff/policy-legal-support/annual-reporting-plans'
  )
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
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="default-hero-headline text-[48px] sm:text-[42px]">
          {heading}
        </h1>
      </div>
      <div className="wrapper-default-inner-pages flex w-[40%] flex-col items-baseline justify-center pl-0 md:w-full md:pl-[60px] md:pt-0 sm:pl-[40px]">
        <div className="body-large mb-[24px] flex gap-3 font-bold text-darkGrey">
          <span>{number && number}</span>
          <span>{number && date && '•'}</span>
          <span>{formatDate(date) && formatDate(date)}</span>
          <span>
            {formatDate(updatedDate) && `Updated: ${formatDate(updatedDate)}`}
          </span>
        </div>
        {categories && (
          <div className="body-regular mb-[10px] flex gap-3 font-bold text-darkGrey">
            {categories.map(category => (
              <span key={category}>{category?.name}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
