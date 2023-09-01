import Image from "next/image";
import { FadeIn } from "components/FadeIn";
import { Center } from "components/AnimatedLines/Center";

export const StatsBlock = ({ attributes }) => {
  const title = attributes.data.stats_title;
  const copy = attributes.data.stats_copy;
  const items = attributes.data.stats;
  const splitTitle = title.split("-");

  return (
    <FadeIn>
      <div className="flex flex-col p-[80px] justify-center sm:p-[40px] items-center bg-emerald gap-y-[50px] sm:gap-y-[10px]">
        {splitTitle.length > 1 ? (
          <div className="flex gap-[15px] items-center">
            <h5 className="text-[16px] sm:text-[14px] font-bold leading-[150%] text-white  text-center">
              {splitTitle[0]}
            </h5>
            <Center className="" />
            <h5 className="text-[16px] sm:text-[14px] font-bold leading-[150%] text-white text-center">
              {splitTitle[1]}
            </h5>
          </div>
        ) : (
          <h5 className="text-[16px] sm:text-[14px] font-bold leading-[150%] text-white text-center">
            {title}
          </h5>
        )}
        {copy && (
          <div className="flex flex-col items-center">
            <p className="body-large text-white text-center">{copy}</p>
          </div>
        )}
        <div className="flex gap-[100px] flex-wrap justify-center sm:flex-col sm:gap-0">
          {items > 0 &&
            [...Array(items).keys()].map((val) => (
              <div
                key={val}
                className="flex flex-col gap-[10px] items-center justify-center"
              >
                <h3 className="home-h1 text-white mb-[20px] sm:mb-0">
                  {attributes.data[`stats_${val}_number`]}
                </h3>
                <h4 className=" text-sky">
                  {attributes.data[`stats_${val}_explainer_text`]}
                </h4>
              </div>
            ))}
        </div>
      </div>
    </FadeIn>
  );
};

StatsBlock.displayName = "nextword/stats";
