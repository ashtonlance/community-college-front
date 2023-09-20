import Link from 'next/link'

type ResourceMenuProps = {
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
}

export const ResourcesMenu = ({
  subItems,
  classes,
  handleActiveItem,
}: ResourceMenuProps) => (
  <div className="semi-modal">
    <div
      onMouseLeave={() => handleActiveItem('')}
      className={`mega-menu  md:top-0 ${classes}`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        <div className="border-r-solid flex flex-1 justify-around border-r-[1.5px] border-r-gmt-400 md:flex-col md:border-0 md:text-left">
          {subItems?.map(subItem => (
            <div
              className="mb-[40px] flex flex-col pr-[40px]"
              key={subItem.title}
            >
              <Link
                className="p-small mb-[24px] text-gmt-300"
                href={subItem?.url?.url || ''}
              >
                {subItem.title}
              </Link>
              {subItem.resourcesLinks.map(link => (
                <Link
                  key={link.label}
                  className="links-sub-nav mb-[10px] text-white"
                  href={link.pageLink?.url || ''}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)
