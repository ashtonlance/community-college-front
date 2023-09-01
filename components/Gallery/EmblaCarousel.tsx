import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export const EmblaCarousel = ({ blocks }) => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {blocks?.map((block) => (
          <div className="embla__slide" key={block?.attributes?.id}>
            <Image
              src={block?.attributes?.url}
              width={block?.attributes?.width}
              alt=""
              height={block?.attributes?.height}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
