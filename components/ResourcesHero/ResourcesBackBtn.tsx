import Image from 'next/image'
import arrowleft from '../../assets/icons/arrow-left.svg'
import Link from 'next/link'

export const ResourcesBackBtn = () => {
  return (
    <Link
      href="/all-resources"
      className="absolute top-0 right-0 flex gap-[10px] text-gmt-500 border-[1.5px] border-gmt-500 rounded-[3px] px-[10px] py-[5px] font-bold text-[12px] sm:relative sm:w-fit sm:mb-[20px]"
    >
      <Image alt="" src={arrowleft} width={6} height={6} />
      Back to All Resources
    </Link>
  )
}
