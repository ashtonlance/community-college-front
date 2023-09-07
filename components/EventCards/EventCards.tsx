import { Card } from './Card'

export const EventCards = props => {
  const eventPosts = props?.events?.nodes
  const cards = eventPosts?.map(
    post =>
      post?.blocks?.find(
        postBlock =>
          postBlock?.name === 'nextword/externalevent' ||
          postBlock?.name === 'nextword/heroevent'
      )
  )

  return (
    <div
      className={`mx-auto my-[40px] flex w-[90%] max-w-[1220px] flex-col items-center sm:my-[32px]`}
    >
      <div
        className={`${
          cards.length === 1
            ? 'mx-auto max-w-[600px]'
            : 'grid grid-flow-row grid-cols-2 gap-[20px] md:grid-cols-1'
        } w-full`}
      >
        {cards.map(card => (
          <Card
            key={card?.attributes?.data?.heading}
            date={card?.attributes?.data?.date}
            location={card?.attributes?.data?.location}
            title={card?.attributes?.data?.heading}
            description={card?.attributes?.data?.description}
            btnLink={card?.attributes?.data?.cta_button_link}
            btnText={card?.attributes?.data?.cta_button_label}
            image={card?.attributes?.data?.background_image}
            color={card?.attributes?.data?.background_color}
            tag={card?.attributes?.data?.event_type}
            boothTime={card?.attributes?.data?.booth_time}
            boothNumber={card?.attributes?.data?.booth_no}
          />
        ))}
      </div>
    </div>
  )
}
