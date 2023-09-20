import Image from 'next/image'
import { cn } from 'utils/index'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import { getYouTubeId } from 'utils/embed'

export const MediaEmbed = props => {
  const bgColor = props?.attributes?.data?.background_color || 'white'
  const bottomSpacing =
    props?.attributes?.data?.component_spacing_bottom_spacing || ''
  const topSpacing =
    props?.attributes?.data?.component_spacing_top_spacing || ''
  const image = props?.attributes?.data?.image || ''
  const video = props?.attributes?.data?.video || ''
  const videoOrImage = props?.attributes?.data?.video_or_image || 'image'
  const id = getYouTubeId(video)
  return (
    <div
      className={cn(
        `flex w-full flex-wrap justify-center bg-${bgColor} module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing} overflow-hidden`
      )}
    >
      {videoOrImage === 'image' ? (
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.alt}
        />
      ) : (
        <div className="w-full">
          <LiteYouTubeEmbed
            id={id}
            title={'video'}
            noCookie={true}
            playlist={false}
          />
        </div>
      )}
    </div>
  )
}

MediaEmbed.displayName = 'nextword/mediaembed'
