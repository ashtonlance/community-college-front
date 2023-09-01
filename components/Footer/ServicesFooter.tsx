import Link from "next/link";
import Image from "next/image";
import separator from "../../assets/imgs/separator.svg";

export const ServicesFooter = ({ classlist = "", subItems }) => (
  <div className={`md:mt-[20px] ${classlist}`}>
    <h4 className="text-white sub-nav font-bold	mb-[20px] md:hidden">
      {" "}
      Services{" "}
    </h4>
    <Image
      alt=""
      src={separator}
      width={40}
      height={1.5}
      className="mb-[20px] md:hidden"
    />
    {subItems?.map((subItem) => (
      <div className="flex flex-col" key={subItem.title}>
        <Link
          className="cursor-pointer text-[15px] font-semibold tracking-[-0.01em] leading-[110%] text-white mb-[12px] md:p-regular"
          href={subItem?.url?.url || ""}
        >
          {subItem.title.replace("&amp;", "&")}
        </Link>
      </div>
    ))}
  </div>
);
