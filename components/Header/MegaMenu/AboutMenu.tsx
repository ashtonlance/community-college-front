import Link from 'next/link'

type AboutMenuProps = {
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
}

export const AboutMenu = ({
  subItems,
  classes,
  handleActiveItem,
}: AboutMenuProps) => {
  return (
    <div className="semi-modal">
      <div
        onMouseLeave={() => handleActiveItem('')}
        className={`mega-menu h-[100px] py-[40px] md:top-[65px] md:min-h-[170px] ${classes}`}
      >
        <div className="flex justify-between max-w-[1600px] w-full items-center mx-auto">
          <div className="flex justify-around flex-1 md:flex-col md:gap-[10px] md:mt-[24px] sm:mt-0">
            {subItems?.map(subItem => (
              <Link
                href={subItem?.url?.url}
                className="flex links-sub-nav text-white mb-[10px] capitalize"
                key={subItem?.title}
              >
                {subItem?.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
