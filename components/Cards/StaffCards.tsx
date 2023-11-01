import Link from 'next/link'
import Email from 'assets/icons/email-icon.svg'

export const StaffCardsHeading = () => {
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 gap-[20px] px-[24px] py-[10px] md:hidden">
      <h5 className="col-span-3 col-start-1 md:col-span-2">name</h5>
      <h5 className="col-span-2 col-start-4 md:col-start-3">job title</h5>
      <h5 className="col-span-2 col-start-6 md:col-start-4">organization</h5>
      <h5 className="col-span-2 col-start-8 md:col-start-5">location</h5>
      <h5 className="col-span-2 col-start-10">phone</h5>
      <h5 className="col-span-1">contact</h5>
    </div>
  )
}

export const StaffCards = ({ card }) => {
  const staffDetail = card.staffDetails
  return (
    <div className="col-span-12 col-start-1 grid grid-flow-row grid-cols-12 items-center gap-[20px] rounded-[12px] bg-white px-[24px] py-[20px] md:grid-cols-6 md:px-[20px] md:py-[14px] mdsm:grid-cols-4 mdsm:p-[20px]">
      <div className="footer-links-headline col-span-3 col-start-1 mb-0 text-justify text-navy hover:text-navy md:col-span-2 mdsm:col-span-4">
        {staffDetail.staffName}
      </div>
      <div className="body-small col-span-2 col-start-4 font-bold md:col-start-3 mdsm:col-start-1">
        {staffDetail.jobTitle}
      </div>
      <div className="body-small col-span-2 col-start-6 md:col-start-4 mdsm:col-start-2">
        {staffDetail.organizations.flatMap(org => (
          <div key={org.name}>{org.name}</div>
        ))}
      </div>
      <div className="body-small col-span-2 col-start-8 md:col-start-5 mdsm:col-start-3">
        {staffDetail.location}
      </div>
      <div className="col-span-2 col-start-10 md:hidden">
        <a
          className="text-darkGrey hover:text-navy"
          href={`tel:${staffDetail.phone}`}
        >
          {staffDetail.phone}
        </a>
      </div>
      <div className="body-small group col-span-1 col-end-13 md:col-span-1 md:col-end-7 mdsm:col-span-4 mdsm:col-start-1 mdsm:justify-start sm:text-[12px]">
        <a
          className="flex items-center justify-end gap-[12px] text-darkGrey hover:text-navy"
          href={`mailto:${staffDetail.email}`}
        >
          Email
          <Email className="text-gold transition-colors duration-100 group-hover:text-navy" />
        </a>
      </div>
    </div>
  )
}
