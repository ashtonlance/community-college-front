import Link from 'next/link'
import { cn } from 'utils'

type AboutMenuProps = {
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
}

export const AboutMenu = ({
  subItems,
  classes = '',
  handleActiveItem,
}: AboutMenuProps) => {
  return (
    <div className="semi-modal">
      <div
        // onMouseLeave={() => handleActiveItem('')}
        className={cn(
          `mega-menu h-[100px] py-[40px] md:top-[65px] md:min-h-[170px] ${classes}`
        )}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
          <div className="flex flex-1 justify-around md:mt-[24px] md:flex-col md:gap-[10px] sm:mt-0">
            {subItems?.map(subItem => {
              return (
                <Link
                  href={subItem?.url || ''}
                  className="links-sub-nav mb-[10px] flex capitalize text-white"
                  key={subItem?.label}
                >
                  {subItem?.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
