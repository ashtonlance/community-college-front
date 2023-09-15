import React from 'react'
import { renderToString } from 'react-dom/server'
import { Parser } from 'html-to-react'

type WYSIWYGProps = {
  content: string
}

export const WYSIWYG: React.FC<WYSIWYGProps> = props => {
  const content = props?.attributes?.data?.content || ''
  const bgColor = props?.attributes?.data?.background_color || ''
  const bottomSpacing =
    props?.attributes?.data?.component_spacing_bottom_spacing || ''
  const topSpacing =
    props?.attributes?.data?.component_spacing_top_spacing || ''
  console.log(props, 'props')

  const parser = new (Parser as any)()
  const reactElement = parser.parse(content)
  const reactHtml = renderToString(reactElement)
  return (
    <div
      className={`bg-${bgColor} wysiwyg body-regular px-52 py-20 module-margin-bottom-${bottomSpacing}  module-margin-top-${topSpacing}`}
      dangerouslySetInnerHTML={{ __html: reactHtml }}
    />
  )
}

WYSIWYG.displayName = 'nextword/wysiwyg'
