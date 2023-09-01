import Link from "next/link";
import border from "../../assets/imgs/white-border.svg";
import Image from "next/image";

export const EventHero = ({ attributes }) => {
  const bgColor = attributes.data.background_color;
  const bgImg = attributes.data.background_image;
  const ctaLabel = attributes.data.cta_button_label;
  const ctaURL = attributes.data.cta_button_link;
  const heading = attributes.data.heading;
  const subheading = attributes.data["sub-heading"];
  const description = attributes.data.description;
  const location = attributes.data.location || "";
  const dateRange = attributes.data.date;
  const booth = attributes.data.booth_no || "";

  return (
    <div
      className={`relative h-auto flex md:flex-col md:h-fit sm:justify-center sm:items-center `}
    >
      <div
        className={`w-[50%] md:w-full wrapper-default-inner-pages flex flex-col justify-center items-baseline bg-${bgColor}`}
      >
        {subheading && (
          <div className="flex gap-[15px] mb-[32px]">
            <Image alt="" src={border} width={40} height={1.5} />
            <h2 className="text-[16px] font-bold leading-[150%] text-white sm:text-[14px]">
              {subheading}
            </h2>
          </div>
        )}
        <h1 className="text-white mb-[32px]">{heading}</h1>
        <div className="body-large text-white">
          <span>{dateRange}</span> • <span> {location}</span>
          <div> {booth} </div>
        </div>
        {description && bgImg && (
          <p className="body-large text-white mb-[60px] md:mb-[20px]">
            {description}
          </p>
        )}

        {ctaURL && ctaLabel && (
          <Link
            href={ctaURL}
            className="primary-btn bg-white hover:bg-stone flex text-emerald w-fit"
            suppressHydrationWarning
          >
            {ctaLabel}
          </Link>
        )}
      </div>
      {bgImg ? (
        <div className="relative w-[50%] md:w-full flex flex-col justify-center items-baseline">
          <Image
            src={bgImg}
            alt=""
            width={600}
            height={600}
            className="object-cover h-full w-full"
          />
        </div>
      ) : (
        description && (
          <div className="w-[40%] md:w-full wrapper-default-inner-pages pl-0 md:pl-[60px] sm:pl-[40px] md:pt-0 flex flex-col justify-center items-baseline">
            <p className="body-large text-white md:mb-[20px]">{description}</p>
          </div>
        )
      )}
    </div>
  );
};

EventHero.displayName = "nextword/heroevent";
