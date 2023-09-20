import { Button } from 'components/Button'
import { FadeIn } from 'components/FadeIn'
import Image from 'next/image'

export const CTABanner = ({ attributes }) => {
  const copy = attributes.data.cta_copy
  const btn_link = attributes.data.button_link
  const btn_label = attributes.data.button_label
  const bottomSpacing = attributes.data.component_spacing_bottom_spacing
  const topSpacing = attributes.data.component_spacing_top_spacing
  const bgColor = attributes.data.background_color || 'lightBlue'
  const type = attributes.data.type === 'fullWidth' ? 'full-width' : 'inset'
  const bgImageColor = bgColor === 'lightBlue' ? 'blue' : 'orange'
  if (type === 'full-width') {
    return (
      <FadeIn>
        <div
          className={`bg-${bgColor} px-[105px] py-[80px] md:p-[60px] module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing} relative`}
        >
          <Image
            src={`/angles/angled-bg_${type}-cta_${bgImageColor}.jpg`}
            alt=""
            fill
            className="object-fill"
          />
          <div className="relative z-10 mx-auto flex max-w-[1030px] items-center justify-between md:flex-col">
            <span className={`h2 text-navy md:mb-[40px] md:text-center`}>
              {copy}
            </span>
            <Button
              content={btn_label}
              arrow={true}
              classes="primary-btn bg-white w-fit whitespace-nowrap h-fit"
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
          className={`bg-white p-[100px] md:p-[60px] module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing} `}
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
                classes="primary-btn bg-white w-fit whitespace-nowrap h-fit"
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
