import Image from 'next/image'
import Link from 'next/link'
import LocationIcon from '/assets/icons/location.svg'

export const Location = ({ attributes }) => {
  const title = attributes.data.title
  const address = attributes.data.address
  const map = attributes.data.map
  const directionsLink = attributes.data.directions_link || ''
  const mailingAddress = attributes.data.mailing_address || ''

  return (
    <div className="flex h-fit w-full p-[100px] sm:max-h-fit sm:flex-col">
      <div className="flex w-[50%] flex-col md:mx-auto sm:w-full">
        <div className="h5 mb-[27px] flex items-center text-darkGrey">
          <LocationIcon className="mr-[10px] h-[22px] w-[22px] text-gold" />
          {title}
        </div>
        <address
          className="address-h4 mb-10 not-italic"
          dangerouslySetInnerHTML={{ __html: address }}
        ></address>
        {mailingAddress ? (
          <div className="mb-[15px]">
            <div className="h5 mb-[15px]">Mailing Address</div>
            <address
              className="address-body not-italic"
              dangerouslySetInnerHTML={{ __html: mailingAddress }}
            ></address>
          </div>
        ) : null}
        {directionsLink && (
          <Link
            href={directionsLink}
            className="secondary-btn w-fit bg-navy text-white hover:text-navy"
          >
            Get Directions
          </Link>
        )}
      </div>
      <div
        className="map aspect-[2.49/1] w-[50%] overflow-hidden rounded-xl lg:max-h-[321px] sm:max-h-[300px] sm:w-full"
        dangerouslySetInnerHTML={{ __html: map }}
      />
    </div>
  )
}

Location.displayName = 'nextword/location'
