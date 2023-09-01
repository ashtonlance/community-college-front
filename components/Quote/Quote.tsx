import Image from "next/image";
import quote from "../../assets/imgs/quote.svg";
import { WordPressBlocksViewer } from "@faustwp/blocks";

export const Quote = (props) => {
  const quoteMessage = props.dynamicContent;

  return (
    <div className="flex flex-col justify-center items-center flex-shrink-0 flex-grow-0 basis-full">
      <Image src={quote} alt="" width={30} height={65} className="mb-[20px]" />
      <div
        className="body-large font-bold mb-[40px] text-center"
        dangerouslySetInnerHTML={{ __html: quoteMessage }}
      />
    </div>
  );
};

Quote.displayName = "core/quote";
