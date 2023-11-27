import Stroke from 'assets/icons/stroke.svg'
import { MegaMenu } from 'components/Header/MegaMenu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from 'utils'

export const isCurrentPage = (urlRaw = '', asPath = '', isUtil = false) => {
  let url = urlRaw
  // Check if the domain is in the url
  if (!url?.startsWith(process.env.NEXT_PUBLIC_SITE_URL)) {
    url = process.env.NEXT_PUBLIC_SITE_URL + url
  }
  // Check if the / is at the end of the url
  if (!url?.endsWith('/')) {
    url = url + '/'
  }

  const pathParts = asPath.split('/')
  let slugToMatch = asPath
  if (pathParts.length === 3 && !isUtil) {
    return
  } else if (pathParts[2] !== '/' && !isUtil) {
    slugToMatch = pathParts[2]
  } else if (isUtil) {
    if (
      url === '/' ||
      url === 'http://localhost:3000/' ||
      url === process.env.NEXT_PUBLIC_SITE_URL
    ) {
      slugToMatch = 'students'
      return true
    } else if (url.includes('data-dashboards')) {
      slugToMatch = '/about-us/data-reporting/data-dashboards-page/'
      return asPath.includes(slugToMatch) || asPath.includes('/about-us/resources/data-dashboards/')
    } else if (pathParts[1] === 'colleges') {
      slugToMatch = 'students'
      return url.includes(slugToMatch)
    } else {
      slugToMatch = pathParts[1]
      return url.includes(slugToMatch) && !asPath.includes('data-dashboards')
    }
  }
  return asPath !== '/' && url.includes(slugToMatch)
}

export const NavigationItem = ({
  item,
  dropdownOpened = false,
  transparentMode = false,
  handleActiveItem,
  activeItem,
}) => {
  const router = useRouter()
  const hasDropdownItems = item?.children?.length > 0
  const navigationElement = hasDropdownItems ? (
    <>
      {item?.children?.length > 0 && (
        <div className="group flex flex-col items-center justify-center gap-[6px]">
          <Link
            suppressHydrationWarning
            onClick={e => handleActiveItem(e, item.id)}
            href={item?.url || ''}
            className={cn(`
            main-nav group relative flex cursor-pointer flex-col items-center justify-center gap-2 pr-[30px]
            ${dropdownOpened ? 'active' : ''} ${
              transparentMode && 'text-white hover:text-black'
            }`)}
          >
            {item?.label}

            <Stroke
              alt=""
              className={cn(
                `pointer-events-none absolute -bottom-4 ml-4 h-[10px] min-h-[10px] w-[135%] max-w-full text-gold opacity-0 transition-all duration-150 ease-in-out group-hover:opacity-100 ${
                  isCurrentPage(item.url, router.asPath)
                    ? 'text-lightBlue opacity-100'
                    : ''
                }${dropdownOpened ? 'text-gold opacity-100' : ''}`
              )}
              preserveAspectRatio="none"
            />
          </Link>{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className={cn(
              `absolute right-[16px] top-[55%] transform-gpu text-navy transition duration-150 group-hover:top-[58%] ${
                dropdownOpened ? 'rotate-180' : ''
              }`
            )}
          >
            <path
              d="M0.757359 3.24264L5 7.48528L9.24264 3.24264"
              strokeWidth="1.5"
              className="stroke-navy"
            />
          </svg>
          {dropdownOpened ? (
            <MegaMenu
              handleActiveItem={handleActiveItem}
              item={item}
              key={item.id}
              activeItem={activeItem}
            />
          ) : null}
        </div>
      )}
    </>
  ) : (
    <div className="group flex flex-col justify-center gap-y-[6px]">
      <Link
        suppressHydrationWarning
        onMouseOver={() => handleActiveItem(item.id)}
        className={cn(`
      no-child main-nav group relative flex cursor-pointer justify-center gap-2
      
    ${transparentMode ? 'text-white hover:text-black' : ''}
    `)}
        href={item?.url || ''}
      >
        {item?.label}
      </Link>
      <Stroke
        alt=""
        className={cn(
          `absolute -bottom-4 h-[10px] min-h-[10px] w-full text-gold opacity-0 transition-all duration-150 ease-in-out group-hover:opacity-100 ${
            isCurrentPage(item.url, router.asPath)
              ? 'text-lightBlue opacity-100'
              : ''
          }`
        )}
        preserveAspectRatio="none"
      />
    </div>
  )

  return navigationElement
}
