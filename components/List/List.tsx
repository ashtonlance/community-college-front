export const List = props => {
  const items = props.innerBlocks

  return (
    <div
      key={props.dynamicContent}
      dangerouslySetInnerHTML={{ __html: props.dynamicContent }}
    />
  )
}

List.displayName = 'core/list'
