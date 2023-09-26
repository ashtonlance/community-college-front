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

  console.log({attributes})

  return (
    <div
      className={cn(
        `bg-${backgroundColor} module-spacing-top-${top} module-spacing-bottom-${bottom} p-0 sm:mx-auto sm:w-full`
      )}
    >
      <div className="px-[100px] md:px-[60x] sm:px-[40px] flex flex-wrap justify-between gap-[20px] md:flex-col md:items-center">
        {cards > 0 &&
          [...Array(cards).keys()].map(card => {
            return (
              <div
                key={card}
                className={cn(
                  `${cards == 1 && 'grow'} ${
                    cards == 2 && 'w-[calc(50%-10px)]'
                  } ${cards > 2 && 'w-[calc(33%-10px)]'} ${cardColor}
                  overflow-hidden rounded-xl text-center md:w-full sm:p-[32px]`
                )}
              >
                {attributes.data[`card_${card}_image`].url ? (
                  <Image
                    src={attributes.data[`card_${card}_image`].url}
                    alt=""
                    width={400}
                    height={200}
                    className='w-full h-[200px] object-cover'
                  />
                ) : null}
                <div className="flex flex-col px-10 py-[50px]">
                  <h3>{attributes.data[`card_${card}_heading`]}</h3>
                  <div
                    className="body-large mb-[32px] text-gmt-500"
                    dangerouslySetInnerHTML={{
                      __html: attributes.data[`card_${card}_body_copy`],
                    }}
                  />
                  <Link
                    className="secondary-btn outline-btn navy mx-auto py-[14px]"
                    href={attributes.data[`card_${card}_button_url`]}
                  >
                    {attributes.data[`card_${card}_button_label`]}
                  </Link>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

GeneralCards.displayName = 'nextword/generalcards'
