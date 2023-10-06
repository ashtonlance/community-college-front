import {
  BackgroundColorType,
  MarginSizesType,
} from 'components/TestimonialSlider'
import { FeaturesCard } from './FeaturesCard'

type FeaturesAndBenefitsProps = {
  attributes: {
    data: {
      card: number
      background_color: BackgroundColorType
      component_spacing_bottom_spacing: MarginSizesType
      component_spacing_top_spacing: MarginSizesType
    }
  }
}

export const FeaturesAndBenefits = ({
  attributes,
}: FeaturesAndBenefitsProps) => {
  const cards = attributes.data.card
  const bgColorModule = attributes.data.background_color
  const marginBottom = attributes.data.component_spacing_bottom_spacing
  const marginTop = attributes.data.component_spacing_top_spacing
  const bgColorCard = bgColorModule == 'white' ? 'bg-grey' : 'bg-white'

  return (
    <div
      className={`features-and-benefits px-[100px] md:px-[60px] sm:mx-auto sm:w-full sm:px-[40px] module-spacing-top-${marginTop} module-spacing-bottom-${marginBottom} bg-${bgColorModule}`}
    >
      <div className="mx-auto flex max-w-[1220px] flex-wrap justify-between gap-[15px] md:flex-col md:items-center">
        {cards > 0 &&
          [...Array(cards).keys()].map(card => (
            <FeaturesCard
              bgColor={bgColorCard}
              key={card}
              heading={attributes.data[`card_${card}_heading`]}
              image={attributes.data[`card_${card}_image`] || null}
              content={attributes.data[`card_${card}_body_copy`]}
              size={cards}
              alignment={attributes.data[`card_${card}_text_alignment`]}
              cardStyle={attributes.data[`card_${card}_card_style`]}
              optionalLink={attributes.data[`card_${card}_optional_link`]}
            />
          ))}
      </div>
    </div>
  )
}

FeaturesAndBenefits.displayName = 'nextword/featuresandbenefits'
