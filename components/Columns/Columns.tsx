import { Column } from 'components/Column/Column'

export const Columns = props => {
  const allColumns = props.innerBlocks

  return (
    <div className="flex py-8 px-10">
      {allColumns.map(column => (
        <Column content={column.innerBlocks} key={column.dynamicContent} />
      ))}
    </div>
  )
}

Columns.displayName = 'core/columns'
