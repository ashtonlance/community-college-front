import Link from 'next/link'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import { formatDate } from 'utils/dates'

export const NumberedMemosHeading = () => {
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 gap-[20px] px-[24px] py-[10px]">
      <h5 className="col-span-5 col-start-1">memo subject</h5>
      <h5 className="col-span-1 col-start-6">number</h5>
      <h5 className="col-span-1 col-start-7">date</h5>
      <h5 className="col-span-1 col-start-8">category</h5>
      <h5 className="col-span-1 col-start-9">from</h5>
    </div>
  )
}

export const NumberedMemos = ({ card }) => {
  const date = formatDate(card.date);

  //title
  //number
  // date
  // category
  // from
  // view memo link
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 items-center gap-[20px] rounded-[12px] bg-white px-[24px] py-[20px]">
      <div className="footer-links-headline col-start-1 col-span-5 mb-0 text-navy hover:text-navy">
        {card.title}
      </div>
      <div className="col-span-1 col-start-6">number</div>
      <div className="col-span-1 col-start-7">{date}</div>
      <div className="col-span-1 col-start-8">{card.numberedMemoCategories.nodes.map(category => (category.name))}</div>
      <div className="col-span-1 col-start-9">from</div>
      <Link
        className="group col-span-2 col-end-13 flex items-center justify-end gap-[12px] font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
        href={card?.uri || '/'}
      >
        View Memo
        <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
      </Link>
    </div>
  )
}
