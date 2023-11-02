import { WordPressBlocksProvider } from '@faustwp/blocks'
import { FaustProvider } from '@faustwp/core'
import 'faust.config'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import 'styles/custom-styles.css'
import 'styles/globals.css'
import * as gtag from 'utils/gtag'
import blocks from 'wp-blocks'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const handleRouteChange = url => {
        gtag.pageview(url)
      }
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])
  return (
    <>
      <Script id="userback" strategy="lazyOnload">
        {`
            window.Userback = window.Userback || {};
            Userback.access_token = '34593|84993|TvSQkuVWCDW8KnB5Bc3bs1Pi7';
            (function(d) {
                var s = d.createElement('script');s.async = true;
                s.src = 'https://static.userback.io/widget/v1.js';
                (d.head || d.body).appendChild(s);
            })(document);`}
      </Script>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
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
