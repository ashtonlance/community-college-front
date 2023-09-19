import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'utils/index'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'

type GeneralCardProps = {
  card: any
}
export const GeneralCard: React.FC<GeneralCardProps> = ({ card }) => {
  console.log(card)

  return (
    <div
      key={card}
      className={cn(
        ` max-w-[400px] overflow-hidden rounded-xl md:w-full sm:p-[32px]`
      )}
    >
      {card.featuredImage?.node?.sourceUrl ? (
        <Image
          src={card.featuredImage.node.sourceUrl}
          alt=""
          width={400}
          height={200}
        />
      ) : null}
      <div className="flex flex-col bg-white p-10">
        <div className="h3 mb-5 text-[28px]">{card.collegeDetails?.name}</div>
        <address className="body-regular mb-[10px] not-italic text-darkGrey">
          {card.collegeDetails?.physicalAddress}
        </address>

        <a
          href={`tel:${card.collegeDetails?.phoneNumber}`}
          className="body-regular mb-16 text-darkGrey"
        >
          {card.collegeDetails?.phoneNumber}
        </a>
        <Link
          className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
          href={card?.uri}
        >
          Learn More
          <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
        </Link>
      </div>
    </div>
  )
}
