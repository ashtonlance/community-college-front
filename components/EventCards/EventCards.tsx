import { Card } from './Card'

const extractDate = (input: string): string | null => {
  const regex = /<p>(.*?)<\/p>/
  const match = input.match(regex)
  return match ? match[1] : null
}

export const EventCards = props => {
  const cards = props?.attributes?.data?.event
  const bottomSpacing =
    props?.attributes?.data?.component_spacing_bottom_spacing
  const topSpacing = props?.attributes?.data?.component_spacing_top_spacing
  const heading = props?.attributes?.data?.heading
  const background = props?.attributes?.data?.background_color
  const cardColor = background === 'grey' ? 'bg-white' : 'bg-grey'
  
  return (
    <div className={`bg-${background}`}>
      <div
        className={`mx-auto flex w-[90%] max-w-[1220px] flex-col items-center module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}
      >
        {heading ? (
          <div className="mb-[60px] flex flex-col items-center md:mb-[50px] sm:mb-[32px]">
            <h3 className="h5">{heading}</h3>
          </div>
        ) : null}
        <div
          className={`${
            cards?.length === 1
              ? 'mx-auto max-w-[600px]'
              : 'grid grid-flow-row grid-cols-2 gap-[20px] md:grid-cols-1'
          } w-full`}
        >
          {cards?.map((card, i) => {
            return (
              <Card
                backgroundColor={cardColor}
                key={card?.post_title + i}
                date={extractDate(card?.post_content) ?? ''}
                title={card?.post_title}
                btnLink={`/events${card?.uri}`}
                btnText={'Read more'}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

EventCards.displayName = 'nextword/eventcards'
