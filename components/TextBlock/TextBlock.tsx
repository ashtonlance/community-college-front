import Link from 'next/link'
import { getHeadingTag } from '../../utils/headingType'
import { useState, useContext } from 'react'
import { PageContext } from 'wp-templates/single-event'
import { ButtonWithModalForm } from 'components/Button/ButtonWithModalForm'

export const TextBlock = ({ attributes }) => {
  const ctaLabel = attributes.data.button_button_text
  const ctaURL = attributes.data.button_button_link
  const requestInvite = attributes.data.button_request_invite
  const headingContent = attributes.data.heading
  const headingSize = attributes.data.heading_size
  const heading = getHeadingTag(headingSize, headingContent)
  const description = attributes.data.body_copy
  const tags = attributes.data.above_header_content_tags
  const aboveHeading = attributes.data.above_header_content_headline
  const colorModule = attributes.data.background_color
  const bottomSpacing = attributes.data.component_spacing_bottom_spacing
  const topSpacing = attributes.data.component_spacing_top_spacing
  const formEventRegistration = useContext(PageContext)

  const [modalActive, setModalActive] = useState(false)

  return (
    <div
      className={`w-full h-fit module-color-${colorModule} module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}
    >
      <div
        className={`flex flex-col py-[80px] md:px-[100px] justify-center sm:p-[40px] items-center max-w-[1030px] mx-auto`}
      >
        <div className="flex gap-[10px] flex-wrap justify-center">
          {aboveHeading ? (
            <h5>{aboveHeading}</h5>
          ) : (
            tags > 0 &&
            [...Array(tags).keys()].map(val => (
              <div
                key={val}
                className="flex gap-[10px] items-center justify-center"
              >
                <small className="text-[16px] font-bold leading-[150%] text-black sm:text-[14px]">
                  {attributes.data[`above_header_content_tags_${val}_tag`]}
                </small>
                {val + 1 < tags && <span>•</span>}
              </div>
            ))
          )}
        </div>
        <span className="text-black mt-[32px] sm:mt-[24px] text-center">
          {heading}
        </span>

        {description && (
          <div
            className="body-large text-gmt-400 text-center mt-[24px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {requestInvite == '1' ? (
          <ButtonWithModalForm
            setModalActive={setModalActive}
            modalActive={modalActive}
            ctaLabel={ctaLabel}
            classList="mt-[40px] sm:mt-[24px] primary-btn bg-black flex text-white w-fit"
            form={formEventRegistration}
          />
        ) : (
          ctaURL &&
          ctaLabel && (
            <Link
              href={ctaURL}
              className="mt-[40px] sm:mt-[24px] primary-btn bg-black flex text-white w-fit"
            >
              {ctaLabel}
            </Link>
          )
        )}
      </div>
    </div>
  )
}

TextBlock.displayName = 'nextword/text'
