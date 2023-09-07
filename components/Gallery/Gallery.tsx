import { EmblaCarousel } from './EmblaCarousel'

export const Gallery = props => {
  const blocks = props.innerBlocks

  return (
    <div className="mx-[auto] flex max-w-[50%] items-center justify-center">
      <EmblaCarousel blocks={blocks} />
    </div>
  )
}

Gallery.displayName = 'core/gallery'
