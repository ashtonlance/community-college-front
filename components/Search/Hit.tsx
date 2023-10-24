import React, { createElement } from 'react'

export function Hit({ hit, components }) {
  console.log(hit, 'hit')
  const urlWithoutDomain = hit?.permalink?.replace(
    'https://ncccsstg.wpengine.com',
    ''
  )
  return (
    <a href={urlWithoutDomain} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          {hit?.post_title !== '' && (
            <components.Highlight hit={hit} attribute="post_title" />
          )}
        </div>
      </div>
    </a>
  )
}
