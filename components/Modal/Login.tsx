import Link from 'next/link'
import arrow from '../../assets/icons/arrow-go.svg'
import Image from 'next/image'

export const Login = () => {
  return (
    <>
      <h3 className="mb-[40px]"> Login </h3>
      <div className="flex gap-[20px] sm:flex-col">
        <Link href="https://customer.greenmountaintechnology.com/">
          <div className="flex h-[178px] w-[235px] flex-col items-center justify-center gap-[20px] bg-gmt-200 md:w-[180px] sm:h-[150px] sm:w-[230px]">
            <div className="h-[32px] w-[32px] rounded-full bg-gmt-400"></div>
            <h4>Customer</h4>
            <Image alt="" src={arrow} />
          </div>
        </Link>
        <Link href="https://carrier.greenmountaintechnology.com/">
          <div className="flex h-[178px] w-[235px] flex-col items-center justify-center gap-[20px] bg-gmt-200 md:w-[180px] sm:h-[150px] sm:w-[230px]">
            <div className="h-[32px] w-[32px] rounded-full bg-gmt-400"></div>
            <h4>Carrier</h4>
            <Image alt="" src={arrow} />
          </div>
        </Link>
      </div>
    </>
  )
}
