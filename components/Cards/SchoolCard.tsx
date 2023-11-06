import Link from 'next/link'
import { cn } from 'utils/index'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import Location from 'assets/icons/location.svg'
import Phone from 'assets/icons/phone.svg'

type SchoolCardProps = {
  card: any
}
export const SchoolCard: React.FC<SchoolCardProps> = ({ card }) => {
  return (
    <div
      key={card}
      className={cn(
        `col-span-4 flex flex-col overflow-hidden rounded-xl md:col-span-6 sm:col-span-12 `
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-between bg-white p-10">
          <Link
            className="h3 mb-5 font-serif text-[24px] hover:text-darkBeige"
            href={card?.schoolDetails?.website?.url ?? ''}
            target={card?.schoolDetails?.website?.target || '_self'}
          >
            {card?.title}
          </Link>
          {card?.schoolDetails?.location && (
            <div className="mb-[10px] flex min-w-[18px] items-center">
              <Location className="mr-[10px] h-[18px] w-[18px] text-gold" />
              <div className="body-regular max-w-[18rem] whitespace-pre-line text-darkGrey">
                {card?.schoolDetails?.location?.streetAddress}
              </div>
            </div>
          )}
          {card?.schoolDetails?.phone && (
            <div className="mb-5 flex min-w-[18px] items-center">
              <Phone className="mr-[10px] h-[18px] w-[18px] text-gold" />
              <a
                href={`tel:${card?.schoolDetails?.phone}`}
                className="body-regular text-darkGrey"
              >
                {card?.schoolDetails?.phone}
              </a>
            </div>
          )}
          <div
            className="body-regular mb-[10px] [&>*]:text-[12px] [&>*]:font-bold [&>*]:text-darkBeige "
            dangerouslySetInnerHTML={{
              __html: card?.schoolDetails?.details,
            }}
          />
          <Link
            aria-label={"Learn more about " + card?.schoolDetails?.website?.title}
            className="group flex items-center gap-x-2 font-condensed text-lg font-bold tracking-[-0.18px] text-darkGrey hover:text-navy"
            href={card?.schoolDetails?.website?.url ?? ''}
            target={card?.schoolDetails?.website?.target || '_self'}
          >
            {card?.schoolDetails?.website?.title}
            <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
          </Link>
        </div>
      </div>
    </div>
  )
}
