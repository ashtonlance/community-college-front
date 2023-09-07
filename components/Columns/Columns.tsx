import { Column } from 'components/Column/Column'

export const Columns = props => {
  const allColumns = props.innerBlocks

  return (
    <div className="flex px-10 py-8">
      {allColumns.map(column => (
        <Column content={column.innerBlocks} key={column.dynamicContent} />
      ))}
    </div>
  )
}

Columns.displayName = 'core/columns'
