import Link from "next/link";
import linkedinUser from "../../assets/icons/linkedinUser.svg";
import Image from "next/image";

export const Member = ({ img, name, job, linkedinURL, email }) => {
  return (
    <div className={`${email ? " bg-white" : " bg-gmt-100"} flex flex-col`}>
      <div
        className="h-[300px] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${img})`,
        }}
      ></div>
      <div className="flex flex-col gap-[10px] items-start justify-center p-[32px]">
        <div className="flex justify-between items-center gap-[10px] w-full">
          <h4 className="">{name}</h4>
          <Link href={linkedinURL}>
            <Image
              alt=""
              src={linkedinUser}
              width={24}
              height={24}
              className="sm:mb-[32px]"
            />
          </Link>
        </div>
        <p className="body-large font-bold text-gmt-400">{job}</p>
        {email && (
          <Link
            href={`mailto:${email}`}
            className="secondary-btn bg-transparent border-[1.5px] border-solid border-gmt-500 mt-[1  0px] text-gmt-500"
          >
            Email
          </Link>
        )}
      </div>
    </div>
  );
};
