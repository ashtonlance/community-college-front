import Link from 'next/link'
import Arrow from 'assets/icons/angled-arrow.svg'
export const LinksBlock = ({ attributes }) => {
  const linkList = attributes?.data?.links_lists
  const topSpacing = attributes?.data?.margins_top_spacing;
  const bottomSpacing = attributes?.data?.margins_bottom_spacing


  return (
    <div className={`mx-auto flex w-[90%] max-w-[1220px] justify-between gap-[20px] md:flex-col module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}>
      {linkList > 0 &&
        [...Array(linkList).keys()].map(val => (
          <div
            key={val}
            className="mx-auto flex max-w-[1030px] grow flex-col gap-[10px] rounded-xl border border-lightBlue p-[40px]"
          >
            <h5 className="mb-[32px] font-extrabold">
              {attributes.data[`links_lists_${val}_link_list_label`]}
            </h5>
            <div className="grid grid-flow-col grid-rows-3 md:grid-rows-5 sm:flex sm:flex-col">
              {[
                ...Array(attributes.data[`links_lists_${val}_items`]).keys(),
              ].map(num => (
                <Link
                  className="sub-nav mb-[12px] flex items-center gap-[7px] text-darkGrey hover:text-navy"
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
                  <Arrow className="text-gold" />
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

LinksBlock.displayName = 'nextword/links'
