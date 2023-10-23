import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { MobileChildSubMenu } from '../MegaMenu/MobileChildSubMenu'
import Link from 'next/link'
import { Separator } from 'components/Separator'
import bg from 'assets/imgs/angled-bg-menu.jpg'
import ArrowLeft from 'assets/icons/arrow-forward-sharp-reverse.svg'

const TopLevelMenu = ({ items, setActiveMenuAs, classes }) => {
  return (
    <div
      className={`z-10 flex w-full flex-col items-start justify-center text-white ${classes}`}
    >
      {items &&
        items?.map(item => (
          <div
            onClick={() => setActiveMenuAs(item)}
            key={item.id}
            className={`links-mobile-nav flex w-full items-center justify-between border-b-2 border-lightBlue
              ${item.label === 'Events' ? 'hide-border order-6' : ''}
              `}
          >
            <div className=""> {item.label} </div>
            {item?.children?.length > 0 && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.24264 9.24264L7.48528 5L3.24264 0.757359"
                  stroke="#E1AF00"
                  strokeWidth="2"
                />
              </svg>
            )}
          </div>
        ))}
    </div>
  )
}

const InternalMenu = ({ activeMenu, items, setActiveMenu }) => {
  const router = useRouter()
  let content = (
    <TopLevelMenu
      classes="top-[90px]"
      items={items}
      setActiveMenuAs={setActiveMenu}
    />
  )
  if (activeMenu?.label !== '') {
    if (activeMenu?.children.length >= 1) {
      content = (
        <div className="internal-menu-mobile z-10 min-h-[90px] w-full text-left md:min-h-[80px]">
          <Link
            href={activeMenu?.url ?? ''}
            className="links-mobile-nav text-white"
          >
            {activeMenu?.label}
          </Link>
          <Separator classes="relative bg-gmt-400 h-[1.5px] w-[40px] z-10" />
          {activeMenu?.children && (
            <MobileChildSubMenu
              classes="justify-start md:h-fit !top-0 !pt-[10px] sm:!pt-0"
              subItems={activeMenu.children}
            />
          )}
        </div>
      )
    } else if (activeMenu?.children.length < 1) {
      router.push(activeMenu.url)
    } else {
      console.log(activeMenu, 'activeMenu')
    }
  }
  return content
}

export const MobileSubmenu = ({ items }) => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [navigationHeight, setNavigationHeight] = useState(null)

  const navigation = document.getElementById('topbar')
  // get header size dynamically to move main content below
  const handleResize = () => {
    setNavigationHeight(navigation.offsetHeight)
  }

  useEffect(() => {
    setNavigationHeight(navigation.offsetHeight)
    window.addEventListener('resize', handleResize, false)
  }, [navigation])

  const menu = (
    <InternalMenu
      activeMenu={activeMenu}
      items={items}
      setActiveMenu={setActiveMenu}
    />
  )

  return (
    <div
      style={{
        top: `${navigationHeight}px`,
      }}
      className="semi-modal"
    >
      <Image
        className="pointer-events-none object-fill object-center"
        src={bg}
        alt=""
        fill
        loading="eager"
        priority
      />
      <div className="mobile-submenu top-0 z-30 bg-transparent">
        {activeMenu && (
          <div
            onClick={() => setActiveMenu(null)}
            className="tag relative top-[-5px] flex gap-2 rounded-lg bg-white text-sm text-navy"
          >
            <ArrowLeft className="rotate-180 text-gold" />
            Back
          </div>
        )}

        {menu}
      </div>
    </div>
  )
}
