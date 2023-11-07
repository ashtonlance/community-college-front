import Link from 'next/link'
import Arrow from 'assets/icons/angled-arrow.svg'
import Image from 'next/image'
import bgWhite from "../../assets/imgs/angledbgwhite-bmt.png"
import bgGrey from "../../assets/imgs/angledbggrey-bmt.png"

export const LinksBlock = ({ attributes }) => {
  const linkList = attributes?.data?.links_lists
  const topSpacing = attributes?.data?.margins_top_spacing
  const bottomSpacing = attributes?.data?.margins_bottom_spacing
  const bgColor = attributes?.data?.background_color

  return (
    <div className={`bg-${bgColor} relative`}>
       <Image
          src={`${bgColor == 'grey' ? bgGrey.src : bgWhite.src}`}
          fill
          alt="background"
          className="object-fill"
        />
      <div
        className={`mx-auto relative flex w-[90%] max-w-[1220px] justify-between gap-[20px] md:flex-col module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}
      >
        {linkList > 0 &&
          [...Array(linkList).keys()].map(val => (
            <div
              key={val}
              className="mx-auto flex max-w-[1030px] grow flex-col gap-[10px] rounded-xl border border-lightBlue p-[40px]"
            >
             
              <h3 className="mb-[32px] font-extrabold h5">
                {attributes.data[`links_lists_${val}_link_list_label`]}
              </h3>
              <div className="grid-auto-flow-column grid grid-cols-3 md:grid-rows-auto sm:flex sm:flex-col gap-[5px]">
                {[
                  ...Array(attributes.data[`links_lists_${val}_items`]).keys(),
                ].map(num => (
                  
                  <Link
                    className="sub-nav has-arrow mb-[12px] text-darkGrey hover:text-navy"
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
                
                  </Link>                  
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

LinksBlock.displayName = 'nextword/links'
