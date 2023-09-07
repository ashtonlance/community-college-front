import Link from 'next/link'
import Separator from 'assets/imgs/separator.svg'

export const ResourcesFooter = ({ classlist = '', subItems }) => {
  return (
    <div className={`md:mt-[20px] ${classlist}`}>
      <h4 className="sub-nav mb-[20px] font-bold	text-white md:hidden">
        Resources
      </h4>
      <Separator className="mb-[20px] h-[1.5px] w-[40px] text-white md:hidden" />
      {subItems?.map(subItem => (
        <div className="flex flex-col" key={subItem.label}>
          <Link
            className="md:p-regular mb-[12px] cursor-pointer text-[15px] font-semibold leading-[110%] tracking-[-0.01em] text-white"
            href={subItem.pageLink?.url || ''}
          >
            {subItem.label}
          </Link>
        </div>
      ))}
    </div>
  )
}
