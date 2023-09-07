import Link from 'next/link'

type ServicesMenuProps = {
  subItems: any
  classes?: string
  handleActiveItem?: (id: string) => void
}

export const ServicesMenu = ({
  subItems,
  classes,
  handleActiveItem,
}: ServicesMenuProps) => (
  <div className="semi-modal">
    <div
      onMouseLeave={() => handleActiveItem('')}
      className={`mega-menu md:top-0 ${classes}`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        <div className="border-r-solid grid max-w-[75%] grid-cols-3 border-r-[1.5px] border-r-gmt-400 md:w-full md:max-w-full md:grid-cols-1 md:border-0">
          {subItems?.map(subItem => (
            <div
              className="mb-[40px] flex flex-col pr-[40px] md:mb-[32px] md:pr-0 sm:mb-[24px]"
              key={subItem.title}
            >
              <Link
                className="links-sub-nav mb-[10px] text-white"
                href={subItem?.url?.url || ''}
              >
                {subItem.title.replace('&amp;', '&')}
              </Link>
              <p className="p-regular max-w-[80%] text-gmt-300">
                {subItem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-[20%] pl-[40px] text-center md:hidden">
          <h4 className="mb-[32px] text-white">
            Not sure which tier is right for you?
          </h4>
          <button className="secondary-btn border-[1.5px] border-solid border-white">
            {' '}
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </div>
)
