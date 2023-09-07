import Link from 'next/link'
import Separator from 'assets/imgs/separator.svg'

export const AboutFooter = ({ subItems, classlist = '' }) => (
  <div className={`md:mt-[20px] ${classlist}`}>
    <h4 className="sub-nav mb-[20px] font-bold	text-white md:hidden">About</h4>
    <Separator className="mb-[20px] h-[1.5px] w-[40px] text-white md:hidden" />
    <div className="flex flex-col">
      {subItems?.map((subItem, i) => (
        <Link
          key={subItem?.title}
          href={subItem.url?.url || ''}
          className="md:p-regular mb-[12px] cursor-pointer text-[15px] font-semibold leading-[110%] tracking-[-0.01em] text-white"
        >
          {subItem.title}
        </Link>
      ))}
      S
    </div>
    <Link className="mt-[20px] block font-bold" href="/">
      Home
    </Link>
  </div>
)
