import { Parser } from 'html-to-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'

type WYSIWYGProps = {
  content?: string
  attributes?: {
    data?: {
      content?: string
      background_color?: string
      component_spacing_bottom_spacing?: string
      component_spacing_top_spacing?: string
    },
    className?: string
  }
  customClasses?: string
}

export const WYSIWYG: React.FC<WYSIWYGProps> = props => {
  const { customClasses = '', attributes } = props
  const {
    content = '',
    background_color: bgColor = '',
    component_spacing_bottom_spacing: bottomSpacing = 'medium',
    component_spacing_top_spacing: topSpacing = 'medium',
  } = attributes?.data || {}

  const editorCustomClasses = attributes?.className || '';

  const parser = useMemo(() => new (Parser as any)(), [])
  const reactElement = useMemo(() => parser.parse(content), [parser, content])
  const reactHtml = useMemo(() => renderToString(reactElement), [reactElement])

  const wysiwyg = useRef(null)
  const mobile_table = useRef(null)

  const [windowSize, setWindowSize] = useState({ width: undefined })

  const handleResize = useCallback(() => {
    const newWidth = window.innerWidth
    if (windowSize.width !== newWidth) {
      setWindowSize({ width: newWidth })
    }
  }, [windowSize.width])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    if (windowSize.width < 640) {
      initResponsiveTables()
    }
    return () => window.removeEventListener('resize', handleResize)
  }, [windowSize.width, handleResize])

  const setInnerTableData = useCallback(
    html => <span dangerouslySetInnerHTML={{ __html: html }}></span>,
    []
  )

  const MobileTable = useCallback(
    ({ new_rows }) => <tbody ref={mobile_table}>{new_rows}</tbody>,
    []
  )

  const initResponsiveTables = useCallback(() => {
    const tables = wysiwyg.current.querySelectorAll('table')

    if (tables) {
      tables.forEach((table, tableIndex) => {
        // Duplicate table on mobile to alter HTML
        const table_clone = table.cloneNode(true)
        const head = table.querySelectorAll('tr')[0]
        // Allow for markup differences - tables use either th or td for headings
        const headings =
          head?.querySelectorAll('th').length > 0
            ? head?.querySelectorAll('th')
            : head?.querySelectorAll('td')
        const rows = table.querySelectorAll('tr:not(:first-child)')
        const new_rows = []

        if (!mobile_table.current) {
          table.after(table_clone)
          table.classList.add('sm:hidden', 'table')
          table_clone.classList.add('sm:table', 'hidden')
        }

        rows.forEach((row, rowIndex) => {
          const cols = row.querySelectorAll('td')
          const classname = rowIndex % 2 ? 'even' : 'odd'

          cols.forEach((col, i) => {
            const new_tr = React.createElement(
              'tr',
              {
                className: classname,
                key: `table-${tableIndex} row-${rowIndex}-${i}`,
              },
              React.createElement(
                'td',
                {
                  className:
                    'bg-lightBlue text-navy text-[12px] font-extrabold tracking-[0.72px] uppercase',
                },
                null,
                headings[i]?.innerText
              ),
              React.createElement(
                'td',
                {
                  className:
                    'bg-transparent text-darkGrey text-[14px] sm:w-full w-auto',
                },
                null,
                setInnerTableData(col.innerHTML)
              )
            )
            new_rows.push(new_tr)
          })
        })

        // If not already rendered
        if (!mobile_table.current) {
          const root = createRoot(table_clone)
          root.render(<MobileTable new_rows={new_rows} />)
        }
      })
    }
  }, [setInnerTableData, MobileTable])

  return (
    <div
      ref={wysiwyg}
      className={`bg-${bgColor} ${editorCustomClasses} ${customClasses} wysiwyg body-regular px-52 module-spacing-bottom-${bottomSpacing}  module-spacing-top-${topSpacing} md:px-[100px] md:py-[60px] sm:p-10`}
      dangerouslySetInnerHTML={{ __html: reactHtml }}
    />
  )
}

WYSIWYG.displayName = 'nextword/wysiwyg'
