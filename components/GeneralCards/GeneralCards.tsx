import Image from 'next/image'
import {
  BackgroundColorType,
  MarginSizesType,
} from 'components/TestimonialSlider'
import { cn } from 'utils'
import Link from 'next/link'

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
  const cardColor = backgroundColor === 'white' ? 'bg-grey' : 'bg-white';

  return (
    <div
      className={cn(
        `bg-${backgroundColor} module-spacing-top-${top} module-spacing-bottom-${bottom} sm:mx-auto sm:w-full`
      )}
    >
      <div className="mx-auto w-[90%] max-w-[1220px] flex flex-wrap justify-center gap-[20px] md:flex-col md:items-center">
        {cards > 0 &&
          [...Array(cards).keys()].map(card => {
            const image_position = attributes.data[`card_${card}_image_position`]
            return (
              <div
                key={card}
                className={cn(
                  `${cards == 1 && 'grow'} ${
                    cards == 2 && 'w-[calc(50%-10px)]'
                  } ${cards > 2 && 'flex-1 min-w-[30%] md:max-w-none max-w-[33.33%]'} ${cardColor}
                  overflow-hidden rounded-xl text-center md:w-full sm:p-[32px] flex flex-col`
                )}
              >
                {attributes.data[`card_${card}_image`].url ? (
                  <Image
                    src={attributes.data[`card_${card}_image`].url}
                    alt=""
                    width={400}
                    height={200}
                    className={cn(
                      `w-full sm:mb-8 mb-0 sm:h-[200px] md:h-[350px] h-[300px] object-cover object-${image_position}`
                    )}
                  />
                  ) : null}
                  <div className={cn(
                        `flex flex-col sm:p-0 md:p-10 px-10 py-[50px] flex-1`
                      )}
                  >
                  <h3>{attributes.data[`card_${card}_heading`]}</h3>
                  <div
                    className="body-large text-gmt-500"
                    dangerouslySetInnerHTML={{
                      __html: attributes.data[`card_${card}_body_copy`],
                    }}
                  />
                  {attributes.data[`card_${card}_button_url`] &&  attributes.data[`card_${card}_button_label`] ? (
                    <div className="mt-auto">
                    <Link
                      className="secondary-btn outline-btn navy mx-auto py-[14px] mt-8"
                      href={attributes.data[`card_${card}_button_url`]}
                    >
                      {attributes.data[`card_${card}_button_label`]}
                    </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

GeneralCards.displayName = 'nextword/generalcards'
