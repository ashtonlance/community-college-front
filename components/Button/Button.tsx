import ArrowRight from '../../assets/icons/arrow-forward-sharp-reverse.svg'
import ArrowRightLarge from '../../assets/icons/arrow-right-large.svg'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export const Button = ({
  content,
  arrow = false,
  classes = 'primary-btn',
  linkto = '/',
  attributes = null,
  target = '',
  onClick = () => {},
  isButton = false,
}) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const currentElement = ref.current
      const targetElement =
        currentElement?.parentElement?.previousElementSibling?.children[0]

      if (currentElement.classList.contains('module-spacing-top-none')) {
        targetElement.classList.add('!pb-4')
      }
    }
  }),
    [ref]

  if (isButton) {
    return (
      <>
      <button
        className={`button flex w-fit items-center justify-center gap-[11px] ${classes} group`}
        ref={ref}
        suppressHydrationWarning
        onClick={onClick}
      >
        {content}
        {arrow && (
          <>
          <ArrowRightLarge
            className="h-5 w-5 text-gold group-hover:text-navy transition-colors"
            alt=""
          />
        </>
        )}
      </button>
    </>
    )
  }

  if (attributes?.data) {
    const bgColorModule = attributes.data.background
    const marginBottom = attributes.data.component_spacing_bottom_spacing
    const marginTop = attributes.data.component_spacing_top_spacing
    const buttonLabel = attributes.data.button_link['title']
    const buttonLink = attributes.data.button_link['url']
    const alignment = attributes.data.button_alignment
    const buttonColor = attributes.data.button_background || 'navy'
    const buttonType = attributes.data.button_type
    const target = attributes.data.button_link['target']
    return (
      <div>
        <div
          className={`button flex px-[100px] md:px-[60px] sm:mx-auto sm:w-full sm:px-[40px] module-spacing-top-${marginTop} module-spacing-bottom-${marginBottom} bg-${bgColorModule} justify-${alignment}`}
          ref={ref}
        >
          <Link
            href={buttonLink}
            className={`${buttonType}-btn ${buttonColor}`}
            suppressHydrationWarning
            target={target}
          >
            {buttonLabel}
            {arrow && <ArrowRight alt="" width={9} height={9} />}
          </Link>
        </div>
      </div>
    )
  } else if (content) {
    return (
      <Link
        href={linkto}
        className={`button flex w-fit items-center justify-center gap-[11px] ${classes} group`}
        ref={ref}
        suppressHydrationWarning
        target={target}
        onClick={onClick}
      >
        {content}
        {arrow && (
          <ArrowRight
            className="h-5 w-5 text-gold group-hover:text-navy"
            alt=""
          />
        )}
      </Link>
    )
  } else {
    return null
  }
}
Button.displayName = 'nextword/button'
