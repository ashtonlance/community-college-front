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
    <div className="flex h-fit w-full sm:flex-col">
      <div className="wrapper-default-inner-pages relative w-[66%] sm:w-full">
        <p className="mb-[32px] flex gap-2 font-bold text-gmt-400">
          Resource Center
          <span>/</span>
          <span className="text-black">
            Article
            {formatedDate && <span> • {formatedDate} </span>}
          </span>
        </p>

        <h1 className="mb-[32px] text-[46px] font-bold leading-[115%] sm:text-[38px] sm:leading-[110%] ">
          {props.title}
        </h1>
        <div
          className="single-page-resource-excerpt mb-[40px] flex flex-col gap-[20px]"
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
        className="relative w-[34%] bg-cover bg-no-repeat sm:h-[300px] sm:w-full"
        style={{
          backgroundImage: `url(${props.image})`,
        }}
      ></div>
    </div>
  )
}
