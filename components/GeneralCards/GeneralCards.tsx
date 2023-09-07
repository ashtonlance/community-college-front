import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'
import {
  BackgroundColorType,
  MarginSizesType,
} from 'components/TestimonialSlider'

type GeneralCardsProps = {
  attributes: {
    data: {
      card: number
      background_color: BackgroundColorType
      module_margin_bottom_spacing: MarginSizesType
      module_margin_top_spacing: MarginSizesType
    }
  }
}

export const GeneralCards = ({ attributes }: GeneralCardsProps) => {
  const cards = attributes.data.card
  const backgroundColor = attributes.data.background_color
  const top = attributes.data.module_margin_top_spacing
  const bottom = attributes.data.module_margin_bottom_spacing

  return (
    <div
      className={`module-color-${backgroundColor} module-spacing-top-${top} module-spacing-bottom-${bottom} p-0 sm:mx-auto sm:w-full`}
    >
      <div className="mx-auto flex max-w-[1220px] flex-wrap justify-between gap-[20px] md:flex-col md:items-center md:px-[60px] sm:px-[40px]">
        {cards > 0 &&
          [...Array(cards).keys()].map(card => (
            <div
              key={card}
              className={` ${cards == 1 && 'grow'} ${
                cards == 2 && 'w-[calc(50%-10px)]'
              } ${cards > 2 && 'w-[calc(33%-10px)]'} module-color-${
                attributes.data[`card_${card}_card_background`]
              } p-[60px] text-center md:w-full sm:p-[32px]`}
            >
              <h3>{attributes.data[`card_${card}_heading`]}</h3>
              <Image
                alt="resources"
                src={separator}
                width={40}
                height={1.5}
                className="mx-auto my-[20px]"
              />
              <div
                className="body-large mb-[32px] text-gmt-500"
                dangerouslySetInnerHTML={{
                  __html: attributes.data[`card_${card}_body_copy`],
                }}
              />
              <a
                className="primary-btn bg-gmt-300 py-[14px]"
                href={attributes.data[`card_${card}_button_url`]}
              >
                {attributes.data[`card_${card}_button_label`]}
              </a>
            </div>
          ))}
      </div>
    </div>
  )
}

GeneralCards.displayName = 'nextword/generalcards'
