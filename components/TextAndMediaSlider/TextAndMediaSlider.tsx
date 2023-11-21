import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useState, useEffect, useCallback, useRef } from 'react'
import { FadeIn } from 'components/FadeIn'
import Image from 'next/image'
import { getHeadingTag } from '../../utils/headingType'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import Link from 'next/link'
import { getYouTubeId } from 'utils/embed'

export type MarginSizesType = 'none' | 'medium' | 'large'
export type BackgroundColorType = 'white' | 'grey'

type TextAndMediaSliderProps = {
  attributes: {
    data: {
      slide: number
      background_color: BackgroundColorType
      component_spacing_bottom_spacing: MarginSizesType
      component_spacing_top_spacing: MarginSizesType
    }
  }
}

export const TextAndMediaSlider = ({ attributes }: TextAndMediaSliderProps) => {

  const slides = attributes.data.slide
  const bgColor = attributes.data.background_color
  const marginBottom = attributes.data.component_spacing_bottom_spacing || null
  const marginTop = attributes.data.component_spacing_top_spacing || null

  const autoplay = useRef(
    Autoplay(
      { delay: 7500, stopOnInteraction: true},
      // @ts-expect-error
      embla => embla.parentElement
    )
  )
  const options = {
    skipSnaps: true,
    loop: true,
    slidesToScroll: 1,
  }
  const [emblaRef, embla] = useEmblaCarousel(options, [autoplay.current])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }, [embla])

  useEffect(() => {
    if (!embla) return
    onSelect()

    setScrollSnaps(embla.scrollSnapList())

    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  const createCarouselItem = (val, options = {}) => (
    <div
      key={`slide${val}`}
      className={`flex flex-shrink-0 flex-grow-0 basis-full flex-col items-center justify-center overflow-hidden`}
    >

    <div
        className={`mx-auto flex w-full max-w-[1220px] gap-[80px] ${
          attributes.data[`slide_${val}_image_position`].includes('right') && 'flex-row-reverse'
        } md:h-fit md:flex-col md:gap-[60px]`}
      >
        {attributes.data[`slide_${val}_video_or_image`] === 'image' ? (
          <div className="relative h-[440px] w-[50%] self-center rounded-[12px] md:h-[400px] md:w-full sm:h-[300px]">
            <Image
              src={attributes.data[`slide_${val}_image`]['url'] ? attributes.data[`slide_${val}_image`]['url'] : '' }
              alt=""
              className="rounded-[12px] object-cover"
              fill
            />
          </div>
        ) : (
          <div className="h-full w-[50%] self-center rounded-[12px] md:w-full">
            <LiteYouTubeEmbed
              id={attributes.data[`slide_${val}_video`] ? getYouTubeId(attributes.data[`slide_${val}_video`]) : ''}
              title={'video'}
              noCookie={true}
              playlist={false}
            />
          </div>
        )}

        <div className="wysiwyg flex w-[50%] flex-col justify-center md:mx-auto md:w-[90%] sm:w-full items-start">
          {attributes.data[`slide_${val}_title`] ? (
            <p className="body-large mb-[32px] font-bold text-navy">
              {attributes.data[`slide_${val}_title`]}
            </p>
          ) : null}
          {attributes.data[`slide_${val}_heading`] ? (
            <span className="mb-[32px]">
              {getHeadingTag(attributes.data[`slide_${val}_heading_size`], attributes.data[`slide_${val}_heading`])}
            </span>
          ) : null}
          <div
            className="body-regular text-darkGrey"
            dangerouslySetInnerHTML={{ __html: attributes.data[`slide_${val}_body_copy`] }}
          />
          {attributes.data[`slide_${val}_link`]['url'] && attributes.data[`slide_${val}_link`]['title'] ? (
            <Link
              target="_blank"
              className="secondary-btn outline-btn navy mt-[40px]"
              href={attributes.data[`slide_${val}_link`]['url'] ?? ''}
            >
              {attributes.data[`slide_${val}_link`]['title']}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )

  const baseChildren = (
    <div>{[...Array(slides).keys()].map(createCarouselItem)}</div>
  )

  return (
    <FadeIn>
      <div
        className={`px-[100px] md:px-[60px] sm:px-[40px] bg-${bgColor} module-spacing-bottom-${marginBottom}  module-spacing-top-${marginTop}`}
      >
        <div className="max-w-full overflow-hidden w-full" ref={emblaRef}>
          <div className="flex w-full gap-[20px]">
            {baseChildren.props.children}
          </div>
        </div>
        <div className="relative flex h-2 w-full items-center justify-center gap-2 mt-10 ">
          {scrollSnaps.map((_, index) => (
            <div
              className={`cursor-pointer ${
                selectedIndex === index
                  ? 'h-[10px] w-[10px] bg-gold '
                  : 'h-2 w-2 bg-beige'
              } rounded-full`}
              key={index}
              onClick={() => embla.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

TextAndMediaSlider.displayName = 'nextword/textandmediaslider'
