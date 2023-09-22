import { Button } from 'components/Button'
import { FadeIn } from 'components/FadeIn'
import Image from 'next/image'
import { cn } from 'utils/index'

export const CTABanner = ({ attributes }) => {
  const copy = attributes.data.cta_copy
  const btn_link = attributes.data.button_link
  const btn_label = attributes.data.button_label
  const bgColor = attributes.data.background_color || 'lightBlue'
  const type = attributes.data.type === 'fullWidth' ? 'full-width' : 'inset'
  const bgImageColor = bgColor === 'lightBlue' ? 'blue' : 'orange'
  const hasCard = attributes?.data?.hasCard || false

  if (type === 'full-width') {
    return (
      <FadeIn>
        <div
          className={`bg-${bgColor} relative py-[80px] px-[105px] md:px-[100px] md:py-[60px] sm:p-[40px]`}
        >
          <Image
            src={`/angles/angled-bg_${type}-cta_${bgImageColor}.jpg`}
            alt=""
            fill
            className="object-fill"
          />
          <div
            className={cn(
              `relative z-10 mx-auto flex max-w-[1030px] items-center md:flex-col ${
                hasCard
                  ? 'flex-wrap justify-center rounded-xl bg-white px-[105px] py-[60px] md:p-[60px]'
                  : 'justify-between'
              }}`
            )}
          >
            <span
              className={cn(
                `text-navy md:mb-[40px] md:text-center ${
                  hasCard ? 'h3 mb-8 text-center' : 'h2'
                }`
              )}
            >
              {copy}
            </span>
            <Button
              content={btn_label}
              arrow={hasCard ? false : true}
              classes={cn(
                `  w-fit whitespace-nowrap h-fit ${
                  hasCard
                    ? 'secondary-btn navy'
                    : 'primary-btn  white'
                }`
              )}
              linkto={btn_link}
            />
          </div>
        </div>
      </FadeIn>
    )
  } else {
    return (
      <FadeIn>
        <div
          className={`bg-white py-[60px] px-[105px] sm:p-[40px]`}
        >
          <div className="relative overflow-hidden rounded-xl px-[105px] py-[80px] md:p-[60px]">
            <Image
              src={`/angles/angled-bg_${type}-cta_${bgImageColor}.jpg`}
              alt=""
              fill
              className="object-fill"
            />
            <div className="relative z-10 mx-auto flex max-w-[1030px] items-center justify-between md:flex-col">
              <span className={`h3  md:mb-[40px] md:text-center`}>{copy}</span>
              <Button
                content={btn_label}
                arrow={true}
                classes="primary-btn white"
                linkto={btn_link}
              />
            </div>
          </div>
        </div>
      </FadeIn>
    )
  }
}

CTABanner.displayName = 'nextword/cta'
