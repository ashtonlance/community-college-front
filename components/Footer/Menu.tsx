import Link from 'next/link'
import Separator from 'assets/imgs/separator.svg'

export const Menu = ({ subItems, classlist = '', label = '' }) => {
  const url = subItems[0]?.url
  const children = subItems[0]?.children

  return (
    <div className={`md:mt-[20px] ${classlist}`}>
      <h4 className="sub-nav mb-[20px] font-condensed text-lg	text-white hover:text-lightBlue md:text-center">
        <Link href={url}>{label}</Link>
      </h4>
      <div className="flex flex-col gap-y-2">
        {children?.map((subItem, i) => {
          return (
            <Link
              key={subItem?.label}
              href={subItem.url?.url || ''}
              className="md:p-regular cursor-pointer text-[15px] font-semibold leading-[110%] tracking-[-0.01em] text-lightBlue hover:text-white md:text-center"
            >
              {subItem.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
