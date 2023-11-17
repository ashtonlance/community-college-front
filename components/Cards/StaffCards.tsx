import Email from 'assets/icons/email-icon.svg'

export const StaffCardsHeading = () => {
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 gap-[20px] px-[24px] py-[10px] md:hidden">
      <h5 className="col-span-3 col-start-1 mb-0 md:col-span-2">name</h5>
      <h5 className="col-span-2 col-start-4 mb-0 md:col-start-3">job title</h5>
      <h5 className="col-span-2 col-start-6 mb-0 md:col-start-4">department</h5>
      <h5 className="col-span-2 col-start-8 mb-0 md:col-start-5">location</h5>
      <h5 className="col-span-2 col-start-10 mb-0">phone</h5>
      <h5 className="col-span-1 mb-0">contact</h5>
    </div>
  )
}

export const StaffCards = ({ card }) => {
  const staffDetail = card.staffDetails
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 items-center gap-[20px] rounded-[12px] bg-white px-[24px] py-[20px] md:grid-cols-6 md:gap-0  mdsm:grid-cols-4 mdsm:p-[20px]">
      <div className="footer-links-headline col-span-2 col-start-1 mb-0 text-justify font-condensed text-[24px] text-navy hover:text-navy md:row-span-3 md:mb-[5px] md:text-[20px] mdsm:col-span-6 mdsm:row-auto">
        <span className="whitespace-nowrap">{staffDetail.staffName}</span>
        <br></br>
        <div className="body-small mt-[5px] hidden max-w-[75%] font-bold leading-normal text-darkGrey md:block mdsm:hidden">
          {staffDetail.jobTitle}
        </div>
      </div>
      <div className="body-small col-span-2 col-start-4 block font-bold text-darkGrey md:col-start-3 md:hidden mdsm:col-start-1 mdsm:mb-[15px] mdsm:block">
        {staffDetail.jobTitle}
      </div>
      <div className="body-small col-span-2 col-start-6 text-darkGrey md:col-span-3 md:col-start-3 mdsm:col-span-6 mdsm:col-start-1">
        <span className="hidden font-bold md:inline">Organization:</span>
        {staffDetail.organizations.flatMap((org, index) => (
          <div className="inline md:ml-[4px]" key={org.name}>
            {org.name}
            {index < staffDetail.organizations.length - 1 ? ',' : ''}
          </div>
        ))}
      </div>
      <div className="body-small col-span-2 col-start-8 text-darkGrey md:col-span-3 md:col-start-3 mdsm:col-span-6 mdsm:col-start-1">
        <span className=" hidden font-bold md:inline">Department:</span>
        <div className="inline text-darkGrey md:ml-[4px]">
          {staffDetail.location}
        </div>
      </div>
      <div className="body-small col-span-2 col-start-10 text-darkGrey md:col-span-3 md:col-start-3 mdsm:col-span-6 mdsm:mb-[15px]">
        <span className="hidden font-bold md:inline">Phone:</span>
        <a
          className="ml-[4px] text-darkGrey hover:text-navy"
          href={`tel:${staffDetail.phone}`}
        >
          {staffDetail.phone}
        </a>
      </div>
      <div className="body-small group col-span-1 col-start-12 row-span-1 row-start-auto md:col-span-1	md:col-start-6 md:row-span-3 md:row-start-1 mdsm:col-span-6	mdsm:col-start-1  mdsm:row-auto mdsm:row-start-auto mdsm:justify-start sm:text-[12px]">
        <a
          className="flex items-center justify-end gap-[10px] font-bold text-darkGrey hover:text-navy mdsm:justify-start"
          href={`mailto:${staffDetail.email}`}
        >
          Email
          <Email className="text-gold transition-colors duration-100 group-hover:text-navy" />
        </a>
      </div>
    </div>
  )
}
