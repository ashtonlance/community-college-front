import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'utils/index'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import Phone from 'assets/icons/phone.svg'
import Location from 'assets/icons/location.svg'

type GeneralCardProps = {
  card: any
}
export const GeneralCard: React.FC<GeneralCardProps> = ({ card }) => {
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
          <div className="h3 mb-5 text-[28px]">{card.collegeDetails?.name}</div>
          <div className="mb-[10px] flex">
            {card?.collegeDetails?.map ? (
              <>
                <Location className="mr-2 mt-[2px] h-[18px] w-[18px] text-gold" />
                <address className="body-regular max-w-[19ch] not-italic leading-[140%] text-darkGrey">
                  <div className="w-full">
                    {card?.collegeDetails?.map?.streetNumber}{' '}
                    {card?.collegeDetails?.map?.streetName}
                  </div>
                  <div className="w-full">
                    {card?.collegeDetails?.map?.city},{' '}
                    {card?.collegeDetails?.map?.stateShort}{' '}
                    {card?.collegeDetails?.map?.postCode}
                  </div>
                </address>
              </>
            ) : null}
          </div>

          <div className="group mb-16 flex w-fit items-center">
            <Phone className="mr-2 h-[18px] w-[18px] text-gold group-hover:text-navy" />
            <a
              href={`tel:${card.collegeDetails?.phoneNumber}`}
              className="body-regular text-darkGrey hover:text-navy"
            >
              {card.collegeDetails?.phoneNumber}
            </a>
          </div>
          <Link
            className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
            href={card?.uri || '/'}
          >
            Learn More
            <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
          </Link>
        </div>
      </div>
    </div>
  )
}
