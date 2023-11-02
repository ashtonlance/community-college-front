import { autocomplete } from '@algolia/autocomplete-js'
import {
  KeyboardEvent,
  createElement,
  Fragment,
  useEffect,
  useRef,
  memo,
  useState,
  useCallback,
} from 'react'
import { createRoot } from 'react-dom/client'
import { useRouter } from 'next/router'

export function Autocomplete(props) {
  const containerRef = useRef(null)
  const panelRootRef = useRef(null)
  const rootRef = useRef(null)
  const [searchValue, _setSearchValue] = useState('')
  const router = useRouter()
  const searchValueRef = useRef(searchValue)
  const searchOpened = props.searchOpened || false

  const setSearchValue = useCallback(value => {
    searchValueRef.current = value
    _setSearchValue(value)
  }, [])

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      insights: true,
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root

          panelRootRef.current?.unmount()
          panelRootRef.current = createRoot(root)
        }

        panelRootRef.current.render(children)
      },
      onStateChange({ state }) {
        setSearchValue(state.query)
      },
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props, setSearchValue])

  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && searchOpened && searchValue) {
        router.push(`/search?query=${searchValue}`) // use ref
      }
    }

    window.addEventListener('keydown', handleEnterKey)

    return () => {
      window.removeEventListener('keydown', handleEnterKey)
    }
  }, [searchValue])

  return (
    <>
      <div className="w-full" ref={containerRef} />
      <button onClick={() => router.push(`/search?query=${searchValue}`)}>
        Search
      </button>
    </>
  )
}

export const MemoizedAutoComplete = memo(Autocomplete)
