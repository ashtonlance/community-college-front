import { FadeIn } from 'components/FadeIn'

export const Testimonial = ({ attributes }) => {
  const business = attributes.data.business_name
  const person = attributes.data.persons_name
  const quote = attributes.data.quote
  const label = attributes.data.label
  const colorModule = attributes.data.background_color

  return (
    <FadeIn>
      <div className={`h-fit w-full bg-${colorModule}`}>
        <div
          className={`mx-auto flex max-w-[1240px] flex-col items-center justify-center py-[80px] md:px-[100px] sm:p-[40px]`}
        >
          <div className="bg-blue mx-auto flex w-[90%] max-w-[1220px] flex-col items-center justify-center p-[80px] text-center sm:p-[40px]">
            <p className="p-small text-stone mb-[32px] md:mb-[24px] sm:mb-[20px]">
              {label}
            </p>
            <p className="body-large mb-[32px] font-bold text-white md:mb-[24px] sm:mb-[20px]">
              {quote}
            </p>
            <div className="text-stone flex flex-wrap items-center justify-center gap-2">
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
