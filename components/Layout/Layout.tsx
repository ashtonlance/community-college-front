import { Header, HeaderVariant } from '../Header'
import { Footer } from '../Footer'
import Head from 'next/head'
import { cn } from 'utils/index'
import parse from 'html-react-parser'

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
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_WORDPRESS_URL}
        ></link>
        {fullHead}
      </Head>
      <Header
        menuItems={menuItems}
        utilityNavigation={utilityNavigation}
        form={props.form}
        variant={variant}
        showAnnouncementBar={settings?.announcementBar?.showAnnouncementBar}
        announcementBarText={settings?.announcementBar?.announcementBarText}
      />
      <main
        className={cn(`flex min-h-screen flex-col ${
          variant === 'default'
            ? 'mt-[152px] lg:mt-[130px] md:mt-[115px]'
            : null
        }
        `)}
      >
        {props.children}
      </main>
      <Footer footerNavigation={footerNavigation} menuItems={props.menuItems} />
    </>
  )
}
