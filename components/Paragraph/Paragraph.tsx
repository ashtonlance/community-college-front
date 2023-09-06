export const Paragraph = props => {
  return <div dangerouslySetInnerHTML={{ __html: props.originalContent }} />
}

Paragraph.displayName = 'core/paragraph'
