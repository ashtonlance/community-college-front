import Link from 'next/link'
import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'

export const AboutFooter = ({ subItems, classlist = '' }) => (
  <div className={`md:mt-[20px] ${classlist}`}>
    <h4 className="text-white sub-nav font-bold	mb-[20px] md:hidden">About</h4>
    <Image
      alt=""
      src={separator}
      width={40}
      height={1.5}
      className="mb-[20px] md:hidden"
    />
    <div className="flex flex-col">
      {subItems?.map((subItem, i) => (
        <Link
          key={subItem?.title}
          href={subItem.url?.url || ''}
          className="cursor-pointer text-[15px] font-semibold tracking-[-0.01em] leading-[110%] text-white mb-[12px] md:p-regular"
        >
          {subItem.title}
        </Link>
      ))}
    </div>
    <Link className="block font-bold mt-[20px]" href="/">
      Home
    </Link>
  </div>
)
