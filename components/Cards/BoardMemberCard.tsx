import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'utils/index'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'

type BoardMemberCardProps = {
  card: any
}
export const BoardMemberCard: React.FC<BoardMemberCardProps> = ({ card }) => {
  return (
    <div
      key={card}
      className={cn(
        `col-span-3 flex flex-col overflow-hidden rounded-xl md:col-span-6 sm:col-span-12 `
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
          {card.boardMember?.appointment && (
            <div className="mb-1 text-[18px] font-bold text-darkGrey">
              {card.boardMember?.appointment}
            </div>
          )}
          <Link
            className="h3 mb-[15px] font-condensed text-[24px] hover:text-darkBeige"
            href={card?.uri || '/'}
          >
            {card.boardMember?.name}          
          </Link>
          <div
            className="body-regular mb-[10px] text-darkGrey"
            dangerouslySetInnerHTML={{
              __html: card?.boardMember?.committeeAssignments,
            }}
          />
          <Link
            aria-label={"Read about " + card.boardMember?.name}
            className="group flex items-center gap-x-2 font-condensed text-lg font-bold tracking-[-0.18px] text-darkGrey hover:text-navy"
            href={card?.uri || '/'}
          >
            Read Bio
            <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
          </Link>
        </div>
      </div>
    </div>
  )
}