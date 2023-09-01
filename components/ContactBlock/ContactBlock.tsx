import Image from "next/image";
import separator from "../../assets/imgs/separator.svg";
import Link from "next/link";

export const ContactBlock = ({ attributes }) => {
  const title = attributes.data.title;
  const address = attributes.data.address;
  const map = attributes.data.map;
  const directionsLink = attributes.data.directions_link || "";

  return (
    <div className="gap-[80px] md:gap-[40px] sm:flex-col max-w-[1220px] w-[90%] mx-auto h-fit max-h-[320px] sm:max-h-fit my-[40px] flex">
      <div className="flex flex-col w-[50%] gap-[32px] sm:w-full md:mx-auto">
        <h3>{title}</h3>
        <Image alt="" src={separator} width={40} height={1.5} className="" />
        <h4>{address}</h4>
        {directionsLink && (
          <Link
            href={directionsLink}
            className="secondary-btn text-gmt-500 border-[1.5px] border-gmt-500 border-solid w-fit"
          >
            Get Directions
          </Link>
        )}
      </div>
      <div
        className="w-[50%] overflow-hidden sm:w-full sm:max-h-[300px] lg:max-h-[321px]"
        dangerouslySetInnerHTML={{ __html: map }}
      />
    </div>
  );
};

ContactBlock.displayName = "nextword/contactblock";
