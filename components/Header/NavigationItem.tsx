import { MegaMenu } from 'components/Header/MegaMenu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from 'utils'
import Stroke from 'assets/icons/stroke.svg'

export const isCurrentPage = (url, asPath) => {
  // Check if the domain is in the url
  if (!url?.startsWith(process.env.NEXT_PUBLIC_SITE_URL)) {
    url = process.env.NEXT_PUBLIC_SITE_URL + url
  }
  // Check if the / is at the end of the url
  if (!url?.endsWith('/')) {
    url = url + '/'
  }
  return url === process.env.NEXT_PUBLIC_SITE_URL + asPath
}

export const NavigationItem = ({
  item,
  dropdownOpened,
  transparentMode,
  handleActiveItem,
}) => {
  const router = useRouter()
  const hasDropdownItems = item?.children?.length > 0
  const navigationElement = hasDropdownItems ? (
    <>
      {item?.children?.length > 0 && (
        <div className="group flex h-[50px] flex-col items-center justify-center">
          <Link
            suppressHydrationWarning
            onClick={e => handleActiveItem(e, item.id)}
            href={item.url}
            className={cn(`
            main-nav group mb-[6px] flex cursor-pointer justify-center gap-2 pr-[30px]
            ${dropdownOpened ? 'active items-center' : 'items-baseline'} ${
              transparentMode && 'text-white hover:text-black'
            }`)}
          >
            {item.label}
          </Link>{' '}
          {dropdownOpened ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                className="absolute right-[16px] top-[40%] text-navy"
              >
                <path
                  d="M9.24264 5.75736L5 1.51472L0.75736 5.75736"
                  strokeWidth="1.5"
                  className="stroke-navy"
                />
              </svg>
              <MegaMenu
                handleActiveItem={handleActiveItem}
                item={item}
                key={item.id}
              />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="absolute right-[16px] top-[42%] text-navy"
            >
              <path
                d="M0.757359 3.24264L5 7.48528L9.24264 3.24264"
                strokeWidth="1.5"
                className="stroke-navy"
              />
            </svg>
          )}
          <Stroke
            alt=""
            className={cn(
              `h-[10px] min-h-[10px] w-full text-gold opacity-0 transition-all duration-150 ease-in-out group-hover:opacity-100 ${
                isCurrentPage(item.url, router.asPath)
                  ? 'text-lightBlue opacity-100'
                  : ''
              }`
            )}
            preserveAspectRatio="none"
          />
        </div>
      )}
    </>
  ) : (
    <div className="group flex h-[50px] flex-col items-center justify-center gap-y-[6px]">
      <Link
        onMouseOver={() => handleActiveItem(item.id)}
        className={cn(`
      no-child main-nav group flex cursor-pointer justify-center gap-2
      ${
        dropdownOpened
          ? 'active items-center bg-black text-white hover:bg-black'
          : 'items-baseline'
      }
    ${transparentMode ? 'text-white hover:text-black' : ''}
    `)}
        href={item.url}
      >
        {item.label}
      </Link>
      <Stroke
        alt=""
        className={cn(
          `h-[10px] min-h-[10px] w-full text-gold opacity-0 transition-all duration-150 ease-in-out group-hover:opacity-100 ${
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
