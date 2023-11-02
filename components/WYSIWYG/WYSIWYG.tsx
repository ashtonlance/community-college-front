import { Parser } from 'html-to-react'
import { renderToString } from 'react-dom/server'

type WYSIWYGProps = {
  content?: string
  attributes?: {
    data?: {
      content?: string
      background_color?: string
      component_spacing_bottom_spacing?: string
      component_spacing_top_spacing?: string
    }
  }
  customClasses?: string
}

export const WYSIWYG: React.FC<WYSIWYGProps> = props => {
  const customClasses = props.customClasses || ''
  const content = props?.attributes?.data?.content || ''
  const bgColor = props?.attributes?.data?.background_color || ''
  const bottomSpacing =
    props?.attributes?.data?.component_spacing_bottom_spacing || ''
  const topSpacing =
    props?.attributes?.data?.component_spacing_top_spacing || ''

  const parser = new (Parser as any)()
  const reactElement = parser.parse(content)
  const reactHtml = renderToString(reactElement)
  return (
    <div
      className={`bg-${bgColor} ${customClasses} wysiwyg body-regular px-52 py-20 module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing} md:px-[100px] md:py-[60px] sm:p-10`}
      dangerouslySetInnerHTML={{ __html: reactHtml }}
    />
  )
}

WYSIWYG.displayName = 'nextword/wysiwyg'
