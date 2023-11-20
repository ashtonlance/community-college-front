import { gql } from '@apollo/client'
import LogoShort from 'assets/imgs/ncccs-short.svg'
import LogoTall from 'assets/imgs/site-logo.svg'
import { AnnouncementBar } from 'components/AnnouncementBar'
import { Search } from 'components/Search'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { cn } from 'utils'
import useScrollPosition from 'utils/hooks/useScrollPosition'
import useWindowDimensions from 'utils/hooks/useWindowDimensions'
import { HamburgerMenu } from './HamburgerMenu'
import { NavigationItem, isCurrentPage } from './NavigationItem'

function decodeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // We are in server-side rendering, return the string as is
    return html
  }

  var txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

const Logo = ({ scrolled }) => {
  const { width } = useWindowDimensions()
  let NCCCSLogo
  if (width > 768) {
    NCCCSLogo = scrolled ? LogoShort : LogoTall
  } else {
    NCCCSLogo = LogoShort
  }
  return (
    <div className="flex flex-col items-center justify-center md:w-max">
      <Link href="/" className="cursor-pointer">
        <NCCCSLogo
          alt="header-logo"
          width={width > 768 ? 145 : 99}
          height={width > 768 ? 50 : 24}
        />
      </Link>
    </div>
  )
}

export const UtilityItem = ({ item, onClick, customClasses }) => {
  const router = useRouter()
  return (
    <Link
      onClick={e => onClick(e, item)}
      key={item?.navItem?.title}
      className={cn(`utility-item-btn
        ${
          isCurrentPage(item?.navItem?.url, router.asPath, true)
            ? 'bg-gold text-navy'
            : ''
        }
        ${
          customClasses
        }
      `)}
      href={item?.navItem?.url || ''}
    >
      {decodeHtml(item?.navItem?.title)}
    </Link>
  )
}

export const DynamicNavigationMenu = ({
  menuItems,
  openDropdownItem,
  updateActiveItem,
  transparentMode,
}) => (
  <div className="flex items-center justify-center md:hidden">
    {menuItems &&
      menuItems?.map(item => {
        return (
          <div
            className="relative flex items-center justify-center"
            key={item.id}
          >
            <NavigationItem
              handleActiveItem={updateActiveItem}
              item={item}
              transparentMode={transparentMode}
              dropdownOpened={item.id === openDropdownItem}
              activeItem={openDropdownItem}
            />
          </div>
        )
      })}
  </div>
)

export type HeaderVariant = 'transparent' | 'default'

export type HeaderProps = {
  menuItems: any
  variant?: HeaderVariant
  form: any
  utilityNavigation: any
  announcementBar?: {
    announcementBarText?: string
    announcementBarLink?: string
    showAnnouncementBar?: string
  }
}

