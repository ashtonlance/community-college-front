import Image from 'next/image'

type ImageProps = {
  attributes: {
    height: number
    id: number
    url: string
    width: number
  }
}

export default function Component(props: ImageProps) {

  return (
    <Image
      alt=""
      src={props?.attributes?.url}
      width={props?.attributes?.width}
      height={props?.attributes?.height}
    />
  )
}

Component.displayName = 'core/image'
