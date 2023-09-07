import Image from 'next/image'
import arrowright from '../../assets/icons/arrow-right.svg'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export const Button = ({
  content,
  arrow = false,
  classes = 'primary-btn',
  linkto = '/',
  attributes = null,
  target = '',
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

  if (attributes?.data) {
    const bgColorModule = attributes.data.background
    const marginBottom = attributes.data.component_spacing_bottom_spacing
    const marginTop = attributes.data.component_spacing_top_spacing
    const buttonLabel = attributes.data.button_label
    const buttonLink = attributes.data.button_link['url']
    const alignment = attributes.data.button_alignment
    const buttonColor = attributes.data.button_background || 'green'
    const target = attributes.data.button_link['target']
    return (
      <div>
        <div
          className={`button flex px-[100px] md:px-[60px] sm:mx-auto sm:w-full sm:px-[40px] module-spacing-top-${marginTop} module-spacing-bottom-${marginBottom} module-color-${bgColorModule} justify-${alignment}`}
          ref={ref}
        >
          <Link
            href={buttonLink}
            className={`primary-btn bg-${buttonColor} hover:bg-stone hover:text-emerald border-emerald w-fit items-center justify-center border-[1.5px] text-white ${classes} flex gap-[11px]`}
            suppressHydrationWarning
            target={target}
          >
            {buttonLabel}
            {arrow && <Image alt="" src={arrowright} width={9} height={9} />}
          </Link>
        </div>
      </div>
    )
  } else if (content) {
    return (
      <Link
        href={linkto}
        className={`button flex w-fit items-center justify-center gap-[11px] ${classes}`}
        ref={ref}
        suppressHydrationWarning
        target={target}
      >
        {content}
        {arrow && <Image alt="" src={arrowright} width={9} height={9} />}
      </Link>
    )
  } else {
    return null
  }
}
Button.displayName = 'nextword/button'
