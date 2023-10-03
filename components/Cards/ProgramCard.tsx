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
        `flex max-w-[400px] flex-col overflow-hidden rounded-xl md:w-full`
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
            <div className="flex flex-col">
              {card?.colleges[0]?.distance ? (
                <div className="body-regular font-bold text-darkBeige">
                  Offered At:
                </div>
              ) : null}
              {card?.colleges?.slice(0, 3).map((college, i) => (
                <div key={i} className="body-regular text-[14px] text-darkGrey">
                  {college.distance ? (
                    <span className="my-1">
                      <Link
                        href={college.uri ?? ''}
                        className="body-regular w-full font-bold text-navy hover:text-darkBeige"
                      >
                        {college.title}
                      </Link>{' '}
                      <div>{Math.ceil(college.distance)}mi. away</div>
                    </span>
                  ) : null}
                </div>
              ))}
              {collegesLength > 0 && !card?.colleges[0]?.distance && (
                <div className="body-regular text-[14px] text-darkGrey">
                  {`Offered at ${collegesLength} college${
                    collegesLength > 1 ? 's' : ''
                  }`}
                </div>
              )}
              {collegesLength > 3 && card?.colleges[0]?.distance && (
                <div className="body-regular mt-[5px] text-xs font-bold text-darkBeige">
                  + {collegesLength - 3} more colleges
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </FadeIn>
  )
}
