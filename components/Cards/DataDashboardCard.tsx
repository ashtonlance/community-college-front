import Link from 'next/link'
import { cn } from 'utils/index'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import Location from 'assets/icons/location.svg'
import Phone from 'assets/icons/phone.svg'

type OpportunityCardProps = {
  card: any
}
export const DataDashboardCard: React.FC<OpportunityCardProps> = ({ card }) => {
  return (
    <div
      key={card}
      className={cn(
        `col-span-4 flex flex-col overflow-hidden rounded-xl md:col-span-6 sm:col-span-12 `
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-between bg-white p-10">
          {card?.dataDashboardsCategories?.nodes[0]?.name && (
            <div className="body-regular mb-3 font-bold text-darkGrey ">
              {card?.dataDashboardsCategories?.nodes[0]?.name}
            </div>
          )}
          <Link
            className="h3 mb-5 font-serif text-[24px] hover:text-darkBeige"
            href={card?.uri ?? ''}
          >
            {card?.dataDashboardDetails?.title}
          </Link>
          <Link
            className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
            href={card?.uri ?? ''}
          >
            View Dashboard
            <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
          </Link>
        </div>
      </div>
    </div>
  )
}
