import Link from 'next/link'
import Email from 'assets/icons/email-icon.svg'

export const StaffCardsHeading = () => {
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 gap-[20px] px-[24px] py-[10px] md:hidden">
      <h5 className="col-span-3 col-start-1 md:col-span-2 mb-0">name</h5>
      <h5 className="col-span-2 col-start-4 md:col-start-3 mb-0">job title</h5>
      <h5 className="col-span-2 col-start-6 md:col-start-4 mb-0">organization</h5>
      <h5 className="col-span-2 col-start-8 md:col-start-5 mb-0">location</h5>
      <h5 className="col-span-2 col-start-10 mb-0">phone</h5>
      <h5 className="col-span-1 mb-0">contact</h5>
    </div>
  )
}

export const StaffCards = ({ card }) => {
  const staffDetail = card.staffDetails
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 items-center md:gap-0 gap-[20px] rounded-[12px] bg-white px-[24px] py-[20px] md:grid-cols-6  mdsm:grid-cols-4 mdsm:p-[20px]">
      <div className="footer-links-headline md:text-[20px] text-[24px] col-span-2 md:row-span-3 mdsm:row-auto col-start-1 md:mb-[5px] mb-0 text-justify text-navy hover:text-navy mdsm:col-span-6 font-condensed">
        {staffDetail.staffName}
        <br></br>
        <div className='mdsm:hidden hidden md:block max-w-[75%] leading-normal mt-[5px] body-small text-darkGrey font-bold'>{staffDetail.jobTitle}</div>
      </div>
      <div className="md:hidden mdsm:block block body-small text-darkGrey col-span-2 col-start-4 font-bold md:col-start-3 mdsm:col-start-1 mdsm:mb-[15px]">
        {staffDetail.jobTitle}
      </div>
      <div className="body-small mdsm:col-span-6 md:col-span-3 md:col-start-3 mdsm:col-start-1 col-start-6 col-span-2 text-darkGrey">
        <span className="md:inline hidden font-bold">Organization:</span>
        {staffDetail.organizations.flatMap((org, index) => (
          <div className="inline md:ml-[4px]" key={org.name}>{org.name}{index < staffDetail.organizations.length- 1 ? ',' : ''}</div>
        ))}
      </div>
      <div className="body-small mdsm:col-span-6 text-darkGrey md:col-span-3 md:col-start-3 mdsm:col-start-1 col-span-2 col-start-8">
        <span className=" md:inline hidden font-bold">Department:</span>
        <div className="inline md:ml-[4px] text-darkGrey">{staffDetail.location}</div>
      </div>
      <div className="body-small mdsm:col-span-6 md:col-span-3 md:col-start-3 col-start-10 col-span-2 text-darkGrey mdsm:mb-[15px]">
        <span className="md:inline hidden font-bold">Phone:</span>
        <a
          className="text-darkGrey hover:text-navy ml-[4px]"
          href={`tel:${staffDetail.phone}`}
        >
          {staffDetail.phone}
        </a>
      </div>
      <div className="body-small group md:col-span-1 md:col-start-6 col-span-1 col-start-12 mdsm:row-auto	mdsm:row-start-auto md:row-start-1 md:row-span-3 row-span-1	row-start-auto  mdsm:col-span-6 mdsm:col-start-1 mdsm:justify-start sm:text-[12px]">
        <a
          className="flex items-center font-bold gap-[10px] text-darkGrey hover:text-navy mdsm:justify-start justify-end"
          href={`mailto:${staffDetail.email}`}
        >
          Email
          <Email className="text-gold transition-colors duration-100 group-hover:text-navy" />
        </a>
      </div>
    </div>
  )
}
