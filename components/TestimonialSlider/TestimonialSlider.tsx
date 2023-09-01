import Image from "next/image";
import quote from "../../assets/imgs/quote.svg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useCallback, useRef } from "react";
import { FadeIn } from "components/FadeIn";
export type MarginSizesType = "none" | "medium" | "large";
export type BackgroundColorType = "white" | "light" | "dark";

type TestimonialSliderProps = {
  attributes: {
    data: {
      slide: number;
      background_color: BackgroundColorType;
      component_spacing_bottom_spacing: MarginSizesType;
      component_spacing_top_spacing: MarginSizesType;
    };
  };
};

export const TestimonialSlider = ({ attributes }: TestimonialSliderProps) => {
  const slides = attributes.data.slide;
  const bgColorCard = attributes.data.background_color;
  const marginBottom = attributes.data.component_spacing_bottom_spacing || null;
  const marginTop = attributes.data.component_spacing_top_spacing || null;
  const bgColorFullModule = bgColorCard == "white" ? "bg-stone" : "bg-white";

  const autoplay = useRef(
    Autoplay(
      { delay: 3000, stopOnInteraction: false },
      // @ts-expect-error
      (embla) => embla.parentElement
    )
  );
  const options = {
    skipSnaps: true,
    loop: true,
    slidesToScroll: 1,
  };
  const [emblaRef, embla] = useEmblaCarousel(options, [autoplay.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();

    setScrollSnaps(embla.scrollSnapList());

    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  const createCarouselItem = (val, options = {}) => (
    <div
      key={`slide${val}`}
      className={`flex flex-col justify-center items-center flex-shrink-0 flex-grow-0 basis-full`}
    >
      <Image src={quote} alt="" width={30} height={65} className="mb-[20px]" />
      <p className="body-large font-bold mb-[40px]">
        {attributes.data[`slide_${val}_quote`]}
      </p>
      <div className="flex flex-wrap justify-center gap-2 items-center mb-[10px]">
        <p className="body-regular text-emerald font-bold sm:mb-0">
          {attributes.data[`slide_${val}_persons_name`]}
        </p>
        {attributes.data[`slide_${val}_persons_name`] &&
          attributes.data[`slide_${val}_job_title`] && (
            <span className="text-emerald sm:hidden"> • </span>
          )}
        <p className="body-regular text-emerald font-bold">
          {attributes.data[`slide_${val}_job_title`]}
        </p>
      </div>
      <h5 className="text-blue mb-[40px]">
        {attributes.data[`slide_${val}_business_name`]}
      </h5>
    </div>
  );

  const baseChildren = (
    <div>{[...Array(slides).keys()].map(createCarouselItem)}</div>
  );

  return (
    <FadeIn>
      <div
        className={`w-full py-[100px] md:p-[60px] sm:p-[40px] module-spacing-top-${marginTop} module-spacing-bottom-${marginBottom} bg-${bgColorCard}`}
      >
        <div
          className={`flex flex-col p-[80px] md:px-[32px] md:w-full justify-center sm:p-[40px] items-center w-[90%] max-w-[1220px] mx-auto text-center ${bgColorFullModule}`}
        >
          <div className="overflow-hidden max-w-full" ref={emblaRef}>
            <div className="flex w-full gap-[20px]">
              {baseChildren.props.children}
            </div>
          </div>
          <div className="w-full relative flex items-center justify-center gap-2 h-2 lg:pt-10 ">
            {scrollSnaps.map((_, index) => (
              <div
                className={`cursor-pointer ${
                  selectedIndex === index
                    ? "h-[10px] w-[10px] bg-green "
                    : "h-2 w-2 bg-sky"
                } rounded-full`}
                key={index}
                onClick={() => scrollTo(index as any)}
              />
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

TestimonialSlider.displayName = "nextword/testimonialslider";
