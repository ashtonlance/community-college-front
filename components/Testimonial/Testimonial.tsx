import { FadeIn } from 'components/FadeIn'
import Image from 'next/image'

export const Testimonial = ({ attributes }) => {
  const business = attributes.data.business_name
  const person = attributes.data.persons_name
  const quote = attributes.data.quote
  const label = attributes.data.label
  const color = attributes.data.background_color

  return (
    <FadeIn>
      <div className={`h-fit w-full`}>
        <div
          className={`relative mx-auto flex max-w-[1240px] flex-col items-center justify-center  py-[80px] md:px-[100px] sm:p-[40px]`}
        >
          <div className="bg-blue relative mx-auto flex w-[90%] max-w-[1220px] flex-col items-center justify-center overflow-hidden rounded-xl px-[60px] py-[40px] text-center md:w-full md:p-[40px]">
            <Image
              src={`/angles/angled-bg_${color}-btm.jpg`}
              fill
              alt="background"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
            <div className="relative z-10">
              <p className="p-small relative top-[-40px] mx-auto w-fit rounded-b-xl bg-lightBlue px-4 py-2 text-navy md:mb-[24px] sm:mb-[20px]">
                {label}
              </p>
              <p className="body-large mb-[32px] font-bold text-navy md:mb-[24px] sm:mb-[20px]">
                {quote}
              </p>
              <div className="text-stone flex flex-wrap items-center justify-center gap-2">
                <p className="p-small text-stone">{person}</p> •
                <p className="p-small text-stone">{business}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

Testimonial.displayName = 'nextword/testimonial'
