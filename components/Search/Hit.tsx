import React, { createElement } from 'react'
import { Highlight } from 'react-instantsearch'

type PlainHitProps = {
  hit: any
  sendEvent: any
}

export function Hit({ hit, components }) {
  // console.log(hit, 'hit')
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
          {hit?.post_type_label && (
            <span className="aa-ItemContentSubtitle aa-ItemContentSubtitle--inline">
              <span className="aa-ItemContentSubtitleIcon" /> in{' '}
              <span className="aa-ItemContentSubtitleCategory">
                {hit.post_type_label}
              </span>
            </span>
          )}
        </div>
      </div>
    </a>
  )
}

export const PlainHit: React.FC<PlainHitProps> = ({ hit }) => {
  // console.log(hit, 'hit')
  const urlWithoutDomain = hit?.permalink?.replace(
    'https://ncccsstg.wpengine.com',
    ''
  )
  return (
    <a href={urlWithoutDomain} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle text-navy hover:text-darkGrey">
          <Highlight attribute="post_title" hit={hit} />
          {hit?.post_type_label && (
            <span className="aa-ItemContentSubtitle aa-ItemContentSubtitle--inline">
              <span className="aa-ItemContentSubtitleIcon" /> in{' '}
              <span className="aa-ItemContentSubtitleCategory">
                {hit.post_type_label}
              </span>
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
