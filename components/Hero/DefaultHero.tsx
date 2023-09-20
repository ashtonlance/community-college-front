import { HeroPropsType } from './LandingHero'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useRouter } from 'next/router'
import { unslugify } from 'utils/unslugify'
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
  const router = useRouter()

  function generateBreadcrumbs() {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = router.asPath.split('?')[0]

    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery
      .split('/')
      .filter(v => v.length > 0)

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
      // The title will just be the route string for now
      const title = unslugify(subpath)
      return { href, title }
    })

    // Add in a default "Home" crumb for the top-level
    return [{ href: '/', title: 'Students' }, ...crumblist]
  }

  // Call the function to generate the breadcrumbs list
  const breadcrumbs = generateBreadcrumbs()
  return (
    <div
      className={`relative flex h-fit md:h-fit md:flex-col sm:items-center sm:justify-center bg-${bgColor}`}
    >
      <div className="wrapper-default-inner-pages flex w-[60%] flex-col items-baseline justify-center pb-[80px] md:w-full md:pb-0">
        {subheading && (
          <div className="mb-[32px] flex items-center gap-[15px]">
            <h2 className="text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}

        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mb-[32px] text-navy">{heading}</h1>

        {description && bgImg && (
          <p className="body-large mb-[60px] text-navy md:mb-[20px]">
            {description}
          </p>
        )}

        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
            className="primary-btn flex w-fit bg-white text-navy"
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
            <p className="body-large text-darkGrey md:mb-[20px]">
              {description}
            </p>
          </div>
        )
      )}
    </div>
  )
}
