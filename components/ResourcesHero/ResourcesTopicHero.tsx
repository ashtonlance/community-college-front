import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'
import { ReadMore } from './ReadMore'
import { ResourcesBackBtn } from './ResourcesBackBtn'

export type ResourcesTopicProps = {
  title: string
  content?: string
}

export const ResourceTopicHero = (props: ResourcesTopicProps) => {
  const title = props.title
  const content = props.content

  return (
    <div className="relative">
      <ResourcesBackBtn />
      <p className="font-bold mb-[32px] text-gmt-500 flex gap-2">
        Resource Center
        <span>/</span>
        <span className="text-black">Resources by topic</span>
      </p>

      <h1 className="mb-[40px] sm:mb-[32px]">{title}</h1>
      <Image
        alt=""
        src={separator}
        width={40}
        height={1.5}
        className="mb-[40px]"
      />
      <ReadMore content={content} />
    </div>
  )
}
