import 'faust.config'
import React from 'react'
import { useRouter } from 'next/router'
import { FaustProvider } from '@faustwp/core'
import 'styles/globals.css'
import 'styles/custom-styles.css'
import { WordPressBlocksProvider } from '@faustwp/blocks'
import blocks from 'wp-blocks'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <FaustProvider pageProps={pageProps}>
      <WordPressBlocksProvider
        config={{
          // @ts-ignore
          blocks,
        }}
      >
        <Component {...pageProps} key={router.asPath} />
      </WordPressBlocksProvider>
    </FaustProvider>
  )
}
