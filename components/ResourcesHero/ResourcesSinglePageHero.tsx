import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'
import { formatDate } from '../../utils/dates'

type ResourcesSinglePageProps = {
  image: string
  date: string
  title: string
  excerpt: string
}

export const ResourcesSinglePageHero = (props: ResourcesSinglePageProps) => {
  const formatedDate = formatDate(props?.date)

  return (
    <div className="flex w-full h-fit sm:flex-col">
      <div className="relative wrapper-default-inner-pages w-[66%] sm:w-full">
        <p className="font-bold mb-[32px] text-gmt-400 flex gap-2">
          Resource Center
          <span>/</span>
          <span className="text-black">
            Article
            {formatedDate && <span> • {formatedDate} </span>}
          </span>
        </p>

        <h1 className="mb-[32px] text-[46px] sm:text-[38px] font-bold leading-[115%] sm:leading-[110%] ">
          {props.title}
        </h1>
        <div
          className="mb-[40px] flex flex-col gap-[20px] single-page-resource-excerpt"
          dangerouslySetInnerHTML={{ __html: props.excerpt }}
        />
        <Image
          alt=""
          src={separator}
          width={40}
          height={1.5}
          className="mb-[40px] sm:mb-0"
        />
      </div>
      <div
        className="bg-cover bg-no-repeat relative w-[34%] sm:w-full sm:h-[300px]"
        style={{
          backgroundImage: `url(${props.image})`,
        }}
      ></div>
    </div>
  )
}
