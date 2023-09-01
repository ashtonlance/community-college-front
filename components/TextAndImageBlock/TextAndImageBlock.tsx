import Image from "next/image";
import separator from "../../assets/imgs/separator.svg";
import { getHeadingTag } from "../../utils/headingType";

export const TextAndImageBlock = ({ attributes }) => {
  const title = attributes.data.title;
  const headingContent = attributes.data.heading;
  const headingSize = attributes.data.heading_size;
  const heading = getHeadingTag(headingSize, headingContent);
  const text = attributes.data.body_copy;
  const img = attributes.data.image.url;
  const imgPosition = attributes.data.image_position;
  const bottomSpacing = attributes.data.component_spacing_bottom_spacing;
  const topSpacing = attributes.data.component_spacing_top_spacing;

  return (
    <div
      className={`px-[100px] md:px-[60px] sm:px-[40px] module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}
    >
      <div
        className={`gap-[80px] max-w-[1220px] w-full mx-auto h-[550px] my-[40px] flex ${
          imgPosition.includes("right") && "flex-row-reverse"
        } md:gap-[60px] md:flex-col md:h-fit`}
      >
        <div
          style={{
            backgroundImage: `url(${img})`,
          }}
          className="bg-contain bg-center bg-no-repeat w-[50%] md:w-full md:h-[400px] md:bg-cover"
        >
          {" "}
        </div>
        <div className="flex flex-col w-[50%] justify-center md:w-[90%] sm:w-full md:mx-auto">
          <p className="body-large font-bold mb-[32px]">{title}</p>
          <span className="mb-[32px]">{heading}</span>
          <div
            className="body-regular text-gmt-400"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <Image
            alt=""
            src={separator}
            width={40}
            height={1.5}
            className="mt-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

TextAndImageBlock.displayName = "nextword/textandimage";
