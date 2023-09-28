import Link from 'next/link'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import { formatDate } from 'utils/dates'

export const NumberedMemosHeading = () => {
  return (
    <div className="col-span-12 col-start-1 md:grid-cols-6 mdsm:grid-cols-4 grid grid-flow-row grid-cols-12 gap-[20px] px-[24px] py-[10px] mdsm:hidden">
      <h5 className="col-span-5 col-start-1 md:col-span-2">memo subject</h5>
      <h5 className="col-span-1 col-start-6 md:col-start-3">number</h5>
      <h5 className="col-span-1 col-start-7 md:col-start-4">date</h5>
      <h5 className="col-span-1 col-start-8 md:col-start-5">category</h5>
      <h5 className="col-span-1 col-start-9 md:hidden">from</h5>
    </div>
  )
}

export const NumberedMemos = ({ card }) => {
  const date = card.numberedMemo.date;

  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 md:grid-cols-6 mdsm:grid-cols-4 items-center gap-[20px] rounded-[12px] bg-white px-[24px] py-[20px] md:px-[20px] md:py-[14px] mdsm:p-[20px]">
      <div className="text-justify footer-links-headline col-start-1 col-span-5 md:col-span-2 mdsm:col-span-4 mb-0 text-navy hover:text-navy">
        {card.numberedMemo?.subject}
      </div>
      <div className="body-small font-bold col-span-1 col-start-6 md:col-start-3 mdsm:col-start-1">{card.numberedMemo?.number}</div>
      <div className="body-small col-span-1 col-start-7 md:col-start-4 mdsm:col-start-2">{date}</div>
      <div className="body-small col-span-1 col-start-8 md:col-start-5 mdsm:col-start-3">{card?.numberedMemoCategories?.nodes.map(category => (category.name))}</div>
      <div className="col-span-2 col-start-9 md:hidden">{card.numberedMemo?.memoFrom}</div>
      <Link
        className="body-small font-bold sm:text-[12px] group col-span-2 col-end-13 md:col-span-1 md:col-end-7 mdsm:col-start-1 mdsm:justify-start mdsm:col-span-4 flex items-center justify-end gap-[12px] text-darkGrey hover:text-navy"
        href={card?.uri || '/'}
      >
        View Memo
        <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
      </Link>
    </div>
  )
}
