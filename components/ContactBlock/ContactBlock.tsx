import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'
import Link from 'next/link'

export const ContactBlock = ({ attributes }) => {
  const title = attributes.data.title
  const address = attributes.data.address
  const map = attributes.data.map
  const directionsLink = attributes.data.directions_link || ''

  return (
    <div className="mx-auto my-[40px] flex h-fit max-h-[320px] w-[90%] max-w-[1220px] gap-[80px] md:gap-[40px] sm:max-h-fit sm:flex-col">
      <div className="flex w-[50%] flex-col gap-[32px] md:mx-auto sm:w-full">
        <h3>{title}</h3>
        <Image alt="" src={separator} width={40} height={1.5} className="" />
        <h4>{address}</h4>
        {directionsLink && (
          <Link
            href={directionsLink}
            className="secondary-btn w-fit border-[1.5px] border-solid border-gmt-500 text-gmt-500"
          >
            Get Directions
          </Link>
        )}
      </div>
      <div
        className="w-[50%] overflow-hidden lg:max-h-[321px] sm:max-h-[300px] sm:w-full"
        dangerouslySetInnerHTML={{ __html: map }}
      />
    </div>
  )
}

ContactBlock.displayName = 'nextword/contactblock'
