import Link from 'next/link'
import Separator from 'assets/imgs/separator.svg'

export const Menu = ({ subItems, classlist = '', label = '' }) => {
  const url = subItems[0]?.url
  const children = subItems[0]?.children
  const footerLinks = classlist?.includes('footer-links-headline')

  return (
    <div className={`md:mt-[20px] ${classlist}`}>
      <h4
        className={`${
          footerLinks
            ? 'footer-links-headline'
            : 'sub-nav mb-[20px] font-condensed text-lg text-white hover:text-lightBlue md:mb-[12px] md:text-center sm:mb-[8px]'
        }`}
      >
        <Link href={url ?? ''}>{label}</Link>
      </h4>
      <div className="flex flex-col gap-y-2">
        {children?.map((subItem, i) => {
          return (
            <Link
              key={subItem?.label}
              href={subItem.url || ''}
              className="cursor-pointer font-sans text-[12px] font-normal leading-[140%] text-lightBlue hover:text-white md:text-center md:text-[11px] sm:text-[8px]"
            >
              {subItem.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
