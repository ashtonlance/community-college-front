// @ts-nocheck
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import { useDebounce } from '@uidotdev/usehooks'
import algoliasearch from 'algoliasearch/lite'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock'
import { useCallback, useEffect, useRef, useState } from 'react'
import { InstantSearch } from 'react-instantsearch'
import { MemoizedAutoComplete } from './Autocomplete'
import { Hit } from './Hit'
import Close from '/assets/icons/close.svg'

import '@algolia/autocomplete-theme-classic'

type SearchProps = {
  transparentMode: boolean
  searchOpened: (val: boolean) => void
}

export const searchClient = algoliasearch(
  'PG0GKBPWHA',
  '7df94afcf55425f42a8834ee1f6da871'
)

export const INSTANT_SEARCH_INDEX_NAME = 'wp_searchable_posts'
export const INSTANT_SEARCH_QUERY_SUGGESTIONS =
  'wp_searchable_posts_query_suggestions'

export const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
  getSearchParams() {
    return {
      hitsPerPage: 3,
    }
  },
  categoryAttribute: [
    'instant_search',
    'facets',
    'exact_matches',
    'categories',
    'taxonomies',
  ],
  transformSource({ source, onTapAhead }) {
    return {
      ...source,
      getItemUrl({ item }) {
        return item.permalink
      },
      onSelect({ setIsOpen }) {
        setIsOpen(true)
      },
      templates: {
        ...source.templates,
      },
    }
  },
})

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'navbar',
})

export const Search = ({ transparentMode, searchOpened }: SearchProps) => {
  const [searchBarActive, setSearchBarActive] = useState(false)

  const [navigationHeight, setNavigationHeight] = useState(140)
  const [navigation, setNavigation] = useState(null)

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchTerm = useDebounce(searchValue, 500)
  const setSearchValueCallback = useCallback(
    (value: string) => {
      console.log('value', value)
      setSearchValue(value)
    },
    [setSearchValue]
  )

  const ref = useRef(null)

  useEffect(() => {
    setNavigation(document.getElementById('topbar'))
  }, [])

  // get header size dynamically to move main content below
  const handleResize = useCallback(() => {
    setNavigationHeight(navigation.clientHeight)
  }, [navigation])

  useEffect(() => {
    if (navigation?.clientHeight > 190) {
      setNavigationHeight(200)
    } else {
      setNavigationHeight(140)
    }
    window.addEventListener('resize', handleResize, false)
  }, [navigation, handleResize])

  useEffect(() => {
    if (!navigation) return
    const resizeObserver = new ResizeObserver(() => {
      if (navigation?.clientHeight > 190) {
        setNavigationHeight(192)
      } else {
        setNavigationHeight(navigation?.clientHeight)
      }
    })
    resizeObserver.observe(navigation)
    return () => resizeObserver.disconnect() // clean up
  }, [navigation, navigationHeight])

  const toggleSearchBar = () => {
    searchOpened(!searchBarActive)
    setSearchBarActive(!searchBarActive)

    // Check if not a mobile device
    const userAgent = navigator.userAgent
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      )

    if (!isMobile) {
      if (!searchBarActive) {
        disableBodyScroll(ref?.current)
      } else {
        enableBodyScroll(ref?.current)
      }
    }
  }

  useEffect(() => {
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  return (
    <div
      className="flex items-center gap-[10px] hover:cursor-pointer"
      ref={ref}
    >
      <div
        className="flex items-center gap-[10px] hover:cursor-pointer"
        onClick={toggleSearchBar}
      >
        {'Search'}
        {searchBarActive ? (
          <Close className="flex h-[18px] w-[18px] cursor-pointer flex-col items-center rounded-[3px]" />
        ) : transparentMode ? (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <circle
                cx="8.26125"
                cy="8.44917"
                r="5.52297"
                stroke="#14435B"
                strokeWidth="2"
              />
              <path
                d="M14.5839 15.724L15.291 16.4311L16.7052 15.0169L15.9981 14.3098L14.5839 15.724ZM11.5292 12.6693L14.5839 15.724L15.9981 14.3098L12.9434 11.2551L11.5292 12.6693Z"
                fill="#14435B"
              />
            </svg>
          </div>
        ) : (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <circle
                cx="8.26125"
                cy="8.44917"
                r="5.52297"
                stroke="#14435B"
                strokeWidth="2"
              />
              <path
                d="M14.5839 15.724L15.291 16.4311L16.7052 15.0169L15.9981 14.3098L14.5839 15.724ZM11.5292 12.6693L14.5839 15.724L15.9981 14.3098L12.9434 11.2551L11.5292 12.6693Z"
                fill="#14435B"
              />
            </svg>
          </div>
        )}
      </div>

      <div
        className={`${
          searchBarActive ? 'semi-modal' : 'hidden'
        } top-[${navigationHeight}px]`}
      >
        <InstantSearch
          searchClient={searchClient}
          indexName="wp_searchable_posts"
          future={{
            preserveSharedStateOnUnmount: true,
          }}
        >
          <div className="flex w-full bg-white px-8">
            <MemoizedAutoComplete
              searchOpened={searchOpened}
              openOnFocus={true}
              autoFocus={true}
              setSearchValue={setSearchValueCallback}
              getSources={({ query }) => [
                {
                  sourceId: 'wp_searchable_posts_query_suggestions',
                  getItems() {
                    return getAlgoliaResults({
                      searchClient,
                      queries: [
                        {
                          indexName: 'wp_searchable_posts',
                          query,
                        },
                      ],
                    })
                  },
                  templates: {
                    item({ item, components }) {
                      return <Hit hit={item} components={components} />
                    },
                    noResults() {
                      return 'No results.'
                    },
                  },
                  getItemUrl({ item }) {
                    const urlWithoutDomain = item?.permalink?.replace(
                      'https://ncccsstg.wpengine.com',
                      ''
                    )
                    return urlWithoutDomain
                  },
                },
              ]}
              plugins={[querySuggestionsPlugin, recentSearchesPlugin]}
              placeholder={'Enter a search term...'}
            />
          </div>
        </InstantSearch>
      </div>
    </div>
  )
}
