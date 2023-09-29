import 'faust.config'
import React from 'react'
import { useRouter } from 'next/router'
import { FaustProvider } from '@faustwp/core'
import 'styles/globals.css'
import 'styles/custom-styles.css'
import { WordPressBlocksProvider } from '@faustwp/blocks'
import blocks from 'wp-blocks'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <Script id="userback">
        {`
            window.Userback = window.Userback || {};
            Userback.access_token = '34593|84993|TvSQkuVWCDW8KnB5Bc3bs1Pi7';
            (function(d) {
                var s = d.createElement('script');s.async = true;
                s.src = 'https://static.userback.io/widget/v1.js';
                (d.head || d.body).appendChild(s);
            })(document);`}
      </Script>
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
    </>
  )
}
