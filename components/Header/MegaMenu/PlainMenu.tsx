import Link from 'next/link'
import useWindowDimensions from 'utils/hooks/useWindowDimensions'
import bg from 'assets/imgs/angled-bg-menu.jpg'
import { useClickAway } from '@uidotdev/usehooks'
import { useEffect, useState, MutableRefObject } from 'react'
type PlainMenuProps = {
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
}

export const PlainMenu = ({
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
  const handleResize = () => {
    setNavigationHeight(navigation.clientHeight)
  }

  useEffect(() => {
    if (navigation.clientHeight > 190) {
      setNavigationHeight(200)
    } else {
      setNavigationHeight(140)
    }
    window.addEventListener('resize', handleResize, false)
  }, [navigation])

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
