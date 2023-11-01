import { Highlight } from 'react-instantsearch'
import { truncate } from 'utils/stringHelpers'

type PlainHitProps = {
  hit: any
  sendEvent: any
}

export function Hit({ hit, components }) {
  const urlWithoutDomain = hit?.permalink?.replace(
    'https://ncccsstg.wpengine.com',
    ''
  )
  return (
    <a href={urlWithoutDomain} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle sub-nav text-xl text-navy md:text-lg">
          {hit?.post_title !== '' && (
            <components.Highlight hit={hit} attribute="post_title" />
          )}
          {hit?.post_type_label && (
            <span className="aa-ItemContentSubtitle aa-ItemContentSubtitle--inline font-normal text-darkGrey">
              <span className="aa-ItemContentSubtitleIcon" /> in{' '}
              <span className="aa-ItemContentSubtitleCategory text-darkGrey">
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
  console.log(hit, 'hit')
  const urlWithoutDomain = hit?.permalink?.replace(
    'https://ncccsstg.wpengine.com',
    ''
  )
  return (
    <a href={urlWithoutDomain} className="aa-ItemLink py-4">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle body-large font-bold text-navy hover:text-darkGrey">
          <Highlight attribute="post_title" hit={hit} />
          {hit?.post_type_label && (
            <span className="aa-ItemContentSubtitle aa-ItemContentSubtitle--inline">
              <span className="aa-ItemContentSubtitleIcon" /> in{' '}
              <span className="aa-ItemContentSubtitleCategory">
                {hit.post_type_label}
              </span>
            </span>
          )}
          <div className="body-regular text-darkGrey">
            {truncate(hit?.content || '', 150)}
          </div>
        </div>
      </div>
    </a>
  )
}
