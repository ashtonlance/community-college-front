import Link from 'next/link'
import { cn } from 'utils'

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
    <div className="semi-modal">
      <div
        // onMouseLeave={() => handleActiveItem('')}
        className={cn(
          `mega-menu h-[100px] py-[40px] md:top-[65px] md:min-h-[170px] ${classes}`
        )}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
          <div className="flex flex-1 justify-around md:mt-[24px] md:flex-col md:gap-[14px] sm:mt-0">
            {subItems?.map(subItem => {
              return (
                <>
                  <Link
                    href={subItem?.url || ''}
                    className="links-sub-nav text-[20px] flex capitalize text-white"
                    key={subItem?.label}
                  >
                    {subItem?.label}
                  </Link>
                  {subItem?.children?.map(subItemChild => {
                    return (
                      <Link
                        href={subItemChild?.url || ''}
                        className="links-sub-nav flex capitalize text-lightBlue text-sm leading-[100%] font-sans font-normal"
                        key={subItemChild?.label}
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
