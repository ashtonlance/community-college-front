import Image from 'next/image'
import Link from 'next/link'
import arrow from '../../assets/icons/arrow-right.svg'

export const LinksBlock = ({ attributes }) => {
  const linkList = attributes.data.links_lists

  return (
    <div className="flex justify-between max-w-[1220px] mx-auto my-[40px] gap-[20px] md:flex-col w-[90%]">
      {linkList > 0 &&
        [...Array(linkList).keys()].map(val => (
          <div
            key={val}
            className="flex flex-col gap-[10px] bg-gmt-100 p-[40px] grow"
          >
            <h5 className="mb-[32px]">
              {attributes.data[`links_lists_${val}_link_list_label`]}
            </h5>
            <div className="grid grid-rows-3 grid-flow-col md:grid-rows-5 sm:flex sm:flex-col">
              {[
                ...Array(attributes.data[`links_lists_${val}_items`]).keys(),
              ].map(num => (
                <Link
                  className="sub-nav mb-[12px] flex items-center gap-[7px]"
                  key={num}
                  href={
                    attributes.data[`links_lists_${val}_items_${num}_link_url`]
                  }
                >
                  {
                    attributes.data[
                      `links_lists_${val}_items_${num}_link_label`
                    ]
                  }
                  <Image alt="" src={arrow} width={6} height={6} />
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

LinksBlock.displayName = 'nextword/links'
