import Quote from '/assets/imgs/quote.svg'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useState, useEffect, useCallback, useRef } from 'react'
import { FadeIn } from 'components/FadeIn'
import Image from 'next/image'
import bgWhite from "../../assets/imgs/bg-slider-white.jpeg"
import bgGrey from "../../assets/imgs/bg-slider-grey.jpeg"


export type MarginSizesType = 'none' | 'medium' | 'large'
export type BackgroundColorType = 'white' | 'grey'

type TestimonialSliderProps = {
  attributes: {
    data: {
      slide: number
      background_color: BackgroundColorType
      component_spacing_bottom_spacing: MarginSizesType
      component_spacing_top_spacing: MarginSizesType
    }
  }
}

export const TestimonialSlider = ({ attributes }: TestimonialSliderProps) => {

  const slides = attributes.data.slide
  const bgColorCard = attributes.data.background_color
  const marginBottom = attributes.data.component_spacing_bottom_spacing || null
  const marginTop = attributes.data.component_spacing_top_spacing || null

  const autoplay = useRef(
    Autoplay(
      { delay: 7500, stopOnInteraction: false},
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
      className={`flex flex-shrink-0 flex-grow-0 basis-full flex-col items-center justify-center overflow-hidden sm:p-[32px] md:px-[50px] px-[105px]`}
    >
      <Quote className="mb-[40px] text-gold" />
      <p className="h4 mb-10">{attributes.data[`slide_${val}_quote`]}</p>
      <div className="mb-[10px] flex flex-wrap items-center justify-center gap-2">
        <p className="body-regular font-bold text-darkGrey sm:mb-0">
          {attributes.data[`slide_${val}_persons_name`]}
        </p>
        {attributes.data[`slide_${val}_persons_name`] &&
          attributes.data[`slide_${val}_job_title`] && (
            <span className="text-darkGrey sm:hidden"> • </span>
          )}
        <p className="body-regular font-bold text-darkGrey">
          {attributes.data[`slide_${val}_job_title`]}
        </p>
      </div>
      <h5 className="mb-[40px] text-navy">
        {attributes.data[`slide_${val}_business_name`]}
      </h5>
    </div>
  )

  const baseChildren = (
    <div>{[...Array(slides).keys()].map(createCarouselItem)}</div>
  )

  return (
    <FadeIn>
      <div
        className={`module-spacing-top-${marginTop} module-spacing-bottom-${marginBottom} px-[100px] md:px-[60px] sm:px-[40px]  ${bgColorCard == 'grey' ? "bg-grey" : "bg-white"}`}
      >

        <div
          className={`${bgColorCard == 'grey' ? "bg-white" : "bg-grey"} max-w-[1240px] mx-auto rounded-xl flex relative flex-col items-center justify-center py-[60px] text-center md:w-full sm:py-[32px] md:py-[40px]`}
        >
        <Image
          src={`${bgColorCard == 'grey' ? bgWhite.src : bgGrey.src}`}
          fill
          alt="background"
          className="object-fill rounded-[12px]"
        />
          <div className="max-w-full overflow-hidden" ref={emblaRef}>
            <div className="flex w-full gap-[20px]">
              {baseChildren.props.children}
            </div>
          </div>
          <div className="relative flex h-2 w-full items-center justify-center gap-2 lg:pt-10 ">
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
      </div>
    </FadeIn>
  )
}

TestimonialSlider.displayName = 'nextword/testimonialslider'
