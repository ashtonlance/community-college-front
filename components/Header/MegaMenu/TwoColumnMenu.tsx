import Link from 'next/link'
import { cn } from 'utils'

type TwoColumnMenuProps = {
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
  parentItem?: any
}

export const TwoColumnMenu = ({
  subItems,
  classes,
  handleActiveItem,
  parentItem,
}: TwoColumnMenuProps) => {
  return (
    <div className="semi-modal">
      <div
        // onMouseLeave={() => handleActiveItem('')}
        className={cn(`mega-menu md:top-0 ${classes}`)}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
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
                        secondaryLinks ? 'mb-[14px]' : null
                      } text-white hover:text-lightBlue`
                    )}
                    href={subItem?.url || ''}
                  >
                    {subItem.label}
                  </Link>

                  <>
                    {secondaryLinks &&
                      subItem?.children?.map((child: any) => (
                        <Link
                          className="mb-1 text-sm leading-relaxed text-lightBlue hover:text-white"
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

          <div className="flex w-[35%] flex-col gap-8 pl-[80px] text-center md:hidden">
            <span className="h3 text-white">
              Need help finding the right program?
            </span>
            <Link
              href="/programs"
              className="secondary-btn mx-auto max-w-xs hover:bg-white"
            >
              Use Our Program Finder
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
