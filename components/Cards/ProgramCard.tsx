import Link from 'next/link'
import { cn } from 'utils'
import { FadeIn } from '@/components/FadeIn'
export const ProgramCard = ({ card, index }) => {
  const collegesLength = card?.colleges?.length
  return (
    <FadeIn
      delay
      delayAmount={index / 10}
      key={card}
      classes={cn(
        `flex max-w-[400px] flex-col overflow-hidden rounded-xl md:w-full sm:p-[32px]`
      )}
    >
      <div className="flex flex-1 flex-col">
        <Link className="group flex flex-1 flex-col" href={card?.uri ?? ''}>
          <div className="flex flex-1 flex-col justify-between bg-grey p-10">
            <div className="h3 mb-5 text-[28px] group-hover:text-darkBeige">
              {card?.title}
            </div>
            <div className="mb-5 flex w-fit items-center">
              {card?.program?.desctipion ? (
                <div className="text-base text-darkBeige">
                  {card?.program?.desctipion}
                </div>
              ) : (
                <div className="text-base text-darkGrey">
                  Paragraph Regular description area. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit vestibulum pulvinar.
                </div>
              )}
            </div>
            {collegesLength > 0 ? (
              <div className="body-regular font-bold text-darkBeige">{`Offered at ${card
                ?.colleges?.length} college${
                collegesLength > 1 ? 's' : ''
              }`}</div>
            ) : null}
          </div>
        </Link>
      </div>
    </FadeIn>
  )
}
