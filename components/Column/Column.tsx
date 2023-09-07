import { WordPressBlocksViewer } from '@faustwp/blocks'

export const Column = ({ content }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <WordPressBlocksViewer fallbackBlock={[] as any} blocks={content} />
    </div>
  )
}

Column.displayName = 'core/column'
