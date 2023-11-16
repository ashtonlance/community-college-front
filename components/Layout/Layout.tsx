import parse from 'html-react-parser'
import Head from 'next/head'
import { createRef, memo, useCallback, useEffect, useState } from 'react'
import { cn } from 'utils/index'
import { Footer } from '../Footer'
import { Header, HeaderVariant } from '../Header'

export type LayoutProps = {
  menuItems?: any
  headerVariant?: HeaderVariant
  form?: any
  seo?: any
  pageClassName?: string
  children?: any
  utilityNavigation?: any
  footerNavigation?: any
  settings?: any
  socialLinks?: any
  databaseId?: number
}

export function Layout(props: LayoutProps) {
  const title = props?.seo?.title || 'NCCCS'
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
  const [navigationHeight, setNavigationHeight] = useState(140)
  const navigation = createRef<HTMLDivElement>()
  const MemoizedHeader = memo(Header)
  const socialLinks = props?.socialLinks || []
  const databaseId = props?.databaseId || ''
  const editUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/post.php?post=${databaseId}&action=edit`

  const [showEditUrl, setShowEditUrl] = useState(false)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'e') {
        setShowEditUrl(!showEditUrl)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showEditUrl])

  const editLinkRef = createRef<HTMLAnchorElement>()

  useEffect(() => {
    if (showEditUrl && editLinkRef.current) {
      editLinkRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showEditUrl, editLinkRef])

  // get header size dynamically to move main content below
  const handleResize = useCallback(() => {
    setNavigationHeight(navigation?.current?.clientHeight)
  }, [navigation])

  useEffect(() => {
    if (navigation?.current?.clientHeight > 190) {
      setNavigationHeight(192)
    } else {
      setNavigationHeight(140)
    }
    window.addEventListener('resize', handleResize, false)
  }, [navigation, handleResize])

  useEffect(() => {
    if (!navigation?.current) return
    const resizeObserver = new ResizeObserver(() => {
      if (navigation?.current?.clientHeight > 190) {
        setNavigationHeight(192)
      } else {
        setNavigationHeight(140)
      }
    })
    resizeObserver.observe(navigation?.current)
    return () => resizeObserver.disconnect() // clean up
  }, [navigation, navigationHeight])

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
      <MemoizedHeader
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
        className={cn(`flex flex-col ${
          hasAnnouncementBar === '1'
            ? 'show-announcement-bar'
            : 'hide-announcement-bar'
        }
        `)}
      >
        {props.children}
      </main>
      <Footer
        socialLinks={socialLinks}
        footerNavigation={footerNavigation}
        menuItems={props.menuItems}
      />
      {showEditUrl && (
        <div className="flex justify-center py-4">
          <a
            ref={editLinkRef}
            className="text-2xl text-navy underline hover:text-darkGrey"
            target="_blank"
            href={editUrl}
          >
            Edit this page in WordPress
          </a>
        </div>
      )}
    </>
  )
}
