import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import Link from 'next/link'
import { formatDate } from 'utils/dates'

export const BoardMeetingHeading = () => {
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 gap-[20px] px-[24px] py-[10px] md:grid-cols-6 mdsm:hidden mdsm:grid-cols-4">
      <h5 className="col-span-5 col-start-1 md:col-span-2">title</h5>
      <h5 className="col-span-1 col-start-6 md:col-start-3">location</h5>
      <h5 className="col-span-1 col-start-7 md:col-start-4">date</h5>
    </div>
  )
}

export const BoardMeetingCard = ({ card }) => {
  const date = formatDate(card?.boardMeetingDetails?.date || card?.title)

  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 items-center gap-[20px] rounded-[12px] bg-white px-[24px] py-[20px] md:grid-cols-6 md:px-[20px] md:py-[14px] mdsm:grid-cols-4 mdsm:p-[20px]">
      <Link
        className="footer-links-headline col-span-5 col-start-1 mb-0 text-justify text-navy hover:text-navy md:col-span-2 mdsm:col-span-4"
        href={card?.uri || '/'}
      >
        {card.title}
      </Link>
      <div className="body-small col-span-1 col-start-6 font-bold md:col-start-3 mdsm:col-start-1">
        {card.boardMeetingDetails?.location}
      </div>
      <div className="body-small col-span-1 col-start-7 md:col-start-4 mdsm:col-start-2">
        {date}
      </div>
      <Link
        className="body-small group col-span-2 col-end-13 flex items-center justify-end gap-[12px] font-bold text-darkGrey hover:text-navy md:col-span-1 md:col-end-7 mdsm:col-span-4 mdsm:col-start-1 mdsm:justify-start sm:text-[12px]"
        href={card?.uri || '/'}
      >
        View Meeting Materials
        <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
      </Link>
    </div>
  )
}
