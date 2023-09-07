import Link from 'next/link'
import arrowright from '../../assets/icons/arrow-right.svg'
import Image from 'next/image'
import arrowdown from '../../assets/icons/arrow-down.svg'

type ResourceSidebarType = {
  title: string
  linkList: any
  classList: string
  onClick?: (id: string) => void
  active?: string
  selectedTaxonomy?: string
  tag?: boolean
  category?: boolean
}

export const Resource = (props: ResourceSidebarType) => {
  const transformNameToClass = (name: string) => {
    return name?.split(' ')?.join('-')?.toLowerCase()
  }

  const returnItemId = (item: string) => {
    if (props.tag) {
      return 'tag-'.concat(transformNameToClass(item))
    }
    if (props.category) {
      return 'category-'.concat(transformNameToClass(item))
    }
  }

  const getActiveClass = (name: string, title: string) => {
    return title == props.selectedTaxonomy || name == props.selectedTaxonomy
      ? 'active-taxonomy-item'
      : 'inactive-taxonomy-item'
  }

  const selectedTaxonomy =
    transformNameToClass(props?.selectedTaxonomy) || 'no-selection'
  let className = selectedTaxonomy
  if (props.tag) {
    className = `tag-wrapper selected-tag-${selectedTaxonomy}`
  }
  if (props.category) {
    className = `category-wrapper selected-category-${selectedTaxonomy}`
  }

  return (
    <div className={`${className} w-full`}>
      <div className="border-t-[1.5px] border-t-gmt-200 p-[40px] md:w-full md:border-y-[1.5px] md:border-r-[1.5px] md:border-y-gmt-200 md:border-r-gmt-200 sm:flex sm:justify-center">
        <div
          className="md:flex md:items-center md:justify-center md:gap-[20px]"
          onClick={() => props.onClick(props.title)}
        >
          <h5 className="mb-[40px] md:mb-0">{props.title}</h5>
          <Image
            className="hidden md:block"
            alt=""
            src={arrowdown}
            width={10}
            height={10}
          />
        </div>

        <div className="md:hidden">
          {props.linkList?.map(item => (
            <Link
              id={`${
                item.name ? returnItemId(item.name) : returnItemId(item.title)
              }`}
              className={`${getActiveClass(
                item.name,
                item.title
              )} link-name mb-[20px] flex items-center gap-[8px]`}
              key={item.title || item.name}
              href={item.link}
            >
              <p className={`${props.classList} max-w-[300px]  text-black`}>
                {item.name ? item.name : item.title}
              </p>
              <Image alt="" src={arrowright} width={8} height={8} />
            </Link>
          ))}
        </div>
      </div>
      {props.active && props.active == props.title && (
        <div className="absolute top-[98px] w-full bg-white px-[40px] pb-[40px] sm:relative sm:top-0">
          <div className="md:mt-[40px]">
            {props.linkList?.map(item => (
              <Link
                id={`${
                  item.name ? returnItemId(item.name) : returnItemId(item.title)
                }`}
                className={`${getActiveClass(
                  item.name,
                  item.title
                )} link-name mb-[20px] flex items-center gap-[8px]`}
                key={item.title || item.name}
                href={item.link}
              >
                <p className={`${props.classList} max-w-[300px]  text-black`}>
                  {item.name ? item.name : item.title}
                </p>
                <Image alt="" src={arrowright} width={8} height={8} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
