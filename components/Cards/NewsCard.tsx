import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'utils/index'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import Phone from 'assets/icons/phone.svg'
import Location from 'assets/icons/location.svg'
import { formatDate } from 'utils/dates'
import { Button } from '../Button'

type NewsCardProps = {
  card: any
  currentPage: number
  index: number
}
export const NewsCard: React.FC<NewsCardProps> = ({
  card,
  currentPage,
  index,
}) => {
  if (currentPage === 1 && index === 0) {
    return (
      <div
        key={card}
        className="relative col-span-12 col-start-1 grid min-h-[492px] grid-flow-row grid-cols-12 items-center gap-[20px] overflow-hidden rounded-xl bg-white px-[60px] py-[60px] md:grid-cols-6 md:px-[20px] md:py-[14px] mdsm:grid-cols-4 mdsm:p-[20px]"
      >
        <div className="col-span-12 flex">
          {card.featuredImage?.node?.sourceUrl ? (
            <>
              <div
                className="absolute left-0 top-0 z-[1] h-full w-full"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 22.92%, rgba(0, 0, 0, 0.50) 75.52%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)',
                }}
              ></div>
              <Image
                src={card.featuredImage.node.sourceUrl}
                alt=""
                fill
                className={`z-0 object-cover object-center`}
              />
            </>
          ) : null}
        </div>
        <div className="relative z-10 col-span-9 flex flex-col gap-5">
          <div className="body-large text-white">
            {card.newsCategories.nodes[0]?.name} • {''}
            {formatDate(card?.date)}
          </div>
          <div className="h2 text-white">{card?.title}d</div>
          <div className="body-large text-white ">
            {card?.newsDetail?.excerpt}
          </div>
          <Button
            classes="secondary-btn outline-btn text-white hover:text-navy hover:bg-gold hover:border-gold"
            content="Read More"
            linkto={card?.uri ?? '/'}
          />
        </div>
      </div>
    )
  }
  return (
    <div
      key={card}
      className="relative col-span-12 col-start-1 grid grid-flow-row grid-cols-12 grid-rows-1 overflow-hidden rounded-xl bg-white"
    >
      <div className="col-span-4">
        {card.featuredImage?.node?.sourceUrl ? (
          <Image
            src={card.featuredImage.node.sourceUrl}
            alt=""
            width={450}
            height={250}
            className={`h-full max-h-[262px] object-cover object-top`}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        ) : null}
      </div>
      <div className="col-span-8 flex flex-col gap-5 px-[40px] py-[40px] md:px-[20px] md:py-[14px] mdsm:p-[20px]">
        <div className="body-large font-bold text-darkGrey">
          {card.newsCategories.nodes[0].name} • {''}
          {formatDate(card?.date)}
        </div>
        <Link
          className="h3 text-navy hover:text-darkBeige"
          href={card.uri ?? ''}
        >
          {card?.title}
        </Link>
        {card?.newsDetail?.excerpt ?? (
          <div className="body-regular text-darkGrey ">
            {card?.newsDetail?.excerpt}
          </div>
        )}
        <Link
          aria-label={"Read about " + card.newsCategories.nodes[0].name}
          className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
          href={card.uri ?? ''}
        >
          Read More
          <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
        </Link>
      </div>
    </div>
  )
}
