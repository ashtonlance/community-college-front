import Image from 'next/image'
import arrowleft from '../../assets/icons/arrow-left.svg'
import Link from 'next/link'

export const ResourcesBackBtn = () => {
  return (
    <Link
      href="/all-resources"
      className="absolute right-0 top-0 flex gap-[10px] rounded-[3px] border-[1.5px] border-gmt-500 px-[10px] py-[5px] text-[12px] font-bold text-gmt-500 sm:relative sm:mb-[20px] sm:w-fit"
    >
      <Image alt="" src={arrowleft} width={6} height={6} />
      Back to All Resources
    </Link>
  )
}
