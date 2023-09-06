import Image from 'next/image'
import separator from '../../assets/imgs/separator.svg'
import { ResourcesBackBtn } from './ResourcesBackBtn'

export type ResourcesTypeBreadcrumbPosition = 'root' | 'subtype'

export type ResourcesTypeProps = {
  title: string
  breadcrumbPosition: ResourcesTypeBreadcrumbPosition
  category?: string
}

export const ResourcesTypeHero = (props: ResourcesTypeProps) => {
  const title = props.title
  const breadcrumbPosition = props.breadcrumbPosition

  return (
    <div className="relative">
      {breadcrumbPosition == 'subtype' && <ResourcesBackBtn />}

      {breadcrumbPosition == 'root' ? (
        <p className="font-bold mb-[32px]">Resource Center</p>
      ) : (
        <p className="font-bold mb-[32px] text-gmt-500 flex gap-2">
          Resource Center
          <span>/</span>
          <span className="text-black">Resources by type</span>
        </p>
      )}

      <h1 className="mb-[40px] sm:mb-[32px]">{title}</h1>
      <Image
        alt=""
        src={separator}
        width={40}
        height={1.5}
        className="mb-[60px] sm:mb-[50px]"
      />
    </div>
  )
}
