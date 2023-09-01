import Link from "next/link";
import { GuideLine } from "../AnimatedLines/GuideLine";
import Image from "next/image";
export type HeroPropsType = {
  bgColor?: string;
  bgImg?: string;
  subheading?: string;
  description?: string;
  heading: string;
  ctaLabel?: string;
  ctaURL?: string;
  bgPosition?: string;
};

export const HomeHero = ({
  bgColor,
  bgImg,
  subheading,
  description,
  heading,
  ctaLabel,
  ctaURL,
  bgPosition,
}: HeroPropsType) => {
  return (
    <div
      className={`flex items-center h-full pt-[240px] md:pt-[180px] sm:pt-[100px] pb-[150px] md:pb-[100px] sm:pb-[60px] sm:flex sm:justify-center sm:items-center bg-cover bg-no-repeat`}
      style={{
        backgroundColor: !bgImg && bgColor,
      }}
      suppressHydrationWarning
    >
      {bgImg && (
        <Image
          src={bgImg}
          alt=""
          fill
          className={`object-cover object-${bgPosition} z-0`}
          priority
        />
      )}
      <div
        className="top-0 left-0 right-0 bottom-0 w-full absolute"
        style={{
          backgroundImage: `radial-gradient(13.02% 27.98% at 93.08% 79.69%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(35.95% 35.95% at 39.06% 64.05%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(84.11deg, rgba(0, 0, 0, 0.5) 2.71%, rgba(0, 0, 0, 0) 58.68%)`,
        }}
      ></div>
      <div className="landing-hero-text relative w-[55%] ml-[15%] mr-[30%] flex flex-col md:w-full md:mx-[100px] sm:mx-[40px]">
        {subheading && (
          <div className="flex gap-[15px] items-center">
            <GuideLine />
            <h2 className="text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}
        <h1 className="text-white home-h1">{heading}</h1>

        {description && <p className="body-large text-white">{description}</p>}

        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
            className="green-btn mt-[60px] md:mt-[50px] sm:mt-[40px] hover:bg-white flex text-white w-fit"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
};
