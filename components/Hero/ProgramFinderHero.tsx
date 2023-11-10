import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useRouter } from 'next/router'
import { unslugify } from 'utils/unslugify'
import bg from '../../assets/imgs/angled-bg-defaultHero.png'
import { HeroPropsType } from './LandingHero'

export const ProgramFinderHero = ({ description, heading }: HeroPropsType) => {
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
    return [...crumblist]
  }

  // Call the function to generate the breadcrumbs list
  const breadcrumbs = generateBreadcrumbs()
  return (
    <div
      className={`relative flex h-fit justify-center md:h-fit md:flex-col sm:items-center`}
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="wrapper-default-inner-pages flex w-full flex-col
      items-center justify-center bg-cover pb-[80px] md:w-full md:pb-10"
      >
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="h1 mb-6 text-center">{heading}</h1>

        {description && (
          <div
            className="[*&>p]:body-large max-w-[820px] sm:mb-[32px] [*&>p]:text-center [*&>p]:text-darkGrey"
            dangerouslySetInnerHTML={{ __html: description }}
            suppressHydrationWarning
          ></div>
        )}
      </div>
    </div>
  )
}
