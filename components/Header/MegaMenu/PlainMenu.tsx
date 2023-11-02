import { useClickAway } from '@uidotdev/usehooks'
import bg from 'assets/imgs/angled-bg-menu.jpg'
import Link from 'next/link'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import useWindowDimensions from 'utils/hooks/useWindowDimensions'

type PlainMenuProps = {
  parentItem?: any
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
}

export const PlainMenu = ({
  parentItem,
  subItems,
  classes,
  handleActiveItem = () => {},
}: PlainMenuProps) => {
  const { width } = useWindowDimensions()
  let wrapperClasses

  if (width < 1080) {
    wrapperClasses = `top-[110px] left-0 absolute w-full`
  } else {
    wrapperClasses = `semi-modal`
  }
  const [navigationHeight, setNavigationHeight] = useState(140)
  const navigation = document.getElementById('topbar')
  // get header size dynamically to move main content below

  const handleResize = useCallback(() => {
    setNavigationHeight(navigation.clientHeight)
  }, [navigation])

  useEffect(() => {
    if (navigation.clientHeight > 190) {
      setNavigationHeight(200)
    } else {
      setNavigationHeight(140)
    }
    window.addEventListener('resize', handleResize, false)
  }, [navigation, handleResize])

  const ref: MutableRefObject<HTMLDivElement> = useClickAway(e => {
    const target = e.target as Element
    if (!target.classList.contains('main-nav')) {
      handleActiveItem('')
    }
  })
  return (
    <div className={`fixed left-0 top-[${navigationHeight}px] w-full`}>
      <div
        className={`mega-menu h-[100px] bg-cover bg-bottom bg-no-repeat py-[40px] md:top-[65px] md:min-h-[170px] ${classes}`}
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
        ref={ref}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
          <div className="flex flex-1 justify-around md:mt-[24px] md:flex-col md:gap-[10px] sm:mt-0">
            {parentItem ? (
              <div className="flex flex-col" key={parentItem.label}>
                <Link
                  className="links-sub-nav text-white hover:text-lightBlue"
                  href={parentItem?.url || ''}
                >
                  {`${parentItem.label} Overview`}
                </Link>
              </div>
            ) : null}
            {subItems?.map(subItem => (
              <Link
                href={subItem?.url || ''}
                className="links-sub-nav hover:text-green mb-[10px] flex capitalize text-white"
                key={subItem?.label}
              >
                {subItem?.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
