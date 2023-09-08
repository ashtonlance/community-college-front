import { gql } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'
import LogoTall from 'assets/imgs/site-logo.svg'
import LogoShort from 'assets/imgs/ncccs-short.svg'
import { Search } from 'components/Search'
import { NavigationItem } from './NavigationItem'
import { useState } from 'react'
import { HamburgerMenu } from './HamburgerMenu'
import useScrollPosition from 'utils/hooks/useScrollPosition'
import dynamic from 'next/dynamic'
import useWindowDimensions from 'utils/hooks/useWindowDimensions'
import { decode } from 'html-entities'
import { useRouter } from 'next/router'
import { cn } from 'utils'
import { isCurrentPage } from './NavigationItem'

const Modal = dynamic(
  async () => {
    const { Modal } = await import('components/Modal')
    return { default: Modal }
  },
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)

const Logo = ({ scrolled }) => {
  const NCCCSLogo = scrolled ? LogoShort : LogoTall
  const { width } = useWindowDimensions()
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

const UtilityItem = ({ item }) => {
  const router = useRouter()
  return (
    <Link
      key={item?.navItem?.title}
      className={cn(`flex h-full items-center justify-center px-[20px] py-[15px] font-condensed text-white hover:bg-lightBlue hover:text-navy ${
        isCurrentPage(item?.navItem?.url, router.asPath)
          ? 'bg-gold text-navy'
          : ''
      }
                    `)}
      href={item?.navItem?.url || ''}
    >
      {decode(item?.navItem?.title)}
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
}

export const Header = (props: HeaderProps) => {
  const menuItems = props.menuItems
  const variant = props.variant ?? 'default'
  const utilityNavigation = props.utilityNavigation
  const [activeItem, setActiveItem] = useState('')
  const [searchOpened, setSearchOpened] = useState(false)
  const [hamburgerMenuOpened, setHamburgerMenuOpen] = useState(false)
  const scrollPosition = useScrollPosition()

  const handleActiveItem = (e, id) => {
    typeof e === 'object' ? e.preventDefault() : null
    id === activeItem ? setActiveItem('') : setActiveItem(id)
  }
  const displayTransparentMode = false
  const transparentScrolledMode = scrollPosition > 0 && activeItem === ''

  return (
    <div
      id="topbar"
      className={cn(
        `${
          displayTransparentMode
            ? 'topbar-transparent fixed z-10 w-full'
            : 'fixed top-0 z-10 w-full bg-white'
        } transition-background border-b-2 border-solid border-grey duration-200`
      )}
    >
      <div className="flex w-full justify-between bg-navy">
        <div className="flex w-full items-center justify-between">
          {utilityNavigation && (
            <>
              <div className="flex items-center justify-center">
                {utilityNavigation.slice(0, 4).map(item => (
                  <UtilityItem key={item?.navItem?.title} item={item} />
                ))}
              </div>
              <div className="flex items-center justify-center">
                {utilityNavigation.slice(4).map(item => (
                  <UtilityItem key={item?.navItem?.title} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
        <span className="search-wrapper-icon flex items-center bg-lightBlue px-[20px] py-[14px] font-condensed text-navy hover:bg-gmt-200 md:h-[50px] md:w-[50px] md:justify-center md:p-0">
          <Search
            transparentMode={displayTransparentMode}
            searchOpened={setSearchOpened}
          />
        </span>
      </div>
      <div
        className={cn(
          `${
            transparentScrolledMode
              ? 'px-[32px] py-[16px] md:px-[24px] md:py-[20px] '
              : 'px-[32px] py-[24px] md:p-[24px] md:pl-[40px]'
          } transition-padding mx-auto flex h-fit w-full max-w-[1700px] items-center justify-between bg-transparent duration-200 sm:py-[10px] sm:pl-[24px] sm:pr-[20px]`
        )}
      >
        <Logo scrolled={transparentScrolledMode} />
        <DynamicNavigationMenu
          transparentMode={displayTransparentMode}
          openDropdownItem={activeItem}
          menuItems={menuItems}
          updateActiveItem={handleActiveItem}
        />

        <div className="hamburguer-wrapper hidden h-[50px] w-[50px] items-center justify-center rounded-[3px] hover:bg-gmt-200 md:flex">
          <HamburgerMenu
            menuItems={menuItems}
            bgTransparent={displayTransparentMode}
            isOpen={hamburgerMenuOpened}
            toggleHamburgerMenu={setHamburgerMenuOpen}
          />
        </div>
      </div>
    </div>
  )
}

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
      # navigationMenu {
      #   fieldGroupName
      #   items {
      #     description
      #     fieldGroupName
      #     title
      #     url {
      #       target
      #       title
      #       url
      #     }
      #     resourcesLinks {
      #       label
      #       pageLink {
      #         url
      #       }
      #     }
      #   }
      # }
    }
  `,
}
