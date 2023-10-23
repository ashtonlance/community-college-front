import Link from 'next/link'
import { cn } from 'utils'
import bg from 'assets/imgs/angled-bg-menu.jpg'
import Image from 'next/image'

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
  return (
    <div className="semi-modal bg-transparent">
      <div
        // onMouseLeave={() => handleActiveItem('')}
        className={cn(
          `mega-menu relative h-[100px] py-[40px] md:top-[65px] md:min-h-[170px] ${classes} bg-transparent`
        )}
      >
        <div className="z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between">
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
