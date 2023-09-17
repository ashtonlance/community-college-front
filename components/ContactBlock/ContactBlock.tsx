import Image from 'next/image'
import Link from 'next/link'
import { cn } from 'utils'
import Arrow from 'assets/icons/arrow-forward-sharp.svg'
import Phone from 'assets/icons/phone.svg'

export const ContactBlock = ({ attributes }) => {
  const bgColor = attributes.data.background_color
  const bottomSpacing = attributes?.data?.component_spacing_bottom_spacing || ''
  const topSpacing = attributes?.data?.component_spacing_top_spacing || ''
  const image = attributes.data.image
  const jobTitle = attributes.data.job_title
  const link = attributes.data.link
  const phoneNumber = attributes.data.phone_number
  const title = attributes.data.title
  const cardColor = bgColor === 'white' ? 'bg-grey' : 'bg-white'
  return (
    <div
      className={cn(
        `flex w-full flex-wrap justify-between bg-${bgColor} module-margin-bottom-${bottomSpacing}  module-margin-top-${topSpacing} overflow-hidden px-[205px] py-[100px] md:px-[100px] md:py-[60px] sm:p-10`
      )}
    >
      <div className="basis-1/3 overflow-hidden rounded-l-xl md:basis-full md:rounded-t-xl md:rounded-bl-none ">
        <Image
          src={image.url}
          width={400}
          height={250}
          className="max-h-[265px] object-cover"
          alt={title}
        />
      </div>
      <div
        className={`flex w-full flex-col flex-wrap md:flex-col ${cardColor} basis-2/3 rounded-xl p-10 md:basis-full`}
      >
        <div className="h4 mb-5">{title}</div>
        <div className="body-regular mb-4 font-bold">{jobTitle}</div>
        <a
          href={`tel:${phoneNumber}`}
          className="body-regular group mb-8 flex items-center hover:text-navy"
        >
          <Phone className="mr-2 h-[18px] w-[18px] text-gold group-hover:text-navy" />
          {phoneNumber}
        </a>
        {link ? (
          // tertiary-btn
          <Link
            className="group flex items-center gap-x-2 font-condensed text-lg font-extrabold tracking-[-0.18px] text-darkGrey hover:text-navy"
            href={link.url}
            target={link.target}
          >
            {link.title}
            <Arrow className="text-gold transition-colors duration-100 group-hover:text-navy" />
          </Link>
        ) : null}
      </div>
    </div>
  )
}

ContactBlock.displayName = 'nextword/contactblock'
