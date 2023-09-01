import Image from "next/image";
import separator from "../../assets/imgs/separator.svg";
import {
  BackgroundColorType,
  MarginSizesType,
} from "components/TestimonialSlider";

type GeneralCardsProps = {
  attributes: {
    data: {
      card: number;
      background_color: BackgroundColorType;
      module_margin_bottom_spacing: MarginSizesType;
      module_margin_top_spacing: MarginSizesType;
    };
  };
};

export const GeneralCards = ({ attributes }: GeneralCardsProps) => {
  const cards = attributes.data.card;
  const backgroundColor = attributes.data.background_color;
  const top = attributes.data.module_margin_top_spacing;
  const bottom = attributes.data.module_margin_bottom_spacing;

  return (
    <div
      className={`module-color-${backgroundColor} module-spacing-top-${top} module-spacing-bottom-${bottom} p-0 sm:w-full sm:mx-auto`}
    >
      <div className="max-w-[1220px] flex justify-between flex-wrap gap-[20px] mx-auto md:flex-col md:px-[60px] sm:px-[40px] md:items-center">
        {cards > 0 &&
          [...Array(cards).keys()].map((card) => (
            <div
              key={card}
              className={` ${cards == 1 && "grow"} ${
                cards == 2 && "w-[calc(50%-10px)]"
              } ${cards > 2 && "w-[calc(33%-10px)]"} module-color-${
                attributes.data[`card_${card}_card_background`]
              } p-[60px] sm:p-[32px] text-center md:w-full`}
            >
              <h3>{attributes.data[`card_${card}_heading`]}</h3>
              <Image
                alt="resources"
                src={separator}
                width={40}
                height={1.5}
                className="my-[20px] mx-auto"
              />
              <div
                className="mb-[32px] body-large text-gmt-500"
                dangerouslySetInnerHTML={{
                  __html: attributes.data[`card_${card}_body_copy`],
                }}
              />
              <a
                className="bg-gmt-300 primary-btn py-[14px]"
                href={attributes.data[`card_${card}_button_url`]}
              >
                {attributes.data[`card_${card}_button_label`]}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

GeneralCards.displayName = "nextword/generalcards";
