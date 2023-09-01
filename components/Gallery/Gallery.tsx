import { EmblaCarousel } from "./EmblaCarousel";

export const Gallery = (props) => {
  const blocks = props.innerBlocks;

  return (
    <div className="max-w-[50%] mx-[auto] flex justify-center items-center">
      <EmblaCarousel blocks={blocks} />
    </div>
  );
};

Gallery.displayName = "core/gallery";
