import Link from "next/link";
import arrow from "../../assets/icons/arrow-go.svg";
import Image from "next/image";

export const Login = () => {
  return (
    <>
      <h3 className="mb-[40px]"> Login </h3>
      <div className="flex gap-[20px] sm:flex-col">
        <Link href="https://customer.greenmountaintechnology.com/">
          <div className="w-[235px] md:w-[180px] h-[178px] sm:h-[150px] sm:w-[230px] bg-gmt-200 flex flex-col justify-center items-center gap-[20px]">
            <div className="rounded-full bg-gmt-400 h-[32px] w-[32px]"></div>
            <h4>Customer</h4>
            <Image alt="" src={arrow} />
          </div>
        </Link>
        <Link href="https://carrier.greenmountaintechnology.com/">
          <div className="w-[235px] md:w-[180px] h-[178px] sm:h-[150px] sm:w-[230px] bg-gmt-200 flex flex-col justify-center items-center gap-[20px]">
            <div className="rounded-full bg-gmt-400 h-[32px] w-[32px]"></div>
            <h4>Carrier</h4>
            <Image alt="" src={arrow} />
          </div>
        </Link>
      </div>
    </>
  );
};
