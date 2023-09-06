import { FadeIn } from 'components/FadeIn'

export const Testimonial = ({ attributes }) => {
  const business = attributes.data.business_name
  const person = attributes.data.persons_name
  const quote = attributes.data.quote
  const label = attributes.data.label
  const colorModule = attributes.data.background_color

  return (
    <FadeIn>
      <div className={`w-full h-fit bg-${colorModule}`}>
        <div
          className={`flex flex-col py-[80px] md:px-[100px] justify-center sm:p-[40px] items-center max-w-[1240px] mx-auto`}
        >
          <div className="flex flex-col p-[80px] justify-center sm:p-[40px] items-center bg-blue w-[90%] max-w-[1220px] mx-auto text-center">
            <p className="p-small text-stone mb-[32px] md:mb-[24px] sm:mb-[20px]">
              {label}
            </p>
            <p className="body-large font-bold text-white mb-[32px] md:mb-[24px] sm:mb-[20px]">
              {quote}
            </p>
            <div className="flex text-stone items-center justify-center gap-2 flex-wrap">
              <p className="p-small text-stone">{person}</p> •
              <p className="p-small text-stone">{business}</p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

Testimonial.displayName = 'nextword/testimonial'
