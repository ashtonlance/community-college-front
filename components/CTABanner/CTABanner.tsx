import { Button } from 'components/Button'
import { PageContext } from 'wp-templates/single-event'
import { ButtonWithModalForm } from 'components/Button/ButtonWithModalForm'
import { useState, useContext } from 'react'
import { FadeIn } from 'components/FadeIn'

export const CTABanner = ({ attributes }) => {
  const copy = attributes.data.cta_copy
  const btn_link = attributes.data.button_link
  const btn_label = attributes.data.button_label
  const requestInvite = attributes.data.button_request_invite
  const bottomSpacing = attributes.data.component_spacing_bottom_spacing
  const topSpacing = attributes.data.component_spacing_top_spacing
  const bgColor = attributes.data.background_color || 'green'

  const formEventRegistration = useContext(PageContext)

  const [modalActive, setModalActive] = useState(false)

  return (
    <FadeIn>
      <div
        className={`bg-${bgColor} p-[80px] md:p-[60px] module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing}`}
      >
        <div className="mx-auto flex max-w-[1030px] items-center justify-between md:flex-col">
          <h2
            className={`${
              bgColor === 'sky' ? 'text-black' : 'text-white'
            } md:mb-[40px] md:text-center`}
          >
            {copy}
          </h2>

          {requestInvite == '1' ? (
            <ButtonWithModalForm
              setModalActive={setModalActive}
              modalActive={modalActive}
              ctaLabel={btn_label}
              classList="primary-btn bg-white w-fit whitespace-nowrap h-fit"
              form={formEventRegistration}
            />
          ) : (
            <Button
              content={btn_label}
              arrow={true}
              classes="primary-btn bg-white w-fit whitespace-nowrap h-fit"
              linkto={btn_link}
            />
          )}
        </div>
      </div>
    </FadeIn>
  )
}

CTABanner.displayName = 'nextword/cta'
