import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'utils/index'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import { formatDate } from 'utils/dates'
type EventCardProps = {
  card: any
}
export const EventCard: React.FC<EventCardProps> = ({ card }) => {
  return (
    <div
      key={card}
      className={cn(
        `col-span-4 flex flex-col overflow-hidden rounded-xl md:col-span-6 sm:col-span-12 `
      )}
    >
      <div className="flex flex-1 flex-col">
        {card.featuredImage?.node?.sourceUrl ? (
          <Image
            src={card.featuredImage.node.sourceUrl}
            alt=""
            width={400}
            height={200}
            className="max-h-[200px] object-cover"
          />
        ) : null}
        <div className="flex flex-1 flex-col justify-between bg-white p-10">
          <div className="mb-[15px] flex items-center justify-center gap-2 ">
            {card.eventsCategories?.nodes.length > 0 && (
              <div className="body-regular font-bold text-darkGrey">
                {card.eventsCategories?.nodes[0]?.name}
              </div>
            )}
            <div> • </div>
            {card.eventDetails?.date && (
              <div className="body-regular font-bold text-darkGrey">
                {formatDate(card.eventDetails?.date)}
              </div>
            )}
          </div>
          <Link
            className="h3 mb-[15px] text-center font-serif text-[24px] hover:text-darkBeige"
            href={card?.uri || '/'}
          >
            {card?.title}
          </Link>
          {/* <div
            className="body-regular mb-[10px] text-darkGrey"
            dangerouslySetInnerHTML={{
              __html: card?.boardMember?.committeeAssignments,
            }}
          /> */}
          <Link
            className="group mx-auto flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
            href={card?.uri || '/'}
          >
            View Event
            <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
          </Link>
        </div>
      </div>
    </div>
  )
}
