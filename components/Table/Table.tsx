export const Table = props => {
  return <div dangerouslySetInnerHTML={{ __html: props.originalContent }} />
}

Table.displayName = 'core/table'
