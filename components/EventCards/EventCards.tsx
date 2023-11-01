import { Card } from './Card'

export const EventCards = props => {
  const cards = props?.attributes?.data?.event

  return (
    <div
      className={`mx-auto my-[40px] flex w-[90%] max-w-[1220px] flex-col items-center sm:my-[32px]`}
    >
      <div
        className={`${
          cards?.length === 1
            ? 'mx-auto max-w-[600px]'
            : 'grid grid-flow-row grid-cols-2 gap-[20px] md:grid-cols-1'
        } w-full`}
      >
        {cards?.map(card => {
          return (
            <Card
              key={card?.post_title}
              date={card?.post_date}
              title={card?.post_title}
              btnLink={`/events${card?.uri}`}
              btnText={'Read more'}
            />
          )
        })}
      </div>
    </div>
  )
}

EventCards.displayName = 'nextword/eventcards'
