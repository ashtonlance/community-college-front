export const Heading = props => {
  return (
    <div
      className="mb-[32px] sm:mb-[24px]"
      dangerouslySetInnerHTML={{ __html: props.originalContent }}
    />
  )
}

Heading.displayName = 'core/heading'
