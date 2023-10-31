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
  const isEmailLink = attributes?.data?.emailLink || false

  const renderButton = () => {
    if (isEmailLink) {
      return (
        <a
          href={`mailto:${btn_link}`}
          className={cn(
            `  h-fit w-fit whitespace-nowrap ${
              hasCard ? 'secondary-btn navy' : 'primary-btn  white'
            }`
          )}
        >
          {btn_label}
        </a>
      )
    } else {
      return (
        <Button
          content={btn_label}
          arrow={false}
          classes={cn(
            `primary-btn w-fit whitespace-nowrap h-fit
            ${
              type === "inset" ? 'secondary-btn navy' : 'white'
            }
            ${
              bgColor === "gold" ? 'hover:!text-white' : ''
            }
            ${
              bgColor === "gold" && type === "full-width" ? 'hover:!bg-navy' : ''
            }`
          )}
          linkto={btn_link}
        />
      )
    }
  }

  if (type === 'full-width') {
    return (
      <FadeIn>
        <div
          className={`bg-${bgColor} relative px-[105px] py-[80px] md:px-[100px] md:py-[60px] sm:p-[40px]`}
        >
          <Image
            src={`/angles/angled-bg_${type}-cta_${bgImageColor}.jpg`}
            alt=""
            fill
            className="object-fill"
          />
          <div
            className={cn(
              `relative z-10 mx-auto flex max-w-[1030px] items-center gap-10 md:flex-col ${
                hasCard
                  ? 'flex-wrap justify-center rounded-xl bg-white px-[105px] py-[60px] md:p-[60px]'
                  : 'justify-between'
              }`
            )}
          >
            <span
              className={cn(
                `text-navy md:text-center ${
                  hasCard ? 'h3 mb-8 w-full text-center' : 'h2'
                }`
              )}
            >
              {copy}
            </span>
            {renderButton()}
          </div>
        </div>
      </FadeIn>
    )
  } else if (type === 'inset') {
    return (
      <FadeIn>
        <div
          className={`px-[105px] py-[60px] sm:p-[40px]`}
          style={{
            backgroundImage: `url(/angles/angled-bg_${type}-cta_${bgImageColor}.jpg)`,
            backgroundSize: 'cover',
          }}
        >
          <div className="relative overflow-hidden rounded-xl bg-white px-[105px] py-[60px] md:p-[60px] sm:p-[40px]">
            <div className="relative z-10 mx-auto flex max-w-[1030px] flex-col items-center justify-between md:flex-col">
              <h3 className={`h3 md:mb-[32px] md:text-center sm:text-[28px]`}>
                {copy}
              </h3>
              {renderButton()}
            </div>
          </div>
        </div>
      </FadeIn>
    )
  }
}

CTABanner.displayName = 'nextword/cta'
