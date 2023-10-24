import { cn } from 'utils/index'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'

type OfficerCardProps = {
  card: any
}
export const OfficerCard: React.FC<OfficerCardProps> = ({ card }) => {
  return (
    <div
      key={card}
      className={cn(
        `col-span-4 flex flex-col overflow-hidden rounded-xl md:col-span-6 sm:col-span-12 `
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-between bg-white p-10">
          <div className="body-regular mb-3 flex items-center gap-x-2 font-bold text-darkGrey">
            {card?.college && <span>{card?.college}</span>}•
            {card?.title && <span>{card?.title}</span>}
          </div>
          <div className="h3 mb-5 font-serif text-[24px]">{card?.name}</div>
          <a
            className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
            href={`mailto:${card?.email}`}
          >
            Send An Email
            <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
          </a>
        </div>
      </div>
    </div>
  )
}
