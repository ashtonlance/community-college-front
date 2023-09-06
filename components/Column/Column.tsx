import { WordPressBlocksViewer } from '@faustwp/blocks'

export const Column = ({ content }) => {
  return (
    <div className="flex flex-col flex-1 gap-3">
      <WordPressBlocksViewer fallbackBlock={[] as any} blocks={content} />
    </div>
  )
}

Column.displayName = 'core/column'
