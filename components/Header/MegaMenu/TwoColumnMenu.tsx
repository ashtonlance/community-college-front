import { useClickAway } from '@uidotdev/usehooks'
import bg from 'assets/imgs/angled-bg-menu.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { cn } from 'utils'

type TwoColumnMenuProps = {
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
  parentItem?: any
  activeItem?: string
}

export const TwoColumnMenu = ({
  subItems,
  classes,
  handleActiveItem,
  parentItem,
}: TwoColumnMenuProps) => {
  const [navigationHeight, setNavigationHeight] = useState(140)
  const navigation = document.getElementById('topbar')
  const calloutItem = subItems.find(
    subItem => subItem.menuCallout?.isThisACallout === true
  )
  console.log({ calloutItem })
  // get header size dynamically to move main content below
  const handleResize = useCallback(() => {
    setNavigationHeight(navigation?.clientHeight)
  }, [navigation])

  useEffect(() => {
    if (navigation?.clientHeight > 190) {
      setNavigationHeight(200)
    } else {
      setNavigationHeight(140)
    }
    window.addEventListener('resize', handleResize, false)
    return () => {
      window.removeEventListener('resize', handleResize, false)
    }
  }, [navigation, handleResize])

  const ref: MutableRefObject<HTMLDivElement> = useClickAway(e => {
    const target = e.target as Element
    if (!target.classList.contains('main-nav')) {
      handleActiveItem('')
    }
  })
  return (
    <div className={`fixed left-0 top-[${navigationHeight}px] w-full`}>
      <div className={cn(`mega-menu z-30 md:top-0 ${classes}`)} ref={ref}>
        <Image
          className="pointer-events-none object-fill object-center"
          src={bg}
          alt=""
          fill
          loading="eager"
          priority
        />
        <div className="z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between">
          <div className="border-r-solid flex max-h-[425px] flex-1 flex-col flex-wrap justify-around gap-y-6 border-r-[1.5px] border-r-lightBlue md:border-0 md:text-left">
            {parentItem ? (
              <div className="flex flex-col pr-[40px]" key={parentItem.label}>
                <Link
                  className="links-sub-nav text-white hover:text-lightBlue"
                  href={parentItem?.url || ''}
                >
                  {`${parentItem.label} Overview`}
                </Link>
              </div>
            ) : null}
            {subItems?.map(subItem => {
              const secondaryLinks = subItem?.children?.length > 0
              return (
                <div className="flex flex-col pr-[40px]" key={subItem.label}>
                  <Link
                    className={cn(
                      `links-sub-nav ${
                        secondaryLinks
                          ? 'mb-[14px] md:mb-[10px] sm:mb-[8px]'
                          : null
                      }`
                    )}
                    href={subItem?.url || ''}
                  >
                    {subItem.label}
                  </Link>

                  <>
                    {secondaryLinks &&
                      subItem?.children?.map((child: any) => (
                        <Link
                          className="links-child-nav"
                          href={child?.url || ''}
                          key={child.label}
                        >
                          {child.label}
                        </Link>
                      ))}
                  </>
                </div>
              )
            })}
          </div>

          <div className="flex w-[35%] flex-col items-center justify-center gap-8 pl-[80px] text-center md:hidden">
            <span className="h3 text-white">
              {calloutItem?.menuCallout?.heading ??
                'Need help finding the right program?'}
            </span>
            <Link
              href={
                calloutItem?.menuCallout?.link?.url ??
                '/students/what-we-offer/program-finder/'
              }
              className="secondary-btn gold"
              target={calloutItem?.menuCallout?.link?.target ?? '_self'}
            >
              {calloutItem?.menuCallout?.link?.title ??
                'Use Our Program Finder'}
            </Link>
          </div>
        </div>
      </div>
      <div className={`semi-modal top-[${navigationHeight}px]`}></div>
    </div>
  )
}