export const Header = forwardRef(
  (props: HeaderProps, ref: React.RefObject<HTMLDivElement>) => {
    const menuItems = props.menuItems
    const variant = props.variant ?? 'default'
    const utilityNavigation = props.utilityNavigation
    const [activeItem, setActiveItem] = useState('')
    const [searchOpened, setSearchOpened] = useState(false)
    const [hamburgerMenuOpened, setHamburgerMenuOpen] = useState(false)
    const scrollPosition = useScrollPosition()
    const announcementBar = props.announcementBar
    const [cookies, setCookie, updateCookie] = useCookies([
      'ncccs-preferred-landing-page',
    ])

    const handleActiveItem = (e, id) => {
      typeof e === 'object' ? e.preventDefault() : null
      id === activeItem ? setActiveItem('') : setActiveItem(id)
    }
    const displayTransparentMode = false
    const transparentScrolledMode = scrollPosition > 0 && activeItem === ''

    const handleUtilityNavigationClick = (e, item) => {
      if (item?.navItem?.url === '/businesses/') {
        setCookie('ncccs-preferred-landing-page', 'employers', {
          path: '/',
        })
      } else if (item?.navItem?.url === '/system-office/') {
        setCookie('ncccs-preferred-landing-page', 'system-office', {
          path: '/',
        })
      } else if (
        item?.navItem?.url === '/' ||
        item?.navItem?.url === '/students'
      ) {
        setCookie('ncccs-preferred-landing-page', 'students', { path: '/' })
      } else if (item?.navItem?.url === '/college-faculty-and-staff/') {
        setCookie('ncccs-preferred-landing-page', 'college-faculty-and-staff', {
          path: '/',
        })
      }
    }

    return (
      <div
        ref={ref}
        id="topbar"
        className={cn(
          `${
            displayTransparentMode
              ? 'topbar-transparent fixed z-20 w-full'
              : 'fixed top-0 z-20 w-full bg-white'
          } transition-background border-b-2 border-solid border-grey duration-200`
        )}
      >
        {announcementBar?.showAnnouncementBar === '1' ? (
          <AnnouncementBar announcementBar={announcementBar} />
        ) : null}
        <div className="mx-auto flex w-full justify-between bg-navy">
          <div className="flex w-full items-center justify-between">
            <div className="mx-auto flex w-full max-w-[1700px] items-center justify-between px-4 xl:px-0 md:px-6 sm:px-0">
              {utilityNavigation && (
                <>
                  <div className="flex h-full items-center justify-center md:w-full md:justify-between">
                    {utilityNavigation
                      .slice(0, 4)
                      ?.map(item => (
                        <UtilityItem
                          onClick={e => handleUtilityNavigationClick(e, item)}
                          key={item?.navItem?.title}
                          item={item}
                          customClasses=''                        
                        />
                      ))}
                  </div>
                  <div className="flex h-full items-center justify-center md:hidden">
                    {utilityNavigation
                      .slice(4)
                      ?.map(item => (
                        <UtilityItem
                          onClick={e => handleUtilityNavigationClick(e, item)}
                          key={item?.navItem?.title}
                          item={item}
                          customClasses=''
                        />
                      ))}

                    <span className="search-wrapper-icon flex h-[45px] items-center bg-lightBlue px-[20px] py-[14px] font-condensed text-navy hover:bg-gmt-200 md:hidden md:h-[50px] md:w-[50px] md:justify-center md:p-0">
                      <Search
                        transparentMode={displayTransparentMode}
                        searchOpened={setSearchOpened}
                      />
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={cn(
            `${
              transparentScrolledMode
                ? 'px-[32px] py-[16px] md:px-[24px] md:py-[20px] '
                : 'px-[32px] py-[24px] md:p-[24px] md:pl-[40px]'
            } transition-padding relative mx-auto flex h-fit w-full max-w-[1700px] sm:items-center items-start justify-between bg-transparent duration-200 sm:py-[10px] sm:pl-[24px] sm:pr-[20px]`
          )}
        >
          <Logo scrolled={transparentScrolledMode} />
          <DynamicNavigationMenu
            transparentMode={displayTransparentMode}
            openDropdownItem={activeItem}
            menuItems={menuItems}
            updateActiveItem={handleActiveItem}
          />

          <div className="hamburguer-wrapper relative hidden h-[50px] w-[50px] items-center justify-center rounded-[3px] px-[31px] py-[22px] hover:bg-gmt-200 md:right-[110px] md:flex sm:right-[90px]">
            <HamburgerMenu
              utilityNavigation={utilityNavigation}
              menuItems={menuItems}
              bgTransparent={displayTransparentMode}
              isOpen={hamburgerMenuOpened}
              toggleHamburgerMenu={setHamburgerMenuOpen}
            />
          </div>
          <span className="search-wrapper-icon top-0 hidden h-[calc(100%+2px)] items-center bg-lightBlue px-[20px] py-[14px] font-condensed text-navy hover:bg-gmt-200 md:absolute md:right-0 md:flex md:w-[110px]">
            <Search
              transparentMode={displayTransparentMode}
              searchOpened={setSearchOpened}
            />
          </span>
        </div>
      </div>
    )
  }
)

Header.displayName = 'Menu'
Header.fragments = {
  key: 'NavigationMenuFragment',
  entry: gql`
    fragment NavigationMenuFragment on MenuItem {
      id
      parentId
      description
      label
      url
    }
  `,
}
