import Link from 'next/link'
import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'

export const ResourcesFooter = ({ classlist = '', subItems }) => {
  return (
    <div className={`md:mt-[20px] ${classlist}`}>
      <h4 className="text-white sub-nav font-bold	mb-[20px] md:hidden">
        Resources
      </h4>
      <Image
        alt="resources"
        src={separator}
        width={40}
        height={1.5}
        className="mb-[20px] md:hidden"
      />
      {subItems?.map(subItem => (
        <div className="flex flex-col" key={subItem.label}>
          <Link
            className="cursor-pointer text-[15px] font-semibold tracking-[-0.01em] leading-[110%] text-white mb-[12px] md:p-regular"
            href={subItem.pageLink?.url || ''}
          >
            {subItem.label}
          </Link>
        </div>
      ))}
    </div>
  )
}
