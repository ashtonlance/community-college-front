// @ts-nocheck
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Close from '/assets/icons/close.svg'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch'
import { Autocomplete, MemoizedAutoComplete } from './Autocomplete'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import { Hit } from './Hit'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import '@algolia/autocomplete-theme-classic'

import Link from 'next/link'
import { cn } from 'utils/index'

type SearchProps = {
  transparentMode: boolean
  searchOpened: (val: boolean) => void
}

const searchClient = algoliasearch(
  'PG0GKBPWHA',
  '7df94afcf55425f42a8834ee1f6da871'
)

export const INSTANT_SEARCH_INDEX_NAME = 'wp_searchable_posts'
export const INSTANT_SEARCH_QUERY_SUGGESTIONS =
  'wp_searchable_posts_query_suggestions'

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
  getSearchParams() {
    return {
      hitsPerPage: 5,
    }
  },
  transformSource({ source, onTapAhead }) {
    return {
      ...source,
      // getItemUrl({ item }) {
      //   return `https://google.com?q=${item.query}`;
      // },
      onSelect({ setIsOpen }) {
        setIsOpen(true)
      },
      templates: {
        ...source.templates,
        item(params) {
          const { item, html } = params
          console.log(item, 'item header')
          return html`<a
            class="aa-ItemLink"
            href="https://google.com?q=${item.query}"
          >
            ${item?.post_title}
          </a>`
        },
      },
    }
  },
})

export const Search = ({ transparentMode, searchOpened }: SearchProps) => {
  const [searchedTerm, setSearchedTerm] = useState('')
  const [searchBarActive, setSearchBarActive] = useState(false)

  const [navigationHeight, setNavigationHeight] = useState(140)
  const [navigation, setNavigation] = useState(null)

  useEffect(() => {
    setNavigation(document.getElementById('topbar'))
  }, [])
  useEffect(() => {
    console.log(searchBarActive, 'searchBarActive')
  }, [searchBarActive])
  // get header size dynamically to move main content below
  const handleResize = () => {
    setNavigationHeight(navigation?.clientHeight)
  }

  useEffect(() => {
    if (navigation?.clientHeight > 190) {
      setNavigationHeight(200)
    } else {
      setNavigationHeight(140)
    }
    window.addEventListener('resize', handleResize, false)
  }, [navigation])

  const handleChange = event => {
    setSearchedTerm(event.target.value)
  }

  const toggleSearchBar = () => {
    searchOpened(!searchBarActive)
    setSearchBarActive(!searchBarActive)
  }

  return (
    <div className="flex items-center gap-[10px] hover:cursor-pointer">
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
        // className={cn(
        //   `${
        //     searchBarActive
        //       ? `top-[${navigationHeight}px] h-[80px] opacity-100 sm:top-[70px]`
        //       : 'top-[-100px] h-[0px] opacity-0'
        //   } delay-250 semi-modal absolute left-0 right-0 z-0 flex items-center justify-center gap-3 bg-white  transition-opacity ease-in-out sm:px-[20px]`
        // )}
        className={`semi-modal ${
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
          <MemoizedAutoComplete
            openOnFocus={true}
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
                  return item.permalink
                },
              },
            ]}
            plugins={[querySuggestionsPlugin]}
            placeholder={'Search'}
          />
        </InstantSearch>
      </div>
    </div>
  )
}
