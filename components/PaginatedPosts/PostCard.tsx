import Link from 'next/link'
import { getLabelFromCategory } from 'utils/getButtonLabels'
import { formatDate } from '../../utils/dates'

type Resource = {
  title: string
  date: Date
  excerpt: string
  link: string
  featuredImage: any
  categories: any
}

export const ResourceCard = ({ resource }) => {
  const title = resource?.title
  const text = resource?.excerpt
  const img = resource?.featuredImage?.node?.sourceUrl
  const date = formatDate(resource?.date)
  const link = resource?.link
  const category = resource?.categories?.nodes[0]?.name

  return (
    <div className="my-[20px] flex bg-gmt-100 md:flex-col">
      {img && (
        <div
          style={{
            backgroundImage: `url(${img})`,
          }}
          className="w-[33%] bg-cover bg-center bg-no-repeat md:h-[200px] md:w-full sm:h-[160px]"
        >
          {' '}
        </div>
      )}

      <div
        className={`${
          img ? 'w-[66%] md:w-fit' : 'w-full'
        } flex flex-col p-[40px] md:p-[32px]`}
      >
        <div>
          {category && date && (
            <div className="mb-[10px] gap-[10px] font-bold text-gmt-400">
              {category} • {date}
            </div>
          )}
          {category && !date && (
            <div className="mb-[10px] gap-[10px] font-bold text-gmt-400">
              {category}
            </div>
          )}
          {date && !category && (
            <div className="mb-[10px] gap-[10px] font-bold text-gmt-400">
              {date}
            </div>
          )}
        </div>
        <h4 className="body-large mb-[20px] font-bold">{title}</h4>
        <div
          className="body-regular darker-font-color mb-[24px]"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <Link
          href={link}
          className="secondary-btn w-fit border-[1.5px] border-gmt-500 text-gmt-500"
        >
          {getLabelFromCategory(category)}
        </Link>
      </div>
    </div>
  )
}
