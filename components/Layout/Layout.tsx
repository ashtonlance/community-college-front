import { Header, HeaderVariant } from '../Header'
import { Footer } from '../Footer'
import Head from 'next/head'
import { cn } from 'utils/index'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import React from 'react'

export type LayoutProps = {
  menuItems?: any
  headerVariant?: HeaderVariant
  form?: any
  seo?: any
  pageClassName?: string
  children: any
  utilityNavigation?: any
  footerNavigation?: any
  settings?: any
}

export function Layout(props: LayoutProps) {
  const title = props?.seo?.title || 'NextWord'
  const metaDesc = props?.seo?.metaDesc || ''
  const canonical = props?.seo?.canonical || ''
  const schema = props?.seo?.schema || ''
  const variant = props?.headerVariant || 'default'
  const menuItems = props?.menuItems || []
  const utilityNavigation = props?.utilityNavigation || []
  const footerNavigation = props?.footerNavigation || []
  const settings = props?.settings || []
  const fullHead = props?.seo?.fullHead ? parse(props?.seo?.fullHead) : ''
  const hasAnnouncementBar = settings?.announcementBar?.showAnnouncementBar
  const [navigationHeight, setNavigationHeight] = useState(undefined)
  const navigation = React.createRef<HTMLDivElement>()

  // get header size dynamically to move main content below
  const handleResize = () => {
    setNavigationHeight(
      navigation?.current?.clientHeight
      );
    }

  useEffect(() => {
    setNavigationHeight(navigation?.current?.clientHeight)
    window.addEventListener("resize", handleResize, false);
  }, [navigation])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <meta name="canonical" content={canonical} />
        <script type="application/ld+json">{schema.raw}</script>
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_WORDPRESS_URL}
        ></link>
        {fullHead}
      </Head>
      <Header
        ref={navigation}
        menuItems={menuItems}
        utilityNavigation={utilityNavigation}
        form={props.form}
        variant={variant}
        announcementBar={settings?.announcementBar}
      />

      <main
        style={{
          marginTop: `${navigationHeight}px`,
        }}
        className={cn(`flex min-h-screen flex-col ${
          hasAnnouncementBar === '1'
            ? 'show-announcement-bar'
            : 'hide-announcement-bar'
        }
        `)}
      >
        {props.children}
      </main>
      <Footer footerNavigation={footerNavigation} menuItems={props.menuItems} />
    </>
  )
}
