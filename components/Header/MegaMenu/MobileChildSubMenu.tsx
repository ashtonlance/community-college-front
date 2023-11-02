import Link from 'next/link'
import { cn } from 'utils'
import useWindowDimensions from 'utils/hooks/useWindowDimensions'
type MobileChildSubMenuProps = {
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
}

export const MobileChildSubMenu = ({
  subItems,
  classes = '',
  handleActiveItem,
}: MobileChildSubMenuProps) => {
  const { width } = useWindowDimensions()
  let wrapperClasses

  if (width < 1080) {
    wrapperClasses = `top-[110px] left-0 absolute w-full`
  } else {
    wrapperClasses = `semi-modal`
  }
  return (
    <div className={wrapperClasses}>
      <div
        className={cn(
          `mega-menu relative h-[100px] py-[40px] md:top-[65px] md:min-h-[170px] ${classes} bg-transparent`
        )}
      >
        <div className="z-30 mx-auto flex w-full max-w-[1600px] items-center justify-between">
          <div className="flex flex-1 justify-around md:mt-[24px] md:flex-col md:gap-[14px] sm:mt-0">
            {subItems?.map((subItem, i) => {
              return (
                <>
                  <Link
                    href={subItem?.url || ''}
                    className="links-sub-nav flex text-[20px] capitalize text-white"
                    key={subItem?.url + i}
                  >
                    {subItem?.label}
                  </Link>
                  {subItem?.children?.map(subItemChild => {
                    return (
                      <Link
                        href={subItemChild?.url || ''}
                        className="links-sub-nav flex font-sans text-sm font-normal capitalize leading-[100%] text-lightBlue"
                        key={subItemChild?.label + i}
                      >
                        {subItemChild?.label}
                      </Link>
                    )
                  })}
                </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
